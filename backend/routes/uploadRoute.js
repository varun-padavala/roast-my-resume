import express from "express";
import multer from "multer";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      let resumeText = "";

      // DOCX
      if (req.file.mimetype.includes("wordprocessingml")) {
        const result = await mammoth.extractRawText({
          buffer: req.file.buffer,
        });

        resumeText = result.value;
      }

      // PDF
      else if (req.file.mimetype === "application/pdf") {
        const parser = new PDFParse({
          data: req.file.buffer,
        });

        const result = await parser.getText();

        resumeText = result.text;

        await parser.destroy();
      }

      // TXT
      else if (req.file.mimetype === "text/plain") {
        resumeText = req.file.buffer.toString("utf8");
      }

      else {
        return res.status(400).json({
          success: false,
          message: "Unsupported file type",
        });
      }

      res.json({
        success: true,
        fileName: req.file.originalname,
        resumeText,
      });

    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default router;