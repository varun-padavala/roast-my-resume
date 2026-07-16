import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────── */
const D = {
  name: "john-doe-resume.pdf",
  role: "Full Stack Developer",
  seniority: "MID",
  matchScore: 74,
  verdict: "NEEDS WORK",
  verdictColor: "#ff8c00",
  summary: "Strong frontend foundation with React and JavaScript, but backend depth is thin and project descriptions don't sell your impact. Fixable in a weekend.",
  roastMode: "brutal",

  quickStats: [
    { id: "ats",      label: "ATS",      score: 78, color: "#00d084" },
    { id: "keywords", label: "KEYWORDS", score: 63, color: "#ff8c00" },
    { id: "projects", label: "PROJECTS", score: 81, color: "#00d084" },
    { id: "impact",   label: "IMPACT",   score: 42, color: "#ff3b3b" },
  ],

  strengths: ["React & component architecture", "REST API integration", "JavaScript (ES6+)", "Team project experience", "Clean resume formatting"],
  weaknesses: ["No testing tools (Jest, Cypress)", "No deployment experience", "Weak project descriptions — reads like a chore list", "Backend skills not demonstrated beyond CRUD"],

  missingSkills: ["Docker", "Redis", "CI/CD", "Testing (Jest)", "AWS / GCP", "TypeScript"],
  detectedSkills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "REST APIs", "Git", "HTML/CSS"],

  atsBreakdown: [
    { label: "Formatting",   score: 90, color: "#00d084" },
    { label: "Keywords",     score: 62, color: "#ff8c00" },
    { label: "Experience",   score: 75, color: "#00d084" },
    { label: "Projects",     score: 82, color: "#00d084" },
    { label: "Education",    score: 70, color: "#ff8c00" },
  ],

  actions: [
    { priority: "HIGH", text: "Quantify every bullet — add numbers, percentages, or scale." },
    { priority: "HIGH", text: "Add Docker and CI/CD to skills — they appear 5× in the JD." },
    { priority: "MED",  text: "Rewrite project descriptions with stack + outcome + impact." },
    { priority: "MED",  text: "Add a GitHub link — no proof means no trust." },
    { priority: "LOW",  text: "Trim your summary to 2 lines. Recruiters read for 6 seconds." },
  ],

  projects: [
    {
      name: "Event Hub",
      current: "Built a website where users can create and join events.",
      better:  "Developed a full-stack event management platform (React, Node.js, MongoDB) supporting 500+ concurrent users with real-time notifications via Socket.io.",
    },
    {
      name: "E-Commerce Platform",
      current: "Made an online store with a shopping cart.",
      better:  "Built a production-ready e-commerce app (React, Express, Stripe API) with JWT auth, cart persistence, and order tracking — deployed on Vercel + Railway.",
    },
  ],

  suggestedProjects: [
    { name: "Realtime Chat App",      stack: "React · Socket.io · Redis",       why: "Proves WebSocket & caching skills — missing from your resume." },
    { name: "Microservices Project",  stack: "Node.js · Docker · Kubernetes",   why: "Shows backend depth and DevOps exposure recruiters look for." },
    { name: "AI Resume Analyzer",     stack: "Next.js · OpenAI API · Postgres",  why: "High-signal project that proves API integration and product thinking." },
  ],

  skillGap: { current: 72, target: 100 },

  roastLines: [
    "\"Responsible for managing team\" — responsible for WHAT exactly? Watering them?",
    "Six bullet points, zero numbers. You could have written this about anyone.",
    "No GitHub link. You could have invented all of this in a fever dream.",
    "\"Synergized cross-functional stakeholder alignment\" — this is a resume, not a hostage note.",
    "Your summary is 6 lines long. Recruiters read for 6 seconds total. Do the math.",
  ],
};

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function useCountUp(target, duration = 1200, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.round(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return val;
}

function AnimatedBar({ score, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(score), delay + 100);
    return () => clearTimeout(t);
  }, [score, delay]);
  return (
    <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden", flex: 1 }}>
      <div style={{
        height: "100%", width: `${width}%`, background: color,
        borderRadius: 2, transition: `width 0.9s cubic-bezier(0.16,1,0.3,1)`,
      }} />
    </div>
  );
}

