import { useState, useEffect, useRef } from "react";
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
      "I was born in Hong Kong, but was raised in Australia for 15 years.",
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
  const [revealed, setRevealed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRenderOverlay, setShouldRenderOverlay] = useState(false);

  const overlayTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Handle overlay rendering with fade-out
  useEffect(() => {
    if (revealed) {
      setIsClosing(false);
      setShouldRenderOverlay(true);
    } else if (shouldRenderOverlay) {
      setIsClosing(true);
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
      overlayTimeoutRef.current = setTimeout(() => {
        setShouldRenderOverlay(false);
        setIsClosing(false);
      }, 200);
    }

    return () => {
      if (overlayTimeoutRef.current) clearTimeout(overlayTimeoutRef.current);
    };
  }, [revealed, shouldRenderOverlay]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (!revealed) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive((i) => Math.max(0, i - 1));
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive((i) => Math.min(ITEMS.length - 1, i + 1));
        }
      }

      if (e.key === "Enter" || e.key === "ArrowRight") {
        e.preventDefault();
        if (!revealed) setRevealed(true);
      }

      if (e.key === "ArrowLeft" || e.key === "Escape") {
        e.preventDefault();
        if (revealed) setRevealed(false);
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, navigate]);

  const handleMouseEnter = (i) => {
    if (!revealed) setActive(i);
  };

  const handleClick = (i) => {
    if (revealed) {
      setRevealed(false);
    } else {
      setActive(i);
      setRevealed(true);
    }
  };

  const handleDimClick = () => {
    setRevealed(false);
  };

  return (
    <div id="menu-screen">
      <video className="sc-bg-video" src={bgVideo} autoPlay loop muted playsInline />

      {/* OVERLAY - Only render when needed */}
      {shouldRenderOverlay && (
        <div className={`sc-overlay ${isClosing ? "closing" : ""}`}>
          <div className="sc-dim" onClick={handleDimClick} />

          <div className="sc-main-portrait-shell">
            <img className="sc-main-portrait" src={MAIN_IMAGES[active]} alt="" />
          </div>

          <div className="sc-reveal-panel">
            <div className="sc-reveal-upper-bar">
              {REVEAL_CONTENT[active].upper.map((line, idx) => (
                <div key={idx} className="sc-reveal-upper-line">
                  {line}
                </div>
              ))}
            </div>

            <div className="sc-reveal-lower-bar">
              {REVEAL_CONTENT[active].lower}
            </div>
          </div>

          <div className="sc-right-nav">
            <span className="sc-nav-arrow left">◄</span>
            <span className="sc-nav-btn">LB</span>
            <span className="sc-nav-dot" />
            <span className="sc-nav-btn">RB</span>
            <span className="sc-nav-arrow right">►</span>
          </div>
        </div>
      )}

      {/* MENU */}
      <div className="sc-root">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`
              sc-bar-outer 
              ${active === i ? "active" : ""} 
              ${mounted ? "mounted" : ""} 
              ${revealed ? "disabled" : ""}
            `}
            onMouseEnter={() => handleMouseEnter(i)}
            onClick={() => handleClick(i)}
          >
            {/* FULL HITBOX FIX */}
            <div className="sc-hitbox">
              <div className="sc-bar-red" />
              <div className="sc-bar">
                <img className="sc-char" src={CHARS[i]} alt="" />
                <div className="sc-bar-fill" />
                <div className="sc-bar-shade" />

                <div className="sc-bar-content">
                  <div className="sc-role">{ROLES[i].text}</div>
                  <div className="sc-main">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER CONTROLS */}
      <div className={`sc-footer ${mounted ? "mounted" : ""}`}>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↑↓</span>
          <span>SELECT</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↵ →</span>
          <span>REVEAL</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">← ESC</span>
          <span>HIDE</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">BACKSPACE</span>
          <span>BACK</span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        #menu-screen {
          position: fixed;
          inset: 0;
          background: #000;
          overflow: hidden;
        }

        .sc-bg-video {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }

        .sc-root {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 40px;
          gap: 6px;
          z-index: 10;
          pointer-events: none;
        }

        /* HITBOX FIX - THIS WORKS! */
        .sc-bar-outer {
          width: fit-content;
          cursor: pointer;
          pointer-events: auto;
        }

        .sc-bar-outer.disabled {
          opacity: 0.72;
          filter: grayscale(0.15);
          cursor: default;
          pointer-events: none;
        }

        .sc-hitbox {
          display: block;
          width: 45vw;
          height: 64px;
          position: relative;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-bar-outer.active .sc-hitbox {
          height: 92px;
        }

        .sc-bar-outer.mounted .sc-hitbox {
          transform: translateX(0);
        }

        .sc-bar-outer:hover:not(.disabled) .sc-hitbox {
          transform: translateX(8px);
        }

        /* Staggered animations */
        .sc-bar-outer:nth-child(1) .sc-hitbox { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) .sc-hitbox { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) .sc-hitbox { transition-delay: 160ms; }

        .sc-bar {
          position: absolute;
          inset: 0;
          background: #111;
          overflow: hidden;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.55);
          transition: height 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .sc-bar-red {
          position: absolute;
          top: 0;
          left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.22s ease, height 0.3s ease;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          pointer-events: none;
        }

        .sc-bar-outer.active .sc-bar-red {
          opacity: 1;
          height: 92px;
        }

        .sc-bar-fill {
          position: absolute;
          inset: 0;
          background: #fff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .sc-bar-shade {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .sc-bar-outer.active .sc-bar-shade {
          opacity: 1;
        }

        .sc-bar-content {
          position: relative;
          z-index: 5;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          pointer-events: none;
        }

        .sc-role {
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          color: #fff;
          transform: rotate(-30deg);
          letter-spacing: -2px;
          user-select: none;
        }

        .sc-main {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 78px;
        }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 4px;
          color: rgba(255, 255, 255, 0.9);
          transition: color 0.22s ease;
        }

        .sc-bar-outer.active .sc-label {
          color: #111;
        }

        .sc-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          z-index: 4;
          pointer-events: none;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* OVERLAY SYSTEM */
        .sc-overlay {
          position: fixed;
          inset: 0;
          z-index: 20;
          pointer-events: auto;
          animation: overlayFadeIn 0.25s ease;
        }

        .sc-overlay.closing {
          animation: overlayFadeOut 0.2s ease forwards;
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes overlayFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .sc-dim {
          position: fixed;
          inset: 0;
          background: rgba(30, 35, 44, 0.72);
          cursor: pointer;
        }

        .sc-main-portrait-shell {
          position: fixed;
          top: 0;
          right: -4vw;
          width: 44vw;
          height: 100vh;
          overflow: hidden;
          animation: portraitSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .sc-main-portrait-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0) 55%,
            rgba(30, 35, 44, 0.55) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        @keyframes portraitSlideIn {
          from {
            opacity: 0;
            transform: translateX(80px) skewX(-8deg) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewX(-8deg) scale(1);
          }
        }

        .sc-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top right;
          transform: skewX(8deg) scale(1.08);
        }

        .sc-reveal-panel {
          position: fixed;
          left: -4vw;
          top: 44vh;
          width: 88vw;
          height: 58vh;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 244, 250, 0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.16), 18px 0 0 rgba(215, 13, 44, 0.82), 28px 0 0 rgba(255, 255, 255, 0.22);
          animation: panelSlideIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes panelSlideIn {
          from {
            opacity: 0;
            transform: translateX(-80px) rotate(-18deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(-18deg);
          }
        }

        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0;
          width: 100%;
          height: 40%;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          color: white;
          text-align: center;
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
        }

        .sc-reveal-upper-line {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 1.6vw, 28px);
          letter-spacing: 1px;
          line-height: 1.15;
        }

        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 48%;
          background: rgba(0, 0, 0, 0.92);
          color: white;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 1.8vw, 28px);
          letter-spacing: 1px;
          padding: 12px 20px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
        }

        .sc-right-nav {
          position: fixed;
          top: 9vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: navSlideIn 0.35s ease forwards;
        }

        @keyframes navSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px) rotate(-18deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(-18deg);
          }
        }

        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 96px;
          color: white;
          -webkit-text-stroke: 2px black;
        }

        .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: black;
        }

        .sc-nav-arrow {
          color: #c4001a;
          font-size: 22px;
        }

        .sc-nav-arrow.left {
          animation: arrowLeft 0.8s ease-in-out infinite;
        }

        .sc-nav-arrow.right {
          animation: arrowRight 0.8s ease-in-out infinite;
        }

        @keyframes arrowLeft {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes arrowRight {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        .sc-footer {
          position: fixed;
          right: 24px;
          bottom: 20px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 8px 10px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.58);
          border: 1px solid rgba(255, 255, 255, 0.28);
          backdrop-filter: blur(8px);
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }

        .sc-footer.mounted {
          opacity: 1;
        }

        .sc-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          color: white;
          font-size: 14px;
        }

        .sc-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 5px;
          padding: 2px 8px;
          background: rgba(0, 0, 0, 0.7);
          font-size: 12px;
        }

        @media (min-width: 1440px) {
          .sc-hitbox,
          .sc-bar,
          .sc-bar-red {
            width: 40vw;
          }
          
          .sc-reveal-panel {
            width: 82vw;
            left: -2vw;
          }
        }
      `}</style>
    </div>
  );
}
