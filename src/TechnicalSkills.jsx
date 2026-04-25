import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main1.mp4";

const Motion = motion;

const SKILL_GROUPS = [
  {
    title: "Languages",
    summary: 'Programming languages I\'ve written "Hello World!" in',
    tone: "#7ff6ff",
    items: [
      { name: "Python", stars: 5 },
      { name: "Java", stars: 4 },
      { name: "JavaScript/TypeScript", stars: 4 },
      { name: "SQL", stars: 3 },
      { name: "C", stars: 3 },
      { name: "C++", stars: 3 },
    ],
  },
  {
    title: "Libraries & Frameworks",
    summary: "I've probably built something with these at some point",
    tone: "#ffd56f",
    items: [
      { name: "Spring Boot", stars: 4 },
      { name: "Django", stars: 3 },
      { name: "React", stars: 5 },
      { name: "Next.js", stars: 3 },
      { name: "Node.js", stars: 4 },
    ],
  },
  {
    title: "Cloud & DevOps",
    summary: "Somehow managing to keep things running",
    tone: "#9cf5ff",
    items: [
      { name: "AWS", stars: 4 },
      { name: "Docker", stars: 4 },
      { name: "Git", stars: 5 },
      { name: "Kubernetes", stars: 3 },
    ],
  },
  {
    title: "AI & Machine Learning",
    summary: "This is dark arts territory, but I've dabbled enough to be dangerous",
    tone: "#c8f8ff",
    items: [
      { name: "scikit-learn", stars: 5 },
      { name: "PyTorch", stars: 3 },
      { name: "TensorFlow", stars: 3 },
      { name: "HuggingFace", stars: 4 },
      { name: "OpenCV", stars: 3 },
    ],
  },
  {
    title: "Very Important Skills",
    summary: "Extremely official ratings for social confidence, gaming, and pretending everything is under control.",
    tone: "#ffb7cf",
    items: [
      { name: "Public Speaking", stars: 0 },
      { name: "Clash Royale", stars: 5 },
      { name: "Crashing Out", stars: 4 },
      { name: "League of Legends", stars: 5 },
      { name: "Debugging by vibes", stars: 4 },
    ],
  },
];

function Stars({ count }) {
  return (
    <span className="skills-stars" aria-label={`${count} out of 5 stars`}>
      {"★★★★★".slice(0, count)}
      <span className="skills-stars-dim">{"★★★★★".slice(count)}</span>
    </span>
  );
}

