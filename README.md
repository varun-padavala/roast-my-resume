# 🔥 Roast My Resume

> AI-powered resume analysis that combines ATS evaluation, resume scoring, job description matching, actionable improvement suggestions, and personality-based resume roasting in one platform.

🌐 **Live Demo:** https://roast-my-resume-gray.vercel.app/

---

## Overview

Roast My Resume is an AI-powered web application built to help job seekers improve their resumes before applying for jobs.

Instead of simply assigning an ATS score, the application performs a detailed analysis of the uploaded resume, explains why certain sections are weak, identifies missing skills, evaluates compatibility with a target job description, and generates practical suggestions for improvement.

To make the experience engaging, the platform also includes AI-generated personality-based resume roasts that point out resume weaknesses in a humorous yet constructive way.

The goal is to make resume improvement informative, interactive, and enjoyable while still providing actionable career advice.

---

## Key Features

### 📄 AI Resume Analysis

Upload a PDF resume and receive an in-depth analysis including:

- Resume Score
- ATS Compatibility Score
- Resume Structure Review
- Formatting Analysis
- Content Quality Evaluation
- Section-by-Section Feedback

---

### 🎯 Job Description Matching

Users can optionally paste a job description to receive:

- Job Match Percentage
- Matching Skills
- Missing Skills
- Keyword Gap Analysis
- Resume Alignment Suggestions

This helps tailor resumes for specific job applications instead of relying on generic resume advice.

---

### 💡 Actionable Suggestions

Rather than highlighting problems alone, the platform explains how to improve them by providing recommendations for:

- Resume Summary
- Work Experience
- Projects
- Technical Skills
- Education
- Formatting
- ATS Optimization

---

### 🤖 AI-Powered Resume Understanding

The application extracts and understands resume content before performing analysis, enabling context-aware feedback rather than keyword-only scoring.

---

### 🔥 Personality-Based Resume Roasts

One of the unique features of the project is AI-generated resume roasting.

Users can choose different personalities, each delivering feedback in its own style while still highlighting genuine resume issues.

Examples include:

- Chad
- Margaret
- Gerald
- Alexis
- Victor
- Raven

The roasting feature makes resume reviews entertaining without sacrificing useful feedback.

---

### 📱 Responsive User Interface

The application is fully responsive and optimized for:

- Desktop
- Tablet
- Mobile

---

### ⚡ Fast Analysis

Most analyses complete within seconds, allowing users to iterate on their resumes quickly.

---

## Tech Stack

### Frontend

- React
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- Multer
- pdf-parse
- Mammoth

### AI

- Large Language Models (Claude & Gemini)

---

## How It Works

1. Upload a PDF resume.
2. (Optional) Enter a target job description.
3. Resume content is extracted.
4. AI analyzes the resume.
5. ATS and resume quality scores are generated.
6. Missing keywords and skills are identified.
7. Personalized improvement suggestions are created.
8. Users can generate a personality-based AI roast for entertaining but useful feedback.

---

## Project Structure

```
RoastMyResume
│
├── frontend
│   ├── src
│   ├── public
│   └── ...
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── uploads
│   └── ...
│
└── README.md
```

---

## Running Locally

### Clone Repository

```bash
git clone https://github.com/yourusername/roast-my-resume.git
```

---

### Backend

```bash
cd backend
npm install
npm start
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend.

```env

GEMINI_API_KEY=YOUR_API_KEY
or
Groq_API_KEY

PORT=5000
```

---

## Future Improvements

- Resume Rewrite
- Cover Letter Generator
- LinkedIn Profile Review
- Interview Preparation
- Resume Version Comparison
- Export Analysis as PDF
- Career Recommendations
- Multi-language Support

---

## Why I Built This

Most resume analysis tools either provide only an ATS score or return generic feedback without explaining the reasoning behind it.

Roast My Resume was built to combine detailed AI analysis, resume-job matching, actionable recommendations, and engaging personality-based roasting into a single platform that helps users understand **why** their resume can be improved—not just **what** score it received.

---

## Author

**Varun Padavala**

If you found this project useful, consider giving it a ⭐ on GitHub.
