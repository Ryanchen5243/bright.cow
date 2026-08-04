const seen = new Map();

export async function idempotency(req, res, next) {
    const key = req.headers['idempotency-key'];
    if (!key) {
        return res.status(400).json({ error: 'Missing Idempotency-Key header' });
    }
    if (seen.has(key)) {
        console.log(`Duplicate request detected for Idempotency-Key: ${key}`);
        return res.status(200).json(seen.get(key));
    }
    const originalJson = res.json.bind(res);
    res.json = (body) => { seen.set(key, body); return originalJson(body); };
    next();
}