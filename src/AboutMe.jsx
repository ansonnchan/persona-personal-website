import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";

import bgVideo from "./assets/main2-web.mp4";

import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    upper: [
      "Hi! I'm Anson, a second-year computer engineering student at UBC.",
      " I was born in Hong Kong, but was raised in Australia for 15 years.",
      "I'm passionate about software development and machine learning.",
      "I also enjoy playing tennis, trumpet, and League of Legends in my free time.",
    ],
    lower: "current mains: ahri and shen",
  },
  {
    upper: [
      "Education: University of British Columbia (UBC)",
      "Major: Computer Engineering",
      "Dean's List: 2024W, 2025W",
    ],
    lower: "expected graduation: 2029",
  },
  {
    upper: [
      "Currently working on:",
      "NLP engine that analyzes user feedback and generates sentiment reports.",
      "OpenCV project recreating Jujutsu Kaisen cursed techniques from hand signals.",
      "Learning system design.",
    ],
    lower: "Also pushing plat in league",
  },
];

const ROLES = [
  { text: "LEADER" },
  { text: "PARTY" },
  { text: "PARTY" },
];

const ITEMS = [
  { id: "profile", label: "PROFILE" },
  { id: "education", label: "EDUCATION" },
  { id: "goals", label: "CURRENTLY WORKING ON" },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") {
        setRevealed(false);
        setActive((i) => Math.max(0, i - 1));
      }

      if (e.key === "ArrowDown") {
        setRevealed(false);
        setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      }

      if (e.key === "Enter" || e.key === "ArrowRight") {
        setRevealed(true);
      }

      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }

      if (e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, revealed]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      {revealed && <div className="sc-dim" />}

      {/* MAIN PORTRAIT */}
      {revealed && (
        <div className={`sc-main-portrait-shell ${mounted ? "mounted" : ""}`}>
          <div className="sc-portrait-overlay" />

          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[active]}
            alt=""
          />
        </div>
      )}

      {/* DIVIDER */}
      {revealed && <div className="sc-divider" />}

      {/* PANEL */}
      {revealed && (
        <div className={`sc-reveal-panel ${mounted ? "mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>
                {line}
              </div>
            ))}
          </div>

          <div className="sc-reveal-lower-bar">
            {REVEAL_CONTENT[active].lower}
          </div>
        </div>
      )}

      {/* NAV */}
      {revealed && (
        <div className="sc-right-nav">
          <span className="sc-nav-arrow">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow">►</span>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        #menu-screen {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #0f1725;
        }

        video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.45);
        }

        .sc-dim {
          position: absolute;
          inset: 0;
          background: rgba(10, 14, 20, 0.55);
          z-index: 2;
          backdrop-filter: blur(2px);
        }

        /* =========================
           RIGHT CHARACTER
        ========================== */

        .sc-main-portrait-shell {
          position: absolute;
          top: 0;
          right: 0;

          width: 50vw;
          height: 100vh;

          z-index: 5;
          overflow: hidden;

          opacity: 0;
          transform: translateX(60px);

          transition:
            opacity 0.5s ease,
            transform 0.5s ease;

          clip-path: polygon(
            13% 0,
            100% 0,
            100% 100%,
            0 100%,
            6% 70%,
            10% 28%
          );
        }

        .sc-main-portrait-shell.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .sc-portrait-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              135deg,
              rgba(0,255,255,0.14),
              rgba(0,150,255,0.03)
            );

          z-index: 2;
          pointer-events: none;
        }

        /* =========================
           DIVIDER
        ========================== */

        .sc-divider {
          position: absolute;

          top: -10%;
          right: 46vw;

          width: 7vw;
          height: 120vh;

          background:
            linear-gradient(
              to bottom,
              rgba(255,255,255,0.9),
              rgba(255,255,255,0.15)
            );

          transform: skewX(-18deg);

          z-index: 6;

          opacity: 0.75;
          mix-blend-mode: screen;
        }

        /* =========================
           MAIN PANEL
        ========================== */

        .sc-reveal-panel {
          position: absolute;

          left: -4vw;
          top: 22vh;

          width: 72vw;
          height: 42vh;

          z-index: 10;

          opacity: 0;

          transform:
            translateX(-40px)
            rotate(-8deg);

          transition:
            opacity 0.45s ease,
            transform 0.45s ease;
        }

        .sc-reveal-panel.mounted {
          opacity: 1;

          transform:
            translateX(0)
            rotate(-8deg);
        }

        /* TOP BLACK BAR */

        .sc-reveal-upper-bar {
          position: absolute;

          width: 78%;
          height: 50%;

          top: 0;
          left: 0;

          background:
            linear-gradient(
              135deg,
              rgba(8,8,8,0.98),
              rgba(28,28,28,0.95)
            );

          clip-path: polygon(
            0 0,
            100% 0,
            calc(100% - 42px) 100%,
            0 100%
          );

          border-top: 5px solid #e63c45;

          display: flex;
          flex-direction: column;
          justify-content: center;

          padding:
            34px
            70px
            34px
            110px;

          box-shadow:
            0 12px 40px rgba(0,0,0,0.5);

          overflow: hidden;
        }

        .sc-reveal-upper-bar::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,0.06),
              transparent
            );

          pointer-events: none;
        }

        .sc-reveal-upper-line {
          font-family: 'Bebas Neue', sans-serif;

          color: white;

          font-size: clamp(22px, 1.5vw, 34px);

          letter-spacing: 1px;
          line-height: 1.18;

          margin-bottom: 4px;
        }

        /* LOWER BAR */

        .sc-reveal-lower-bar {
          position: absolute;

          top: 56%;
          right: 6%;

          width: 36%;
          min-height: 18%;

          background:
            linear-gradient(
              135deg,
              rgba(8,8,8,0.98),
              rgba(28,28,28,0.95)
            );

          clip-path: polygon(
            0 0,
            100% 0,
            calc(100% - 28px) 100%,
            0 100%
          );

          color: white;

          font-family: 'Bebas Neue', sans-serif;

          font-size: clamp(20px, 1.45vw, 28px);

          display: flex;
          align-items: center;

          padding:
            14px
            24px;

          box-shadow:
            0 10px 30px rgba(0,0,0,0.4);
        }

        /* =========================
           NAV
        ========================== */

        .sc-right-nav {
          position: absolute;

          top: 7vh;
          left: 5vw;

          display: flex;
          align-items: center;
          gap: 10px;

          z-index: 20;

          transform: rotate(-6deg);
        }

        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 58px;

          color: white;

          letter-spacing: 3px;

          text-shadow:
            0 3px 12px rgba(0,0,0,0.6);
        }

        .sc-nav-dot {
          width: 12px;
          height: 12px;

          border-radius: 50%;

          background: white;

          opacity: 0.7;
        }

        .sc-nav-arrow {
          color: #e63946;

          font-size: 18px;
        }

        /* =========================
           LEFT MENU
        ========================== */

        .sc-root {
          position: absolute;

          left: 0;
          top: 0;

          width: 100%;
          height: 100%;

          z-index: 15;

          display: flex;
          flex-direction: column;
          justify-content: center;

          gap: 22px;

          padding-left: 4vw;
        }

        .sc-bar-outer {
          position: relative;

          width: 45vw;

          flex-shrink: 0;

          pointer-events: none;

          transform: translateX(-100%);

          transition:
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45vw; height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease, height 0.3s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        .sc-bar {
          position: relative;

          width: 45vw; height: 64px;

          background:
            linear-gradient(
              135deg,
              rgba(8,8,8,0.94),
              rgba(22,22,22,0.94)
            );

          overflow: hidden;

          pointer-events: none;

          clip-path: polygon(
            0 0,
            100% 0,
            calc(100% - 18px) 100%,
            0 100%
          );

          transition:
            all 0.25s ease;

          box-shadow:
            0 10px 25px rgba(0,0,0,0.4);
        }

        .sc-bar-outer.active .sc-bar {
          transform: translateX(18px);

          background:
            linear-gradient(
              135deg,
              rgba(245,245,245,0.98),
              rgba(215,215,215,0.96)
            );
        }

        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .sc-bar-fill {
          position: absolute;
          inset: 0; width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0; left: 73%; width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        .sc-char {
          position: absolute;

          top: 0;
          left: 0;

          width: 120px;
          height: 100%;

          object-fit: cover;

          opacity: 0.55;

          mix-blend-mode: screen;

          pointer-events: none;
        }

        .sc-bar-content {
          position: relative;

          z-index: 3;

          height: 100%;

          display: flex;
          align-items: center;

          padding-left: 130px;
          padding-right: 26px;
        }

        .sc-role {
          position: absolute;

          left: -18px;

          font-family: 'Bebas Neue', sans-serif;

          font-size: 58px;

          color: rgba(255,255,255,0.08);

          transform:
            rotate(-90deg);

          letter-spacing: 2px;
        }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 32px;

          letter-spacing: 3px;

          color: white;

          transition:
            color 0.25s ease;
        }

        .sc-bar-outer.active .sc-label {
          color: #111;
        }

        /* =========================
           FOOTER
        ========================== */

        .sc-footer {
          position: fixed;

          bottom: 24px;
          right: 28px;

          z-index: 30;

          background: rgba(0,0,0,0.5);

          border: 1px solid rgba(255,255,255,0.2);

          padding: 12px 16px;

          border-radius: 12px;

          backdrop-filter: blur(8px);
        }

        .sc-footer-row {
          display: flex;
          align-items: center;
          gap: 10px;

          color: white;

          font-family: 'Bebas Neue', sans-serif;

          letter-spacing: 2px;

          margin-bottom: 6px;
        }

        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.4);

          padding: 3px 8px;

          border-radius: 5px;

          background: rgba(255,255,255,0.08);
        }

        @media (max-width: 768px) {

          .sc-main-portrait-shell {
            width: 70vw;
          }

          .sc-divider {
            right: 62vw;
          }

          .sc-reveal-panel {
            width: 95vw;
            left: -10vw;
            top: 18vh;
          }

          .sc-reveal-upper-bar {
            width: 82%;
            padding-left: 90px;
          }

          .sc-reveal-upper-line {
            font-size: 16px;
          }

          .sc-reveal-lower-bar {
            width: 55%;
            font-size: 16px;
          }

          .sc-root {
            padding-left: 2vw;
          }

          .sc-bar-outer {
            width: 58vw;
          }

          .sc-label {
            font-size: 22px;
          }

          .sc-nav-btn {
            font-size: 42px;
          }
        }
      `}</style>

      {/* LEFT MENU */}

      <div className="sc-root">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />

              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />

              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>

                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}

      <div className="sc-footer">
        <div className="sc-footer-row">
          <span className="sc-footer-key">↑↓</span>
          <span>SELECT</span>
        </div>

        <div className="sc-footer-row">
          <span className="sc-footer-key">↵</span>
          <span>REVEAL</span>
        </div>

        <div className="sc-footer-row">
          <span className="sc-footer-key">ESC</span>
          <span>BACK</span>
        </div>
      </div>
    </div>
  );
}