function Pill({ children, type = "missing" }) {
  const cfg = {
    missing: { bg: "rgba(255,59,59,0.08)",  border: "rgba(255,59,59,0.2)",  color: "#ff6b6b" },
    present: { bg: "rgba(0,208,132,0.08)",   border: "rgba(0,208,132,0.2)", color: "#00d084" },
    neutral: { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" },
  }[type];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "5px 12px", borderRadius: 20,
      border: `1px solid ${cfg.border}`,
      background: cfg.bg, color: cfg.color,
      fontFamily: "'Space Mono', monospace",
      fontSize: 11, letterSpacing: "0.06em",
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace", fontSize: 10,
      letterSpacing: "0.18em", color: "rgba(255,255,255,0.2)",
      textTransform: "uppercase", marginBottom: 14,
    }}>{children}</div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 8, background: "rgba(255,255,255,0.02)",
      ...style,
    }}>{children}</div>
  );
}

function OverviewTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

      {/* Strengths */}
      <Card style={{ padding: "20px 22px" }}>
        <SectionLabel>✓ Strengths</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {D.strengths.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ color: "#00d084", fontFamily: "'Space Mono', monospace", fontSize: 11, flexShrink: 0, marginTop: 2 }}>✓</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(240,237,232,0.65)", lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Weaknesses */}
      <Card style={{ padding: "20px 22px" }}>
        <SectionLabel>✕ Weaknesses</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {D.weaknesses.map((w, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ color: "#ff3b3b", fontFamily: "'Space Mono', monospace", fontSize: 11, flexShrink: 0, marginTop: 2 }}>✕</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(240,237,232,0.65)", lineHeight: 1.5 }}>{w}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Missing skills */}
      <Card style={{ padding: "20px 22px" }}>
        <SectionLabel>Missing Skills</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {D.missingSkills.map(s => <Pill key={s} type="missing">{s}</Pill>)}
        </div>
      </Card>

      {/* Recommended actions */}
      <Card style={{ padding: "20px 22px" }}>
        <SectionLabel>Recommended Actions</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {D.actions.map((a, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, paddingTop: 10, paddingBottom: 10,
              borderBottom: i < D.actions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 9,
                letterSpacing: "0.08em", flexShrink: 0, marginTop: 2,
                padding: "2px 7px", borderRadius: 3,
                background: a.priority === "HIGH" ? "rgba(255,59,59,0.12)" : a.priority === "MED" ? "rgba(255,140,0,0.12)" : "rgba(255,255,255,0.06)",
                color: a.priority === "HIGH" ? "#ff6b6b" : a.priority === "MED" ? "#ff8c00" : "rgba(255,255,255,0.3)",
                border: `1px solid ${a.priority === "HIGH" ? "rgba(255,59,59,0.2)" : a.priority === "MED" ? "rgba(255,140,0,0.2)" : "rgba(255,255,255,0.08)"}`,
                height: "fit-content",
              }}>{a.priority}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(240,237,232,0.6)", lineHeight: 1.5 }}>{a.text}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ATSTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <Card style={{ padding: "20px 22px" }}>
        <SectionLabel>ATS Category Breakdown</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {D.atsBreakdown.map((row, i) => (
            <div key={row.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>{row.label}</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: row.color, letterSpacing: "0.06em" }}>{row.score}</span>
              </div>
              <AnimatedBar score={row.score} color={row.color} delay={i * 80} />
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card style={{ padding: "20px 22px" }}>
          <SectionLabel>Missing Keywords</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {D.missingSkills.map(s => <Pill key={s} type="missing">{s}</Pill>)}
          </div>
        </Card>
        <Card style={{ padding: "20px 22px" }}>
          <SectionLabel>What To Do</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Add missing keywords naturally into your experience bullets.",
              "Don't just list them in skills — demonstrate usage in projects.",
              "Mirror the exact phrasing from the job description.",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10 }}>
                <span style={{ color: "#ff8c00", fontFamily: "'Space Mono', monospace", fontSize: 10, flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(240,237,232,0.55)", lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Rewrites */}
      <div>
        <SectionLabel>Current Projects — Rewritten</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {D.projects.map((p, i) => (
            <Card key={i} style={{ padding: "20px 22px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "0.06em", color: "#f0ede8", marginBottom: 14 }}>{p.name}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ padding: "14px 16px", borderRadius: 6, background: "rgba(255,59,59,0.05)", border: "1px solid rgba(255,59,59,0.12)" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "#ff3b3b", marginBottom: 8, textTransform: "uppercase" }}>Current</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(240,237,232,0.45)", lineHeight: 1.6, fontStyle: "italic" }}>"{p.current}"</p>
                </div>
                <div style={{ padding: "14px 16px", borderRadius: 6, background: "rgba(0,208,132,0.05)", border: "1px solid rgba(0,208,132,0.15)" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.12em", color: "#00d084", marginBottom: 8, textTransform: "uppercase" }}>Better</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>{p.better}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Suggested projects */}
      <div>
        <SectionLabel>Suggested Projects — Build These Next</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {D.suggestedProjects.map((p, i) => (
            <Card key={i} style={{ padding: "20px 22px" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, letterSpacing: "0.06em", color: "#f0ede8", marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", marginBottom: 10 }}>{p.stack}</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(240,237,232,0.45)", lineHeight: 1.55 }}>{p.why}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillsTab() {
  const cur = useCountUp(D.skillGap.current, 1000, 200);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <Card style={{ padding: "20px 22px" }}>
        <SectionLabel>Detected Skills</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {D.detectedSkills.map(s => <Pill key={s} type="present">{s}</Pill>)}
        </div>
      </Card>

      <Card style={{ padding: "20px 22px" }}>
        <SectionLabel>Missing Skills</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {D.missingSkills.map(s => <Pill key={s} type="missing">{s}</Pill>)}
        </div>
      </Card>

      <Card style={{ padding: "28px 28px", gridColumn: "1 / -1" }}>
        <SectionLabel>Skill Gap Score</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 32, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 8 }}>CURRENT</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, lineHeight: 0.9, color: "#ff8c00", letterSpacing: "0.02em" }}>{cur}<span style={{ fontSize: 28, color: "rgba(255,140,0,0.4)" }}>%</span></div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 20, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${cur}%`, background: "#ff8c00", borderRadius: 2, transition: "width 0.05s" }} />
            </div>
          </div>
          <div style={{ height: 80, background: "rgba(255,255,255,0.06)" }} />
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 8 }}>TARGET</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, lineHeight: 0.9, color: "rgba(255,255,255,0.12)", letterSpacing: "0.02em" }}>100<span style={{ fontSize: 28 }}>%</span></div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 20 }}>
              <div style={{ height: "100%", width: "100%", background: "rgba(255,255,255,0.08)", borderRadius: 2 }} />
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 10, lineHeight: 1.5 }}>
              Add {D.missingSkills.length} skills to close the gap.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RoastTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{
        padding: "18px 22px", borderRadius: 8,
        border: "1px solid rgba(255,59,59,0.15)",
        background: "rgba(255,59,59,0.04)",
        marginBottom: 4,
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#ff3b3b", letterSpacing: "0.12em" }}>⚠ BRUTAL MODE ENABLED</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", marginLeft: 12 }}>This is what a brutally honest recruiter actually thinks.</span>
      </div>
      {D.roastLines.map((line, i) => (
        <Card key={i} style={{ padding: "18px 22px", display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 28,
            color: "rgba(255,59,59,0.3)", flexShrink: 0, lineHeight: 1,
          }}>{String(i + 1).padStart(2, "0")}</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(240,237,232,0.65)", lineHeight: 1.65, fontStyle: "italic" }}>
            "{line}"
          </p>
        </Card>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   ANIMATED SCORE RING
───────────────────────────────────────── */
function ScoreRing({ score }) {
  const count = useCountUp(score, 1400, 300);
  const r = 54; const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (circ * score / 100)), 400);
    return () => clearTimeout(t);
  }, [score, circ]);

  const color = score >= 70 ? "#00d084" : score >= 50 ? "#ff8c00" : "#ff3b3b";
  return (
    <div style={{ position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="140" height="140" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div style={{ textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 46, lineHeight: 0.9, color, letterSpacing: "0.02em" }}>{count}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginTop: 5 }}>MATCH SCORE</div>
      </div>
    </div>
  );
}

//confidence meter 
function ConfidenceMeter({ score }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(score), 600); return () => clearTimeout(t); }, [score]);
  const segs = 12; const filled = Math.round((score / 100) * segs);
  const color = score >= 70 ? "#00d084" : score >= 50 ? "#ff8c00" : "#ff3b3b";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color, letterSpacing: "0.04em", lineHeight: 1 }}>{score}%</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", lineHeight: 1.5 }}>
          CONFIDENCE<br />METER
        </div>
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: segs }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 2,
            background: i < filled ? color : "rgba(255,255,255,0.07)",
            transition: `background ${0.05 * i}s ease`,
            transitionDelay: `${0.6 + i * 0.04}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

//page
const TABS = ["OVERVIEW", "ATS", "PROJECTS", "SKILLS", "ROAST"];

export default function AnalysisPage() {
  const [tab, setTab] = useState("OVERVIEW");
  const [roastMode, setRoastMode] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }

        /* ── Background system ── */
        .bg-root {
          min-height: 100vh;
          background: #080808;
          color: #f0ede8;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        /* Diagonal scanlines */
        .bg-root::before {
          content: '';
          position: fixed; inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.012) 40px,
            rgba(255,255,255,0.012) 41px
          );
          pointer-events: none; z-index: 0;
        }

        /* Radial vignette — dark edges, slight warmth in center */
        .bg-root::after {
          content: '';
          position: fixed; inset: 0;
          background: radial-gradient(
            ellipse 90% 80% at 50% 40%,
            rgba(30, 20, 10, 0) 0%,
            rgba(8, 8, 8, 0.5) 60%,
            rgba(8, 8, 8, 0.92) 100%
          );
          pointer-events: none; z-index: 0;
        }

        /* Warm amber glow — top left, like a desk lamp */
        .ambient-glow {
          position: fixed;
          top: -200px; left: -200px;
          width: 700px; height: 700px;
          background: radial-gradient(ellipse at center,
            rgba(255, 160, 60, 0.06) 0%,
            rgba(255, 120, 30, 0.03) 40%,
            transparent 70%
          );
          pointer-events: none; z-index: 0; border-radius: 50%;
        }

        /* Subtle dot grid */
        .dot-grid {
          position: fixed; inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none; z-index: 0;
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 30% 30%, black 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
          mask-image: radial-gradient(ellipse 80% 70% at 30% 30%, black 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
        }

        .content { position: relative; z-index: 10; }

        /* Tab underline animation */
        .tab-btn {
          font-family: 'Space Mono', monospace;
          font-size: 10px; letter-spacing: 0.14em;
          text-transform: uppercase;
          background: transparent; border: none;
          padding: 12px 0; cursor: pointer;
          position: relative; color: rgba(255,255,255,0.25);
          transition: color 0.2s;
        }
        .tab-btn::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: #f0ede8;
          transform: scaleX(0); transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .tab-btn.active { color: #f0ede8; }
        .tab-btn.active::after { transform: scaleX(1); }
        .tab-btn:hover { color: rgba(255,255,255,0.6); }

        .ghost-text { color: transparent; -webkit-text-stroke: 1.5px #f0ede8; }

        /* Tab content fade */
        .tab-content {
          animation: tabIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes tabIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Roast toggle */
        .roast-toggle {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 14px;
          border: 1px solid rgba(255,59,59,0.2);
          border-radius: 4px;
          cursor: pointer;
          background: rgba(255,59,59,0.06);
          transition: all 0.2s;
        }
        .roast-toggle.off {
          border-color: rgba(255,255,255,0.08);
          background: transparent;
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-in { animation: heroIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        .hero-in-2 { animation: heroIn 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both; }
        .hero-in-3 { animation: heroIn 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <div className="bg-root">
        <div className="ambient-glow" />
        <div className="dot-grid" />

        {/* ── NAV ── */}
        <nav className="content" style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky", top: 0,
          background: "rgba(8,8,8,0.88)", backdropFilter: "blur(12px)",
          zIndex: 100,
        }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
            ROASTMYRESUME.AI
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00d084", boxShadow: "0 0 6px #00d084" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)" }}>
              ANALYSIS COMPLETE · {D.name}
            </span>
          </div>

          <button style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
            background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 4, padding: "7px 14px", cursor: "pointer",
          }}>← START OVER</button>
        </nav>

        {/* ── HERO ── */}
        <div className="content" style={{
          padding: "48px 40px 0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          maxWidth: 1140, margin: "0 auto",
        }}>

          {/* Top row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, paddingBottom: 40, flexWrap: "wrap" }}>

            {/* Left: headline */}
            <div className="hero-in" style={{ flex: "1 1 380px" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <span>{D.role}</span>
                <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                <span>{D.seniority}</span>
              </div>

              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(56px, 7vw, 90px)",
                lineHeight: 0.92, letterSpacing: "-0.01em",
                color: "#f0ede8", marginBottom: 20,
              }}>
                YOUR RESUME<br />
                <span className="ghost-text">{D.verdict}.</span>
              </h1>

              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                color: "rgba(255,255,255,0.38)", lineHeight: 1.65,
                maxWidth: 420, marginBottom: 28,
              }}>
                {D.summary}
              </p>

              {/* Confidence meter */}
              <ConfidenceMeter score={D.matchScore} />
            </div>

            {/* Right: score ring + roast toggle */}
            <div className="hero-in-2" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 20 }}>
              <ScoreRing score={D.matchScore} />

              {/* Roast toggle */}
              <div
                className={`roast-toggle ${roastMode ? "" : "off"}`}
                onClick={() => { setRoastMode(r => !r); if (!roastMode) setTab("ROAST"); }}
              >
                <div style={{
                  width: 28, height: 16, borderRadius: 8,
                  background: roastMode ? "rgba(255,59,59,0.4)" : "rgba(255,255,255,0.08)",
                  position: "relative", transition: "background 0.2s",
                }}>
                  <div style={{
                    position: "absolute", top: 2, left: roastMode ? 14 : 2,
                    width: 12, height: 12, borderRadius: "50%",
                    background: roastMode ? "#ff3b3b" : "rgba(255,255,255,0.3)",
                    transition: "left 0.2s, background 0.2s",
                  }} />
                </div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: roastMode ? "#ff3b3b" : "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                  ROAST MODE
                </span>
              </div>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="hero-in-3" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, paddingBottom: 32 }}>
            {D.quickStats.map(s => (
              <QuickStatCard key={s.id} stat={s} />
            ))}
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="content" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 40px" }}>

          {/* Tab bar */}
          <div style={{
            display: "flex", gap: 28,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 28, marginTop: 32,
          }}>
            {TABS.map(t => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "ROAST" && <span style={{ marginRight: 5, color: "#ff3b3b" }}>🔥</span>}
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div key={tab} className="tab-content" style={{ paddingBottom: 80 }}>
            {tab === "OVERVIEW"  && <OverviewTab />}
            {tab === "ATS"       && <ATSTab />}
            {tab === "PROJECTS"  && <ProjectsTab />}
            {tab === "SKILLS"    && <SkillsTab />}
            {tab === "ROAST"     && <RoastTab />}
          </div>
        </div>
      </div>
    </>
  );
}

function QuickStatCard({ stat }) {
  const count = useCountUp(stat.score, 1000, 400);
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 7, padding: "16px 18px",
      background: "rgba(255,255,255,0.02)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Color accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: stat.color, opacity: 0.6 }} />
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.14em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 8 }}>
        {stat.label}
      </div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, lineHeight: 0.95, color: stat.color, letterSpacing: "0.04em" }}>
        {count}<span style={{ fontSize: 16, opacity: 0.5 }}>%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1, marginTop: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${stat.score}%`, background: stat.color, opacity: 0.4, borderRadius: 1 }} />
      </div>
    </div>
  );
}
