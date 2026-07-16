import { useState } from "react";
import { useRef } from "react";

const DEMO_ROASTS = {
  margaret: {
    roasts: [
      {
        line: 1,
        sev: "med",
        emoji: "🙂",
        text: "'Future Unicorn Founder' before graduation is wonderfully optimistic. We usually wait until the company exists before assigning it a billion-dollar valuation."
      },
      {
        line: 5,
        sev: "high",
        emoji: "🙄",
        text: "This summary contains an impressive collection of corporate buzzwords. Unfortunately, accomplishments appear to have missed the meeting."
      },
      {
        line: 18,
        sev: "high",
        emoji: "📋",
        text: "'Founder & CEO' certainly sounds impressive until one discovers the executive team consists entirely of yourself."
      }
    ],
    verdict:
      "A confident presentation supported by remarkably little evidence. We'd be delighted to reconsider once the achievements catch up with the titles."
  },

  chad: {
    roasts: [
      {
        line: 13,
        sev: "high",
        emoji: "🚀",
        text: "Task Tracker Pro Max? Bro added 'Pro Max' before adding users. Branding isn't product-market fit."
      },
      {
        line: 20,
        sev: "med",
        emoji: "📈",
        text: "Six pivots with zero customers isn't startup agility. It's commitment issues wearing a hoodie."
      },
      {
        line: 23,
        sev: "low",
        emoji: "😂",
        text: "Five hundred LinkedIn followers? Cool. Wake me up when you've got five hundred active users."
      }
    ],
    verdict:
      "No traction. No revenue. No users. Right now this is a personal branding exercise disguised as a startup."
  },

  victor: {
    roasts: [
      {
        line: 9,
        sev: "high",
        emoji: "⚠️",
        text: "DATA CONFLICT DETECTED. 'React (Learning)' conflicts with advanced technology declarations. Skill confidence recalibrated to 14%."
      },
      {
        line: 18,
        sev: "med",
        emoji: "📊",
        text: "FOUNDER ROLE DETECTED. Employee count: 1. Executive title inflation probability: 98.4%."
      },
      {
        line: 24,
        sev: "low",
        emoji: "📉",
        text: "LEETCODE STREAK BADGE IDENTIFIED. Recruiter relevance coefficient: 0.06. Metric classified as cosmetic."
      }
    ],
    verdict:
      "SCAN COMPLETE. Multiple confidence inconsistencies detected. ATS recommendation: LOW MATCH."
  },

  raven: {
    roasts: [
      {
        line: 8,
        sev: "high",
        emoji: "💀",
        text: "You listed Leadership four times. I assume the first three were hoping to convince the fourth."
      },
      {
        line: 14,
        sev: "high",
        emoji: "😑",
        text: "A React To-Do List isn't a portfolio project anymore. It's the software equivalent of saying water is wet."
      },
      {
        line: 23,
        sev: "med",
        emoji: "😂",
        text: "Five hundred LinkedIn followers isn't influence. That's one mildly successful motivational post."
      }
    ],
    verdict:
      "Lots of confidence, very little proof. I'd interview the resume's marketing team before I'd interview the candidate."
  },

  gerald: {
    roasts: [
      {
        line: 18,
        sev: "med",
        emoji: "☕",
        text: "Back in my day, you became CEO after hiring someone besides yourself."
      },
      {
        line: 9,
        sev: "low",
        emoji: "👴",
        text: "AI. Blockchain. Quantum Computing. Son, that's not a skillset—that's a conference agenda."
      },
      {
        line: 25,
        sev: "med",
        emoji: "📄",
        text: "Participated in twelve hackathons. Finished how many products? That's the number I was looking for."
      }
    ],
    verdict:
      "Plenty of ambition. Needs fewer buzzwords and more things that actually work."
  },

  alexis: {
    roasts: [
      {
        line: 5,
        sev: "high",
        emoji: "☕",
        text: "I've read this exact summary approximately four hundred times. None of those candidates thought it made them memorable either."
      },
      {
        line: 28,
        sev: "med",
        emoji: "🎓",
        text: "First-year undergraduate with the confidence of a departing CTO. The optimism is almost touching."
      },
      {
        line: 13,
        sev: "low",
        emoji: "✨",
        text: "'Pro Max' is doing extraordinary amounts of heavy lifting for what is, at its core, a checklist."
      }
    ],
    verdict:
      "An application built almost entirely on potential. Potential is lovely—results tend to interview better."
  }
};

