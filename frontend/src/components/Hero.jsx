import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero({ onTryDemo }) {
  const navigate = useNavigate();

  return (
    <section
  className="relative overflow-hidden"
  style={{
    minHeight: "calc(100svh - 56px)",
    paddingTop: "56px",
  }}
>
      <style>{`
  .hero-content{
    max-width:1200px;
    width:100%;
    padding-left:80px;
    padding-right:40px;
  }

  .hero-heading{
    font-size:clamp(5.8rem,8vw,7rem);
    font-weight:900;
    line-height:.88;
    letter-spacing:-4px;
    color:#f0ede8;
    margin:0;
  }

  .hero-desc{
    max-width:640px;
    margin-top:28px;
    color:#8b8b8b;
    font-size:22px;
    line-height:1.6;
  }

  /* ---------------- Buttons ---------------- */

  .hero-buttons{
    display:flex;
    gap:18px;
    margin-top:42px;
    flex-wrap:wrap;
  }

  .hero-btn{
    min-width:220px;
    height:58px;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:0 34px;

    font-family:"Space Mono", monospace;
    font-size:14px;
    font-weight:700;
    letter-spacing:.08em;
    text-transform:uppercase;

    cursor:pointer;
    transition:
      transform .25s ease,
      background .25s ease,
      border-color .25s ease,
      box-shadow .25s ease;

    border-radius:8px;
  }

  .hero-btn:hover{
    transform:translateY(-3px);
  }

  .hero-btn-primary{
    background:#f0ede8;
    color:#111;
    border:1px solid #f0ede8;
    box-shadow:0 12px 30px rgba(255,255,255,.08);
  }

  .hero-btn-primary:hover{
    background:#fff;
    box-shadow:0 18px 40px rgba(255,255,255,.12);
  }

  .hero-btn-secondary{
    background:rgba(255,255,255,.03);
    color:#f0ede8;
    border:1px solid rgba(255,255,255,.12);
    backdrop-filter:blur(10px);
  }

  .hero-btn-secondary:hover{
    background:rgba(255,255,255,.06);
    border-color:rgba(255,255,255,.25);
  }

  .hero-small{
    margin-top:22px;
    color:#666;
    font-size:15px;
  }

  /* ---------------- Watermark ---------------- */

  .hero-watermark{
  position:absolute;

  right:-4%;
  bottom:-4%;

  font-size:22rem;
  font-weight:900;
  line-height:.8;
  letter-spacing:-0.05em;

  color:rgba(255,255,255,.035);

  user-select:none;
  pointer-events:none;
  white-space:nowrap;

  z-index:0;
}

  /* ================= Tablet ================= */

  @media (max-width:768px){

    .hero-content{
      padding:24px;
      padding-top:28px;
    }

    .hero-heading{
      font-size:clamp(3.2rem,13vw,4.3rem);
      line-height:.9;
      letter-spacing:-2px;
    }

    .hero-desc{
      margin-top:20px;
      max-width:100%;
      font-size:17px;
    }

    .hero-buttons{
  display:flex;
  gap:14px;
  margin-top:34px;
  flex-wrap:wrap;
}

.hero-btn{
  min-width:180px;
  height:52px;

  display:flex;
  align-items:center;
  justify-content:center;

  padding:0 24px;

  font-family:"Space Mono", monospace;
  font-size:13px;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;

  border-radius:6px;
}

    .hero-small{
      margin-top:18px;
      font-size:13px;
    }

    @media (max-width:768px){

  .hero-watermark{
    right:-22%;
    bottom:-2%;

    font-size:11rem;

    color:rgba(255,255,255,.03);

    z-index:0;
  }

}

  }

  /* ================= Phones ================= */

  @media (max-width:480px){

    .hero-content{
      padding:22px;
      padding-top:24px;
    }

    .hero-heading{
      font-size:3rem;
      letter-spacing:-1.5px;
    }

    .hero-desc{
      font-size:16px;
      line-height:1.6;
    }

    

    .hero-btn{
    
      height:52px;
      font-size:12px;
    }

    .hero-small{
      font-size:12px;
    }

    @media (max-width:480px){

  .hero-watermark{
    right:-28%;
    bottom:-2%;

    font-size:9rem;

    color:rgba(255,255,255,.03);

    z-index:0;
  }

}

  }
`}</style>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          maskImage: "linear-gradient(to bottom, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 90%, transparent)",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="bleed-tl" />
      <div className="bleed-br" />

      {/* Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-watermark">
          VERDICT
        </div>
      </div>

      {/* Content */}
      <div
          className="hero-content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "calc(100svh - 56px)",
            position: "relative",
            zIndex: 10,
          }}
        >

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="uppercase tracking-[0.25em] text-zinc-500 text-sm mb-8"
        >
          RoastMyResume.ai
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="hero-heading"
        >
          YOUR RESUME
          <br />
          WON'T SURVIVE
          <br />
          THIS REVIEW.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .25 }}
          className="hero-desc"
        >
          Get roasted by recruiters,
          evaluated by ATS systems,
          and judged by startup founders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .4 }}
          className="hero-buttons"
        >
          <button
  onClick={() =>
    document.getElementById("lp-demo")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
  className="hero-btn hero-btn-primary"
>
  Try Demo
</button>

          <button
            onClick={() => navigate("/upload")}
            className="hero-btn hero-btn-secondary"
          >
            Upload Resume
          </button>
        </motion.div>

        <p className="hero-small">
          Results in under 30 seconds
        </p>

      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 text-sm"
      >
        ↓ Scroll to see a demo roast
      </motion.div>

    </section>
  );
}