// ─────────────────────────────────────────────────────────────────────────────
// ATS SCORING ENGINE v2
// Three scoring modes:
//   1. Resume + JD + Role/Seniority  → full contextual score
//   2. Resume + JD only              → JD-driven score
//      Resume + Role/Seniority only  → profile-driven score
//   3. Resume only                   → best-effort auto-detect score
// ─────────────────────────────────────────────────────────────────────────────

// ─── ROLE PROFILES ───────────────────────────────────────────────────────────
// Each role → seniority level → required skills array
// Skills are weighted: first half = core (higher weight), second half = nice-to-have

export const ROLE_PROFILES = {

  software_engineer: {
    label: "Software Engineer",
    intern: {
      core:    ["javascript", "python", "git", "html", "css", "data structures", "algorithms"],
      bonus:   ["react", "node", "sql", "rest api", "linux", "typescript"],
      avoid:   [],               // red flags if present (over-qualified signals)
    },
    junior: {
      core:    ["javascript", "react", "node.js", "git", "sql", "rest api", "html", "css"],
      bonus:   ["typescript", "postgresql", "docker", "testing", "aws", "ci/cd", "mongodb"],
      avoid:   [],
    },
    mid: {
      core:    ["javascript", "typescript", "react", "node.js", "sql", "docker", "git", "rest api", "testing"],
      bonus:   ["aws", "kubernetes", "ci/cd", "redis", "graphql", "system design", "microservices", "postgresql"],
      avoid:   [],
    },
    senior: {
      core:    ["system design", "typescript", "react", "node.js", "aws", "docker", "kubernetes", "sql", "microservices", "ci/cd"],
      bonus:   ["terraform", "kafka", "redis", "grpc", "distributed systems", "mentoring", "architecture", "performance optimization"],
      avoid:   [],
    },
    staff_lead: {
      core:    ["system design", "architecture", "aws", "distributed systems", "microservices", "mentoring", "technical leadership", "ci/cd"],
      bonus:   ["terraform", "kafka", "kubernetes", "cross-team", "roadmap", "engineering strategy", "oncall", "sre"],
      avoid:   [],
    },
    manager: {
      core:    ["engineering management", "roadmap", "cross-functional", "mentoring", "hiring", "technical leadership", "agile", "okr"],
      bonus:   ["p&l", "stakeholder management", "system design", "architecture review", "performance review", "headcount"],
      avoid:   [],
    },
  },

  product_manager: {
    label: "Product Manager",
    intern: {
      core:    ["product thinking", "user research", "agile", "figma", "jira", "sql", "communication"],
      bonus:   ["a/b testing", "analytics", "roadmap", "wireframing", "competitive analysis"],
      avoid:   [],
    },
    junior: {
      core:    ["product roadmap", "user stories", "agile", "jira", "sql", "figma", "stakeholder communication", "analytics"],
      bonus:   ["a/b testing", "mixpanel", "amplitude", "competitive analysis", "go-to-market", "okr"],
      avoid:   [],
    },
    mid: {
      core:    ["product strategy", "roadmap", "user research", "a/b testing", "sql", "agile", "stakeholder management", "go-to-market", "okr"],
      bonus:   ["pricing", "growth", "funnel analysis", "competitive intelligence", "product analytics", "technical specs"],
      avoid:   [],
    },
    senior: {
      core:    ["product vision", "product strategy", "roadmap", "okr", "go-to-market", "stakeholder management", "data-driven", "user research", "p&l"],
      bonus:   ["platform thinking", "growth strategy", "monetization", "launch", "cross-functional leadership"],
      avoid:   [],
    },
    staff_lead: {
      core:    ["product vision", "platform strategy", "cross-functional leadership", "okr", "p&l", "go-to-market", "data-driven decision making"],
      bonus:   ["monetization", "growth", "organizational design", "portfolio management"],
      avoid:   [],
    },
    manager: {
      core:    ["product leadership", "team management", "hiring", "product vision", "cross-functional", "okr", "roadmap", "p&l"],
      bonus:   ["organizational design", "mentoring", "portfolio management", "executive communication"],
      avoid:   [],
    },
  },

  ux_designer: {
    label: "UX Designer",
    intern: {
      core:    ["figma", "wireframing", "user research", "prototyping", "ux principles", "visual design"],
      bonus:   ["usability testing", "sketch", "design systems", "adobe xd", "html", "css"],
      avoid:   [],
    },
    junior: {
      core:    ["figma", "user research", "wireframing", "prototyping", "usability testing", "visual design", "ux writing"],
      bonus:   ["design systems", "sketch", "interaction design", "a/b testing", "accessibility", "css"],
      avoid:   [],
    },
    mid: {
      core:    ["figma", "design systems", "user research", "usability testing", "prototyping", "interaction design", "accessibility", "ux strategy"],
      bonus:   ["motion design", "design ops", "data-informed design", "service design", "content design", "handoff"],
      avoid:   [],
    },
    senior: {
      core:    ["design systems", "ux strategy", "user research", "interaction design", "accessibility", "cross-functional", "design critique", "mentoring"],
      bonus:   ["design ops", "service design", "motion design", "design leadership", "research ops"],
      avoid:   [],
    },
    staff_lead: {
      core:    ["design leadership", "design systems", "ux strategy", "cross-functional", "mentoring", "design ops", "research strategy"],
      bonus:   ["design vision", "org design", "accessibility standards", "content strategy"],
      avoid:   [],
    },
    manager: {
      core:    ["design leadership", "team management", "hiring", "design vision", "cross-functional", "design systems", "ux strategy"],
      bonus:   ["org design", "mentoring", "design ops", "executive communication"],
      avoid:   [],
    },
  },

  data_scientist: {
    label: "Data Scientist",
    intern: {
      core:    ["python", "sql", "pandas", "numpy", "statistics", "machine learning", "jupyter"],
      bonus:   ["scikit-learn", "matplotlib", "seaborn", "r", "data visualization", "excel"],
      avoid:   [],
    },
    junior: {
      core:    ["python", "sql", "pandas", "scikit-learn", "machine learning", "statistics", "data visualization", "numpy"],
      bonus:   ["tensorflow", "pytorch", "spark", "airflow", "tableau", "a/b testing", "feature engineering"],
      avoid:   [],
    },
    mid: {
      core:    ["python", "sql", "machine learning", "deep learning", "feature engineering", "a/b testing", "statistics", "data pipeline", "scikit-learn"],
      bonus:   ["tensorflow", "pytorch", "spark", "mlflow", "airflow", "causal inference", "nlp", "computer vision"],
      avoid:   [],
    },
    senior: {
      core:    ["python", "machine learning", "deep learning", "a/b testing", "causal inference", "data pipeline", "mlflow", "spark", "stakeholder communication"],
      bonus:   ["llm", "mlops", "feature store", "distributed training", "pytorch", "tensorflow", "research", "publications"],
      avoid:   [],
    },
    staff_lead: {
      core:    ["ml architecture", "research leadership", "mlops", "stakeholder communication", "cross-functional", "deep learning", "causal inference"],
      bonus:   ["llm", "publications", "patents", "technical strategy", "hiring"],
      avoid:   [],
    },
    manager: {
      core:    ["data science leadership", "team management", "hiring", "ml strategy", "cross-functional", "roadmap", "stakeholder management"],
      bonus:   ["p&l", "research direction", "mlops", "technical vision", "executive communication"],
      avoid:   [],
    },
  },

  devops_infra: {
    label: "DevOps / Infra",
    intern: {
      core:    ["linux", "git", "docker", "bash", "networking basics", "ci/cd"],
      bonus:   ["kubernetes", "aws", "terraform", "python", "monitoring"],
      avoid:   [],
    },
    junior: {
      core:    ["linux", "docker", "kubernetes", "ci/cd", "aws", "terraform", "bash", "git", "monitoring"],
      bonus:   ["ansible", "prometheus", "grafana", "helm", "python", "cloudformation"],
      avoid:   [],
    },
    mid: {
      core:    ["kubernetes", "aws", "terraform", "ci/cd", "docker", "linux", "monitoring", "incident response", "bash", "python"],
      bonus:   ["ansible", "prometheus", "grafana", "helm", "service mesh", "sre", "security", "cost optimization"],
      avoid:   [],
    },
    senior: {
      core:    ["kubernetes", "aws", "terraform", "sre", "incident response", "monitoring", "security", "cost optimization", "architecture", "ci/cd"],
      bonus:   ["service mesh", "chaos engineering", "multi-cloud", "platform engineering", "finops", "zero trust"],
      avoid:   [],
    },
    staff_lead: {
      core:    ["platform engineering", "sre", "architecture", "multi-cloud", "security", "cost optimization", "mentoring", "cross-functional"],
      bonus:   ["chaos engineering", "technical strategy", "finops", "hiring"],
      avoid:   [],
    },
    manager: {
      core:    ["infrastructure leadership", "team management", "hiring", "sre", "cross-functional", "cost optimization", "architecture", "roadmap"],
      bonus:   ["finops", "vendor management", "security strategy", "executive communication"],
      avoid:   [],
    },
  },

  marketing: {
    label: "Marketing",
    intern: {
      core:    ["social media", "content creation", "seo basics", "google analytics", "copywriting", "canva"],
      bonus:   ["email marketing", "wordpress", "paid ads", "excel", "market research"],
      avoid:   [],
    },
    junior: {
      core:    ["seo", "content marketing", "google analytics", "email marketing", "social media", "copywriting", "paid ads"],
      bonus:   ["hubspot", "salesforce", "a/b testing", "conversion rate", "marketing automation", "data analysis"],
      avoid:   [],
    },
    mid: {
      core:    ["growth marketing", "seo", "paid ads", "email marketing", "marketing automation", "a/b testing", "analytics", "content strategy"],
      bonus:   ["hubspot", "salesforce", "crm", "attribution", "funnel optimization", "performance marketing"],
      avoid:   [],
    },
    senior: {
      core:    ["growth strategy", "demand generation", "brand strategy", "marketing automation", "performance marketing", "cross-functional", "okr", "data-driven"],
      bonus:   ["go-to-market", "product marketing", "analyst relations", "pr", "budget management"],
      avoid:   [],
    },
    staff_lead: {
      core:    ["marketing strategy", "brand positioning", "go-to-market", "cross-functional leadership", "data-driven", "okr", "budget management"],
      bonus:   ["analyst relations", "pr", "category creation", "executive communication"],
      avoid:   [],
    },
    manager: {
      core:    ["marketing leadership", "team management", "hiring", "marketing strategy", "okr", "budget management", "cross-functional", "brand strategy"],
      bonus:   ["p&l", "executive communication", "analyst relations", "org design"],
      avoid:   [],
    },
  },

  finance_banking: {
    label: "Finance / Banking",
    intern: {
      core:    ["excel", "financial modeling", "accounting", "sql", "powerpoint", "financial analysis", "bloomberg"],
      bonus:   ["python", "valuation", "dcf", "vba", "financial statements"],
      avoid:   [],
    },
    junior: {
      core:    ["financial modeling", "excel", "sql", "valuation", "dcf", "financial statements", "financial analysis", "bloomberg"],
      bonus:   ["python", "vba", "lbo", "m&a", "portfolio analysis", "risk management", "regulatory compliance"],
      avoid:   [],
    },
    mid: {
      core:    ["financial modeling", "valuation", "dcf", "risk management", "sql", "python", "stakeholder communication", "regulatory compliance", "portfolio management"],
      bonus:   ["lbo", "m&a", "bloomberg", "vba", "derivatives", "credit analysis", "capital markets"],
      avoid:   [],
    },
    senior: {
      core:    ["financial strategy", "risk management", "stakeholder management", "regulatory compliance", "portfolio management", "financial modeling", "cross-functional"],
      bonus:   ["capital allocation", "m&a", "ipo", "derivatives", "credit risk", "executive communication"],
      avoid:   [],
    },
    staff_lead: {
      core:    ["financial leadership", "risk management", "regulatory compliance", "cross-functional", "financial strategy", "stakeholder management"],
      bonus:   ["capital markets", "m&a strategy", "ipo", "executive communication", "team leadership"],
      avoid:   [],
    },
    manager: {
      core:    ["finance leadership", "team management", "hiring", "financial strategy", "risk management", "regulatory compliance", "cross-functional", "p&l"],
      bonus:   ["capital allocation", "m&a", "executive communication", "org design", "board reporting"],
      avoid:   [],
    },
  },
};

