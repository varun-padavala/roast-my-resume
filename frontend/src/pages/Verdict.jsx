import { useResume } from "../context/ResumeContext";
import { useNavigate, useLocation } from "react-router-dom";
import AppNav from "../components/Appnav";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

const ANALYSIS_TABS = ["OVERVIEW", "ATS", "PROJECTS", "SKILLS"];

const ROLE_LABELS = {
  swe: "Software Engineer",
  pm: "Product Manager",
  design: "UX Designer",
  data: "Data Scientist",
  devops: "DevOps / Infra",
  marketing: "Marketing",
  finance: "Finance / Banking",
  other: "Other role",
};

const FALLBACK = {
  summary: "Analysing your resume…",
  strengths: [],
  weaknesses: [],
  missingSkills: [],
  detectedSkills: [],
  actions: [],
  atsBreakdown: [
    { label: "Formatting", score: 0, color: "#00d084" },
    { label: "Keywords", score: 0, color: "#ff8c00" },
    { label: "Experience", score: 0, color: "#00d084" },
    { label: "Projects", score: 0, color: "#00d084" },
    { label: "Education", score: 0, color: "#ff8c00" },
  ],
  projects: [],
  suggestedProjects: [],
};

/* ── Background decor (same language as Upload / Target / Context) ───────── */
const PARTS = [
  { x: "7%", y: "16%", s: 2, delay: "-1.2s", accent: true },
  { x: "13%", y: "71%", s: 3, delay: "-3.8s" },
  { x: "81%", y: "18%", s: 2, delay: "-.7s" },
  { x: "90%", y: "42%", s: 3, delay: "-2.6s" },
  { x: "76%", y: "83%", s: 2, delay: "-4.2s", accent: true },
  { x: "21%", y: "88%", s: 2, delay: "-5.4s" },
  { x: "58%", y: "10%", s: 2, delay: "-2.1s" },
];

const PAPERS = [
  { x: "8%", y: "23%", w: 34, h: 44, r: -18, o: 0.16, b: 2, d: "-2.5s" },
  { x: "46%", y: "9%", w: 22, h: 30, r: 12, o: 0.1, b: 1.8, d: "-3.3s" },
  { x: "84%", y: "25%", w: 26, h: 34, r: 16, o: 0.13, b: 1.5, d: "-4s" },
  { x: "91%", y: "75%", w: 46, h: 60, r: -11, o: 0.18, b: 1.2, d: "-1.4s" },
  { x: "10%", y: "77%", w: 24, h: 34, r: 25, o: 0.12, b: 1.8, d: "-4.8s" },
  { x: "52%", y: "90%", w: 30, h: 40, r: -7, o: 0.1, b: 2, d: "-2s" },
];

// Small glyph "stamps" that relate to a verdict: pass, fail, score, search
const ICONS = [
  { g: "✓", x: "70%", y: "12%", c: "ok", d: "-1.1s" },
  { g: "✕", x: "88%", y: "34%", c: "bad", d: "-2.9s" },
  { g: "%", x: "64%", y: "88%", c: "warn", d: "-4.4s" },
  { g: "✓", x: "5%", y: "48%", c: "ok", d: "-3.2s" },
  { g: "✕", x: "40%", y: "92%", c: "bad", d: "-.6s" },
  { g: "search", x: "93%", y: "58%", c: "dim", d: "-5s" },
];

const CHIPS = [
  { t: "ATS FIT", x: "78%", y: "20%", d: "0s" },
  { t: "KEYWORDS", x: "54%", y: "76%", d: "-2s" },
  { t: "IMPACT", x: "92%", y: "86%", d: "-4s" },
];

/* ── Hooks / shared bits ─────────────────────────────────────────────────── */
function useCountUp(target, duration = 1100, delay = 0, active = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const t = setTimeout(() => {
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.round(p * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay, active]);
  return val;
}

const scoreColor = (s) => (s >= 70 ? "#00d084" : s >= 50 ? "#ff8c00" : "#ff3b3b");

function VCard({ children, style = {} }) {
  return <div className="vd-card" style={style}>{children}</div>;
}

function SectionLabel({ children, style = {} }) {
  return <div className="vd-label" style={style}>{children}</div>;
}

function Pill({ children, type = "missing" }) {
  return <span className={`vd-pill ${type}`}>{children}</span>;
}

function AnimBar({ score, color, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(score), delay + 100);
    return () => clearTimeout(t);
  }, [score, delay]);
  return (
    <div className="vd-track">
      <div className="vd-fill" style={{ width: `${w}%`, background: color }} />
    </div>
  );
}

function EmptyState({ text }) {
  return <p className="vd-empty">{text}</p>;
}

function LoadingPulse() {
  return (
    <div className="vd-pulse-row">
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  );
}

