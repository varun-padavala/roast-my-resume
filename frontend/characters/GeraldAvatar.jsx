export default function GeraldAvatar({ mood = "neutral" }) {
  const skinBase = "#c8906a";
  const skinDark  = "#a87050";
  const hairCol   = "#9a9a9a";  // gray
  const suitCol   = "#2c2c3a";
  const suitLight = "#383848";
  const shirtCol  = "#e8e4de";
  const tieCol    = "#8b1a1a";
  const accentCol = "#c8a020"; // gold

  const Arms = () => {
    if (mood === "neutral") return (
      <>
        <path d="M30 115 Q18 135 22 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="163" rx="9" ry="7" fill={skinBase} transform="rotate(-10 22 163)"/>
        <path d="M130 115 Q142 135 138 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="163" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 163)"/>
        {/* gold watch on right wrist */}
        <rect x="130" y="156" width="16" height="7" rx="3" fill={accentCol}/>
        <rect x="132" y="157" width="12" height="5" rx="2" fill="#e8c840"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <path d="M30 115 Q18 140 20 165" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="20" cy="168" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 115 Q148 120 148 100" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <path d="M148 100 Q150 87 140 85" stroke={skinBase} strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="85" rx="10" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <path d="M30 115 Q10 110 -2 105" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <path d="M-2 105 Q-16 103 -20 100" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="-22" cy="99" rx="10" ry="7" fill={skinBase} transform="rotate(-20 -22 99)"/>
        <path d="M130 115 Q142 135 138 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="163" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 163)"/>
      </>
    );
    if (mood === "dead") return (
      <>
        <path d="M30 115 Q15 145 18 175" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="18" cy="178" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 115 Q145 145 142 175" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="142" cy="178" rx="9" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <path d="M30 115 Q18 135 22 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="163" rx="9" ry="7" fill={skinBase} transform="rotate(-10 22 163)"/>
        <path d="M130 115 Q142 135 138 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="163" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 163)"/>
        <rect x="130" y="156" width="16" height="7" rx="3" fill={accentCol}/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <path d="M130 115 Q142 135 138 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="163" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 163)"/>
        <path d="M30 115 Q20 95 30 77" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <path d="M30 77 Q28 67 36 65" stroke={skinBase} strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="44" cy="72" rx="16" ry="11" fill={skinBase}/>
        <line x1="38" y1="66" x2="50" y2="63" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="36" y1="72" x2="51" y2="71" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="37" y1="78" x2="51" y2="79" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <path d="M30 115 Q18 135 22 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="163" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 113 Q148 110 152 103" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <path d="M152 103 Q157 97 153 93" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="152" cy="89" rx="9" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <path d="M30 115 Q18 135 22 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="163" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 115 Q142 135 138 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="163" rx="9" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <path d="M30 117 Q20 130 24 155" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="158" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 117 Q140 130 136 155" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="158" rx="9" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <path d="M130 113 Q145 110 152 100" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="152" cy="97" rx="9" ry="7" fill={skinBase} transform="rotate(25 152 97)"/>
        <path d="M30 115 Q16 125 14 145" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="14" cy="148" rx="9" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <path d="M30 115 Q18 135 22 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="163" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 115 Q142 135 138 160" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="163" rx="9" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <path d="M30 113 Q12 100 8 83" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <path d="M8 83 Q6 71 14 67" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="18" cy="62" rx="10" ry="8" fill={skinBase}/>
        <path d="M130 113 Q148 100 152 83" stroke={suitCol} strokeWidth="20" strokeLinecap="round" fill="none"/>
        <path d="M152 83 Q154 71 146 67" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="142" cy="62" rx="10" ry="8" fill={skinBase}/>
      </>
    );
    return null;
  };

  const Face = () => {
    // Reading glasses — lower on nose
    const ReadingGlasses = () => (
      <>
        <rect x="52" y="66" width="22" height="14" rx="7" fill="none" stroke="#888" strokeWidth="2"/>
        <rect x="86" y="66" width="22" height="14" rx="7" fill="none" stroke="#888" strokeWidth="2"/>
        <line x1="74" y1="73" x2="86" y2="73" stroke="#888" strokeWidth="1.8"/>
        <line x1="52" y1="72" x2="44" y2="70" stroke="#888" strokeWidth="1.8"/>
        <line x1="108" y1="72" x2="116" y2="70" stroke="#888" strokeWidth="1.8"/>
        {/* glass glare */}
        <line x1="55" y1="68" x2="60" y2="68" stroke="white" strokeWidth="1" opacity="0.4"/>
        <line x1="89" y1="68" x2="94" y2="68" stroke="white" strokeWidth="1" opacity="0.4"/>
      </>
    );
    // Mustache
    const Mustache = () => (
      <path d="M70 84 Q75 88 80 86 Q85 88 90 84 Q88 80 80 82 Q72 80 70 84 Z" fill={hairCol}/>
    );

    if (mood === "neutral") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="97" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        {/* bushy brows */}
        <path d="M54 60 Q63 57 72 60" fill={hairCol} opacity="0.8" strokeWidth="4"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <path d="M88 60 Q97 57 106 60" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
      </>
    );
    if (mood === "thinking") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="97" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M70 95 Q80 93 90 95" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="48" cy="52" rx="3" ry="4" fill="#5bc4f5" opacity="0.7"/>
        <path d="M48 48 Q51 44 48 42 Q45 44 48 48" fill="#5bc4f5" opacity="0.7"/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="97" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M68 94 Q74 100 92 94" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "dead") return (
      <>
        <line x1="58" y1="63" x2="68" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="63" x2="58" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="92" y1="63" x2="102" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="102" y1="63" x2="92" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <line x1="68" y1="96" x2="92" y2="96" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="68" rx="5.5" ry="5" fill="#2a2a2a"/>
        <ellipse cx="97" cy="68" rx="5.5" ry="5" fill="#2a2a2a"/>
        <ellipse cx="66" cy="68" rx="2.5" ry="2" fill="white"/>
        <ellipse cx="100" cy="68" rx="2.5" ry="2" fill="white"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M70 95 Q80 95 90 95" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <ellipse cx="63" cy="65" rx="5.5" ry="5" fill="#2a2a2a" opacity="0.5"/>
        <ellipse cx="97" cy="66" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="98.5" cy="64" rx="2" ry="2" fill="white"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M70 95 Q76 92 90 95" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="97" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M54 57 Q63 53 72 57" fill={hairCol} opacity="0.8"/>
        <ellipse cx="63" cy="57" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M68 93 Q74 91 92 95" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="65" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="97" cy="65" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="62" cy="63" rx="2" ry="2.5" fill="white"/>
        <ellipse cx="96" cy="63" rx="2" ry="2.5" fill="white"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M68 95 Q80 95 92 95" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <ReadingGlasses />
        <path d="M57 64 Q63 72 69 64" fill="#2a2a2a"/>
        <path d="M91 64 Q97 72 103 64" fill="#2a2a2a"/>
        <ellipse cx="61" cy="66" rx="2" ry="1.5" fill="white"/>
        <ellipse cx="95" cy="66" rx="2" ry="1.5" fill="white"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M70 97 Q80 93 90 97" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 80 Q33 73 32 65 Q30 57 34 53" fill="none" stroke="#5bc4f5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M34 53 Q36 49 34 46 Q32 49 34 53" fill="#5bc4f5" opacity="0.5"/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="97" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M66 92 Q73 101 94 95" fill="none" stroke={skinDark} strokeWidth="3" strokeLinecap="round"/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="97" cy="68" rx="5.5" ry="6" fill="#2a2a2a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M54 57 Q60 52 72 56" fill={hairCol} opacity="0.9"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M68 93 Q74 99 80 94 Q86 99 92 94" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <ReadingGlasses />
        <ellipse cx="63" cy="68" rx="5.5" ry="7" fill="#2a2a2a"/>
        <ellipse cx="97" cy="68" rx="5.5" ry="7" fill="#2a2a2a"/>
        <ellipse cx="65" cy="65" rx="2.5" ry="2.5" fill="white"/>
        <ellipse cx="99" cy="65" rx="2.5" ry="2.5" fill="white"/>
        <ellipse cx="63" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <ellipse cx="97" cy="59" rx="9" ry="3" fill={hairCol} opacity="0.8"/>
        <Mustache />
        <path d="M64 90 Q72 104 96 92" fill="none" stroke={skinDark} strokeWidth="3.5" strokeLinecap="round"/>
      </>
    );
    return null;
  };

  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="shadow-g" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* ── ARMS ── */}
      <Arms />

      {/* ── BODY — wider, belly ── */}
      <rect x="24" y="112" width="112" height="88" rx="4" fill={suitCol} filter="url(#shadow-g)"/>
      {/* belly bulge */}
      <ellipse cx="80" cy="145" rx="46" ry="28" fill={suitCol}/>
      {/* shirt */}
      <polygon points="80,112 60,200 100,200" fill={shirtCol}/>
      {/* lapels — wider for bigger body */}
      <polygon points="80,112 40,112 52,152" fill={suitLight}/>
      <polygon points="80,112 120,112 108,152" fill={suitLight}/>
      {/* pocket square — gold */}
      <rect x="40" y="122" width="14" height="9" rx="1" fill={accentCol} opacity="0.85"/>
      {/* tie */}
      <polygon points="80,115 74,132 80,200 86,132" fill={tieCol}/>
      <polygon points="74,112 86,112 84,120 76,120" fill="#6a1010"/>
      {/* tie clip — gold */}
      <rect x="75" y="152" width="10" height="4" rx="2" fill={accentCol}/>

      {/* ── NECK ── */}
      <rect x="65" y="96" width="30" height="20" rx="6" fill={skinBase}/>

      {/* ── HEAD — rounder, fuller face ── */}
      <ellipse cx="80" cy="68" rx="40" ry="42" fill={skinBase} filter="url(#shadow-g)"/>
      {/* jowls */}
      <ellipse cx="60" cy="92" rx="12" ry="10" fill={skinBase}/>
      <ellipse cx="100" cy="92" rx="12" ry="10" fill={skinBase}/>

      {/* ── HAIR — gray sides, bald crown ── */}
      {/* bald top with hair ring */}
      <path d="M50 46 Q50 28 80 26 Q110 28 110 46 Q110 36 80 34 Q50 36 50 46 Z" fill={hairCol}/>
      {/* side fringe patches */}
      <rect x="42" y="44" width="11" height="28" rx="5" fill={hairCol}/>
      <rect x="107" y="44" width="11" height="28" rx="5" fill={hairCol}/>
      {/* thin hair wisps over bald dome */}
      <path d="M60 36 Q70 30 80 32 Q90 30 100 36" fill="none" stroke={hairCol} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M64 32 Q80 28 96 32" fill="none" stroke={hairCol} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>

      {/* ── EARS ── */}
      <ellipse cx="42" cy="70" rx="8" ry="10" fill={skinDark}/>
      <ellipse cx="118" cy="70" rx="8" ry="10" fill={skinDark}/>
      <ellipse cx="42" cy="70" rx="5" ry="7" fill={skinBase}/>
      <ellipse cx="118" cy="70" rx="5" ry="7" fill={skinBase}/>

      {/* ── FACE ── */}
      <Face />
    </svg>
  );
}