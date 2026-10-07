import { useNavigate } from "react-router-dom";
import AppNav from "../components/Appnav";
import { useResume } from "../context/ResumeContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { API_URL } from "../config";

const CHECKLIST = [
  { label: "PARSING DOCUMENT", sub: "Reading file structure & encoding" },
  { label: "EXTRACTING CONTENT", sub: "Pulling text, sections & metadata" },
  { label: "RUNNING ATS SCAN", sub: "Checking machine-readability & format" },
  { label: "MATCHING KEYWORDS", sub: "Scoring against role requirements" },
  { label: "MEASURING IMPACT", sub: "Evaluating achievements & metrics" },
  { label: "COMPILING VERDICT", sub: "Finalizing your brutal score" },
];

const ROLE_LABELS = {
  swe: "Software Engineer",
  pm: "Product Manager",
  design: "UX Designer",
  data: "Data Scientist",
  devops: "DevOps / Infrastructure Engineer",
  marketing: "Marketing Specialist",
  finance: "Finance / Banking Analyst",
};

const ORBIT_DOTS = [
  { x: "74%", y: "15%", delay: "-1.4s" },
  { x: "88%", y: "29%", delay: "-2.6s" },
  { x: "62%", y: "44%", delay: "-3.8s" },
  { x: "91%", y: "53%", delay: "-.8s" },
  { x: "76%", y: "69%", delay: "-4.2s" },
  { x: "48%", y: "31%", delay: "-2s" },
];

const CHIPS = [
  { text: "ROLE FIT", x: "84%", y: "20%", delay: "0s" },
  { text: "KEYWORDS", x: "58%", y: "66%", delay: "-2s" },
  { text: "ATS", x: "90%", y: "64%", delay: "-4s" },
];

const PARTS = [
  { x: "7%", y: "16%", s: 2, delay: "-1.2s", accent: true },
  { x: "13%", y: "71%", s: 3, delay: "-3.8s" },
  { x: "81%", y: "18%", s: 2, delay: "-.7s" },
  { x: "90%", y: "42%", s: 3, delay: "-2.6s" },
  { x: "21%", y: "88%", s: 2, delay: "-5.4s" },
  { x: "58%", y: "10%", s: 2, delay: "-2.1s" },
];

function Eyebrow({ children }) {
  return <div className="cx-eyebrow">{children}</div>;
}

function Ghost({ children }) {
  return <span className="cx-ghost">{children}</span>;
}

