import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { useState, useCallback, useRef } from "react";
import { DEMO_RESUME } from "../data/demoResume";
import AppNav from "../components/Appnav";
import { useEffect } from "react";


function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: "0.15em",
      color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 14
    }}>
      {children}
    </div>
  );
}

function BigHeadline({ children }) {
  return (
    <h1 style={{
      fontFamily: "'Bebas Neue',sans-serif",
      fontSize: "clamp(64px,9vw,110px)", lineHeight: 0.95,
      letterSpacing: "-0.01em", color: "#f0ede8", marginBottom: 18
    }}>
      {children}
    </h1>
  );
}

function Sub({ children }) {
  return (
    <p style={{
      fontSize: 14, color: "rgba(255,255,255,0.3)", lineHeight: 1.65,
      marginBottom: 32, fontFamily: "'DM Sans',sans-serif", maxWidth: 480
    }}>
      {children}
    </p>
  );
}

function Ghost({ children }) {
  return <span style={{ color: "transparent", WebkitTextStroke: "1.5px #f0ede8" }}>{children}</span>;
}

export default function Upload() {
    
  const navigate = useNavigate();
  const {
    setResumeText,
    setFileName,
    setResumeLoaded,
    resumeText,
    resumeLoaded,
    fileName,
  } = useResume();

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (!f) return;
    await uploadResumeFile(f);
  }, []);

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    await uploadResumeFile(f);
  };
    const uploadResumeFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch(
      "http://localhost:3000/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    setResumeText(data.resumeText);
    setFileName(data.fileName);
    setResumeLoaded(true);

    setFile(file);
    navigate('/target')

  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
        html, body, #root {
            height: 100%;
            overflow-x: hidden;
            scroll-behavior: auto;
            }
        .bg-root {
          min-height: 100vh;
          background: #080808;
          color: #f0ede8;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          isolation: isolate;
          overflow-x: hidden;
      }
        .watermark {
          position: fixed;
          top: 120px;
          right: 120px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(180px, 18vw, 320px);
          font-weight: 900;
          color: rgba(255,255,255,0.04);
          letter-spacing: -0.04em;
          white-space: nowrap;
          text-align: right;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        @media (max-width: 768px) {
        .watermark {
            position: fixed;
            top: 320px;
            left: 50%;
            right: auto;
            transform: translateX(-50%);
            font-size: clamp(120px, 35vw, 180px);
            color: rgba(255,255,255,0.08);   /* doubled opacity */
            z-index: 0;
            white-space: nowrap;
          }
        }

        .step-enter {
          animation: stepIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes stepIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @keyframes checkIn {
          from { opacity:0; transform:translateX(-10px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .check-in { animation: checkIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes scanLine {
          0%        { transform:scaleX(0); transform-origin:left; }
          50%       { transform:scaleX(1); transform-origin:left; }
          50.001%   { transform-origin:right; }
          100%      { transform:scaleX(0); transform-origin:right; }
        }
        .scan-bar { animation: scanLine 1.2s ease-in-out infinite; }

        .text-ghost { color:transparent; -webkit-text-stroke:1.5px #f0ede8; }

        .corner { position:absolute; width:14px; height:14px; border-color:rgba(255,255,255,0.2); border-style:solid; }
        .corner-tl { top:-1px; left:-1px;    border-width:1px 0 0 1px; }
        .corner-tr { top:-1px; right:-1px;   border-width:1px 1px 0 0; }
        .corner-bl { bottom:-1px; left:-1px;  border-width:0 0 1px 1px; }
        .corner-br { bottom:-1px; right:-1px; border-width:0 1px 1px 0; }

        .atab {
          font-family: 'Space Mono', monospace;
          font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
          background: transparent; border: none;
          padding: 12px 0; cursor: pointer;
          position: relative; color: rgba(255,255,255,0.25);
          transition: color 0.2s;
        }
        .atab::after {
          content:''; position:absolute; bottom:0; left:0; right:0;
          height:1px; background:#f0ede8;
          transform:scaleX(0); transition:transform 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .atab.on { color:#f0ede8; }
        .atab.on::after { transform:scaleX(1); }
        .atab:hover { color:rgba(255,255,255,0.6); }

        .tab-fade {
          animation: tabIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes tabIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#080808; }
        ::-webkit-scrollbar-thumb { background:#222; border-radius:2px; }
      `}</style>

      <div className="bg-root">

        <div className="bleed-br" />
        <div className="bleed-tl" />
        
        <div style={{
          position: "fixed",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 0,
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />

        <div className="watermark">UPLOAD</div>

        <AppNav navStep={0} />
        
        <div style={{
          maxWidth: 1400,
          margin: "0 auto",
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 48,
          paddingBottom:40,
          position: "relative",
          zIndex: 2,
        }}>
          <button
  onClick={() => navigate(-1)}
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,.45)",
    cursor: "pointer",
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    letterSpacing: ".08em",
    textTransform: "uppercase",
    marginBottom: 24,
    transition: ".2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.color = "#f0ede8";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.color = "rgba(255,255,255,.45)";
  }}
>
  ← Back
</button>
          <div className="step-enter">
            <Eyebrow>01 / UPLOAD RESUME</Eyebrow>
            <BigHeadline>
              DROP IT.<br />
              <Ghost>WE'LL HANDLE</Ghost><br />
              THE REST.
            </BigHeadline>
            <Sub>PDF, DOCX, or TXT. We'll extract every word and run it through the machine.</Sub>

            <div
              style={{
                position: "relative",
                border: `1px solid ${dragging ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 6,
                padding: "100px 40px",
                textAlign: "center",
                cursor: "pointer",
                background: dragging ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                transition: "all 0.2s",
              }}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
            >
              
              <div className="corner corner-bl" />
              <div className="corner corner-br" />

              <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.35 }}>📄</div>
              <div style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 26,
                letterSpacing: "0.08em", color: "#f0ede8", marginBottom: 8,
              }}>
                {dragging ? "RELEASE TO UPLOAD" : "DRAG & DROP YOUR RESUME"}
              </div>
              <div style={{
                fontFamily: "'Space Mono',monospace", fontSize: 11,
                color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                or click to browse — PDF, DOCX, TXT
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.txt"
                style={{ display: "none" }}
                onChange={handleFile}
              />
            </div>

            <div style={{ marginTop: 20, textAlign: "center" }}>
              <span style={{
                fontFamily: "'Space Mono',monospace", fontSize: 11,
                color: "rgba(255,255,255,0.18)", letterSpacing: "0.08em",
              }}>— or —</span>
            </div>

            <button
              style={{
                width: "100%", marginTop: 14, padding: "14px",
                background: "transparent", color: "rgba(255,255,255,0.35)",
                border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4,
                fontFamily: "'Space Mono',monospace", fontSize: 11,
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.15s",
              }}
              onClick={() => {
                const demoText = DEMO_RESUME.map(item => item.text).join("\n");
                setResumeText(demoText);
                setFileName("demo-resume.txt");
                setResumeLoaded(true);
                setFile({ name: "demo-resume.txt" });
                navigate('/target');
              }}
            >
              USE DEMO RESUME INSTEAD →
            </button>
          </div>
        </div>

      </div>
    </>
  );
}