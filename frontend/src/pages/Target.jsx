import { useNavigate } from "react-router-dom";
import AppNav from "../components/Appnav";
import { useResume } from "../context/ResumeContext";
import { useEffect, useMemo, useState } from "react";

const JOB_ROLES = [
  { id: "swe", label: "Software Engineer", short: "SOFTWARE" },
  { id: "pm", label: "Product Manager", short: "PRODUCT" },
  { id: "design", label: "UX Designer", short: "DESIGN" },
  { id: "data", label: "Data Scientist", short: "DATA" },
  { id: "devops", label: "DevOps / Infra", short: "DEVOPS" },
  { id: "marketing", label: "Marketing", short: "MARKETING" },
  { id: "finance", label: "Finance / Banking", short: "FINANCE" },
  { id: "other", label: "Other role", short: "OTHER" },
];

const SENIORITY = ["INTERN", "JUNIOR", "MID", "SENIOR", "STAFF / LEAD", "MANAGER+"];

const PARTS = [
  { x: "7%", y: "16%", s: 2, delay: "-1.2s", accent: true },
  { x: "13%", y: "71%", s: 3, delay: "-3.8s" },
  { x: "81%", y: "18%", s: 2, delay: "-0.7s" },
  { x: "90%", y: "42%", s: 3, delay: "-2.6s" },
  { x: "76%", y: "83%", s: 2, delay: "-4.2s", accent: true },
  { x: "21%", y: "88%", s: 2, delay: "-5.4s" },
  { x: "58%", y: "10%", s: 2, delay: "-2.1s" },
];

const TARGET_SYMBOLS = [
  { x: "72%", y: "17%", size: 46, rotation: -8, opacity: 0.34, delay: "-1.4s" },
  { x: "86%", y: "31%", size: 30, rotation: 7, opacity: 0.28, delay: "-3.1s" },
  { x: "76%", y: "64%", size: 38, rotation: -5, opacity: 0.25, delay: "-5.2s" },
  { x: "93%", y: "72%", size: 24, rotation: 12, opacity: 0.24, delay: "-2.2s" },
];

const TARGET_PARTICLES = [
  { x: "38%", y: "19%", s: 2, delay: "-1.8s", opacity: 0.28 },
  { x: "47%", y: "27%", s: 3, delay: "-4.6s", opacity: 0.36 },
  { x: "57%", y: "15%", s: 2, delay: "-2.9s", opacity: 0.30 },
  { x: "68%", y: "24%", s: 2, delay: "-5.2s", opacity: 0.34 },
  { x: "78%", y: "34%", s: 3, delay: "-1.1s", opacity: 0.42 },
  { x: "86%", y: "52%", s: 2, delay: "-3.7s", opacity: 0.30 },
  { x: "73%", y: "61%", s: 2, delay: "-6.1s", opacity: 0.34 },
  { x: "63%", y: "72%", s: 3, delay: "-2.4s", opacity: 0.38 },
  { x: "51%", y: "82%", s: 2, delay: "-4.9s", opacity: 0.27 },
  { x: "35%", y: "75%", s: 2, delay: "-1.5s", opacity: 0.25 },
];

const TARGET_OBJECTS = [
  { type: "reticle", x: "68%", y: "39%", size: 118, delay: "-2.4s" },
  { type: "ats", x: "77%", y: "58%", delay: "-4.1s" },
  { type: "profile", x: "54%", y: "18%", delay: "-1.2s" },
];

const PAPERS = [
  { x: "8%", y: "23%", w: 34, h: 44, r: -18, o: 0.16, b: 2, d: "-2.5s" },
  { x: "84%", y: "25%", w: 26, h: 34, r: 16, o: 0.13, b: 1.5, d: "-4s" },
  { x: "90%", y: "75%", w: 46, h: 60, r: -11, o: 0.18, b: 1.2, d: "-1.4s" },
  { x: "10%", y: "77%", w: 24, h: 34, r: 25, o: 0.12, b: 1.8, d: "-4.8s" },
];

function Eyebrow({ children }) {
  return <div className="tg-eyebrow">{children}</div>;
}

function Ghost({ children }) {
  return <span className="tg-ghost">{children}</span>;
}

