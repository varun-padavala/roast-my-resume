export default function RavenAvatar({ mood = "neutral" }) {
  const skinBase = "#8a6a5a";
  const skinDark  = "#6a4a3a";
  const hairCol   = "#0a0a0a";
  const outfitCol   = "#111118";
  const outfitLight = "#1a1a22";
  const accentCol   = "#7a2aaa"; // purple

  const Arms = () => {
    // Signature arms-crossed posture for neutral/sideye
    const ArmsCrossed = () => (
      <>
        {/* left arm crosses over right */}
        <path d="M32 112 Q50 118 74 118" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="74" cy="118" rx="8" ry="7" fill={skinBase}/>
        {/* right arm crosses under left */}
        <path d="M128 112 Q110 120 86 120" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="86" cy="120" rx="8" ry="7" fill={skinBase}/>
      </>
    );

    if (mood === "neutral") return <ArmsCrossed />;
    if (mood === "sideye")  return <ArmsCrossed />;
    if (mood === "scoff")   return <ArmsCrossed />;
    if (mood === "disgusted") return <ArmsCrossed />;
    if (mood === "eyeroll") return <ArmsCrossed />;

    if (mood === "thinking") return (
      <>
        <path d="M32 112 Q20 135 22 160" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="22" cy="163" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 112 Q146 117 146 97" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M146 97 Q148 84 138 82" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="134" cy="82" rx="10" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <path d="M32 112 Q20 130 24 155" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="158" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 110 Q146 107 150 100" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M150 100 Q155 94 151 90" stroke={skinBase} strokeWidth="11" strokeLinecap="round" fill="none"/>
        <ellipse cx="150" cy="86" rx="9" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "dead") return (
      <>
        <path d="M32 112 Q18 142 20 172" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="20" cy="175" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 112 Q142 142 140 172" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="140" cy="175" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <path d="M128 112 Q138 130 136 155" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="158" rx="8" ry="7" fill={skinBase}/>
        <path d="M32 112 Q22 94 30 76" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M30 76 Q28 66 36 64" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="44" cy="70" rx="15" ry="10" fill={skinBase}/>
        <line x1="38" y1="64" x2="50" y2="61" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="36" y1="70" x2="51" y2="69" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <path d="M32 114 Q22 126 24 152" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="155" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 114 Q138 126 136 152" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="155" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <path d="M128 110 Q146 103 150 92" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="150" cy="89" rx="9" ry="7" fill={skinBase} transform="rotate(25 150 89)"/>
        <path d="M32 112 Q18 122 16 142" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="16" cy="145" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <path d="M32 110 Q14 97 10 80" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M10 80 Q8 68 16 64" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="20" cy="59" rx="10" ry="8" fill={skinBase}/>
        <path d="M128 110 Q146 97 150 80" stroke={outfitCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M150 80 Q152 68 144 64" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="140" cy="59" rx="10" ry="8" fill={skinBase}/>
      </>
    );
    return null;
  };

  const Face = () => {
    if (mood === "neutral") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="97" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        {/* flat tired brows */}
        <line x1="56" y1="58" x2="70" y2="59" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <line x1="90" y1="59" x2="104" y2="58" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        {/* flat unimpressed line mouth */}
        <path d="M70 84 Q80 84 90 84" fill="none" stroke={skinDark} strokeWidth="2.2" strokeLinecap="round"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="97" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 57 Q63 53 70 56" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M90 56 Q97 57 104 56" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M70 84 Q80 82 90 84" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="48" cy="52" rx="3" ry="4" fill="#5bc4f5" opacity="0.7"/>
        <path d="M48 48 Q51 44 48 42 Q45 44 48 48" fill="#5bc4f5" opacity="0.7"/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="97" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 57 Q63 52 70 55" fill="none" stroke={hairCol} strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M90 54 Q97 52 104 56" fill="none" stroke={hairCol} strokeWidth="2.8" strokeLinecap="round"/>
        <path d="M68 82 Q74 88 92 82" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "dead") return (
      <>
        <line x1="58" y1="63" x2="68" y2="73" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="63" x2="58" y2="73" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="92" y1="63" x2="102" y2="73" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="102" y1="63" x2="92" y2="73" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="56" y1="57" x2="70" y2="58" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="90" y1="58" x2="104" y2="57" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="68" y1="84" x2="92" y2="84" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="5" fill="#0a0a0a"/>
        <ellipse cx="97" cy="68" rx="6" ry="5" fill="#0a0a0a"/>
        <ellipse cx="66" cy="68" rx="2.5" ry="2" fill="white"/>
        <ellipse cx="100" cy="68" rx="2.5" ry="2" fill="white"/>
        {/* heavy lidded side-eye */}
        <path d="M56 62 Q63 60 70 62" fill={hairCol} opacity="0.5"/>
        <path d="M90 62 Q97 60 104 62" fill={hairCol} opacity="0.5"/>
        <line x1="56" y1="59" x2="70" y2="60" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="90" y1="60" x2="104" y2="59" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M70 84 Q80 84 90 84" fill="none" stroke={skinDark} strokeWidth="2.2" strokeLinecap="round"/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <ellipse cx="63" cy="65" rx="6" ry="5" fill="#0a0a0a" opacity="0.5"/>
        <ellipse cx="97" cy="66" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="98.5" cy="64" rx="2" ry="2" fill="white"/>
        <line x1="90" y1="60" x2="104" y2="59" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M70 83 Q76 80 90 83" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="97" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 57 Q63 53 70 56" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="90" y1="58" x2="104" y2="57" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M68 82 Q74 80 92 84" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <ellipse cx="63" cy="65" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="97" cy="65" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="62" cy="63" rx="2" ry="2.5" fill="white"/>
        <ellipse cx="96" cy="63" rx="2" ry="2.5" fill="white"/>
        <line x1="56" y1="59" x2="70" y2="59" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <line x1="90" y1="59" x2="104" y2="59" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M68 84 Q80 84 92 84" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <path d="M57 64 Q63 72 69 64" fill="#0a0a0a"/>
        <path d="M91 64 Q97 72 103 64" fill="#0a0a0a"/>
        <ellipse cx="61" cy="66" rx="2" ry="1.5" fill="white"/>
        <ellipse cx="95" cy="66" rx="2" ry="1.5" fill="white"/>
        <line x1="56" y1="58" x2="70" y2="60" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <line x1="90" y1="60" x2="104" y2="58" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M70 86 Q80 82 90 86" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 75 Q33 68 32 60 Q30 52 34 48" fill="none" stroke="#5bc4f5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M34 48 Q36 44 34 41 Q32 44 34 48" fill="#5bc4f5" opacity="0.5"/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="97" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 54 Q63 50 70 53" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M90 54 Q97 50 104 54" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M66 80 Q73 89 94 83" fill="none" stroke={skinDark} strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="90" cy="82" rx="5" ry="3.5" fill={skinDark} opacity="0.35"/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="97" cy="68" rx="6" ry="5.5" fill="#0a0a0a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 56 Q60 51 70 54" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M90 54 Q100 51 104 56" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M68 81 Q74 87 80 82 Q86 87 92 82" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <ellipse cx="63" cy="68" rx="6" ry="7" fill="#0a0a0a"/>
        <ellipse cx="97" cy="68" rx="6" ry="7" fill="#0a0a0a"/>
        <ellipse cx="65" cy="65" rx="2.5" ry="2.5" fill="white"/>
        <ellipse cx="99" cy="65" rx="2.5" ry="2.5" fill="white"/>
        <path d="M55 53 Q63 48 70 52" fill="none" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M90 52 Q97 48 105 53" fill="none" stroke={hairCol} strokeWidth="3" strokeLinecap="round"/>
        <path d="M64 78 Q72 92 96 80" fill="none" stroke={skinDark} strokeWidth="3.5" strokeLinecap="round"/>
      </>
    );
    return null;
  };

  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="shadow-r" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* ── ARMS ── */}
      <Arms />

      {/* ── BODY — dark minimal outfit ── */}
      <rect x="28" y="108" width="104" height="92" rx="4" fill={outfitCol} filter="url(#shadow-r)"/>
      {/* purple detail stripe down lapel */}
      <polygon points="80,108 44,108 54,150" fill={outfitLight}/>
      <polygon points="80,108 116,108 106,150" fill={outfitLight}/>
      {/* thin purple accent line on left lapel */}
      <line x1="54" y1="112" x2="48" y2="140" stroke={accentCol} strokeWidth="2.5" strokeLinecap="round" opacity="0.8"/>
      {/* subtle collar */}
      <rect x="64" y="106" width="32" height="10" rx="4" fill={outfitLight}/>
      {/* small purple pin */}
      <ellipse cx="52" cy="126" rx="4" ry="4" fill={accentCol}/>
      <ellipse cx="52" cy="126" rx="2" ry="2" fill="#cc88ff"/>

      {/* ── NECK ── */}
      <rect x="68" y="92" width="24" height="20" rx="5" fill={skinBase}/>

      {/* ── HEAD — angular, sharp ── */}
      <path d="M46 68 Q46 30 80 26 Q114 30 114 68 Q114 92 100 100 Q80 108 60 100 Q46 92 46 68 Z" fill={skinBase} filter="url(#shadow-r)"/>

      {/* ── HAIR — long straight dark ── */}
      {/* top */}
      <ellipse cx="80" cy="28" rx="34" ry="14" fill={hairCol}/>
      <rect x="46" y="26" width="68" height="16" rx="4" fill={hairCol}/>
      {/* side — falls straight down to shoulders */}
      <rect x="46" y="40" width="11" height="62" rx="5" fill={hairCol}/>
      <rect x="103" y="40" width="11" height="62" rx="5" fill={hairCol}/>
      {/* side curtains past ears */}
      <path d="M46 78 Q40 85 42 102 Q46 110 52 112" fill={hairCol}/>
      <path d="M114 78 Q120 85 118 102 Q114 110 108 112" fill={hairCol}/>

      {/* ── EARS ── */}
      <ellipse cx="46" cy="68" rx="7" ry="9" fill={skinDark}/>
      <ellipse cx="114" cy="68" rx="7" ry="9" fill={skinDark}/>
      <ellipse cx="46" cy="68" rx="4" ry="6" fill={skinBase}/>
      <ellipse cx="114" cy="68" rx="4" ry="6" fill={skinBase}/>
      {/* purple bar earrings */}
      <rect x="42" y="64" width="4" height="10" rx="2" fill={accentCol}/>
      <rect x="114" y="64" width="4" height="10" rx="2" fill={accentCol}/>

      {/* ── FACE ── */}
      <Face />
    </svg>
  );
}