
export default function RobotAvatar({ mood = "neutral" }) {
  const bodyMetal  = "#2b2d3a";
  const bodyLight  = "#383b4d";
  const panelCol   = "#1e2030";
  const accentBlue = "#4a9eda";
  const accentGlow = "#6db8f0";
  const boltCol    = "#555870";
  const screenCol  = "#0d1b2a";
  const ledGreen   = "#4ecb71";
 
  const Arms = () => {
    if (mood === "neutral") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="14" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
        <line x1="17" y1="156" x2="27" y2="156" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="17" y1="160" x2="25" y2="160" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M130 110 Q142 130 138 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="130" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
        <line x1="133" y1="156" x2="143" y2="156" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="133" y1="160" x2="141" y2="160" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <path d="M30 110 Q18 135 20 160" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="12" y="158" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M130 110 Q148 115 148 95" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M148 95 Q150 82 140 80" stroke={bodyLight} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <rect x="130" y="74" width="18" height="12" rx="3" fill={bodyLight}/>
        <line x1="133" y1="78" x2="145" y2="78" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="133" y1="82" x2="143" y2="82" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <path d="M30 110 Q10 105 -2 100" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M-2 100 Q-16 98 -20 95" stroke={bodyLight} strokeWidth="12" strokeLinecap="round" fill="none"/>
        <rect x="-30" y="88" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M130 110 Q142 130 138 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="130" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
      </>
    );
    if (mood === "dead") return (
      <>
        <path d="M30 110 Q15 140 18 170" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="10" y="168" width="16" height="12" rx="3" fill={bodyLight} opacity="0.5"/>
        <path d="M130 110 Q145 140 142 170" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="134" y="168" width="16" height="12" rx="3" fill={bodyLight} opacity="0.5"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <path d="M30 108 Q12 95 8 78" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M8 78 Q6 66 14 62" stroke={bodyLight} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <rect x="6" y="52" width="16" height="12" rx="3" fill={bodyLight}/>
        <line x1="9" y1="56" x2="19" y2="56" stroke={accentGlow} strokeWidth="2" strokeLinecap="round"/>
        <path d="M130 108 Q148 95 152 78" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M152 78 Q154 66 146 62" stroke={bodyLight} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <rect x="138" y="52" width="16" height="12" rx="3" fill={bodyLight}/>
        <line x1="141" y1="56" x2="151" y2="56" stroke={accentGlow} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="14" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M130 110 Q142 130 138 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="130" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <path d="M130 110 Q142 130 138 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="130" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M30 110 Q20 90 30 72" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <path d="M30 72 Q28 62 38 60" stroke={bodyLight} strokeWidth="13" strokeLinecap="round" fill="none"/>
        <rect x="30" y="54" width="22" height="14" rx="4" fill={bodyLight}/>
        <line x1="33" y1="58" x2="49" y2="58" stroke={accentBlue} strokeWidth="2" strokeLinecap="round"/>
        <line x1="33" y1="63" x2="47" y2="63" strokeWidth="2" stroke={accentBlue} strokeLinecap="round"/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="14" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M130 110 Q142 130 138 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="130" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
      </>
    );
    if (mood === "sigh") return (
      <>
        <path d="M30 112 Q20 125 24 150" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="16" y="148" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M130 112 Q140 125 136 150" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="128" y="148" width="16" height="12" rx="3" fill={bodyLight}/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <path d="M130 110 Q145 105 152 95" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="144" y="88" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M30 110 Q16 120 14 140" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="6" y="138" width="16" height="12" rx="3" fill={bodyLight}/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="14" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M130 108 Q148 105 152 98" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="144" y="92" width="16" height="12" rx="3" fill={bodyLight}/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <path d="M30 110 Q18 130 22 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="14" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
        <path d="M130 110 Q142 130 138 155" stroke={bodyMetal} strokeWidth="18" strokeLinecap="round" fill="none"/>
        <rect x="130" y="153" width="16" height="12" rx="3" fill={bodyLight}/>
      </>
    );
    return null;
  };
 
  const Face = () => {
    if (mood === "neutral") return (
      <>
        {/* left eye screen */}
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="64" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="65.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        {/* right eye screen */}
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="96" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="97.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        {/* mouth display — LED bar */}
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <rect x="68" y="82" width="24" height="2" rx="1" fill={accentBlue} opacity="0.7"/>
      </>
    );
    if (mood === "thinking") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="64" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="65.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        {/* thinking eye — rotating dots */}
        <ellipse cx="96" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.5"/>
        <ellipse cx="94" cy="65" rx="1.5" ry="1.5" fill={accentGlow}/>
        <ellipse cx="98" cy="69" rx="1.5" ry="1.5" fill={accentGlow}/>
        {/* mouth — wavy processing */}
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <path d="M68 83 Q72 81 76 83 Q80 85 84 83 Q88 81 92 83" fill="none" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        {/* processing indicator */}
        <ellipse cx="48" cy="52" rx="3" ry="4" fill={accentBlue} opacity="0.6"/>
        <path d="M48 48 Q51 44 48 42 Q45 44 48 48" fill={accentBlue} opacity="0.6"/>
      </>
    );
    if (mood === "smirk") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="64" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="65.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="96" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="97.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <path d="M68 83 Q78 81 92 85" fill="none" stroke={accentBlue} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "dead") return (
      <>
        {/* X eyes */}
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <line x1="57" y1="62" x2="71" y2="72" stroke="#ff4444" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="71" y1="62" x2="57" y2="72" stroke="#ff4444" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <line x1="89" y1="62" x2="103" y2="72" stroke="#ff4444" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="103" y1="62" x2="89" y2="72" stroke="#ff4444" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <line x1="68" y1="83" x2="92" y2="83" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "sideye") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="68" cy="67" rx="4" ry="4" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="69" cy="66" rx="1.5" ry="1.5" fill={accentGlow}/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="100" cy="67" rx="4" ry="4" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="101" cy="66" rx="1.5" ry="1.5" fill={accentGlow}/>
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <rect x="68" y="82" width="24" height="2" rx="1" fill={accentBlue} opacity="0.5"/>
      </>
    );
    if (mood === "facepalm") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol} opacity="0.4"/>
        <ellipse cx="64" cy="67" rx="4" ry="4" fill={accentBlue} opacity="0.3"/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="96" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="97.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <path d="M70 83 Q76 80 90 83" fill="none" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </>
    );
    if (mood === "scoff") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="64" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="65.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="96" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="97.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <path d="M68 84 Q74 81 92 82" fill="none" stroke={accentBlue} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "eyeroll") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="62" cy="63" rx="4" ry="4" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="61" cy="62" rx="1.5" ry="1.5" fill={accentGlow}/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="94" cy="63" rx="4" ry="4" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="93" cy="62" rx="1.5" ry="1.5" fill={accentGlow}/>
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <rect x="68" y="82" width="24" height="2" rx="1" fill={accentBlue} opacity="0.5"/>
      </>
    );
    if (mood === "sigh") return (
      <>
        {/* droopy eyelids = lower half of screen lit */}
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <rect x="54" y="59" width="20" height="8" rx="3" fill={bodyMetal} opacity="0.7"/>
        <ellipse cx="64" cy="70" rx="4" ry="3" fill={accentBlue} opacity="0.7"/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <rect x="86" y="59" width="20" height="8" rx="3" fill={bodyMetal} opacity="0.7"/>
        <ellipse cx="96" cy="70" rx="4" ry="3" fill={accentBlue} opacity="0.7"/>
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <path d="M70 86 Q80 82 90 86" fill="none" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        {/* exhaust wisp */}
        <path d="M38 75 Q33 68 32 60 Q30 52 34 48" fill="none" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M34 48 Q36 44 34 41 Q32 44 34 48" fill={accentBlue} opacity="0.4"/>
      </>
    );
    if (mood === "smuggrin") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="64" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="65.5" cy="65.5" rx="2" ry="2" fill={accentGlow}/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="96" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="97.5" cy="65.5" rx="2" ry="2" fill={accentGlow}/>
        <rect x="64" y="79" width="32" height="8" rx="4" fill={screenCol}/>
        <path d="M66 85 Q72 80 80 87 Q88 80 94 85" fill="none" stroke={accentGlow} strokeWidth="2" strokeLinecap="round"/>
      </>
    );
    if (mood === "disgusted") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="64" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="65.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="96" cy="67" rx="5" ry="5" fill={accentBlue} opacity="0.9"/>
        <ellipse cx="97.5" cy="65.5" rx="1.8" ry="1.8" fill={accentGlow}/>
        <rect x="66" y="79" width="28" height="7" rx="3" fill={screenCol}/>
        <path d="M68 81 Q74 86 80 82 Q86 86 92 82" fill="none" stroke={accentBlue} strokeWidth="2" strokeLinecap="round"/>
        <path d="M76 77 Q80 75 84 77" fill="none" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </>
    );
    if (mood === "victorious") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="64" cy="67" rx="6" ry="6" fill={accentGlow} opacity="0.95"/>
        <ellipse cx="65.5" cy="65.5" rx="2" ry="2" fill="white"/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <ellipse cx="96" cy="67" rx="6" ry="6" fill={accentGlow} opacity="0.95"/>
        <ellipse cx="97.5" cy="65.5" rx="2" ry="2" fill="white"/>
        <rect x="63" y="78" width="34" height="9" rx="4" fill={screenCol}/>
        <path d="M65 84 Q72 78 80 85 Q88 78 95 84" fill="none" stroke={accentGlow} strokeWidth="2.5" strokeLinecap="round"/>
      </>
    );
    if (mood === "blink") return (
      <>
        <rect x="54" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <line x1="57" y1="67" x2="71" y2="67" stroke={accentBlue} strokeWidth="3" strokeLinecap="round"/>
        <rect x="86" y="59" width="20" height="16" rx="4" fill={screenCol}/>
        <line x1="89" y1="67" x2="103" y2="67" stroke={accentBlue} strokeWidth="3" strokeLinecap="round"/>
        <rect x="66" y="80" width="28" height="6" rx="3" fill={screenCol}/>
        <rect x="68" y="82" width="24" height="2" rx="1" fill={accentBlue} opacity="0.7"/>
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
      <rect x="28" y="108" width="104" height="92" rx="4" fill={bodyMetal} filter="url(#shadow)"/>
      {/* chest panel */}
      <rect x="38" y="116" width="84" height="54" rx="3" fill={panelCol}/>
      {/* chest screen / ATS display */}
      <rect x="44" y="122" width="72" height="34" rx="3" fill={screenCol}/>
      {/* screen scan lines */}
      <line x1="44" y1="128" x2="116" y2="128" stroke={accentBlue} strokeWidth="0.8" opacity="0.3"/>
      <line x1="44" y1="134" x2="116" y2="134" stroke={accentBlue} strokeWidth="0.8" opacity="0.3"/>
      <line x1="44" y1="140" x2="116" y2="140" stroke={accentBlue} strokeWidth="0.8" opacity="0.3"/>
      <line x1="44" y1="146" x2="116" y2="146" stroke={accentBlue} strokeWidth="0.8" opacity="0.3"/>
      {/* ATS progress bars */}
      <rect x="50" y="126" width="30" height="3" rx="1.5" fill={accentBlue} opacity="0.8"/>
      <rect x="50" y="131" width="48" height="3" rx="1.5" fill={accentBlue} opacity="0.5"/>
      <rect x="50" y="136" width="22" height="3" rx="1.5" fill={accentBlue} opacity="0.6"/>
      <rect x="50" y="141" width="55" height="3" rx="1.5" fill={accentBlue} opacity="0.4"/>
      <rect x="50" y="146" width="36" height="3" rx="1.5" fill={accentBlue} opacity="0.7"/>
      {/* green status LED */}
      <ellipse cx="108" cy="126" rx="3" ry="3" fill={ledGreen} opacity="0.9"/>
      {/* side bolts */}
      <ellipse cx="34" cy="120" rx="3" ry="3" fill={boltCol}/>
      <ellipse cx="126" cy="120" rx="3" ry="3" fill={boltCol}/>
      <ellipse cx="34" cy="160" rx="3" ry="3" fill={boltCol}/>
      <ellipse cx="126" cy="160" rx="3" ry="3" fill={boltCol}/>
      {/* bottom accent stripe */}
      <rect x="28" y="192" width="104" height="8" rx="2" fill={bodyLight}/>
      <rect x="28" y="192" width="104" height="3" rx="1" fill={accentBlue} opacity="0.4"/>
 
      {/* ── NECK ── */}
      <rect x="67" y="92" width="26" height="20" rx="4" fill={bodyLight}/>
      {/* neck segments */}
      <line x1="67" y1="98" x2="93" y2="98" stroke={boltCol} strokeWidth="2"/>
      <line x1="67" y1="104" x2="93" y2="104" stroke={boltCol} strokeWidth="2"/>
 
      {/* ── HEAD ── */}
      <rect x="38" y="26" width="84" height="68" rx="12" fill={bodyMetal} filter="url(#shadow)"/>
      {/* head panel outline */}
      <rect x="42" y="30" width="76" height="60" rx="10" fill={bodyLight}/>
      {/* top accent stripe */}
      <rect x="42" y="30" width="76" height="5" rx="3" fill={accentBlue} opacity="0.6"/>
 
      {/* ── ANTENNA ── */}
      <rect x="77" y="14" width="6" height="14" rx="3" fill={bodyLight}/>
      <ellipse cx="80" cy="12" rx="5" ry="5" fill={accentBlue}/>
      <ellipse cx="80" cy="12" rx="3" ry="3" fill={accentGlow}/>
 
      {/* ── EARS / side panels ── */}
      <rect x="30" y="42" width="10" height="26" rx="4" fill={bodyLight}/>
      <rect x="120" y="42" width="10" height="26" rx="4" fill={bodyLight}/>
      {/* ear vents */}
      <line x1="33" y1="50" x2="37" y2="50" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="33" y1="54" x2="37" y2="54" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="33" y1="58" x2="37" y2="58" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="123" y1="50" x2="127" y2="50" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="123" y1="54" x2="127" y2="54" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="123" y1="58" x2="127" y2="58" stroke={accentBlue} strokeWidth="1.5" strokeLinecap="round"/>
 
      {/* ── FACE ── */}
      <Face />
 
      {/* ── HEAD CORNER BOLTS ── */}
      <ellipse cx="46" cy="34" rx="2.5" ry="2.5" fill={boltCol}/>
      <ellipse cx="114" cy="34" rx="2.5" ry="2.5" fill={boltCol}/>
      <ellipse cx="46" cy="88" rx="2.5" ry="2.5" fill={boltCol}/>
      <ellipse cx="114" cy="88" rx="2.5" ry="2.5" fill={boltCol}/>
    </svg>
  );
}
 
