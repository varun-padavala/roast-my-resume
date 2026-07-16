import { useNavigate } from "react-router-dom";

export default function RoastNav({
  resumeLoaded,
  onGoHome,
  name,
}) {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .roast-nav{
          height:60px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 32px;

          border-bottom:1px solid rgba(255,255,255,.06);

          background:rgba(8,8,8,.95);
          backdrop-filter:blur(10px);

          flex-shrink:0;
        }

        .roast-nav-left{
          display:flex;
          align-items:center;
          gap:18px;
          min-width:0;
        }

        .roast-logo{
          cursor:pointer;

          font-family:'Bebas Neue',sans-serif;
          font-size:20px;
          letter-spacing:.06em;

          color:#f0ede8;

          white-space:nowrap;
          flex-shrink:0;
        }

        .case-status{
          display:flex;
          align-items:center;
          gap:8px;

          font-family:'Space Mono',monospace;
          font-size:10px;
          letter-spacing:.1em;

          color:rgba(255,255,255,.28);

          white-space:nowrap;
        }

        .case-dot{
          width:7px;
          height:7px;
          border-radius:50%;
          background:#00d084;
          box-shadow:0 0 6px #00d084;

          animation:pulse 1.8s infinite;
        }

        .resume-status{
          font-family:'Space Mono',monospace;
          font-size:9px;
          letter-spacing:.12em;
          text-transform:uppercase;

          color:${
            resumeLoaded
              ? "rgba(0,208,132,.75)"
              : "rgba(255,255,255,.18)"
          };

          white-space:nowrap;
        }

        @keyframes pulse{
          0%,100%{opacity:.45;}
          50%{opacity:1;}
        }

        /* ---------------- Mobile ---------------- */

        @media (max-width:768px){

          .roast-nav{
            height:54px;
            padding:0 14px;
          }

          .roast-nav-left{
            gap:10px;
          }

          .roast-logo{
            font-size:15px;
          }

          .case-status{
            font-size:8px;
            gap:6px;
          }

          .resume-status{
            display:none;
          }

        }

        @media (max-width:420px){

          .case-status{
            display:none;
          }

          .roast-logo{
            font-size:14px;
          }

        }
      `}</style>

      <nav className="roast-nav">

        <div className="roast-nav-left">

          <span
            className="roast-logo"
            onClick={() => navigate("/")}
          >
            RoastMyResume.ai
          </span>

          <div className="case-status">
            <span className="case-dot" />
            CASE FILE OPEN
          </div>

        </div>

        <div className="resume-status">
          {resumeLoaded
            ? `● ${name} LOADED`
            : "● NO FILE LOADED"}
        </div>

      </nav>
    </>
  );
}