// Seniority key normalizer — maps UI labels to profile keys
const SENIORITY_MAP = {
  INTERN:      "intern",
  JUNIOR:      "junior",
  MID:         "mid",
  SENIOR:      "senior",
  "STAFF / LEAD": "staff_lead",
  "MANAGER+":  "manager",
};

// ─── JD SKILL EXTRACTOR ───────────────────────────────────────────────────────
// Pulls skills/requirements from a raw job description string
// Works by matching against a broad dictionary + extracting "years of experience" signals

const TECH_DICTIONARY = [
  // Languages
  "javascript","typescript","python","java","go","rust","c++","c#","ruby","php","swift","kotlin","scala","r","matlab","bash","powershell",
  // Frontend
  "react","vue","angular","svelte","next.js","nuxt","html","css","tailwind","sass","webpack","vite","storybook",
  // Backend
  "node.js","node","express","fastapi","django","flask","spring","rails","laravel","graphql","rest api","grpc","websockets",
  // Data / ML
  "sql","postgresql","mysql","mongodb","redis","elasticsearch","kafka","spark","airflow","mlflow","tensorflow","pytorch","scikit-learn","pandas","numpy","huggingface","langchain","llm",
  // Infra / Cloud
  "aws","gcp","azure","docker","kubernetes","terraform","ansible","ci/cd","github actions","jenkins","linux","nginx","prometheus","grafana","helm","istio",
  // Tools / Process
  "git","agile","scrum","jira","figma","notion","okr","a/b testing","seo","analytics","mixpanel","amplitude","hubspot","salesforce","tableau","powerbi",
  // Finance
  "excel","bloomberg","dcf","lbo","financial modeling","vba","risk management","regulatory compliance",
  // Soft / Leadership
  "system design","architecture","mentoring","cross-functional","stakeholder management","technical leadership","hiring","roadmap","engineering management",
];

