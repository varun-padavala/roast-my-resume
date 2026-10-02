/**
 * ResumeOrbitScene.jsx
 * -----------------------------------------------------------------------------
 * A single self-contained animation component: a 3D resume surrounded by five
 * floating step cards on an organic, slightly imperfect orbit.
 *
 * Requires: react, gsap, tailwindcss (v3+)
 *   npm install gsap
 *
 * Usage:
 *   <ResumeOrbitScene activeStep={0} autoPlay={true} />
 *
 * Props
 *   activeStep  0 Upload | 1 Target | 2 Context | 3 Verdict | 4 Roast
 *               Any other value (e.g. -1 / null) = idle "home" state: the orbit
 *               spins slowly and nothing is focused.
 *   autoPlay    true  -> cycles through the five steps, starting at activeStep.
 *                        Changing activeStep restarts the cycle from there.
 *               false -> holds activeStep.
 *   interval    ms each step stays focused while autoPlaying (default 3400).
 *   className   extra classes for the root. The scene scales to fit its box
 *               (default shape is 6:5 and fills the parent's width); give it
 *               a height and `aspect-auto` if you want to fit a fixed box.
 */
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/* ------------------------------------------------------------------ data -- */

const STEPS = [
  { id: "upload", label: "UPLOAD", color: "#2EE6A0", angle: 0 },
  { id: "target", label: "TARGET", color: "#FFA81F", angle: 72 },
  { id: "context", label: "CONTEXT", color: "#8A5CFF", angle: 144 },
  { id: "verdict", label: "VERDICT", color: "#4B8BFF", angle: 216 },
  { id: "roast", label: "ROAST", color: "#FF4B2B", angle: 288 },
];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const RGB = STEPS.map((s) => hex(s.color));

/* resume leans: right side down, turned away from the camera */
const TILT = [
  { rx: 4, ry: 15, rz: 8 },
  { rx: 4, ry: 13, rz: 7 },
  { rx: 4, ry: 17, rz: 9 },
  { rx: 5, ry: 14, rz: 8 },
  { rx: 4, ry: 12, rz: 9 },
];

/* fixed per-card imperfections: height (px), angle nudge (deg),
   radius scale, tilt when active (deg) */
const LV = [-12, 9, -5, 13, -9];
const ANG = [3, -4, 2.5, -3, 4];
const RXS = [1, 0.95, 1.04, 0.98, 1.02];
const CT = [4, -6, 5, -5, -6];

const ICONS = {
  upload: <path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M4 14v6h16v-6" />,
  target: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </>
  ),
  context: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
    </>
  ),
  verdict: (
    <>
      <rect x="4" y="12" width="4" height="8" rx="1" />
      <rect x="10" y="7" width="4" height="13" rx="1" />
      <rect x="16" y="3" width="4" height="17" rx="1" />
    </>
  ),
  roast: (
    <>
      <path d="M12 2.5c.8 3.6 5.5 5.2 5.5 10.3a5.5 5.5 0 0 1-11 0c0-2.2 1-3.6 2.2-4.8.1 1.8.9 2.8 2 3 .3-3-.8-5.2 1.3-8.5z" />
      <path d="M12 21c-1.6 0-2.6-1.2-2.6-2.6 0-1.6 1.4-2.4 2.6-3.8 1.2 1.4 2.6 2.2 2.6 3.8 0 1.4-1 2.6-2.6 2.6z" />
    </>
  ),
};

/* one coordinate system: everything lives in a 600x500 scene */
const P = 1000; // perspective
const CX = 300;
const CY = 250;
const RX = 250;
const RY = 105;
const DEPTH = 150;
const CW = 100;
const CH = 108;
const RT = -3; // orbit tilt (deg)
const rad = (d) => (d * Math.PI) / 180;

/* paper fragments: [x, y, z, w, h, blur, opacity]
   far = small + soft, near = big + soft, mid = sharper */
