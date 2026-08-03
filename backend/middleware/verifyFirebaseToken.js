import { adminAuth } from '../firebase/adminApp.js';

export async function verifyFirebaseToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(401).json({ error: 'Missing auth token' });
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.firebaseUid = decoded.uid;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
