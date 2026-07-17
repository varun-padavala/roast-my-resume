import { useState, useRef, useEffect, useCallback } from "react";
import AppNav from "../components/Appnav";
import { useLocation, useNavigate } from "react-router-dom";
import RoastNav from "../components/roastnav";
import { PERSONALITIES } from '../data/personalities';
import { IDLE_MESSAGES } from '../data/idleMessages';
import { DEMO_RESUME } from '../data/demoResume';
import { useResume } from "../context/ResumeContext";
import MargaretAvatar from "../../characters/MargaretAvatar";
import VictorAvatar from "../../characters/VictorAvatar";
import AlexisAvatar from "../../characters/AlexisAvatar";
import GeraldAvatar from "../../characters/GeraldAvatar";
import ChadAvatar from "../../characters/ChadAvatar";
import RavenAvatar from "../../characters/RavenAvatar";
import { API_URL } from "../config";
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255,255,255";
}

function ThinkingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 3, marginLeft: 6, alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          display: "inline-block", width: 4, height: 4, borderRadius: "50%",
          background: "rgba(240,237,232,0.5)",
          animation: `thinkDot 1.2s ${i * 0.3}s ease-in-out infinite`,
        }} />
      ))}
    </span>
  );
}

const AVATARS = {
  margaret: MargaretAvatar,
  chad: ChadAvatar,
  gerald: GeraldAvatar,
  alexis: AlexisAvatar,
  victor: VictorAvatar,
  raven: RavenAvatar,
};

const IDLE_MOODS = {
  margaret: ["neutral","thinking","sideye","sigh","eyeroll"],
  chad:     ["neutral","smirk","smuggrin","victorious"],
  gerald:   ["neutral","sigh","eyeroll"],
  alexis:   ["neutral","sideye","disgusted"],
  victor:   ["neutral","thinking","scoff"],
  raven:    ["neutral","sideye","thinking"],
};

const CTRL = { NONE: 0, PAUSE: 1, FINISH: 2 };
//errors
function classifyError(err) {
  const msg = (err?.message || "").toLowerCase();
  if (msg.includes("429") || msg.includes("rate limit") || msg.includes("too many"))
    return { emoji: "🚦", title: "RATE LIMIT HIT", body: "Too many requests — wait a minute and try again." };
  if (msg.includes("401") || msg.includes("403") || msg.includes("unauthorized") || msg.includes("forbidden"))
    return { emoji: "🔑", title: "AUTH ERROR", body: "API key is invalid or missing. Check your server config." };
  if (msg.includes("500") || msg.includes("502") || msg.includes("503") || msg.includes("server"))
    return { emoji: "💀", title: "SERVER ERROR", body: "The roast server is having a moment. Try again shortly." };
  if (msg.includes("networkerror") || msg.includes("failed to fetch") || msg.includes("net::"))
    return { emoji: "📡", title: "NETWORK ERROR", body: "Can't reach the server. Check your connection or that the server is running." };
  if (msg.includes("timeout") || msg.includes("timed out"))
    return { emoji: "⏱️", title: "TIMEOUT", body: "Request took too long. The server may be overloaded." };
  if (msg.includes("no roast data") || msg.includes("parse"))
    return { emoji: "🗑️", title: "BAD RESPONSE", body: "Server returned unexpected data. Try roasting again." };
  return { emoji: "⚠️", title: "UNKNOWN ERROR", body: err?.message || "Something went wrong. Try again." };
}

