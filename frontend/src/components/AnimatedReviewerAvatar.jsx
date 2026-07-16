export default function Avatar({ mood = "neutral" }) {
  const skinBase = "#c8906a";
  const skinDark = "#b07a55";
  const hairCol = "#1a1005";
  const suitCol = "#1c1c1c";
  const suitLight = "#262626";
  const shirtCol = "#e8e4de";
  const tieCol = "#b22222";

  const Arms = () => {
    if (mood === "neutral") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(-10 22 158)"/>
        <path d="M130 110 Q142 130 138 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <path d="M30 110 Q18 135 20 160" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="20" cy="163" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 110 Q148 115 148 95" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M148 95 Q150 82 140 80" stroke={skinBase} strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="80" rx="10" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <path d="M30 110 Q10 105 -2 100" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M-2 100 Q-16 98 -20 95" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="-22" cy="94" rx="10" ry="7" fill={skinBase} transform="rotate(-20 -22 94)"/>
        <line x1="-22" y1="94" x2="-38" y2="88" stroke={skinBase} strokeWidth="5" strokeLinecap="round"/>
        <path d="M130 110 Q142 130 138 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "dead") return (
      <>
        <path d="M30 110 Q15 140 18 170" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="18" cy="173" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 110 Q145 140 142 170" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="142" cy="173" rx="9" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(-10 22 158)"/>
        <path d="M130 110 Q142 130 138 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <path d="M130 110 Q142 130 138 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
        <path d="M30 110 Q20 90 30 72" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M30 72 Q28 62 36 60" stroke={skinBase} strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="44" cy="67" rx="16" ry="11" fill={skinBase}/>
        <line x1="38" y1="61" x2="50" y2="58" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="36" y1="67" x2="51" y2="66" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="37" y1="73" x2="51" y2="74" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(-10 22 158)"/>
        <path d="M130 108 Q148 105 152 98" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M152 98 Q157 92 153 88" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="152" cy="84" rx="9" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(-10 22 158)"/>
        <path d="M130 110 Q142 130 138 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <path d="M30 112 Q20 125 24 150" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="153" rx="9" ry="7" fill={skinBase} transform="rotate(-5 24 153)"/>
        <path d="M130 112 Q140 125 136 150" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="153" rx="9" ry="7" fill={skinBase} transform="rotate(5 136 153)"/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <path d="M130 110 Q145 105 152 95" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="152" cy="92" rx="9" ry="7" fill={skinBase} transform="rotate(25 152 92)"/>
        <path d="M30 110 Q16 120 14 140" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="14" cy="143" rx="9" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(-10 22 158)"/>
        <path d="M130 110 Q142 130 138 155" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <path d="M30 108 Q12 95 8 78" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M8 78 Q6 66 14 62" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="18" cy="57" rx="10" ry="8" fill={skinBase}/>
        <line x1="16" y1="50" x2="22" y2="43" stroke={skinBase} strokeWidth="5" strokeLinecap="round"/>
        <path d="M130 108 Q148 95 152 78" stroke={suitCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M152 78 Q154 66 146 62" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="142" cy="57" rx="10" ry="8" fill={skinBase}/>
        <line x1="144" y1="50" x2="138" y2="43" stroke={skinBase} strokeWidth="5" strokeLinecap="round"/>
      </>
    );
    return null;
  };

  const Face = () => {
    if (mood === "neutral") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <line x1="56" y1="56" x2="70" y2="56" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="56" x2="104" y2="56" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M68 83 Q80 87 92 83" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 57 Q63 53 70 56" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M90 56 Q97 57 104 56" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M70 83 Q80 81 90 83" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="48" cy="52" rx="3" ry="4" fill="#5bc4f5" opacity="0.7"/>
        <path d="M48 48 Q51 44 48 42 Q45 44 48 48" fill="#5bc4f5" opacity="0.7"/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 57 Q63 52 70 55" fill="none" stroke={hairCol} strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M90 54 Q97 52 104 56" fill="none" stroke={hairCol} strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M68 82 Q74 88 92 82" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="90" cy="80" rx="6" ry="3" fill={skinDark} opacity="0.3"/>
      </>
    );
    if (mood === "dead") return (
      <>
        <line x1="58" y1="63" x2="68" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="63" x2="58" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="92" y1="63" x2="102" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="102" y1="63" x2="92" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="56" y1="56" x2="70" y2="56" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="90" y1="56" x2="104" y2="56" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="68" y1="84" x2="92" y2="84" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="5" fill="#1a1a1a"/>
        <ellipse cx="66" cy="68" rx="2.5" ry="2" fill="white"/>
        <ellipse cx="100" cy="68" rx="2.5" ry="2" fill="white"/>
        <line x1="56" y1="58" x2="70" y2="60" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <line x1="90" y1="57" x2="104" y2="59" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M70 83 Q80 83 90 83" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <ellipse cx="63" cy="65" rx="6" ry="5" fill="#1a1a1a" opacity="0.5"/>
        <ellipse cx="97" cy="66" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="98.5" cy="64" rx="2" ry="2" fill="white"/>
        <path d="M58 54 Q65 57 70 55" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M90 54 Q97 51 104 54" fill="none" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M70 84 Q76 80 90 84" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 54 Q63 50 70 53" fill="none" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M90 56 Q97 58 104 55" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M68 82 Q74 80 92 84" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <ellipse cx="63" cy="65" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="65" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="62" cy="63" rx="2" ry="2.5" fill="white"/>
        <ellipse cx="96" cy="63" rx="2" ry="2.5" fill="white"/>
        <line x1="56" y1="60" x2="70" y2="58" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="60" x2="104" y2="58" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M68 84 Q80 84 92 84" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <path d="M57 64 Q63 72 69 64" fill="#1a1a1a"/>
        <path d="M91 64 Q97 72 103 64" fill="#1a1a1a"/>
        <ellipse cx="61" cy="66" rx="2" ry="1.5" fill="white"/>
        <ellipse cx="95" cy="66" rx="2" ry="1.5" fill="white"/>
        <line x1="56" y1="57" x2="70" y2="59" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="57" x2="104" y2="59" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M70 86 Q80 82 90 86" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 75 Q33 68 32 60 Q30 52 34 48" fill="none" stroke="#5bc4f5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M34 48 Q36 44 34 41 Q32 44 34 48" fill="#5bc4f5" opacity="0.5"/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 54 Q63 50 70 53" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M90 54 Q97 50 104 54" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M66 80 Q73 89 94 83" fill="none" stroke={skinDark} strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="90" cy="82" rx="6" ry="3.5" fill={skinDark} opacity="0.35"/>
        <ellipse cx="71" cy="82" rx="5" ry="3" fill={skinDark} opacity="0.25"/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 56 Q60 51 70 54" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M90 54 Q100 51 104 56" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M68 81 Q74 87 80 82 Q86 87 92 82" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M76 76 Q80 74 84 76" fill="none" stroke={skinDark} strokeWidth="1.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="7" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="7" fill="#1a1a1a"/>
        <ellipse cx="65" cy="65" rx="2.5" ry="2.5" fill="white"/>
        <ellipse cx="99" cy="65" rx="2.5" ry="2.5" fill="white"/>
        <path d="M55 53 Q63 48 70 52" fill="none" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M90 52 Q97 48 105 53" fill="none" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M64 78 Q72 92 96 80" fill="none" stroke={skinDark} strokeWidth="3.5" strokeLinecap="round"/>
        <ellipse cx="66" cy="83" rx="5" ry="4" fill={skinDark} opacity="0.35"/>
        <ellipse cx="94" cy="83" rx="5" ry="4" fill={skinDark} opacity="0.35"/>
      </>
    );
    if (mood === "blink") return (
  <>
    <line
      x1="58"
      y1="68"
      x2="68"
      y2="68"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <line
      x1="92"
      y1="68"
      x2="102"
      y2="68"
      stroke="#1a1a1a"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <line
      x1="56"
      y1="56"
      x2="70"
      y2="56"
      stroke={hairCol}
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    <line
      x1="90"
      y1="56"
      x2="104"
      y2="56"
      stroke={hairCol}
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    <path
      d="M68 83 Q80 87 92 83"
      fill="none"
      stroke={skinDark}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </>
);
    return null;
  };

  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* ── ARMS ── */}
      <Arms />

      {/* ── BODY ── */}
      <rect x="28" y="108" width="104" height="92" rx="4" fill={suitCol} filter="url(#shadow)"/>
      {/* shirt */}
      <polygon points="80,108 60,200 100,200" fill={shirtCol}/>
      {/* lapels */}
      <polygon points="80,108 42,108 52,145" fill={suitLight}/>
      <polygon points="80,108 118,108 108,145" fill={suitLight}/>
      {/* pocket square */}
      <rect x="42" y="118" width="12" height="8" rx="1" fill={shirtCol} opacity="0.7"/>
      {/* tie */}
      <polygon points="80,112 74,128 80,196 86,128" fill={tieCol}/>
      <polygon points="74,108 86,108 84,116 76,116" fill="#8b1414"/>
      {/* tie clip */}
      <rect x="76" y="148" width="8" height="3" rx="1" fill="#888"/>

      {/* ── NECK ── */}
      <rect x="67" y="92" width="26" height="20" rx="5" fill={skinBase}/>

      {/* ── HEAD ── */}
      <ellipse cx="80" cy="66" rx="38" ry="40" fill={skinBase} filter="url(#shadow)"/>

      {/* ── HAIR ── */}
      <ellipse cx="80" cy="30" rx="38" ry="16" fill={hairCol}/>
      <rect x="42" y="28" width="76" height="14" rx="6" fill={hairCol}/>
      {/* sideburns */}
      <rect x="42" y="42" width="9" height="24" rx="4" fill={hairCol}/>
      <rect x="109" y="42" width="9" height="24" rx="4" fill={hairCol}/>

      {/* ── EARS ── */}
      <ellipse cx="42" cy="68" rx="7" ry="9" fill={skinDark}/>
      <ellipse cx="118" cy="68" rx="7" ry="9" fill={skinDark}/>
      <ellipse cx="42" cy="68" rx="4" ry="6" fill={skinBase}/>
      <ellipse cx="118" cy="68" rx="4" ry="6" fill={skinBase}/>

      {/* ── GLASSES ── */}
      <rect x="52" y="60" width="22" height="16" rx="8" fill="none" stroke="#222" strokeWidth="2.5"/>
      <rect x="86" y="60" width="22" height="16" rx="8" fill="none" stroke="#222" strokeWidth="2.5"/>
      <line x1="74" y1="68" x2="86" y2="68" stroke="#222" strokeWidth="2"/>
      <line x1="52" y1="68" x2="44" y2="66" stroke="#222" strokeWidth="2"/>
      <line x1="108" y1="68" x2="116" y2="66" stroke="#222" strokeWidth="2"/>

      {/* ── FACE ── */}
      <Face />
    </svg>
  );
}

/*
  SUPPORTED MOODS:
  ─────────────────────────────────────────
  "neutral"    — calm, composed
  "thinking"   — hand on chin, sweat drop
  "smirk"      — pointing arm, asymmetric grin
  "dead"       — X eyes, drooping arms
  "sideye"     — pupils shifted right, flat expression
  "facepalm"   — hand over face, one eye visible
  "scoff"      — raised arm, lopsided mouth
  "eyeroll"    — pupils shifted up-left, flat brows
  "sigh"       — droopy eyelids, teardrop wisp
  "smuggrin"   — one arm raised, wide cheek grin
  "disgusted"  — wavy lip curl, furrowed brows
  "victorious" — both arms raised, big open smile
  ─────────────────────────────────────────

  USAGE:
    <Avatar mood="sideye" />
    <Avatar mood="facepalm" />
    <Avatar mood="victorious" />

  SIZING:
    Wrap in a sized container — the SVG fills it via className="w-full h-full"
    Example: <div className="w-32 h-40"><Avatar mood="smirk" /></div>
*/
