import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  type UserCredential,
} from "firebase/auth";

export function doCreateUserWithEmailAndPassword(
  email: string,
  password: string,
): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function doSignInWithEmailAndPassword(
  email: string,
  password: string,
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export function doSignInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function doSignOut(): Promise<void> {
  return signOut(auth);
}

export function doPasswordReset(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email);
}

export function doPasswordUpdate(password: string): Promise<void> {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  return updatePassword(auth.currentUser, password);
}

export function doSendEmailVerification(): Promise<void> {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  return sendEmailVerification(auth.currentUser);
}
