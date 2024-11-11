import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.get("/:id", auth, getTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
