import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { DEMO_RESUME } from "../data/demoResume";
import AppNav from "../components/Appnav";
import { API_URL } from "../config";

function Eyebrow({ children }) {
  return <div className="up-eyebrow">{children}</div>;
}

function BigHeadline({ children }) {
  return <h1 className="up-h1">{children}</h1>;
}

function Sub({ children }) {
  return <p className="up-sub">{children}</p>;
}

const PARTS = [
  { x: "7%", y: "16%", s: 2, delay: "-1.2s", accent: true },
  { x: "13%", y: "71%", s: 3, delay: "-3.8s" },
  { x: "82%", y: "18%", s: 2, delay: "-.7s" },
  { x: "91%", y: "43%", s: 3, delay: "-2.6s" },
  { x: "77%", y: "82%", s: 2, delay: "-4.2s", accent: true },
  { x: "23%", y: "88%", s: 2, delay: "-5.4s" },
  { x: "58%", y: "10%", s: 2, delay: "-2.1s" },
];

const PAPERS = [
  { x: "8%", y: "23%", w: 34, h: 44, r: -18, o: 0.17, b: 2, d: "-2.5s" },
  { x: "87%", y: "21%", w: 26, h: 34, r: 16, o: 0.14, b: 1.5, d: "-4s" },
  { x: "91%", y: "75%", w: 46, h: 60, r: -11, o: 0.19, b: 1.2, d: "-1.4s" },
  { x: "9%", y: "77%", w: 24, h: 34, r: 25, o: 0.13, b: 1.8, d: "-4.8s" },
];

