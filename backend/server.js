import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
// routes...

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/user", (req, res) => {
  res.send("User route");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});