export default function RoastPage() {
  const {
    setResumeText, setFileName, setResumeLoaded,
    resumeText, resumeLoaded, fileName,
    roastPack, setRoastPack,
  } = useResume();

  const location = useLocation();
  const navigate = useNavigate();
  const navType  = location.state?.navType || "roast";

  const [activePersonality, setActivePersonality] = useState("margaret");
  const [isRoasting,        setIsRoasting]        = useState(false);
  const [isPaused,          setIsPaused]           = useState(false);
  const [highlightedLine,   setHighlightedLine]    = useState(null);
  const [doneLinesSet,      setDoneLinesSet]       = useState(new Set());
  const [roastEntries,      setRoastEntries]       = useState([]);
const [thinking,          setThinking]           = useState(false);
  const [verdict,           setVerdict]            = useState(null);
  const [progressLabel,     setProgressLabel]      = useState("");
  const [roastDone,         setRoastDone]          = useState(false);
  const [moodLabel,         setMoodLabel]          = useState("AWAITING VICTIM");
  const [avatarMood,        setAvatarMood]         = useState("neutral");
  const [idleMessage,       setIdleMessage]        = useState("");
  const [errorInfo,         setErrorInfo]          = useState(null); 
const [roastSpeed,        setRoastSpeed]         = useState(1);   

  const chatFeedRef       = useRef(null);
  const fileInputRef      = useRef(null);
  const seenPersonalities = useRef(new Set());
  
  const savedDoneLines    = useRef({});
  const ctrlRef           = useRef(CTRL.NONE); 
  const roastSpeedRef     = useRef(1);         
  const resumeScrollRef   = useRef(null);      

  useEffect(() => { roastSpeedRef.current = roastSpeed; }, [roastSpeed]);

  useEffect(() => {
    if (highlightedLine == null || !resumeScrollRef.current) return;
    const el = resumeScrollRef.current.querySelector(`[data-line="${highlightedLine}"]`);
    if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [highlightedLine]);

  const p            = PERSONALITIES[activePersonality];
  const ActiveAvatar = AVATARS[activePersonality];
  const resumeLines  = resumeText ? resumeText.split("\n") : [];


  const resumeCompact = resumeLoaded || !!errorInfo;

  // Derive exec button label
  const execLabel = isRoasting ? null
    : roastDone ? "↺ ROAST AGAIN"
    : "▶ EXECUTE ROAST";

  const sleep = useCallback((ms) => new Promise(r => setTimeout(r, ms)), []);

  const sleepInterruptible = useCallback(async (ms) => {
    const step = 50;
    let elapsed = 0;
    while (elapsed < ms) {
      if (ctrlRef.current === CTRL.FINISH) return "finish";
      await new Promise(r => setTimeout(r, step));
      elapsed += step;
    }
    // Handle pause: wait until unpaused or finished
    while (ctrlRef.current === CTRL.PAUSE) {
      await new Promise(r => setTimeout(r, 100));
    }
    if (ctrlRef.current === CTRL.FINISH) return "finish";
    return "ok";
  }, []);

  const scrollChat = () => {
    setTimeout(() => {
      if (chatFeedRef.current)
        chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }, 50);
  };

  //ideal msgs
  useEffect(() => {
    if (resumeLoaded || isRoasting) return;
    const messages = IDLE_MESSAGES[activePersonality];
    setIdleMessage("");
    let index = 0;
    let rotateTimer;
    const startTimer = setTimeout(() => {
      setIdleMessage(messages[index]);
      rotateTimer = setInterval(() => {
        index = (index + 1) % messages.length;
        setIdleMessage(messages[index]);
      }, 15000);
    }, 10000);
    return () => { clearTimeout(startTimer); clearInterval(rotateTimer); };
  }, [activePersonality, resumeLoaded, isRoasting]);


  useEffect(() => {
    if (resumeLoaded || isRoasting) return;
    const moods = IDLE_MOODS[activePersonality] || ["neutral"];
    const timer = setInterval(() => {
      setAvatarMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 6000);
    return () => clearInterval(timer);
  }, [activePersonality, resumeLoaded, isRoasting]);
//hard reset
  function hardReset() {
    ctrlRef.current = CTRL.NONE;
    setResumeText("");
    setFileName("");
    setResumeLoaded(false);
    setRoastPack(null);
    setRoastEntries([]);
    setVerdict(null);
    setRoastDone(false);
    setHighlightedLine(null);
    setDoneLinesSet(new Set());
    setProgressLabel("");
    setAvatarMood("neutral");
    setMoodLabel("AWAITING VICTIM");
    setIdleMessage("");
    setIsPaused(false);
    setErrorInfo(null);
    seenPersonalities.current.clear();
    savedDoneLines.current = {};
  }
//soft reset
  function softReset() {
    ctrlRef.current = CTRL.NONE;
    setRoastEntries([]);
    setVerdict(null);
    setRoastDone(false);
    setHighlightedLine(null);
    setDoneLinesSet(new Set());
    setProgressLabel("");
    setAvatarMood("neutral");
    setMoodLabel("AWAITING VICTIM");
    setIsPaused(false);
    setErrorInfo(null);
  }

  function loadCachedRoast(personalityId) {
    const cached = roastPack?.[personalityId];
    if (!cached) return false;
    setRoastEntries(cached.roasts.map((r, idx) => ({
      ...r, text: r.roast, id: Date.now() + idx,
    })));
    setVerdict(cached.verdict);
    setRoastDone(true);
    setHighlightedLine(null);
    // Restore saved highlighted lines for this personality
    const saved = savedDoneLines.current[personalityId];
    setDoneLinesSet(saved ? new Set(saved) : new Set());
    setProgressLabel("VERDICT");
    setAvatarMood("victorious");
    setMoodLabel("CASE CLOSED");
    setErrorInfo(null);
    return true;
  }

  async function startRoast(forPersonality = activePersonality, forceRefresh = false) {
    if (isRoasting || !resumeLoaded) return;

    ctrlRef.current = CTRL.NONE;
    seenPersonalities.current.add(forPersonality);
    setIsRoasting(true);
    setIsPaused(false);
    setRoastEntries([]);
    setVerdict(null);
    setRoastDone(false);
    setHighlightedLine(null);
    setDoneLinesSet(new Set());
    setThinking(true);
    setAvatarMood("thinking");
    setMoodLabel("PROCESSING...");
    setProgressLabel("ANALYZING");
    setErrorInfo(null);

    const indexedResume = resumeText
      .split("\n")
      .map((line, i) => `[${i}] ${line}`)
      .join("\n");

    try {
      let pack = forceRefresh ? null : roastPack;

      if (!pack) {
    let res;
    try {
      res = await fetch(`${API_URL}/api/roast`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: indexedResume }),
          });
        } catch (networkErr) {
          throw new Error("NetworkError: " + networkErr.message);
        }

        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }

        pack = await res.json();
        setRoastPack(pack);
      }

      const parsed = pack[forPersonality];
      if (!parsed?.roasts?.length) throw new Error(`No roast data for ${forPersonality}`);

      setThinking(false);

      const speedMs = (base) => Math.round(base / roastSpeedRef.current);
      const localDone = new Set();

      for (let i = 0; i < parsed.roasts.length; i++) {
        // Check finish signal
        if (ctrlRef.current === CTRL.FINISH) break;

        const r = parsed.roasts[i];

        setProgressLabel(`ROAST ${i + 1} / ${parsed.roasts.length}`);
        setHighlightedLine(prev => {
          if (prev !== null) {
            localDone.add(prev);
            setDoneLinesSet(new Set(localDone));
          }
          return r.lineIndex;
        });
        setAvatarMood("thinking");
        setMoodLabel("PROCESSING...");
        setThinking(true);
        scrollChat();

        const r1 = await sleepInterruptible(speedMs(1600));
        if (r1 === "finish") break;

        setThinking(false);
        setAvatarMood(r.mood);
        setMoodLabel(r.mood.replace(/([A-Z])/g, " $1").toUpperCase());
        setRoastEntries(prev => [...prev, { ...r, text: "", id: Date.now() + i }]);
        scrollChat();

        if (ctrlRef.current !== CTRL.FINISH) {
          const charDelay = speedMs(20);
          for (let j = 1; j <= r.roast.length; j++) {
            if (ctrlRef.current === CTRL.FINISH) {
              // Instantly complete this entry
              setRoastEntries(prev =>
                prev.map((e, idx) => idx === prev.length - 1 ? { ...e, text: r.roast } : e)
              );
              break;
            }
            // Pause: just wait
            while (ctrlRef.current === CTRL.PAUSE) {
              await new Promise(res => setTimeout(res, 100));
            }
            if (ctrlRef.current === CTRL.FINISH) {
              setRoastEntries(prev =>
                prev.map((e, idx) => idx === prev.length - 1 ? { ...e, text: r.roast } : e)
              );
              break;
            }
            setRoastEntries(prev =>
              prev.map((e, idx) => idx === prev.length - 1 ? { ...e, text: r.roast.slice(0, j) } : e)
            );
            await sleep(charDelay);
          }
        } else {
          setRoastEntries(prev =>
            prev.map((e, idx) => idx === prev.length - 1 ? { ...e, text: r.roast } : e)
          );
        }

        scrollChat();
        const r2 = await sleepInterruptible(speedMs(1800));
        if (r2 === "finish") break;
      }

      //finish
      if (ctrlRef.current === CTRL.FINISH) {
        setRoastEntries(
          parsed.roasts.map((r, idx) => ({ ...r, text: r.roast, id: Date.now() + idx }))
        );
        const allLines = new Set(parsed.roasts.map(r => r.lineIndex));
        setDoneLinesSet(allLines);
        savedDoneLines.current[forPersonality] = allLines;
        setHighlightedLine(null);
      } else {
        setHighlightedLine(prev => {
          if (prev !== null) {
            localDone.add(prev);
            setDoneLinesSet(new Set(localDone));
            savedDoneLines.current[forPersonality] = new Set(localDone);
          }
          return null;
        });
      }

      ctrlRef.current = CTRL.NONE;
      setAvatarMood("victorious");
      setMoodLabel("CASE CLOSED");
      setProgressLabel("VERDICT");
      setThinking(false);
      await sleep(300);

      let vt = "";
      for (let j = 1; j <= parsed.verdict.length; j++) {
        vt = parsed.verdict.slice(0, j);
        setVerdict(vt);
        await sleep(speedMs(24));
      }
      scrollChat();
      setRoastDone(true);
      setIsRoasting(false);
      setIsPaused(false);

    } catch (e) {
      console.error("startRoast error:", e);
      ctrlRef.current = CTRL.NONE;
      setThinking(false);
      setIsRoasting(false);
      setIsPaused(false);
      setAvatarMood("dead");
      setMoodLabel("ERROR");
      const info = classifyError(e);
      setErrorInfo(info);
      scrollChat();
    }
  }
