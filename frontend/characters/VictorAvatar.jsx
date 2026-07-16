export default function VictorAvatar({ mood = "neutral" }) {
  const chassisCol   = "#1a1e2e";
  const chassisLight = "#242840";
  const accentCol    = "#1a7aff"; // blue
  const glowCol      = "#40aaff";
  const panelCol     = "#0e1220";
  const ledGreen     = "#00ff88";
  const ledRed       = "#ff3344";
  const ledYellow    = "#ffcc00";

  // Score/status data based on mood
  const getMoodData = () => {
    switch (mood) {
      case "neutral":    return { score: "47%", status: "SCANNING", col: ledYellow };
      case "thinking":   return { score: "61%", status: "ANALYZING", col: glowCol };
      case "smirk":      return { score: "82%", status: "BORDERLINE", col: ledGreen };
      case "dead":       return { score: "11%", status: "TERMINATED", col: ledRed };
      case "sideye":     return { score: "34%", status: "REJECTED", col: ledRed };
      case "facepalm":   return { score: "02%", status: "CRITICAL ERR", col: ledRed };
      case "scoff":      return { score: "29%", status: "FAILED KW", col: ledRed };
      case "eyeroll":    return { score: "44%", status: "BELOW AVG", col: ledYellow };
      case "sigh":       return { score: "53%", status: "PROCESSING", col: ledYellow };
      case "smuggrin":   return { score: "91%", status: "APPROVED", col: ledGreen };
      case "disgusted":  return { score: "18%", status: "NO MATCH", col: ledRed };
      case "victorious": return { score: "99%", status: "TOP MATCH", col: ledGreen };
      default:           return { score: "47%", status: "SCANNING", col: ledYellow };
    }
  };
  const { score, status, col: statusCol } = getMoodData();

  // Robot arms
  const Arms = () => {
    if (mood === "neutral" || mood === "sideye" || mood === "eyeroll" || mood === "scoff" || mood === "disgusted") return (
      <>
        <rect x="18" y="112" width="14" height="50" rx="5" fill={chassisLight}/>
        <rect x="14" y="158" width="18" height="10" rx="4" fill={chassisCol}/>
        <line x1="14" y1="130" x2="18" y2="130" stroke={accentCol} strokeWidth="1.5" opacity="0.7"/>
        <rect x="128" y="112" width="14" height="50" rx="5" fill={chassisLight}/>
        <rect x="128" y="158" width="18" height="10" rx="4" fill={chassisCol}/>
        <line x1="142" y1="130" x2="146" y2="130" stroke={accentCol} strokeWidth="1.5" opacity="0.7"/>
      </>
    );
    if (mood === "thinking" || mood === "sigh") return (
      <>
        <rect x="18" y="112" width="14" height="50" rx="5" fill={chassisLight}/>
        <rect x="14" y="158" width="18" height="10" rx="4" fill={chassisCol}/>
        {/* right arm raised at angle — "computing" */}
        <rect x="128" y="100" width="14" height="42" rx="5" fill={chassisLight} transform="rotate(-20 135 120)"/>
        <rect x="118" y="88" width="18" height="10" rx="4" fill={chassisCol} transform="rotate(-20 127 93)"/>
      </>
    );
    if (mood === "smirk" || mood === "smuggrin" || mood === "victorious") return (
      <>
        {/* both arms slightly raised */}
        <rect x="14" y="102" width="14" height="50" rx="5" fill={chassisLight} transform="rotate(15 21 127)"/>
        <rect x="10" y="148" width="18" height="10" rx="4" fill={chassisCol} transform="rotate(15 19 153)"/>
        <rect x="132" y="102" width="14" height="50" rx="5" fill={chassisLight} transform="rotate(-15 139 127)"/>
        <rect x="132" y="148" width="18" height="10" rx="4" fill={chassisCol} transform="rotate(-15 141 153)"/>
      </>
    );
    if (mood === "dead" || mood === "facepalm") return (
      <>
        <rect x="18" y="112" width="14" height="60" rx="5" fill={chassisLight} opacity="0.6"/>
        <rect x="128" y="112" width="14" height="60" rx="5" fill={chassisLight} opacity="0.6"/>
      </>
    );
    // fallback
    return (
      <>
        <rect x="18" y="112" width="14" height="50" rx="5" fill={chassisLight}/>
        <rect x="128" y="112" width="14" height="50" rx="5" fill={chassisLight}/>
      </>
    );
  };

  // Glowing eye expression
  const Eye = () => {
    const eyeBase = accentCol;
    const eyeGlow = glowCol;

    if (mood === "neutral" || mood === "thinking" || mood === "sigh") return (
      <ellipse cx="80" cy="64" rx="16" ry="10" fill={panelCol} stroke={eyeBase} strokeWidth="2.5"/>
    );
    if (mood === "smirk" || mood === "smuggrin" || mood === "victorious") return (
      // thin horizontal glowing line — "content"
      <rect x="64" y="60" width="32" height="8" rx="4" fill={eyeGlow} opacity="0.9"/>
    );
    if (mood === "dead" || mood === "facepalm") return (
      // cracked / error X
      <>
        <ellipse cx="80" cy="64" rx="16" ry="10" fill={panelCol} stroke={ledRed} strokeWidth="2.5"/>
        <line x1="70" y1="58" x2="90" y2="70" stroke={ledRed} strokeWidth="3" strokeLinecap="round"/>
        <line x1="90" y1="58" x2="70" y2="70" stroke={ledRed} strokeWidth="3" strokeLinecap="round"/>
      </>
    );
    if (mood === "sideye") return (
      // pupil shifted right
      <>
        <ellipse cx="80" cy="64" rx="16" ry="10" fill={panelCol} stroke={eyeBase} strokeWidth="2.5"/>
        <ellipse cx="88" cy="64" rx="7" ry="7" fill={eyeGlow} opacity="0.9"/>
        <ellipse cx="89" cy="62" rx="2" ry="2" fill="white" opacity="0.5"/>
      </>
    );
    if (mood === "scoff" || mood === "disgusted") return (
      // narrow squint
      <>
        <ellipse cx="80" cy="64" rx="16" ry="6" fill={panelCol} stroke={ledRed} strokeWidth="2"/>
        <ellipse cx="80" cy="64" rx="10" ry="4" fill={ledRed} opacity="0.7"/>
      </>
    );
    if (mood === "eyeroll") return (
      // pupil up
      <>
        <ellipse cx="80" cy="64" rx="16" ry="10" fill={panelCol} stroke={eyeBase} strokeWidth="2.5"/>
        <ellipse cx="80" cy="58" rx="7" ry="6" fill={eyeGlow} opacity="0.8"/>
      </>
    );
    // default
    return <ellipse cx="80" cy="64" rx="16" ry="10" fill={panelCol} stroke={eyeBase} strokeWidth="2.5"/>;
  };

  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="shadow-v" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
        </filter>
        <filter id="glow-v" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── ARMS / SIDE PANELS ── */}
      <Arms />

      {/* ── SERVER RACK BODY ── */}
      <rect x="24" y="108" width="112" height="92" rx="6" fill={chassisCol} filter="url(#shadow-v)"/>
      {/* rack unit lines */}
      <line x1="24" y1="122" x2="136" y2="122" stroke={chassisLight} strokeWidth="1.5"/>
      <line x1="24" y1="136" x2="136" y2="136" stroke={chassisLight} strokeWidth="1.5"/>
      <line x1="24" y1="150" x2="136" y2="150" stroke={chassisLight} strokeWidth="1.5"/>
      <line x1="24" y1="164" x2="136" y2="164" stroke={chassisLight} strokeWidth="1.5"/>
      <line x1="24" y1="178" x2="136" y2="178" stroke={chassisLight} strokeWidth="1.5"/>

      {/* ── DATA PANEL — top body unit ── */}
      <rect x="28" y="110" width="104" height="20" rx="2" fill={panelCol}/>
      {/* match % display */}
      <rect x="30" y="112" width="60" height="16" rx="2" fill="#080c14"/>
      <text x="34" y="124" fontFamily="monospace" fontSize="8" fill={statusCol} fontWeight="bold">
        MATCH: {score}
      </text>
      {/* status LEDs */}
      <ellipse cx="102" cy="120" rx="4" ry="4" fill={statusCol} opacity="0.9" filter="url(#glow-v)"/>
      <ellipse cx="112" cy="120" rx="4" ry="4" fill={chassisLight}/>
      <ellipse cx="122" cy="120" rx="4" ry="4" fill={chassisLight}/>
      <ellipse cx="132" cy="120" rx="4" ry="4" fill={chassisLight}/>

      {/* ── KEYWORD SCAN BAR ── */}
      <rect x="28" y="134" width="104" height="14" rx="2" fill={panelCol}/>
      <rect x="30" y="136" width="50" height="10" rx="1" fill="#0a1428"/>
      <text x="34" y="144" fontFamily="monospace" fontSize="7" fill={accentCol} opacity="0.8">
        KW SCAN ▓▓▒░░
      </text>
      {/* scan indicator */}
      <rect x="84" y="136" width="44" height="10" rx="1" fill="#080c14"/>
      <text x="86" y="144" fontFamily="monospace" fontSize="7" fill={statusCol}>
        {status}
      </text>

      {/* ── CONNECTOR PORTS ── */}
      <rect x="28" y="152" width="104" height="10" rx="2" fill={panelCol}/>
      <rect x="32" y="154" width="12" height="6" rx="1" fill={chassisLight}/>
      <rect x="48" y="154" width="12" height="6" rx="1" fill={chassisLight}/>
      <rect x="64" y="154" width="12" height="6" rx="1" fill={chassisLight}/>
      <rect x="80" y="154" width="12" height="6" rx="1" fill={accentCol} opacity="0.5"/>
      <rect x="96" y="154" width="12" height="6" rx="1" fill={chassisLight}/>
      <rect x="112" y="154" width="16" height="6" rx="1" fill={chassisLight}/>

      {/* ── VENT SLOTS ── */}
      {[166, 172, 178, 184, 190].map(y => (
        <rect key={y} x="28" y={y} width="104" height="3" rx="1" fill={panelCol} opacity="0.8"/>
      ))}

      {/* ── NECK / CONNECTOR ── */}
      <rect x="64" y="94" width="32" height="18" rx="4" fill={chassisLight}/>
      {/* screw details */}
      <ellipse cx="70" cy="100" rx="3" ry="3" fill={chassisCol}/>
      <ellipse cx="90" cy="100" rx="3" ry="3" fill={chassisCol}/>
      <line x1="68" y1="100" x2="72" y2="100" stroke={chassisLight} strokeWidth="1"/>
      <line x1="88" y1="100" x2="92" y2="100" stroke={chassisLight} strokeWidth="1"/>

      {/* ── HEAD — rectangular terminal ── */}
      <rect x="36" y="26" width="88" height="72" rx="10" fill={chassisCol} filter="url(#shadow-v)"/>
      {/* inner terminal bezel */}
      <rect x="40" y="30" width="80" height="64" rx="8" fill={panelCol}/>
      {/* terminal scan lines */}
      {[36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88].map(y => (
        <line key={y} x1="40" y1={y} x2="120" y2={y} stroke={chassisLight} strokeWidth="0.5" opacity="0.3"/>
      ))}

      {/* ── GLOWING EYE ── */}
      <Eye />
      {/* glow halo */}
      <ellipse cx="80" cy="64" rx="20" ry="14" fill="none" stroke={glowCol} strokeWidth="1" opacity="0.3"/>

      {/* ── TERMINAL TEXT LINE ── */}
      <rect x="44" y="80" width="72" height="10" rx="2" fill="#080c14"/>
      <text x="47" y="88" fontFamily="monospace" fontSize="6.5" fill={accentCol} opacity="0.9">
        &gt; RESUME_EVAL v4.1
      </text>

      {/* ── ANTENNA / SENSOR ── */}
      <line x1="80" y1="26" x2="80" y2="14" stroke={chassisLight} strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="80" cy="12" rx="5" ry="5" fill={accentCol} filter="url(#glow-v)" opacity="0.9"/>
      <ellipse cx="80" cy="12" rx="2.5" ry="2.5" fill="white" opacity="0.6"/>

      {/* ── CORNER BOLTS ── */}
      <ellipse cx="42" cy="32" rx="2.5" ry="2.5" fill={chassisLight}/>
      <ellipse cx="118" cy="32" rx="2.5" ry="2.5" fill={chassisLight}/>
      <ellipse cx="42" cy="90" rx="2.5" ry="2.5" fill={chassisLight}/>
      <ellipse cx="118" cy="90" rx="2.5" ry="2.5" fill={chassisLight}/>
    </svg>
  );
}