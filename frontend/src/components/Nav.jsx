import { useNavigate } from "react-router-dom";

export default function Nav({ onUpload, onDemo }) {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
  .nav{
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index:100;

    display:flex;
    align-items:center;
    justify-content:space-between;

    height:56px;
    padding:0 32px;

    border-bottom:1px solid rgba(255,255,255,.06);

    background:rgba(8,8,8,.92);
    backdrop-filter:blur(14px);
  }

  .nav-left{
    display:flex;
    align-items:center;
    min-width:0;
  }

  .nav-right{
    display:flex;
    align-items:center;
    gap:10px;
    flex-shrink:0;
  }

  .nav-brand{
  font-family:"Bebas Neue", sans-serif;
  font-size:20px;
  letter-spacing:.06em;
  line-height:1;

  color:#f0ede8;

  padding-right:18px;
  border-right:1px solid rgba(255,255,255,.08);

  cursor:pointer;
  white-space:nowrap;

  transition:.25s;
}

.nav-brand:hover{
  color:#fff;
}

  .nav-file-tag{
    display:flex;
    align-items:center;
    gap:8px;

    padding-left:18px;

    font-family:"Space Mono", monospace;
    font-size:10px;
    letter-spacing:.12em;
    text-transform:uppercase;

    color:rgba(255,255,255,.35);

    white-space:nowrap;
  }

  .nav-pulse{
    width:6px;
    height:6px;
    border-radius:50%;

    background:#00d00d;
    box-shadow:0 0 8px rgba(0,208,13,.6);

    animation:pulse 2s infinite;
  }

  @keyframes pulse{
    0%,100%{
      opacity:.5;
    }

    50%{
      opacity:1;
    }
  }

  .nav-btn{
    height:42px;
    padding:0 18px;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:6px;

    border:1px solid rgba(255,255,255,.1);

    background:transparent;
    color:rgba(255,255,255,.72);

    font-family:"Space Mono", monospace;
    font-size:11px;
    font-weight:700;
    letter-spacing:.08em;
    text-transform:uppercase;

    cursor:pointer;
    transition:all .25s ease;

    white-space:nowrap;
  }

  .nav-btn:hover{
    border-color:rgba(255,255,255,.25);
    background:rgba(255,255,255,.04);
    color:#fff;
  }

  .nav-btn-primary{
    background:#f0ede8;
    color:#111;
    border-color:#f0ede8;
  }

  .nav-btn-primary:hover{
    background:#fff;
    color:#111;
  }

  /* ---------------- Tablet ---------------- */

  @media (max-width:768px){

    .nav{
      padding:0 18px;
    }

    .nav-brand{
      font-size:10px;
      padding-right:12px;
      letter-spacing:.12em;
    }

    .nav-file-tag{
      font-size:9px;
      padding-left:12px;
    }

    .nav-btn{
      height:40px;
      padding:0 14px;
      font-size:10px;
    }

  }

  /* ---------------- Mobile ---------------- */

  @media (max-width:520px){

    .nav{
      padding:0 14px;
    }

    .nav-file-tag{
      display:none;
    }

    .nav-brand{
      border-right:none;
      padding-right:0;
      font-size:10px;
      letter-spacing:.08em;
    }

    .nav-right{
      gap:8px;
    }

    .nav-btn{
      height:38px;
      padding:0 12px;
      font-size:9px;
    }

  }

  /* ---------------- Small Phones ---------------- */

  @media (max-width:390px){

    .nav{
      padding:0 10px;
    }

    .nav-brand{
      font-size:9px;
      max-width:125px;
      overflow:hidden;
      text-overflow:ellipsis;
    }

    .nav-btn{
      padding:0 10px;
      font-size:8px;
    }

    /* Hide secondary action */
    .nav-btn:first-child{
      display:none;
    }

  }
    @media (max-width:768px){

  .nav-brand{
    font-size:18px;
    letter-spacing:.05em;
    padding-right:14px;
  }

}

@media (max-width:520px){

  .nav-brand{
    font-size:17px;
    border-right:none;
    padding-right:0;
  }

}

@media (max-width:390px){

  .nav-brand{
    font-size:16px;
  }

}
`}</style>

      <nav className="nav">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            className="nav-brand"
            onClick={() => navigate("/")}
          >
            RoastMyResume.ai
          </span>

          <span className="nav-file-tag">
            <span className="nav-pulse" />
            CASE FILE OPEN 
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            className="nav-btn"
            onClick={() =>
              navigate("/roast", {
                state: { navType: "roast" }
              })
            }
          >
            ROAST
          </button>

          <button
            className="nav-btn nav-btn-primary"
            onClick={() => navigate('/upload')}
          >
            UPLOAD RESUME →
          </button>
        </div>
      </nav>
    </>
  );
}