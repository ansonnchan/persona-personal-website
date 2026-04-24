import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "./assets/main1.mp4";

const PROJECTS = [
  {
    title: "Persona Personal Website",
    stack: "React, Vite, Framer Motion",
    impact: "Built and deployed a themed portfolio site to showcase projects and career profile.",
    link: "https://github.com/ansonnchan/persona-personal-website",
  },
  {
    title: "TODO: Project Name #2",
    stack: "TODO: Tech stack",
    impact: "TODO: One-line impact statement with measurable result.",
    link: "https://github.com/ansonnchan",
  },
  {
    title: "TODO: Project Name #3",
    stack: "TODO: Tech stack",
    impact: "TODO: What problem you solved and for who.",
    link: "https://github.com/ansonnchan",
  },
];

export default function PersonalProjects() {
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
      <div className="proj-overlay">
        <div className="proj-header">PERSONAL PROJECTS</div>
        <div className="proj-sub">Replace TODO items with your best work for recruiters.</div>

        <div className="proj-list">
          {PROJECTS.map((project) => (
            <article className="proj-card" key={project.title}>
              <h2 className="proj-title">{project.title}</h2>
              <p className="proj-meta">{project.stack}</p>
              <p className="proj-impact">{project.impact}</p>
              <a className="proj-link" href={project.link} target="_blank" rel="noreferrer">
                View Link
              </a>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@400;700&display=swap');

        .proj-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          padding: 7vh 4vw;
          color: #f1f7ff;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .proj-header {
          font-family: 'Anton', sans-serif;
          font-size: clamp(42px, 7vw, 84px);
          letter-spacing: 2px;
          line-height: 0.95;
          text-shadow: 0 2px 0 rgba(0, 0, 0, 0.3);
        }

        .proj-sub {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(16px, 2.3vw, 24px);
          opacity: 0.94;
        }

        .proj-list {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
          max-width: 1150px;
        }

        .proj-card {
          background: linear-gradient(180deg, rgba(9, 20, 73, 0.93) 0%, rgba(6, 13, 51, 0.95) 100%);
          border: 1px solid rgba(152, 231, 255, 0.38);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          padding: 18px 16px 16px;
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.32);
        }

        .proj-title {
          margin: 0;
          font-family: 'Anton', sans-serif;
          font-size: 30px;
          line-height: 0.95;
          color: #95f5ff;
          letter-spacing: 0.7px;
        }

        .proj-meta {
          margin: 10px 0 0;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 19px;
          color: #ffd56f;
          letter-spacing: 0.5px;
        }

        .proj-impact {
          margin: 10px 0 0;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          line-height: 1.3;
          color: #f4fbff;
        }

        .proj-link {
          margin-top: 14px;
          display: inline-block;
          font-family: 'Anton', sans-serif;
          font-size: 18px;
          letter-spacing: 1px;
          color: #0f1639;
          text-decoration: none;
          background: #9cf5ff;
          padding: 6px 11px;
        }

        @media (max-width: 700px) {
          .proj-overlay {
            padding: 6vh 4vw;
          }

          .proj-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
