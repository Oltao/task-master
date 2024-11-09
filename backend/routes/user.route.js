import { Router } from "express";
import { login } from "../controllers/login.controller.js";

const router = Router();

router.get("/login", login);

export default router;
