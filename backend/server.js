import express from "express";
import dotenv from "dotenv";
import UserController from "./controllers/UserController.js"
dotenv.config();
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/allUsers", UserController.getAllUsers);
app.get("/myProfile/:firebaseUid", UserController.getMyProfile);
app.post("/syncUser", UserController.syncUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});