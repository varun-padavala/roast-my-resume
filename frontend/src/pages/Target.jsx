import { useNavigate } from "react-router-dom";
import AppNav from "../components/Appnav";
import { useResume } from "../context/ResumeContext";
import { useEffect,useState } from "react";
const JOB_ROLES = [
  { id: "swe",       label: "Software Engineer",  icon: "💻" },
  { id: "pm",        label: "Product Manager",     icon: "📋" },
  { id: "design",    label: "UX Designer",         icon: "🎨" },
  { id: "data",      label: "Data Scientist",      icon: "📊" },
  { id: "devops",    label: "DevOps / Infra",      icon: "⚙️" },
  { id: "marketing", label: "Marketing",           icon: "📣" },
  { id: "finance",   label: "Finance / Banking",   icon: "💰" },
  { id: "other",     label: "Other",               icon: "✦"  },
];

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

export default function Target() {
  const {
  resumeText,
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
  

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
useEffect(() => {
  if (!restoring && !resumeLoaded) {
    navigate("/upload");
  }
}, [restoring, resumeLoaded, navigate]);
  
function CtaBtn({ children, onClick, disabled }) {
  return (
    <button disabled={disabled} onClick={onClick} style={{
      width:"100%", padding:"18px",
      background: disabled ? "rgba(240,237,232,0.15)" : "#f0ede8",
      color:"#080808", border:"none", borderRadius:4,
      fontFamily:"'Bebas Neue',sans-serif", fontSize:22,
      letterSpacing:"0.1em", cursor: disabled ? "not-allowed" : "pointer",
      transition:"background 0.2s",
    }}>{children}</button>
  );
}
function SkipLink({ children, onClick }) {
  return (
    <div onClick={onClick} style={{
      textAlign:"center", marginTop:12,
      fontFamily:"'Space Mono',monospace", fontSize:11,
      color:"rgba(255,255,255,0.2)", cursor:"pointer",
      letterSpacing:"0.08em",
    }}>{children}</div>
  );
}
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

        .bleed-br {
          position: fixed;
          bottom: -120px; right: -120px;
          width: 500px; height: 500px;
          background: radial-gradient(ellipse at center,
            rgba(255, 59, 59, 0.13) 0%,
            rgba(255, 59, 59, 0.05) 45%,
            transparent 72%
          );
          pointer-events: none; z-index: 0;
          border-radius: 50%;
        }

        .bleed-tl {
          position: fixed;
          top: -140px; left: -140px;
          width: 560px; height: 560px;
          background: radial-gradient(ellipse at center,
            rgba(0, 160, 120, 0.1) 0%,
            rgba(0, 120, 90, 0.04) 45%,
            transparent 72%
          );
          pointer-events: none; z-index: 0;
          border-radius: 50%;
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
        

        {/* Grid overlay */}
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

        <div className="watermark">TARGET</div>

        <AppNav navStep={1} />

        {/* Main content */}
        
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
                  {resumeLoaded && (
                    <div style={{ display:"inline-flex", alignItems:"center", gap:10,
                      background:"rgba(0,208,132,0.06)", border:"1px solid rgba(0,208,132,0.2)",
                      borderRadius:4, padding:"8px 14px", marginBottom:16,
                      fontFamily:"'Space Mono',monospace", fontSize:11, color:"#00d084" }}>
                      ✓ <span style={{ color:"rgba(255,255,255,0.35)" }}>{fileName}</span>
                    </div>
                  )}
                  <Eyebrow>02 / TARGET ROLE</Eyebrow>
                  <BigHeadline>WHAT JOB ARE<br /><Ghost>YOU HUNTING?</Ghost></BigHeadline>
                  <Sub>We'll tune ATS scoring and keyword matching to your exact role.</Sub>

                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:28 }}>
                    {JOB_ROLES.map(r => (
                      <div key={r.id} onClick={()=>setSelectedRole(r.id)} style={{
                        border:`1px solid ${selectedRole===r.id?"rgba(255,255,255,0.45)":"rgba(255,255,255,0.07)"}`,
                        borderRadius:5, padding:"14px 10px", cursor:"pointer",
                        background: selectedRole===r.id?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.02)",
                        textAlign:"center", transition:"all 0.15s",
                      }}>
                        <div style={{ fontSize:22, marginBottom:8 }}>{r.icon}</div>
                        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.06em",
                          textTransform:"uppercase", lineHeight:1.4,
                          color: selectedRole===r.id?"#f0ede8":"rgba(255,255,255,0.38)" }}>
                          {r.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.15em",
                    color:"rgba(255,255,255,0.2)", textTransform:"uppercase", marginBottom:12 }}>SENIORITY LEVEL</div>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:32 }}>
                    {["INTERN","JUNIOR","MID","SENIOR","STAFF / LEAD","MANAGER+"].map(s => (
                      <button key={s} onClick={()=>setSeniority(s)} style={{
                        padding:"14px 24px",
                        border:`1px solid ${seniority===s?"rgba(255,255,255,0.45)":"rgba(255,255,255,0.08)"}`,
                        borderRadius:4, background: seniority===s?"rgba(255,255,255,0.05)":"transparent",
                        fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:"0.08em",
                        textTransform:"uppercase", cursor:"pointer",
                        color: seniority===s?"#f0ede8":"rgba(255,255,255,0.38)",
                        transition:"all 0.15s",
                      }}>{s}</button>
                    ))}
                  </div>

                  <CtaBtn
                    disabled={!canAdvanceStep1}
                    onClick={() => navigate("/context")}
                    >NEXT: ADD CONTEXT →</CtaBtn>
                  <SkipLink onClick={()=>navigate("/context")}>skip this step</SkipLink>
                </div>
        </div>

      </div>
    </>
  );
}
