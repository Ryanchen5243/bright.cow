import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK1v8QUz5eCYNMHyu6XHd64yNCW1zpKQo",
  authDomain: "uwu-vibe.firebaseapp.com",
  projectId: "uwu-vibe",
  storageBucket: "uwu-vibe.firebasestorage.app",
  messagingSenderId: "114026599038",
  appId: "1:114026599038:web:3afafec6fa6d2811a2be2f",
  measurementId: "G-JJY5WMB916"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
export default app;