function ThinkingDots({ color }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, marginLeft: 6, alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          display: "inline-block", width: 4, height: 4, borderRadius: "50%",
          background: color || "rgba(240,237,232,0.5)",
          animation: `thinkDot 1.2s ${i * 0.3}s ease-in-out infinite`,
        }} />
      ))}
    </span>
  );
}

export const DEMO_LINES = [
"JONATHAN 'THE VISIONARY' PARKER",                    //0
"Future Unicorn Founder • AI Evangelist",            //1
"jon.parker@email.com • linkedin.com/in/jonparker",  //2
"",                                                  //3
"PROFESSIONAL SUMMARY",                              //4
"Passionate innovator with a proven ability to leverage disruptive technologies and drive transformational impact across cross-functional ecosystems.", //5
"",                                                  //6
"SKILLS",                                            //7
"Leadership • Leadership • Leadership • Leadership", //8
"React (Learning) • AI • Blockchain • Quantum Computing", //9
"Microsoft Word • PowerPoint • Excel (Basic)",       //10
"",                                                  //11
"PROJECTS",                                          //12
"Task Tracker Pro Max (In Progress)",                //13
"- Built a To-Do List using React",                  //14
"- Added Dark Mode and Local Storage",               //15
"",                                                  //16
"EXPERIENCE",                                        //17
"Founder & CEO — Self (2023–Present)",               //18
"- Managed a team of one (myself)",                  //19
"- Pivoted product idea 6 times",                    //20
"",                                                  //21
"ACHIEVEMENTS",                                      //22
"500+ LinkedIn followers",                           //23
"50-day LeetCode streak badge",                      //24
"Participated in 12 hackathons",                     //25
"",                                                  //26
"EDUCATION",                                         //27
"B.Tech Computer Science (2024–2028)",               //28
];

const ACCENT = {
  margaret: "#00e676",
  chad:     "#ff9500",
  gerald:   "#c4a35a",
  alexis:   "#e040fb",
  victor:   "#5ac8fa",
  raven:    "#ff453a",
};

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

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? `${parseInt(r[1], 16)},${parseInt(r[2], 16)},${parseInt(r[3], 16)}`
    : "255,255,255";
}

