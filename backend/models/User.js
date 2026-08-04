import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { query } = require('../db.cjs');

function normalizeUserName(displayName) {
  const parts = (displayName ?? '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  const base = parts.length >= 2
    ? `${parts[0]}_${parts[parts.length - 1]}`
    : parts[0] || 'user';
  return base.slice(0, 25).replace(/[^a-z0-9_]/g, '_');
}

function generateFallbackUserName(displayName) {
  const base = normalizeUserName(displayName);
  const suffix = `_${Math.floor(1000 + Math.random() * 9000)}`;
  return base.slice(0, 25 - suffix.length) + suffix;
}

const User = {
  async findAll() {
    const { rows } = await query('SELECT * FROM "users" limit 100');
    return rows;
  },

  async findByFirebaseUid(firebaseUid) {
    const { rows } = await query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
    return rows[0] ?? null;
  },

  async findByUUID(uuid) {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [uuid]);
    return rows[0] ?? null;
  },

  // Creates a row for first-time Google sign-ins; updates last_login_at on subsequent logins
  async upsertByFirebaseUid({ firebaseUid, userName, userDisplayName, profilePhotoUrl }) {
    const sql = `INSERT INTO users (firebase_uid, user_name, user_display_name, profile_photo_url, last_login_at)
       VALUES ($1, $2, $3, $4, now())
       ON CONFLICT (firebase_uid) DO UPDATE
         SET last_login_at = now()
       RETURNING *`;
    const source = userName ?? userDisplayName;
    const resolvedUserName = source ? normalizeUserName(source) : null;
    const params = [firebaseUid, resolvedUserName, userDisplayName ?? null, profilePhotoUrl ?? null];
    try {
      const { rows } = await query(sql, params);
      return rows[0];
    } catch (err) {
      // user_name unique violation — retry with a name-based random fallback
      if (err.code === '23505') {
        const { rows } = await query(sql, [firebaseUid, generateFallbackUserName(source), userDisplayName ?? null, profilePhotoUrl ?? null]);
        return rows[0];
      }
      throw err;
    }
  },

  async updateDisplayName(id, newDisplayName) {
    const { rows } = await query(
      'UPDATE users SET user_display_name = $1 WHERE id = $2 RETURNING *',
      [newDisplayName, id]
    );
    return rows[0] ?? null;
  },
};

export default User;