export default function TechnicalSkills() {
  const navigate = useNavigate();
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveGroup((current) => (current - 1 + SKILL_GROUPS.length) % SKILL_GROUPS.length);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveGroup((current) => (current + 1) % SKILL_GROUPS.length);
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const currentGroup = SKILL_GROUPS[activeGroup];

  return (
    <div id="menu-screen" className="skills-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      <div className="skills-overlay">
        <div className="skills-ambient skills-ambient-one" />
        <div className="skills-ambient skills-ambient-two" />
        <div className="skills-ambient skills-ambient-three" />

        <div className="skills-hero">
          <div className="skills-eyebrow">USE LEFT / RIGHT TO SWITCH SECTIONS</div>
          <div className="skills-header">TECHNICAL SKILLS</div>
          <div className="skills-sub">{currentGroup.summary}</div>
        </div>

        <div className="skills-tabs" role="tablist" aria-label="Skill categories">
          {SKILL_GROUPS.map((group, index) => {
            const isActive = index === activeGroup;
            const activeShadow = `${group.tone}55`;

            return (
              <button
                key={group.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`skills-tab${isActive ? " active" : ""}`}
                onClick={() => setActiveGroup(index)}
                style={
                  isActive
                    ? { borderColor: group.tone, boxShadow: `7px 7px 0 rgba(0, 0, 0, 0.24), 0 0 24px ${activeShadow}` }
                    : { borderColor: "rgba(152, 231, 255, 0.22)" }
                }
              >
                <span className="skills-tab-index" style={{ color: group.tone }}>
                  0{index + 1}
                </span>
                <span className="skills-tab-title">{group.title}</span>
              </button>
            );
          })}
        </div>

        <div className="skills-stage">
          <AnimatePresence mode="wait">
            <Motion.section
              key={currentGroup.title}
              className="skills-group skills-group-active"
              initial={{ opacity: 0, x: 48, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -48, filter: "blur(10px)" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="skills-group-top">
                <div>
                  <div className="skills-group-kicker">SELECTED CATEGORY</div>
                  <h2 className="skills-group-title">{currentGroup.title}</h2>
                </div>
                <div className="skills-group-counter">
                  <span>0{activeGroup + 1}</span>
                  <span>/</span>
                  <span>0{SKILL_GROUPS.length}</span>
                </div>
              </div>

              <div className="skills-list">
                {currentGroup.items.map((item, index) => (
                  <Motion.div
                    className={`skills-row${index === 0 ? " featured" : ""}`}
                    key={item.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.04 * index }}
                  >
                    <span className="skills-name">{item.name}</span>
                    <Stars count={item.stars} />
                  </Motion.div>
                ))}
              </div>
            </Motion.section>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@400;700&family=Bebas+Neue&display=swap');

        .skills-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          padding: 5.5vh 4vw;
          color: #f1f7ff;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow: hidden;
        }

        .skills-ambient {
          position: absolute;
          border-radius: 999px;
          filter: blur(22px);
          opacity: 0.42;
          pointer-events: none;
          animation: skills-float 9s ease-in-out infinite;
        }

        .skills-ambient-one {
          width: 280px;
          height: 280px;
          left: -70px;
          top: 14vh;
          background: radial-gradient(circle, rgba(127, 246, 255, 0.58) 0%, rgba(127, 246, 255, 0) 70%);
        }

        .skills-ambient-two {
          width: 360px;
          height: 360px;
          right: -120px;
          top: 10vh;
          background: radial-gradient(circle, rgba(255, 213, 111, 0.38) 0%, rgba(255, 213, 111, 0) 70%);
          animation-delay: -2.5s;
        }

        .skills-ambient-three {
          width: 220px;
          height: 220px;
          left: 34vw;
          bottom: 4vh;
          background: radial-gradient(circle, rgba(255, 183, 207, 0.34) 0%, rgba(255, 183, 207, 0) 70%);
          animation-delay: -5s;
        }

        @keyframes skills-float {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -16px, 0) scale(1.04); }
        }

        .skills-hero {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 920px;
        }

        .skills-eyebrow {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 4px;
          color: rgba(255, 255, 255, 0.62);
        }

        .skills-header {
          font-family: 'Anton', sans-serif;
          font-size: clamp(42px, 6.4vw, 82px);
          letter-spacing: 2px;
          line-height: 0.95;
          color: #c8f8ff;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.35), 0 0 20px rgba(127, 246, 255, 0.16);
        }

        .skills-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(17px, 2.2vw, 24px);
          color: #f7fcff;
          opacity: 0.93;
          max-width: 640px;
        }

        .skills-tabs {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          max-width: 1160px;
        }

        .skills-tab {
          appearance: none;
          border: 1px solid rgba(152, 231, 255, 0.22);
          background: linear-gradient(180deg, rgba(8, 16, 54, 0.9) 0%, rgba(4, 11, 38, 0.95) 100%);
          color: #f4fbff;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 7px 7px 0 rgba(0, 0, 0, 0.24);
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .skills-tab:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.42);
        }

        .skills-tab.active {
          transform: translateY(-1px);
        }

        .skills-tab-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 16px;
          letter-spacing: 2px;
        }

        .skills-tab-title {
          font-family: 'Anton', sans-serif;
          font-size: 19px;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        .skills-stage {
          position: relative;
          z-index: 1;
          margin-top: 2px;
          max-width: 1120px;
        }

        .skills-group-active {
          background: linear-gradient(180deg, rgba(9, 20, 73, 0.96) 0%, rgba(6, 13, 51, 0.97) 100%);
          border: 1px solid rgba(152, 231, 255, 0.42);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          padding: 18px 18px 16px;
          box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.3);
          min-height: 260px;
        }

        .skills-group-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .skills-group-kicker {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 4px;
          color: rgba(255, 255, 255, 0.55);
        }

        .skills-group-title {
          margin: 0;
          font-family: 'Anton', sans-serif;
          font-size: clamp(30px, 4vw, 48px);
          letter-spacing: 1px;
          color: #95f5ff;
          text-shadow: 0 0 18px rgba(127, 246, 255, 0.14);
        }

        .skills-group-counter {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.76);
        }

        .skills-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 10px;
          margin-top: 14px;
        }

        .skills-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          border-bottom: 1px solid rgba(161, 235, 255, 0.14);
          padding: 10px 6px 8px 0;
        }

        .skills-row.featured {
          padding-top: 0;
        }

        .skills-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 21px;
          letter-spacing: 0.3px;
          color: #f4fbff;
        }

        .skills-stars {
          font-family: 'Anton', sans-serif;
          font-size: 20px;
          letter-spacing: 2px;
          color: #ffd35d;
          white-space: nowrap;
        }

        .skills-stars-dim {
          color: rgba(255, 255, 255, 0.25);
        }

        .skills-footer {
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
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(0, 0, 0, 0.58);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          z-index: 12;
        }

        .skills-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 17px;
          letter-spacing: 2.2px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
        }

        .skills-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.72);
          color: #fff;
          padding: 2px 8px;
          font-size: 14px;
        }

        @media (max-width: 700px) {
          .skills-footer {
            display: none;
          }

          .skills-overlay {
            padding: 5vh 4vw;
          }

          .skills-hero {
            gap: 6px;
          }

          .skills-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 4px;
            margin-right: -4vw;
            scrollbar-width: none;
          }

          .skills-tabs::-webkit-scrollbar {
            display: none;
          }

          .skills-tab {
            flex: 0 0 auto;
          }

          .skills-group-active {
            padding: 14px 14px 12px;
            min-height: 0;
          }

          .skills-group-top {
            flex-direction: column;
            gap: 6px;
          }

          .skills-list {
            grid-template-columns: 1fr;
            gap: 6px;
            margin-top: 10px;
          }

          .skills-name {
            font-size: 19px;
          }

          .skills-tab-title {
            font-size: 17px;
          }
        }
      `}</style>

      <div className="skills-footer">
        <div className="skills-footer-row">
          <span className="skills-footer-key">LEFT / RIGHT</span>
          <span>SWITCH</span>
        </div>
        <div className="skills-footer-row">
          <span className="skills-footer-key">ESC</span>
          <span>BACK</span>
        </div>
      </div>
    </div>
  );
}
