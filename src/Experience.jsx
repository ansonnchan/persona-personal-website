import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultBackground from "./assets/train-web.mp4";

const STATIONS = [
  {
    id: "borrowd",
    shortLabel: "ROLE 01",
    line: "CAREER LINE",
    title: "Borrowd",
    details: [
      "Borrowd",
      "Software Developer Intern",
      "January 2026 - April 2026",
      "Backend development, fixing bugs and implementing features both internally (employees) and externally",
      "Tech Stack: Python, Django"
    ],
    status: "COMPLETED",
    completion: 100,
    notes: ["TODO: Add 1-2 measurable impact bullets for this role."],
  },
  {
    id: "atria",
    shortLabel: "ROLE 02",
    line: "CAREER LINE",
    title: "Atria",
    details: [
      "Atria",
      "Software Developer Intern",
      "May 2026 - Present",
      "Full-stack development, new feature implementation",
      "Tech Stack: JavaScript, React, Python, Django",
    ],
    status: "INCOMING",
    completion: 60,
    notes: ["TODO: Add confirmed timeline and expected responsibilities."],
  },
  /* 
  {
    id: "next",
    shortLabel: "ROLE 03",
    line: "CAREER LINE",
    title: "Next Internship Target",
    details: [
      "TODO: Target company / domain",
      "TODO: Preferred role",
      "TODO: Target term",
      "TODO: Priority skills to build",
    ],
    status: "ACTIVE",
    completion: 45,
    notes: ["TODO: Keep this focused on job search pipeline milestones."],
  },
  {
    id: "fulltime",
    shortLabel: "ROLE 04",
    line: "CAREER LINE",
    title: "Full-Time Goal",
    details: [
      "TODO: Target role after graduation",
      "TODO: Preferred industry/team",
      "TODO: Location preference",
      "TODO: Readiness checklist",
    ],
    status: "PLANNING",
    completion: 30,
    notes: ["TODO: Use this as the long-term destination checkpoint."],
  },
  */
];

function statusClass(status) {
  const key = status.toLowerCase();
  if (key === "completed") return "done";
  if (key === "incoming") return "incoming";
  if (key === "live" || key === "active" || key === "in progress") return "live";
  return "default";
}

