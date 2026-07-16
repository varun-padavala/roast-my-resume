import { useNavigate } from "react-router-dom";
import AppNav from "../components/Appnav";
import { useResume } from "../context/ResumeContext";
import { useEffect,useState } from "react";
const CHECKLIST = [
  { label: "PARSING DOCUMENT",    sub: "Reading file structure & encoding" },
  { label: "EXTRACTING CONTENT",  sub: "Pulling text, sections & metadata" },
  { label: "RUNNING ATS SCAN",    sub: "Checking machine-readability & format" },
  { label: "MATCHING KEYWORDS",   sub: "Scoring against role requirements" },
  { label: "MEASURING IMPACT",    sub: "Evaluating achievements & metrics" },
  { label: "COMPILING VERDICT",   sub: "Finalizing your brutal score" },
];
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

export default function Context() {
  const {
    resumeLoaded,jobDesc,setJobDesc,loading,setLoading,setLoadStep,loadStep,loadDone,setLoadDone,resumeText,
selectedRole,
seniority,
set
    } = useResume();
  const navigate = useNavigate();
  const [loadError, setLoadError] = useState(null);
  

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
useEffect(() => {
  if (!resumeLoaded) {
    navigate("/upload");
  }
}, [resumeLoaded]);
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
const handleGetVerdict = async () => {
  setLoading(true);
  setLoadStep(0);
  setLoadError(null);

  const progressTimer = setInterval(() => {
    setLoadStep(prev =>
      prev < CHECKLIST.length - 1 ? prev + 1 : prev
    );
  }, 900);

  try {
    const res = await fetch("http://localhost:3000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, selectedRole, seniority, jobDesc }),
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

        <div className="watermark">CONTEXT</div>

        <AppNav navStep={2} />
        //main content 
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
            {loading && (
  <div style={{
    position:"fixed", inset:0, background:"rgba(8,8,8,0.97)",
    zIndex:90, display:"flex", flexDirection:"column",
    alignItems:"center", justifyContent:"center", padding:24,
    animation:"stepIn 0.3s ease forwards",
  }}>

    <div className="bleed-br" style={{ opacity:0.4 }} />
    <div className="bleed-tl" style={{ opacity:0.4 }} />

    <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:480 }}>
      {loadError ? (
        <div style={{ textAlign:"center" }}>
          <div style={{
            width:56, height:56, borderRadius:"50%", margin:"0 auto 24px",
            background:"rgba(255,59,59,0.1)", border:"1px solid rgba(255,59,59,0.4)",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="#ff3b3b" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <div style={{
            fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:"0.18em",
            color:"rgba(255,59,59,0.6)", textTransform:"uppercase", marginBottom:16,
          }}>
            PROCESSING / FAILED
          </div>

          <h2 style={{
            fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(32px,5vw,48px)",
            lineHeight:0.95, color:"#f0ede8", marginBottom:14,
          }}>
            ANALYSIS FAILED.
          </h2>

          <p style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,0.4)",
            lineHeight:1.6, marginBottom:32, maxWidth:380, marginLeft:"auto", marginRight:"auto",
          }}>
            {loadError}
          </p>

          <div style={{ display:"flex", gap:12 }}>
            <button
              onClick={() => { setLoadError(null); setLoading(false); }}
              style={{
                flex:1, padding:"14px", background:"transparent",
                border:"1px solid rgba(255,255,255,0.15)", borderRadius:4,
                color:"rgba(255,255,255,0.6)", fontFamily:"'Space Mono',monospace",
                fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleGetVerdict}
              style={{
                flex:1, padding:"14px", background:"#f0ede8", border:"none", borderRadius:4,
                color:"#080808", fontFamily:"'Bebas Neue',sans-serif", fontSize:16,
                letterSpacing:"0.08em", cursor:"pointer",
              }}
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:"0.18em",
            color:"rgba(255,255,255,0.2)", textTransform:"uppercase", marginBottom:16 }}>
            PROCESSING / IN PROGRESS
          </div>
          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(40px,6vw,64px)", lineHeight:0.92,
            color:"#f0ede8", marginBottom:36 }}>
            READING YOUR<br /><span className="text-ghost">RESUME.</span>
          </h2>

          <div style={{ border:"1px solid rgba(255,255,255,0.07)", borderRadius:8, overflow:"hidden" }}>
            {CHECKLIST.map((item, i) => {
              const done   = i < loadStep;
              const active = i === loadStep;
              return (
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:14,
                  padding:"14px 20px",
                  borderBottom: i < CHECKLIST.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  background: active ? "rgba(255,255,255,0.04)" : "transparent",
                  transition:"background 0.3s",
                }}>
                  {/* Icon */}
                  <div style={{ width:20, height:20, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {done && (
                      <div className="check-in" style={{ width:20, height:20, borderRadius:"50%",
                        background:"rgba(0,208,132,0.1)", border:"1px solid rgba(0,208,132,0.4)",
                        display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#00d084" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    {active && (
                      <div style={{ width:20, height:20, borderRadius:"50%", border:"1px solid rgba(240,237,232,0.3)",
                        display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:"#f0ede8",
                          animation:"pulse 1s ease-in-out infinite" }} />
                      </div>
                    )}
                    {!done && !active && (
                      <div style={{ width:20, height:20, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.1)" }} />
                    )}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:"0.1em",
                      textTransform:"uppercase",
                      color: done?"rgba(255,255,255,0.3)":active?"#f0ede8":"rgba(255,255,255,0.18)",
                      transition:"color 0.3s" }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, marginTop:2,
                      color: done?"rgba(255,255,255,0.12)":active?"rgba(255,255,255,0.38)":"rgba(255,255,255,0.08)",
                      transition:"color 0.3s" }}>
                      {item.sub}
                    </div>
                  </div>
                  
                  <div style={{ flexShrink:0, minWidth:60, textAlign:"right" }}>
                    {done && <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(0,208,132,0.6)", letterSpacing:"0.06em" }}>DONE</span>}
                    {active && (
                      <div style={{ height:2, width:60, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
                        <div className="scan-bar" style={{ height:"100%", background:"#f0ede8", borderRadius:2 }} />
                      </div>
                    )}
                    {!done && !active && <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.1)" }}>—</span>}
                  </div>
                </div>
              );
            })}
          </div>

          //progress
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:14 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:"0.1em" }}>
              {loadStep} / {CHECKLIST.length} CHECKS
            </span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:"0.1em" }}>
              {Math.round(loadStep/CHECKLIST.length*100)}%
            </span>
          </div>
          <div style={{ height:1, background:"rgba(255,255,255,0.06)", marginTop:6, borderRadius:1, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${loadStep/CHECKLIST.length*100}%`,
              background:"rgba(240,237,232,0.4)", borderRadius:1, transition:"width 0.6s ease" }} />
          </div>
        </>
      )}
    </div>
  </div>
)}

          <div className="step-enter">
            

                  <Eyebrow>03 / JOB CONTEXT</Eyebrow>
                  <BigHeadline>GIVE US THE<br /><Ghost>JOB DESCRIPTION.</Ghost></BigHeadline>
                  <Sub>Paste the JD and we'll score your resume against exact keywords — not generic ones.</Sub>

                  <textarea
                    style={{
                      width:"100%", background:"rgba(255,255,255,0.02)",
                      border:"1px solid rgba(255,255,255,0.08)", borderRadius:5,
                      padding:16, color:"#f0ede8",
                      fontFamily:"'Space Mono',monospace", fontSize:12, lineHeight:1.7,
                      resize:"vertical", minHeight:160, outline:"none",
                      marginBottom:28,
                    }}
                    placeholder={"Paste the job description here...\n\nThe more specific, the more accurate your match score.\nNo JD? We'll use general role standards."}
                    value={jobDesc}
                    onChange={e=>setJobDesc(e.target.value)}
                  />

                  <CtaBtn onClick={handleGetVerdict}>GET MY VERDICT →</CtaBtn>
                  <SkipLink onClick={handleGetVerdict}>skip job description, analyze anyway</SkipLink>
                  <button style={{
                    position:"fixed", bottom:28, left:40, zIndex:20,
                    fontFamily:"'Space Mono',monospace", fontSize:11,
                    color:"rgba(191, 60, 60, 0.2)", letterSpacing:"0.1em",
                    cursor:"pointer", background:"transparent", border:"none",
                    transition:"color 0.15s",
                }} onClick={()=>navigate('/target')}>← BACK</button>
            </div>
        </div>

      </div>
      
    </>
  );
}