export default function DemoRoast() {
  const [activePers, setActivePers] = useState("margaret");
  const [hlLine, setHlLine] = useState(null);
  const [doneLines, setDoneLines] = useState([]);
  const [entries, setEntries] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const feedRef = useRef(null);
  const cancelRef = useRef(false);

  const p = PERSONALITIES.find((x) => x.id === activePers);
  const data = DEMO_ROASTS[activePers];

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function scrollFeed() {
    setTimeout(() => {
      if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }, 50);
  }

  function resetState() {
    cancelRef.current = true;
    setHlLine(null);
    setDoneLines([]);
    setEntries([]);
    setThinking(false);
    setVerdict(null);
    setRunning(false);
    setDone(false);
  }

  function switchPers(id) {
    if (running) return;
    setActivePers(id);
    resetState();
    cancelRef.current = false;
  }

  async function runRoast() {
    if (running) return;
    cancelRef.current = false;
    setRunning(true);
    setDone(false);
    setEntries([]);
    setVerdict(null);
    setHlLine(null);
    setDoneLines([]);

    const localDone = [];

    for (let i = 0; i < data.roasts.length; i++) {
      if (cancelRef.current) return;
      const r = data.roasts[i];
      setHlLine(r.line);
      setThinking(true);
      scrollFeed();
      await sleep(1300);
      if (cancelRef.current) return;

      setThinking(false);
      setEntries((prev) => [...prev, { ...r, text: "", id: Date.now() + i }]);
      scrollFeed();

      for (let j = 1; j <= r.text.length; j++) {
        if (cancelRef.current) return;
        setEntries((prev) =>
          prev.map((e, idx) => (idx === prev.length - 1 ? { ...e, text: r.text.slice(0, j) } : e))
        );
        await sleep(16);
      }

      localDone.push(r.line);
      setDoneLines([...localDone]);
      setHlLine(null);
      scrollFeed();
      await sleep(1400);
    }

    if (cancelRef.current) return;

    setRunning(false);
    let vt = "";
    for (let j = 1; j <= data.verdict.length; j++) {
      if (cancelRef.current) return;
      vt = data.verdict.slice(0, j);
      setVerdict(vt);
      await sleep(20);
    }
    setDone(true);
    scrollFeed();
  }

  const sevColor = (sev) =>
    sev === "high" ? "#ff3b3b" : sev === "med" ? "#ff8c00" : "rgba(255,255,255,0.3)";
  const sevBg = (sev) =>
    sev === "high" ? "rgba(255,59,59,0.08)" : sev === "med" ? "rgba(255,140,0,0.08)" : "rgba(255,255,255,0.03)";

  return (
    <div>
      <style>{`
        .demo-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 6px;
          overflow: hidden;
          height: 340px;
        }
        .demo-resume-panel {
          background: #080808;
          padding: 16px;
          overflow-y: auto;
        }
        .demo-chat-panel {
          background: #060606;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .demo-box {
            grid-template-columns: 1fr;
            height: auto;
          }
          .demo-resume-panel {
            max-height: 220px;
          }
          .demo-chat-panel {
            height: 380px;
          }
          #lp-demo {
          scroll-margin-top: 70px;
          }
        }
      `}</style>

      {/* Personality pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {["margaret", "chad", "victor"].map((id) => {
          const per = PERSONALITIES.find((x) => x.id === id);
          const isActive = id === activePers;
          return (
            <button
              key={id}
              onClick={() => switchPers(id)}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: 9,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "6px 12px", borderRadius: 4, cursor: running ? "not-allowed" : "pointer",
                border: `1px solid ${isActive ? per.accent : "rgba(255,255,255,0.08)"}`,
                background: isActive ? `rgba(${hexToRgb(per.accent)},0.08)` : "transparent",
                color: isActive ? per.accent : "rgba(255,255,255,0.3)",
                transition: "all 0.2s",
              }}
            >
              {per.initials} {per.name}
            </button>
          );
        })}
      </div>

      {/* main demo  */}
      <div className="demo-box">
        {/* Resume panel */}
        <div className="demo-resume-panel">
          {DEMO_LINES.map((line, i) => {
            const isHL = hlLine === i;
            const isDone = !isHL && doneLines.includes(i);
            const isBlurred = running && !isHL && !isDone;
            return (
              <span
                key={i}
                style={{
                  display: "block",
                  fontFamily: "'Space Mono', monospace", fontSize: 10, lineHeight: 1.85,
                  padding: isHL || isDone ? "1px 0 1px 8px" : "1px 0",
                  borderLeft: isHL
                    ? "2px solid #ff8c00"
                    : isDone ? "2px solid rgba(255,140,0,0.25)"
                    : "2px solid transparent",
                  background: isHL ? "rgba(255,140,0,0.07)" : "transparent",
                  color: isHL ? "#f0ede8" : isDone ? "rgba(240,237,232,0.25)" : "rgba(240,237,232,0.35)",
                  filter: isBlurred ? "blur(2px)" : "none",
                  opacity: isBlurred ? 0.3 : 1,
                  transition: "all 0.3s",
                  borderRadius: isHL || isDone ? "0 2px 2px 0" : 0,
                }}
              >
                {line || " "}
              </span>
            );
          })}
        </div>

        {/* Chat panel */}
        <div className="demo-chat-panel">
          {/* Chat header */}
          <div style={{
            padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 3, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Space Mono', monospace", fontSize: 7, fontWeight: 700,
              background: `rgba(${hexToRgb(p.accent)},0.1)`,
              color: p.accent, border: `1px solid ${p.accent}55`,
            }}>
              {p.initials}
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.06em", color: "#f0ede8", lineHeight: 1 }}>
                {p.name}
              </div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: p.accent }}>
                {p.title}
              </div>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: "0.1em", color: running ? p.accent : "rgba(255,255,255,0.2)" }}>
              {running ? "● LIVE" : done ? "CASE CLOSED" : "STANDBY"}
            </div>
          </div>

          {/* Feed */}
          <div ref={feedRef} style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            {entries.length === 0 && !thinking && (
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: 3, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono',monospace", fontSize: 7, fontWeight: 700, background: `rgba(${hexToRgb(p.accent)},0.1)`, color: p.accent, border: `1px solid ${p.accent}55` }}>
                  {p.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: p.accent, marginBottom: 3, fontWeight: 700 }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(240,237,232,0.75)", lineHeight: 1.55, padding: "8px 10px", borderRadius: "0 6px 6px 6px", background: `rgba(${hexToRgb(p.accent)},0.06)`, borderLeft: `2px solid ${p.accent}44` }}>
                    Ready to judge. Hit Execute when you're brave enough.
                  </div>
                </div>
              </div>
            )}

            {thinking && (
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: 3, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono',monospace", fontSize: 7, fontWeight: 700, background: `rgba(${hexToRgb(p.accent)},0.1)`, color: p.accent, border: `1px solid ${p.accent}55` }}>
                  {p.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: p.accent, marginBottom: 3, fontWeight: 700 }}>
                    {p.name} <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 7 }}>is thinking…</span>
                  </div>
                  <div style={{ display: "flex", gap: 3, padding: "8px 10px", borderRadius: "0 6px 6px 6px", background: "rgba(255,255,255,0.03)", alignItems: "center" }}>
                    <ThinkingDots color={p.accent} />
                  </div>
                </div>
              </div>
            )}

            {entries.map((entry, i) => {
              const sc = sevColor(entry.sev);
              const sb = sevBg(entry.sev);
              return (
                <div key={entry.id} style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 3, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono',monospace", fontSize: 7, fontWeight: 700, background: `rgba(${hexToRgb(p.accent)},0.1)`, color: p.accent, border: `1px solid ${p.accent}55` }}>
                    {p.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 3, gap: 6 }}>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: p.accent, fontWeight: 700 }}>{p.name}</span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, letterSpacing: "0.1em", textTransform: "uppercase", padding: "1px 4px", borderRadius: 2, fontWeight: 700, color: sc, background: sb, border: `1px solid ${sc}33` }}>{entry.sev.toUpperCase()}</span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, color: "rgba(255,255,255,0.15)" }}>LINE {entry.line}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(240,237,232,0.75)", lineHeight: 1.55, padding: "8px 10px", borderRadius: "0 6px 6px 6px", background: sb, borderLeft: `2px solid ${sc}55` }}>
                      <span style={{ marginRight: 4 }}>{entry.emoji}</span>
                      {entry.text}
                      {i === entries.length - 1 && running && (
                        <span style={{ display: "inline-block", width: 2, height: 10, background: "rgba(240,237,232,0.4)", marginLeft: 2, verticalAlign: "middle", animation: "pulseGlow 0.8s ease-in-out infinite" }} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {verdict && (
              <div style={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${p.accent}55`, background: `rgba(${hexToRgb(p.accent)},0.05)`, animation: "fadeIn 0.4s ease", marginTop: 4 }}>
                <div style={{ height: 2, background: p.accent }} />
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 7, letterSpacing: "0.18em", textTransform: "uppercase", color: p.accent, marginBottom: 4 }}>// FINAL VERDICT</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.04em", lineHeight: 1.25, color: "#f0ede8" }}>{verdict}</div>
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ padding: "8px 14px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 6, flexShrink: 0 }}>
            {!running && !done && (
              <button
                onClick={runRoast}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: "0.1em", padding: "6px 14px", borderRadius: 4, background: "#f0ede8", color: "#080808", border: "none", cursor: "pointer" }}
              >
                ▶ EXECUTE ROAST
              </button>
            )}
            {running && (
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: "0.1em", padding: "6px 14px", borderRadius: 4, background: "rgba(240,237,232,0.08)", color: "#f0ede8", display: "flex", alignItems: "center", gap: 6 }}>
                ROASTING <ThinkingDots color="#f0ede8" />
              </div>
            )}
            {done && (
              <button
                onClick={() => { resetState(); cancelRef.current = false; }}
                style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: "0.1em", padding: "6px 14px", borderRadius: 4, background: `rgba(${hexToRgb(p.accent)},0.1)`, color: p.accent, border: `1px solid ${p.accent}`, cursor: "pointer" }}
              >
                ↺ ROAST AGAIN
              </button>
            )}
            <button
              onClick={() => { resetState(); cancelRef.current = false; }}
              style={{ fontFamily: "'Space Mono',monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 12px", borderRadius: 4, background: "transparent", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
            >
              ↺ RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
