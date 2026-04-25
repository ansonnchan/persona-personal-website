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
      "ANSON",
      "Second-year Computer Engineering student at UBC.",
      "Interested in software engineering, machine learning, and scalable systems.",
      "Born in Hong Kong, raised in Australia for 15 years.",
    ],
    lower:
      "currently into: machine learning • system design • jujutsu kaisen • league",
  },
  {
    upper: [
      "EDUCATION",
      "University of British Columbia — Computer Engineering.",
      "Dean’s List recipient.",
      "Focused on backend systems, low-level programming, and AI.",
    ],
    lower: "expected graduation: 2029",
  },
  {
    upper: [
      "CURRENTLY WORKING ON",
      "NLP sentiment analysis + automated reporting engine.",
      "OpenCV hand-sign recognition experiments.",
      "Learning scalable backend architecture + distributed systems.",
    ],
    lower: "also trying to escape elo hell in league",
  },
];

const ROLES = [
  { text: "LEADER" },
  { text: "PARTY" },
  { text: "PARTY" },
];

const ITEMS = [
  { id: "profile", label: "ABOUT ME" },
  { id: "education", label: "EDUCATION" },
  { id: "projects", label: "CURRENTLY WORKING ON" },
];

export default function AboutMe() {
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
        setRevealed(true);
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();

        if (revealed) setRevealed(false);
        else navigate(-1);
      }

      if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate, revealed]);

  return (
    <div id="menu-screen">
      <video
        className="sc-bg-video"
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="sc-noise" />

      {revealed && (
        <>
          <div
            className="sc-dim"
            onClick={() => setRevealed(false)}
          />

          <div
            className={`sc-main-portrait-shell ${
              mounted ? "mounted" : ""
            }`}
          >
            <img
              className="sc-main-portrait"
              src={MAIN_IMAGES[active]}
              alt=""
            />
          </div>

          <div
            className={`sc-reveal-panel ${
              mounted ? "mounted" : ""
            }`}
          >
            <div className="sc-reveal-upper-bar">
              {REVEAL_CONTENT[active].upper.map((line, idx) => (
                <div
                  className="sc-reveal-upper-line"
                  key={idx}
                >
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
        </>
      )}

      <div className="sc-root">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`
              sc-bar-outer
              ${active === i ? "active" : ""}
              ${mounted ? "mounted" : ""}
            `}
            onMouseEnter={() => setActive(i)}
            onClick={() => {
              setActive(i);
              setRevealed(true);
            }}
          >
            <div className="sc-bar-red" />

            <div className="sc-bar">
              <img
                className="sc-char"
                src={CHARS[i]}
                alt=""
              />

              <div className="sc-bar-fill" />

              <div className="sc-bar-shade" />

              <div className="sc-bar-content">
                <div className="sc-role">
                  {ROLES[i].text}
                </div>

                <div className="sc-main">
                  <div className="sc-label">
                    {item.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer ${mounted ? "mounted" : ""}`}>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↑↓</span>
          <span>SELECT</span>
        </div>

        <div className="sc-footer-row">
          <span className="sc-footer-key">↵</span>
          <span>REVEAL</span>
        </div>

        <div className="sc-footer-row">
          <span className="sc-footer-key">←</span>
          <span>HIDE</span>
        </div>

        <div className="sc-footer-row">
          <span className="sc-footer-key">ESC</span>
          <span>BACK</span>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&family=Barlow+Condensed:wght@400;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        #menu-screen {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: #000;
        }

        .sc-bg-video {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .sc-noise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          mix-blend-mode: soft-light;
          background-image:
            radial-gradient(
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            );
          background-size: 3px 3px;
          z-index: 1;
        }

        .sc-root {
          position: fixed;
          inset: 0;
          z-index: 10;

          display: flex;
          flex-direction: column;
          justify-content: center;

          gap: 6px;

          padding-left: 32px;
        }

        .sc-bar-outer {
          position: relative;

          transform: translateX(-100%);

          transition:
            transform 0.55s cubic-bezier(0.22,1,0.36,1);

          cursor: pointer;
        }

        .sc-bar-outer.mounted {
          transform: translateX(0);
        }

        .sc-bar-outer:nth-child(1) {
          transition-delay: 0ms;
        }

        .sc-bar-outer:nth-child(2) {
          transition-delay: 80ms;
        }

        .sc-bar-outer:nth-child(3) {
          transition-delay: 160ms;
        }

        .sc-bar-outer:hover {
          transform: translateX(6px);
        }

        .sc-bar {
          position: relative;

          width: 45vw;
          height: 64px;

          background: #111;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 14px) 100%,
              0 100%
            );

          overflow: hidden;

          box-shadow:
            0 10px 35px rgba(0,0,0,0.55);

          transition:
            height 0.3s cubic-bezier(0.22,1,0.36,1),
            filter 0.25s ease;
        }

        .sc-bar-outer:hover .sc-bar {
          filter: brightness(1.08);
        }

        .sc-bar-outer.active .sc-bar {
          height: 92px;
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

          transition:
            opacity 0.22s ease,
            height 0.3s ease;

          clip-path:
            polygon(
              50% 0,
              100% 0,
              100% 100%,
              calc(50% - 10px) 100%
            );
        }

        .sc-bar-outer.active .sc-bar-red {
          opacity: 1;
          height: 92px;
        }

        .sc-bar-fill {
          position: absolute;
          inset: 0;

          background: #fff;

          clip-path:
            polygon(
              100% 0,
              100% 0,
              calc(100% - 32px) 100%,
              calc(100% - 32px) 100%
            );

          transition:
            clip-path 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        .sc-bar-outer.active .sc-bar-fill {
          clip-path:
            polygon(
              22% 0,
              100% 0,
              calc(100% - 14px) 100%,
              calc(22% + 138px) 100%
            );
        }

        .sc-bar-shade {
          position: absolute;

          top: 0;
          bottom: 0;

          left: 73%;
          width: 6%;

          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,0.15) 0%,
              rgba(0,0,0,0) 100%
            );

          opacity: 0;

          transition: opacity 0.3s ease;
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

          color: rgba(255,255,255,0.9);

          transition: color 0.22s ease;

          text-shadow:
            0 0 10px rgba(255,255,255,0.05);
        }

        .sc-bar-outer.active .sc-label {
          color: #111;
        }

        .sc-char {
          position: absolute;

          top: 0;
          left: 110px;

          height: 100%;
          max-width: 160px;

          object-fit: cover;

          z-index: 4;

          pointer-events: none;

          clip-path:
            polygon(
              20px 0%,
              100% 0%,
              calc(100% - 20px) 100%,
              0% 100%
            );
        }

        .sc-dim {
          position: fixed;
          inset: 0;

          background: rgba(30,35,44,0.72);

          z-index: 20;

          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .sc-main-portrait-shell {
          position: absolute;

          top: 0;
          right: -2vw;

          width: 36vw;
          height: 100vh;

          overflow: hidden;

          z-index: 21;

          opacity: 0;

          transform:
            translateX(24px)
            skewX(-8deg)
            scale(0.98);

          transition:
            opacity 0.35s ease,
            transform 0.35s ease;

          filter:
            drop-shadow(
              0 0 28px rgba(0,0,0,0.35)
            );
        }

        .sc-main-portrait-shell.mounted {
          opacity: 1;

          transform:
            translateX(0)
            skewX(-8deg)
            scale(1);
        }

        .sc-main-portrait {
          width: 100%;
          height: 100%;

          object-fit: cover;
          object-position: top right;

          transform:
            skewX(8deg)
            scale(1.08);
        }

        .sc-reveal-panel {
          position: absolute;

          top: 45vh;
          left: -4vw;

          width: 82vw;
          height: 54vh;

          z-index: 20;

          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.98) 0%,
              rgba(242,245,250,0.98) 100%
            );

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 72px) 100%,
              0 100%
            );

          box-shadow:
            0 0 0 2px rgba(255,255,255,0.12),
            14px 0 0 rgba(215,13,44,0.82),
            24px 0 0 rgba(255,255,255,0.2),
            0 18px 50px rgba(0,0,0,0.4);

          opacity: 0;

          transform:
            translateX(-40px)
            rotate(-14deg);

          transform-origin: left bottom;
        }

        .sc-reveal-panel.mounted {
          opacity: 0.96;

          transform:
            translateX(0)
            rotate(-14deg);

          animation:
            panelSlide 0.46s
            cubic-bezier(0.22,1,0.36,1);
        }

        @keyframes panelSlide {
          from {
            opacity: 0;
            transform:
              translateX(-80px)
              rotate(-18deg);
          }

          to {
            opacity: 0.96;
            transform:
              translateX(0)
              rotate(-14deg);
          }
        }

        .sc-reveal-upper-bar {
          position: absolute;

          top: 10%;
          left: 0;

          width: 100%;
          height: 42%;

          background: rgba(10,10,10,0.94);

          display: flex;
          flex-direction: column;

          justify-content: center;
          align-items: center;

          gap: 8px;

          text-align: center;

          color: white;

          padding: 0 40px;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 22px) 100%,
              0 100%
            );
        }

        .sc-reveal-upper-line {
          font-family: 'Barlow Condensed', sans-serif;

          font-size: 20px;

          line-height: 1.1;

          letter-spacing: 0.4px;

          opacity: 0.82;
        }

        .sc-reveal-upper-line:first-child {
          font-family: 'Bebas Neue', sans-serif;

          font-size: 42px;

          letter-spacing: 3px;

          opacity: 1;
        }

        .sc-reveal-lower-bar {
          position: absolute;

          top: 60%;
          right: 0;

          width: 46%;

          background: rgba(10,10,10,0.94);

          border-left: 4px solid #c4001a;

          color: white;

          font-family: 'Barlow Condensed', sans-serif;

          font-size: 24px;

          line-height: 1.15;

          letter-spacing: 0.5px;

          padding: 14px 22px;

          display: flex;
          align-items: center;

          clip-path:
            polygon(
              0 0,
              100% 0,
              calc(100% - 22px) 100%,
              0 100%
            );
        }

        .sc-right-nav {
          position: fixed;

          top: 9vh;
          left: 6vw;

          display: flex;
          align-items: center;

          gap: 8px;

          z-index: 30;

          transform: rotate(-14deg);
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

          background: rgba(0,0,0,0.58);

          border:
            1px solid rgba(255,255,255,0.28);

          opacity: 0;

          transition:
            opacity 0.4s ease 0.6s;
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
        }

        .sc-footer-key {
          border:
            1px solid rgba(255,255,255,0.5);

          border-radius: 5px;

          padding: 2px 8px;

          background: rgba(0,0,0,0.7);
        }
      `}</style>
    </div>
  );
}
