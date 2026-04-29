import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main2-web.mp4";
import char5 from "./assets/char5.png";
import char6 from "./assets/char6.jpg";
import char7 from "./assets/char7.jpg";
import char4 from "./assets/char4.jpg";

const SKILL_CARDS = [
  {
    id: "languages",
    title: "Languages",
    //subtitle: "Core coding fluency",
    image: char5,
    skills: [
      { name: "Python", rating: 5 },
      { name: "Java", rating: 4 },
      { name: "TypeScript / JavaScript", rating: 4 },
      { name: "C++", rating: 3 },
      { name: "C", rating: 3 },
      { name: "SQL", rating: 4 },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
   // subtitle: "Full-stack delivery",
    image: char6,
    skills: [
      { name: "React", rating: 5 },
      { name: "Next.js", rating: 4 },
      { name: "Node.js", rating: 4 },
      { name: "Spring Boot", rating: 5 },
      { name: "Django", rating: 3 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    // subtitle: "Ship and operate",
    image: char7,
    skills: [
      { name: "AWS", rating: 4 },
      { name: "Docker", rating: 3 },
      { name: "Git", rating: 5 },
      { name: "Kubernetes", rating: 3 },
    ],
  },
  {
    id: "ml",
    title: "AI / ML",
    //subtitle: "Model experimentation",
    image: char4,
    skills: [
      { name: "scikit-learn", rating: 5 },
      { name: "PyTorch", rating: 4 },
      { name: "TensorFlow", rating: 3 },
      { name: "HuggingFace", rating: 5 },
      { name: "OpenCV", rating: 5 },
    ],
  },
];

function Stars({ value }) {
  const clamped = Math.max(0, Math.min(5, value));
  return (
    <span className="skills-stars" aria-label={`${clamped} out of 5 stars`}>
      {"★★★★★".slice(0, clamped)}
      <span className="skills-stars-dim">{"★★★★★".slice(clamped)}</span>
    </span>
  );
}

export default function Skills() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState([false, false, false, false]);

  const setActiveCard = (nextIndex) => {
    setActive(nextIndex);
    // Whenever focus moves away from a card, reset all cards to front side.
    setFlipped([false, false, false, false]);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveCard((active - 1 + SKILL_CARDS.length) % SKILL_CARDS.length);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveCard((active + 1) % SKILL_CARDS.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        setFlipped((prev) => prev.map((v, i) => (i === active ? !v : v)));
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline preload="auto" />

      <section className="skills-root">
        <header className="skills-header">
          <h1>SKILLS</h1>
                <p>Select a skill card to reveal its stats.</p>
        </header>

        <div className="skills-rotator" role="tablist" aria-label="Skill categories">
          <button
            type="button"
            className="skills-nav-btn"
            aria-label="Previous skill card"
            onClick={() => setActiveCard((active - 1 + SKILL_CARDS.length) % SKILL_CARDS.length)}
          >
            ◀
          </button>

          <div className="skills-grid">
            {SKILL_CARDS.map((card, idx) => {
              const isActive = idx === active;
              const isFlipped = flipped[idx];

              return (
                <button
                  key={card.id}
                  type="button"
                  className={`skill-tile ${isActive ? "active" : ""} ${isFlipped ? "flipped" : ""}`}
                  aria-selected={isActive}
                  onClick={() => {
                    if (!isActive) {
                      setActiveCard(idx);
                      return;
                    }
                    setFlipped((prev) => prev.map((v, i) => (i === idx ? !v : v)));
                  }}
                >
                  <div className="skill-tile-inner">
                    <div className="skill-face skill-front" style={{ backgroundImage: `url(${card.image})` }}>
                      <img className="skill-front-image" src={card.image} alt={`${card.title} character`} loading="eager" decoding="async" />
                      <span className="skill-front-overlay" />
                    </div>

                    <div className="skill-face skill-back">
                      <h3>{card.title}</h3>
                      <ul>
                        {card.skills.map((skill) => (
                          <li key={skill.name}>
                            <span>{skill.name}</span>
                            <Stars value={skill.rating} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="skills-nav-btn"
            aria-label="Next skill card"
            onClick={() => setActiveCard((active + 1) % SKILL_CARDS.length)}
          >
            ▶
          </button>
        </div>
      </section>

      <div className="skills-footer" aria-hidden="true">
        <div className="skills-footer-row"><span className="skills-footer-key">ESC</span><span>BACK</span></div>
        <div className="skills-footer-row"><span className="skills-footer-key">←→</span><span>SELECT</span></div>
        <div className="skills-footer-row"><span className="skills-footer-key">↵</span><span>FLIP</span></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@400;700&display=swap');

        .skills-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          padding: 5vh 3.5vw;
          display: grid;
          grid-template-rows: auto 1fr;
          gap: 20px;
          color: #eef7ff;
        }

        .skills-header h1 {
          margin: 0;
          font-family: 'Anton', sans-serif;
          font-size: clamp(46px, 7vw, 88px);
          letter-spacing: 1px;
          line-height: 0.9;
        }

        .skills-header p {
          margin: 10px 0 0;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(19px, 2.3vw, 30px);
          opacity: 0.93;
        }

        .skills-rotator {
          display: grid;
          grid-template-columns: 62px 1fr 62px;
          align-items: center;
          gap: 12px;
        }

        .skills-nav-btn {
          height: 62px;
          border: 0;
          border-radius: 14px;
          background: rgba(5, 14, 66, 0.85);
          color: #b9f4ff;
          font-size: 27px;
          cursor: pointer;
          box-shadow: 0 10px 18px rgba(0, 0, 0, 0.3);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .skill-tile {
          border: 1px solid rgba(161, 242, 255, 0.48);
          border-radius: 18px;
          background: transparent;
          padding: 0;
          height: clamp(420px, 56vh, 560px);
          text-align: left;
          cursor: pointer;
          perspective: 1200px;
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }

        .skill-tile.active {
          transform: translateY(-12px) scale(1.03);
          border-color: #a9f6ff;
          box-shadow: 0 0 0 2px rgba(169, 246, 255, 0.4), 0 16px 30px rgba(53, 224, 255, 0.35);
        }

        .skill-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 18px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .skill-tile-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .skill-tile.flipped .skill-tile-inner {
          transform: rotateY(180deg);
        }

        .skill-front {
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .skill-front-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(1.18) contrast(1.08) saturate(1.08);
          z-index: 1;
        }

        .skill-front-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 18, 66, 0.04) 0%, rgba(6, 15, 58, 0.1) 100%);
          z-index: 2;
        }

        .skill-back {
          background: linear-gradient(180deg, rgba(9, 19, 72, 0.98) 0%, rgba(7, 15, 58, 0.98) 100%);
          border: 1px solid rgba(167, 242, 255, 0.45);
          padding: 16px;
          display: grid;
          grid-template-rows: auto 1fr;
          gap: 10px;
          transform: rotateY(180deg);
        }

        .skill-back h3 {
          margin: 0;
          font-family: 'Anton', sans-serif;
          font-size: clamp(27px, 2vw, 35px);
          color: #95f5ff;
          letter-spacing: 0.4px;
          text-align: center;
        }

        .skill-back ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
          align-content: start;
        }

        .skill-back li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(166, 240, 255, 0.2);
          border-radius: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(19px, 1.35vw, 24px);
          color: #ffffff;
          font-weight: 700;
        }

        .skills-stars {
          font-family: 'Anton', sans-serif;
          font-size: clamp(16px, 1.15vw, 19px);
          letter-spacing: 1px;
          color: #ffe181;
          white-space: nowrap;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.42);
        }

        .skills-stars-dim {
          color: rgba(255, 225, 129, 0.3);
        }

        .skills-footer {
          position: fixed;
          right: 18px;
          bottom: 16px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          padding: 6px 8px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(0, 0, 0, 0.58);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          font-family: 'Bebas Neue', sans-serif;
        }

        .skills-footer-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          letter-spacing: 1.8px;
          color: rgba(255, 255, 255, 0.92);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
          line-height: 1;
        }

        .skills-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.72);
          color: #fff;
          padding: 2px 7px;
          font-size: 12px;
        }

        @media (max-width: 1200px) {
          .skills-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .skill-tile {
            height: 360px;
          }
        }

        @media (max-width: 700px) {
          .skills-root {
            padding: 4vh 3.5vw;
            gap: 12px;
          }

          .skills-rotator {
            grid-template-columns: 46px 1fr 46px;
            gap: 8px;
          }

          .skills-nav-btn {
            height: 46px;
            font-size: 22px;
          }

          .skills-grid {
            gap: 12px;
          }

          .skill-tile {
            height: 300px;
          }

          .skill-tile.active {
            transform: translateY(-6px) scale(1.01);
          }

          .skill-back li {
            font-size: 18px;
          }

          .skills-footer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
