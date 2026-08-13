import { createHash } from 'crypto';
import { query } from '../db.cjs';

export async function idempotency(req, res, next) {
    const key = req.headers['idempotency-key'];
    if (!key) {
        return res.status(400).json({ error: 'Missing Idempotency-Key header' });
    }

    const requestHash = createHash('sha256').update(JSON.stringify(req.body ?? '')).digest('hex');

    const { rows } = await query(
        `SELECT status, request_hash, response_status, response_body
         FROM idempotency_keys
         WHERE idempotency_key = $1 AND created_at > now() - interval '24 hours'`,
        [key]
    );

    let isNewKey = true;

    if (rows.length > 0) {
        const { status, request_hash, response_status, response_body } = rows[0];
        if (request_hash !== requestHash) {
            return res.status(422).json({ error: 'Idempotency-Key reused with a different request body' });
        }
        if (status === 'completed') {
            res.set('X-Idempotent-Replayed', 'true');
            return res.status(response_status).json(response_body);
        }
        // atomic conditional reset: only succeeds if the row is still stale (> 30s old)
        const staleReset = await query(
            `UPDATE idempotency_keys SET status = 'processing', request_hash = $1, created_at = now()
             WHERE idempotency_key = $2 AND status = 'processing' AND created_at < now() - interval '30 seconds'`,
            [requestHash, key]
        );
        if (staleReset.rowCount === 0) {
            return res.status(409).json({ error: 'A request with this Idempotency-Key is already in progress' });
        }
        isNewKey = false;
    }

    if (isNewKey) {
        try {
            await query(
                'INSERT INTO idempotency_keys (idempotency_key, request_hash, status) VALUES ($1, $2, $3)',
                [key, requestHash, 'processing']
            );
        } catch (err) {
            if (err.code !== '23505') return next(err); // unexpected error
            // lost the race — re-read the row the winner inserted
            const { rows: raceRows } = await query(
                `SELECT status, request_hash, response_status, response_body
                 FROM idempotency_keys
                 WHERE idempotency_key = $1 AND created_at > now() - interval '24 hours'`,
                [key]
            );
            if (!raceRows.length) return res.status(409).json({ error: 'A request with this Idempotency-Key is already in progress' });
            const { status: raceStatus, request_hash: raceHash, response_status: raceResStatus, response_body: raceResBody } = raceRows[0];
            if (raceHash !== requestHash) return res.status(422).json({ error: 'Idempotency-Key reused with a different request body' });
            if (raceStatus === 'completed') return res.status(raceResStatus).json(raceResBody);
            return res.status(409).json({ error: 'A request with this Idempotency-Key is already in progress' });
        }
    }

    const originalJson = res.json.bind(res);
    res.json = async (body) => {
        try {
            await query(
                'UPDATE idempotency_keys SET status = $1, response_status = $2, response_body = $3 WHERE idempotency_key = $4',
                ['completed', res.statusCode, body, key]
            );
        } catch (err) {
            // row stays 'processing'; log but don't block the response
            console.error(`Failed to mark idempotency key ${key} as completed:`, err);
        }
        return originalJson(body);
    };
    next();
}