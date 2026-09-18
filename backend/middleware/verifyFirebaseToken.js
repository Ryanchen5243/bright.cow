import { adminAuth } from '../firebase/adminApp.js';
import User from '../models/User.js';

export async function verifyFirebaseToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Missing auth token' });
  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(token);
  } catch (err) {
    console.error('verifyFirebaseToken failed:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.firebaseUid = decoded.uid;
  const user = await User.findByFirebaseUid(decoded.uid);
  req.userId = user?.id ?? null;
  next();
}
