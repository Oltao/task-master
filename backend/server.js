import express from "express";
import authRoute from "./routes/auth.route.js";
import taskRoute from "./routes/task.route.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server started on http://localhost:${port}`);
});
