import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main3-web.mp4";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import char4 from "./assets/char4.jpg";
import char5 from "./assets/char5.png";
import char6 from "./assets/char6.jpg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [char5, char4, char6];

const REVEAL_CONTENT = [
  {
    upper: [
      "University of British Columbia",
      "Computer Engineering, Faculty of Applied Science",
      "Expected Graduation: 2029",
    ],
    lower: "No clubs. I don't touch grass.",
  },
  {
    upper: [
      "Relevant Coursework:",
      "Data Structures & Algorithms, Object-Oriented Programming (Java), Operating Systems,",
      "Computer Architecture, Applied Machine Learning",
    ],
    lower: "Courses I'm looking forward to taking: Deep Learning (CPEN 455), Computer Vision (CPSC 425)",
  },
  {
    upper: [
      "TODO: Dean's List / distinctions",
      "TODO: Scholarships / awards",
      "TODO: Optional leadership/club highlights",
    ],
    lower: "No current extracurriculars",
  },
];

const ROLES = [
  { text: "LEADER" },
  { text: "PARTY" },
  { text: "PARTY" },
];

const ITEMS = [
  { id: "profile", label: "PROFILE" },
  { id: "coursework", label: "COURSEWORK" },
  { id: "honors", label: "HONORS" },
];

export default function Education() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
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
      if (e.key === "Enter" || e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, revealed]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      {revealed && (
        <div key={`panel-${active}`} className={`ed-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="ed-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="ed-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="ed-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}

      {revealed && (
        <div key={`nav-${active}`} className="ed-right-nav">
          <span className="ed-nav-arrow left">◄</span>
          <span className="ed-nav-btn">LB</span>
          <span className="ed-nav-dot" />
          <span className="ed-nav-btn">RB</span>
          <span className="ed-nav-arrow right">►</span>
        </div>
      )}

      {revealed && (
        <div key={`portrait-${active}`} className={`ed-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img className="ed-main-portrait" src={MAIN_IMAGES[active]} alt="" />
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

        .ed-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 6px;
          padding-left: 0;
        }

        @keyframes ed-reveal-bar-in {
          0%   { opacity: 0; transform: translateX(-120px) rotate(-20deg) scaleX(0.72); }
          60%  { opacity: 0.96; transform: translateX(18px) rotate(-20deg) scaleX(1.03); }
          100% { opacity: 0.92; transform: translateX(0) rotate(-20deg) scaleX(1); }
        }

        @keyframes ed-portrait-in {
          0%   { opacity: 0; transform: translateX(78px) skewX(-8deg) scale(0.94); filter: blur(8px); }
          55%  { opacity: 0.9; transform: translateX(-8px) skewX(-8deg) scale(1.015); filter: blur(0); }
          100% { opacity: 0.96; transform: translateX(0) skewX(-8deg) scale(1); filter: blur(0); }
        }

        @keyframes ed-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes ed-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(5px); opacity: 0.4; }
        }

        .ed-main-portrait-shell {
          position: absolute;
          top: -2vh;
          right: -10vw;
          z-index: 13;
          pointer-events: none;
          width: 50vw;
          height: 104vh;
          overflow: hidden;
          opacity: 0;
          transform: translateX(24px) skewX(-12deg) rotate(-1.4deg) scale(0.98);
          transition: opacity 0.35s ease, transform 0.35s ease;
          clip-path: polygon(20% 0, 100% 0, 86% 100%, 0 100%);
        }

        .ed-main-portrait-shell.mounted {
          opacity: 0.96;
          transform: translateX(0) skewX(-12deg) rotate(-1.4deg) scale(1);
          animation: ed-portrait-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ed-main-portrait {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 52% top;
          transform: skewX(12deg) scale(1.02);
          transform-origin: top right;
        }

        .ed-reveal-panel {
          position: absolute;
          top: 44vh;
          left: -6vw;
          width: 88vw;
          height: 60vh;
          z-index: 12;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(215,13,44,0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }

        .ed-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: ed-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ed-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #e03d31 0%, #eb3333 100%);
          clip-path: inherit;
        }

        .ed-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 12%;
          width: 88%;
          height: 40%;
          background: rgba(0,0,0,0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          text-align: center;
        }

        .ed-reveal-upper-line {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 1.65vw, 27px);
          letter-spacing: 1px;
          line-height: 1.15;
        }

        .ed-reveal-lower-bar {
          position: absolute;
          top: 58%;
          left: 12%;
          width: 88%;
          min-height: 20%;
          max-height: 34%;
          background: rgba(0,0,0,0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(19px, 1.8vw, 28px);
          line-height: 1.18;
          letter-spacing: 1px;
          text-align: center;
          white-space: normal;
          overflow-y: auto;
          padding: 10px 18px 10px 22px;
        }

        @keyframes ed-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ed-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: ed-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }

        .ed-right-nav .ed-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #fff;
          -webkit-text-stroke: 2px #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }

        .ed-right-nav .ed-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
        }

        .ed-right-nav .ed-nav-arrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          color: #c4001a;
          display: inline-block;
          user-select: none;
        }

        .ed-right-nav .ed-nav-arrow.left  { animation: ed-arrow-left  0.8s ease-in-out infinite; }
        .ed-right-nav .ed-nav-arrow.right { animation: ed-arrow-right 0.8s ease-in-out infinite; }

        .ed-bar-outer {
          position: relative;
          display: block;
          width: 45vw;
          flex-shrink: 0;
          pointer-events: none;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ed-bar-outer.active .ed-bar     { height: 90px; }
        .ed-bar-outer.active .ed-bar-red { height: 90px; }
        .ed-bar-outer.mounted { transform: translateX(0); }
        .ed-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .ed-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .ed-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .ed-bar-red {
          position: absolute;
          top: 0;
          left: 0;
          width: 45vw;
          height: 64px;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%);
          transform: translateY(-7px);
          opacity: 0;
          transition: opacity 0.2s ease, height 0.3s cubic-bezier(0.22,1,0.36,1);
          z-index: 0;
          pointer-events: none;
        }

        .ed-bar-outer.active .ed-bar-red { opacity: 1; }

        .ed-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          pointer-events: none;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(0,0,0,0.65);
          z-index: 1;
        }

        .ed-bar::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .ed-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          pointer-events: none;
        }

        .ed-bar-outer.active .ed-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        .ed-bar-shade {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .ed-bar-outer.active .ed-bar-shade { opacity: 1; }

        .ed-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }

        .ed-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        .ed-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 78px;
        }

        .ed-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ed-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }

        .ed-bar-outer.active .ed-label { color: #111111; }

        .ed-char {
          position: absolute;
          top: 0;
          left: 110px;
          height: 100%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
          pointer-events: none;
        }

        .ed-footer {
          position: fixed;
          bottom: 20px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          font-family: 'Bebas Neue', sans-serif;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.28);
          background: rgba(0,0,0,0.58);
          box-shadow: 0 8px 22px rgba(0,0,0,0.55);
          backdrop-filter: blur(2px);
          z-index: 14;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }

        .ed-footer.mounted { opacity: 1; }

        .ed-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 17px;
          letter-spacing: 2.2px;
          color: rgba(255,255,255,0.9);
          text-shadow: 0 1px 2px rgba(0,0,0,0.9);
        }

        .ed-footer-key {
          border: 1px solid rgba(255,255,255,0.55);
          border-radius: 5px;
          background: rgba(0,0,0,0.72);
          color: #fff;
          padding: 2px 8px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .ed-main-portrait-shell {
            top: 2vh;
            right: -18vw;
            width: 66vw;
            height: 58vh;
            z-index: 13;
            clip-path: polygon(18% 0, 100% 0, 86% 100%, 0 100%);
          }

          .ed-main-portrait { transform: skewX(10deg) scale(1.02); object-position: 52% top; }

          .ed-reveal-panel {
            top: 44vh !important;
            left: 4vw !important;
            right: 6vw !important;
            width: auto !important;
            height: 50vh !important;
            z-index: 14;
            transform: translateX(0) rotate(0deg) !important;
            clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
            box-shadow:
              0 0 0 2px rgba(255,255,255,0.24),
              10px 0 0 rgba(215,13,44,0.9),
              16px 0 0 rgba(255,255,255,0.24);
          }

          .ed-reveal-panel.mounted { transform: translateX(0) rotate(0deg) !important; }

          .ed-reveal-upper-bar { top: 10%; height: 46%; width: 96%; left: 2%; }

          .ed-reveal-upper-line {
            font-size: clamp(15px, 4.2vw, 19px);
            line-height: 1.1;
            padding: 0 10px;
          }

          .ed-reveal-lower-bar {
            top: 62%;
            width: 96%;
            left: 2%;
            bottom: 8%;
            height: auto;
            max-height: none;
            font-size: clamp(16px, 4.5vw, 20px);
            line-height: 1.2;
            padding: 8px 12px;
          }

          .ed-right-nav { top: 2vh; left: 4vw; transform: translateX(0) rotate(-12deg); }
          .ed-footer { display: none; }
        }

        @media (min-width: 769px) and (max-width: 1200px) {
          .ed-main-portrait-shell {
            top: -1vh;
            right: -16vw;
            width: 60vw;
            height: 100vh;
            clip-path: polygon(18% 0, 100% 0, 86% 100%, 0 100%);
          }

          .ed-reveal-panel {
            top: 46vh;
            left: -2vw;
            width: 78vw;
            height: 52vh;
            transform: translateX(0) rotate(-14deg);
          }

          .ed-reveal-panel.mounted { transform: translateX(0) rotate(-14deg); }
        }
      `}</style>

      <div className="ed-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`ed-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
          >
            <div className="ed-bar-red" />
            <div className="ed-bar" aria-hidden="true">
              <img className="ed-char" src={CHARS[i]} alt="" />
              <div className="ed-bar-fill" />
              <div className="ed-bar-shade" />
              <div className="ed-bar-content">
                <div className="ed-role">{ROLES[i].text}</div>
                <div className="ed-main">
                  <div className="ed-main-top">
                    <div className="ed-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`ed-footer${mounted ? " mounted" : ""}`}>
        <div className="ed-footer-row"><span className="ed-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="ed-footer-row"><span className="ed-footer-key">↵</span><span>REVEAL</span></div>
        <div className="ed-footer-row"><span className="ed-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
