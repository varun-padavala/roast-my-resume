export default function ChadAvatar({ mood = "neutral" }) {
  const skinBase = "#c8906a";
  const skinDark  = "#a87050";
  const hairCol   = "#1a0f05";
  const turtleneckCol = "#111111";
  const turtleneckLight = "#1e1e1e";
  const accentCol = "#e8620a"; // orange

  const Arms = () => {
    // Left hand holds coffee cup
    const CoffeeCup = () => (
      <>
        <path d="M25 130 Q16 128 12 135 Q12 145 20 146" stroke={accentCol} strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* cup body */}
        <rect x="8" y="130" width="16" height="20" rx="2" fill="#1a1a1a"/>
        <rect x="9" y="131" width="14" height="6" rx="1" fill={accentCol} opacity="0.8"/>
        {/* sleeve */}
        <rect x="8" y="138" width="16" height="6" rx="1" fill="#333"/>
        {/* steam */}
        <path d="M12 129 Q11 124 13 120" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
        <path d="M17 129 Q16 123 18 119" stroke="#aaa" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      </>
    );

    if (mood === "neutral") return (
      <>
        <path d="M30 110 Q14 125 12 142" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="12" cy="145" rx="8" ry="7" fill={skinBase}/>
        <CoffeeCup />
        <path d="M130 110 Q142 130 138 155" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <path d="M30 110 Q14 125 12 142" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="12" cy="145" rx="8" ry="7" fill={skinBase}/>
        <CoffeeCup />
        <path d="M130 110 Q148 115 148 95" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M148 95 Q150 82 140 80" stroke={skinBase} strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="80" rx="10" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <path d="M30 110 Q14 125 12 142" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="12" cy="145" rx="8" ry="7" fill={skinBase}/>
        <CoffeeCup />
        <path d="M130 108 Q148 105 152 98" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M152 98 Q157 92 153 88" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="152" cy="84" rx="9" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "dead") return (
      <>
        <path d="M30 110 Q15 140 18 170" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="18" cy="173" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 110 Q145 140 142 170" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="142" cy="173" rx="9" ry="7" fill={skinBase}/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <path d="M30 110 Q14 125 12 142" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="12" cy="145" rx="8" ry="7" fill={skinBase}/>
        <CoffeeCup />
        <path d="M130 110 Q142 130 138 155" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <path d="M130 110 Q142 130 138 155" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
        <path d="M30 110 Q20 90 30 72" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M30 72 Q28 62 36 60" stroke={skinBase} strokeWidth="14" strokeLinecap="round" fill="none"/>
        <ellipse cx="44" cy="67" rx="16" ry="11" fill={skinBase}/>
        <line x1="38" y1="61" x2="50" y2="58" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="36" y1="67" x2="51" y2="66" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="37" y1="73" x2="51" y2="74" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <path d="M30 110 Q14 125 12 142" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="12" cy="145" rx="8" ry="7" fill={skinBase}/>
        <CoffeeCup />
        <path d="M130 108 Q148 105 152 98" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M152 98 Q157 92 153 88" stroke={skinBase} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="152" cy="84" rx="9" ry="8" fill={skinBase}/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <path d="M30 110 Q14 125 12 142" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="12" cy="145" rx="8" ry="7" fill={skinBase}/>
        <CoffeeCup />
        <path d="M130 110 Q142 130 138 155" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <path d="M30 112 Q20 125 24 150" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="153" rx="9" ry="7" fill={skinBase}/>
        <path d="M130 112 Q140 125 136 150" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="136" cy="153" rx="9" ry="7" fill={skinBase}/>
        <path d="M38 75 Q33 68 32 60 Q30 52 34 48" fill="none" stroke="#5bc4f5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M34 48 Q36 44 34 41 Q32 44 34 48" fill="#5bc4f5" opacity="0.5"/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <path d="M14 125 Q12 112 18 100" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M18 100 Q20 88 28 84" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="32" cy="80" rx="10" ry="8" fill={skinBase}/>
        <path d="M130 108 Q148 95 152 78" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M152 78 Q154 66 146 62" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="142" cy="57" rx="10" ry="8" fill={skinBase}/>
        <line x1="144" y1="50" x2="138" y2="43" stroke={skinBase} strokeWidth="5" strokeLinecap="round"/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <path d="M30 110 Q14 125 12 142" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="12" cy="145" rx="8" ry="7" fill={skinBase}/>
        <CoffeeCup />
        <path d="M130 110 Q142 130 138 155" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <ellipse cx="138" cy="158" rx="9" ry="7" fill={skinBase} transform="rotate(10 138 158)"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <path d="M30 108 Q12 95 8 78" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M8 78 Q6 66 14 62" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="18" cy="57" rx="10" ry="8" fill={skinBase}/>
        <line x1="16" y1="50" x2="22" y2="43" stroke={skinBase} strokeWidth="5" strokeLinecap="round"/>
        <path d="M130 108 Q148 95 152 78" stroke={turtleneckCol} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M152 78 Q154 66 146 62" stroke={skinBase} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <ellipse cx="142" cy="57" rx="10" ry="8" fill={skinBase}/>
        <line x1="144" y1="50" x2="138" y2="43" stroke={skinBase} strokeWidth="5" strokeLinecap="round"/>
      </>
    );
    return null;
  };

  const Face = () => {
    // sunglasses on head — always present
    const SunglassesOnHead = () => (
      <>
        <rect x="55" y="29" width="18" height="10" rx="5" fill="#111" opacity="0.85"/>
        <rect x="87" y="29" width="18" height="10" rx="5" fill="#111" opacity="0.85"/>
        <line x1="73" y1="34" x2="87" y2="34" stroke="#333" strokeWidth="1.8"/>
        <line x1="55" y1="34" x2="47" y2="33" stroke="#333" strokeWidth="1.8"/>
        <line x1="105" y1="34" x2="113" y2="33" stroke="#333" strokeWidth="1.8"/>
        {/* orange tint lenses */}
        <rect x="55" y="29" width="18" height="10" rx="5" fill={accentCol} opacity="0.25"/>
        <rect x="87" y="29" width="18" height="10" rx="5" fill={accentCol} opacity="0.25"/>
      </>
    );

    if (mood === "neutral") return (
      <>
        <SunglassesOnHead />
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <line x1="56" y1="56" x2="70" y2="56" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="90" y1="56" x2="104" y2="56" stroke={hairCol} strokeWidth="2.5" strokeLinecap="round"/>
        {/* smug grin */}
        <path d="M68 82 Q74 88 92 82" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="90" cy="80" rx="6" ry="3" fill={skinDark} opacity="0.3"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <SunglassesOnHead />
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
        <SunglassesOnHead />
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
        <SunglassesOnHead />
        <line x1="58" y1="63" x2="68" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="63" x2="58" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="92" y1="63" x2="102" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="102" y1="63" x2="92" y2="73" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="84" x2="92" y2="84" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <SunglassesOnHead />
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
        <SunglassesOnHead />
        <ellipse cx="63" cy="65" rx="6" ry="5" fill="#1a1a1a" opacity="0.5"/>
        <ellipse cx="97" cy="66" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="98.5" cy="64" rx="2" ry="2" fill="white"/>
        <path d="M70 84 Q76 80 90 84" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <SunglassesOnHead />
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
        <SunglassesOnHead />
        <ellipse cx="63" cy="65" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="65" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="62" cy="63" rx="2" ry="2.5" fill="white"/>
        <ellipse cx="96" cy="63" rx="2" ry="2.5" fill="white"/>
        <path d="M68 84 Q80 84 92 84" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <SunglassesOnHead />
        <path d="M57 64 Q63 72 69 64" fill="#1a1a1a"/>
        <path d="M91 64 Q97 72 103 64" fill="#1a1a1a"/>
        <ellipse cx="61" cy="66" rx="2" ry="1.5" fill="white"/>
        <ellipse cx="95" cy="66" rx="2" ry="1.5" fill="white"/>
        <path d="M70 86 Q80 82 90 86" fill="none" stroke={skinDark} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <SunglassesOnHead />
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="65" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="99" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 54 Q63 50 70 53" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M90 54 Q97 50 104 54" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M66 80 Q73 89 94 83" fill="none" stroke={skinDark} strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="90" cy="82" rx="6" ry="3.5" fill={skinDark} opacity="0.35"/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <SunglassesOnHead />
        <ellipse cx="63" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="97" cy="68" rx="6" ry="6.5" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="66" rx="2" ry="2" fill="white"/>
        <ellipse cx="98.5" cy="66" rx="2" ry="2" fill="white"/>
        <path d="M56 56 Q60 51 70 54" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M90 54 Q100 51 104 56" fill="none" stroke={hairCol} strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M68 81 Q74 87 80 82 Q86 87 92 82" fill="none" stroke={skinDark} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <SunglassesOnHead />
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
    return null;
  };

  return (
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <filter id="shadow-c" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>

      {/* ── ARMS ── */}
      <Arms />

      {/* ── BODY — black turtleneck ── */}
      <rect x="28" y="108" width="104" height="92" rx="4" fill={turtleneckCol} filter="url(#shadow-c)"/>
      {/* turtleneck collar extension — thick roll */}
      <rect x="58" y="96" width="44" height="20" rx="10" fill={turtleneckCol}/>
      {/* subtle sheen on turtleneck */}
      <path d="M34 118 Q80 112 126 118" fill="none" stroke={turtleneckLight} strokeWidth="2" opacity="0.5"/>
      {/* orange brand tag on sleeve */}
      <rect x="30" y="130" width="8" height="5" rx="1" fill={accentCol} opacity="0.9"/>

      {/* ── NECK (hidden by turtleneck, just skin colour peek) ── */}
      <rect x="67" y="92" width="26" height="14" rx="5" fill={skinBase}/>

      {/* ── HEAD — angular jawline ── */}
      {/* sharper, more angular head shape */}
      <path d="M44 66 Q44 30 80 26 Q116 30 116 66 Q116 90 104 98 Q80 106 56 98 Q44 90 44 66 Z" fill={skinBase} filter="url(#shadow-c)"/>

      {/* ── HAIR — modern textured fade ── */}
      {/* sides — short/faded */}
      <path d="M44 50 Q44 30 80 26 Q116 30 116 50" fill={hairCol}/>
      {/* top — styled volume */}
      <path d="M50 48 Q65 38 80 36 Q95 38 110 48 Q100 42 80 40 Q60 42 50 48 Z" fill={hairCol}/>
      {/* fade sides */}
      <rect x="44" y="44" width="9" height="22" rx="4" fill={hairCol} opacity="0.7"/>
      <rect x="107" y="44" width="9" height="22" rx="4" fill={hairCol} opacity="0.7"/>

      {/* ── EARS ── */}
      <ellipse cx="44" cy="68" rx="7" ry="9" fill={skinDark}/>
      <ellipse cx="116" cy="68" rx="7" ry="9" fill={skinDark}/>
      <ellipse cx="44" cy="68" rx="4" ry="6" fill={skinBase}/>
      <ellipse cx="116" cy="68" rx="4" ry="6" fill={skinBase}/>
      {/* small stud earring — orange */}
      <ellipse cx="116" cy="66" rx="2.5" ry="2.5" fill={accentCol}/>

      {/* ── FACE ── */}
      <Face />
    </svg>
  );
}