function ScoreRing({ score, size = 140 }) {
  const count = useCountUp(score, 1400, 400, true);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const [off, setOff] = useState(circ);
  useEffect(() => {
    const t = setTimeout(() => setOff(circ - (circ * score) / 100), 500);
    return () => clearTimeout(t);
  }, [circ, score]);
  const color = scoreColor(score);
  return (
    <div className="vd-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 140 140" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
        <circle
          cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div className="vd-ring-num" style={{ color, fontSize: size * 0.33 }}>{count}</div>
        <div className="vd-ring-cap">MATCH SCORE</div>
      </div>
    </div>
  );
}

function QuickStat({ stat }) {
  const color = scoreColor(stat.score);
  const count = useCountUp(stat.score, 1000, 500, true);
  return (
    <div className="vd-stat">
      <span className="vd-stat-top" style={{ background: color }} />
      <div className="vd-stat-label">{stat.label}</div>
      <div className="vd-stat-num" style={{ color }}>
        {count}<span>%</span>
      </div>
    </div>
  );
}

function ConfidenceMeter({ score }) {
  return (
    <div>
      <div className="vd-conf-head">
        <span>CONFIDENCE</span>
        <span>{score}%</span>
      </div>
      <div className="vd-conf-track">
        <div style={{ width: `${score}%`, background: scoreColor(score) }} />
      </div>
    </div>
  );
}

/* ── Tabs ────────────────────────────────────────────────────────────────── */
function OverviewTab({ verdict }) {
  return (
    <div className="grid-2">
      <VCard>
        <SectionLabel>✓ Strengths</SectionLabel>
        {verdict.strengths.length === 0 ? (
          <EmptyState text="No strengths detected yet." />
        ) : (
          verdict.strengths.map((s, i) => (
            <div key={i} className="vd-li">
              <span className="vd-mark" style={{ color: "#00d084" }}>✓</span>
              <span>{s}</span>
            </div>
          ))
        )}
      </VCard>

      <VCard>
        <SectionLabel>✕ Weaknesses</SectionLabel>
        {verdict.weaknesses.length === 0 ? (
          <EmptyState text="No weaknesses found." />
        ) : (
          verdict.weaknesses.map((w, i) => (
            <div key={i} className="vd-li">
              <span className="vd-mark" style={{ color: "#ff3b3b" }}>✕</span>
              <span>{w}</span>
            </div>
          ))
        )}
      </VCard>

      <VCard>
        <SectionLabel>Missing Skills</SectionLabel>
        {verdict.missingSkills.length === 0 ? (
          <EmptyState text="No missing skills identified." />
        ) : (
          <div className="vd-pills">
            {verdict.missingSkills.map((s) => <Pill key={s} type="missing">{s}</Pill>)}
          </div>
        )}
      </VCard>

      <VCard>
        <SectionLabel>Recommended Actions</SectionLabel>
        {verdict.actions.length === 0 ? (
          <EmptyState text="Analysis in progress…" />
        ) : (
          verdict.actions.map((a, i) => (
            <div key={i} className="vd-action">
              <span className={`vd-prio ${String(a.p || "").toLowerCase()}`}>{a.p}</span>
              <span>{a.text}</span>
            </div>
          ))
        )}
      </VCard>
    </div>
  );
}

function ATSTab({ verdict }) {
  return (
    <div className="grid-2">
      <VCard>
        <SectionLabel>ATS Category Breakdown</SectionLabel>
        {verdict.atsBreakdown.map((row, i) => (
          <div key={row.label} style={{ marginBottom: 16 }}>
            <div className="vd-row-between">
              <span className="vd-mono-sm">{row.label}</span>
              <span className="vd-bebas" style={{ color: row.color }}>{row.score}</span>
            </div>
            <AnimBar score={row.score} color={row.color} delay={i * 80} />
          </div>
        ))}
      </VCard>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <VCard>
          <SectionLabel>Missing Keywords</SectionLabel>
          {verdict.missingSkills.length === 0 ? (
            <EmptyState text="No keywords missing — or still loading." />
          ) : (
            <div className="vd-pills">
              {verdict.missingSkills.map((s) => <Pill key={s} type="missing">{s}</Pill>)}
            </div>
          )}
        </VCard>

        <VCard>
          <SectionLabel>How To Fix</SectionLabel>
          {[
            "Add missing keywords naturally into experience bullets.",
            "Don't just list them in skills — demonstrate usage in projects.",
            "Mirror the exact phrasing from the job description.",
          ].map((t, i) => (
            <div key={i} className="vd-li">
              <span className="vd-mark" style={{ color: "#ff8c00" }}>→</span>
              <span>{t}</span>
            </div>
          ))}
        </VCard>
      </div>
    </div>
  );
}