export function extractSkillsFromJD(jdText) {
  if (!jdText || !jdText.trim()) return [];
  const lower = jdText.toLowerCase();
  const found = [];

  TECH_DICTIONARY.forEach(skill => {
    // Match whole word / phrase
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(lower)) found.push(skill);
  });

  // Also extract "X+ years of <something>" patterns
  const yearPatterns = lower.matchAll(/(\d+)\+?\s*years?\s+(?:of\s+)?(?:experience\s+(?:with|in)\s+)?([a-z][a-z0-9.\s/+-]{1,30}?)(?:\s|,|;|\.|\()/g);
  for (const match of yearPatterns) {
    const skill = match[2].trim().toLowerCase();
    if (skill.length > 2 && skill.length < 30 && !found.includes(skill)) {
      found.push(skill);
    }
  }

  return [...new Set(found)];
}

// ─── ROLE AUTO-DETECTOR ───────────────────────────────────────────────────────
// When no role is selected, guesses the most likely role from resume text

const ROLE_SIGNALS = {
  software_engineer: ["javascript","react","node","api","frontend","backend","fullstack","engineer","developer","software","typescript","python","java"],
  product_manager:   ["product","roadmap","okr","stakeholder","user stories","go-to-market","product manager","pm","sprint","backlog"],
  ux_designer:       ["figma","ux","ui","wireframe","prototype","user research","usability","design system","interaction design","designer"],
  data_scientist:    ["machine learning","data science","model","pandas","scikit","tensorflow","pytorch","jupyter","analytics","data analyst","ml","ai"],
  devops_infra:      ["devops","kubernetes","docker","terraform","ci/cd","aws","infrastructure","sre","linux","pipeline","helm"],
  marketing:         ["marketing","seo","content","social media","brand","campaigns","growth","email marketing","ppc","paid ads"],
  finance_banking:   ["finance","banking","financial model","dcf","valuation","investment","portfolio","equity","hedge fund","risk"],
};

