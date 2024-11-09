import express from "express";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use("/auth", userRoute);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server started on http://localhost:${port}`);
});
