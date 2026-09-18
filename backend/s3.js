import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const AWS = require('aws-sdk');

// AWS SDK v2 — auto-resolves credentials from AWS_PROFILE (dev) or IAM role (prod)
const s3 = new AWS.S3();

const BUCKET = process.env.S3_BUCKET_NAME;
const PRESIGN_EXPIRES_SECONDS = 300;
const GET_PRESIGN_EXPIRES_SECONDS = 3600;
const ALLOWED_CONTENT_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
const CONTENT_TYPE_EXTENSIONS = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp' };

export function isBucketConfigured() {
  return Boolean(BUCKET);
}

export function isAllowedContentType(contentType) {
  return ALLOWED_CONTENT_TYPES.has(contentType);
}

// prefix examples: 'posts/123', 'avatars/456', 'uploads'
export async function generateUploadPresignedUrl(prefix, { contentType }) {
  const ext = CONTENT_TYPE_EXTENSIONS[contentType] ?? 'bin';
  const key = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const url = await s3.getSignedUrlPromise('putObject', {
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
    Expires: PRESIGN_EXPIRES_SECONDS,
  });
  return { uploadUrl: url, s3Key: key };
}

export function generateDownloadPresignedUrl(s3Key) {
  return s3.getSignedUrlPromise('getObject', {
    Bucket: BUCKET,
    Key: s3Key,
    Expires: GET_PRESIGN_EXPIRES_SECONDS,
  });
}