export function detectRole(resumeText) {
  const lower = resumeText.toLowerCase();
  let best = { role: "software_engineer", score: 0 };

  Object.entries(ROLE_SIGNALS).forEach(([role, signals]) => {
    let score = 0;
    signals.forEach(s => { if (lower.includes(s)) score++; });
    console.log(role, score)
    if (score > best.score) best = { role, score };
  });

  return best.role;
}

// ─── SENIORITY AUTO-DETECTOR ──────────────────────────────────────────────────

export function detectSeniority(resumeText) {
  const lower = resumeText.toLowerCase();

  // Years of experience signals
  const yoeMatch = lower.match(/(\d+)\+?\s*years?\s+(?:of\s+)?(?:experience|exp)/);
  if (yoeMatch) {
    const y = parseInt(yoeMatch[1], 10);
    if (y >= 10) return "manager";
    if (y >= 7)  return "staff_lead";
    if (y >= 5)  return "senior";
    if (y >= 3)  return "mid";
    if (y >= 1)  return "junior";
    return "intern";
  }

  // Title signals
  if (/\b(vp|vice president|cto|cpo|director|head of)\b/.test(lower)) return "manager";
  if (/\b(staff|principal|distinguished|fellow|architect)\b/.test(lower)) return "staff_lead";
  if (/\b(senior|sr\.)\b/.test(lower)) return "senior";
  if (/\b(mid|mid-level|intermediate)\b/.test(lower)) return "mid";
  if (/\b(junior|jr\.)\b/.test(lower)) return "junior";
  if (/\b(intern|internship|co-op)\b/.test(lower)) return "intern";

  // Education signals
  if (/\b(currently|pursuing|b\.s\.|b\.e\.|bsc|btech|undergraduate)\b/.test(lower)) return "intern";

  return "mid"; // safe default
}

