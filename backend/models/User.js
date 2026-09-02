import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { query } = require('../db.cjs');

const User = {
  async findAll() {
    const { rows } = await query('SELECT * FROM "users" limit 100');
    return rows;
  },
  async vincentTestWrite() {
    const { rows } = await query('INSERT INTO foo(foobar) VALUES (321) RETURNING *');
    return rows[0];
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
};

export default User; 