export default function Experience({ src }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const resolvedBackground = src || defaultBackground;
  const current = STATIONS[active];

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive((i) => (i - 1 + STATIONS.length) % STATIONS.length);
        setPanelOpen(false);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive((i) => (i + 1) % STATIONS.length);
        setPanelOpen(false);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        setPanelOpen((open) => !open);
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        if (panelOpen) {
          setPanelOpen(false);
        } else {
          navigate(-1);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, panelOpen]);

  return (
    <div id="menu-screen">
      <video src={resolvedBackground} autoPlay loop muted playsInline preload="auto" />

      <div className="exp-overlay">
        <header className="exp-header">
          <h1>CAREER ARC</h1>
          <p>Chosen Route: Software Engineer</p>
        </header>

        <section className="exp-route-wrap" aria-label="Career arc stations">
          <div className="exp-route-line" aria-hidden="true" />
          <div className="exp-stations" style={{ gridTemplateColumns: `repeat(${STATIONS.length}, minmax(0, 1fr))` }}>
            {STATIONS.map((station, index) => {
              const isActive = index === active;
              return (
                <button
                  key={station.id}
                  type="button"
                  className={`exp-station ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setActive(index);
                    setPanelOpen(false);
                  }}
                >
                  <span className="exp-station-dot" />
                  <span className="exp-station-label">STOP {index + 1}</span>
                  {isActive && !panelOpen ? <span className="exp-enter-chip">ENTER</span> : null}
                </button>
              );
            })}
          </div>
        </section>

        {!panelOpen ? (
          <div className="exp-enter-hint" role="status" aria-live="polite">
            <span className="exp-enter-title">{current.title}</span>
            <span className="exp-enter-text">Press ENTER to view checkpoint summary</span>
          </div>
        ) : null}

        <section className={`exp-detail ${panelOpen ? "open" : ""}`}>
          <div className="exp-detail-top">
            <div className="exp-detail-title">{current.title}</div>
            <div className={`exp-status ${statusClass(current.status)}`}>{current.status}</div>
          </div>

          <div className="exp-detail-lines">
            {current.details.map((line) => (
              <div className="exp-detail-line" key={line}>{line}</div>
            ))}
          </div>

          <div className="exp-progress-block">
            <div className="exp-progress-head">
              <span>{current.line}</span>
              <span>{current.completion}%</span>
            </div>
            <div className="exp-progress-rail">
              <div className="exp-progress-fill" style={{ width: `${current.completion}%` }} />
            </div>
          </div>

          <div className="exp-achievements">
            <div className="exp-achievements-title">NOTES</div>
            {current.notes.map((item) => (
              <div className="exp-achievement" key={item}>- {item}</div>
            ))}
          </div>
        </section>
      </div>

      <div className={`exp-footer${mounted ? " mounted" : ""}`}>
        <div className="exp-footer-row"><span className="exp-footer-key">← →</span><span>MOVE</span></div>
        <div className="exp-footer-row"><span className="exp-footer-key">ENTER</span><span>DETAIL</span></div>
        <div className="exp-footer-row"><span className="exp-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .exp-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          padding: 5vh 3.5vw 9vh;
          display: grid;
          grid-template-rows: auto auto 1fr;
          gap: 20px;
          color: #eef8ff;
        }

        .exp-header h1 {
          margin: 0;
          font-family: 'Anton', sans-serif;
          font-size: clamp(48px, 7vw, 92px);
          line-height: 0.9;
          letter-spacing: 1px;
          color: #082b73;
          text-shadow: 0 2px 0 rgba(255, 255, 255, 0.2);
        }

        .exp-header p {
          margin: 8px 0 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(20px, 2.2vw, 34px);
          letter-spacing: 1px;
          color: #0d347f;
          opacity: 1;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.22);
        }

        .exp-route-wrap {
          position: relative;
          padding: 16px 0 10px;
        }

        .exp-route-line {
          position: absolute;
          left: 8%;
          right: 8%;
          top: 34px;
          height: 6px;
          background: linear-gradient(90deg, rgba(142, 245, 255, 0.22), rgba(142, 245, 255, 0.8), rgba(142, 245, 255, 0.22));
          box-shadow: 0 0 16px rgba(142, 245, 255, 0.35);
          animation: exp-route-pulse 2.4s ease-in-out infinite;
        }

        @keyframes exp-route-pulse {
          0%, 100% { opacity: 0.72; }
          50% { opacity: 1; }
        }

        .exp-stations {
          position: relative;
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
          align-items: start;
        }

        .exp-station {
          border: 0;
          background: transparent;
          color: #d8f8ff;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .exp-station:hover {
          transform: translateY(-2px);
        }

        .exp-station-dot {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #7defff;
          border: 2px solid rgba(255, 255, 255, 0.75);
          box-shadow: 0 0 0 6px rgba(125, 239, 255, 0.15);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .exp-station-label {
          font-family: 'Anton', sans-serif;
          font-size: clamp(18px, 1.45vw, 25px);
          letter-spacing: 0.7px;
          text-align: center;
          line-height: 1;
          color: rgba(236, 251, 255, 0.9);
          opacity: 0;
          transform: translateY(-4px);
          transition: color 0.2s ease, opacity 0.18s ease, transform 0.18s ease;
        }

        .exp-station.active .exp-station-dot {
          transform: scale(1.22);
          background: #fff;
          box-shadow: 0 0 0 8px rgba(142, 245, 255, 0.28), 0 0 22px rgba(142, 245, 255, 0.7);
        }

        .exp-station.active .exp-station-label {
          color: #9cf5ff;
          opacity: 1;
          transform: translateY(0);
        }

        .exp-enter-chip {
          margin-top: -4px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(13px, 0.95vw, 18px);
          letter-spacing: 1.2px;
          padding: 1px 7px;
          border: 1px solid rgba(255, 255, 255, 0.72);
          background: rgba(0, 0, 0, 0.52);
          color: #f4fdff;
          border-radius: 5px;
          animation: exp-enter-blink 1s ease-in-out infinite;
        }

        @keyframes exp-enter-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }

        .exp-enter-hint {
          justify-self: end;
          width: min(42vw, 700px);
          min-height: 86px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          padding: 14px 18px;
          background: linear-gradient(180deg, rgba(10, 24, 92, 0.8) 0%, rgba(6, 14, 54, 0.86) 100%);
          border: 1px solid rgba(147, 239, 255, 0.35);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(147, 239, 255, 0.08), 14px 14px 0 rgba(0, 6, 30, 0.35);
        }

        .exp-enter-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(23px, 1.8vw, 31px);
          color: #a3f7ff;
          line-height: 1;
        }

        .exp-enter-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(16px, 1.1vw, 22px);
          letter-spacing: 1px;
          color: #eefbff;
        }

        .exp-detail {
          justify-self: end;
          width: min(42vw, 700px);
          min-height: 52vh;
          background: linear-gradient(180deg, rgba(12, 24, 96, 0.95) 0%, rgba(6, 15, 62, 0.96) 100%);
          border: 1px solid rgba(147, 239, 255, 0.35);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          padding: 18px 20px;
          box-shadow: inset 0 0 0 1px rgba(147, 239, 255, 0.1), 14px 14px 0 rgba(0, 6, 30, 0.45);
          transform: translateX(18px);
          opacity: 0;
          transition: transform 0.28s ease, opacity 0.28s ease;
          pointer-events: none;
          overflow: hidden;
        }

        .exp-detail.open {
          transform: translateX(0);
          opacity: 1;
          pointer-events: all;
        }

        .exp-detail-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 14px;
        }

        .exp-detail-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(30px, 2.5vw, 45px);
          line-height: 0.95;
          color: #97f6ff;
        }

        .exp-status {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1px;
          font-size: clamp(18px, 1.3vw, 24px);
          padding: 6px 10px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
          background: #8df6ff;
          color: #08153f;
        }

        .exp-status.done {
          background: #8dffb7;
        }

        .exp-status.incoming {
          background: #ffd56f;
        }

        .exp-status.live {
          background: #9cf5ff;
        }

        .exp-detail-lines {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .exp-detail-line {
          font-family: 'Anton', sans-serif;
          font-size: clamp(17px, 1.1vw, 23px);
          color: #f2fcff;
          line-height: 1.2;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(166, 240, 255, 0.18);
          border-radius: 10px;
        }

        .exp-progress-block {
          margin-top: 16px;
        }

        .exp-progress-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(18px, 1.1vw, 23px);
          letter-spacing: 1px;
          color: #b7fbff;
        }

        .exp-progress-rail {
          margin-top: 7px;
          height: 12px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(151, 238, 255, 0.2);
          overflow: hidden;
        }

        .exp-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6be7ff 0%, #95f6ff 60%, #dbfeff 100%);
          box-shadow: 0 0 10px rgba(125, 239, 255, 0.45);
          transition: width 0.35s ease;
        }

        .exp-achievements {
          margin-top: 18px;
          padding: 14px;
          background: rgba(6, 14, 58, 0.92);
          border: 1px solid rgba(146, 239, 255, 0.15);
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
        }

        .exp-achievements-title {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.5px;
          font-size: clamp(20px, 1.2vw, 26px);
          color: #8ff4ff;
          margin-bottom: 8px;
        }

        .exp-achievement {
          font-family: 'Anton', sans-serif;
          font-size: clamp(16px, 1vw, 21px);
          line-height: 1.22;
          color: #eefaff;
          margin-top: 7px;
        }

        .exp-footer {
          position: fixed;
          right: 28px;
          bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 5px;
          padding: 8px 10px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(0, 0, 0, 0.58);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          font-family: 'Bebas Neue', sans-serif;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }

        .exp-footer.mounted {
          opacity: 1;
        }

        .exp-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 17px;
          letter-spacing: 2.2px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
        }

        .exp-footer-key {
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.72);
          color: #fff;
          padding: 2px 8px;
          font-size: 14px;
        }

        @media (max-width: 1150px) {
          .exp-overlay {
            padding: 4vh 3.5vw 8vh;
          }

          .exp-stations {
            gap: 6px;
          }

          .exp-station-label {
            font-size: clamp(16px, 1.8vw, 22px);
          }

          .exp-detail {
            width: min(100%, 760px);
            justify-self: stretch;
          }

          .exp-enter-hint {
            width: min(100%, 760px);
            justify-self: stretch;
          }
        }

        @media (max-width: 820px) {
          .exp-route-wrap {
            overflow-x: auto;
            padding-bottom: 2px;
          }

          .exp-route-line {
            left: 26px;
            right: 26px;
          }

          .exp-stations {
            width: 680px;
          }

          .exp-detail {
            min-height: auto;
            max-height: 58vh;
            overflow-y: auto;
          }

          .exp-footer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
