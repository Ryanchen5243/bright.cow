// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK1v8QUz5eCYNMHyu6XHd64yNCW1zpKQo",
  authDomain: "uwu-vibe.firebaseapp.com",
  projectId: "uwu-vibe",
  storageBucket: "uwu-vibe.firebasestorage.app",
  messagingSenderId: "114026599038",
  appId: "1:114026599038:web:3afafec6fa6d2811a2be2f",
  measurementId: "G-JJY5WMB916"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;