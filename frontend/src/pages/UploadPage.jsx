import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import { useState, useCallback, useRef, useEffect } from "react";
import { DEMO_RESUME } from "../data/demoResume";
import AppNav from "../components/Appnav";
import { API_URL } from "../config";

function Eyebrow({ children }) {
  return (
    <div className="up-eyebrow">
      {children}
    </div>
  );
}

function BigHeadline({ children }) {
  return (
    <h1 className="up-h1">
      {children}
    </h1>
  );
}

function Sub({ children }) {
  return (
    <p className="up-sub">
      {children}
    </p>
  );
}

function Ghost({ children }) {
  return (
    <span className="up-ghost">
      {children}
    </span>
  );
}

export default function Upload() {
  const navigate = useNavigate();

  const {
    setResumeText,
    setFileName,
    setResumeLoaded,
  } = useResume();

  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    await uploadResumeFile(file);
  }, []);

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    e.target.value = "";

    await uploadResumeFile(file);
  };

  const uploadResumeFile = async (file) => {
    try {
      const formData = new FormData();

      formData.append("resume", file);

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed (${res.status})`);
      }

      const data = await res.json();

      setResumeText(data.resumeText);
      setFileName(data.fileName);
      setResumeLoaded(true);

      navigate("/target");
    } catch (err) {
      console.error(err);
    }
  };

  const useDemo = () => {
    const demoText = DEMO_RESUME
      .map((item) => item.text)
      .join("\n");

    setResumeText(demoText);
    setFileName("demo-resume.txt");
    setResumeLoaded(true);

    navigate("/target");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`

        @import url(
          'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&display=swap'
        );

        /* =====================================================
           ROOT
        ===================================================== */

        html,
        body,
        #root {
          width:100%;
          height:100%;
          margin:0;
          padding:0;
          overflow:hidden;
        }

        .upload-page {
          --nav-height:56px;

          width:100%;
          height:100dvh;

          position:relative;
          isolation:isolate;

          overflow:hidden;

          background:#080808;
          color:#f0ede8;

          font-family:'DM Sans',sans-serif;
        }


        /* =====================================================
           SOFT GRID
           
           Instead of making the entire grid bright, the grid
           fades naturally toward the edges.
        ===================================================== */

        .upload-grid {
          position:absolute;
          inset:0;

          pointer-events:none;
          z-index:0;

          opacity:.55;

          background-image:
            linear-gradient(
              to right,
              rgba(255,255,255,.055) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255,255,255,.055) 1px,
              transparent 1px
            );

          background-size:80px 80px;

          /*
            Soft vignette over the grid.
            Center stays visible while edges disappear.
          */
          mask-image:
            radial-gradient(
              ellipse 85% 75% at 50% 48%,
              black 0%,
              rgba(0,0,0,.85) 45%,
              transparent 100%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse 85% 75% at 50% 48%,
              black 0%,
              rgba(0,0,0,.85) 45%,
              transparent 100%
            );
        }


        /* =====================================================
           SUBTLE ATMOSPHERE
        ===================================================== */

        .upload-glow {
          position:absolute;
          width:55vw;
          height:55vw;

          max-width:800px;
          max-height:800px;

          right:-10%;
          top:8%;

          pointer-events:none;
          z-index:0;

          background:
            radial-gradient(
              circle,
              rgba(0,208,132,.055) 0%,
              rgba(0,208,132,.025) 35%,
              transparent 70%
            );

          filter:blur(20px);
        }


        .upload-vignette {
          position:absolute;
          inset:0;

          pointer-events:none;
          z-index:1;

          background:
            radial-gradient(
              ellipse at center,
              transparent 45%,
              rgba(0,0,0,.22) 100%
            );
        }


        /* =====================================================
           WATERMARK
        ===================================================== */

        .watermark {
          position:absolute;

          right:4%;
          top:13%;

          font-family:'Bebas Neue',sans-serif;

          font-size:clamp(
            160px,
            18vw,
            300px
          );

          line-height:.8;

          color:rgba(255,255,255,.025);

          letter-spacing:-.04em;

          white-space:nowrap;

          pointer-events:none;
          user-select:none;

          z-index:0;
        }


        /* =====================================================
           MAIN AREA
        ===================================================== */

        .upload-main {
          position:relative;
          z-index:2;

          height:calc(
            100dvh - var(--nav-height)
          );

          max-width:1400px;

          margin:0 auto;

          padding:
            18px
            clamp(24px,4vw,64px)
            18px;

          display:flex;
          flex-direction:column;

          justify-content:center;

          overflow:hidden;
        }


        /* =====================================================
           BACK BUTTON
        ===================================================== */

        .up-back {
          align-self:flex-start;

          display:inline-flex;
          align-items:center;
          gap:8px;

          margin-bottom:
            clamp(12px,1.8dvh,20px);

          padding:0;

          background:none;
          border:none;

          color:rgba(255,255,255,.4);

          cursor:pointer;

          font-family:'Space Mono',monospace;
          font-size:10px;

          letter-spacing:.08em;
          text-transform:uppercase;

          transition:
            color .2s ease,
            transform .2s ease;
        }

        .up-back:hover {
          color:#f0ede8;
          transform:translateX(-3px);
        }


        /* =====================================================
           CONTENT
        ===================================================== */

        .upload-content {
          width:100%;
          max-width:900px;

          animation:
            uploadEnter
            .45s
            cubic-bezier(.16,1,.3,1)
            both;
        }

        @keyframes uploadEnter {
          from {
            opacity:0;
            transform:translateY(14px);
          }

          to {
            opacity:1;
            transform:translateY(0);
          }
        }


        .up-eyebrow {
          margin-bottom:
            clamp(8px,1.5dvh,14px);

          font-family:'Space Mono',monospace;

          font-size:10px;

          letter-spacing:.15em;

          color:rgba(255,255,255,.25);

          text-transform:uppercase;
        }


        /* =====================================================
           HEADLINE
        ===================================================== */

        .up-h1 {
          margin:0;

          font-family:'Bebas Neue',sans-serif;

          font-weight:400;

          font-size:
            clamp(
              54px,
              min(8.5dvh,6.5vw),
              100px
            );

          line-height:.86;

          letter-spacing:-.01em;

          color:#f0ede8;
        }

        .up-ghost {
          color:transparent;

          -webkit-text-stroke:
            1.5px #f0ede8;
        }


        /* =====================================================
           DESCRIPTION
        ===================================================== */

        .up-sub {
          max-width:480px;

          margin:
            clamp(12px,2dvh,20px)
            0
            clamp(16px,2.5dvh,26px);

          color:rgba(255,255,255,.36);

          font-family:'DM Sans',sans-serif;

          font-size:14px;

          line-height:1.55;
        }


        /* =====================================================
           DROP ZONE
        ===================================================== */

        .upload-drop {
          position:relative;

          width:100%;

          min-height:
            clamp(
              150px,
              24dvh,
              230px
            );

          display:flex;
          flex-direction:column;

          align-items:center;
          justify-content:center;

          text-align:center;

          padding:
            24px
            30px;

          border:
            1px solid rgba(255,255,255,.08);

          border-radius:6px;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.025),
              rgba(255,255,255,.008)
            );

          cursor:pointer;

          transition:
            border-color .2s ease,
            background .2s ease,
            transform .2s ease;
        }

        .upload-drop:hover {
          border-color:rgba(255,255,255,.2);

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.045),
              rgba(255,255,255,.015)
            );

          transform:translateY(-1px);
        }

        .upload-drop.is-dragging {
          border-color:#00d084;

          background:
            rgba(0,208,132,.045);

          box-shadow:
            0 0 40px rgba(0,208,132,.05);
        }


        /* =====================================================
           CORNERS
        ===================================================== */

        .corner {
          position:absolute;

          width:14px;
          height:14px;

          border-color:
            rgba(255,255,255,.22);

          border-style:solid;
        }

        .corner-bl {
          bottom:-1px;
          left:-1px;

          border-width:
            0
            0
            1px
            1px;
        }

        .corner-br {
          bottom:-1px;
          right:-1px;

          border-width:
            0
            1px
            1px
            0;
        }


        /* =====================================================
           UPLOAD ICON
        ===================================================== */

        .upload-icon {
          font-size:
            clamp(
              28px,
              4dvh,
              38px
            );

          line-height:1;

          opacity:.35;

          margin-bottom:
            clamp(8px,1.2dvh,14px);
        }


        .upload-title {
          font-family:'Bebas Neue',sans-serif;

          font-size:
            clamp(
              20px,
              3dvh,
              28px
            );

          letter-spacing:.08em;

          line-height:1;

          color:#f0ede8;

          margin-bottom:8px;
        }


        .upload-hint {
          font-family:'Space Mono',monospace;

          font-size:10px;

          letter-spacing:.1em;

          text-transform:uppercase;

          color:rgba(255,255,255,.28);
        }


        /* =====================================================
           DEMO
        ===================================================== */

        .upload-or {
          display:flex;
          align-items:center;

          gap:12px;

          margin:
            10px
            0;

          font-family:'Space Mono',monospace;

          font-size:10px;

          letter-spacing:.08em;

          color:rgba(255,255,255,.18);
        }

        .upload-or::before,
        .upload-or::after {
          content:"";

          flex:1;

          height:1px;

          background:
            rgba(255,255,255,.07);
        }


        .demo-button {
          width:100%;

          padding:
            clamp(10px,1.8dvh,14px);

          background:
            rgba(255,255,255,.015);

          color:
            rgba(255,255,255,.35);

          border:
            1px solid rgba(255,255,255,.08);

          border-radius:4px;

          font-family:'Space Mono',monospace;

          font-size:10px;

          letter-spacing:.1em;

          text-transform:uppercase;

          cursor:pointer;

          transition:
            color .2s ease,
            border-color .2s ease,
            background .2s ease;
        }

        .demo-button:hover {
          color:#f0ede8;

          border-color:
            rgba(255,255,255,.22);

          background:
            rgba(255,255,255,.035);
        }


        /* =====================================================
           DESKTOP HEIGHT FIX
        ===================================================== */

        @media (max-height:760px) {

          .upload-main {
            padding-top:10px;
            padding-bottom:10px;
          }

          .up-back {
            margin-bottom:8px;
          }

          .up-eyebrow {
            display:none;
          }

          .up-sub {
            margin-top:10px;
            margin-bottom:14px;
          }

          .upload-drop {
            min-height:145px;
          }

        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width:900px) {

          .upload-page {
            --nav-height:82px;
          }

          .upload-main {
            padding:
              14px
              24px
              14px;
          }

          .watermark {
            right:-8%;
            top:22%;
            font-size:180px;
          }

        }


        /* =====================================================
           PHONE
        ===================================================== */

        @media (max-width:600px) {

          .upload-page {
            --nav-height:74px;
          }

          .upload-main {
            padding:
              12px
              18px
              12px;
          }

          .up-back {
            font-size:9px;
            margin-bottom:10px;
          }

          .up-eyebrow {
            display:none;
          }

          .up-h1 {
            font-size:
              clamp(
                48px,
                15vw,
                70px
              );
          }

          .up-sub {
            font-size:13px;
            margin:
              12px
              0
              16px;
          }

          .upload-drop {
            min-height:150px;
            padding:20px;
          }

          .upload-title {
            font-size:20px;
          }

          .upload-hint {
            font-size:9px;
          }

          .watermark {
            top:34%;
            right:auto;
            left:50%;

            transform:
              translateX(-50%);

            font-size:
              clamp(
                120px,
                34vw,
                180px
              );

            color:
              rgba(255,255,255,.025);
          }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion:reduce) {

          .upload-content {
            animation:none;
          }

          .upload-drop {
            transition:none;
          }

        }

      `}</style>

      <div className="upload-page">

        {/* Background */}
        <div className="upload-grid" />
        <div className="upload-glow" />
        <div className="upload-vignette" />

        <div className="bleed-br" />
        <div className="bleed-tl" />

        <div className="watermark">
          UPLOAD
        </div>

        {/* Navigation */}
        <AppNav navStep={0} />

        {/* Main content */}
        <main className="upload-main">

          <button
            className="up-back"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className="upload-content">

            <Eyebrow>
              01 / UPLOAD RESUME
            </Eyebrow>

            <BigHeadline>
              DROP IT.<br />
              <Ghost>WE'LL HANDLE</Ghost><br />
              THE REST.
            </BigHeadline>

            <Sub>
              PDF, DOCX, or TXT. We'll extract every word
              and run it through the machine.
            </Sub>

            {/* Drop zone */}
            <div
              className={`upload-drop ${
                dragging ? "is-dragging" : ""
              }`}
              role="button"
              tabIndex={0}

              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}

              onDragLeave={() => {
                setDragging(false);
              }}

              onDrop={handleDrop}

              onClick={() => {
                fileRef.current?.click();
              }}

              onKeyDown={(e) => {
                if (
                  e.key === "Enter" ||
                  e.key === " "
                ) {
                  e.preventDefault();
                  fileRef.current?.click();
                }
              }}
            >

              <div className="corner corner-bl" />
              <div className="corner corner-br" />

              <div className="upload-icon">
                📄
              </div>

              <div className="upload-title">
                {dragging
                  ? "RELEASE TO UPLOAD"
                  : "DRAG & DROP YOUR RESUME"}
              </div>

              <div className="upload-hint">
                or click to browse — PDF, DOCX, TXT
              </div>

              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.txt"
                style={{ display: "none" }}
                onChange={handleFile}
              />

            </div>

            <div className="upload-or">
              or
            </div>

            <button
              className="demo-button"
              onClick={useDemo}
            >
              USE DEMO RESUME INSTEAD →
            </button>

          </div>

        </main>

      </div>
    </>
  );
}