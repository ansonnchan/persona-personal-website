import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main1.mp4";

const SKILL_GROUPS = [
  {
    title: "Languages",
    items: [
      { name: "Python", stars: 5 },
      { name: "Java", stars: 4 },
      { name: "JavaScript", stars: 4 },
      { name: "SQL", stars: 3 },
      { name: "C / C++", stars: 4 },
      { name: "HTML5 / CSS3", stars: 2 },
    ],
  },
  {
    title: "Frameworks (Learning)",
    items: [
      { name: "Spring Boot", stars: 5 },
      { name: "Django", stars: 5 },
      { name: "React", stars: 5 },
      { name: "Next.js", stars: 5 },
      { name: "Node.js", stars: 5 },
      { name: "Flask", stars: 4 },
      { name: "FastAPI", stars: 4 },
    ],
  },
  {
    title: "Cloud / Infrastructure",
    items: [
      { name: "AWS", stars: 5 },
      { name: "Docker", stars: 5 },
      { name: "Git", stars: 5 },
      { name: "Jira", stars: 5 },
    ],
  },
  {
    title: "AI / ML",
    items: [
      { name: "scikit-learn", stars: 5 },
      { name: "PyTorch", stars: 3 },
      { name: "TensorFlow", stars: 2 },
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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />

      <div className="skills-overlay">
        <div className="skills-header">TECHNICAL SKILLS</div>
        <div className="skills-sub">Experience levels shown out of 5 stars.</div>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group) => (
            <section className="skills-group" key={group.title}>
              <h2 className="skills-group-title">{group.title}</h2>
              <div className="skills-list">
                {group.items.map((item) => (
                  <div className="skills-row" key={item.name}>
                    <span className="skills-name">{item.name}</span>
                    <Stars count={item.stars} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@400;700&display=swap');

        .skills-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          padding: 6vh 4vw;
          color: #f1f7ff;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .skills-header {
          font-family: 'Anton', sans-serif;
          font-size: clamp(42px, 6.4vw, 82px);
          letter-spacing: 2px;
          line-height: 0.95;
          color: #c8f8ff;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.35);
        }

        .skills-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(17px, 2.2vw, 24px);
          color: #f7fcff;
          opacity: 0.93;
        }

        .skills-grid {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 14px;
          max-width: 1200px;
        }

        .skills-group {
          background: linear-gradient(180deg, rgba(9, 20, 73, 0.94) 0%, rgba(6, 13, 51, 0.95) 100%);
          border: 1px solid rgba(152, 231, 255, 0.4);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          padding: 16px;
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.32);
        }

        .skills-group-title {
          margin: 0;
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          letter-spacing: 1px;
          color: #95f5ff;
        }

        .skills-list {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .skills-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          border-bottom: 1px solid rgba(161, 235, 255, 0.16);
          padding-bottom: 6px;
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

        @media (max-width: 700px) {
          .skills-overlay {
            padding: 5.5vh 4vw;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .skills-name {
            font-size: 19px;
          }
        }
      `}</style>
    </div>
  );
}