// ─── CORE SCORING HELPERS ─────────────────────────────────────────────────────

function matchSkillsInText(skills, resumeText) {
  const lower = resumeText.toLowerCase();
  return skills.filter(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(lower);
  });
}

function scoreSkillCoverage(coreSkills, bonusSkills, resumeText) {
  const coreMatches  = matchSkillsInText(coreSkills,  resumeText);
  const bonusMatches = matchSkillsInText(bonusSkills, resumeText);

  const coreScore  = coreSkills.length  > 0 ? coreMatches.length  / coreSkills.length  : 1;
  const bonusScore = bonusSkills.length > 0 ? bonusMatches.length / bonusSkills.length : 0;

  // Core = 75%, bonus = 25%
  const raw = coreScore * 75 + bonusScore * 25;
  return {
    score:        Math.round(raw),
    coreMatches,
    bonusMatches,
    missingCore:  coreSkills.filter(s => !coreMatches.includes(s)),
    missingBonus: bonusSkills.filter(s => !bonusMatches.includes(s)),
  };
}

function calculateStructureScore(resumeText) {
  const text     = resumeText.toLowerCase();
  const sections = ["education", "skills", "projects", "experience", "work experience", "summary", "objective"];
  const found    = sections.filter(s => text.includes(s));
  // Require at least 3 proper sections for a decent score
  return Math.min(100, Math.round((found.length / 4) * 100));
}

