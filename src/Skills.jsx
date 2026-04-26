import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main2.mp4";
import char2 from "./assets/char2.png";

const SECTIONS = [
  {
    id: "languages",
    badge: "I",
    title: "LANGUAGES",
    subtitle: "Syntax / fluency / survival",
    rank: 5,
    index: "01",
    panelTitle: "LANGUAGE LOG",
    progress: "CORE",
    accent: "#7ff6ff",
    stats: [
      { label: "St", value: 55 },
      { label: "Ma", value: 67 },
      { label: "En", value: 44 },
      { label: "Ag", value: 47 },
      { label: "Lu", value: 53 },
    ],
    items: [
      { name: "Python", stars: 5 },
      { name: "Java", stars: 4 },
      { name: "JavaScript / TypeScript", stars: 4 },
      { name: "SQL", stars: 3 },
      { name: "C", stars: 3 },
      { name: "C++", stars: 3 },
    ],
    notes: [
      "Covers both rapid prototyping and structured backend development.",
      "Python, Java, and TypeScript are the daily drivers depending on project type.",
      "C/C++ still show up when lower-level control matters.",
    ],
  },
  {
    id: "frameworks",
    badge: "II",
    title: "FRAMEWORKS",
    subtitle: "React / Django / Spring",
    rank: 4,
    index: "02",
    panelTitle: "FRAMEWORK LOG",
    progress: "STACK",
    accent: "#ffd56f",
    stats: [
      { label: "St", value: 62 },
      { label: "Ma", value: 71 },
      { label: "En", value: 58 },
      { label: "Ag", value: 49 },
      { label: "Lu", value: 50 },
    ],
    items: [
      { name: "Spring Boot", stars: 4 },
      { name: "Django", stars: 3 },
      { name: "React", stars: 5 },
      { name: "Next.js", stars: 3 },
      { name: "Node.js", stars: 4 },
    ],
    notes: [
      "Main delivery toolset for most web and backend projects.",
      "React handles frontend-heavy products, while Spring Boot and Django support backend services.",
      "Next.js and Node.js round out full-stack builds when speed matters.",
    ],
  },
  {
    id: "cloud",
    badge: "III",
    title: "CLOUD & DEVOPS",
    subtitle: "Deploy / automate / recover",
    rank: 4,
    index: "03",
    panelTitle: "INFRASTRUCTURE LOG",
    progress: "OPS",
    accent: "#9cf5ff",
    stats: [
      { label: "St", value: 58 },
      { label: "Ma", value: 64 },
      { label: "En", value: 66 },
      { label: "Ag", value: 45 },
      { label: "Lu", value: 48 },
    ],
    items: [
      { name: "AWS", stars: 4 },
      { name: "Docker", stars: 4 },
      { name: "Git", stars: 5 },
      { name: "Kubernetes", stars: 3 },
    ],
    notes: [
      "Focused on shipping reliably and recovering quickly when things break.",
      "Git and Docker are frequent tools; AWS supports deployment workflows.",
      "Kubernetes is active growth territory.",
    ],
  },
  {
    id: "ml",
    badge: "IV",
    title: "AI & MACHINE LEARNING",
    subtitle: "Models / experiments / tuning",
    rank: 3,
    index: "04",
    panelTitle: "AI / ML LOG",
    progress: "LAB",
    accent: "#c8f8ff",
    stats: [
      { label: "St", value: 46 },
      { label: "Ma", value: 74 },
      { label: "En", value: 60 },
      { label: "Ag", value: 41 },
      { label: "Lu", value: 52 },
    ],
    items: [
      { name: "scikit-learn", stars: 5 },
      { name: "PyTorch", stars: 3 },
      { name: "TensorFlow", stars: 3 },
      { name: "HuggingFace", stars: 4 },
      { name: "OpenCV", stars: 3 },
    ],
    notes: [
      "Applied ML experience across classic models and neural tooling.",
      "scikit-learn is strongest for practical model development and iteration.",
      "PyTorch, TensorFlow, HuggingFace, and OpenCV are used for deeper experiments.",
    ],
  },
];

