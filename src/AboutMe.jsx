import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    upper: [
      "Hi! I'm Anson, a second-year computer engineering student at UBC.",
      "Born in Hong Kong, raised in Australia for 15 years.",
      "I'm passionate about software engineering and machine learning.",
      "I enjoy playing tennis, the trumpet, and League of Legends.",
    ],
    lower: "current mains: ahri and shen",
  },
  {
    upper: [
      "Education: University of British Columbia",
      "Major: Computer Engineering",
      "Dean's List: 2024W, 2025W",
    ],
    lower: "expected graduation: 2029",
  },
  {
    upper: [
      "Currently working on:",
      "an NLP engine analyzing user feedback for sentiment analysis",
      "an OpenCV project recreating Jujutsu Kaisen cursed techniques from hand signals.",
      "learning system design.",
    ],
    lower: "also trying to hit plat in league",
  },
];

const ROLES = [
  { text: "LEAD", color: "#e8c100" },
  { text: "BUILD", color: "#4a8fff" },
  { text: "GROW", color: "#4a8fff" },
];

const ITEMS = [
  { id: "about", label: "ABOUT ME" },
  { id: "education", label: "EDUCATION" },
  { id: "projects", label: "CURRENT WORK" },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter" || e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") setRevealed(false);
      if (e.key === "Escape") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      {/* dim overlay */}
      {revealed && <div className="sc-dim" />}

      {/* reveal panel */}
      {revealed && (
        <div className={`sc-reveal-panel ${mounted ? "mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div key={line} className="sc-reveal-upper-line">
                {line}
              </div>
            ))}
          </div>

          <div className="sc-reveal-lower-bar">
            {REVEAL_CONTENT[active].lower}
          </div>
        </div>
      )}

      {/* portrait */}
      {revealed && (
        <div className={`sc-main-portrait-shell ${mounted ? "mounted" : ""}`}>
          <img src={MAIN_IMAGES[active]} className="sc-main-portrait" />
        </div>
      )}

      {/* NAV BARS */}
      <div className="sc-root">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer ${active === i ? "active" : ""} ${mounted ? "mounted" : ""}`}
            onMouseEnter={() => {
              if (revealed) return;
              setActive(i);
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} />

              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-label">{item.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE CONTROLS */}
      <div className="sc-mobile-controls">
        <button onClick={() => navigate(-1)}>BACK</button>
        <button onClick={() => setRevealed((r) => !r)}>
          {revealed ? "HIDE" : "REVEAL"}
        </button>
      </div>

      <style>{`
        #menu-screen {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: black;
        }

        video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .sc-root {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 5;
        }

        .sc-bar-outer {
          transform: translateX(-120%);
          transition: transform 0.5s ease;
        }

        .sc-bar-outer.mounted {
          transform: translateX(0);
        }

        .sc-bar {
          width: 420px;
          height: 70px;
          background: #111;
          display: flex;
          align-items: center;
          clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%);
          cursor: pointer;
          position: relative;
        }

        .sc-bar-red {
          position: absolute;
          inset: 0;
          background: #c4001a;
          opacity: 0;
        }

        .sc-bar-outer.active .sc-bar-red {
          opacity: 1;
        }

        .sc-char {
          height: 100%;
          width: 80px;
          object-fit: cover;
        }

        .sc-bar-content {
          display: flex;
          flex-direction: column;
          padding-left: 16px;
          color: white;
        }

        .sc-role {
          font-size: 12px;
          opacity: 0.7;
        }

        .sc-label {
          font-size: 22px;
          font-weight: 600;
        }

        /* REVEAL */
        .sc-dim {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 10;
        }

        .sc-reveal-panel {
          position: absolute;
          top: 20%;
          left: 10%;
          width: 60%;
          height: 60%;
          background: white;
          z-index: 11;
          padding: 24px;
          transform: translateY(40px);
          opacity: 0;
          transition: 0.4s ease;
        }

        .sc-reveal-panel.mounted {
          transform: translateY(0);
          opacity: 1;
        }

        .sc-reveal-upper-bar {
          background: black;
          color: white;
          padding: 16px;
        }

        .sc-reveal-lower-bar {
          margin-top: 20px;
          font-size: 18px;
        }

        .sc-main-portrait-shell {
          position: absolute;
          right: 0;
          top: 0;
          width: 40%;
          height: 100%;
          z-index: 9;
        }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sc-mobile-controls {
          position: absolute;
          bottom: 20px;
          left: 20px;
          display: none;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .sc-mobile-controls {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
