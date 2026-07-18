const ANALYSIS_TABS = ["OVERVIEW", "ATS", "PROJECTS", "SKILLS"];
import { useResume } from "../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import AppNav from "../components/Appnav";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

// ─── STATIC FALLBACK CONTENT ─────────────────────────────────────────────────
const FALLBACK = {
  summary:           "Analysing your resume…",
  strengths:         [],
  weaknesses:        [],
  missingSkills:     [],
  detectedSkills:    [],
  actions:           [],
  atsBreakdown:      [
    { label: "Formatting", score: 0, color: "#00d084" },
    { label: "Keywords",   score: 0, color: "#ff8c00" },
    { label: "Experience", score: 0, color: "#00d084" },
    { label: "Projects",   score: 0, color: "#00d084" },
    { label: "Education",  score: 0, color: "#ff8c00" },
  ],
  projects:          [],
  suggestedProjects: [],

};

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function useCountUp(target, duration = 1100, delay = 0, active = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      let start = null;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.round(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay, active]);
  return val;
}

function VCard({ children, style = {} }) {
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 8,
      background: "rgba(255,255,255,0.02)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: "'Space Mono',monospace",
      fontSize: 10,
      letterSpacing: "0.18em",
      color: "rgba(255,255,255,0.2)",
      textTransform: "uppercase",
      marginBottom: 14,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Pill({ children, type = "missing" }) {
  const cfg = {
    missing: { bg: "rgba(255,59,59,0.08)",  border: "rgba(255,59,59,0.2)",  color: "#ff6b6b" },
    present: { bg: "rgba(0,208,132,0.08)",  border: "rgba(0,208,132,0.2)", color: "#00d084" },
  }[type];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "5px 12px", borderRadius: 20,
      border: `1px solid ${cfg.border}`, background: cfg.bg, color: cfg.color,
      fontFamily: "'Space Mono',monospace", fontSize: 11,
      letterSpacing: "0.06em", whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

function AnimBar({ score, color, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(score), delay + 100);
    return () => clearTimeout(t);
  }, [score, delay]);
  return (
    <div style={{
      height: 3, background: "rgba(255,255,255,0.07)",
      borderRadius: 2, overflow: "hidden", flex: 1,
    }}>
      <div style={{
        height: "100%", width: `${w}%`, background: color, borderRadius: 2,
        transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <p style={{
      fontFamily: "'Space Mono',monospace", fontSize: 11,
      color: "rgba(255,255,255,0.15)", letterSpacing: "0.06em",
      fontStyle: "italic",
    }}>{text}</p>
  );
}

function LoadingPulse() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "rgba(255,255,255,0.25)",
          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// ─── SCORE RING ───────────────────────────────────────────────────────────────

function ScoreRing({ score }) {
  const count = useCountUp(score, 1400, 400, true);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const [off, setOff] = useState(circ);
  useEffect(() => {
    const t = setTimeout(() => setOff(circ - circ * score / 100), 500);
    return () => clearTimeout(t);
  }, [circ, score]);
  const color = score >= 70 ? "#00d084" : score >= 50 ? "#ff8c00" : "#ff3b3b";
  return (
    <div style={{
      position: "relative", width: 140, height: 140,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <svg width="140" height="140" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
      </svg>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 46,
          lineHeight: 0.9, color, letterSpacing: "0.02em",
        }}>{count}</div>
        <div style={{
          fontFamily: "'Space Mono',monospace", fontSize: 9,
          color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginTop: 4,
        }}>MATCH SCORE</div>
      </div>
    </div>
  );
}

// ─── QUICK STAT CARD ──────────────────────────────────────────────────────────

function QuickStat({ stat, active }) {
  const color = stat.score >= 70 ? "#00d084" : stat.score >= 50 ? "#ff8c00" : "#ff3b3b";
  const count = useCountUp(stat.score, 1000, 500, active);
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.07)", borderRadius: 7,
      padding: "16px 18px", background: "rgba(255,255,255,0.02)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 2, background: color, opacity: 0.7,
      }} />
      <div style={{
        fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 8,
      }}>{stat.label}</div>
      <div style={{
        fontFamily: "'Bebas Neue',sans-serif", fontSize: 36,
        lineHeight: 0.95, color, letterSpacing: "0.04em",
      }}>
        {count}<span style={{ fontSize: 16, opacity: 0.5 }}>%</span>
      </div>
      <div style={{
        height: 2, background: "rgba(255,255,255,0.06)",
        borderRadius: 1, marginTop: 10, overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${active ? stat.score : 0}%`,
          background: color, opacity: 0.4,
          transition: "width 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
        }} />
      </div>
    </div>
  );
}

// ─── CONFIDENCE METER ─────────────────────────────────────────────────────────

function ConfidenceMeter({ score }) {
  const color = score >= 70 ? "#00d084" : score >= 50 ? "#ff8c00" : "#ff3b3b";
  return (
    <div style={{ maxWidth: 320, width: "100%" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", marginBottom: 8,
        fontFamily: "'Space Mono', monospace", fontSize: 10,
        letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)",
      }}>
        <span>CONFIDENCE</span>
        <span>{score}%</span>
      </div>
      <div style={{
        height: 6, background: "rgba(255,255,255,0.08)",
        borderRadius: 999, overflow: "hidden",
      }}>
        <div style={{
          width: `${score}%`, height: "100%", background: color,
          transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
    </div>
  );
}

// ─── TAB: OVERVIEW ────────────────────────────────────────────────────────────

function OverviewTab({ verdict }) {
  return (
    <div className="grid-2">
      <VCard style={{ padding: "20px 22px" }}>
        <SectionLabel>✓ Strengths</SectionLabel>
        {verdict.strengths.length === 0
          ? <EmptyState text="No strengths detected yet." />
          : verdict.strengths.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ color: "#00d084", fontFamily: "'Space Mono',monospace", fontSize: 11, flexShrink: 0, marginTop: 2 }}>✓</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(240,237,232,0.65)", lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
      </VCard>

      <VCard style={{ padding: "20px 22px" }}>
        <SectionLabel>✕ Weaknesses</SectionLabel>
        {verdict.weaknesses.length === 0
          ? <EmptyState text="No weaknesses found." />
          : verdict.weaknesses.map((w, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <span style={{ color: "#ff3b3b", fontFamily: "'Space Mono',monospace", fontSize: 11, flexShrink: 0, marginTop: 2 }}>✕</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(240,237,232,0.65)", lineHeight: 1.5 }}>{w}</span>
            </div>
          ))}
      </VCard>

      <VCard style={{ padding: "20px 22px" }}>
        <SectionLabel>Missing Skills</SectionLabel>
        {verdict.missingSkills.length === 0
          ? <EmptyState text="No missing skills identified." />
          : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {verdict.missingSkills.map(s => <Pill key={s} type="missing">{s}</Pill>)}
            </div>}
      </VCard>

      <VCard style={{ padding: "20px 22px" }}>
        <SectionLabel>Recommended Actions</SectionLabel>
        {verdict.actions.length === 0
          ? <EmptyState text="Analysis in progress…" />
          : verdict.actions.map((a, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, paddingTop: 10, paddingBottom: 10,
              borderBottom: i < verdict.actions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
            }}>
              <span style={{
                fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: "0.08em",
                flexShrink: 0, marginTop: 2, padding: "2px 7px", borderRadius: 3, height: "fit-content",
                background:  a.p === "HIGH" ? "rgba(255,59,59,0.12)"  : a.p === "MED" ? "rgba(255,140,0,0.12)"  : "rgba(255,255,255,0.06)",
                color:       a.p === "HIGH" ? "#ff6b6b"               : a.p === "MED" ? "#ff8c00"               : "rgba(255,255,255,0.3)",
                border: `1px solid ${a.p === "HIGH" ? "rgba(255,59,59,0.2)" : a.p === "MED" ? "rgba(255,140,0,0.2)" : "rgba(255,255,255,0.08)"}`,
              }}>{a.p}</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(240,237,232,0.6)", lineHeight: 1.5 }}>{a.text}</span>
            </div>
          ))}
      </VCard>
    </div>
  );
}

// ─── TAB: ATS ─────────────────────────────────────────────────────────────────

function ATSTab({ verdict }) {
  return (
    <div className="grid-2">
      <VCard style={{ padding: "20px 22px" }}>
        <SectionLabel>ATS Category Breakdown</SectionLabel>
        {verdict.atsBreakdown.map((row, i) => (
          <div key={row.label} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>{row.label}</span>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: row.color }}>{row.score}</span>
            </div>
            <AnimBar score={row.score} color={row.color} delay={i * 80} />
          </div>
        ))}
      </VCard>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <VCard style={{ padding: "20px 22px" }}>
          <SectionLabel>Missing Keywords</SectionLabel>
          {verdict.missingSkills.length === 0
            ? <EmptyState text="No keywords missing — or still loading." />
            : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {verdict.missingSkills.map(s => <Pill key={s} type="missing">{s}</Pill>)}
              </div>}
        </VCard>

        <VCard style={{ padding: "20px 22px" }}>
          <SectionLabel>How To Fix</SectionLabel>
          {[
            "Add missing keywords naturally into experience bullets.",
            "Don't just list them in skills — demonstrate usage in projects.",
            "Mirror the exact phrasing from the job description.",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < 2 ? 10 : 0 }}>
              <span style={{ color: "#ff8c00", fontFamily: "'Space Mono',monospace", fontSize: 10, flexShrink: 0, marginTop: 2 }}>→</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(240,237,232,0.5)", lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </VCard>
      </div>
    </div>
  );
}

// ─── TAB: PROJECTS ────────────────────────────────────────────────────────────

function ProjectsTab({ verdict }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionLabel>Current Projects — Rewritten</SectionLabel>

      {verdict.projects.length === 0
        ? <VCard style={{ padding: "24px 22px" }}><EmptyState text="No project rewrites generated yet." /></VCard>
        : verdict.projects.map((p, i) => (
          <VCard key={i} style={{ padding: "20px 22px" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: "0.06em", color: "#f0ede8", marginBottom: 14 }}>{p.name}</div>
            <div className="grid-2">
              <div style={{ padding: "14px 16px", borderRadius: 6, background: "rgba(255,59,59,0.05)", border: "1px solid rgba(255,59,59,0.12)" }}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: "0.12em", color: "#ff3b3b", marginBottom: 8, textTransform: "uppercase" }}>Current</div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(240,237,232,0.4)", lineHeight: 1.6, fontStyle: "italic" }}>"{p.current}"</p>
              </div>
              <div style={{ padding: "14px 16px", borderRadius: 6, background: "rgba(0,208,132,0.05)", border: "1px solid rgba(0,208,132,0.15)" }}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: "0.12em", color: "#00d084", marginBottom: 8, textTransform: "uppercase" }}>Better</div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(240,237,232,0.75)", lineHeight: 1.6 }}>{p.better}</p>
              </div>
            </div>
          </VCard>
        ))}

      <SectionLabel style={{ marginTop: 8 }}>Suggested Projects — Build These Next</SectionLabel>

      {verdict.suggestedProjects.length === 0
        ? <VCard style={{ padding: "24px 22px" }}><EmptyState text="No project suggestions yet." /></VCard>
        : <div className="grid-3">
            {verdict.suggestedProjects.map((p, i) => (
              <VCard key={i} style={{ padding: "20px 22px" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, color: "#f0ede8", marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", marginBottom: 10 }}>{p.stack}</div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(240,237,232,0.4)", lineHeight: 1.55 }}>{p.why}</p>
              </VCard>
            ))}
          </div>}
    </div>
  );
}

// ─── TAB: SKILLS ──────────────────────────────────────────────────────────────

function SkillsTab({ verdict }) {
  const cur = useCountUp(verdict.finalScore, 1000, 200, true);
  return (
    <div className="grid-2">
      <VCard style={{ padding: "20px 22px" }}>
        <SectionLabel>Detected Skills</SectionLabel>
        {verdict.detectedSkills.length === 0
          ? <EmptyState text="No skills detected yet." />
          : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {verdict.detectedSkills.map(s => <Pill key={s} type="present">{s}</Pill>)}
            </div>}
      </VCard>

      <VCard style={{ padding: "20px 22px" }}>
        <SectionLabel>Missing Skills</SectionLabel>
        {verdict.missingSkills.length === 0
          ? <EmptyState text="No missing skills." />
          : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {verdict.missingSkills.map(s => <Pill key={s} type="missing">{s}</Pill>)}
            </div>}
      </VCard>

      <VCard className="skill-gap-card" style={{ padding: "28px", gridColumn: "1/-1" }}>
        <SectionLabel>Skill Gap</SectionLabel>
        <div className="skill-gap-grid">
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em", marginBottom: 8 }}>CURRENT</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 72, lineHeight: 0.9, color: "#ff8c00", letterSpacing: "0.02em" }}>
              {cur}<span style={{ fontSize: 28, color: "rgba(255,140,0,0.4)" }}>%</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 18, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${cur}%`, background: "#ff8c00", borderRadius: 2, transition: "width 0.05s" }} />
            </div>
          </div>
          <div className="skill-gap-divider" />
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em", marginBottom: 8 }}>TARGET</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 72, lineHeight: 0.9, color: "rgba(255,255,255,0.1)", letterSpacing: "0.02em" }}>
              100<span style={{ fontSize: 28 }}>%</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 18 }}>
              <div style={{ height: "100%", width: "100%", background: "rgba(255,255,255,0.07)", borderRadius: 2 }} />
            </div>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 10, lineHeight: 1.5 }}>
              Add {verdict.missingSkills.length} skill{verdict.missingSkills.length !== 1 ? "s" : ""} to close the gap.
            </p>
          </div>
        </div>
      </VCard>
    </div>
  );
}