function calculateImpactScore(resumeText) {
  // Count quantified achievements
  const metrics = (resumeText.match(/\d[\d,.]*\s*(%|x|k|m|million|thousand|users|customers|revenue|latency|performance|faster|reduction|increase|growth)/gi) || []).length;
  // Count strong action verbs
  const verbs   = (resumeText.match(/\b(led|built|designed|launched|increased|reduced|improved|scaled|delivered|managed|created|developed|architected|optimized|shipped|grew|achieved|established|drove|generated)\b/gi) || []).length;

  const metricScore = Math.min(100, metrics * 12);
  const verbScore   = Math.min(100, verbs   * 7);
  return Math.round(metricScore * 0.6 + verbScore * 0.4);
}

function calculateReadabilityScore(resumeText) {
  const lines   = resumeText.split("\n").filter(l => l.trim());
  if (!lines.length) return 0;

  const avgLen  = lines.reduce((s, l) => s + l.length, 0) / lines.length;
  // Penalty for very long lines (walls of text) or very short lines (too sparse)
  let score = 100;
  if (avgLen > 120) score -= 30;
  else if (avgLen > 90) score -= 15;
  else if (avgLen < 20) score -= 20;

  // Bonus for concise bullet structure
  const bulletLines = lines.filter(l => /^[-•*▸]/.test(l.trim()));
  if (bulletLines.length / lines.length > 0.4) score += 10;

  return Math.min(100, Math.max(0, score));
}

// ─── ATS FORMAT SCORE ─────────────────────────────────────────────────────────
// Checks formatting signals that ATS bots care about

function calculateATSFormatScore(resumeText) {
  let score = 60; // baseline

  // Good: standard section headers
  if (/\b(experience|education|skills|projects)\b/i.test(resumeText)) score += 10;
  // Good: dates in standard formats
  if (/\b(20\d\d|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i.test(resumeText)) score += 10;
  // Good: email address present
  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/.test(resumeText)) score += 10;
  // Bad: likely table/column layout (too many tabs)
  const tabRatio = (resumeText.match(/\t/g) || []).length / resumeText.length;
  if (tabRatio > 0.02) score -= 15;
  // Bad: special unicode characters (from fancy templates)
  if (/[^\x00-\x7F]/.test(resumeText.replace(/[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/gi, ""))) score -= 10;

  return Math.min(100, Math.max(0, score));
}

// ─── ATS BREAKDOWN (for the breakdown chart) ──────────────────────────────────

function buildATSBreakdown(scores) {
  const color = s => s >= 70 ? "#00d084" : s >= 50 ? "#ff8c00" : "#ff3b3b";
  return [
    { label: "Formatting",     score: scores.atsFormat,   color: color(scores.atsFormat)   },
    { label: "Keywords",       score: scores.keywords,    color: color(scores.keywords)    },
    { label: "Experience",     score: scores.impact,      color: color(scores.impact)      },
    { label: "Projects",       score: scores.projectScore,color: color(scores.projectScore)},
    { label: "Education",      score: scores.structure,   color: color(scores.structure)   },
  ];
}

function calculateProjectScore(resumeText) {
  const text       = resumeText.toLowerCase();
  const indicators = ["project", "web app", "application", "platform", "built", "developed", "launched", "shipped", "github", "deployed"];
  let matches      = indicators.filter(w => text.includes(w)).length;
  if (matches >= 6) return 100;
  if (matches >= 4) return 80;
  if (matches >= 2) return 60;
  if (matches >= 1) return 40;
  return 15;
}

// ─── DETECTED / MISSING SKILLS ────────────────────────────────────────────────

export function getDetectedSkills(resumeText) {
  return matchSkillsInText(TECH_DICTIONARY, resumeText);
}

export function getMissingSkills(resumeText, roleId, seniorityKey, jdSkills = []) {
  const profileSkills = [];
  if (roleId && ROLE_PROFILES[roleId]) {
    const profile = ROLE_PROFILES[roleId][seniorityKey] || ROLE_PROFILES[roleId].mid;
    profileSkills.push(...profile.core, ...profile.bonus);
  }

  const allRequired = [...new Set([...profileSkills, ...jdSkills])];
  return allRequired.filter(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return !new RegExp(`\\b${escaped}\\b`, "i").test(resumeText);
  }).slice(0, 12); // cap at 12 for UI
}

