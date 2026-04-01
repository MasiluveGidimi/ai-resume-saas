import express from "express";
import { generateResume } from "../controllers/aiController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate/resume", authMiddleware, generateResume);

export default router;