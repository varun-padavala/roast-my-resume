import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DemoRoast from "../components/Demo";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
//colors
const ACCENT = {
  margaret: "#00e676",
  chad:     "#ff9500",
  gerald:   "#c4a35a",
  alexis:   "#e040fb",
  victor:   "#5ac8fa",
  raven:    "#ff453a",
};

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,255,255";
}
//avatar personalities
const PERSONALITIES = [
  {
    id: "margaret", name: "Margaret", initials: "MH",
    title: "Sr. HR Director · 22 yrs", accent: ACCENT.margaret,
    desc: "Passive-aggressive corporate sarcasm. Professionally devastating. Sounds disappointed, never angry.",
  },
  {
    id: "chad", name: "Chad", initials: "CK",
    title: "Startup Founder · Seed Stage", accent: ACCENT.chad,
    desc: "Obsessed with scale, growth, ownership. Mocks tiny projects described like billion-dollar startups.",
  },
  {
    id: "gerald", name: "Gerald", initials: "GW",
    title: "VP Operations · 64 yrs", accent: ACCENT.gerald,
    desc: "Boomer executive. Hates buzzwords. Respects measurable results. Everything is compared to 'back in my day.'",
  },
  {
    id: "alexis", name: "Alexis", initials: "AC",
    title: "Elite Talent Partner", accent: ACCENT.alexis,
    desc: "Princeton graduate. Effortlessly condescending. Compares candidates to elite graduates and finds them wanting.",
  },
  {
    id: "victor", name: "Victor", initials: "VS",
    title: "ATS Engine v7.2", accent: ACCENT.victor,
    desc: "Speaks in system logs. Uses percentages, scan reports, anomalies. No emotions. Occasionally sarcastic.",
  },
  {
    id: "raven", name: "Raven", initials: "RV",
    title: "Senior Hiring Manager", accent: ACCENT.raven,
    desc: "Zero patience. Brutally direct. Demands evidence. Mocks vague claims. Ends with a rejection-style verdict.",
  },
];
//subcomponents
function ThinkingDots({ color }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block", width: 4, height: 4, borderRadius: "50%",
            background: color, opacity: 0.5,
            animation: `thinkDot 1.2s ${i * 0.3}s ease-in-out infinite`,
          }}
        />
      ))}
    </span>
  );
}
 