function MiniResumePreview({ text, fileName, loading = false }) {
  const lines = useMemo(() => {
    if (!text) return [];

    return text
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .slice(0, 32);
  }, [text]);

  const displayLines = lines.length
    ? lines
    : loading
      ? ["Extracting your resume...", "The preview will update when the text is ready."]
      : ["No extracted text yet.", "Try uploading the resume again."];

  return (
    <div className="resume-preview">
      <div className="resume-paper">
        <div className="resume-paper-head">
          <div className="resume-paper-name">
            {lines[0]?.slice(0, 42) || fileName || "YOUR RESUME"}
          </div>
          <div className="resume-paper-role">
            {loading ? "EXTRACTING..." : "RESUME PREVIEW"}
          </div>
        </div>

        <div className="resume-paper-body">
          {displayLines.map((line, index) => {
            const heading =
              line.length < 48 &&
              (
                /^[A-Z][A-Z\s&/().,:+\-]+$/.test(line) ||
                /^(summary|profile|objective|experience|education|skills|projects|certifications|internships|achievements|contact|technical skills|work experience)$/i.test(line)
              );

            return (
              <div
                key={`${index}-${line}`}
                className={`resume-paper-line ${heading ? "is-heading" : ""}`}
                title={line}
              >
                {line}
              </div>
            );
          })}
        </div>

      </div>

      {fileName && (
        <div className="preview-file-row">
          <span className="preview-dot" />
          <span className="preview-file-name">{fileName}</span>
          <span className="preview-status">
            {loading ? "EXTRACTING" : "READY"}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Upload() {
  const navigate = useNavigate();
  const { setResumeText, setFileName, setResumeLoaded } = useResume();

  const [dragging, setDragging] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [previewFileName, setPreviewFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const uploadResumeFile = async (file) => {
    if (!file) return;

    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    const extOk = /\.(pdf|docx|txt)$/i.test(file.name);
    if (!extOk && !allowed.includes(file.type)) {
      console.error("Unsupported resume format:", file.name);
      return;
    }

    try {
      setUploading(true);
      setPreviewText("");
      // Show the selected file in the preview panel immediately.
      // The extracted text is filled in as soon as the API responds.
      setPreviewFileName(file.name);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed (${res.status})`);
      }

      const data = await res.json();

      // Different backend versions may use different response keys.
      // Accept all common names so the preview does not silently stay empty.
      const extracted =
        data.resumeText ||
        data.extractedText ||
        data.text ||
        data.content ||
        data.resume ||
        "";

      const name =
        data.fileName ||
        data.filename ||
        data.originalName ||
        file.name;

      setResumeText(extracted);
      setFileName(name);
      setResumeLoaded(true);
      setPreviewText(extracted);
      setPreviewFileName(name);
    } catch (err) {
      console.error("Resume upload failed:", err);
      setPreviewText("");
      // Keep the filename visible so the user can see that the file was selected.
      setPreviewFileName(file.name);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) uploadResumeFile(file);
  }, []);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadResumeFile(file);
    e.target.value = "";
  };

  const useDemo = () => {
    const demoText = DEMO_RESUME.map((item) => item.text).join("\n");
    setResumeText(demoText);
    setFileName("demo-resume.txt");
    setResumeLoaded(true);
    setPreviewText(demoText);
    setPreviewFileName("demo-resume.txt");
  };

  const resumeReady = Boolean(previewFileName);
  const canContinue = Boolean(previewText.trim());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap');

        /* -------------------------------------------------------------
           Page reset: one predictable box model for every workflow page.
        ------------------------------------------------------------- */
        html, body, #root {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #080808;
        }

        *, *::before, *::after { box-sizing: border-box; }

        .upload-page {
          --nav-height: 56px;
          --accent: #34c77b;
          position: relative;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          isolation: isolate;
          background: #080909;
          color: #f0ede8;
          font-family: 'DM Sans', sans-serif;
        }

        /* Same outer geometry as Target. Every future workflow page can use
           this exact shell/wrapper without adding another max-width. */
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

        /* -------------------------------------------------------------
           Background: same language as the landing residue.
        ------------------------------------------------------------- */
        .upload-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: .58;
          background-image:
            linear-gradient(to right, rgba(255,255,255,.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 76px 76px;
          -webkit-mask-image: radial-gradient(ellipse 86% 78% at 50% 50%, black 0%, rgba(0,0,0,.84) 48%, transparent 100%);
          mask-image: radial-gradient(ellipse 86% 78% at 50% 50%, black 0%, rgba(0,0,0,.84) 48%, transparent 100%);
        }

        .upload-glow {
          position: absolute;
          z-index: 0;
          width: 58vw;
          height: 58vw;
          max-width: 780px;
          max-height: 780px;
          right: -10%;
          top: 3%;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(28px);
          background: radial-gradient(circle,
            rgba(52,199,123,.09) 0%,
            rgba(52,199,123,.03) 36%,
            transparent 72%);
        }

        .upload-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,.22) 100%);
        }

        .watermark {
          position: absolute;
          top: 120px;
          right: 120px;
          z-index: 0;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(180px, 18vw, 320px);
          line-height: .8;
          letter-spacing: -.04em;
          color: rgba(255,255,255,.055);
        }

        /* -------------------------------------------------------------
           Landing visual residue: few particles, papers, faint orbit.
        ------------------------------------------------------------- */
        .upload-atmosphere {
          position: absolute;
          inset: 56px 0 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .upload-trace {
          position: absolute;
          width: min(48vw, 640px);
          height: min(28vw, 330px);
          right: 1.5%;
          top: 50%;
          transform: translateY(-50%) rotate(-9deg);
          border: 1px solid rgba(52,199,123,.11);
          border-radius: 50%;
          opacity: .95;
        }

        .upload-trace::before,
        .upload-trace::after {
          content: '';
          position: absolute;
          inset: 12% 9%;
          border-radius: 50%;
          border: 1px solid rgba(52,199,123,.075);
        }

        .upload-trace::after {
          inset: 25% 20%;
          border-style: dashed;
          opacity: .72;
          animation: uploadTraceSpin 20s linear infinite;
        }

        @keyframes uploadTraceSpin {
          to { transform: rotate(360deg); }
        }

        .upload-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(235,232,234,.56);
          box-shadow: 0 0 10px rgba(235,232,234,.16);
          animation: uploadParticleDrift 7s ease-in-out var(--delay) infinite alternate;
        }

        .upload-particle.accent {
          background: #34c77b;
          box-shadow: 0 0 10px 2px rgba(52,199,123,.42);
        }

        @keyframes uploadParticleDrift {
          from { transform: translate3d(0,0,0); }
          to { transform: translate3d(10px,-12px,0); }
        }

        .upload-paper {
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
          box-shadow: 0 0 12px rgba(52,199,123,.12);
          animation: uploadPaperFloat 10s ease-in-out var(--delay) infinite alternate;
        }

        .upload-paper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(52,199,123,.1);
        }

        @keyframes uploadPaperFloat {
          from { transform: rotate(var(--rotation)) translate3d(0,0,0); }
          to { transform: rotate(calc(var(--rotation) + 10deg)) translate3d(8px,-10px,0); }
        }

        /* -------------------------------------------------------------
           Left content: same vertical rhythm as Target.
        ------------------------------------------------------------- */
        .upload-content {
          min-width: 0;
          max-width: 760px;
          animation: uploadEnter .45s cubic-bezier(.16,1,.3,1) both;
        }

        @keyframes uploadEnter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .up-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 20px;
          padding: 0;
          border: 0;
          background: transparent;
          color: rgba(255,255,255,.42);
          cursor: pointer;
          font: 10px 'Space Mono', monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
          transition: color .2s ease, transform .2s ease;
        }

        .up-back:hover { color: #f0ede8; transform: translateX(-3px); }

        .up-eyebrow {
          margin-bottom: 10px;
          color: rgba(255,255,255,.26);
          font: 10px 'Space Mono', monospace;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .up-h1 {
          margin: 0;
          font: 400 clamp(58px, 6.4vw, 92px)/.88 'Bebas Neue', sans-serif;
          letter-spacing: -.01em;
          color: #f0ede8;
        }

        .up-ghost {
          color: transparent;
          -webkit-text-stroke: 1.5px #f0ede8;
        }

        .up-sub {
          max-width: 560px;
          margin: 14px 0 22px;
          color: rgba(255,255,255,.38);
          font-size: 14px;
          line-height: 1.5;
        }

        /* Upload zone now occupies the same left column as Target's controls. */
        .upload-drop {
          position: relative;
          width: 100%;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 28px;
          text-align: center;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 7px;
          background:
            linear-gradient(135deg, rgba(255,255,255,.024), rgba(255,255,255,.008)),
            radial-gradient(circle at 50% 0%, rgba(52,199,123,.05), transparent 58%);
          cursor: pointer;
          transition: border-color .2s ease, background .2s ease, transform .2s ease, box-shadow .2s ease;
        }

        .upload-drop:hover {
          border-color: rgba(52,199,123,.28);
          background:
            linear-gradient(135deg, rgba(255,255,255,.032), rgba(255,255,255,.01)),
            radial-gradient(circle at 50% 0%, rgba(52,199,123,.07), transparent 60%);
          transform: translateY(-1px);
        }

        .upload-drop.is-dragging {
          border-color: rgba(52,199,123,.85);
          background: rgba(52,199,123,.045);
          box-shadow: 0 0 42px rgba(52,199,123,.07);
        }

        .upload-drop > *:not(.upload-file-input) { pointer-events: none; }

        .upload-file-input {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          pointer-events: none;
          z-index: 2;
        }

        .corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(255,255,255,.24);
          border-style: solid;
        }

        .corner-tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .corner-tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
        .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
        .corner-br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

        .upload-icon {
          width: 38px;
          height: 42px;
          margin-bottom: 10px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 3px;
          color: rgba(255,255,255,.44);
          font-size: 15px;
          position: relative;
        }

        .upload-icon::after {
          content: '';
          position: absolute;
          right: 5px;
          top: 5px;
          width: 7px;
          height: 7px;
          border-top: 1px solid rgba(255,255,255,.2);
          border-right: 1px solid rgba(255,255,255,.2);
        }

        .upload-title {
          margin-bottom: 8px;
          font: 400 clamp(22px, 2.1vw, 30px)/1 'Bebas Neue', sans-serif;
          letter-spacing: .08em;
          color: #f0ede8;
        }

        .upload-hint {
          color: rgba(255,255,255,.28);
          font: 10px 'Space Mono', monospace;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .upload-or {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 10px 0;
          color: rgba(255,255,255,.2);
          font: 10px 'Space Mono', monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .upload-or::before,
        .upload-or::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,.07);
        }

        .demo-button {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 5px;
          background: rgba(255,255,255,.012);
          color: rgba(255,255,255,.42);
          cursor: pointer;
          font: 10px 'Space Mono', monospace;
          letter-spacing: .11em;
          text-transform: uppercase;
          transition: color .2s ease, border-color .2s ease, background .2s ease, transform .2s ease;
        }

        .demo-button:hover {
          color: var(--accent);
          border-color: rgba(52,199,123,.3);
          background: rgba(52,199,123,.025);
          transform: translateY(-1px);
        }

        /* -------------------------------------------------------------
           Right-side dossier: mirrors Target's right panel and uses the
           empty space to show the uploaded resume.
        ------------------------------------------------------------- */
        .upload-side {
          position: relative;
          min-height: 470px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-dossier {
          position: relative;
          width: min(100%, 460px);
          padding: 24px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px;
          background: linear-gradient(160deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
          box-shadow: 0 30px 80px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.04);
          backdrop-filter: blur(8px);
        }

        .upload-dossier::before,
        .upload-dossier::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: rgba(52,199,123,.24);
          border-style: solid;
        }

        .upload-dossier::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .upload-dossier::after { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

        .upload-dossier-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .upload-dossier-kicker,
        .upload-dossier-step {
          font: 9px 'Space Mono', monospace;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .upload-dossier-kicker { color: rgba(255,255,255,.25); }
        .upload-dossier-step { color: #34c77b; }

        .upload-dossier-title {
          margin: 0 0 6px;
          font: 400 42px/.95 'Bebas Neue', sans-serif;
          letter-spacing: -.01em;
        }

        .upload-dossier-muted {
          margin: 0 0 18px;
          color: rgba(255,255,255,.28);
          font-size: 12px;
          line-height: 1.45;
        }

        .resume-preview {
          position: relative;
        }

        .resume-paper {
          position: relative;
          height: 245px;
          max-height: 245px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 18px 18px 22px;
          border: 1px solid rgba(255,255,255,.11);
          border-radius: 5px;
          background: linear-gradient(165deg, #eeebe4 0%, #dbd7ce 58%, #c5c0b5 100%);
          box-shadow: 0 24px 50px rgba(0,0,0,.35);
          color: #292824;
        }

        .resume-paper::-webkit-scrollbar {
          width: 6px;
        }

        .resume-paper::-webkit-scrollbar-track {
          background: rgba(48,46,42,.08);
          border-radius: 6px;
        }

        .resume-paper::-webkit-scrollbar-thumb {
          background: rgba(48,46,42,.35);
          border-radius: 6px;
        }

        .resume-paper::-webkit-scrollbar-thumb:hover {
          background: rgba(48,46,42,.55);
        }

        .resume-paper {
          scrollbar-width: thin;
          scrollbar-color: rgba(48,46,42,.35) rgba(48,46,42,.08);
        }

        .resume-paper-head {
          padding-bottom: 10px;
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(48,46,42,.14);
        }

        .resume-paper-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font: 400 22px/.95 'Bebas Neue', sans-serif;
          letter-spacing: .01em;
        }

        .resume-paper-role {
          margin-top: 4px;
          font: 7px 'Space Mono', monospace;
          letter-spacing: .22em;
          color: #6e6a62;
        }

        .resume-paper-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-height: 0;
        }

        .resume-paper-line {
          width: 100%;
          max-width: 100%;
          min-height: 8px;
          overflow: hidden;
          color: rgba(48,46,42,.78);
          white-space: nowrap;
          text-overflow: ellipsis;
          font: 7px/1.25 'Space Mono', monospace;
        }

        .resume-paper-line.is-heading {
          min-height: 10px;
          margin-top: 5px;
          color: #403d37;
          font-size: 7.5px;
          font-weight: 700;
          letter-spacing: .06em;
        }

        .preview-file-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          color: rgba(255,255,255,.3);
          font: 9px 'Space Mono', monospace;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .preview-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #34c77b;
          box-shadow: 0 0 8px rgba(52,199,123,.45);
          flex: 0 0 auto;
        }

        .preview-file-name {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .preview-status { color: #34c77b; }

        .upload-next {
          width: 100%;
          height: 50px;
          margin-top: 18px;
          border: 0;
          border-radius: 5px;
          background: #f0ede8;
          color: #080808;
          cursor: pointer;
          font: 400 20px 'Bebas Neue', sans-serif;
          letter-spacing: .1em;
          transition: transform .18s ease, background .18s ease;
        }

        .upload-next:hover { transform: translateY(-1px); background: #fff; }
        .upload-next:disabled { opacity: .35; cursor: not-allowed; }

        .upload-empty-state {
          height: 245px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
          padding: 30px;
          border: 1px dashed rgba(52,199,123,.17);
          border-radius: 5px;
          background: rgba(52,199,123,.025);
          text-align: center;
        }

        .upload-empty-icon {
          width: 46px;
          height: 54px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.13);
          color: rgba(255,255,255,.35);
          font: 18px 'Space Mono', monospace;
        }

        .upload-empty-title {
          font: 400 26px/1 'Bebas Neue', sans-serif;
          letter-spacing: .08em;
        }

        .upload-empty-copy {
          max-width: 260px;
          color: rgba(255,255,255,.25);
          font: 9px/1.6 'Space Mono', monospace;
          letter-spacing: .05em;
          text-transform: uppercase;
        }

        .upload-loading {
          margin-top: 8px;
          color: #34c77b;
          font: 9px 'Space Mono', monospace;
          letter-spacing: .09em;
          text-transform: uppercase;
        }

        @media (max-height: 760px) {
          .workflow-shell { padding-top: 12px; padding-bottom: 14px; }
          .up-back { margin-bottom: 9px; }
          .up-eyebrow { display: none; }
          .up-sub { margin: 10px 0 14px; }
          .upload-drop { min-height: 170px; }
          .upload-side { min-height: 420px; }
          .resume-paper, .upload-empty-state { height: 205px; }
          .upload-dossier { padding: 20px; }
        }

        @media (max-width: 1040px) {
          .workflow-layout {
            grid-template-columns: minmax(0, 1.08fr) minmax(320px, .7fr);
            gap: 28px;
          }
          .upload-side { min-height: 420px; }
        }

        @media (max-width: 900px) {
          .upload-page { --nav-height: 82px; }
          .workflow-shell { padding: 18px 24px; }
          .workflow-layout { grid-template-columns: 1fr; gap: 14px; align-content: center; }
          .upload-side { display: none; }
          .upload-content { max-width: none; }
          .up-h1 { font-size: clamp(54px, 10vw, 82px); }
        }

        @media (max-width: 600px) {
          .upload-page { --nav-height: 74px; }
          .workflow-shell { padding: 12px 18px; }
          .up-h1 { font-size: clamp(48px, 14vw, 68px); }
          .up-sub { font-size: 12px; }
          .upload-drop { min-height: 158px; padding: 20px; }
          .watermark { top: 37%; left: 50%; right: auto; transform: translateX(-50%); font-size: 150px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .upload-trace::after,
          .upload-particle,
          .upload-paper,
          .upload-content { animation: none; }
          .upload-drop,
          .up-back,
          .demo-button,
          .upload-next { transition: none; }
        }
      `}</style>

      <div className="upload-page">
        <div className="upload-grid" />
        <div className="upload-glow" />
        <div className="upload-vignette" />

        <div className="upload-atmosphere" aria-hidden="true">
          <div className="upload-trace" />

          {PARTS.map((p, i) => (
            <span
              key={i}
              className={`upload-particle${p.accent ? " accent" : ""}`}
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

          {PAPERS.map((p, i) => (
            <span
              key={i}
              className="upload-paper"
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
        </div>

        <div className="watermark">UPLOAD</div>

        <AppNav navStep={0} />

        <main className="workflow-shell">
          <div className="workflow-layout">
            <section className="upload-content">
              <button className="up-back" onClick={() => navigate(-1)}>
                ← Back
              </button>

              <Eyebrow>01 / UPLOAD RESUME</Eyebrow>

              <BigHeadline>
                DROP IT.<br />
                <span className="up-ghost">WE'LL HANDLE</span><br />
                THE REST.
              </BigHeadline>

              <Sub>
                PDF, DOCX, or TXT. We'll extract every word and run it through the machine.
              </Sub>

              <div
                className={`upload-drop ${dragging ? "is-dragging" : ""}`}
                role="button"
                tabIndex={0}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    fileRef.current?.click();
                  }
                }}
              >
                <div className="corner corner-tl" />
                <div className="corner corner-tr" />
                <div className="corner corner-bl" />
                <div className="corner corner-br" />

                <div className="upload-icon">↑</div>
                <div className="upload-title">
                  {uploading
                    ? "ANALYZING RESUME"
                    : dragging
                      ? "RELEASE TO UPLOAD"
                      : resumeReady
                        ? "UPLOAD ANOTHER RESUME"
                        : "DRAG & DROP YOUR RESUME"}
                </div>
                <div className="upload-hint">
                  {uploading ? "extracting text — please wait" : "or click to browse — PDF, DOCX, TXT"}
                </div>

                <input
                  ref={fileRef}
                  className="upload-file-input"
                  type="file"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleFile}
                  aria-label="Choose resume file"
                />
              </div>

              <div className="upload-or">or</div>

              <button className="demo-button" onClick={useDemo} disabled={uploading}>
                USE DEMO RESUME INSTEAD →
              </button>
            </section>

            <aside className="upload-side" aria-label="Resume preview">
              <div className="upload-dossier">
                <div className="upload-dossier-head">
                  <div className="upload-dossier-kicker">upload resume</div>
                  <div className="upload-dossier-step">01 / 05</div>
                </div>

                <h2 className="upload-dossier-title">
                  {resumeReady ? "RESUME RECEIVED." : "ADD YOUR RESUME."}
                </h2>

                <p className="upload-dossier-muted">
                  {uploading
                    ? "Reading the selected resume. The extracted text will appear here automatically."
                    : resumeReady
                      ? (previewText
                        ? "The extracted resume text is shown below. Review it, then set the target role."
                        : "The file is selected, but no text was returned by the extraction service.")
                      : "Drop a resume into the upload area. The extracted content will appear here before you continue."}
                </p>

                {resumeReady ? (
                  <MiniResumePreview
                    text={previewText}
                    fileName={previewFileName || "resume"}
                    loading={uploading}
                  />
                ) : (
                  <div className="upload-empty-state">
                    <div className="upload-empty-icon">⌁</div>
                    <div className="upload-empty-title">WAITING FOR FILE</div>
                    <div className="upload-empty-copy">
                      PDF, DOCX, or TXT — your extracted resume preview will appear here.
                    </div>
                  </div>
                )}

                {resumeReady && (
                  <button
                    className="upload-next"
                    disabled={!canContinue || uploading}
                    onClick={() => navigate("/target")}
                  >
                    CONTINUE: SET TARGET →
                  </button>
                )}

                {uploading && <div className="upload-loading">EXTRACTING RESUME CONTENT…</div>}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}




