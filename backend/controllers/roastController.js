import { generateRoastPack }
from "../services/roastService.js";

export async function roastResume(
  req,
  res
) {

  try {

    const {
      resumeText
    } = req.body;

    const result =
      await generateRoastPack(
        resumeText
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}