function ProjectsTab({ verdict }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionLabel style={{ marginBottom: 0 }}>Current Projects — Rewritten</SectionLabel>

      {verdict.projects.length === 0 ? (
        <VCard><EmptyState text="No project rewrites generated yet." /></VCard>
      ) : (
        verdict.projects.map((p, i) => (
          <VCard key={i}>
            <div className="vd-bebas" style={{ fontSize: 18, letterSpacing: "0.06em", marginBottom: 12 }}>{p.name}</div>
            <div className="grid-2">
              <div className="vd-before">
                <div className="vd-tag" style={{ color: "#ff3b3b" }}>Current</div>
                <p style={{ opacity: 0.55, fontStyle: "italic" }}>"{p.current}"</p>
              </div>
              <div className="vd-after">
                <div className="vd-tag" style={{ color: "#00d084" }}>Better</div>
                <p>{p.better}</p>
              </div>
            </div>
          </VCard>
        ))
      )}

      <SectionLabel style={{ marginTop: 6, marginBottom: 0 }}>Suggested Projects — Build These Next</SectionLabel>

      {verdict.suggestedProjects.length === 0 ? (
        <VCard><EmptyState text="No project suggestions yet." /></VCard>
      ) : (
        <div className="grid-2">
          {verdict.suggestedProjects.map((p, i) => (
            <VCard key={i}>
              <div className="vd-bebas" style={{ fontSize: 17, marginBottom: 6 }}>{p.name}</div>
              <div className="vd-mono-sm" style={{ fontSize: 9, marginBottom: 10 }}>{p.stack}</div>
              <p className="vd-body-sm">{p.why}</p>
            </VCard>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillsTab({ verdict }) {
  const cur = useCountUp(verdict.finalScore, 1000, 200, true);
  const n = verdict.missingSkills.length;
  return (
    <div className="grid-2">
      <VCard>
        <SectionLabel>Detected Skills</SectionLabel>
        {verdict.detectedSkills.length === 0 ? (
          <EmptyState text="No skills detected yet." />
        ) : (
          <div className="vd-pills">
            {verdict.detectedSkills.map((s) => <Pill key={s} type="present">{s}</Pill>)}
          </div>
        )}
      </VCard>

      <VCard>
        <SectionLabel>Missing Skills</SectionLabel>
        {n === 0 ? (
          <EmptyState text="No missing skills." />
        ) : (
          <div className="vd-pills">
            {verdict.missingSkills.map((s) => <Pill key={s} type="missing">{s}</Pill>)}
          </div>
        )}
      </VCard>

      <VCard style={{ gridColumn: "1 / -1" }}>
        <SectionLabel>Skill Gap</SectionLabel>
        <div className="skill-gap-grid">
          <div>
            <div className="vd-mono-sm" style={{ marginBottom: 6 }}>CURRENT</div>
            <div className="vd-big" style={{ color: "#ff8c00" }}>
              {cur}<span style={{ color: "rgba(255,140,0,0.4)" }}>%</span>
            </div>
            <div className="vd-track" style={{ marginTop: 14, height: 4 }}>
              <div className="vd-fill" style={{ width: `${cur}%`, background: "#ff8c00", transition: "width .05s" }} />
            </div>
          </div>
          <div className="skill-gap-divider" />
          <div>
            <div className="vd-mono-sm" style={{ marginBottom: 6 }}>TARGET</div>
            <div className="vd-big" style={{ color: "rgba(255,255,255,0.1)" }}>100<span>%</span></div>
            <div className="vd-track" style={{ marginTop: 14, height: 4 }}>
              <div className="vd-fill" style={{ width: "100%", background: "rgba(255,255,255,0.07)" }} />
            </div>
            <p className="vd-body-sm" style={{ marginTop: 8 }}>
              Add {n} skill{n !== 1 ? "s" : ""} to close the gap.
            </p>
          </div>
        </div>
      </VCard>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Verdict() {
  const {
    resumeText,
    resumeLoaded,
    restoring,
    selectedRole,
    setSelectedRole,
    seniority,
    setSeniority,
    jobDesc,
    setAnalysisLoaded,
  } = useResume();

  const navigate = useNavigate();
  const location = useLocation();

  // Context already ran the analysis and passes it via router state.
  const [apiVerdict, setApiVerdict] = useState(location.state?.verdict ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [analysisTab, setAnalysisTab] = useState("OVERVIEW");

  const verdict = {
    finalScore: apiVerdict?.finalScore ?? 0,
    structure: apiVerdict?.structure ?? 0,
    projectScore: apiVerdict?.projects ?? 0, // API sends the projects *score* as `projects`
    readability: apiVerdict?.readability ?? 0,
    label: apiVerdict?.label ?? (error ? "UNAVAILABLE" : "ANALYSING"),
    summary: error
      ? "Couldn't load your verdict. Go back and run the analysis again."
      : apiVerdict?.summary ?? FALLBACK.summary,
    strengths: apiVerdict?.strengths ?? FALLBACK.strengths,
    weaknesses: apiVerdict?.weaknesses ?? FALLBACK.weaknesses,
    missingSkills: apiVerdict?.missingSkills ?? FALLBACK.missingSkills,
    detectedSkills: apiVerdict?.detectedSkills ?? FALLBACK.detectedSkills,
    actions: apiVerdict?.actions ?? FALLBACK.actions,
    atsBreakdown: apiVerdict?.atsBreakdown ?? FALLBACK.atsBreakdown,
    projects: apiVerdict?.projects_list ?? FALLBACK.projects, // rewrite entries, used by ProjectsTab
    suggestedProjects: apiVerdict?.suggestedProjects ?? FALLBACK.suggestedProjects,
  };

  const quickStats = [
    { label: "ATS", score: verdict.finalScore },
    { label: "STRUCTURE", score: verdict.structure },
    { label: "PROJECTS", score: verdict.projectScore },
    { label: "READABILITY", score: verdict.readability },
  ];

  const roleLabel = ROLE_LABELS[selectedRole] || selectedRole || "Target role";

  useEffect(() => {
    if (!restoring && !resumeLoaded) navigate("/upload");
  }, [restoring, resumeLoaded, navigate]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Fallback fetch only when the page is opened without a verdict (refresh / deep link)
  useEffect(() => {
    if (apiVerdict || !resumeText) return;
    let cancelled = false;
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText, selectedRole, seniority, jobDesc }),
        });
        if (!res.ok) throw new Error("API Failed");
        const data = await res.json();
        if (!cancelled) setApiVerdict(data);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeText]);

  useEffect(() => {
    if (apiVerdict && typeof setAnalysisLoaded === "function") setAnalysisLoaded(true);
  }, [apiVerdict, setAnalysisLoaded]);

  const goRoast = () => navigate("/roast", { state: { navType: "app" } });
  const analyseAnother = () => {
    setSelectedRole(null);
    setSeniority(null);
    navigate("/upload");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        html, body, #root {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #080808;
        }

        .vd-page {
          --nav-height: 56px;
          --accent: #ff4a3d;
          position: relative;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          isolation: isolate;
          background: #080808;
          color: #f0ede8;
          font-family: "DM Sans", sans-serif;
        }

        /* ---------- Background ---------- */
        .vd-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .055;
          background-image:
            linear-gradient(to right, rgba(255,255,255,.75) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.75) 1px, transparent 1px);
          background-size: 80px 80px;
          -webkit-mask-image: radial-gradient(ellipse 86% 78% at 50% 50%, #000 0%, rgba(0,0,0,.85) 48%, transparent 100%);
          mask-image: radial-gradient(ellipse 86% 78% at 50% 50%, #000 0%, rgba(0,0,0,.85) 48%, transparent 100%);
        }

        .vd-glow {
          position: absolute; z-index: 0; pointer-events: none; border-radius: 50%; filter: blur(28px);
          width: 58vw; height: 58vw; max-width: 780px; max-height: 780px; right: -10%; top: 2%;
          background: radial-gradient(circle, rgba(255,74,61,.09) 0%, rgba(255,74,61,.03) 36%, transparent 72%);
        }

        .vd-glow-2 {
          position: absolute; z-index: 0; pointer-events: none; border-radius: 50%; filter: blur(30px);
          width: 40vw; height: 40vw; max-width: 520px; max-height: 520px; left: -12%; top: -14%;
          background: radial-gradient(circle, rgba(0,208,132,.07) 0%, transparent 70%);
        }

        .vd-vignette {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.22) 100%);
        }

        .vd-watermark {
          position: absolute; top: 120px; right: 120px; z-index: 0; pointer-events: none; user-select: none;
          font-family: "Bebas Neue", sans-serif; font-size: clamp(180px, 18vw, 320px);
          line-height: .8; letter-spacing: -.04em; white-space: nowrap; color: rgba(255,255,255,.055);
        }

        .vd-atmosphere {
          position: absolute; inset: 56px 0 0; z-index: 1; pointer-events: none; overflow: hidden;
        }

        .vd-orbit {
          position: absolute; width: min(48vw, 640px); height: min(28vw, 330px);
          right: 2%; top: 50%; transform: translateY(-50%) rotate(-9deg);
          border: 1px solid rgba(255,74,61,.13); border-radius: 50%;
        }
        .vd-orbit::before, .vd-orbit::after {
          content: ""; position: absolute; inset: 12% 9%; border-radius: 50%;
          border: 1px solid rgba(255,74,61,.08);
        }
        .vd-orbit::after {
          inset: 25% 20%; border-style: dashed; opacity: .7; animation: vd-spin 20s linear infinite;
        }
        @keyframes vd-spin { to { transform: rotate(360deg); } }

        .vd-particle {
          position: absolute; border-radius: 50%; background: rgba(235,232,234,.5);
          animation: vd-drift 7s ease-in-out var(--delay) infinite alternate;
        }
        .vd-particle.accent { background: var(--accent); box-shadow: 0 0 10px 2px rgba(255,74,61,.45); }

        .vd-paper {
          position: absolute; left: var(--x); top: var(--y); width: var(--w); height: var(--h);
          opacity: var(--opacity); filter: blur(var(--blur)); transform: rotate(var(--rotation));
          border-radius: 2px;
          background: repeating-linear-gradient(transparent 0 5px, rgba(0,0,0,.28) 5px 6px), linear-gradient(#d4d0c6,#8f8b81);
          box-shadow: 0 0 12px rgba(255,74,61,.12);
          animation: vd-paper-float 10s ease-in-out var(--delay) infinite alternate;
        }
        .vd-paper::after { content: ""; position: absolute; inset: 0; background: rgba(255,74,61,.1); }

        @keyframes vd-paper-float {
          from { transform: rotate(var(--rotation)) translate3d(0,0,0); }
          to { transform: rotate(calc(var(--rotation) + 10deg)) translate3d(8px,-10px,0); }
        }
        @keyframes vd-drift {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(8px,-10px,0); }
        }

        .vd-icon {
          position: absolute; width: 30px; height: 30px; display: grid; place-items: center;
          border: 1px solid currentColor; border-radius: 6px; background: rgba(12,10,9,.4);
          font: 700 13px "Space Mono", monospace; opacity: .34;
          animation: vd-drift 8s ease-in-out var(--delay) infinite alternate;
        }
        .vd-icon.ok { color: #00d084; }
        .vd-icon.bad { color: #ff4a3d; }
        .vd-icon.warn { color: #ff8c00; }
        .vd-icon.dim { color: rgba(255,255,255,.7); opacity: .22; }

        .vd-chip {
          position: absolute; padding: 7px 9px; border: 1px solid rgba(255,74,61,.15); border-radius: 3px;
          background: rgba(24,10,9,.4); color: rgba(255,170,160,.5);
          font: 700 8px "Space Mono", monospace; letter-spacing: .12em;
          animation: vd-drift 8s ease-in-out var(--delay) infinite alternate;
        }

        /* ---------- Shared shell ---------- */
        .workflow-shell {
          position: relative; z-index: 4;
          height: calc(100dvh - var(--nav-height));
          max-width: 1400px; margin: 0 auto;
          padding: 20px 48px 40px 20px; overflow: hidden;
        }

        .workflow-layout {
          width: 100%; height: 100%; display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, .7fr);
          gap: clamp(28px, 5vw, 80px); align-items: stretch;
        }

        /* ---------- Left column ---------- */
        .vd-copy {
          min-width: 0; max-width: 780px; height: 100%;
          display: flex; flex-direction: column; justify-content: center;
          animation: vd-enter .5s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes vd-enter { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

        .vd-back {
          display: flex; width: fit-content; align-items: center; gap: 8px; margin: 0 0 14px; padding: 0;
          border: 0; background: transparent; color: rgba(255,255,255,.42); cursor: pointer;
          font: 10px "Space Mono", monospace; letter-spacing: .08em; text-transform: uppercase;
          transition: color .2s ease, transform .2s ease; flex: 0 0 auto;
        }
        .vd-back:hover { color: #f0ede8; transform: translateX(-3px); }

        .vd-eyebrow {
          display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex: 0 0 auto;
          font: 10px "Space Mono", monospace; letter-spacing: .15em; color: rgba(255,255,255,.26); text-transform: uppercase;
        }
        .vd-eyebrow i { color: rgba(255,255,255,.12); font-style: normal; }

        .vd-h1 {
          margin: 0; flex: 0 0 auto;
          font: 400 clamp(50px, 5.4vw, 80px)/.88 "Bebas Neue", sans-serif; letter-spacing: -.01em;
        }
        .vd-ghost { color: transparent; -webkit-text-stroke: 1.5px #f0ede8; }

        .vd-sub {
          flex: 0 0 auto; max-width: 560px; margin: 12px 0 14px; color: rgba(255,255,255,.38);
          font-size: 14px; line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }

        .vd-pulse-row { display: flex; gap: 8px; margin: -6px 0 12px; }
        .vd-pulse-row span {
          width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.25);
          animation: vd-pulse 1.2s ease-in-out infinite;
        }
        @keyframes vd-pulse { 0%,100% { opacity: .2; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.2); } }

        /* mobile-only summary (the dossier is hidden < 900px) */
        .vd-mobile-bar { display: none; }

        .vd-tabs {
          flex: 0 0 auto; display: flex; gap: 26px; margin: 4px 0 14px;
          border-bottom: 1px solid rgba(255,255,255,.07); overflow-x: auto; scrollbar-width: none;
        }
        .vd-tabs::-webkit-scrollbar { display: none; }

        .atab {
          padding: 10px 0; border: 0; background: transparent; position: relative; cursor: pointer; flex-shrink: 0;
          font: 10px "Space Mono", monospace; letter-spacing: .14em; text-transform: uppercase;
          color: rgba(255,255,255,.25); transition: color .2s; white-space: nowrap;
        }
        .atab::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: #f0ede8;
          transform: scaleX(0); transition: transform .25s cubic-bezier(.16,1,.3,1);
        }
        .atab.on { color: #f0ede8; }
        .atab.on::after { transform: scaleX(1); }
        .atab:hover { color: rgba(255,255,255,.6); }

        .vd-panel {
          flex: 1 1 0; min-height: 200px; overflow-y: auto; overflow-x: hidden; padding-right: 8px;
          scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.18) transparent;
        }
        .vd-panel::-webkit-scrollbar { width: 5px; }
        .vd-panel::-webkit-scrollbar-thumb { background: rgba(255,255,255,.16); border-radius: 4px; }
        .vd-panel::-webkit-scrollbar-track { background: transparent; }

        .tab-fade { animation: vd-tab .3s cubic-bezier(.16,1,.3,1); }
        @keyframes vd-tab { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        /* ---------- Content primitives ---------- */
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }

        .vd-card {
          padding: 16px 18px; border: 1px solid rgba(255,255,255,.07); border-radius: 8px;
          background: rgba(255,255,255,.02);
        }

        .vd-label {
          margin-bottom: 12px; font: 10px "Space Mono", monospace; letter-spacing: .16em;
          color: rgba(255,255,255,.24); text-transform: uppercase;
        }

        .vd-pills { display: flex; flex-wrap: wrap; gap: 7px; }

        .vd-pill {
          display: inline-flex; align-items: center; padding: 4px 11px; border-radius: 20px; white-space: nowrap;
          font: 11px "Space Mono", monospace; letter-spacing: .06em; border: 1px solid;
        }
        .vd-pill.missing { background: rgba(255,59,59,.08); border-color: rgba(255,59,59,.2); color: #ff6b6b; }
        .vd-pill.present { background: rgba(0,208,132,.08); border-color: rgba(0,208,132,.2); color: #00d084; }

        .vd-li { display: flex; gap: 10px; margin-bottom: 8px; font-size: 13px; line-height: 1.5; color: rgba(240,237,232,.65); }
        .vd-li:last-child { margin-bottom: 0; }
        .vd-mark { flex-shrink: 0; margin-top: 2px; font: 11px "Space Mono", monospace; }

        .vd-action {
          display: flex; gap: 12px; padding: 9px 0; font-size: 13px; line-height: 1.5; color: rgba(240,237,232,.6);
          border-bottom: 1px solid rgba(255,255,255,.04);
        }
        .vd-action:last-child { border-bottom: 0; padding-bottom: 0; }

        .vd-prio {
          flex-shrink: 0; height: fit-content; margin-top: 2px; padding: 2px 7px; border-radius: 3px;
          font: 9px "Space Mono", monospace; letter-spacing: .08em;
          background: rgba(255,255,255,.06); color: rgba(255,255,255,.3); border: 1px solid rgba(255,255,255,.08);
        }
        .vd-prio.high { background: rgba(255,59,59,.12); color: #ff6b6b; border-color: rgba(255,59,59,.2); }
        .vd-prio.med { background: rgba(255,140,0,.12); color: #ff8c00; border-color: rgba(255,140,0,.2); }

        .vd-empty { font: italic 11px "Space Mono", monospace; letter-spacing: .06em; color: rgba(255,255,255,.18); }

        .vd-track { flex: 1; height: 3px; border-radius: 2px; overflow: hidden; background: rgba(255,255,255,.07); }
        .vd-fill { height: 100%; border-radius: 2px; transition: width .9s cubic-bezier(.16,1,.3,1); }

        .vd-row-between { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 7px; }
        .vd-mono-sm { font: 11px "Space Mono", monospace; letter-spacing: .08em; color: rgba(255,255,255,.4); text-transform: uppercase; }
        .vd-bebas { font-family: "Bebas Neue", sans-serif; font-size: 18px; color: #f0ede8; }
        .vd-body-sm { font-size: 12px; line-height: 1.55; color: rgba(240,237,232,.4); }
        .vd-big { font: 400 56px/.9 "Bebas Neue", sans-serif; letter-spacing: .02em; }
        .vd-big span { font-size: 24px; }

        .vd-before, .vd-after { padding: 12px 14px; border-radius: 6px; }
        .vd-before { background: rgba(255,59,59,.05); border: 1px solid rgba(255,59,59,.12); }
        .vd-after { background: rgba(0,208,132,.05); border: 1px solid rgba(0,208,132,.15); }
        .vd-before p, .vd-after p { font-size: 13px; line-height: 1.6; color: rgba(240,237,232,.75); }
        .vd-tag { margin-bottom: 7px; font: 9px "Space Mono", monospace; letter-spacing: .12em; text-transform: uppercase; }

        .skill-gap-grid { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 28px; align-items: center; }
        .skill-gap-divider { height: 80px; background: rgba(255,255,255,.06); }

        /* ---------- Right dossier ---------- */
        .vd-side { position: relative; display: flex; align-items: center; justify-content: center; min-height: 0; }

        .vd-dossier {
          position: relative; width: min(100%, 460px); padding: 22px;
          border: 1px solid rgba(255,255,255,.08); border-radius: 8px;
          background: linear-gradient(160deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
          box-shadow: 0 30px 80px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.04);
          backdrop-filter: blur(8px);
        }
        .vd-dossier::before, .vd-dossier::after {
          content: ""; position: absolute; width: 14px; height: 14px; border-style: solid; border-color: rgba(255,74,61,.3);
        }
        .vd-dossier::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .vd-dossier::after { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

        .vd-dossier-head {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 12px; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .vd-kicker { font: 9px "Space Mono", monospace; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.25); }
        .vd-step { color: var(--accent); font: 10px "Space Mono", monospace; letter-spacing: .1em; }

        .vd-ring { position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .vd-ring-num { font-family: "Bebas Neue", sans-serif; line-height: .9; letter-spacing: .02em; }
        .vd-ring-cap { margin-top: 4px; font: 9px "Space Mono", monospace; letter-spacing: .1em; color: rgba(255,255,255,.3); }

        .vd-score-row { display: flex; align-items: center; gap: 18px; margin-bottom: 14px; }
        .vd-score-text { min-width: 0; }
        .vd-score-title { font: 400 34px/.95 "Bebas Neue", sans-serif; letter-spacing: -.01em; margin-bottom: 6px; }
        .vd-score-note { font-size: 12px; line-height: 1.45; color: rgba(255,255,255,.28); }

        .vd-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
        .vd-stat {
          position: relative; overflow: hidden; padding: 11px 13px; border-radius: 6px;
          border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.02);
        }
        .vd-stat-top { position: absolute; top: 0; left: 0; right: 0; height: 2px; opacity: .7; }
        .vd-stat-label { margin-bottom: 4px; font: 9px "Space Mono", monospace; letter-spacing: .14em; color: rgba(255,255,255,.25); text-transform: uppercase; }
        .vd-stat-num { font: 400 30px/.95 "Bebas Neue", sans-serif; letter-spacing: .04em; }
        .vd-stat-num span { font-size: 14px; opacity: .5; }

        .vd-conf-head { display: flex; justify-content: space-between; margin-bottom: 7px; font: 10px "Space Mono", monospace; letter-spacing: .1em; color: rgba(255,255,255,.25); }
        .vd-conf-track { height: 5px; border-radius: 999px; overflow: hidden; background: rgba(255,255,255,.08); }
        .vd-conf-track > div { height: 100%; transition: width 1s cubic-bezier(.16,1,.3,1); }

        .vd-roast {
          width: 100%; height: 50px; margin-top: 16px; border: 0; border-radius: 5px; cursor: pointer;
          background: #ff8c00; color: #080808; font: 400 20px "Bebas Neue", sans-serif; letter-spacing: .1em;
          transition: transform .18s ease, background .18s ease;
        }
        .vd-roast:hover { transform: translateY(-1px); background: #ffa01f; }

        .vd-another {
          display: block; width: 100%; height: 36px; margin-top: 8px; border-radius: 4px; cursor: pointer;
          border: 1px solid rgba(255,255,255,.08); background: transparent; color: rgba(255,255,255,.3);
          font: 9px "Space Mono", monospace; letter-spacing: .1em; text-transform: uppercase;
          transition: color .2s ease, border-color .2s ease;
        }
        .vd-another:hover { color: rgba(255,255,255,.65); border-color: rgba(255,255,255,.18); }

        /* ---------- Responsive ---------- */
        @media (max-height: 800px) {
          .vd-back { margin-bottom: 8px; }
          .vd-eyebrow { display: none; }
          .vd-sub { margin: 8px 0 10px; -webkit-line-clamp: 2; }
          .vd-dossier { padding: 18px; }
          .vd-dossier-head { padding-bottom: 10px; margin-bottom: 10px; }
          .vd-score-row, .vd-stats { margin-bottom: 10px; }
          .vd-stat { padding: 8px 12px; }
          .vd-stat-num { font-size: 26px; }
          .vd-roast { height: 46px; margin-top: 12px; }
        }

        @media (max-width: 1040px) {
          .workflow-layout { grid-template-columns: minmax(0, 1.1fr) minmax(320px, .7fr); gap: 28px; }
          .vd-watermark { right: 60px; }
        }

        @media (max-width: 900px) {
          .vd-page { --nav-height: 82px; }
          .workflow-shell { padding: 14px 20px; overflow-y: auto; }
          .workflow-layout { grid-template-columns: 1fr; height: auto; min-height: 100%; }
          .vd-side { display: none; }
          .vd-copy { max-width: none; height: auto; justify-content: flex-start; }
          .vd-panel { flex: none; overflow: visible; min-height: 0; padding-right: 0; }
          .vd-h1 { font-size: clamp(48px, 10vw, 76px); }
          .vd-eyebrow { display: flex; }
          .vd-watermark { top: 26%; right: -30px; font-size: 190px; }
          .vd-mobile-bar {
            display: flex; align-items: center; gap: 14px; margin: 0 0 14px; padding: 12px 14px;
            border: 1px solid rgba(255,255,255,.08); border-radius: 8px; background: rgba(255,255,255,.025);
          }
          .vd-mobile-bar button {
            margin-left: auto; height: 42px; padding: 0 16px; border: 0; border-radius: 5px; cursor: pointer;
            background: #ff8c00; color: #080808; font: 400 17px "Bebas Neue", sans-serif; letter-spacing: .08em;
          }
          .vd-mobile-score { font: 400 44px/.9 "Bebas Neue", sans-serif; }
          .vd-mobile-cap { font: 9px "Space Mono", monospace; letter-spacing: .1em; color: rgba(255,255,255,.3); }
          .skill-gap-grid { grid-template-columns: 1fr; gap: 18px; }
          .skill-gap-divider { display: none; }
        }

        @media (max-width: 600px) {
          .vd-page { --nav-height: 74px; }
          .workflow-shell { padding: 12px 16px; }
          .vd-h1 { font-size: clamp(44px, 13vw, 64px); }
          .vd-sub { font-size: 12px; }
          .vd-tabs { gap: 20px; }
          .vd-watermark { top: 37%; left: 50%; right: auto; transform: translateX(-50%); font-size: 150px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vd-orbit::after, .vd-particle, .vd-paper, .vd-icon, .vd-chip, .vd-copy, .tab-fade, .vd-pulse-row span { animation: none; }
        }
      `}</style>

      <div className="vd-page">
        <div className="vd-grid" />
        <div className="vd-glow" />
        <div className="vd-glow-2" />
        <div className="vd-vignette" />

        <div className="vd-atmosphere" aria-hidden="true">
          <div className="vd-orbit" />

          {PARTS.map((p, i) => (
            <span
              key={`p-${i}`}
              className={`vd-particle${p.accent ? " accent" : ""}`}
              style={{ left: p.x, top: p.y, width: p.s, height: p.s, opacity: p.accent ? 0.55 : 0.38, "--delay": p.delay }}
            />
          ))}

          {PAPERS.map((p, i) => (
            <span
              key={`pa-${i}`}
              className="vd-paper"
              style={{
                "--x": p.x, "--y": p.y, "--w": `${p.w}px`, "--h": `${p.h}px`,
                "--rotation": `${p.r}deg`, "--opacity": p.o, "--blur": `${p.b}px`, "--delay": p.d,
              }}
            />
          ))}

          {ICONS.map((ic, i) => (
            <span key={`ic-${i}`} className={`vd-icon ${ic.c}`} style={{ left: ic.x, top: ic.y, "--delay": ic.d }}>
              {ic.g === "search" ? (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5L14 14" />
                </svg>
              ) : (
                ic.g
              )}
            </span>
          ))}

          {CHIPS.map((c) => (
            <span key={c.t} className="vd-chip" style={{ left: c.x, top: c.y, "--delay": c.d }}>{c.t}</span>
          ))}
        </div>

        <div className="vd-watermark">VERDICT</div>

        <AppNav navStep={3} />

        <main className="workflow-shell">
          <div className="workflow-layout">
            <section className="vd-copy">
              <button className="vd-back" onClick={() => navigate(-1)}>← Back</button>

              <div className="vd-eyebrow">
                <span>04 / VERDICT</span>
                <i>·</i>
                <span>{roleLabel}</span>
                <i>·</i>
                <span>{seniority || "MID"}</span>
              </div>

              <h1 className="vd-h1">
                YOUR RESUME<br />
                <span className="vd-ghost">{verdict.label}.</span>
              </h1>

              <p className="vd-sub">{verdict.summary}</p>
              {loading && <LoadingPulse />}

              {/* Shown only when the right-hand dossier is hidden (small screens) */}
              <div className="vd-mobile-bar">
                <div>
                  <div className="vd-mobile-score" style={{ color: scoreColor(verdict.finalScore) }}>{verdict.finalScore}</div>
                  <div className="vd-mobile-cap">MATCH SCORE</div>
                </div>
                <button onClick={goRoast}>🔥 EXECUTE ROAST</button>
              </div>

              <div className="vd-tabs">
                {ANALYSIS_TABS.map((t) => (
                  <button key={t} className={`atab${analysisTab === t ? " on" : ""}`} onClick={() => setAnalysisTab(t)}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="vd-panel">
                <div key={analysisTab} className="tab-fade">
                  {analysisTab === "OVERVIEW" && <OverviewTab verdict={verdict} />}
                  {analysisTab === "ATS" && <ATSTab verdict={verdict} />}
                  {analysisTab === "PROJECTS" && <ProjectsTab verdict={verdict} />}
                  {analysisTab === "SKILLS" && <SkillsTab verdict={verdict} />}
                </div>
              </div>
            </section>

            <aside className="vd-side" aria-label="Score summary">
              <div className="vd-dossier">
                <div className="vd-dossier-head">
                  <div className="vd-kicker">final verdict</div>
                  <div className="vd-step">04 / 05</div>
                </div>

                <div className="vd-score-row">
                  <ScoreRing score={verdict.finalScore} size={128} />
                  <div className="vd-score-text">
                    <div className="vd-score-title">{verdict.label}.</div>
                    <div className="vd-score-note">
                      Scored against {roleLabel.toLowerCase()}
                      {seniority ? ` · ${seniority.toLowerCase()}` : ""}.
                    </div>
                  </div>
                </div>

                <div className="vd-stats">
                  {quickStats.map((s) => <QuickStat key={s.label} stat={s} />)}
                </div>

                <ConfidenceMeter score={verdict.finalScore} />

                <button className="vd-roast" onClick={goRoast}>🔥 EXECUTE ROAST</button>
                <button className="vd-another" onClick={analyseAnother}>← analyse another resume</button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}