//play and pause
  function togglePause() {
    if (!isRoasting) return;
    if (isPaused) {
      ctrlRef.current = CTRL.NONE;
      setIsPaused(false);
      setMoodLabel("PROCESSING...");
    } else {
      ctrlRef.current = CTRL.PAUSE;
      setIsPaused(true);
      setMoodLabel("PAUSED");
      setAvatarMood("neutral");
    }
  }

  // ── Finish fast ────────────────────────────────────────────────────────────
  function finishFast() {
    if (!isRoasting) return;
    ctrlRef.current = CTRL.FINISH;
    setIsPaused(false);
    setMoodLabel("FINISHING...");
  }

  // ── File upload ────────────────────────────────────────────────────────────
  const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    let res;
    try {
      res = await fetch("http://localhost:3000/api/upload", { method: "POST", body: formData });
    } catch (e) {
      throw new Error("NetworkError: " + e.message);
    }
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      hardReset();
      const data = await uploadResume(file);
      setResumeText(data.resumeText);
      setFileName(data.fileName);
      setResumeLoaded(true);
      e.target.value = "";
    } catch (err) {
      console.error("Upload error:", err);
      const info = classifyError(err);
      setErrorInfo(info);
      scrollChat();
    }
  };

  // ── Exec button ────────────────────────────────────────────────────────────
  function handleExecClick() {
    if (isRoasting || !resumeLoaded) return;
    if (roastDone) {
      seenPersonalities.current.clear();
      savedDoneLines.current = {};
      startRoast(activePersonality, true);
      return;
    }
    startRoast(activePersonality, false);
  }

  // ── Personality switch ─────────────────────────────────────────────────────
  function handlePersonalitySwitch(perId) {
    if (isRoasting) return;
    setActivePersonality(perId);
    setErrorInfo(null);

    const hasCache    = !!roastPack?.[perId];
    const alreadySeen = seenPersonalities.current.has(perId);

    if (hasCache && alreadySeen) {
      
      loadCachedRoast(perId);
      return;
    }

    softReset();
  }

  // ── Speed label ────────────────────────────────────────────────────────────
  const speedLabel = roastSpeed === 0.5 ? "0.5×" : roastSpeed === 1 ? "1×" : roastSpeed === 2 ? "2×" : "5×";
  const SPEEDS = [0.5, 1, 2, 5];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }

        .roast-root {
          height: 100vh;
          height: 100dvh;
          background: #080808;
          color: #f0ede8;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .controls-bar {
          flex-shrink: 0;
          padding: 10px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          background: rgba(8,8,8,0.8);
          z-index: 10;
        }

        .main-body {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 0;
          overflow: hidden;
        }

        .resume-col {
          border-right: 1px solid rgba(255,255,255,0.10);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .resume-col-header {
          flex-shrink: 0;
          padding: 8px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.10);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(8,8,8,0.7);
        }
        .resume-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 20px 28px 32px;
        }

        .reviewer-col {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(6,6,6,0.9);
        }

        .reviewer-header {
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255,255,255,0.11);
          padding: 20px 28px 16px;
          background: rgba(8,8,8,0.95);
          position: relative;
          overflow: hidden;
        }
        .reviewer-header-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 50px;
        }
        .reviewer-info { flex: 1; padding-bottom: 4px; }
        .reviewer-status-row { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; transition: all 0.3s; }

        .avatar-box {
          width: 150px; height: 150px; border-radius: 12px; flex-shrink: 0;
          transition: width 0.2s, height 0.2s;
        }

        .chat-feed {
          flex: 1;
          overflow-y: auto;
          padding: 16px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .chat-bubble {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 0;
          animation: bubbleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .bubble-avatar {
          flex-shrink: 0; width: 28px; height: 28px; border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Bebas Neue', sans-serif; font-size: 11px;
          letter-spacing: 0.04em; margin-top: 2px;
        }
        .bubble-content { flex: 1; min-width: 0; }
        .bubble-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
        .bubble-name { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
        .bubble-line-ref { font-family: 'Space Mono', monospace; font-size: 8px; color: rgba(255,255,255,0.2); letter-spacing: 0.06em; }
        .bubble-severity { font-family: 'Space Mono', monospace; font-size: 7px; letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 5px; border-radius: 2px; font-weight: 700; }
        .bubble-text {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          color: rgba(240,237,232,0.82); line-height: 1.6;
          padding: 10px 14px; border-radius: 0 8px 8px 8px; position: relative;
          word-break: break-word;
        }

        .verdict-card { margin: 12px 0 4px; border-radius: 6px; flex: none; overflow: hidden; animation: bubbleIn 0.5s cubic-bezier(0.16,1,0.3,1); }
        .verdict-bar  { height: 3px; }
        .verdict-inner { padding: 14px 16px; }
        .verdict-label { font-family: 'Space Mono', monospace; font-size: 8px; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 8px; }
        .verdict-text  { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.04em; line-height: 1.25; color: #f0ede8; }

        .typing-indicator { display: flex; gap: 3px; padding: 8px 12px; border-radius: 0 8px 8px 8px; background: rgba(255,255,255,0.04); align-items: center; }

        .r-line {
          display: block; padding: 3px 0; border-left: 2px solid transparent;
          transition: all 0.3s; color: rgba(240,237,232,0.55);
          font-family: 'Space Mono', monospace; font-size: 11px; line-height: 1.85;
          word-break: break-word;
        }
        .r-line.blurred  { filter: blur(2px); opacity: 0.3; }
        .r-line.highlight {
          filter: blur(0) !important;
          border-left: 2px solid #ff8c00;
          padding-left: 12px;
          background: rgba(255,140,0,0.07);
          color: #f0ede8;
          border-radius: 0 3px 3px 0;
        }
        .r-line.done {
          filter: blur(0);
          border-left: 2px solid rgba(255,140,0,0.3);
          padding-left: 12px;
          color: rgba(240,237,232,0.35);
          border-radius: 0 3px 3px 0;
          opacity: 1;
        }

        .pers-pill {
          display: flex; align-items: center; gap: 7px;
          padding: 6px 11px; border-radius: 4px; cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          font-family: 'Space Mono', monospace; font-size: 9px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          position: relative;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .pers-pill:disabled { cursor: not-allowed; }
        .pers-pill:hover:not(:disabled) { background: rgba(255,255,255,0.04); }

        .pers-seen-dot {
          position: absolute; top: -2px; right: -2px;
          width: 6px; height: 6px; border-radius: 50%;
          background: #00d084;
          border: 1px solid #080808;
        }

        .exec-btn {
          padding: 9px 20px; border: none; border-radius: 4px;
          font-family: 'Bebas Neue', sans-serif; font-size: 17px;
          letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 8px; flex-shrink: 0;
          white-space: nowrap;
        }

        .ctrl-btn {
          display: flex; align-items: center; gap: 5px;
          padding: 6px 12px; border-radius: 4px; cursor: pointer;
          transition: all 0.2s;
          font-family: 'Space Mono', monospace; font-size: 9px;
          letter-spacing: 0.1em; text-transform: uppercase;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .new-resume-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 4px; cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.10);
          background: transparent;
          font-family: 'Space Mono', monospace; font-size: 9px;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          flex-shrink: 0;
          white-space: nowrap;
        }
        .new-resume-btn:hover:not(:disabled) {
          border-color: rgba(255,255,255,0.22);
          color: rgba(255,255,255,0.55);
        }
        .new-resume-btn:disabled { cursor: not-allowed; opacity: 0.25; }

        .speed-btn {
          display: flex; align-items: center;
          padding: 5px 9px; border-radius: 4px; cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          font-family: 'Space Mono', monospace; font-size: 9px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.25);
          flex-shrink: 0;
          white-space: nowrap;
        }
        .speed-btn:hover { border-color: rgba(255,255,255,0.18); color: rgba(255,255,255,0.5); }

        .divider { width: 1px; height: 24px; background: rgba(255,255,255,0.08); flex-shrink: 0; }

        .done-ctas {
          margin-top: 12px; padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; gap: 10px; flex-wrap: wrap;
        }

        .error-card {
          margin: 8px 0; border-radius: 6px; overflow: hidden;
          border: 1px solid rgba(255,59,59,0.3);
          background: rgba(255,59,59,0.06);
          animation: bubbleIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .error-bar { height: 2px; background: #ff3b3b; }
        .error-inner { padding: 12px 16px; }
        .error-title {
          font-family: 'Space Mono', monospace; font-size: 8px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #ff3b3b; margin-bottom: 5px; display: flex; align-items: center; gap: 6px;
        }
        .error-body {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: rgba(240,237,232,0.55); line-height: 1.5;
        }

        .empty-state {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: 100%; gap: 8px;
          color: rgba(255,255,255,0.12);
        }

        .accent-strip { position: absolute; top: 0; right: 0; width: 3px; height: 100%; transition: background 0.3s; }
        .rev-watermark {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          font-family: 'Bebas Neue', sans-serif; font-size: 72px;
          color: rgba(255,255,255,0.08); letter-spacing: -0.04em;
          pointer-events: none; user-select: none; line-height: 1;
        }

        @keyframes thinkDot {
          0%, 100% { opacity: 0.15; transform: translateY(0); }
          50%       { opacity: 1;   transform: translateY(-2px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes pausePulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        /* ═══════════════════════════════════════════════════════════
           MOBILE RESPONSIVE OVERRIDES
           Desktop layout above is untouched. Everything in this block
           only applies at ≤860px.
        ═══════════════════════════════════════════════════════════ */
        @media (max-width: 860px) {
          .controls-bar {
            padding: 8px 12px;
            gap: 6px;
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
          }
          .controls-bar::-webkit-scrollbar { display: none; }

          .pers-pill {
            padding: 6px 9px;
            font-size: 8px;
            gap: 5px;
          }
          .pers-pill span:last-child { display: none; } /* hide long name, keep initials badge */

          .exec-btn { font-size: 13px; padding: 8px 14px; }
          .ctrl-btn { padding: 6px 9px; }
          .new-resume-btn span { display: none; }
          .new-resume-btn { padding: 6px 8px; }
          .speed-btn { padding: 5px 7px; }
          .divider { display: none; }

          .controls-bar > span[style*="margin-left"] { display: none; }

          /* Stack resume + reviewer vertically, both always visible.
             Sizing is driven by the .compact class on .resume-col, which
             is toggled purely from roast state (see resumeCompact in JS) —
             no manual expand/collapse, no hidden panels. */
          .main-body {
            display: flex;
            flex-direction: column;
            grid-template-columns: none;
          }

          .resume-col {
            width: 100%;
            flex: 0 0 64vh;
            max-height: 64vh;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.10);
            transition: flex-basis 0.3s ease, max-height 0.3s ease;
          }
          .resume-col.compact {
            flex: 0 0 34vh;
            max-height: 34vh;
          }
          .reviewer-col {
            width: 100%;
            flex: 1;
            min-height: 0;
            min-height: 50vh;
          }

          .resume-col-header { padding: 8px 16px; }
          .resume-scroll { padding: 14px 16px 24px; }

          /* Compact horizontal reviewer header: [avatar] name / title / mood */
          .reviewer-header { padding: 10px 14px; }
          .reviewer-header-inner {
            flex-direction: row;
            align-items: center;
            gap: 12px;
            text-align: left;
          }
          .reviewer-info { text-align: left; width: auto; flex: 1; min-width: 0; padding-bottom: 0; }
          .reviewer-status-row { display: none; }
          .avatar-box {
            width: 72px;
            height: 72px;
            border-radius: 10px;
            flex-shrink: 0;
          }
          .rev-watermark { display: none; }

          .reviewer-name-row { font-size: 20px !important; margin-bottom: 2px !important; line-height: 1.1 !important; }
          .tagline-stroke { display: none; }
          .reviewer-title-row { margin-bottom: 4px !important; }
          .mood-badge { display: inline-flex !important; align-items: center; gap: 6px; }
          .mood-badge::before {
            content: '';
            width: 6px; height: 6px; border-radius: 50%;
            background: currentColor; flex-shrink: 0;
          }

          .chat-feed { padding: 12px 14px 18px; }
          .bubble-text { font-size: 12.5px; padding: 9px 12px; }
          .verdict-text { font-size: 18px; }

          .done-ctas { flex-direction: column; }
          .done-ctas button { width: 100%; text-align: center; }
        }

        @media (max-width: 420px) {
          .avatar-box {
  width: 70px;
  height: 70px;
}
          .exec-btn { font-size: 12px; padding: 7px 12px; }
          .reviewer-name-row { font-size: 17px !important; }
        }
      `}</style>

      <div className="roast-root">

        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,.txt,.pdf"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        {navType === "app"
          ? <AppNav navStep={4} />
          : <RoastNav resumeLoaded={resumeLoaded} onGoHome={() => navigate("/")} name={fileName} />
        }

        {/* ── CONTROLS BAR ── */}
        <div className="controls-bar">

          {Object.values(PERSONALITIES).map(per => {
            const isActive   = activePersonality === per.id;
            const isSeen     = seenPersonalities.current.has(per.id);
            return (
              <button
                key={per.id}
                disabled={isRoasting}
                className="pers-pill"
                onClick={() => handlePersonalitySwitch(per.id)}
                style={{
                  borderColor: isActive ? per.accentColor : undefined,
                  background:  isActive ? `rgba(${hexToRgb(per.accentColor)}, 0.07)` : undefined,
                  color:       isActive ? per.accentColor : undefined,
                }}
              >
                {isSeen && <span className="pers-seen-dot" />}
                <span style={{
                  width: 18, height: 18, borderRadius: 3,
                  background: isActive ? `rgba(${hexToRgb(per.accentColor)}, 0.15)` : "rgba(255,255,255,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Mono', monospace", fontSize: 7,
                  color: isActive ? per.accentColor : "rgba(255,255,255,0.2)",
                  flexShrink: 0,
                }}>
                  {per.initials}
                </span>
                <span>{per.name}</span>
              </button>
            );
          })}

          <div className="divider" />

          {/* Execute / Roast Again */}
          {!isRoasting && (
            <button
              disabled={!resumeLoaded}
              onClick={handleExecClick}
              className="exec-btn"
              style={{
                background: !resumeLoaded ? "rgba(240,237,232,0.06)" : "#f0ede8",
                color:      !resumeLoaded ? "rgba(255,255,255,0.2)"  : "#080808",
                cursor:     !resumeLoaded ? "not-allowed" : "pointer",
              }}
            >
              {execLabel}
            </button>
          )}

          {/* Roasting state controls */}
          {isRoasting && (
            <>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 20px", borderRadius: 4,
                background: isPaused ? "rgba(255,140,0,0.12)" : "rgba(240,237,232,0.08)",
                border: isPaused ? "1px solid rgba(255,140,0,0.3)" : "1px solid rgba(240,237,232,0.12)",
                fontFamily: "'Bebas Neue', sans-serif", fontSize: 17,
                color: isPaused ? "#ff8c00" : "#f0ede8",
                letterSpacing: "0.1em",
                flexShrink: 0, whiteSpace: "nowrap",
              }}>
                <span>{isPaused ? "PAUSED" : "ROASTING"}</span>
                {!isPaused && <ThinkingDots />}
              </div>

              {/* Pause / Resume */}
              <button
                className="ctrl-btn"
                onClick={togglePause}
                style={{
                  border: isPaused
                    ? `1px solid ${p.accentColor}`
                    : "1px solid rgba(255,255,255,0.12)",
                  background: isPaused
                    ? `rgba(${hexToRgb(p.accentColor)}, 0.1)`
                    : "rgba(255,255,255,0.03)",
                  color: isPaused ? p.accentColor : "rgba(255,255,255,0.35)",
                  animation: isPaused ? "pausePulse 1.8s ease-in-out infinite" : "none",
                }}
              >
                {isPaused ? "▶ RESUME" : "⏸ PAUSE"}
              </button>

              {/* Finish Fast */}
              <button
                className="ctrl-btn"
                onClick={finishFast}
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                ⏭ FINISH
              </button>
            </>
          )}

          {/* Speed selector */}
          <button
            className="speed-btn"
            title="Roast speed"
            onClick={() => {
              const idx = SPEEDS.indexOf(roastSpeed);
              setRoastSpeed(SPEEDS[(idx + 1) % SPEEDS.length]);
            }}
          >
            ⚡ {speedLabel}
          </button>

          {/* New Resume */}
          {resumeLoaded && (
            <button
              disabled={isRoasting}
              className="new-resume-btn"
              onClick={() => {
                hardReset();
                setTimeout(() => fileInputRef.current?.click(), 50);
              }}
            >
              ⊕ <span>NEW RESUME</span>
            </button>
          )}

          {progressLabel && (
            <span style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9,
              color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em", marginLeft: "auto",
              flexShrink: 0,
            }}>
              {progressLabel}
            </span>
          )}
        </div>

        {/* ── MAIN BODY ── */}
        <div className="main-body">

          {/* ── LEFT: RESUME ── */}
          <div className={`resume-col ${resumeCompact ? "compact" : ""}`}>
            <div className="resume-col-header">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background:  resumeLoaded ? "#00d084" : "rgba(255,255,255,0.12)",
                  boxShadow:   resumeLoaded ? "0 0 5px #00d084" : "none",
                }} />
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9,
                  letterSpacing: "0.12em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
                }}>
                  {resumeLoaded ? `${fileName} — LOADED` : "NO FILE LOADED"}
                </span>
              </div>
              {resumeLoaded && (
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 8,
                  color: "rgba(255,255,255,0.12)", letterSpacing: "0.08em",
                }}>
                  {resumeLines.length} LINES
                </span>
              )}
            </div>

            <div className="resume-scroll" ref={resumeScrollRef}>
              {!resumeLoaded ? (
                <div
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    height: "100%", gap: 14, cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div style={{
                    position: "relative",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 6, padding: "40px 32px",
                    textAlign: "center", width: "100%", maxWidth: 340,
                    background: "rgba(255,255,255,0.015)",
                  }}>
                    {[
                      { top: -1, left: -1,  borderWidth: "1px 0 0 1px" },
                      { top: -1, right: -1, borderWidth: "1px 1px 0 0" },
                      { bottom: -1, left: -1, borderWidth: "0 0 1px 1px" },
                      { bottom: -1, right: -1, borderWidth: "0 1px 1px 0" },
                    ].map((c, i) => (
                      <div key={i} style={{
                        position: "absolute", width: 12, height: 12,
                        borderColor: "rgba(255,255,255,0.18)", borderStyle: "solid", ...c,
                      }} />
                    ))}
                    <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.25 }}>📄</div>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif", fontSize: 20,
                      letterSpacing: "0.08em", color: "#f0ede8", marginBottom: 6,
                    }}>
                      DRAG &amp; DROP YOUR RESUME
                    </div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 10,
                      color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em",
                    }}>
                      PDF · DOCX · TXT
                    </div>
                  </div>

                  <button
                    style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 10,
                      color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em",
                      textDecoration: "underline", background: "none",
                      border: "none", cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setResumeLoaded(true);
                      setResumeText(DEMO_RESUME.map(l => l.text).join("\n"));
                      setFileName("DEMO_RESUME.TXT");
                      setMoodLabel("AWAITING VICTIM");
                    }}
                  >
                    OR LOAD DEMO RESUME →
                  </button>
                </div>
              ) : (
                <div>
                  {resumeLines.map((line, i) => {
                    const isHL      = highlightedLine === i;
                    const isDone    = !isHL && doneLinesSet.has(i);
                    const isBlurred = isRoasting && !isHL && !isDone;
                    let cls = "r-line";
                    if (isHL)        cls += " highlight";
                    else if (isDone) cls += " done";
                    else if (isBlurred) cls += " blurred";
                    return (
                      <span
                        key={i}
                        className={cls}
                        data-line={i}
                      >
                        {line || " "}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: REVIEWER ── */}
          <div className="reviewer-col">
            <div className="reviewer-header">
              <div className="accent-strip" style={{
                background: `linear-gradient(to bottom, ${p.accentColor}80, transparent)`,
              }} />
              <div className="rev-watermark">{p.name}</div>

              <div className="reviewer-header-inner">
                <div className="avatar-box" style={{
                  background: "rgba(255,255,255,0.015)",
                  border: `1px solid ${p.accentColor}30`,
                }}>
                  <ActiveAvatar mood={avatarMood} />
                </div>

                <div className="reviewer-info">
                  <div className="reviewer-status-row">
                    <div className="status-dot" style={{
                      background: isPaused ? "#ff8c00"
                        : isRoasting ? p.accentColor
                        : "rgba(255,255,255,0.15)",
                      boxShadow: isPaused ? "0 0 6px #ff8c00"
                        : isRoasting ? `0 0 6px ${p.accentColor}`
                        : "none",
                      animation: isRoasting && !isPaused
                        ? "pulseGlow 1.4s ease-in-out infinite"
                        : "none",
                    }} />
                    <span style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 8,
                      color: isPaused ? "#ff8c00"
                        : isRoasting ? p.accentColor
                        : "rgba(255,255,255,0.2)",
                      letterSpacing: "0.1em", transition: "color 0.3s",
                    }}>
                      {isPaused ? "PAUSED" : isRoasting ? "LIVE" : "STANDBY"}
                    </span>
                  </div>

                  <div className="reviewer-name-row" style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(26px, 6vw, 38px)",
                    lineHeight: 0.95, letterSpacing: "-0.01em",
                    color: "#f0ede8", marginBottom: 5,
                  }}>
                    {p.name}
                    <span className="tagline-stroke" style={{
                      color: "transparent",
                      WebkitTextStroke: `1px ${p.accentColor}`,
                      marginLeft: "0.2em", fontSize: "0.55em",
                    }}>
                      {p.id === "victor" ? "HAS METRICS." : "HAS OPINIONS."}
                    </span>
                  </div>

                  <div className="reviewer-title-row" style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 9,
                    color: p.accentColor, letterSpacing: "0.12em",
                    textTransform: "uppercase", marginBottom: 10,
                  }}>
                    {p.title}
                  </div>

                  <div className="mood-badge" style={{
                    display: "inline-block",
                    fontFamily: "'Space Mono', monospace", fontSize: 8,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                    padding: "3px 8px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 3, transition: "all 0.3s",
                    background: `rgba(${hexToRgb(p.accentColor)}, 0.04)`,
                  }}>
                    {moodLabel}
                  </div>
                </div>
              </div>

              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(to right, ${p.accentColor}40, transparent 60%)`,
              }} />
            </div>

            {/* ── CHAT FEED ── */}
            <div className="chat-feed" ref={chatFeedRef}>

              {/* Empty state — no roast yet for this personality */}
              {roastEntries.length === 0 && !thinking && !verdict && !errorInfo && (
                <div className="chat-bubble">
                  <div className="bubble-avatar" style={{
                    border: `1px solid ${p.accentColor}55`,
                    background: `rgba(${hexToRgb(p.accentColor)}, 0.08)`,
                    color: p.accentColor,
                  }}>
                    {p.initials}
                  </div>
                  <div className="bubble-content">
                    <div className="bubble-meta">
                      <span className="bubble-name" style={{ color: p.accentColor }}>{p.name}</span>
                      <span className="bubble-line-ref">WAITING...</span>
                    </div>
                    <div className="bubble-text" style={{
                      background: `rgba(${hexToRgb(p.accentColor)}, 0.06)`,
                      borderLeft: `2px solid ${p.accentColor}55`,
                    }}>
                      {idleMessage || (resumeLoaded
                        ? "Ready to judge. Hit Execute when you're brave enough."
                        : "Upload a resume. I'm running out of patience."
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Roast entries */}
              {roastEntries.map((entry, i) => {
                const severityColor =
                  entry.severity === "high" ? "#ff3b3b"
                  : entry.severity === "med" ? "#ff8c00"
                  : "rgba(255,255,255,0.3)";
                const severityBg =
                  entry.severity === "high" ? "rgba(255,59,59,0.08)"
                  : entry.severity === "med" ? "rgba(255,140,0,0.08)"
                  : "rgba(255,255,255,0.03)";

                return (
                  <div key={entry.id} className="chat-bubble">
                    <div className="bubble-avatar" style={{
                      border: `1px solid ${p.accentColor}55`,
                      background: `rgba(${hexToRgb(p.accentColor)}, 0.08)`,
                      color: p.accentColor,
                    }}>
                      {p.initials}
                    </div>
                    <div className="bubble-content">
                      <div className="bubble-meta">
                        <span className="bubble-name" style={{ color: p.accentColor }}>{p.name}</span>
                        <span className="bubble-line-ref">
                          LINE {entry.lineIndex} — {(resumeLines[entry.lineIndex] || "").substring(0, 28)}…
                        </span>
                        <span className="bubble-severity" style={{
                          color: severityColor, background: severityBg,
                          border: `1px solid ${severityColor}33`,
                        }}>
                          {entry.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="bubble-text" style={{
                        background: severityBg, borderLeft: `2px solid ${severityColor}55`,
                      }}>
                        <span style={{ marginRight: 6 }}>{entry.emoji}</span>
                        {entry.text}
                        {i === roastEntries.length - 1 && !roastDone && !isPaused && (
                          <span style={{
                            display: "inline-block", width: 2, height: 12,
                            background: "rgba(240,237,232,0.45)", marginLeft: 2,
                            verticalAlign: "middle",
                            animation: "pulseGlow 0.8s ease-in-out infinite",
                          }} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Thinking indicator */}
              {thinking && (
                <div className="chat-bubble">
                  <div className="bubble-avatar" style={{
                    border: `1px solid ${p.accentColor}55`,
                    background: `rgba(${hexToRgb(p.accentColor)}, 0.08)`,
                    color: p.accentColor,
                  }}>
                    {p.initials}
                  </div>
                  <div>
                    <div className="bubble-meta">
                      <span className="bubble-name" style={{ color: p.accentColor }}>{p.name}</span>
                      <span className="bubble-line-ref">is thinking…</span>
                    </div>
                    <div className="typing-indicator">
                      {[0,1,2].map(i => (
                        <span key={i} style={{
                          display: "inline-block", width: 5, height: 5, borderRadius: "50%",
                          background: p.accentColor, opacity: 0.5,
                          animation: `thinkDot 1.2s ${i * 0.3}s ease-in-out infinite`,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Verdict */}
              {verdict && (
                <div className="verdict-card" style={{
                  border: `1px solid ${p.accentColor}55`,
                  background: `rgba(${hexToRgb(p.accentColor)}, 0.05)`,
                }}>
                  <div className="verdict-bar" style={{ background: p.accentColor }} />
                  <div className="verdict-inner">
                    <div className="verdict-label" style={{ color: p.accentColor }}>// FINAL VERDICT</div>
                    <div className="verdict-text">{verdict}</div>
                  </div>
                </div>
              )}

              {/* Error card */}
              {errorInfo && (
                <div className="error-card">
                  <div className="error-bar" />
                  <div className="error-inner">
                    <div className="error-title">
                      <span>{errorInfo.emoji}</span>
                      {errorInfo.title}
                    </div>
                    <div className="error-body">{errorInfo.body}</div>
                  </div>
                </div>
              )}

              {/* Done CTAs */}
              {roastDone && (
                <div className="done-ctas">
                  <button
                    onClick={() => {
                      seenPersonalities.current.clear();
                      savedDoneLines.current = {};
                      startRoast(activePersonality, true);
                    }}
                    style={{
                      padding: "9px 16px",
                      border: `1px solid ${p.accentColor}`,
                      borderRadius: 4,
                      background: `rgba(${hexToRgb(p.accentColor)}, 0.08)`,
                      fontFamily: "'Space Mono', monospace", fontSize: 10,
                      letterSpacing: "0.1em", color: p.accentColor,
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    ↺ ROAST AGAIN
                  </button>
                  <button
                    onClick={() => {
                      // Switch to next unseen personality automatically
                      const all = Object.keys(PERSONALITIES);
                      const unseen = all.find(id => !seenPersonalities.current.has(id) && id !== activePersonality);
                      if (unseen) handlePersonalitySwitch(unseen);
                    }}
                    style={{
                      padding: "9px 16px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.03)",
                      fontFamily: "'Space Mono', monospace", fontSize: 10,
                      letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    → NEXT REVIEWER
                  </button>
                </div>
              )}

              <div style={{ height: 8 }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}