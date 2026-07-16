export default function AlexisAvatar({ mood = "neutral" }) {
  const skinBase = "#e8c8a0";
  const skinDark  = "#c8a878";
  const hairCol   = "#2a1a08";
  const blazerCol   = "#1a1a2e";
  const blazerLight = "#22223e";
  const shirtCol    = "#f5f0ea";
  const accentCol   = "#cc1a2a"; // red

  const Arms = () => {
    if (mood === "neutral") return (
      <>
        {/* Straight-backed, hands in front or at sides — formal posture */}
        <path d="M32 108 Q22 125 24 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="151" rx="8" ry="7" fill={skinBase} transform="rotate(-5 24 151)"/>
        <path d="M128 108 Q138 125 136 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="151" rx="8" ry="7" fill={skinBase} transform="rotate(5 136 151)"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <path d="M32 108 Q22 130 24 155" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="158" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 108 Q146 113 146 93" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M146 93 Q148 80 138 78" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="134" cy="78" rx="10" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <path d="M32 108 Q22 125 24 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="151" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 106 Q146 103 150 96" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M150 96 Q155 90 151 86" stroke={skinBase} strokeWidth="11" strokeLinecap="round" fill="none"/>
        <ellipse cx="150" cy="82" rx="9" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "dead") return (
      <>
        <path d="M32 108 Q18 138 20 168" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="20" cy="171" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 108 Q142 138 140 168" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="140" cy="171" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <path d="M32 108 Q22 125 24 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="151" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 108 Q138 125 136 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="151" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <path d="M128 108 Q138 125 136 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="151" rx="8" ry="7" fill={skinBase}/>
        <path d="M32 108 Q22 90 30 72" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M30 72 Q28 62 36 60" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="44" cy="66" rx="15" ry="10" fill={skinBase}/>
        <line x1="38" y1="60" x2="50" y2="57" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="36" y1="66" x2="51" y2="65" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <path d="M32 108 Q22 125 24 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="151" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 106 Q146 103 150 96" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M150 96 Q155 90 151 86" stroke={skinBase} strokeWidth="11" strokeLinecap="round" fill="none"/>
        <ellipse cx="150" cy="82" rx="9" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <path d="M32 108 Q22 125 24 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="151" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 108 Q138 125 136 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="151" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <path d="M32 110 Q22 122 24 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="151" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 110 Q138 122 136 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="151" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <path d="M128 106 Q146 100 150 90" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="150" cy="87" rx="9" ry="7" fill={skinBase} transform="rotate(25 150 87)"/>
        <path d="M32 108 Q18 118 16 138" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="16" cy="141" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <path d="M32 108 Q22 125 24 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="151" rx="8" ry="7" fill={skinBase}/>
        <path d="M128 108 Q138 125 136 148" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="151" rx="8" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <path d="M32 106 Q14 93 10 76" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M10 76 Q8 64 16 60" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="20" cy="55" rx="10" ry="8" fill={skinBase}/>
        <path d="M128 106 Q146 93 150 76" stroke={blazerCol} strokeWidth="16" strokeLinecap="round" fill="none"/>
        <path d="M150 76 Q152 64 144 60" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="140" cy="55" rx="10" ry="8" fill={skinBase}/>
      </>
    );
    return null;
  };

  const Face = () => {
    // Thin premium glasses
    const ThinGlasses = () => (
      <>
        <rect x="53" y="61" width="21" height="14" rx="7" fill="none" stroke="#555" strokeWidth="1.5"/>
        <rect x="86" y="61" width="21" height="14" rx="7" fill="none" stroke="#555" strokeWidth="1.5"/>
        <line x1="74" y1="68" x2="86" y2="68" stroke="#555" strokeWidth="1.2"/>
        <line x1="53" y1="67" x2="45" y2="65" stroke="#555" strokeWidth="1.2"/>
        <line x1="107" y1="67" x2="115" y2="65" stroke="#555" strokeWidth="1.2"/>
        {/* subtle lens tint */}
        <rect x="53" y="61" width="21" height="14" rx="7" fill="white" opacity="0.06"/>
        <rect x="86" y="61" width="21" height="14" rx="7" fill="white" opacity="0.06"/>
      </>
    );

    if (mood === "neutral") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <ellipse cx="97.5" cy="66" rx="1.8" ry="1.8" fill="white"/>
        {/* thin arched brows */}
        <path d="M57 56 Q63 52 70 54" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M90 54 Q96 52 103 55" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        {/* slight sophisticated smile */}
        <path d="M70 83 Q80 87 90 83" fill="none" stroke={skinDark} strokeWidth="1.8" strokeLinecap="round"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="65" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <ellipse cx="98" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <path d="M57 56 Q63 52 70 54" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M90 54 Q96 52 103 55" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M70 83 Q80 81 90 83" fill="none" stroke={skinDark} strokeWidth="1.8" strokeLinecap="round"/>
        <ellipse cx="48" cy="52" rx="3" ry="4" fill="#5bc4f5" opacity="0.7"/>
        <path d="M48 48 Q51 44 48 42 Q45 44 48 48" fill="#5bc4f5" opacity="0.7"/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="65" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <ellipse cx="99" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <path d="M57 55 Q63 51 70 54" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M90 53 Q96 51 103 55" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M68 82 Q74 87 92 81" fill="none" stroke={skinDark} strokeWidth="2.2" strokeLinecap="round"/>
        <ellipse cx="90" cy="80" rx="5" ry="2.5" fill={skinDark} opacity="0.25"/>
      </>
    );
    if (mood === "dead") return (
      <>
        <line x1="58" y1="63" x2="68" y2="73" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="68" y1="63" x2="58" y2="73" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="92" y1="63" x2="102" y2="73" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="102" y1="63" x2="92" y2="73" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="68" y1="84" x2="92" y2="84" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="68" rx="5" ry="5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="68" rx="5" ry="5" fill="#1a1a1a"/>
        <ellipse cx="66" cy="68" rx="2.2" ry="2" fill="white"/>
        <ellipse cx="99" cy="68" rx="2.2" ry="2" fill="white"/>
        <path d="M57 56 Q63 54 70 56" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M90 55 Q96 53 103 55" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M70 83 Q80 83 90 83" fill="none" stroke={skinDark} strokeWidth="1.8" strokeLinecap="round"/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <ellipse cx="63" cy="65" rx="5" ry="5" fill="#1a1a1a" opacity="0.5"/>
        <ThinGlasses />
        <ellipse cx="96" cy="66" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="97.5" cy="64" rx="1.8" ry="1.8" fill="white"/>
        <path d="M70 83 Q76 80 90 83" fill="none" stroke={skinDark} strokeWidth="1.8" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <ellipse cx="97.5" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <path d="M57 54 Q63 50 70 53" fill="none" stroke={hairCol} strokeWidth="2" strokeLinecap="round"/>
        <path d="M90 55 Q96 57 103 54" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M68 81 Q74 79 92 83" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="65" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="65" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="62" cy="63" rx="1.8" ry="2" fill="white"/>
        <ellipse cx="95" cy="63" rx="1.8" ry="2" fill="white"/>
        <path d="M68 83 Q80 83 92 83" fill="none" stroke={skinDark} strokeWidth="1.8" strokeLinecap="round"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <ThinGlasses />
        <path d="M57 64 Q63 72 69 64" fill="#1a1a1a"/>
        <path d="M91 64 Q97 72 103 64" fill="#1a1a1a"/>
        <ellipse cx="61" cy="66" rx="1.8" ry="1.5" fill="white"/>
        <ellipse cx="95" cy="66" rx="1.8" ry="1.5" fill="white"/>
        <path d="M57 56 Q63 54 70 56" fill="none" stroke={hairCol} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M70 85 Q80 81 90 85" fill="none" stroke={skinDark} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M38 74 Q33 67 32 59 Q30 51 34 47" fill="none" stroke="#5bc4f5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M34 47 Q36 43 34 40 Q32 43 34 47" fill="#5bc4f5" opacity="0.5"/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="65" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <ellipse cx="99" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <path d="M57 54 Q63 50 70 53" fill="none" stroke={hairCol} strokeWidth="2" strokeLinecap="round"/>
        <path d="M90 53 Q96 50 103 53" fill="none" stroke={hairCol} strokeWidth="2" strokeLinecap="round"/>
        <path d="M66 80 Q73 88 94 82" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="90" cy="81" rx="5" ry="3" fill={skinDark} opacity="0.3"/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="68" rx="5" ry="5.5" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <ellipse cx="97.5" cy="66" rx="1.8" ry="1.8" fill="white"/>
        <path d="M57 55 Q61 50 70 53" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M90 53 Q99 50 103 55" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M68 80 Q74 86 80 81 Q86 86 92 81" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <ThinGlasses />
        <ellipse cx="63" cy="68" rx="5" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="96" cy="68" rx="5" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="65" cy="65" rx="2" ry="2" fill="white"/>
        <ellipse cx="98" cy="65" rx="2" ry="2" fill="white"/>
        <path d="M57 53 Q63 48 70 51" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M90 51 Q96 48 103 53" fill="none" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M65 78 Q72 90 95 80" fill="none" stroke={skinDark} strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="66" cy="82" rx="4" ry="3.5" fill={skinDark} opacity="0.3"/>
        <ellipse cx="93" cy="82" rx="4" ry="3.5" fill={skinDark} opacity="0.3"/>
      </>
    );
    return null;
  };

  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="shadow-a" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* ── ARMS ── */}
      <Arms />

      {/* ── BODY — elegant dark blazer ── */}
      <rect x="30" y="108" width="100" height="92" rx="4" fill={blazerCol} filter="url(#shadow-a)"/>
      {/* blouse */}
      <polygon points="80,108 63,200 97,200" fill={shirtCol}/>
      {/* lapels — sharper, more tailored */}
      <polygon points="80,108 44,108 55,145" fill={blazerLight}/>
      <polygon points="80,108 116,108 105,145" fill={blazerLight}/>
      {/* red pocket square */}
      <rect x="44" y="116" width="11" height="9" rx="1" fill={accentCol} opacity="0.9"/>
      {/* thin red tie */}
      <polygon points="80,111 76,125 80,200 84,125" fill={accentCol}/>
      <polygon points="76,108 84,108 83,114 77,114" fill="#8b0000"/>
      {/* pin/brooch on lapel */}
      <ellipse cx="58" cy="130" rx="4" ry="4" fill={accentCol}/>
      <ellipse cx="58" cy="130" rx="2" ry="2" fill="#ff6666"/>

      {/* ── NECK ── */}
      <rect x="68" y="92" width="24" height="20" rx="5" fill={skinBase}/>

      {/* ── HEAD — oval, refined ── */}
      <ellipse cx="80" cy="62" rx="34" ry="38" fill={skinBase} filter="url(#shadow-a)"/>

      {/* ── HAIR — sleek bun ── */}
      {/* hair base */}
      <ellipse cx="80" cy="28" rx="34" ry="14" fill={hairCol}/>
      <rect x="46" y="26" width="68" height="14" rx="4" fill={hairCol}/>
      {/* tight side pulls */}
      <rect x="46" y="38" width="9" height="26" rx="4" fill={hairCol}/>
      <rect x="105" y="38" width="9" height="26" rx="4" fill={hairCol}/>
      {/* bun on top */}
      <ellipse cx="80" cy="18" rx="14" ry="12" fill={hairCol}/>
      <ellipse cx="80" cy="18" rx="10" ry="8" fill="#1e0e04"/>
      {/* bun pin */}
      <line x1="75" y1="14" x2="85" y2="22" stroke="#888" strokeWidth="1.5"/>
      <ellipse cx="85" cy="22" rx="2" ry="2" fill={accentCol}/>

      {/* ── EARS ── */}
      <ellipse cx="46" cy="64" rx="7" ry="9" fill={skinDark}/>
      <ellipse cx="114" cy="64" rx="7" ry="9" fill={skinDark}/>
      <ellipse cx="46" cy="64" rx="4" ry="6" fill={skinBase}/>
      <ellipse cx="114" cy="64" rx="4" ry="6" fill={skinBase}/>
      {/* red stud earrings */}
      <ellipse cx="46" cy="62" rx="3" ry="3" fill={accentCol}/>
      <ellipse cx="114" cy="62" rx="3" ry="3" fill={accentCol}/>
      <ellipse cx="46" cy="62" rx="1.5" ry="1.5" fill="#ff8888"/>
      <ellipse cx="114" cy="62" rx="1.5" ry="1.5" fill="#ff8888"/>

      {/* ── FACE ── */}
      <Face />
    </svg>
  );
}
