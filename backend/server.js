import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoute from "./routes/uploadRoute.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import roastRoutes from "./routes/roastRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api", uploadRoute);

app.use("/api/analyze", analyzeRoutes);

app.use("/api/roast", roastRoutes);

app.get("/", (req, res) => {
  res.send("RoastMyResume API Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});