/*
  CORPORATE ATS ROBOT AVATAR
  ─────────────────────────────────────────
  Same canvas: viewBox="0 0 160 200"
  Same proportions, flat vector style, and layer order as reference set.
 
  SUPPORTED MOODS:
  ─────────────────────────────────────────
  "neutral"    — calm blue eyes, flat LED bar mouth
  "thinking"   — spinning eye pupils, wavy processing mouth
  "smirk"      — asymmetric mouth LED
  "dead"       — X error eyes, offline mouth
  "sideye"     — pupils shifted right
  "facepalm"   — hand over face, dim left eye
  "scoff"      — raised arm, lopsided mouth bar
  "eyeroll"    — pupils shifted up-left
  "sigh"       — droopy eyelid panels, exhaust wisp
  "smuggrin"   — bright eyes, arc grin display
  "disgusted"  — wavy mouth LED, furrowed indicator
  "victorious" — bright glow eyes, open arc smile
  "blink"      — flat line eyes (screen off)
  ─────────────────────────────────────────
 
  USAGE:
    <RobotAvatar mood="sideye" />
    <RobotAvatar mood="thinking" />
    <RobotAvatar mood="victorious" />
 
  SIZING:
    <div className="w-32 h-40"><RobotAvatar mood="neutral" /></div>
*/
 