const PAPERS = [
  [60, 45, -130, 30, 40, 2, 0.34],
  [478, 30, -70, 26, 34, 1.5, 0.3],
  [60, 445, 150, 54, 70, 2.4, 0.38],
  [412, 438, 70, 46, 60, 0.8, 0.44],
  [225, 478, -30, 34, 44, 1.4, 0.3],
].map(([x, y, z, w, h, bl, op], i) => {
  const k = (P - z) / P;
  return {
    i, z, w, h, bl, op,
    bx: CX + (x - CX) * k,
    by: CY + (y - CY) * k,
    vars: {
      "--w": `${w}px`,
      "--h": `${h}px`,
      "--tu": `${10 + i * 2.6}s`,
      "--x0": `${-20 + i * 14}deg`,
      "--y0": `${i * 18}deg`,
      "--z0": `${-25 + i * 22}deg`,
      "--ax": `${i % 2 ? 40 : -40}deg`,
      "--ay": `${i % 2 ? -50 : 50}deg`,
      "--az": `${i % 2 ? 130 : -130}deg`,
      animationDelay: `${-i * 2.3}s`,
    },
  };
});

/* deterministic ambient particles (seeded, never re-rolled) */
const DOTS = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const out = [];
  for (let n = 0; n < 8; ) {
    const x = -30 + rnd() * 660;
    const y = -20 + rnd() * 540;
    if (x > 30 && x < 570 && y > 50 && y < 450) continue; // keep the centre readable
    const z = 2 + Math.round(rnd() * 3);
    out.push({
      x, y, z,
      ac: n % 4 === 0,
      op: 0.25 + rnd() * 0.5,
      blur: rnd() < 0.4 ? 1 : 0,
      dx: (rnd() - 0.5) * 14,
      dy: -4 - rnd() * 14,
      du: 6 + rnd() * 6,
      dl: -rnd() * 8,
    });
    n++;
  }
  return out;
})();

/* imperfect laser orbit: wobbling radius, thin dark stretches, bright thick ones */
const ringPt = (th) => {
  const r = 1 + 0.018 * Math.sin(2 * th + 0.7) + 0.012 * Math.sin(5 * th + 2.1) + 0.008 * Math.sin(9 * th);
  const T = rad(RT);
  const ex = RX * r * Math.cos(th);
  const ey = RY * r * Math.sin(th);
  return [CX + ex * Math.cos(T) - ey * Math.sin(T), CY + ex * Math.sin(T) + ey * Math.cos(T)];
};
const nz = (th) =>
  Math.min(1, Math.max(0, 0.5 + 0.62 * (0.5 * Math.sin(3 * th + 1) + 0.3 * Math.sin(7 * th + 0.4) + 0.2 * Math.sin(13 * th + 2))));

const RING = (() => {
  const back = [];
  const front = [];
  for (let i = 0; i < 90; i++) {
    const t0 = rad(i * 4);
    const t1 = rad(i * 4 + 4.4);
    const m = (t0 + t1) / 2;
    const n = nz(m);
    const isBack = Math.sin(m) < 0;
    const dim = isBack ? 0.6 : 1;
    const [x0, y0] = ringPt(t0);
    const [x1, y1] = ringPt(t1);
    (isBack ? back : front).push({
      d: `M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`,
      hot: n > 0.78,
      glW: +(3 + 9 * n).toFixed(1),
      glO: +(0.6 * n * n * dim).toFixed(2),
      coW: +(0.5 + 1.7 * n).toFixed(2),
      coO: +((0.1 + 0.9 * Math.pow(n, 1.4)) * dim).toFixed(2),
    });
  }
  return { back, front };
})();

const RESUME_LINES = {
  experience: ["92%", "100%", "68%", "96%"],
  education: ["84%", "58%"],
  skills: ["98%", "78%", "90%"],
};

const normStep = (v) => (Number.isInteger(v) && v >= 0 && v < STEPS.length ? v : -1);

