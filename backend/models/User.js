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

  async findByEmail(email) {
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] || null;
  },

  async findByFirebaseUid(firebaseUid) {
    const { rows } = await query('SELECT * FROM users WHERE firebase_uid = $1', [firebaseUid]);
    return rows[0] || null;
  },

  // Creates a row for first-time Google sign-ins; does nothing if firebase_uid already exists
  async upsertByFirebaseUid({ firebaseUid, username }) {
    const { rows } = await query(
      `INSERT INTO users (id, firebase_uid, username, join_date, bio)
       VALUES (gen_random_uuid(), $1, $2, CURRENT_DATE, '')
       ON CONFLICT (firebase_uid) DO NOTHING
       RETURNING *`,
      [firebaseUid, username]
    );
    return rows[0] ?? null; // null means row already existed (DO NOTHING)
  },


  async create({ name, email, password_hash }) {
    const { rows } = await query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password_hash]
    );
    return rows[0];
  },

  async update(id, { name, email }) {
    const { rows } = await query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return rows[0] || null;
  },

  async delete(id) {
    const { rowCount } = await query('DELETE FROM users WHERE id = $1', [id]);
    return rowCount > 0;
  },
};

export default User; 
