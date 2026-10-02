import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ResumeOrbitScene from "./ResumeOrbitScene";

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
        /* =========================================================
           HERO LAYOUT
        ========================================================= */

        .hero-content {
          position: relative;
          z-index: 10;

          width: 100%;
          max-width: 1500px;
          min-height: calc(100svh - 56px);

          margin: 0 auto;
          padding: 0 50px;

          display: grid;

          /*
            Give the text enough room to keep:

            YOUR RESUME
            WON'T SURVIVE
            THIS REVIEW.

            as exactly 3 lines.
          */
          grid-template-columns: minmax(680px, 0.95fr) minmax(560px, 1.05fr);

          align-items: center;
          gap: 0;
        }


        /* =========================================================
           LEFT HERO CONTENT
        ========================================================= */

        .hero-copy {
          position: relative;
          z-index: 20;

          width: 100%;
          max-width: 760px;
        }


        .hero-heading {
          margin: 0;

          /*
            Important:
            Prevent each manually-created line from wrapping.
          */
          white-space: nowrap;

          font-size: clamp(5rem, 6.3vw, 7rem);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -4px;

          color: #f0ede8;
        }


        .hero-desc {
          max-width: 640px;

          margin-top: 28px;

          color: #8b8b8b;

          font-size: 22px;
          line-height: 1.6;
        }


        /* =========================================================
           BUTTONS
        ========================================================= */

        .hero-buttons {
          display: flex;
          gap: 18px;

          margin-top: 42px;

          flex-wrap: wrap;
        }


        .hero-btn {
          min-width: 220px;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0 34px;

          font-family: "Space Mono", monospace;
          font-size: 14px;
          font-weight: 700;

          letter-spacing: 0.08em;
          text-transform: uppercase;

          cursor: pointer;

          border-radius: 8px;

          transition:
            transform 0.25s ease,
            background 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }


        .hero-btn:hover {
          transform: translateY(-3px);
        }


        .hero-btn-primary {
          background: #f0ede8;
          color: #111;

          border: 1px solid #f0ede8;

          box-shadow:
            0 12px 30px rgba(255, 255, 255, 0.08);
        }


        .hero-btn-primary:hover {
          background: #fff;

          box-shadow:
            0 18px 40px rgba(255, 255, 255, 0.12);
        }


        .hero-btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          color: #f0ede8;

          border: 1px solid rgba(255, 255, 255, 0.12);

          backdrop-filter: blur(10px);
        }


        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.06);

          border-color: rgba(255, 255, 255, 0.25);
        }


        .hero-small {
          margin-top: 22px;

          color: #666;

          font-size: 15px;
        }


        /* =========================================================
           ANIMATION AREA
        ========================================================= */

        .hero-orbit {
          position: relative;

          width: 100%;
          height: 720px;

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 5;

          /*
            Prevent the animation from changing the grid sizing.
          */
          min-width: 0;

          overflow: visible;

          pointer-events: none;
        }


        /*
          ResumeOrbitScene itself fills ONLY this box.
        */

        .hero-orbit > * {
          width: 100%;
          height: 100%;

          min-width: 0;
          min-height: 0;
        }


        /* =========================================================
           WATERMARK
        ========================================================= */

        .hero-watermark {
          position: absolute;

          right: -4%;
          bottom: -4%;

          font-size: 22rem;
          font-weight: 900;

          line-height: 0.8;
          letter-spacing: -0.05em;

          color: rgba(255, 255, 255, 0.035);

          user-select: none;
          pointer-events: none;

          white-space: nowrap;

          z-index: 0;
        }


        /* =========================================================
           SCROLL INDICATOR
        ========================================================= */

        .hero-scroll {
          position: absolute;

          bottom: 32px;
          left: 50%;

          transform: translateX(-50%);

          color: #666;

          font-size: 14px;

          z-index: 30;

          white-space: nowrap;
        }


        /* =========================================================
           LARGE TABLETS / SMALL LAPTOPS
        ========================================================= */

        @media (max-width: 1250px) {

          .hero-content {
            grid-template-columns:
              minmax(590px, 0.95fr)
              minmax(500px, 1.05fr);

            padding: 0 35px;
          }


          .hero-heading {
            font-size: clamp(4.7rem, 6vw, 6.2rem);
          }


          .hero-orbit {
            height: 640px;
          }

        }


        /* =========================================================
           TABLET
        ========================================================= */

        @media (max-width: 1050px) {

          .hero-content {
            grid-template-columns: 1fr 1fr;

            padding: 0 28px;
          }


          .hero-copy {
            max-width: 620px;
          }


          .hero-heading {
            font-size: clamp(4rem, 6.2vw, 5.5rem);
            letter-spacing: -3px;
          }


          .hero-desc {
            font-size: 18px;
          }


          .hero-orbit {
            height: 580px;
          }

        }


        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 768px) {

          .hero-content {
            display: flex;
            flex-direction: column;

            align-items: stretch;

            min-height: auto;

            padding: 30px 24px 80px;
          }


          .hero-copy {
            width: 100%;
            max-width: none;

            padding-top: 20px;
          }


          /*
            On mobile we allow wrapping again.
          */
          .hero-heading {
            white-space: normal;

            font-size: clamp(3.2rem, 13vw, 4.3rem);

            line-height: 0.9;

            letter-spacing: -2px;
          }


          .hero-desc {
            margin-top: 20px;

            max-width: 100%;

            font-size: 17px;
          }


          .hero-buttons {
            gap: 14px;

            margin-top: 34px;
          }


          .hero-btn {
            min-width: 180px;

            height: 52px;

            padding: 0 24px;

            font-size: 13px;
          }


          .hero-small {
            margin-top: 18px;

            font-size: 13px;
          }


          /*
            Animation becomes its own section underneath
            the hero text on mobile.
          */

          .hero-orbit {
            width: 100%;

            height: 520px;

            margin-top: -10px;

            flex-shrink: 0;
          }


          .hero-watermark {
            right: -22%;
            bottom: -2%;

            font-size: 11rem;

            color: rgba(255, 255, 255, 0.03);
          }


          .hero-scroll {
            display: none;
          }

        }


        /* =========================================================
           PHONES
        ========================================================= */

        @media (max-width: 480px) {

          .hero-content {
            padding: 24px 22px 60px;
          }


          .hero-heading {
            font-size: 3rem;

            letter-spacing: -1.5px;
          }


          .hero-desc {
            font-size: 16px;

            line-height: 1.6;
          }


          .hero-buttons {
            flex-direction: column;

            width: 100%;
          }


          .hero-btn {
            width: 100%;

            height: 52px;

            font-size: 12px;
          }


          .hero-small {
            font-size: 12px;
          }


          .hero-orbit {
            height: 440px;

            margin-top: 10px;
          }


          .hero-watermark {
            right: -28%;
            bottom: -2%;

            font-size: 9rem;

            color: rgba(255, 255, 255, 0.03);
          }

        }
      `}</style>


      {/* =========================================================
          BACKGROUND GRID
      ========================================================= */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 90%, transparent)",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                white 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                white 1px,
                transparent 1px
              )
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>


      {/* Existing bleed effects */}

      <div className="bleed-tl" />
      <div className="bleed-br" />


      {/* =========================================================
          WATERMARK
      ========================================================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-watermark">
          VERDICT
        </div>
      </div>


      {/* =========================================================
          MAIN HERO
      ========================================================= */}

      <div className="hero-content">


        {/* =======================================================
            LEFT — TEXT
        ======================================================= */}

        <div className="hero-copy">

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="uppercase tracking-[0.25em] text-zinc-500 text-sm mb-8"
          >
            RoastMyResume.ai
          </motion.p>


          <motion.h1
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="hero-heading"
          >
            YOUR RESUME
            <br />
            WON'T SURVIVE
            <br />
            THIS REVIEW.
          </motion.h1>


          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.25,
            }}
            className="hero-desc"
          >
            Get roasted by recruiters,
            evaluated by ATS systems,
            and judged by startup founders.
          </motion.p>


          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.4,
            }}
            className="hero-buttons"
          >

            <button
              onClick={() =>
                document
                  .getElementById("lp-demo")
                  ?.scrollIntoView({
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


        {/* =======================================================
            RIGHT — RESUME ORBIT ANIMATION
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="hero-orbit"
        >
          <ResumeOrbitScene />
        </motion.div>

      </div>


      {/* =========================================================
          SCROLL INDICATOR
      ========================================================= */}

      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="hero-scroll hidden md:block"
      >
        ↓ Scroll to see a demo roast
      </motion.div>

    </section>
  );
}