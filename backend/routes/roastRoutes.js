import express from "express";
import { roastResume } from "../controllers/roastController.js";

const router = express.Router();

router.post("/", roastResume);

export default router;