function Stars({ count }) {
  const clamped = Math.max(0, Math.min(5, count));
  return (
    <span className="skills-stars" aria-label={`${clamped} out of 5 stars`}>
      {"★★★★★".slice(0, clamped)}
      <span className="skills-stars-dim">{"★★★★★".slice(clamped)}</span>
    </span>
  );
}

function AffinityBadge({ seed }) {
  const types = ["phys", "fire", "ice", "elec", "wind", "psy", "nuke", "bless"];
  const icon = ["◆", "✹", "✦", "⚡", "➤", "◉", "✺", "✧"];
  const i = Math.abs(seed) % types.length;

  return (
    <span className={`skills-affinity af-${types[i]}`} aria-hidden="true">
      {icon[i]}
    </span>
  );
}

export default function Skills() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => (i - 1 + SECTIONS.length) % SECTIONS.length);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((i) => (i + 1) % SECTIONS.length);
      }
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(SECTIONS.length - 1, i + 1));
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const section = SECTIONS[active];
  const split = Math.ceil(section.items.length / 2);
  const leftItems = section.items.slice(0, split);
  const rightItems = section.items.slice(split);
  const renderSkillRow = (item, indexSeed) => (
    <div className="skills-skill-row" key={item.name}>
      <div className="skills-skill-left">
        <AffinityBadge seed={indexSeed + active * 3} />
        <span className="skills-skill-name">{item.name}</span>
      </div>
      <Stars count={item.stars} />
    </div>
  );

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <div className="skills-entry-mask" aria-hidden="true">
        <video className="skills-entry-video" src={bgVideo} autoPlay loop muted playsInline />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .skills-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: skills-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .skills-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes skills-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .skills-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .skills-top-banner {
          position: absolute;
          left: 2.4vw;
          right: 2.4vw;
          top: 1.8vh;
          height: 13vh;
          min-height: 86px;
          background: linear-gradient(90deg, rgba(255,255,255,0.98), rgba(207,247,255,0.97));
          clip-path: polygon(0 0, 100% 0, calc(100% - 42px) 100%, 0 100%);
          box-shadow: 0 8px 0 rgba(0, 4, 28, 0.35);
          pointer-events: none;
          padding: 10px 22px;
          color: #08153f;
          overflow: hidden;
        }

        .skills-top-banner::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff316b, #2fe9ff);
        }

        .skills-banner-row {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .skills-banner-name {
          font-family: 'Anton', sans-serif;
          font-size: clamp(24px, 3.4vw, 42px);
          color: #1de5ff;
          letter-spacing: 1px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.2);
        }

        .skills-banner-nav {
          font-family: 'Anton', sans-serif;
          font-size: clamp(28px, 4.2vw, 54px);
          color: #0b1038;
          letter-spacing: 2px;
          font-style: italic;
        }

        .skills-banner-main {
          margin-top: 2px;
          display: flex;
          align-items: baseline;
          gap: 14px;
          flex-wrap: wrap;
          font-family: 'Anton', sans-serif;
          color: #000;
        }

        .skills-banner-class {
          font-size: clamp(22px, 3.1vw, 44px);
          line-height: 0.9;
          letter-spacing: 1px;
        }

        .skills-banner-exp {
          font-size: clamp(18px, 2.6vw, 34px);
          line-height: 0.9;
          color: #131d50;
        }

        .skills-stack {
          position: absolute;
          top: 17vh;
          left: 2.8vw;
          width: min(46vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .skills-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .skills-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .skills-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }

        .skills-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .skills-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }

        .skills-card-wrap.active .skills-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .skills-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .skills-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }

        .skills-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }

        .skills-card-wrap.active .skills-badge {
          background: #000;
          border-color: #000;
        }

        .skills-card-wrap.active .skills-badge-text {
          color: #fff;
        }

        .skills-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(34px, 3.6vw, 56px);
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }

        .skills-card-wrap.active .skills-title {
          color: #000;
        }

        .skills-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .skills-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }

        .skills-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }

        .skills-card-wrap.active .skills-rank-label,
        .skills-card-wrap.active .skills-rank-number {
          color: #000;
        }

        .skills-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }

        .skills-card-wrap.active .skills-subtitle-bar {
          background: #000;
        }

        .skills-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }

        .skills-card-wrap.active .skills-subtitle {
          color: #fff;
        }

        .skills-detail-panel {
          position: absolute;
          top: 17vh;
          right: 4.5vw;
          width: min(41vw, 690px);
          min-height: 72vh;
          z-index: 12;
          padding: 20px 20px 22px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(133, 244, 255, 0.16), 16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
          pointer-events: all;
        }

        .skills-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 64px 1fr auto;
          align-items: center;
          gap: 10px;
          min-height: 84px;
          padding: 0 14px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }

        .skills-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 1;
        }

        .skills-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(24px, 2.6vw, 40px);
          line-height: 0.92;
          letter-spacing: 1px;
        }

        .skills-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 2.8vw, 40px);
          letter-spacing: 2px;
          line-height: 1;
        }

        .skills-detail-body {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1fr minmax(180px, 220px);
          gap: 14px;
          align-items: start;
        }

        .skills-grid-wrap {
          background: rgba(4, 12, 56, 0.92);
          padding: 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 10px;
        }

        .skills-skill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-height: 38px;
          padding: 0 8px;
          background: rgba(10, 21, 82, 0.95);
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.12);
        }

        .skills-skill-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .skills-affinity {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 12px;
          line-height: 1;
          color: #07103d;
          border: 1px solid rgba(255, 255, 255, 0.42);
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
        }

        .skills-affinity.af-phys { background: linear-gradient(180deg, #ffc665, #ff9e2f); }
        .skills-affinity.af-fire { background: linear-gradient(180deg, #ff9f7b, #ff4f35); }
        .skills-affinity.af-ice { background: linear-gradient(180deg, #a8f4ff, #60d8ff); }
        .skills-affinity.af-elec { background: linear-gradient(180deg, #fff272, #ffd447); }
        .skills-affinity.af-wind { background: linear-gradient(180deg, #b0ff9c, #68dd86); }
        .skills-affinity.af-psy { background: linear-gradient(180deg, #ffd0ff, #cf7dff); }
        .skills-affinity.af-nuke { background: linear-gradient(180deg, #b7f9ff, #6be8ff); }
        .skills-affinity.af-bless { background: linear-gradient(180deg, #fff7d6, #ffe8a1); }

        .skills-skill-name {
          font-family: 'Anton', sans-serif;
          font-size: clamp(16px, 1.35vw, 22px);
          line-height: 1;
          color: #edfaff;
          letter-spacing: 0.2px;
        }

        .skills-stars {
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          letter-spacing: 1.5px;
          color: #ffd35d;
          white-space: nowrap;
        }

        .skills-stars-dim {
          color: rgba(255, 255, 255, 0.25);
        }

        .skills-right {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .skills-portrait-wrap {
          height: 225px;
          background: linear-gradient(180deg, rgba(19, 47, 154, 0.9), rgba(10, 21, 85, 0.95));
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.14);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
        }

        .skills-portrait {
          max-height: 108%;
          object-fit: contain;
          filter: drop-shadow(0 10px 12px rgba(0, 0, 0, 0.5));
          transform: translateY(6px);
        }

        .skills-stats {
          background: rgba(7, 15, 61, 0.96);
          padding: 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .skills-stat-row {
          display: grid;
          grid-template-columns: 30px 1fr;
          gap: 8px;
          align-items: center;
        }

        .skills-stat-label {
          font-family: 'Anton', sans-serif;
          font-size: 24px;
          line-height: 1;
          color: #67efff;
        }

        .skills-stat-bar {
          height: 12px;
          background: rgba(255, 255, 255, 0.12);
          clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          overflow: hidden;
        }

        .skills-stat-fill {
          height: 100%;
          background: linear-gradient(90deg, #17d7ff 0%, #36f4ff 78%, #e23f53 100%);
        }

        .skills-detail-bottom {
          margin-top: 14px;
          padding: 14px;
          background: rgba(5, 13, 57, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(145, 239, 255, 0.12);
        }

        .skills-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #91f5ff;
          margin-bottom: 10px;
        }

        .skills-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .skills-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: clamp(16px, 1.35vw, 20px);
          line-height: 1.14;
          color: #edfaff;
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
          z-index: 20;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }

        .skills-footer.mounted {
          opacity: 1;
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

        @media (max-width: 1024px) {
          .skills-top-banner {
            top: 1.2vh;
            left: 2vw;
            right: 2vw;
            height: 12vh;
          }

          .skills-stack {
            top: 15vh;
            width: min(48vw, 660px);
            transform: scale(0.82);
          }

          .skills-detail-panel {
            top: 15vh;
            width: min(44vw, 640px);
          }
        }

        @media (max-width: 768px) {
          .skills-top-banner {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            margin: 8px;
            height: auto;
            min-height: 0;
          }

          .skills-overlay {
            overflow-y: auto;
            overflow-x: hidden;
            padding-bottom: max(16px, env(safe-area-inset-bottom));
          }

          .skills-stack {
            position: relative;
            width: min(96vw, 620px);
            top: 0;
            left: 0;
            margin: 10px auto 0 auto;
            transform: none;
          }

          .skills-detail-panel {
            position: relative;
            top: 0;
            right: 0;
            width: min(96vw, 620px);
            min-height: 0;
            margin: 12px auto 24px auto;
            padding: 12px 10px 14px;
          }

          .skills-detail-body {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .skills-right {
            display: none;
          }

          .skills-footer {
            display: none;
          }
        }
      `}</style>

      <div className="skills-overlay">
        <div className="skills-top-banner">
          <div className="skills-banner-row">
            <div className="skills-banner-name">Anson Chan</div>
            <div className="skills-banner-nav">LB &lt; / &gt; RB</div>
          </div>
          <div className="skills-banner-main">
            <div className="skills-banner-class">{section.title}</div>
            <div className="skills-banner-exp">LEVEL {78 + active} | MASTERY {section.rank}.0</div>
          </div>
        </div>

        <div className="skills-stack">
          <div className={`skills-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {SECTIONS.map((item, index) => (
            <div
              key={item.id}
              className={`skills-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="skills-card">
                <div className="skills-badge">
                  <div className="skills-badge-text">{item.badge}</div>
                </div>
                <div className="skills-card-inner">
                  <div className="skills-title">{item.title}</div>
                  <div className="skills-rank">
                    <div className="skills-rank-label">RANK</div>
                    <div className="skills-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="skills-subtitle-bar">
                  <div className="skills-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="skills-detail-panel">
          <div className="skills-detail-top">
            <div className="skills-detail-top-index">{section.index}</div>
            <div className="skills-detail-top-title">{section.panelTitle}</div>
            <div className="skills-detail-top-progress">{section.progress}</div>
          </div>

          <div className="skills-detail-body">
            <div className="skills-grid-wrap">
              <div className="skills-grid">
                {leftItems.map((item) => (
                  renderSkillRow(item, section.items.indexOf(item))
                ))}
                {rightItems.map((item) => (
                  renderSkillRow(item, section.items.indexOf(item))
                ))}
              </div>
            </div>

            <div className="skills-right">
              <div className="skills-portrait-wrap">
                <img className="skills-portrait" src={char2} alt="Persona style character" />
              </div>
              <div className="skills-stats">
                {section.stats.map((stat) => (
                  <div className="skills-stat-row" key={stat.label}>
                    <div className="skills-stat-label">{stat.label}</div>
                    <div className="skills-stat-bar">
                      <div className="skills-stat-fill" style={{ width: `${stat.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="skills-detail-bottom">
            <div className="skills-detail-bottom-title">NOTES</div>
            <div className="skills-detail-bullets">
              {section.notes.map((bullet) => (
                <div className="skills-detail-bullet" key={bullet}>
                  {bullet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`skills-footer${mounted ? " mounted" : ""}`}>
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