export default function Landing() {
  const navigate = useNavigate();
  const scrollToDemo = () => {
  const demo = document.getElementById("lp-demo");
  if (!demo) return;

  window.scrollTo({
    top: demo.offsetTop - 56,
    behavior: "smooth",
  });
};
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        html, body { overflow-x: hidden; width: 100%; }

        .lp-nav{
    position:fixed;
    top:0;
    left:0;
    right:0;

    height:56px;

    display:flex;
    align-items:center;
    justify-content:space-between;

    padding:0 24px;

    z-index:1000;

    backdrop-filter:blur(18px);
    -webkit-backdrop-filter:blur(18px);

    background:rgba(8,8,8,.45);

    border-bottom:1px solid rgba(255,255,255,.06);
}

          @media (max-width:768px){

            .lp-nav{
              padding:12px 16px;
              flex-wrap:wrap;
            }

            .lp-nav button{
              font-size:12px !important;
              padding:8px 14px !important;
            }

          }

          @media (max-width:420px){
            .lp-nav-badge-text{
              display:none;
            }
          }

        .lp-bleed-tl {
          position: absolute; top: 0; left: 0;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(0,180,100,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .lp-bleed-br {
          position: absolute; bottom: 0; right: 0;
          width: 440px; height: 440px;
          background: radial-gradient(circle, rgba(180,30,30,0.09) 0%, transparent 70%);
          pointer-events: none;
        }

        .lp-h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(56px, 8vw, 96px);
          line-height: 0.92; letter-spacing: -0.01em; color: #f0ede8;
          margin-bottom: 28px;
        }

        .lp-stats-row {
          display: flex; gap: 0;
          border-top: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .lp-stat {
          flex: 1; padding: 20px 28px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .lp-stat:last-child { border-right: none; }
        .lp-stat:first-child { padding-left: 40px; }

        @media (max-width:768px){
          .lp-stats-row{ flex-wrap: wrap; }
          .lp-stat{
            flex: 1 1 50%;
            padding: 16px;
            border-right: 1px solid rgba(255,255,255,0.07);
          }
          .lp-stat:first-child{ padding-left: 16px; }
        }

        .lp-section{
              padding:64px 40px;
              overflow-x: hidden;
          }

          @media(max-width:768px){

          .lp-section{
              padding:48px 20px;
          }

          }
        .lp-section-label {
          font-family: 'Space Mono', monospace; font-size: 9px;
          letter-spacing: 0.2em; color: rgba(255,255,255,0.2);
          text-transform: uppercase; margin-bottom: 12px;
        }
        .lp-section-h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 5vw, 56px);
          letter-spacing: 0.02em; color: #f0ede8;
          line-height: 0.95; margin-bottom: 40px;
        }

        .lp-how-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
        }
        @media (max-width: 768px) { .lp-how-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 420px) { .lp-how-grid { grid-template-columns: 1fr; } }
        .lp-how-step {
          border: 1px solid rgba(255,255,255,0.07); border-radius: 6px;
          padding: 20px; background: rgba(255,255,255,0.012);
          position: relative; overflow: hidden;
        }
        .lp-how-num {
          position: absolute; top: 8px; right: 12px;
          font-family: 'Bebas Neue', sans-serif; font-size: 64px;
          color: rgba(255,255,255,0.05); line-height: 1;
          pointer-events: none;
        }

        .lp-pers-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
        }
        @media (max-width: 900px) { .lp-pers-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .lp-pers-grid { grid-template-columns: 1fr; } }
        .lp-pers-card {
          border: 1px solid rgba(255,255,255,0.07); border-radius: 6px;
          padding: 20px; background: rgba(255,255,255,0.015);
          position: relative; overflow: hidden;
          transition: all 0.2s; cursor: default;
        }
        .lp-pers-card:hover { background: rgba(255,255,255,0.03); transform: translateY(-2px); }
        .lp-pers-watermark {
          position: absolute; bottom: -10px; right: 8px;
          font-family: 'Bebas Neue', sans-serif; font-size: 64px;
          opacity: 0.05; letter-spacing: -0.03em;
          pointer-events: none; user-select: none; line-height: 1;
        }

        .lp-ats-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
        }
        @media (max-width: 768px) { .lp-ats-grid { grid-template-columns: 1fr; gap: 16px; } }
        .lp-ats-card {
          border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;
          padding: 28px; background: rgba(255,255,255,0.015);
          position: relative; overflow: hidden;
        }
        @media (max-width: 480px) { .lp-ats-card { padding: 18px; } }
        .lp-ats-metrics {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px;
        }
        .lp-ats-metric {
          border: 1px solid rgba(255,255,255,0.07); border-radius: 6px;
          padding: 14px; background: rgba(255,255,255,0.01);
        }

        .lp-btn-primary {
          font-family: 'Bebas Neue', sans-serif; font-size: 18px;
          letter-spacing: 0.1em; padding: 12px 28px; border-radius: 4px;
          background: #f0ede8; color: #080808; border: none; cursor: pointer;
          transition: all 0.2s;
        }
        .lp-btn-primary:hover { transform: scale(1.02); }
        .lp-btn-ghost {
          font-family: 'Space Mono', monospace; font-size: 10px;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.35); background: none;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
          padding: 8px 16px; cursor: pointer; transition: all 0.2s;
        }
        .lp-btn-ghost:hover { color: #f0ede8; border-color: rgba(255,255,255,0.3); }
        .lp-btn-outline {
          font-family: 'Bebas Neue', sans-serif; font-size: 18px;
          letter-spacing: 0.1em; padding: 12px 28px; border-radius: 4px;
          background: transparent; color: #f0ede8;
          border: 1px solid rgba(255,255,255,0.2); cursor: pointer;
          transition: all 0.2s;
        }
        .lp-btn-outline:hover { border-color: rgba(255,255,255,0.4); }

        .lp-bar-track {
          height: 3px; background: rgba(255,255,255,0.07);
          border-radius: 2px; margin-top: 10px; overflow: hidden;
        }

        .lp-footer {
          padding: 24px 40px;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .lp-footer { padding: 20px; justify-content: center; text-align: center; }
        }

        @keyframes thinkDot {
          0%, 100% { opacity: 0.15; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(-2px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div>
        
        <Nav></Nav>


        <Hero onTryDemo={scrollToDemo} />

        <section className="lp-section" style={{ paddingTop: 20 }}>
          <p className="lp-section-label">// Meet the panel</p>
          <h2 className="lp-section-h2">PICK YOUR<br />EXECUTIONER.</h2>
          <div className="lp-pers-grid">
            {PERSONALITIES.map((per) => (
              <div className="lp-pers-card" key={per.id}>
                {/* top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: per.accent }} />
                <div className="lp-pers-watermark">{per.name.toUpperCase()}</div>

                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
                  padding: "4px 8px", borderRadius: 3, display: "inline-block",
                  marginBottom: 14, letterSpacing: "0.1em",
                  background: `rgba(${hexToRgb(per.accent)},0.1)`, color: per.accent,
                }}>
                  {per.initials}
                </div>

                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "0.04em", color: "#f0ede8", lineHeight: 1, marginBottom: 4 }}>
                  {per.name}
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: per.accent, marginBottom: 12 }}>
                  {per.title}
                </div>
                <div style={{ fontSize: 12, color: "rgba(240,237,232,0.45)", lineHeight: 1.6 }}>
                  {per.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="lp-demo" className="lp-section" style={{ background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="lp-section-label">// Interactive demo</p>
          <h2 className="lp-section-h2">WATCH IT<br />HAPPEN.</h2>
          <DemoRoast />
        </section>

        
        <section className="lp-section">
          <p className="lp-section-label">// How it works</p>
          <h2 className="lp-section-h2">THE PROCESS IS<br />SIMPLE. THE PAIN<br />IS NOT.</h2>
          <div className="lp-how-grid">
            {[
              { n: "01", icon: "📄", title: "Upload", desc: "Drop your PDF, DOCX, or TXT. We extract every word and run it through the machine." },
              { n: "02", icon: "🎯", title: "Target", desc: "Pick your role and experience level for contextual, relevant scoring." },
              { n: "03", icon: "⚙️", title: "Verdict", desc: "ATS scans, structure scores, and metric breakdowns — instant and unfiltered." },
              { n: "04", icon: "🔥", title: "Roast", desc: "Six personalities tear your resume apart, line by line. No filter. No mercy." },
            ].map((s) => (
              <div className="lp-how-step" key={s.n}>
                <div className="lp-how-num">{s.n}</div>
                <span style={{ fontSize: 22, display: "block", marginBottom: 12 }}>{s.icon}</span>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f0ede8", marginBottom: 8, fontWeight: 700 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "rgba(240,237,232,0.4)", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        
        <section className="lp-section">
          <p className="lp-section-label">// ATS scoring engine</p>
          <h2 className="lp-section-h2">THE MACHINE<br />NEVER LIES.</h2>
          <div className="lp-ats-grid">
            {/* Score card */}
            <div className="lp-ats-card">
              <div style={{ position: "absolute", top: 0, right: 0, width: 3, height: "100%", background: "linear-gradient(to bottom, #ff3b3b80, transparent)" }} />
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#ff3b3b" strokeWidth="6"
                      strokeDasharray="326.7" strokeDashoffset="169.9"
                      strokeLinecap="round" transform="rotate(-90 60 60)" />
                  </svg>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, letterSpacing: "0.04em", color: "#ff3b3b", lineHeight: 1 }}>48</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.14em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>MATCH SCORE</div>
                  </div>
                </div>
              </div>
              <div className="lp-ats-metrics">
                {[
                  { val: 48,  color: "#ff3b3b", label: "ATS" },
                  { val: 100, color: "#00d084", label: "Structure" },
                  { val: 15,  color: "#ff3b3b", label: "Projects" },
                  { val: 100, color: "#00d084", label: "Readability" },
                ].map((m) => (
                  <div className="lp-ats-metric" key={m.label}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, letterSpacing: "0.04em", color: m.color, lineHeight: 1, marginBottom: 2 }}>
                      {m.val}<span style={{ fontSize: 14 }}>%</span>
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>{m.label}</div>
                    <div className="lp-bar-track">
                      <div style={{ height: "100%", width: `${m.val}%`, background: m.color, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: 18, background: "rgba(255,255,255,0.012)", flex: 1 }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00d084", marginBottom: 12 }}>✓ STRENGTHS</p>
                {[
                  "Proven ability to lead and manage teams in fast-paced environments",
                  "Experience executing content strategies across social media platforms",
                  "Clear professional writing and document structure",
                ].map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: "#00d084", fontSize: 11, marginTop: 1, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 12, color: "rgba(240,237,232,0.55)", lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, padding: 18, background: "rgba(255,255,255,0.012)", flex: 1 }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ff3b3b", marginBottom: 12 }}>✗ WEAKNESSES</p>
                {[
                  "Lack of quantifiable achievements and concrete metrics",
                  "Limited technical skills — Microsoft Office only, no Excel depth",
                  "Overemphasis on buzzwords that don't translate to tangible skills",
                ].map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: "#ff3b3b", fontSize: 11, marginTop: 1, flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: 12, color: "rgba(240,237,232,0.55)", lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        
        <section className="lp-section" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <p className="lp-section-label" style={{ marginBottom: 16 }}>// Ready to face judgment?</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 6vw, 72px)", letterSpacing: "0.02em", color: "#f0ede8", lineHeight: 0.95, marginBottom: 24 }}>
              YOUR RESUME<br />DESERVES THE TRUTH.
            </h2>
            <p style={{ fontSize: 15, color: "rgba(240,237,232,0.4)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.65 }}>
              Upload your resume and face six of the most unforgiving critics in the hiring world. PDF, DOCX, or TXT accepted.
            </p>
            <button
              className="lp-btn-primary"
              style={{ fontSize: "clamp(16px, 5vw, 20px)", padding: "clamp(10px, 3vw, 14px) clamp(22px, 8vw, 36px)" }}
              onClick={() => navigate("/upload")}
            >
              Upload Resume →
            </button>
          </div>
        </section>

        
        <footer className="lp-footer">
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.06em", color: "rgba(255,255,255,0.25)" }}>
            RoastMyResume.ai
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.08em", color: "rgba(255,255,255,0.12)" }}>
            © 2026 — ALL VERDICTS FINAL
          </span>
        </footer>

      </div>
    </>
  );
}