export default function Target() {
  const {
    resumeLoaded,
    fileName,
    selectedRole,
    setSelectedRole,
    seniority,
    setSeniority,
    canAdvanceStep1,
    restoring,
  } = useResume();

  const navigate = useNavigate();

  const knownRole = useMemo(
    () => JOB_ROLES.find((r) => r.id === selectedRole),
    [selectedRole]
  );

  const [customRole, setCustomRole] = useState(() => {
    const known = JOB_ROLES.some((r) => r.id === selectedRole);
    return known || !selectedRole ? "" : selectedRole;
  });

  const showCustomRole = selectedRole === "other" || (!knownRole && !!selectedRole);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!restoring && !resumeLoaded) navigate("/upload");
  }, [restoring, resumeLoaded, navigate]);

  const chooseRole = (id) => {
    if (id === "other") {
      setSelectedRole("other");
      return;
    }
    setSelectedRole(id);
    setCustomRole("");
  };

  const handleCustomRole = (value) => {
    setCustomRole(value);
    setSelectedRole(value.trim() ? value.trim() : "other");
  };

  const selectedRoleLabel =
    knownRole?.label ||
    (selectedRole && selectedRole !== "other" ? selectedRole : "OTHER ROLE");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        html, body, #root {
          width: 100%;
          height: 100%;
          margin: 0;
          overflow: hidden;
          background: #080808;
        }

        .tg-page {
          --nav-height: 56px;
          position: relative;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          isolation: isolate;
          background: #080808;
          color: #f0ede8;
          font-family: "DM Sans", sans-serif;
        }

        .tg-grid {
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

        .tg-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.22) 100%);
        }

        .tg-glow {
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
            rgba(255,168,31,.085) 0%,
            rgba(255,168,31,.03) 36%,
            transparent 72%);
        }

        .tg-watermark {
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

        .tg-orbit {
          position: absolute;
          width: min(48vw, 640px);
          height: min(28vw, 330px);
          right: 2%;
          top: 50%;
          transform: translateY(-50%) rotate(-9deg);
          border: 1px solid rgba(255,168,31,.12);
          border-radius: 50%;
          opacity: .9;
          pointer-events: none;
          z-index: 0;
        }

        .tg-orbit::before,
        .tg-orbit::after {
          content: "";
          position: absolute;
          inset: 12% 9%;
          border-radius: 50%;
          border: 1px solid rgba(255,168,31,.08);
        }

        .tg-orbit::after {
          inset: 25% 20%;
          border-style: dashed;
          opacity: .7;
          animation: tg-spin 20s linear infinite;
        }

        @keyframes tg-spin {
          to { transform: rotate(360deg); }
        }

        .tg-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(235,232,234,.56);
          animation: tg-drift 7s ease-in-out var(--delay) infinite alternate;
        }

        .tg-particle.accent {
          background: #ffa81f;
          box-shadow: 0 0 10px 2px rgba(255,168,31,.45);
        }

        .tg-target-object {
          position: absolute;
          z-index: 1;
          pointer-events: none;
          color: rgba(255,179,67,.58);
          font: 8px "Space Mono", monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
          animation: tg-object-float 9s ease-in-out var(--delay) infinite alternate;
        }

        .tg-reticle {
          width: var(--size);
          height: var(--size);
          border: 1px solid rgba(255,168,31,.22);
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(255,168,31,.06);
        }

        .tg-reticle::before,
        .tg-reticle::after {
          content: "";
          position: absolute;
          background: rgba(255,168,31,.42);
        }

        .tg-reticle::before {
          left: 50%;
          top: -9px;
          width: 1px;
          height: calc(100% + 18px);
          transform: translateX(-50%);
        }

        .tg-reticle::after {
          top: 50%;
          left: -9px;
          width: calc(100% + 18px);
          height: 1px;
          transform: translateY(-50%);
        }

        .tg-reticle-dot {
          position: absolute;
          inset: 50%;
          width: 7px;
          height: 7px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: #ffa81f;
          box-shadow: 0 0 12px rgba(255,168,31,.55);
        }

        .tg-object-card {
          min-width: 112px;
          padding: 9px 11px;
          border: 1px solid rgba(255,168,31,.15);
          border-radius: 4px;
          background: rgba(12,11,9,.48);
          box-shadow: 0 12px 30px rgba(0,0,0,.18);
          backdrop-filter: blur(3px);
        }

        .tg-object-card strong {
          display: block;
          margin-top: 4px;
          color: rgba(255,255,255,.62);
          font-size: 11px;
          letter-spacing: .03em;
        }

        .tg-object-card .warm { color: #ffb343; }

        @keyframes tg-object-float {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(9px,-12px,0); }
        }

        .tg-target-symbol {
          position: absolute;
          z-index: 0;
          width: var(--size);
          height: var(--size);
          left: var(--x);
          top: var(--y);
          transform: rotate(var(--rotation));
          opacity: var(--opacity);
          pointer-events: none;
          color: rgba(255, 174, 43, .78);
          animation: tg-symbol-float 7s ease-in-out var(--delay) infinite alternate;
          filter: drop-shadow(0 0 8px rgba(255, 168, 31, .10));
        }

        /* Crosshair / target symbol */
        .tg-target-symbol::before,
        .tg-target-symbol::after {
          content: "";
          position: absolute;
          inset: 22%;
          border: 1px solid currentColor;
          border-radius: 50%;
        }

        .tg-target-symbol::after {
          inset: 43%;
          border-width: 2px;
          box-shadow: 0 0 0 5px rgba(255,168,31,.025);
        }

        .tg-symbol-cross {
          position: absolute;
          inset: 0;
        }

        .tg-symbol-cross::before,
        .tg-symbol-cross::after {
          content: "";
          position: absolute;
          background: currentColor;
          opacity: .65;
        }

        .tg-symbol-cross::before {
          width: 1px;
          height: 100%;
          left: 50%;
          top: 0;
        }

        .tg-symbol-cross::after {
          width: 100%;
          height: 1px;
          left: 0;
          top: 50%;
        }

        @keyframes tg-symbol-float {
          from { transform: translate3d(0, 0, 0) rotate(var(--rotation)); }
          to { transform: translate3d(6px, -8px, 0) rotate(calc(var(--rotation) + 3deg)); }
        }

        .tg-target-particle {
          position: absolute;
          z-index: 0;
          border-radius: 50%;
          pointer-events: none;
          background: #ffb43b;
          box-shadow: 0 0 7px 1px rgba(255,168,31,.20);
          animation: tg-target-drift 8s ease-in-out var(--delay) infinite alternate;
        }

        @keyframes tg-target-drift {
          from { transform: translate3d(0, 0, 0) scale(.9); }
          to { transform: translate3d(7px, -9px, 0) scale(1.08); }
        }

        @keyframes tg-drift {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(10px,-12px,0); }
        }

        .tg-paper {
          position: absolute;
          left: var(--x);
          top: var(--y);
          width: var(--w);
          height: var(--h);
          opacity: var(--opacity);
          filter: blur(var(--blur));
          transform: rotate(var(--rotation));
          pointer-events: none;
          z-index: 0;
          border-radius: 2px;
          background:
            repeating-linear-gradient(transparent 0 5px, rgba(0,0,0,.28) 5px 6px),
            linear-gradient(#d4d0c6,#8f8b81);
          box-shadow: 0 0 12px rgba(255,168,31,.13);
          animation: tg-paper-float 10s ease-in-out var(--delay) infinite alternate;
        }

        .tg-paper::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255,168,31,.12);
        }

        @keyframes tg-paper-float {
          from { transform: rotate(var(--rotation)) translate3d(0,0,0); }
          to { transform: rotate(calc(var(--rotation) + 10deg)) translate3d(8px,-10px,0); }
        }

        /* EXACT shared wrapper used by Upload */
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

        .tg-copy {
          min-width: 0;
          max-width: 760px;
          animation: tg-enter .5s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes tg-enter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tg-back {
          display: flex;
          width: fit-content;
          align-items: center;
          gap: 8px;
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.42);
          cursor: pointer;
          font: 10px "Space Mono", monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 0;
          margin: 0 0 16px;
          transition: color .2s ease, transform .2s ease;
          transform: translateY(8px);
        }

        .tg-back:hover {
          color: #f0ede8;
          transform: translateX(-3px);
        }

        .tg-eyebrow {
          margin-bottom: 10px;
          font: 10px "Space Mono", monospace;
          letter-spacing: .15em;
          color: rgba(255,255,255,.26);
          text-transform: uppercase;
        }

        .tg-file {
          display: flex;
          width: fit-content;
          max-width: 100%;
          align-items: center;
          gap: 9px;
          padding: 7px 11px;
          margin: 4px 0 12px;
          border: 1px solid rgba(46,230,160,.18);
          border-radius: 4px;
          background: rgba(46,230,160,.045);
          font: 10px "Space Mono", monospace;
          color: #2ee6a0;
          max-width: 100%;
        }

        .tg-file-name {
          color: rgba(255,255,255,.38);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: min(55vw, 420px);
        }

        .tg-h1 {
          margin: 0;
          font: 400 clamp(58px, 6.4vw, 92px)/.88 "Bebas Neue", sans-serif;
          letter-spacing: -.01em;
        }

        .tg-ghost {
          color: transparent;
          -webkit-text-stroke: 1.5px #f0ede8;
        }

        .tg-sub {
          max-width: 560px;
          margin: 14px 0 22px;
          color: rgba(255,255,255,.38);
          font-size: 14px;
          line-height: 1.5;
        }

        .tg-section-label {
          margin-bottom: 9px;
          font: 10px "Space Mono", monospace;
          letter-spacing: .13em;
          text-transform: uppercase;
          color: rgba(255,255,255,.24);
        }

        .tg-role-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }

        .tg-role-chip {
          min-height: 38px;
          padding: 0 13px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 999px;
          background: rgba(255,255,255,.018);
          color: rgba(255,255,255,.42);
          cursor: pointer;
          font: 10px "Space Mono", monospace;
          letter-spacing: .06em;
          text-transform: uppercase;
          transition: .18s ease;
        }

        .tg-role-chip:hover {
          border-color: rgba(255,168,31,.28);
          color: rgba(255,255,255,.72);
          background: rgba(255,168,31,.035);
        }

        .tg-role-chip.active {
          border-color: rgba(255,168,31,.5);
          color: #fff4da;
          background: rgba(255,168,31,.08);
          box-shadow: inset 0 0 0 1px rgba(255,168,31,.08);
        }

        .tg-custom-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          margin-bottom: 16px;
        }

        .tg-input-wrap {
          position: relative;
        }

        .tg-input {
          width: 100%;
          height: 42px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 5px;
          background: rgba(255,255,255,.018);
          color: #f0ede8;
          outline: none;
          padding: 0 13px;
          font: 11px "Space Mono", monospace;
          letter-spacing: .05em;
          transition: border-color .18s ease, background .18s ease;
        }

        .tg-input::placeholder {
          color: rgba(255,255,255,.2);
        }

        .tg-input:focus {
          border-color: rgba(255,168,31,.4);
          background: rgba(255,168,31,.028);
        }

        .tg-custom-tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 96px;
          padding: 0 13px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 5px;
          font: 9px "Space Mono", monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.012);
        }

        .tg-seniority {
          display: grid;
          grid-template-columns: repeat(6, minmax(0,1fr));
          gap: 7px;
          margin-bottom: 18px;
        }

        .tg-seniority button {
          min-height: 38px;
          padding: 0 9px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 4px;
          background: rgba(255,255,255,.014);
          color: rgba(255,255,255,.35);
          cursor: pointer;
          font: 9px "Space Mono", monospace;
          letter-spacing: .06em;
          text-transform: uppercase;
          transition: .18s ease;
        }

        .tg-seniority button:hover {
          color: rgba(255,255,255,.7);
          border-color: rgba(255,255,255,.16);
        }

        .tg-seniority button.active {
          color: #f0ede8;
          border-color: rgba(255,255,255,.38);
          background: rgba(255,255,255,.055);
        }

        .tg-next {
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

        .tg-next:hover:not(:disabled) {
          transform: translateY(-1px);
          background: #ffffff;
        }

        .tg-next:disabled {
          opacity: .25;
          cursor: not-allowed;
        }

        .tg-skip {
          display: block;
          margin: 8px auto 0;
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.2);
          cursor: pointer;
          font: 9px "Space Mono", monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .tg-side {
          position: relative;
          min-height: 470px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tg-dossier {
          position: relative;
          width: min(100%, 460px);
          padding: 24px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px;
          background: linear-gradient(160deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
          box-shadow: 0 30px 80px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.04);
          backdrop-filter: blur(8px);
        }

        .tg-dossier::before,
        .tg-dossier::after {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(255,168,31,.24);
          border-style: solid;
        }

        .tg-dossier::before {
          top: -1px; left: -1px; border-width: 1px 0 0 1px;
        }

        .tg-dossier::after {
          bottom: -1px; right: -1px; border-width: 0 1px 1px 0;
        }

        .tg-dossier-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .tg-dossier-kicker {
          font: 9px "Space Mono", monospace;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.25);
        }

        .tg-dossier-step {
          color: #ffa81f;
          font: 10px "Space Mono", monospace;
          letter-spacing: .1em;
        }

        .tg-dossier-title {
          margin: 0 0 6px;
          font: 400 42px/.95 "Bebas Neue", sans-serif;
          letter-spacing: -.01em;
        }

        .tg-dossier-muted {
          margin: 0 0 24px;
          color: rgba(255,255,255,.28);
          font-size: 12px;
          line-height: 1.45;
        }

        .tg-meta {
          display: grid;
          gap: 10px;
        }

        .tg-meta-row {
          display: grid;
          grid-template-columns: 118px 1fr;
          gap: 14px;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .tg-meta-row:last-child { border-bottom: 0; }

        .tg-meta-label {
          font: 9px "Space Mono", monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.21);
        }

        .tg-meta-value {
          color: rgba(255,255,255,.78);
          font: 11px "Space Mono", monospace;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tg-bars {
          display: grid;
          gap: 7px;
          margin-top: 22px;
        }

        .tg-bar {
          height: 3px;
          border-radius: 4px;
          background: rgba(255,255,255,.06);
          overflow: hidden;
        }

        .tg-bar > span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, rgba(255,168,31,.15), rgba(255,168,31,.7));
        }

        .tg-note {
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,.06);
          color: rgba(255,255,255,.22);
          font: 9px/1.6 "Space Mono", monospace;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        @media (max-width: 1040px) {
          .workflow-layout { grid-template-columns: minmax(0, 1.1fr) minmax(320px, .7fr); gap: 28px; }
          .tg-side { min-height: 420px; }
          .tg-seniority { grid-template-columns: repeat(3, minmax(0,1fr)); }
          .tg-watermark { right: 60px; }
        }

        @media (max-width: 900px) {
          .tg-page { --nav-height: 82px; }
          .workflow-shell { padding: 18px 24px; align-items: flex-start; }
          .workflow-layout { grid-template-columns: 1fr; gap: 14px; align-content: center; }
          .tg-side { display: none; }
          .tg-h1 { font-size: clamp(54px, 10vw, 82px); }
          .tg-sub { margin-bottom: 18px; }
          .tg-watermark { top: 26%; right: -30px; font-size: 190px; }
        }

        @media (max-width: 600px) {
          .tg-page { --nav-height: 74px; }
          .workflow-shell { padding: 12px 18px; }
          .tg-h1 { font-size: clamp(48px, 14vw, 68px); }
          .tg-sub { font-size: 12px; }
          .tg-file { margin-bottom: 12px; }
          .tg-role-chip { min-height: 34px; padding: 0 10px; font-size: 9px; }
          .tg-custom-row { grid-template-columns: 1fr; }
          .tg-custom-tag { min-height: 34px; }
          .tg-seniority { gap: 6px; }
          .tg-seniority button { min-height: 34px; font-size: 8px; }
          .tg-next { height: 48px; }
          .tg-watermark { top: 37%; left: 50%; right: auto; transform: translateX(-50%); font-size: 150px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .tg-orbit::after, .tg-particle, .tg-paper, .tg-copy { animation: none; }
        }
      `}</style>

      <div className="tg-page">
        <div className="tg-grid" />
        <div className="tg-glow" />
        <div className="tg-vignette" />

        <div className="tg-orbit" />

        {TARGET_SYMBOLS.map((s, i) => (
          <div
            key={`target-symbol-${i}`}
            className="tg-target-symbol"
            style={{
              "--x": s.x,
              "--y": s.y,
              "--size": `${s.size}px`,
              "--rotation": `${s.rotation}deg`,
              "--opacity": s.opacity,
              "--delay": s.delay,
            }}
          >
            <span className="tg-symbol-cross" />
          </div>
        ))}

        {PARTS.map((p, i) => (
          <div
            key={i}
            className={`tg-particle${p.accent ? " accent" : ""}`}
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

        {TARGET_PARTICLES.map((p, i) => (
          <div
            key={`target-particle-${i}`}
            className="tg-target-particle"
            style={{
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s,
              opacity: p.opacity,
              "--delay": p.delay,
            }}
          />
        ))}

        {TARGET_OBJECTS.map((obj, i) => (
          <div
            key={`target-object-${i}`}
            className={`tg-target-object ${obj.type === "reticle" ? "tg-reticle" : "tg-object-card"}`}
            style={{
              left: obj.x,
              top: obj.y,
              "--delay": obj.delay,
              ...(obj.size ? { "--size": `${obj.size}px` } : {}),
            }}
          >
            {obj.type === "reticle" ? (
              <span className="tg-reticle-dot" />
            ) : obj.type === "ats" ? (
              <>
                ATS FIT
                <strong><span className="warm">92%</span> target match</strong>
              </>
            ) : (
              <>
                TARGET PROFILE
                <strong>ROLE + SENIORITY</strong>
              </>
            )}
          </div>
        ))}

        {PAPERS.map((p, i) => (
          <div
            key={i}
            className="tg-paper"
            style={{
              "--x": p.x,
              "--y": p.y,
              "--w": `${p.w}px`,
              "--h": `${p.h}px`,
              "--rotation": `${p.r}deg`,
              "--opacity": p.o,
              "--blur": `${p.b}px`,
              "--delay": p.d,
            }}
          />
        ))}

        <div className="tg-watermark">TARGET</div>

        <AppNav navStep={1} />

        <main className="workflow-shell">
          <div className="workflow-layout">
            <section className="tg-copy">
              <button className="tg-back" onClick={() => navigate(-1)}>
                ← Back
              </button>

              {resumeLoaded && (
                <div className="tg-file">
                  ✓
                  <span className="tg-file-name">{fileName}</span>
                </div>
              )}

              <Eyebrow>02 / TARGET ROLE</Eyebrow>

              <h1 className="tg-h1">
                WHAT JOB ARE<br />
                <Ghost>YOU HUNTING?</Ghost>
              </h1>

              <p className="tg-sub">
                Set the target for your resume. We use the role and seniority to score ATS fit,
                then tailor the roast to the job you are actually targeting.
              </p>

              <div className="tg-section-label">ROLE</div>

              <div className="tg-role-chips">
                {JOB_ROLES.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    className={`tg-role-chip ${
                      (role.id === "other"
                        ? showCustomRole
                        : selectedRole === role.id)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => chooseRole(role.id)}
                  >
                    {role.short}
                  </button>
                ))}
              </div>

              {showCustomRole && (
                <div className="tg-custom-row">
                  <div className="tg-input-wrap">
                    <input
                      className="tg-input"
                      value={customRole}
                      onChange={(e) => handleCustomRole(e.target.value)}
                      placeholder="Type any role — e.g. AI Engineer, ML Intern..."
                      autoFocus={!customRole}
                    />
                  </div>
                  <div className="tg-custom-tag">CUSTOM ROLE</div>
                </div>
              )}

              <div className="tg-section-label">SENIORITY LEVEL</div>

              <div className="tg-seniority">
                {SENIORITY.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={seniority === level ? "active" : ""}
                    onClick={() => setSeniority(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <button
                className="tg-next"
                disabled={!canAdvanceStep1}
                onClick={() => navigate("/context")}
              >
                NEXT: ADD CONTEXT →
              </button>

              <button className="tg-skip" onClick={() => navigate("/context")}>
                skip this step
              </button>
            </section>

            <aside className="tg-side" aria-hidden="true">
              <div className="tg-dossier">
                <div className="tg-dossier-head">
                  <div className="tg-dossier-kicker">target profile</div>
                  <div className="tg-dossier-step">02 / 05</div>
                </div>

                <h2 className="tg-dossier-title">BUILD THE TARGET.</h2>
                <p className="tg-dossier-muted">
                  Your resume will be scored for ATS fit and then roasted against this target —
                  not judged against a generic job description.
                </p>

                <div className="tg-meta">
                  <div className="tg-meta-row">
                    <div className="tg-meta-label">Role</div>
                    <div className="tg-meta-value">{selectedRoleLabel}</div>
                  </div>
                  <div className="tg-meta-row">
                    <div className="tg-meta-label">Seniority</div>
                    <div className="tg-meta-value">{seniority || "NOT SET"}</div>
                  </div>
                  <div className="tg-meta-row">
                    <div className="tg-meta-label">Resume</div>
                    <div className="tg-meta-value">{fileName || "NO FILE"}</div>
                  </div>
                </div>

                <div className="tg-bars">
                  <div className="tg-bar"><span style={{ width: knownRole ? "88%" : "68%" }} /></div>
                  <div className="tg-bar"><span style={{ width: seniority ? "74%" : "42%" }} /></div>
                  <div className="tg-bar"><span style={{ width: resumeLoaded ? "96%" : "20%" }} /></div>
                </div>

                <div className="tg-note">
                  the clearer the target, the sharper the ATS score and roast.
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}