import express from "express";
import { getVerdict } from "../controllers/roastController.js";

const router = express.Router();

router.post("/", getVerdict);

export default router;