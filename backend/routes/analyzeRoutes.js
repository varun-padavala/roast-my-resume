import express from "express";
import { analyzeResume } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/", analyzeResume);

export default router;