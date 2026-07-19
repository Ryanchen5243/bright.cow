import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { query } = require('../db.cjs');

const User = {
  async findAll() {
    const { rows } = await query('SELECT * FROM "users"');
    return rows;
  },

  async findById(id) {
    const { rows } = await query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] || null;
  },

  async findByUserName(userName) {
    const { rows } = await query('SELECT * FROM users WHERE user_name = $1', [userName]);
    return rows[0] || null;
  },

  async findByFirebaseUid(firebaseUid) {
    const { rows } = await query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
    return rows[0] || null;
  },

  // Creates a row for first-time Google sign-ins; updates last_login_at on subsequent logins
  async upsertByFirebaseUid({ firebaseUid, userName, userDisplayName, profilePhotoUrl }) {
    const { rows } = await query(
      `INSERT INTO users (firebase_uid, user_name, user_display_name, profile_photo_url)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (firebase_uid) DO UPDATE
         SET last_login_at = now()
       RETURNING *`,
      [firebaseUid, userName, userDisplayName ?? null, profilePhotoUrl ?? null]
    );
    return rows[0];
  },


  async create({ firebaseUid, userName, userDisplayName, profilePhotoUrl, backgroundPhotoUrl, bio, timeZone }) {
    const { rows } = await query(
      `INSERT INTO users (firebase_uid, user_name, user_display_name, profile_photo_url, background_photo_url, bio, time_zone)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [firebaseUid, userName, userDisplayName ?? null, profilePhotoUrl ?? null, backgroundPhotoUrl ?? null, bio ?? '', timeZone ?? null]
    );
    return rows[0];
  },

  async update(id, { userName, userDisplayName, profilePhotoUrl, backgroundPhotoUrl, bio, timeZone }) {
    const { rows } = await query(
      `UPDATE users
       SET user_name = COALESCE($1, user_name),
           user_display_name = COALESCE($2, user_display_name),
           profile_photo_url = COALESCE($3, profile_photo_url),
           background_photo_url = COALESCE($4, background_photo_url),
           bio = COALESCE($5, bio),
           time_zone = COALESCE($6, time_zone),
           updated_at = now()
       WHERE id = $7
       RETURNING *`,
      [userName ?? null, userDisplayName ?? null, profilePhotoUrl ?? null, backgroundPhotoUrl ?? null, bio ?? null, timeZone ?? null, id]
    );
    return rows[0] || null;
  },

  async delete(id) {
    const { rowCount } = await query('DELETE FROM users WHERE id = $1', [id]);
    return rowCount > 0;
  },
};

export default User; 
