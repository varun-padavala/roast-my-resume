import { useNavigate } from "react-router-dom";

export default function AppNav({ navStep }) {
  const navigate = useNavigate();

  const STEPS = ["UPLOAD", "TARGET", "CONTEXT", "VERDICT", "ROAST"];

  return (
    <>
      <style>{`
       .app-nav{
          position: fixed;
          top: 0;
          left: 0;
          right: 0;

          width: 100%;

          z-index: 999;

          border-bottom:1px solid rgba(255,255,255,.06);
          background:rgba(8,8,8,.9);
          backdrop-filter:blur(12px);
        }

        .app-row{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:16px 40px;
          gap:24px;
        }

        .app-brand{
          display:flex;
          align-items:center;
          gap:18px;
        }

        .app-steps{
          display:flex;
          align-items:center;
        }

        .mobile-progress{
          display:none;
        }

        /* ---------- Tablet ---------- */

        @media(max-width:900px){

          .app-row{
            padding:14px 20px;
          }

          .app-steps{
            display:none;
          }

          .step-counter{
            display:none;
          }

          .mobile-progress{
            display:flex;
            align-items:center;
            gap:12px;

            padding:0 20px 14px;
          }

          .progress-track{
            flex:1;
            height:4px;
            border-radius:999px;
            background:rgba(255,255,255,.08);
            overflow:hidden;
          }

          .progress-fill{
            height:100%;
            background:#f0ede8;
            transition:.3s;
          }
        }
        .app-nav-spacer{
  height:56px;
}

@media(max-width:900px){
  .app-nav-spacer{
    height:82px;
  }
}

@media(max-width:600px){
  .app-nav-spacer{
    height:74px;
  }
}
        /* ---------- Phone ---------- */

        @media(max-width:600px){

          .app-row{
            padding:12px 16px;
          }

          .mobile-progress{
            padding:0 16px 12px;
          }

          .case-open{
            display:none;
          }

          .brand{
            font-size:18px !important;
          }

          .mobile-step{
            font-size:9px !important;
          }
        }
      `}</style>

      <nav className="app-nav">
        
  <div className="app-row">

    {/* Brand */}

    <div className="app-brand">

      <span
        className="brand"
        onClick={() => navigate("/")}
        style={{
          cursor: "pointer",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 20,
          letterSpacing: ".06em",
        }}
      >
        RoastMyResume.ai
      </span>

      <span
        className="case-open"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: ".1em",
          color: "rgba(255,255,255,.3)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#00d084",
            boxShadow: "0 0 6px #00d084",
            marginRight: 8,
          }}
        />
        CASE FILE OPEN
      </span>

      <span
        className="step-counter"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,.2)",
          letterSpacing: ".1em",
        }}
      >
        {navStep + 1} / {STEPS.length}
      </span>

    </div>

    {/* Desktop Steps */}

    <div className="app-steps">

      {STEPS.map((s, i) => {

        const active = i === navStep;
        const done = i < navStep;

        return (
          <div
            key={s}
            style={{ display: "flex", alignItems: "center" }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "5px 12px",
                borderRadius: 3,
                background: active ? "#f0ede8" : "transparent",
              }}
            >

              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: done
                    ? "#00d084"
                    : active
                    ? "#080808"
                    : "rgba(255,255,255,.1)",
                }}
              />

              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  letterSpacing: ".1em",
                  fontWeight: active ? 700 : 400,
                  color: active
                    ? "#080808"
                    : done
                    ? "rgba(255,255,255,.45)"
                    : "rgba(255,255,255,.2)",
                }}
              >
                {s}
              </span>

            </div>

            {i !== STEPS.length - 1 && (
              <div
                style={{
                  width: 20,
                  height: 1,
                  background: "rgba(255,255,255,.08)",
                }}
              />
            )}

          </div>
        );

      })}

    </div>

  </div>

  {/* Mobile Progress */}

  <div className="mobile-progress">

    <span
      className="mobile-step"
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 10,
        letterSpacing: ".08em",
        color: "#f0ede8",
        whiteSpace: "nowrap",
      }}
    >
      {STEPS[navStep]}
    </span>

    <div className="progress-track">
      <div
        className="progress-fill"
        style={{
          width: `${((navStep + 1) / STEPS.length) * 100}%`,
        }}
      />
    </div>

    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 10,
        color: "rgba(255,255,255,.35)",
      }}
    >
      {navStep + 1}/{STEPS.length}
    </span>

  </div>

</nav>

{/* Spacer */}
<div className="app-nav-spacer" />
    </>
  );
}