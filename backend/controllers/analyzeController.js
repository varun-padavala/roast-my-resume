import { generateAnalysis } from "../services/analysisService.js";
import { calculateATS } from "../utils/atsScorer.js";

export async function analyzeResume(req, res) {
  try {

    const {
      resumeText,
      selectedRole,
      seniority,
      jobDesc
    } = req.body;

    const aiResult =
      await generateAnalysis(
        resumeText
      );

    const atsResult = calculateATS(
      resumeText,
      {
        selectedRole,
        seniority,
        jobDesc
      }
    );

    return res.json({
      ...atsResult,
      ...aiResult
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
}