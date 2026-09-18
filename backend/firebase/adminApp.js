import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  // Set FIREBASE_SERVICE_ACCOUNT env var to the contents of your service account JSON
  initializeApp({
    credential: process.env.FIREBASE_SERVICE_ACCOUNT
      ? cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
      : undefined, // falls back to Application Default Credentials
  });
}

export const adminAuth = getAuth();