export default function Context() {
  const {
    resumeLoaded,
    jobDesc,
    setJobDesc,
    loading,
    setLoading,
    setLoadStep,
    loadStep,
    resumeText,
    selectedRole,
    restoring,
    seniority,
    fileName,
  } = useResume();

  const navigate = useNavigate();
  const [loadError, setLoadError] = useState(null);
  const lastWithJd = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!restoring && !resumeLoaded) navigate("/upload");
  }, [restoring, resumeLoaded, navigate]);

  const roleLabel = useMemo(() => {
    if (ROLE_LABELS[selectedRole]) return ROLE_LABELS[selectedRole];
    if (selectedRole && selectedRole !== "other") return selectedRole; // custom typed role
    return "Professional";
  }, [selectedRole]);

  // withJd=false lets the AI decide its own job description from the role + seniority
  const handleGetVerdict = async (withJd = true) => {
    lastWithJd.current = withJd;
    setLoading(true);
    setLoadStep(0);
    setLoadError(null);

    const progressTimer = setInterval(() => {
      setLoadStep((prev) => (prev < CHECKLIST.length - 1 ? prev + 1 : prev));
    }, 900);

    try {
      const res = await fetch(`${API_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          selectedRole,
          seniority,
          jobDesc: withJd ? jobDesc : "",
        }),
      });

      if (!res.ok) throw new Error("API Failed");

      const verdict = await res.json();
      clearInterval(progressTimer);
      setLoadStep(CHECKLIST.length);

      setTimeout(() => {
        setLoading(false);
        navigate("/verdict", { state: { verdict } });
      }, 500);
    } catch (err) {
      clearInterval(progressTimer);
      setLoadError(
        err.message === "API Failed"
          ? "The server rejected the analysis. Try again in a moment."
          : "Couldn't reach the server. Check your connection and try again."
      );
    }
  };

  const jd = (jobDesc || "").trim();
  const wordCount = jd ? jd.split(/\s+/).length : 0;
  const jdLines = useMemo(
    () => (jobDesc || "").replace(/\r/g, "").split("\n").map((l) => l.trim()).filter(Boolean),
    [jobDesc]
  );
  const jdStrength = Math.min(100, Math.round((wordCount / 120) * 100));

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

        .cx-page {
          --nav-height: 56px;
          --accent: #a47bff;
          position: relative;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          isolation: isolate;
          background: #080808;
          color: #f0ede8;
          font-family: "DM Sans", sans-serif;
        }

        /* ---------- Background (purple variant of the shared language) ---------- */
        .cx-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .055;
          background-image:
            linear-gradient(to right, rgba(255,255,255,.75) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.75) 1px, transparent 1px);
          background-size: 80px 80px;
          -webkit-mask-image: radial-gradient(ellipse 86% 78% at 50% 50%, #000 0%, rgba(0,0,0,.85) 48%, transparent 100%);
          mask-image: radial-gradient(ellipse 86% 78% at 50% 50%, #000 0%, rgba(0,0,0,.85) 48%, transparent 100%);
        }

        .cx-glow {
          position: absolute;
          width: 58vw;
          height: 58vw;
          max-width: 780px;
          max-height: 780px;
          right: -10%;
          top: 2%;
          z-index: 0;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(28px);
          background: radial-gradient(circle,
            rgba(133,92,255,.10) 0%,
            rgba(133,92,255,.035) 36%,
            transparent 72%);
        }

        .cx-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.22) 100%);
        }

        .cx-watermark {
          position: absolute;
          top: 120px;
          right: 120px;
          z-index: 0;
          pointer-events: none;
          user-select: none;
          font-family: "Bebas Neue", sans-serif;
          font-size: clamp(180px, 18vw, 320px);
          line-height: .8;
          letter-spacing: -.04em;
          white-space: nowrap;
          color: rgba(255,255,255,.055);
        }

        .cx-atmosphere {
          position: absolute;
          inset: 56px 0 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .cx-orbit {
          position: absolute;
          width: min(48vw, 640px);
          height: min(28vw, 330px);
          right: 2%;
          top: 50%;
          transform: translateY(-50%) rotate(-9deg);
          border: 1px solid rgba(145,103,255,.14);
          border-radius: 50%;
        }

        .cx-orbit::before,
        .cx-orbit::after {
          content: "";
          position: absolute;
          inset: 12% 9%;
          border-radius: 50%;
          border: 1px solid rgba(145,103,255,.09);
        }

        .cx-orbit::after {
          inset: 25% 20%;
          border-style: dashed;
          opacity: .7;
          animation: cx-spin 20s linear infinite;
        }

        @keyframes cx-spin { to { transform: rotate(360deg); } }

        .cx-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(235,232,234,.5);
          animation: cx-drift 7s ease-in-out var(--delay) infinite alternate;
        }

        .cx-particle.accent {
          background: var(--accent);
          box-shadow: 0 0 10px 2px rgba(145,103,255,.45);
        }

        .cx-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px 2px rgba(145,103,255,.35);
          animation: cx-drift 6s ease-in-out var(--delay) infinite alternate;
        }

        .cx-chip {
          position: absolute;
          padding: 7px 9px;
          border: 1px solid rgba(145,103,255,.14);
          border-radius: 3px;
          background: rgba(18,13,31,.4);
          color: rgba(206,190,255,.5);
          font: 700 8px "Space Mono", monospace;
          letter-spacing: .12em;
          animation: cx-drift 8s ease-in-out var(--delay) infinite alternate;
        }

        @keyframes cx-drift {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(8px,-10px,0); }
        }

        /* ---------- Shared shell (identical to Upload / Target) ---------- */
        .workflow-shell {
          position: relative;
          z-index: 4;
          height: calc(100dvh - var(--nav-height));
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 48px 40px 20px;
          overflow: hidden;
        }

        .workflow-layout {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(360px, .7fr);
          gap: clamp(28px, 5vw, 80px);
          align-items: center;
        }

        /* ---------- Left column ---------- */
        .cx-copy {
          min-width: 0;
          max-width: 760px;
          animation: cx-enter .5s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes cx-enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .cx-back {
          display: flex;
          width: fit-content;
          align-items: center;
          gap: 8px;
          margin: 0 0 16px;
          padding: 0;
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.42);
          cursor: pointer;
          font: 10px "Space Mono", monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
          transition: color .2s ease, transform .2s ease;
        }

        .cx-back:hover { color: #f0ede8; transform: translateX(-3px); }

        .cx-eyebrow {
          margin-bottom: 10px;
          font: 10px "Space Mono", monospace;
          letter-spacing: .15em;
          color: rgba(255,255,255,.26);
          text-transform: uppercase;
        }

        .cx-h1 {
          margin: 0;
          font: 400 clamp(58px, 6.4vw, 92px)/.88 "Bebas Neue", sans-serif;
          letter-spacing: -.01em;
        }

        .cx-ghost {
          color: transparent;
          -webkit-text-stroke: 1.5px #f0ede8;
        }

        .cx-sub {
          max-width: 560px;
          margin: 14px 0 22px;
          color: rgba(255,255,255,.38);
          font-size: 14px;
          line-height: 1.5;
        }

        .cx-section-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 9px;
          font: 10px "Space Mono", monospace;
          letter-spacing: .13em;
          text-transform: uppercase;
          color: rgba(255,255,255,.24);
        }

        .cx-textarea {
          display: block;
          width: 100%;
          height: clamp(120px, 24vh, 230px);
          margin-bottom: 10px;
          padding: 14px 16px;
          border: 1px solid rgba(145,103,255,.18);
          border-radius: 5px;
          background: rgba(119,76,255,.025);
          color: #f0ede8;
          outline: none;
          resize: none;
          font: 12px/1.7 "Space Mono", monospace;
          transition: border-color .18s ease, background .18s ease;
        }

        .cx-textarea::placeholder { color: rgba(255,255,255,.2); }
        .cx-textarea:focus { border-color: rgba(164,123,255,.45); background: rgba(119,76,255,.04); }

        .cx-textarea::-webkit-scrollbar { width: 5px; }
        .cx-textarea::-webkit-scrollbar-thumb { background: rgba(164,123,255,.3); border-radius: 4px; }
        .cx-textarea { scrollbar-width: thin; scrollbar-color: rgba(164,123,255,.3) transparent; }

        .cx-next {
          width: 100%;
          height: 52px;
          border: 0;
          border-radius: 5px;
          background: #f0ede8;
          color: #080808;
          cursor: pointer;
          font: 400 21px "Bebas Neue", sans-serif;
          letter-spacing: .1em;
          transition: transform .18s ease, background .18s ease;
        }

        .cx-next:hover:not(:disabled) { transform: translateY(-1px); background: #fff; }
        .cx-next:disabled { opacity: .25; cursor: not-allowed; }

        .cx-skip {
          display: block;
          width: 100%;
          height: 40px;
          margin-top: 10px;
          border: 1px solid rgba(145,103,255,.18);
          border-radius: 4px;
          background: rgba(145,103,255,.055);
          color: rgba(205,190,255,.72);
          cursor: pointer;
          font: 10px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          transition: background .2s ease, border-color .2s ease;
        }

        .cx-skip:hover { background: rgba(145,103,255,.1); border-color: rgba(164,123,255,.35); }

        /* ---------- Right dossier ---------- */
        .cx-side {
          position: relative;
          min-height: 470px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cx-dossier {
          position: relative;
          width: min(100%, 460px);
          padding: 24px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px;
          background: linear-gradient(160deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
          box-shadow: 0 30px 80px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.04);
          backdrop-filter: blur(8px);
        }

        .cx-dossier::before,
        .cx-dossier::after {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(145,103,255,.3);
          border-style: solid;
        }

        .cx-dossier::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .cx-dossier::after { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

        .cx-dossier-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .cx-dossier-kicker {
          font: 9px "Space Mono", monospace;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.25);
        }

        .cx-dossier-step {
          color: var(--accent);
          font: 10px "Space Mono", monospace;
          letter-spacing: .1em;
        }

        .cx-dossier-title {
          margin: 0 0 6px;
          font: 400 42px/.95 "Bebas Neue", sans-serif;
          letter-spacing: -.01em;
        }

        .cx-dossier-muted {
          margin: 0 0 16px;
          color: rgba(255,255,255,.28);
          font-size: 12px;
          line-height: 1.45;
        }

        .cx-meta-row {
          display: grid;
          grid-template-columns: 96px 1fr;
          gap: 14px;
          align-items: center;
          padding: 9px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .cx-meta-label {
          font: 9px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.21);
        }

        .cx-meta-value {
          color: rgba(255,255,255,.78);
          font: 11px "Space Mono", monospace;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Live job-description preview */
        .cx-paper {
          height: 150px;
          margin-top: 16px;
          padding: 14px 16px;
          overflow-y: auto;
          border: 1px solid rgba(255,255,255,.11);
          border-radius: 5px;
          background: linear-gradient(165deg, #efecf5 0%, #dcd8e6 58%, #c7c2d4 100%);
          color: #292433;
          scrollbar-width: thin;
          scrollbar-color: rgba(48,40,70,.35) rgba(48,40,70,.08);
        }

        .cx-paper::-webkit-scrollbar { width: 6px; }
        .cx-paper::-webkit-scrollbar-track { background: rgba(48,40,70,.08); border-radius: 6px; }
        .cx-paper::-webkit-scrollbar-thumb { background: rgba(48,40,70,.35); border-radius: 6px; }

        .cx-paper-kicker {
          margin-bottom: 8px;
          padding-bottom: 7px;
          border-bottom: 1px solid rgba(48,40,70,.14);
          font: 7px "Space Mono", monospace;
          letter-spacing: .22em;
          color: #6b6580;
        }

        .cx-paper-line {
          margin-bottom: 4px;
          font: 8px/1.45 "Space Mono", monospace;
          color: rgba(41,36,51,.8);
          overflow-wrap: anywhere;
        }

        .cx-paper-empty {
          font: 8px/1.6 "Space Mono", monospace;
          letter-spacing: .05em;
          text-transform: uppercase;
          color: rgba(41,36,51,.45);
        }

        .cx-bar {
          height: 3px;
          margin-top: 16px;
          border-radius: 4px;
          background: rgba(255,255,255,.06);
          overflow: hidden;
        }

        .cx-bar > span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, rgba(145,103,255,.2), rgba(164,123,255,.8));
          transition: width .4s ease;
        }

        .cx-note {
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,.06);
          color: rgba(255,255,255,.22);
          font: 9px/1.6 "Space Mono", monospace;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        /* ---------- Loading overlay ---------- */
        .cx-overlay {
          position: fixed;
          inset: 0;
          z-index: 90;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(8,8,8,.97);
          animation: cx-enter .3s ease both;
        }

        .cx-overlay-inner { width: 100%; max-width: 480px; max-height: 100%; }

        .cx-ov-kicker {
          margin-bottom: 16px;
          font: 11px "Space Mono", monospace;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(255,255,255,.2);
        }

        .cx-ov-title {
          margin: 0 0 30px;
          font: 400 clamp(40px, 6vw, 64px)/.92 "Bebas Neue", sans-serif;
        }

        .cx-checklist {
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 8px;
          overflow: hidden;
        }

        .cx-check {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(255,255,255,.04);
          transition: background .3s;
        }

        .cx-check:last-child { border-bottom: 0; }
        .cx-check.active { background: rgba(255,255,255,.04); }

        .cx-check-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.1);
        }

        .cx-check.done .cx-check-icon { background: rgba(145,103,255,.1); border-color: rgba(145,103,255,.35); }
        .cx-check.active .cx-check-icon { border-color: rgba(240,237,232,.3); }

        .cx-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f0ede8;
          animation: cx-pulse 1s ease-in-out infinite;
        }

        @keyframes cx-pulse { 0%,100% { opacity: .4; } 50% { opacity: 1; } }

        .cx-check-text { flex: 1; min-width: 0; }

        .cx-check-label {
          font: 11px "Space Mono", monospace;
          letter-spacing: .1em;
          color: rgba(255,255,255,.18);
          transition: color .3s;
        }

        .cx-check-sub {
          margin-top: 2px;
          font-size: 12px;
          color: rgba(255,255,255,.08);
          transition: color .3s;
        }

        .cx-check.done .cx-check-label { color: rgba(255,255,255,.3); }
        .cx-check.done .cx-check-sub { color: rgba(255,255,255,.12); }
        .cx-check.active .cx-check-label { color: #f0ede8; }
        .cx-check.active .cx-check-sub { color: rgba(255,255,255,.38); }

        .cx-check-state {
          flex-shrink: 0;
          min-width: 60px;
          text-align: right;
          font: 10px "Space Mono", monospace;
          letter-spacing: .06em;
          color: rgba(255,255,255,.1);
        }

        .cx-check.done .cx-check-state { color: rgba(164,123,255,.65); }

        .cx-scan {
          height: 2px;
          width: 60px;
          margin-left: auto;
          border-radius: 2px;
          background: rgba(255,255,255,.06);
          overflow: hidden;
        }

        .cx-scan > span {
          display: block;
          height: 100%;
          background: #f0ede8;
          animation: cx-scanline 1.2s ease-in-out infinite;
        }

        @keyframes cx-scanline {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          50.001% { transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }

        .cx-progress-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
          font: 10px "Space Mono", monospace;
          letter-spacing: .1em;
          color: rgba(255,255,255,.2);
        }

        .cx-progress {
          height: 1px;
          margin-top: 6px;
          background: rgba(255,255,255,.06);
          overflow: hidden;
        }

        .cx-progress > span {
          display: block;
          height: 100%;
          background: rgba(240,237,232,.4);
          transition: width .6s ease;
        }

        .cx-error { text-align: center; }

        .cx-error-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(145,103,255,.08);
          border: 1px solid rgba(145,103,255,.28);
        }

        .cx-error p {
          max-width: 380px;
          margin: 0 auto 28px;
          color: rgba(255,255,255,.4);
          font-size: 13px;
          line-height: 1.6;
        }

        .cx-error-actions { display: flex; gap: 12px; }

        .cx-btn-ghost,
        .cx-btn-solid {
          flex: 1;
          padding: 14px;
          border-radius: 4px;
          cursor: pointer;
        }

        .cx-btn-ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,.15);
          color: rgba(255,255,255,.6);
          font: 11px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .cx-btn-solid {
          border: 0;
          background: #f0ede8;
          color: #080808;
          font: 400 16px "Bebas Neue", sans-serif;
          letter-spacing: .08em;
        }

        /* ---------- Responsive ---------- */
        @media (max-height: 760px) {
          .workflow-shell { padding-top: 12px; padding-bottom: 14px; }
          .cx-back { margin-bottom: 9px; }
          .cx-eyebrow { display: none; }
          .cx-sub { margin: 10px 0 14px; }
          .cx-textarea { height: clamp(96px, 20vh, 160px); }
          .cx-side { min-height: 420px; }
          .cx-dossier { padding: 20px; }
          .cx-paper { height: 110px; }
          .cx-next { height: 48px; }
        }

        @media (max-width: 1040px) {
          .workflow-layout { grid-template-columns: minmax(0, 1.1fr) minmax(320px, .7fr); gap: 28px; }
          .cx-side { min-height: 420px; }
          .cx-watermark { right: 60px; }
        }

        @media (max-width: 900px) {
          .cx-page { --nav-height: 82px; }
          .workflow-shell { padding: 18px 24px; }
          .workflow-layout { grid-template-columns: 1fr; gap: 14px; align-content: center; }
          .cx-side { display: none; }
          .cx-h1 { font-size: clamp(54px, 10vw, 82px); }
          .cx-sub { margin-bottom: 18px; }
          .cx-watermark { top: 26%; right: -30px; font-size: 190px; }
        }

        @media (max-width: 600px) {
          .cx-page { --nav-height: 74px; }
          .workflow-shell { padding: 12px 18px; }
          .cx-h1 { font-size: clamp(48px, 14vw, 68px); }
          .cx-sub { font-size: 12px; }
          .cx-textarea { height: clamp(90px, 18vh, 140px); }
          .cx-next { height: 48px; }
          .cx-watermark { top: 37%; left: 50%; right: auto; transform: translateX(-50%); font-size: 150px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cx-orbit::after, .cx-particle, .cx-dot, .cx-chip, .cx-copy, .cx-pulse, .cx-scan > span { animation: none; }
        }
      `}</style>

      <div className="cx-page">
        <div className="cx-grid" />
        <div className="cx-glow" />
        <div className="cx-vignette" />

        <div className="cx-atmosphere" aria-hidden="true">
          <div className="cx-orbit" />

          {PARTS.map((p, i) => (
            <span
              key={`p-${i}`}
              className={`cx-particle${p.accent ? " accent" : ""}`}
              style={{
                left: p.x,
                top: p.y,
                width: p.s,
                height: p.s,
                opacity: p.accent ? 0.55 : 0.38,
                "--delay": p.delay,
              }}
            />
          ))}

          {ORBIT_DOTS.map((d, i) => (
            <i key={`d-${i}`} className="cx-dot" style={{ left: d.x, top: d.y, "--delay": d.delay }} />
          ))}

          {CHIPS.map((c) => (
            <span key={c.text} className="cx-chip" style={{ left: c.x, top: c.y, "--delay": c.delay }}>
              {c.text}
            </span>
          ))}
        </div>

        <div className="cx-watermark">CONTEXT</div>

        <AppNav navStep={2} />

        <main className="workflow-shell">
          <div className="workflow-layout">
            <section className="cx-copy">
              <button className="cx-back" onClick={() => navigate(-1)}>
                ← Back
              </button>

              <Eyebrow>03 / JOB CONTEXT</Eyebrow>

              <h1 className="cx-h1">
                GIVE US THE<br />
                <Ghost>JOB DESCRIPTION.</Ghost>
              </h1>

              <p className="cx-sub">
                Set the target for your resume. We'll score ATS fit against the role, then roast your
                resume against that same target.
              </p>

              <div className="cx-section-label">
                <span>JOB DESCRIPTION</span>
                <span>{wordCount} WORDS</span>
              </div>

              <textarea
                className="cx-textarea"
                placeholder={"Paste the job description here...\n\nThe more specific the target, the sharper your ATS score and roast. No JD? Skip below and the AI will set its own from your role and seniority."}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />

              <button className="cx-next" disabled={!jd} onClick={() => handleGetVerdict(true)}>
                GET MY VERDICT →
              </button>

              <button className="cx-skip" onClick={() => handleGetVerdict(false)}>
                no job description? let the AI pick the target
              </button>
            </section>

            <aside className="cx-side" aria-label="Job context summary">
              <div className="cx-dossier">
                <div className="cx-dossier-head">
                  <div className="cx-dossier-kicker">job context</div>
                  <div className="cx-dossier-step">03 / 05</div>
                </div>

                <h2 className="cx-dossier-title">LOCK THE TARGET.</h2>
                <p className="cx-dossier-muted">
                  Your resume gets scored against this description. Paste a real posting for the sharpest result.
                </p>

                <div>
                  <div className="cx-meta-row">
                    <div className="cx-meta-label">Role</div>
                    <div className="cx-meta-value">{selectedRole ? roleLabel : "NOT SET"}</div>
                  </div>
                  <div className="cx-meta-row">
                    <div className="cx-meta-label">Seniority</div>
                    <div className="cx-meta-value">{seniority || "NOT SET"}</div>
                  </div>
                  <div className="cx-meta-row" style={{ borderBottom: 0 }}>
                    <div className="cx-meta-label">Resume</div>
                    <div className="cx-meta-value">{fileName || "NO FILE"}</div>
                  </div>
                </div>

                <div className="cx-paper">
                  <div className="cx-paper-kicker">JD PREVIEW</div>
                  {jdLines.length ? (
                    jdLines.map((line, i) => (
                      <div key={i} className="cx-paper-line">{line}</div>
                    ))
                  ) : (
                    <div className="cx-paper-empty">
                      Nothing yet. Paste a job description to see it here, or skip and the AI will pick the target.
                    </div>
                  )}
                </div>

                <div className="cx-bar"><span style={{ width: `${Math.max(jdStrength, 6)}%` }} /></div>

                <div className="cx-note">
                  {wordCount === 0
                    ? "no description yet — the AI will set its own target from your role."
                    : wordCount < 60
                      ? "a bit short — more detail means a sharper score."
                      : "good detail. the score will be tuned to this."}
                </div>
              </div>
            </aside>
          </div>
        </main>

        {loading && (
          <div className="cx-overlay">
            <div className="cx-overlay-inner">
              {loadError ? (
                <div className="cx-error">
                  <div className="cx-error-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 4L16 16M16 4L4 16" stroke="#a47bff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="cx-ov-kicker" style={{ color: "rgba(164,123,255,.65)" }}>
                    PROCESSING / FAILED
                  </div>
                  <h2 className="cx-ov-title" style={{ marginBottom: 14 }}>ANALYSIS FAILED.</h2>
                  <p>{loadError}</p>
                  <div className="cx-error-actions">
                    <button
                      className="cx-btn-ghost"
                      onClick={() => {
                        setLoadError(null);
                        setLoading(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button className="cx-btn-solid" onClick={() => handleGetVerdict(lastWithJd.current)}>
                      TRY AGAIN
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="cx-ov-kicker">PROCESSING / IN PROGRESS</div>
                  <h2 className="cx-ov-title">
                    READING YOUR<br /><Ghost>RESUME.</Ghost>
                  </h2>

                  <div className="cx-checklist">
                    {CHECKLIST.map((item, i) => {
                      const done = i < loadStep;
                      const active = i === loadStep;
                      return (
                        <div key={item.label} className={`cx-check${done ? " done" : ""}${active ? " active" : ""}`}>
                          <div className="cx-check-icon">
                            {done && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="#a47bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                            {active && <div className="cx-pulse" />}
                          </div>

                          <div className="cx-check-text">
                            <div className="cx-check-label">{item.label}</div>
                            <div className="cx-check-sub">{item.sub}</div>
                          </div>

                          <div className="cx-check-state">
                            {done && "DONE"}
                            {active && <div className="cx-scan"><span /></div>}
                            {!done && !active && "—"}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="cx-progress-meta">
                    <span>{loadStep} / {CHECKLIST.length} CHECKS</span>
                    <span>{Math.round((loadStep / CHECKLIST.length) * 100)}%</span>
                  </div>
                  <div className="cx-progress">
                    <span style={{ width: `${(loadStep / CHECKLIST.length) * 100}%` }} />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}