// ─── MAIN SCORING FUNCTION ────────────────────────────────────────────────────
//
// calculateATS(resumeText, { selectedRole, seniority, jobDesc })
//
// Returns the full verdict object used by the API/frontend

export function calculateATS(resumeText, options = {}) {
  const { selectedRole, seniority: seniorityRaw, jobDesc } = options;
  
  // Normalize inputs
  const hasRole      = !!selectedRole && ROLE_PROFILES[selectedRole];
  const hasSeniority = !!seniorityRaw;
  const hasJD        = !!jobDesc && jobDesc.trim().length > 50;

  // ── Determine scoring mode ────────────────────────────────────────────────
  // Mode 1: Resume + JD + Role/Seniority
  // Mode 2: Resume + JD only   OR   Resume + Role/Seniority only
  // Mode 3: Resume only → auto-detect role + seniority
  let mode;
  if (hasRole && hasSeniority && hasJD) mode = 1;
  else if (hasJD || (hasRole && hasSeniority)) mode = 2;
  else mode = 3;

  // ── Resolve role + seniority ──────────────────────────────────────────────
  const resolvedRole      = hasRole      ? selectedRole      : detectRole(resumeText);
  const resolvedSeniority = hasSeniority ? SENIORITY_MAP[seniorityRaw] || seniorityRaw : detectSeniority(resumeText);
  const profile           = ROLE_PROFILES[resolvedRole]?.[resolvedSeniority]
                         || ROLE_PROFILES[resolvedRole]?.mid
                         || { core: [], bonus: [] };

  // ── Extract JD skills ─────────────────────────────────────────────────────
  const jdSkills = hasJD ? extractSkillsFromJD(jobDesc) : [];

  // ── Score components ──────────────────────────────────────────────────────
  const structureScore  = calculateStructureScore(resumeText);
  const impactScore     = calculateImpactScore(resumeText);
  const projectScore    = calculateProjectScore(resumeText);
  const readability     = calculateReadabilityScore(resumeText);
  const atsFormat       = calculateATSFormatScore(resumeText);

  // Keyword score = how well resume covers required skills
  let keywordScore = 50;
  let coverageResult = { score: 50, coreMatches: [], bonusMatches: [], missingCore: [], missingBonus: [] };

  if (mode === 1) {
    // Full context: merge JD skills with profile, weight JD heavier
    const mergedCore  = [...new Set([...profile.core,  ...jdSkills.slice(0, Math.floor(jdSkills.length * 0.6))])];
    const mergedBonus = [...new Set([...profile.bonus, ...jdSkills.slice(Math.floor(jdSkills.length * 0.6))])];
    coverageResult = scoreSkillCoverage(mergedCore, mergedBonus, resumeText);
    keywordScore   = coverageResult.score;

  } else if (mode === 2 && hasJD) {
    // JD only
    const jdCore  = jdSkills.slice(0, Math.ceil(jdSkills.length * 0.6));
    const jdBonus = jdSkills.slice(Math.ceil(jdSkills.length * 0.6));
    coverageResult = scoreSkillCoverage(jdCore, jdBonus, resumeText);
    keywordScore   = coverageResult.score;

  } else if (mode === 2 && hasRole && hasSeniority) {
    // Role + seniority only
    coverageResult = scoreSkillCoverage(profile.core, profile.bonus, resumeText);
    keywordScore   = coverageResult.score;

  } else {
    // Mode 3: auto-detected profile, generous scoring
    coverageResult = scoreSkillCoverage(profile.core, profile.bonus, resumeText);
    // Generous curve — don't penalize for not matching a profile they never selected
    keywordScore   = Math.round(coverageResult.score * 0.7 + 30);
    console.log("Detected Role:", detectRole(resumeText));
  }

  // ── Final score weights (vary by mode) ────────────────────────────────────
  let finalScore;
  if (mode === 1 || mode === 2) {
    // Full / partial context: keyword match matters most
    finalScore = Math.round(
      keywordScore  * 0.40 +
      impactScore   * 0.25 +
      structureScore * 0.15 +
      projectScore  * 0.12 +
      readability   * 0.08,
    );
  } else {
    // Mode 3: even weighting — more forgiving
    finalScore = Math.round(
      keywordScore  * 0.25 +
      impactScore   * 0.30 +
      structureScore * 0.20 +
      projectScore  * 0.15 +
      readability   * 0.10,
    );
  }

  // Clamp 0-100
  finalScore = Math.max(0, Math.min(100, finalScore));

  return {
    finalScore,
    structure:    structureScore,
    impact:       impactScore,
    projects:     projectScore,
    readability,
    atsFormat,
    keywords:     keywordScore,

    // ATS breakdown for chart
    atsBreakdown: buildATSBreakdown({
      atsFormat,
      keywords:     keywordScore,
      impact:       impactScore,
      projectScore,
      structure:    structureScore,
    }),

    // Detected / missing skills
    detectedSkills: getDetectedSkills(resumeText),
    missingSkills:  getMissingSkills(resumeText, resolvedRole, resolvedSeniority, jdSkills),

    // Meta (useful for summary generation)
    scoringMode:        mode,
    resolvedRole,
    resolvedSeniority,
    jdSkillsExtracted:  jdSkills,
  };
}

