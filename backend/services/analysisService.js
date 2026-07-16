import { callGemini } from "./geminiService.js";

export async function generateAnalysis(
resumeText
) {

const analysisSchema = `
{
"summary":"...",

"strengths":[
"..."
],

"weaknesses":[
"..."
],

"actions":[
{
"p":"HIGH|MED|LOW",
"text":"..."
}
],

"suggestedProjects":[
{
"name":"...",
"stack":"...",
"why":"..."
}
]
}
`;

const systemPrompt = `
You are a professional resume analysis engine.

Respond ONLY with valid JSON.

${analysisSchema}

RULES:

Do NOT roast.

Do NOT joke.

Do NOT mention personalities.

Do NOT use sarcastic language.

summary:

* One short paragraph.

strengths:

* 3 to 5 observations.

weaknesses:

* 3 to 5 observations.

actions:

* Practical improvements.
* Prioritize HIGH, MED, LOW.

suggestedProjects:

* 3 realistic projects.
* Appropriate for the candidate's experience level.

Avoid generic HR phrases.

Avoid repeating resume facts word-for-word.

Strengths and weaknesses must be based on actual resume content.
`;

const userPrompt = `
Resume:

${resumeText}
`;

const raw = await callGemini(
systemPrompt,
userPrompt
);

console.log("RAW ANALYSIS RESPONSE:");
console.log(raw);

const clean = raw
.replace(/`json/g, "")
    .replace(/`/g, "")
.trim();

const start = clean.indexOf("{");
const end = clean.lastIndexOf("}");

const jsonString = clean.slice(
start,
end + 1
);

return JSON.parse(jsonString);
}
