import { adminAuth } from '../firebase/adminApp.js';
import User from '../models/User.js';

export async function optionalFirebaseToken(req, res, next) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return next();
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.firebaseUid = decoded.uid;
    const user = await User.findByFirebaseUid(decoded.uid);
    req.userId = user?.id ?? null;
  } catch {
    // invalid token — proceed without identity
  }
  next();
}