/* point on a (tilted) ellipse; XY pre-compensated so it projects exactly onto it */
function place(a, o) {
  const ex = o.rx * Math.cos(a);
  const ey = o.ry * Math.sin(a) + (o.dy || 0);
  const T = rad(o.t || 0);
  const x = ex * Math.cos(T) - ey * Math.sin(T);
  const y = ex * Math.sin(T) + ey * Math.cos(T);
  const z = Math.sin(a) * o.d + (o.ez || 0);
  const k = (P - z) / P;
  return { X: CX + x * k, Y: CY + y * k, z };
}

/* -------------------------------------------------------------------- css -- */
/* Only what Tailwind can't express cleanly: keyframes, pseudo-elements,
   color-mix glow maths and the CSS-variable driven bits. All scoped by .ros-* */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@500;700&display=swap');

.ros{--acc:46,230,160;color:#EBE8EA;font-family:"JetBrains Mono",ui-monospace,monospace}
.ros-bebas{font-family:"Bebas Neue",Impact,sans-serif;font-weight:400}
/* spacing lives here (not in utilities) so host resets / CSS layers can't zero it */
.ros .ros-paper{padding:22px 20px}
.ros .ros-sub{margin:6px 0 18px}
.ros .ros-sec{margin:14px 0 6px}
.ros .ros-ln{margin:6px 0}
.ros .ros-icon{left:calc(50% - 16px)}

.ros-ring{
  background:conic-gradient(rgba(var(--acc),.26),transparent 22%,rgba(var(--acc),.14) 45%,transparent 68%,rgba(var(--acc),.22));
  -webkit-mask:radial-gradient(closest-side,transparent 50%,#000 76%,transparent 100%);
  mask:radial-gradient(closest-side,transparent 50%,#000 76%,transparent 100%);
  filter:blur(12px);animation:ros-sp 28s linear infinite}
@keyframes ros-sp{to{transform:rotate(360deg)}}

.ros-arc path{fill:none;stroke-linecap:round;stroke:rgb(var(--acc))}
.ros-arc .ros-gl{filter:blur(3px);mix-blend-mode:screen}
.ros-arc .ros-co path{stroke:color-mix(in srgb,rgb(var(--acc)) 68%,#fff)}
.ros-arc .ros-co path.hot{stroke:color-mix(in srgb,rgb(var(--acc)) 30%,#fff)}
.ros-arc ellipse{fill:none;stroke:rgba(var(--acc),.2);stroke-width:.7}

.ros-paper::before{content:"";position:absolute;inset:0;opacity:.18;mix-blend-mode:multiply;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>")}
.ros-paper::after{content:"";position:absolute;inset:0;
  background:radial-gradient(75% 50% at 90% 100%,rgba(var(--acc),.5),transparent 70%),radial-gradient(60% 45% at 100% 28%,rgba(var(--acc),.34),transparent 70%),radial-gradient(60% 40% at 0% 0%,rgba(var(--acc),.1),transparent 70%)}

.ros-card{
  background:rgba(60,66,72,.42);
  border:1.4px solid color-mix(in srgb,color-mix(in srgb,var(--cc) 78%,#fff) calc(var(--a)*100%),rgba(235,232,234,.16));
  box-shadow:0 14px 30px rgba(0,0,0,.55),
    0 0 calc(var(--a)*12px) color-mix(in srgb,var(--cc) 90%,transparent),
    0 0 calc(var(--a)*42px) color-mix(in srgb,var(--cc) 48%,transparent),
    0 0 calc(var(--a)*90px) color-mix(in srgb,var(--cc) 20%,transparent),
    inset 0 0 calc(var(--a)*26px) color-mix(in srgb,var(--cc) 42%,transparent),
    inset 0 1px 0 rgba(235,232,234,.14);
  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);will-change:transform,opacity,filter}
.ros-card::before{content:"";position:absolute;inset:0;border-radius:inherit;opacity:var(--a);
  background:linear-gradient(145deg,color-mix(in srgb,var(--cc) 42%,#050606),color-mix(in srgb,var(--cc) 12%,#050606))}
.ros-icon{fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;
  stroke:color-mix(in srgb,var(--cc) calc(var(--a)*100%),rgba(235,232,234,.5));
  filter:drop-shadow(0 0 calc(var(--a)*7px) var(--cc))}
.ros-label{color:color-mix(in srgb,#EBE8EA calc(var(--a)*100%),rgba(235,232,234,.45))}

.ros-dot{position:absolute;border-radius:50%;background:rgba(235,232,234,.55);
  animation:ros-drift var(--du) ease-in-out var(--dl) infinite alternate}
.ros-dot-ac{background:rgb(var(--acc));box-shadow:0 0 10px 2px rgba(var(--acc),.7)}
@keyframes ros-drift{from{transform:translate(0,0)}to{transform:translate(var(--dx),var(--dy))}}

.ros-pi{position:absolute;left:calc(var(--w)/-2);top:calc(var(--h)/-2);width:var(--w);height:var(--h);border-radius:2px;
  background:repeating-linear-gradient(transparent 0 5px,rgba(0,0,0,.3) 5px 6px),linear-gradient(#d4d0c6,#8f8b81);
  box-shadow:0 0 12px rgba(var(--acc),.18);animation:ros-tumble var(--tu) ease-in-out infinite alternate}
.ros-pi::after{content:"";position:absolute;inset:0;background:rgba(var(--acc),.16)}
@keyframes ros-tumble{
  from{transform:rotateX(var(--x0)) rotateY(var(--y0)) rotateZ(var(--z0))}
  to{transform:rotateX(calc(var(--x0) + var(--ax))) rotateY(calc(var(--y0) + var(--ay))) rotateZ(calc(var(--z0) + var(--az)))}}

@media (prefers-reduced-motion:reduce){.ros-dot,.ros-pi,.ros-ring{animation:none}}
`;

/* -------------------------------------------------------------- component -- */

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function ArcLayer({ segs, className, children }) {
  return (
    <svg
      viewBox="0 0 600 500"
      className={`ros-arc pointer-events-none absolute inset-0 h-[500px] w-[600px] overflow-visible ${className}`}
    >
      {children}
      <g className="ros-gl">
        {segs.map((s, i) => (
          <path key={i} d={s.d} style={{ strokeWidth: s.glW, opacity: s.glO }} />
        ))}
      </g>
      <g className="ros-co">
        {segs.map((s, i) => (
          <path key={i} d={s.d} className={s.hot ? "hot" : undefined} style={{ strokeWidth: s.coW, opacity: s.coO }} />
        ))}
      </g>
    </svg>
  );
}

export default function ResumeOrbitScene({ activeStep = 0, autoPlay = true, interval = 3400, className = "" }) {
  const rootRef = useRef(null);
  const fitRef = useRef(null);
  const resumeRef = useRef(null);
  const cardRefs = useRef([]);
  const paperRefs = useRef([]);

  /* single source of truth: orbit rotation + resume tilt, both tweened by GSAP */
  const stateRef = useRef(null);
  const spinRef = useRef(false);
  if (!stateRef.current) {
    const s0 = normStep(activeStep);
    stateRef.current = { rot: s0 < 0 ? 90 : 90 - STEPS[s0].angle, ...TILT[Math.max(0, s0)] };
    spinRef.current = s0 < 0;
  }

  const goTo = useCallback((i) => {
    const s = stateRef.current;
    if (i < 0) {
      spinRef.current = true;
      gsap.killTweensOf(s, "rot");
      gsap.to(s, { ...TILT[0], duration: 1.7, ease: "power2.inOut", overwrite: "auto" });
      return;
    }
    spinRef.current = false;
    const goal = 90 - STEPS[i].angle;
    const t = s.rot + ((((goal - s.rot + 540) % 360) + 360) % 360) - 180; // shortest way round
    gsap.to(s, { rot: t, duration: 1.7, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(s, { ...TILT[i], duration: 1.7, ease: "power2.inOut", overwrite: "auto" });
  }, []);

  /* render loop */
  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = stateRef.current;

    const render = (t) => {
      let sum = 0;
      let mix = [0, 0, 0];

      for (let i = 0; i < STEPS.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const base = STEPS[i].angle + s.rot;
        const a = rad(base + ANG[i]);
        const d = ((((base - 90 + 540) % 360) + 360) % 360) - 180; // signed distance from front slot
        let act = Math.max(0, 1 - Math.abs(d) / 62);
        act = act * act * (3 - 2 * act);
        const dep = (Math.sin(a) + 1) / 2; // 1 = nearest
        const p = place(a, { rx: RX * RXS[i], ry: RY, d: DEPTH, ez: 46 * act, dy: LV[i], t: RT });
        const rotY = Math.cos(a) * 26;
        const rotZ = -Math.cos(a) * 3 + CT[i] * act;
        const scl = (0.9 + 0.1 * dep) * (1 + 0.6 * act);
        el.style.transform = `translate3d(${p.X - CW / 2}px,${p.Y - CH / 2}px,${p.z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scl})`;
        el.style.opacity = Math.min(1, 0.38 + 0.5 * dep + 0.35 * act);
        el.style.filter = `blur(${((1 - dep) * 1.8 * (1 - act)).toFixed(2)}px)`;
        el.style.setProperty("--a", act.toFixed(3));
        sum += act;
        mix = mix.map((v, j) => v + RGB[i][j] * act);
      }

      if (sum > 0.001) root.style.setProperty("--acc", mix.map((v) => Math.round(v / sum)).join(","));

      if (resumeRef.current) {
        resumeRef.current.style.transform = `rotateX(${s.rx}deg) rotateY(${s.ry + Math.sin(t * 0.5) * 1.5}deg) rotateZ(${s.rz}deg)`;
      }

      PAPERS.forEach((o) => {
        const el = paperRefs.current[o.i];
        if (!el) return;
        el.style.transform = `translate3d(${(o.bx + Math.sin(t * 0.4 + o.i) * 9 + Math.sin(rad(s.rot)) * 6).toFixed(1)}px,${(
          o.by + Math.cos(t * 0.33 + o.i * 1.7) * 8
        ).toFixed(1)}px,${o.z}px)`;
      });
    };

    const tick = (time, dt) => {
      if (spinRef.current && !reduce) s.rot -= (dt / 1000) * 7;
      render(time);
    };

    render(gsap.ticker.time); // first frame before paint
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf(s);
    };
  }, []);

  /* step control + autoplay */
  useEffect(() => {
    const start = normStep(activeStep);
    goTo(start);
    if (!autoPlay) return undefined;
    let n = start < 0 ? 0 : start;
    if (start < 0) goTo(0);
    const id = setInterval(() => {
      n = (n + 1) % STEPS.length;
      goTo(n);
    }, interval);
    return () => clearInterval(id);
  }, [activeStep, autoPlay, interval, goTo]);

  /* scale the whole 600x500 scene as one unit to fit its box */
  useIsoLayoutEffect(() => {
    const host = rootRef.current;
    const fit = fitRef.current;
    if (!host || !fit) return undefined;
    const apply = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      fit.style.transform = `translate(-50%,-50%) scale(${Math.min(w / 640, h / 520)})`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`ros pointer-events-none relative aspect-[6/5] w-full select-none ${className}`}
    >
      <style>{CSS}</style>

      <div
        ref={fitRef}
        className="absolute left-1/2 top-1/2 h-[500px] w-[600px]"
        style={{ transform: "translate(-50%,-50%)", transformOrigin: "center" }}
      >
        <div className="relative h-[500px] w-[600px] [perspective:1000px]">
          {/* ambient light */}
          <div
            className="pointer-events-none absolute -left-20 -top-[50px] h-[600px] w-[760px] rounded-full"
            style={{ background: "radial-gradient(closest-side,rgba(var(--acc),.08),transparent)" }}
          />
          <div className="pointer-events-none absolute left-[50px] top-[130px] h-[500px] w-[500px] rounded-full [transform:scaleY(.42)]">
            <div className="ros-ring absolute inset-0 rounded-full" />
          </div>
          <div
            className="pointer-events-none absolute left-[110px] top-[290px] h-[210px] w-[380px] rounded-full blur-[10px]"
            style={{ background: "radial-gradient(closest-side,rgba(var(--acc),.34),transparent)" }}
          />
          <div
            className="pointer-events-none absolute left-[200px] top-[120px] h-[260px] w-[200px] rounded-full"
            style={{ background: "radial-gradient(closest-side,rgba(235,232,234,.07),transparent)" }}
          />

          {/* ambient particles */}
          <div className="pointer-events-none absolute inset-0">
            {DOTS.map((d, i) => (
              <div
                key={i}
                className={`ros-dot ${d.ac ? "ros-dot-ac" : ""}`}
                style={{
                  left: d.x,
                  top: d.y,
                  width: d.z,
                  height: d.z,
                  opacity: d.op,
                  filter: `blur(${d.blur}px)`,
                  "--dx": `${d.dx}px`,
                  "--dy": `${d.dy}px`,
                  "--du": `${d.du}s`,
                  "--dl": `${d.dl}s`,
                }}
              />
            ))}
          </div>

          {/* 3D world */}
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            <ArcLayer segs={RING.back} className="[transform:translateZ(-100px)_scale(1.1)]">
              <ellipse cx={CX} cy={CY} rx={RX * 1.2} ry={RY * 1.28} />
              <ellipse cx={CX} cy={CY + 96} rx={RX * 0.8} ry={RY * 0.62} strokeDasharray="3 6" />
            </ArcLayer>

            {/* central resume */}
            <div
              ref={resumeRef}
              className="absolute left-[198px] top-[92px] h-[316px] w-[204px] [transform-style:preserve-3d]"
            >
              <div className="absolute inset-0 rounded-md border border-[rgba(235,232,234,.14)] bg-[linear-gradient(150deg,rgba(235,232,234,.2),rgba(235,232,234,.05))] [transform:translate3d(16px,12px,-14px)]" />
              <div className="ros-paper absolute inset-0 overflow-hidden rounded-[5px] bg-[linear-gradient(165deg,#EEEBE4_0%,#DAD6CC_60%,#C0BCB1_100%)] shadow-[0_28px_60px_rgba(0,0,0,.65)]">
                <div className="ros-bebas text-[29px] leading-[.92] text-[#1d1c1a]">ALEX MORGAN</div>
                <div className="ros-sub text-[6px] font-medium leading-none tracking-[.3em] text-[#6b6860]">
                  SOFTWARE ENGINEER
                </div>
                {[
                  ["EXPERIENCE", RESUME_LINES.experience],
                  ["EDUCATION", RESUME_LINES.education],
                  ["SKILLS", RESUME_LINES.skills],
                ].map(([title, lines]) => (
                  <React.Fragment key={title}>
                    <div className="ros-sec text-[6.5px] font-bold leading-none tracking-[.14em] text-[#55524b]">
                      {title}
                    </div>
                    {lines.map((w, i) => (
                      <div key={i} className="ros-ln block h-[4.5px] rounded-sm bg-[rgba(48,46,42,.48)]" style={{ width: w }} />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <ArcLayer segs={RING.front} className="[transform:translateZ(110px)_scale(.89)]" />

            {/* floating step cards */}
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className="ros-card absolute left-0 top-0 h-[108px] w-[100px] rounded-xl"
                style={{ "--cc": s.color, "--a": 0 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="ros-icon absolute top-[17px] h-8 w-8"
                >
                  {ICONS[s.id]}
                </svg>
                <div className="ros-label absolute inset-x-3 bottom-2.5 flex items-baseline gap-2 text-[10px] font-bold leading-none tracking-[.1em]">
                  <span className="text-[8px] font-medium">0{i + 1}</span>
                  <span className="flex-1 text-center">{s.label}</span>
                </div>
              </div>
            ))}

            {/* floating paper fragments */}
            {PAPERS.map((p) => (
              <div
                key={p.i}
                ref={(el) => (paperRefs.current[p.i] = el)}
                className="absolute left-0 top-0 h-0 w-0 [transform-style:preserve-3d]"
                style={{ opacity: p.op, filter: `blur(${p.bl}px)` }}
              >
                <div className="ros-pi" style={p.vars} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}









