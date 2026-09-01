import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { query } = require('../db.cjs');

const Post = {
  async findByUserId(userId, { limit = 20, before, requestingUserId } = {}) {
    const params = [userId, limit];
    const cursor = before ? `AND p.created_at < $${params.push(before)}` : '';
    const likedByMe = requestingUserId
      ? `EXISTS (SELECT 1 FROM post_likes WHERE post_id = p.id AND user_id = $${params.push(requestingUserId)}) AS liked_by_me,`
      : `false AS liked_by_me,`;
    const sql = `
      SELECT p.*,
             ${likedByMe}
             COUNT(DISTINCT pl.user_id)::int AS like_count,
             COUNT(DISTINCT pc.id)::int       AS comment_count,
             COALESCE(
               json_agg(
                 json_build_object(
                   'id', pi.id,
                   's3_key', pi.s3_key,
                   'content_type', pi.content_type,
                   'width', pi.width,
                   'height', pi.height,
                   'position', pi.position
                 ) ORDER BY pi.position
               ) FILTER (WHERE pi.id IS NOT NULL),
               '[]'
             ) AS images
        FROM posts p
        LEFT JOIN post_likes   pl ON pl.post_id = p.id
        LEFT JOIN post_comments pc ON pc.post_id = p.id
        LEFT JOIN post_images  pi ON pi.post_id  = p.id
       WHERE p.user_id = $1 ${cursor}
       GROUP BY p.id
       ORDER BY p.created_at DESC
       LIMIT $2`;
    const { rows } = await query(sql, params);
    return rows;
  },

  async findById(postId) {
    const sql = `
      SELECT p.*,
             COUNT(DISTINCT pl.user_id)::int AS like_count,
             COUNT(DISTINCT pc.id)::int       AS comment_count,
             COALESCE(
               json_agg(
                 json_build_object(
                   'id', pi.id,
                   's3_key', pi.s3_key,
                   'content_type', pi.content_type,
                   'width', pi.width,
                   'height', pi.height,
                   'position', pi.position
                 ) ORDER BY pi.position
               ) FILTER (WHERE pi.id IS NOT NULL),
               '[]'
             ) AS images
        FROM posts p
        LEFT JOIN post_likes   pl ON pl.post_id = p.id
        LEFT JOIN post_comments pc ON pc.post_id = p.id
        LEFT JOIN post_images  pi ON pi.post_id  = p.id
       WHERE p.id = $1
       GROUP BY p.id`;
    const { rows } = await query(sql, [postId]);
    return rows[0] ?? null;
  },

  async create(userId, content) {
    const { rows } = await query(
      `WITH inserted AS (
         INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *
       )
       SELECT i.*, 0::int AS like_count, 0::int AS comment_count, '[]'::json AS images
         FROM inserted i`,
      [userId, content ?? null]
    );
    return rows[0];
  },

  async update(postId, userId, content) {
    const { rows } = await query(
      'UPDATE posts SET content = $1, updated_at = now() WHERE id = $2 AND user_id = $3 RETURNING *',
      [content, postId, userId]
    );
    return rows[0] ?? null;
  },

  async delete(postId, userId) {
    const { rowCount } = await query(
      'DELETE FROM posts WHERE id = $1 AND user_id = $2',
      [postId, userId]
    );
    return rowCount > 0;
  },

  // ── Likes ────────────────────────────────────────────────────────────────

  async like(postId, userId) {
    await query(
      'INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [postId, userId]
    );
  },

  async unlike(postId, userId) {
    await query(
      'DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    );
  },

  async isLikedBy(postId, userId) {
    const { rows } = await query(
      'SELECT 1 FROM post_likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    );
    return rows.length > 0;
  },

  // ── Comments ─────────────────────────────────────────────────────────────

  async getComments(postId, { limit = 50, after } = {}) {
    const params = [postId, limit];
    const cursor = after ? `AND c.created_at > $${params.push(after)}` : '';
    const sql = `
      SELECT c.*, u.user_display_name, u.user_name, u.profile_photo_url
        FROM post_comments c
        JOIN users u ON u.id = c.user_id
       WHERE c.post_id = $1 ${cursor}
       ORDER BY c.created_at ASC
       LIMIT $2`;
    const { rows } = await query(sql, params);
    return rows;
  },

  async addComment(postId, userId, content) {
    const { rows } = await query(
      `WITH inserted AS (
         INSERT INTO post_comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *
       )
       SELECT i.*, u.user_display_name, u.user_name, u.profile_photo_url
         FROM inserted i JOIN users u ON u.id = i.user_id`,
      [postId, userId, content]
    );
    return rows[0];
  },

  async deleteComment(commentId, userId) {
    const { rowCount } = await query(
      'DELETE FROM post_comments WHERE id = $1 AND user_id = $2',
      [commentId, userId]
    );
    return rowCount > 0;
  },

  // ── Images ───────────────────────────────────────────────────────────────

  async addImage(postId, { s3Key, contentType, width, height, fileSizeBytes, position = 0 }) {
    const { rows } = await query(
      `INSERT INTO post_images (post_id, s3_key, content_type, width, height, file_size_bytes, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [postId, s3Key, contentType ?? null, width ?? null, height ?? null, fileSizeBytes ?? null, position]
    );
    return rows[0];
  },

  async deleteImage(imageId, postId) {
    const { rowCount } = await query(
      'DELETE FROM post_images WHERE id = $1 AND post_id = $2',
      [imageId, postId]
    );
    return rowCount > 0;
  },
};

export default Post;