//main

export default function Verdict() {
  
  const {
    resumeText,
    resumeLoaded,
    selectedRole,
    setSelectedRole,
    seniority,
    setSeniority,
    JOB_ROLES,jobDesc, summary,
    analysisLoaded,
    setAnalysisLoaded
  } = useResume();

  const navigate = useNavigate();

  const [apiVerdict, setApiVerdict]   = useState(null);
  const [loading, setLoading]         = useState(false);
  const [analysisTab, setAnalysisTab] = useState("OVERVIEW");

  const finalScore = apiVerdict?.finalScore ?? 0;

  const verdict = {
    finalScore,
    structure:         apiVerdict?.structure         ?? 0,
    projects:          apiVerdict?.projects          ?? 0,
    readability:       apiVerdict?.readability       ?? 0,
    impact:            apiVerdict?.impact            ?? 0,
    label:              apiVerdict?.label      ??     "ANALYSING",
    summary:           apiVerdict?.summary           ?? FALLBACK.summary,
    strengths:         apiVerdict?.strengths         ?? FALLBACK.strengths,
    weaknesses:        apiVerdict?.weaknesses        ?? FALLBACK.weaknesses,
    missingSkills:     apiVerdict?.missingSkills     ?? FALLBACK.missingSkills,
    detectedSkills:    apiVerdict?.detectedSkills    ?? FALLBACK.detectedSkills,
    actions:           apiVerdict?.actions           ?? FALLBACK.actions,
    atsBreakdown:      apiVerdict?.atsBreakdown      ?? FALLBACK.atsBreakdown,
    projects_list:     apiVerdict?.projects_list     ?? FALLBACK.projects,
    suggestedProjects: apiVerdict?.suggestedProjects ?? FALLBACK.suggestedProjects,
  };

  // Tab components use `verdict.projects` to mean project-rewrite entries
  const verdictForTabs = { ...verdict, projects: verdict.projects_list };

  const quickStats = [
    { label: "ATS",         score: verdict.finalScore  },
    { label: "STRUCTURE",   score: verdict.structure   },
    { label: "PROJECTS",    score: verdict.projects    },
    { label: "READABILITY", score: verdict.readability },
  ];

  useEffect(() => {
    if (!resumeLoaded) navigate("/upload");
  }, [resumeLoaded]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!resumeText) return;
    setLoading(true);

    async function loadVerdict() {
      try {

        const res = await fetch(`${API_URL}/api/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText,
            selectedRole,
            seniority,
            jobDesc
          }),
        });
        const data = await res.json();
        
        setApiVerdict(data);
        setAnalysisLoaded(true);

      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    }

    loadVerdict();
  }, [resumeText,selectedRole,
  seniority,
  jobDesc]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
        html, body, #root { height:100%; overflow-x:hidden; scroll-behavior:auto; }
        .bg-root {
          min-height:100vh; background:#080808; color:#f0ede8;
          font-family:'DM Sans',sans-serif; position:relative;
          isolation:isolate; overflow-x:hidden;
        }
        .bleed-br {
          position:fixed; bottom:-120px; right:-120px; width:500px; height:500px;
          background:radial-gradient(ellipse at center,rgba(255,59,59,0.13) 0%,rgba(255,59,59,0.05) 45%,transparent 72%);
          pointer-events:none; z-index:0; border-radius:50%;
        }
        .bleed-tl {
          position:fixed; top:-140px; left:-140px; width:560px; height:560px;
          background:radial-gradient(ellipse at center,rgba(0,160,120,0.1) 0%,rgba(0,120,90,0.04) 45%,transparent 72%);
          pointer-events:none; z-index:0; border-radius:50%;
        }
        .watermark {
          position:fixed; top:120px; right:120px;
          font-family:'Bebas Neue',sans-serif; font-size:clamp(180px,18vw,320px);
          font-weight:900; color:rgba(255,255,255,0.04); letter-spacing:-0.04em;
          white-space:nowrap; text-align:right; pointer-events:none; user-select:none; z-index:0;
        }
        .step-enter { animation:stepIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes stepIn { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        .tab-fade { animation:tabIn 0.3s cubic-bezier(0.16,1,0.3,1); }
        @keyframes tabIn { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
        .text-ghost { color:transparent; -webkit-text-stroke:1.5px #f0ede8; }
        .atab {
          font-family:'Space Mono',monospace; font-size:10px; letter-spacing:0.14em;
          text-transform:uppercase; background:transparent; border:none; padding:12px 0;
          cursor:pointer; position:relative; color:rgba(255,255,255,0.25); transition:color 0.2s;
          white-space: nowrap; flex-shrink: 0;
        }
        .atab::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
          background:#f0ede8; transform:scaleX(0); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .atab.on { color:#f0ede8; }
        .atab.on::after { transform:scaleX(1); }
        .atab:hover { color:rgba(255,255,255,0.6); }
        ::-webkit-scrollbar { width:3px; height:3px; }
        ::-webkit-scrollbar-track { background:#080808; }
        ::-webkit-scrollbar-thumb { background:#222; border-radius:2px; }

        /* ── Responsive layout primitives ───────────────────────────── */
        .verdict-container {
          max-width:1400px; margin:0 auto;
          padding-top:20px; padding-left:20px; padding-right:48px; padding-bottom:40px;
          position:relative; zIndex:2;
        }
        .hero-block {
          padding-top:48px; padding-bottom:40px;
          border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .hero-row {
          display:flex; align-items:flex-start; justify-content:space-between;
          gap:32px; flex-wrap:wrap;
        }
        .hero-text { flex:1 1 380px; }
        .hero-side {
          display:flex; flex-direction:column; align-items:flex-end; gap:20px;
        }
        .quick-stats-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:10px; width:280px;
        }
        .tabs-row {
          display:flex; gap:28px;
          border-bottom:1px solid rgba(255,255,255,0.07);
          margin-bottom:28px; margin-top:32px;
          overflow-x:auto;
          -ms-overflow-style:none; scrollbar-width:none;
        }
        .tabs-row::-webkit-scrollbar { display:none; }
        .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .skill-gap-grid {
          display:grid; grid-template-columns:1fr 1px 1fr; gap:32px; align-items:center;
        }
        .skill-gap-divider { height:80px; background:rgba(255,255,255,0.06); }
        .cta-box {
          margin-top:40px; padding:24px;
          border:1px solid rgba(255,255,255,0.08);
          border-radius:8px; background:rgba(255,255,255,0.02); text-align:center;
        }
        .analyse-another-row {
          border-top:1px solid rgba(255,255,255,0.06);
          padding-top:24px; display:flex; justify-content:center; margin-top:32px;
        }

        @media (max-width: 900px) {
          .quick-stats-grid { width:100%; max-width:340px; }
        }

        @media (max-width: 768px) {
          .verdict-container {
            padding-left:16px; padding-right:16px; padding-top:16px; padding-bottom:32px;
          }
          .watermark { font-size:clamp(100px,28vw,180px); top:60px; right:-20px; opacity:0.03; }
          .hero-block { padding-top:32px; padding-bottom:28px; }
          .hero-row { flex-direction:column; gap:28px; }
          .hero-side { align-items:flex-start; width:100%; }
          .hero-text { flex:1 1 auto; width:100%; }
          .quick-stats-grid { width:100%; max-width:none; }
          .grid-2 { grid-template-columns:1fr; }
          .grid-3 { grid-template-columns:1fr; }
          .skill-gap-grid { grid-template-columns:1fr; gap:20px; }
          .skill-gap-divider { display:none; }
          .tabs-row { gap:20px; }
          .cta-box { padding:20px 16px; }
        }

        @media (max-width: 480px) {
          .verdict-container { padding-left:12px; padding-right:12px; }
          .quick-stats-grid { grid-template-columns:1fr 1fr; }
        }
      `}</style>

      <div className="bg-root">
        <div className="bleed-br" />
        <div className="bleed-tl" />
        <div style={{
          position:"fixed", inset:0, opacity:0.03, pointerEvents:"none", zIndex:0,
          backgroundImage:`linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)`,
          backgroundSize:"80px 80px",
        }} />
        <div className="watermark">VERDICT</div>
        <AppNav navStep={3} />

        <div className="verdict-container">
          <div className="step-enter" style={{ width:"100%" }}>

            <div className="hero-block">
              <div className="hero-row">

                <div className="hero-text">
                  <div style={{
                    fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.18em",
                    color:"rgba(255,255,255,0.2)", textTransform:"uppercase", marginBottom:14,
                    display:"flex", alignItems:"center", gap:10,
                  }}>
                    <span>{selectedRole ? JOB_ROLES.find(r => r.id === selectedRole)?.label : "Full Stack Developer"}</span>
                    <span style={{ color:"rgba(255,255,255,0.1)" }}>·</span>
                    <span>{seniority || "MID"}</span>
                  </div>

                  <h1 style={{
                    fontFamily:"'Bebas Neue',sans-serif",
                    fontSize:"clamp(42px,9vw,88px)", lineHeight:0.92,
                    letterSpacing:"-0.01em", color:"#f0ede8", marginBottom:20,
                  }}>
                    YOUR RESUME<br />
                    <span className="text-ghost">{verdict.label}.</span>
                  </h1>

                  <p style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize:14,
                    color:"rgba(255,255,255,0.38)", lineHeight:1.65,
                    maxWidth:420, marginBottom: loading ? 8 : 28,
                  }}>
                    {verdict.summary}
                  </p>
                  {loading ? <LoadingPulse /> : <div style={{ marginBottom:28 }} />}

                  <ConfidenceMeter score={verdict.finalScore} />
                </div>

                <div className="hero-side">
                  <ScoreRing score={verdict.finalScore} />
                  <div className="quick-stats-grid">
                    {quickStats.map(s => <QuickStat key={s.label} stat={s} active />)}
                  </div>
                </div>
              </div>
            </div>

            
            <div>
              <div className="tabs-row">
                {ANALYSIS_TABS.map(t => (
                  <button key={t} className={`atab${analysisTab === t ? " on" : ""}`} onClick={() => setAnalysisTab(t)}>
                    {t === "ROAST" && <span style={{ marginRight:4, color:"#ff3b3b" }}>🔥</span>}
                    {t}
                  </button>
                ))}
              </div>

              <div key={analysisTab} className="tab-fade" style={{ paddingBottom:60 }}>
                {analysisTab === "OVERVIEW" && <OverviewTab verdict={verdictForTabs} />}
                {analysisTab === "ATS"      && <ATSTab      verdict={verdictForTabs} />}
                {analysisTab === "PROJECTS" && <ProjectsTab verdict={verdictForTabs} />}
                {analysisTab === "SKILLS"   && <SkillsTab   verdict={verdictForTabs} />}
              </div>
            </div>

            
            <div className="cta-box">
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(22px,5vw,28px)", letterSpacing:"0.08em", marginBottom:10 }}>
                STILL NOT SATISFIED?
              </div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.4)", marginBottom:20, fontSize:14 }}>
                Let our recruiters tell you what they really think.
              </div>
              <button
                style={{
                  padding:"14px 28px", background:"#ff8c00", border:"none", borderRadius:4,
                  fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(18px,4vw,22px)", letterSpacing:"0.08em", cursor:"pointer",
                  width:"100%", maxWidth:320,
                }}
                onClick={() => navigate("/roast", { state: { navType:"app" } })}
              >
                🔥 EXECUTE ROAST
              </button>
            </div>

            
            <div className="analyse-another-row">
              <button
                onClick={() => { setSelectedRole(null); setSeniority(null); navigate("/upload"); }}
                style={{
                  fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:"0.1em",
                  color:"rgba(138,138,138,0.25)", background:"transparent",
                  border:"1px solid rgba(255,255,255,0.08)", borderRadius:4,
                  padding:"10px 20px", cursor:"pointer",
                  width:"100%", maxWidth:340,
                }}
              >← ANALYSE ANOTHER RESUME</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}