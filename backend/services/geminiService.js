import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function callGemini(systemPrompt, userPrompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 1,
        response_format: { type: "json_object" },
      });

      return response.choices[0].message.content;

    } catch (error) {
      const is429 = error.status === 429;
      const isLastAttempt = attempt === retries;

      if (!is429 || isLastAttempt) throw error;

      const retryAfter = parseInt(error.headers?.["retry-after"] || "10", 10);
      console.warn(`Rate limited. Retrying in ${retryAfter}s... (attempt ${attempt}/${retries})`);
      await new Promise(r => setTimeout(r, retryAfter * 1000));
    }
  }
}