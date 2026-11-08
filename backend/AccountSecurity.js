// import { useAuth } from "../contexts/authContext";
// const {currentUser} = useAuth();
// const app = require("./server.js");


// export function getUserEmail() {
//     return currentUser?.email;
// }

// app.get("/api/userEmail", async (req, res) => {
//     const email = getUserEmail();
//     res.json(email);
// });

// app.get("/api/device", (req, res) => {
//     const userAgent = req.headers["user-agent"];
//     res.json({
//         userAgent: userAgent
//     });
// });

// const admin = require("firebase-admin");

// const user = await admin.auth().getUser("FIREBASE_UID");

// console.log(user.uid);
// console.log(user.email);
// auth.currentUser

import express from "express";

const router = express.Router();

router.get("/api/device", (req, res) => {
  const userAgent = req.headers["user-agent"];

  res.json({
    userAgent,
  });
});

export default router;