// ─── VERDICT LABEL ───────────────────────────────────────────────────────────

export function getVerdictLabel(score) {
  if (score >= 85) return "EXCELLENT MATCH";
  if (score >= 70) return "STRONG CANDIDATE";
  if (score >= 55) return "GOOD FOUNDATION";
  if (score >= 40) return "NEEDS WORK";
  return "HIGH RISK";
}

// ─── USAGE EXAMPLE ───────────────────────────────────────────────────────────
/*

// Case 1 — Full context
const result = calculateATS(resumeText, {
  selectedRole: "software_engineer",
  seniority:    "SENIOR",
  jobDesc:      "We need a senior engineer with TypeScript, React, system design...",
});

// Case 2a — JD only
const result = calculateATS(resumeText, {
  jobDesc: "Looking for someone with Python, TensorFlow, and 3+ years of ML...",
});

// Case 2b — Role + seniority only
const result = calculateATS(resumeText, {
  selectedRole: "product_manager",
  seniority:    "MID",
});

// Case 3 — Resume only
const result = calculateATS(resumeText);

// Result shape:
// {
//   finalScore: 72,
//   structure: 75, impact: 60, projects: 80, readability: 85,
//   atsFormat: 80, keywords: 68,
//   atsBreakdown: [{ label, score, color }, ...],
//   detectedSkills: ["react", "typescript", ...],
//   missingSkills:  ["system design", "kubernetes", ...],
//   scoringMode: 1 | 2 | 3,
//   resolvedRole: "software_engineer",
//   resolvedSeniority: "senior",
//   jdSkillsExtracted: ["typescript", "react", ...],
// }

*/