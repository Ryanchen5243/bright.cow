import Post from '../models/Post.js';
import { isBucketConfigured, isAllowedContentType, generateUploadPresignedUrl, generateDownloadPresignedUrl } from '../s3.js';

// attaches a presigned GET url to every image on a post (or array of posts)
async function hydrateImageUrls(postOrPosts) {
  if (!isBucketConfigured()) return postOrPosts;
  const hydrate = async (post) => {
    if (!Array.isArray(post.images) || post.images.length === 0) return post;
    const images = await Promise.all(
      post.images.map(async (img) => ({
        ...img,
        url: await generateDownloadPresignedUrl(img.s3_key),
      }))
    );
    return { ...post, images };
  };
  return Array.isArray(postOrPosts)
    ? Promise.all(postOrPosts.map(hydrate))
    : hydrate(postOrPosts);
}

// pending presign keys: s3Key -> { userId, postId, expiresAt }
const pendingUploadKeys = new Map();
const PRESIGN_TTL_MS = 310_000; // slightly longer than the 300s URL expiry

function storePendingKey(s3Key, userId, postId) {
  const now = Date.now();
  // evict expired entries on each write
  for (const [k, v] of pendingUploadKeys) {
    if (v.expiresAt < now) pendingUploadKeys.delete(k);
  }
  pendingUploadKeys.set(s3Key, { userId, postId, expiresAt: now + PRESIGN_TTL_MS });
}

function consumePendingKey(s3Key, userId, postId) {
  const entry = pendingUploadKeys.get(s3Key);
  if (!entry) return false;
  pendingUploadKeys.delete(s3Key);
  return entry.userId === userId && entry.postId === postId && entry.expiresAt >= Date.now();
}

const PostController = {
  // GET /posts/:uuid
  getPostsByUser: async (req, res) => {
    try {
      const { before } = req.query;
      const posts = await Post.findByUserId(req.params.uuid, { before, requestingUserId: req.userId ?? null });
      res.json(await hydrateImageUrls(posts));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /posts/single/:postId
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(await hydrateImageUrls(post));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /posts
  createPost: async (req, res) => {
    try {
      const { content } = req.body ?? {};
      const post = await Post.create(req.userId, content);
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PATCH /posts/:postId
  updatePost: async (req, res) => {
    try {
      const { content } = req.body ?? {};
      if (content === undefined) return res.status(400).json({ error: 'content is required' });
      const post = await Post.update(req.params.postId, req.userId, content);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /posts/:postId
  deletePost: async (req, res) => {
    try {
      const deleted = await Post.delete(req.params.postId, req.userId);
      if (!deleted) return res.status(404).json({ error: 'Post not found' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ── Likes ──────────────────────────────────────────────────────────────

  // POST /posts/:postId/like
  likePost: async (req, res) => {
    try {
      await Post.like(req.params.postId, req.userId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /posts/:postId/like
  unlikePost: async (req, res) => {
    try {
      await Post.unlike(req.params.postId, req.userId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ── Comments ───────────────────────────────────────────────────────────

  // GET /posts/:postId/comments
  getComments: async (req, res) => {
    try {
      const { after } = req.query;
      const comments = await Post.getComments(req.params.postId, { after });
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /posts/:postId/comments
  addComment: async (req, res) => {
    try {
      const { content } = req.body ?? {};
      if (!content) return res.status(400).json({ error: 'content is required' });
      const comment = await Post.addComment(req.params.postId, req.userId, content);
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /posts/:postId/comments/:commentId
  deleteComment: async (req, res) => {
    try {
      const deleted = await Post.deleteComment(req.params.commentId, req.userId);
      if (!deleted) return res.status(404).json({ error: 'Comment not found' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // ── Images ─────────────────────────────────────────────────────────────

  // POST /posts/:postId/presign-upload
  presignUpload: async (req, res) => {
    try {
      if (!isBucketConfigured()) return res.status(503).json({ error: 'Image uploads are not configured.' });
      const { contentType, position } = req.body ?? {};
      if (!contentType) return res.status(400).json({ error: 'contentType is required' });
      if (!isAllowedContentType(contentType)) return res.status(400).json({ error: 'Unsupported file type.' });
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      if (post.user_id !== req.userId) return res.status(403).json({ error: 'Forbidden' });
      const result = await generateUploadPresignedUrl(`posts/${req.params.postId}`, { contentType });
      storePendingKey(result.s3Key, req.userId, req.params.postId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /posts/:postId/images
  saveImage: async (req, res) => {
    try {
      const { s3Key, contentType, width, height, fileSizeBytes, position } = req.body ?? {};
      if (!s3Key) return res.status(400).json({ error: 's3Key is required' });
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      if (post.user_id !== req.userId) return res.status(403).json({ error: 'Forbidden' });
      if (!consumePendingKey(s3Key, req.userId, req.params.postId)) return res.status(403).json({ error: 'Unrecognised or expired upload key.' });
      const image = await Post.addImage(req.params.postId, { s3Key, contentType, width, height, fileSizeBytes, position: Number(position ?? 0) });
      res.status(201).json(image);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /posts/:postId/images/:imageId
  removeImage: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      if (post.user_id !== req.userId) return res.status(403).json({ error: 'Forbidden' });
      const deleted = await Post.deleteImage(req.params.imageId, req.params.postId);
      if (!deleted) return res.status(404).json({ error: 'Image not found' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default PostController;
