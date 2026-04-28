import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import igor from "./assets/igor.png";
import elizabeth from "./assets/elizabeth-2.png";

const ARCANA = {
  FOOL: {
    num: "0",
    full: "THE FOOL",
    color: "#4de8ff",
    dimColor: "rgba(77,232,255,0.12)",
    borderActive: "rgba(77,232,255,0.7)",
  },
  MAGICIAN: {
    num: "I",
    full: "THE MAGICIAN",
    color: "#f0c040",
    dimColor: "rgba(240,192,64,0.12)",
    borderActive: "rgba(240,192,64,0.7)",
  },
  JUSTICE: {
    num: "XI",
    full: "JUSTICE",
    color: "#90d8ff",
    dimColor: "rgba(144,216,255,0.12)",
    borderActive: "rgba(144,216,255,0.7)",
  },
  HERMIT: {
    num: "IX",
    full: "THE HERMIT",
    color: "#9898ee",
    dimColor: "rgba(152,152,238,0.12)",
    borderActive: "rgba(152,152,238,0.7)",
  },
};

const ARCANA_ORDER = ["ALL", "FOOL", "MAGICIAN", "JUSTICE", "HERMIT"];

const PROJECTS = [
  {
    id: "persona-personal-website",
    title: "Persona Personal Website",
    arcana: "FOOL",
    stack: ["React", "Vite", "Framer Motion", "React Router"],
    summary: "A living portfolio archive that turns navigation into a compendium ritual.",
    impact: "Reframes the personal site as a menu-driven presentation layer.",
    details:
      "Built as a route-based experience with Persona-inspired transitions, audio-aware chrome, and summonable project cards so the site reads like a playable archive instead of a static brochure.",
    link: "https://github.com/ansonnchan/persona-personal-website",
  },
  {
    id: "project-02",
    title: "Project #2",
    arcana: "JUSTICE",
    stack: ["React", "Node", "APIs", "State Orchestration"],
    summary: "A systems-heavy build focused on reliability, structure, and readable flows.",
    impact: "Shows backend-aware thinking with a clear information hierarchy.",
    details:
      "Archive placeholder for a project that balances product behavior with technical structure. Its compendium entry suggests a disciplined system where state, data, and presentation stay in sync.",
    link: "https://github.com/ansonnchan",
  },
  {
    id: "project-03",
    title: "Project #3",
    arcana: "MAGICIAN",
    stack: ["UI / UX", "Systems", "Motion", "Prototyping"],
    summary: "An interface experiment centered on feedback, rhythm, and motion language.",
    impact: "Explores how interaction can explain the state of a system.",
    details:
      "Archive placeholder for an exploratory UI project with layered states, responsive surfaces, and intentional animation cues that guide the user like a combat HUD.",
    link: "https://github.com/ansonnchan",
  },
];


function ArcanaArt({ arcana, size = 72 }) {
  const c = ARCANA[arcana]?.color ?? "#4de8ff";
  const arts = {
    FOOL: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" fill="none" stroke={c} strokeWidth="0.8" opacity="0.25" />
        <circle cx="50" cy="50" r="26" fill="none" stroke={c} strokeWidth="0.6" opacity="0.2" />
        <circle cx="50" cy="50" r="3.5" fill={c} opacity="0.65" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
          const r = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={50 + 14 * Math.cos(r)} y1={50 + 14 * Math.sin(r)}
              x2={50 + 32 * Math.cos(r)} y2={50 + 32 * Math.sin(r)}
              stroke={c} strokeWidth="0.7" opacity="0.38"
            />
          );
        })}
        <circle cx="50" cy="50" r="45" fill="none" stroke={c} strokeWidth="0.4" strokeDasharray="3 7" opacity="0.18" />
      </svg>
    ),
    MAGICIAN: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <polygon
          points="50,10 62,38 92,38 68,56 78,84 50,66 22,84 32,56 8,38 38,38"
          fill="none" stroke={c} strokeWidth="0.9" opacity="0.5"
        />
        <circle cx="50" cy="50" r="7" fill={c} opacity="0.5" />
        <circle cx="50" cy="50" r="19" fill="none" stroke={c} strokeWidth="0.4" opacity="0.2" />
      </svg>
    ),
    JUSTICE: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <line x1="50" y1="14" x2="50" y2="86" stroke={c} strokeWidth="1.2" opacity="0.4" />
        <line x1="22" y1="32" x2="78" y2="32" stroke={c} strokeWidth="1" opacity="0.4" />
        <rect x="16" y="35" width="26" height="16" rx="3" fill="none" stroke={c} strokeWidth="0.8" opacity="0.45" />
        <rect x="58" y="35" width="26" height="16" rx="3" fill="none" stroke={c} strokeWidth="0.8" opacity="0.45" />
        <circle cx="50" cy="32" r="3.5" fill={c} opacity="0.55" />
        <line x1="42" y1="35" x2="38" y2="51" stroke={c} strokeWidth="0.6" opacity="0.28" />
        <line x1="58" y1="35" x2="62" y2="51" stroke={c} strokeWidth="0.6" opacity="0.28" />
      </svg>
    ),
    HERMIT: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <ellipse cx="50" cy="62" rx="17" ry="24" fill="none" stroke={c} strokeWidth="0.8" opacity="0.35" />
        <circle cx="50" cy="36" r="11" fill="none" stroke={c} strokeWidth="0.9" opacity="0.45" />
        <circle cx="50" cy="36" r="4.5" fill={c} opacity="0.5" />
        <line x1="50" y1="47" x2="50" y2="62" stroke={c} strokeWidth="1.2" opacity="0.42" />
        {[-28, -14, 0, 14, 28].map((offset, i) => (
          <line key={i} x1={50 + offset * 0.4} y1={86} x2={50} y2={62} stroke={c} strokeWidth="0.5" opacity="0.18" />
        ))}
      </svg>
    ),
  };
  return arts[arcana] ?? null;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function VelvetRoomProjects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0); // 0: Igor, 1: Elizabeth confirm, 2: fade out

  const filtered = useMemo(
    () => (filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.arcana === filter)),
    [filter]
  );
  const arcanaCounts = useMemo(
    () => PROJECTS.reduce((acc, p) => ({ ...acc, [p.arcana]: (acc[p.arcana] || 0) + 1 }), {}),
    []
  );

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject]);

  // Keyboard navigation for filter switching
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (selectedProject) {
          setSelectedProject(null);
        } else {
          navigate("/");
        }
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (!selectedProject) {
          const currentIdx = ARCANA_ORDER.indexOf(filter);
          if (e.key === "ArrowLeft") {
            const nextIdx = (currentIdx - 1 + ARCANA_ORDER.length) % ARCANA_ORDER.length;
            setFilter(ARCANA_ORDER[nextIdx]);
          } else {
            const nextIdx = (currentIdx + 1) % ARCANA_ORDER.length;
            setFilter(ARCANA_ORDER[nextIdx]);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedProject, filter, navigate]);
  return (
    <LayoutGroup>
      <div className="vr">
        {/* ── ATMOSPHERIC LAYERS ── */}
        <div className="vr-bg-base" />
        <div className="vr-bg-glow vr-bg-glow--a" />
        <div className="vr-bg-glow vr-bg-glow--b" />
        <div className="vr-bg-slash" />
        <div className="vr-scanlines" />
        <div className="vr-grid" />

        {/* ── HEADER ── */}
        <header className="vr-header">
          <div className="vr-header__left">
            <p className="vr-eyebrow">VELVET ROOM  ·  PROJECT ARCHIVE</p>
            <h1 className="vr-title">COMPENDIUM</h1>
            <p className="vr-subtitle">Select an entry to inspect its status and summon details</p>
          </div>

          <div className="vr-header__right">
            <div className="vr-statbar">
              <div className="vr-statbar__cell">
                <span className="vr-statbar__val">{PROJECTS.length.toString().padStart(2, "0")}</span>
                <span className="vr-statbar__label">ARCHIVED</span>
              </div>
              <div className="vr-statbar__sep" />
              <div className="vr-statbar__cell">
                <span className="vr-statbar__val">{filtered.length.toString().padStart(2, "0")}</span>
                <span className="vr-statbar__label">VISIBLE</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── FILTER TABS ── */}
        <nav className="vr-filters" aria-label="Arcana filters">
          {ARCANA_ORDER.map((arcana) => {
            const cfg = arcana !== "ALL" ? ARCANA[arcana] : null;
            const isActive = filter === arcana;
            return (
              <motion.button
                key={arcana}
                className={`vr-tab ${isActive ? "is-active" : ""}`}
                style={cfg && isActive ? { "--tab-c": cfg.color } : {}}
                onClick={() => setFilter(arcana)}
                whileTap={{ scale: 0.97 }}
              >
                {cfg && <span className="vr-tab__num">{cfg.num}</span>}
                <span className="vr-tab__name">{arcana}</span>
                <span className="vr-tab__count">
                  {arcana === "ALL" ? PROJECTS.length : arcanaCounts[arcana] || 0}
                </span>
              </motion.button>
            );
          })}
        </nav>

        {/* ── MAIN LAYOUT ── */}
        <div className="vr-layout">
          {/* COMPENDIUM GRID */}
          <section className="vr-compendium" aria-label="Project archive">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => {
                const cfg = ARCANA[project.arcana];
                const isHov = hoveredId === project.id;
                const isDim = hoveredId && hoveredId !== project.id;

                return (
                  <motion.article
                    key={project.id}
                    layout
                    layoutId={`card-${project.id}`}
                    className={`vr-card ${isHov ? "is-hovered" : ""} ${isDim ? "is-dimmed" : ""}`}
                    style={{ "--c": cfg.color, "--cb": cfg.borderActive, "--cdim": cfg.dimColor }}
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{
                      opacity: isDim ? 0.38 : 1,
                      y: 0,
                      scale: isHov ? 1.025 : 1,
                      rotateX: isHov ? 5 : 0,
                      rotateY: isHov ? -3 : 0,
                      filter: isDim ? "blur(0.4px) saturate(0.5)" : "blur(0px) saturate(1)",
                    }}
                    exit={{ opacity: 0, y: 16, scale: 0.96 }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setHoveredId(project.id)}
                    onHoverEnd={() => setHoveredId((cur) => (cur === project.id ? null : cur))}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Arcana art header */}
                    <div className="vr-card__art">
                      <div className="vr-card__art-glow" />
                      <ArcanaArt arcana={project.arcana} size={68} />
                      <span className="vr-card__arcana-num">{cfg.num}</span>
                    </div>

                    {/* Card body */}
                    <div className="vr-card__body">
                      <p className="vr-card__arcana-label">{cfg.full}</p>
                      <h2 className="vr-card__title">{project.title}</h2>
                      <p className="vr-card__summary">{project.summary}</p>

                      <div className="vr-card__stack">
                        {project.stack.slice(0, 3).map((s) => (
                          <span key={s} className="vr-tag">{s}</span>
                        ))}
                      </div>

                      <div className="vr-card__footer">
                        <span className="vr-card__impact">{project.impact}</span>
                      </div>
                    </div>

                    {/* Scan-mode sweep */}
                    <div className="vr-card__scan" />

                    {/* Corner brackets (appear on hover) */}
                    <i className="vr-corner vr-corner--tl" />
                    <i className="vr-corner vr-corner--tr" />
                    <i className="vr-corner vr-corner--bl" />
                    <i className="vr-corner vr-corner--br" />

                                      {/* Hologram stats panel (appears on hover) */}
                                      <AnimatePresence>
                                        {isHov && (
                                          <motion.div
                                            className="vr-card__hologram"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 12 }}
                                            transition={{ duration: 0.25 }}
                                          >
                                            <div className="vr-holo-stat">
                                              <span className="vr-holo-label">COMPLEXITY</span>
                                              <div className="vr-holo-bar">
                                                <motion.div className="vr-holo-fill" initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 0.4, delay: 0.05 }} />
                                              </div>
                                            </div>
                                            <div className="vr-holo-stat">
                                              <span className="vr-holo-label">SCOPE</span>
                                              <div className="vr-holo-bar">
                                                <motion.div className="vr-holo-fill" initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 0.4, delay: 0.1 }} />
                                              </div>
                                            </div>
                                            <div className="vr-holo-stat">
                                              <span className="vr-holo-label">INNOVATION</span>
                                              <div className="vr-holo-bar">
                                                <motion.div className="vr-holo-fill" initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ duration: 0.4, delay: 0.15 }} />
                                              </div>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                className="vr-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                NO ARCHIVED ENTITIES MATCH THIS ARCANA
              </motion.div>
            )}
          </section>
        </div>

        {/* ── INTRO OVERLAY ── */}
        <AnimatePresence>
          {showIntro && introStep < 2 && (
            <motion.div
              className="vr-intro-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="vr-intro-card"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="vr-intro-portraits">
                  {/* Igor - appears when step 0 */}
                  <motion.figure
                    className="vr-intro-portrait"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={introStep === 0 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.4, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img src={igor} alt="Igor" />
                    <figcaption>IGOR</figcaption>
                  </motion.figure>

                  {/* Elizabeth - appears when step 1 */}
                  <motion.figure
                    className="vr-intro-portrait"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={introStep === 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.4, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img src={elizabeth} alt="Elizabeth" />
                    <figcaption>ELIZABETH</figcaption>
                  </motion.figure>
                </div>

                {/* Dialogue */}
                <div className="vr-intro-text">
                  <AnimatePresence mode="wait">
                    {introStep === 0 && (
                      <motion.div
                        key="igor-msg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="vr-intro-speaker">IGOR</p>
                        <p className="vr-intro-line">"Welcome esteemed visitor… The compendium awaits. Select any entry to examine its details."</p>
                      </motion.div>
                    )}
                    {introStep === 1 && (
                      <motion.div
                        key="elizabeth-msg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="vr-intro-speaker">ELIZABETH</p>
                        <p className="vr-intro-line">"You are about to visit the reclusive compendium of Anson, a digital archive where ambitious projects converge as Personas. A space where creativity meets precision, and vision materializes into code. Do you wish to proceed?"</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Buttons */}
                <div className="vr-intro-buttons">
                  {introStep === 0 && (
                    <>
                      <button
                        className="vr-intro-btn vr-intro-btn--back"
                        onClick={() => navigate("/")}
                      >
                        GO BACK
                      </button>
                      <button
                        className="vr-intro-btn vr-intro-btn--continue"
                        onClick={() => setIntroStep(1)}
                      >
                        CONTINUE
                      </button>
                    </>
                  )}
                  {introStep === 1 && (
                    <>
                      <button
                        className="vr-intro-btn vr-intro-btn--back"
                        onClick={() => setIntroStep(0)}
                      >
                        NO, BACK
                      </button>
                      <button
                        className="vr-intro-btn vr-intro-btn--continue"
                        onClick={() => {
                          setIntroStep(2);
                          setTimeout(() => setShowIntro(false), 1000);
                        }}
                      >
                        YES, PROCEED
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Fade to black transition */}
          {showIntro && introStep === 2 && (
            <motion.div
              className="vr-fade-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        {/* ── INSTRUCTION PAD ── */}
        <div className="vr-instruction-pad">
          <div className="vr-instruction-row">
            <span className="vr-instruction-key">ESC</span>
            <span>BACK</span>
          </div>
          <div className="vr-instruction-row">
            <span className="vr-instruction-key">←→</span>
            <span>SWITCH</span>
          </div>
        </div>

        {/* ── SUMMON OVERLAY ── */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="vr-summon-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.article
                layoutId={`card-${selectedProject.id}`}
                className="vr-summon-card"
                style={{
                  "--c": ARCANA[selectedProject.arcana].color,
                  "--cb": ARCANA[selectedProject.arcana].borderActive,
                  "--cdim": ARCANA[selectedProject.arcana].dimColor,
                }}
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Summon glow */}
                <div className="vr-summon-card__glow" />

                {/* Summon header */}
                <div className="vr-summon-card__head">
                  {/* Art panel */}
                  <div className="vr-summon-card__art">
                    <ArcanaArt arcana={selectedProject.arcana} size={100} />
                    <span className="vr-summon-card__arcana-num">
                      {ARCANA[selectedProject.arcana].num}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="vr-summon-card__info">
                    <p className="vr-summon-card__label">
                      SUMMON VIEW · {ARCANA[selectedProject.arcana].full}
                    </p>
                    <h2 className="vr-summon-card__title">{selectedProject.title}</h2>
                    <div className="vr-summon-card__stack">
                      {selectedProject.stack.map((s) => (
                        <span key={s} className="vr-tag">{s}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="vr-summon-card__close"
                    onClick={() => setSelectedProject(null)}
                  >
                    ✕ CLOSE
                  </button>
                </div>

                {/* Divider */}
                <div className="vr-summon-card__divider" />

                {/* Details */}
                <div className="vr-summon-card__details">
                  <div className="vr-detail-block">
                    <p className="vr-detail-label">PROJECT PROFILE</p>
                    <p className="vr-detail-text">{selectedProject.details}</p>
                  </div>
                  <div className="vr-detail-block">
                    <p className="vr-detail-label">RESULT / IMPACT</p>
                    <p className="vr-detail-text vr-detail-text--impact">{selectedProject.impact}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="vr-summon-card__actions">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="vr-action-link"
                  >
                    ⬡ OPEN LIVE RECORD
                  </a>
                </div>

                {/* Corner brackets */}
                <i className="vr-corner vr-corner--tl" />
                <i className="vr-corner vr-corner--tr" />
                <i className="vr-corner vr-corner--bl" />
                <i className="vr-corner vr-corner--br" />
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STYLES ── */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          /* ──── TOKENS ──── */
          .vr {
            --cyan:      #57e7ff;
            --gold:      #d8bc62;
            --red:       #ef476f;
            --text-hi:   rgba(244, 249, 255, 0.98);
            --text-mid:  rgba(180, 205, 230, 0.78);
            --text-lo:   rgba(118, 145, 180, 0.54);
            --border:    rgba(87, 231, 255, 0.16);
            --border-hi: rgba(87, 231, 255, 0.64);
            --card-bg:   rgba(8, 16, 38, 0.92);
            --panel-bg:  rgba(7, 14, 32, 0.9);
            --ff-title:  'Anton', sans-serif;
            --ff-mono:   'Share Tech Mono', monospace;
            --ff-body:   'Barlow Condensed', sans-serif;
          }

          /* ──── ROOT ──── */
          .vr {
            position: relative;
            min-height: 100dvh;
            background: #06101d;
            font-family: var(--ff-body);
            color: var(--text-hi);
            overflow-x: hidden;
            isolation: isolate;
          }

          /* ──── BG LAYERS ──── */
          .vr-bg-base {
            position: fixed; inset: 0; z-index: 0;
            background:
              radial-gradient(ellipse 88% 58% at 50% -5%, rgba(23, 58, 132, 0.96) 0%, transparent 62%),
              radial-gradient(ellipse 62% 42% at 15% 85%, rgba(10, 18, 52, 0.95) 0%, transparent 52%),
              linear-gradient(135deg, #060d19 0%, #09152a 54%, #060b16 100%);
          }

          .vr-bg-glow {
            position: fixed; z-index: 0;
            pointer-events: none;
            filter: blur(38px);
            animation: vr-breathe 16s ease-in-out infinite;
          }
          .vr-bg-glow--a {
            inset: -10% 22% 28% -10%;
            background: radial-gradient(circle, rgba(87,231,255,0.11), transparent 60%);
            animation-delay: 0s;
          }
          .vr-bg-glow--b {
            inset: 22% -8% -14% 48%;
            background: radial-gradient(circle, rgba(239,71,111,0.08), transparent 60%);
            animation-delay: -6s;
          }

          .vr-bg-slash {
            position: fixed;
            inset: -10% -20% auto auto;
            width: min(56vw, 720px);
            height: 62vh;
            z-index: 0;
            pointer-events: none;
            opacity: 0.14;
            background:
              linear-gradient(135deg, transparent 40%, rgba(239,71,111,0.28) 50%, transparent 60%),
              linear-gradient(135deg, transparent 47%, rgba(87,231,255,0.18) 50%, transparent 53%);
            transform: rotate(-8deg);
            filter: blur(0.4px);
            mix-blend-mode: screen;
          }

          /* Subtle CRT scanlines */
          .vr-scanlines {
            position: fixed; inset: 0; z-index: 1; pointer-events: none;
            background: repeating-linear-gradient(
              to bottom,
              transparent 0px, transparent 4px,
              rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.055) 5px
            );
          }

          /* Subtle grid overlay */
          .vr-grid {
            position: fixed; inset: 0; z-index: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(87,231,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(87,231,255,0.03) 1px, transparent 1px);
            background-size: 44px 44px;
          }

          /* ──── HEADER ──── */
          .vr-header {
            position: relative; z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 20px;
            padding: 28px 28px 18px;
            border-bottom: 1px solid var(--border);
            flex-wrap: wrap;
          }

          .vr-eyebrow {
            font-family: var(--ff-mono);
            font-size: 10px;
            letter-spacing: 0.32em;
            color: rgba(87,231,255,0.55);
            margin-bottom: 7px;
          }

          .vr-title {
            font-family: var(--ff-title);
            font-size: clamp(42px, 6vw, 72px);
            font-weight: 400;
            letter-spacing: 0.06em;
            color: var(--text-hi);
            text-shadow: 0 0 28px rgba(87,231,255,0.18), 0 0 60px rgba(239,71,111,0.06);
            line-height: 1;
          }

          .vr-subtitle {
            font-family: var(--ff-body);
            font-size: 16px;
            color: var(--text-mid);
            margin-top: 8px;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .vr-header__right {
            display: flex;
            align-items: center;
            gap: 16px;
            flex-shrink: 0;
          }

          /* Stat bar */
          .vr-statbar {
            display: flex;
            align-items: stretch;
            border: 1px solid var(--border);
            background: var(--panel-bg);
            overflow: hidden;
          }
          .vr-statbar__cell {
            display: flex; flex-direction: column; align-items: center;
            padding: 9px 16px; gap: 2px;
          }
          .vr-statbar__val {
            font-family: var(--ff-mono);
            font-size: 17px; line-height: 1;
            color: var(--cyan);
          }
          .vr-statbar__label {
            font-family: var(--ff-mono);
            font-size: 8px; letter-spacing: 0.22em;
            color: var(--text-lo);
          }
          .vr-statbar__sep {
            width: 1px;
            background: var(--border);
          }

          .vr-return-btn {
            font-family: var(--ff-mono);
            font-size: 10px; letter-spacing: 0.22em;
            padding: 9px 14px;
            border: 1px solid var(--border);
            background: var(--panel-bg);
            color: var(--text-mid);
            cursor: pointer;
            transition: border-color 0.2s, color 0.2s;
          }
          .vr-return-btn:hover { border-color: var(--border-hi); color: var(--cyan); }

          /* ──── FILTER TABS ──── */
          .vr-filters {
            position: relative; z-index: 10;
            display: flex;
            padding: 0 28px;
            border-bottom: 1px solid var(--border);
            overflow-x: auto;
            gap: 0;
          }

          .vr-tab {
            display: flex; align-items: center; gap: 8px;
            padding: 13px 18px;
            border: none; border-bottom: 2px solid transparent;
            background: transparent;
            color: var(--text-lo);
            font-family: var(--ff-mono);
            font-size: 10.5px; letter-spacing: 0.22em;
            cursor: pointer;
            transition: color 0.2s, background 0.2s, border-color 0.2s;
            white-space: nowrap;
            margin-bottom: -1px;
          }
          .vr-tab:hover { color: var(--text-mid); background: rgba(87,231,255,0.04); }
          .vr-tab.is-active {
            color: var(--tab-c, var(--cyan));
            border-bottom-color: var(--tab-c, var(--cyan));
            background: rgba(87,231,255,0.06);
          }

          .vr-tab__num {
            font-family: var(--ff-mono); font-size: 9px; opacity: 0.72;
          }
          .vr-tab__count {
            font-size: 9px; padding: 1px 5px;
            background: rgba(87,231,255,0.08);
            color: rgba(87,231,255,0.56);
          }

          /* ──── MAIN LAYOUT ──── */
          .vr-layout {
            position: relative; z-index: 10;
            display: grid;
            grid-template-columns: 1fr;
            min-height: calc(100dvh - 170px);
          }

          /* ──── COMPENDIUM ──── */
          .vr-compendium {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
            gap: 18px;
            padding: 24px;
            align-content: start;
            border-right: none;
            perspective: 1200px;
          }

          /* ──── CARDS ──── */
          .vr-card {
            position: relative;
            display: flex; flex-direction: column;
            background: var(--card-bg);
            border: 1px solid rgba(87,231,255,0.14);
            cursor: pointer;
            overflow: hidden;
            transform-style: preserve-3d;
            will-change: transform;
            transition: border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
          }

          /* Glass sheen */
          .vr-card::before {
            content: '';
            position: absolute; inset: 0; z-index: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.035) 0%, transparent 58%);
            pointer-events: none;
          }

          .vr-card.is-hovered {
            border-color: var(--cb, var(--cyan));
            box-shadow:
              0 18px 44px rgba(0,0,0,0.44),
              0 0 0 1px var(--c),
              0 0 22px var(--cdim),
              inset 0 0 16px rgba(255,255,255,0.02);
            z-index: 4;
          }

          /* Art zone */
          .vr-card__art {
            position: relative;
            height: 88px;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden;
          }
          .vr-card__art-glow {
            position: absolute; inset: 0;
            background: radial-gradient(ellipse at center, var(--cdim) 0%, transparent 68%);
          }
          .vr-card__art svg { position: relative; z-index: 1; }
          .vr-card__arcana-num {
            position: absolute; top: 7px; right: 9px;
            font-family: var(--ff-title); font-size: 10px;
            color: var(--c); opacity: 0.45; letter-spacing: 0.08em;
          }

          /* Body */
          .vr-card__body {
            position: relative; z-index: 1;
            display: flex; flex-direction: column; gap: 7px;
            padding: 11px 13px 13px;
            border-top: 1px solid rgba(87,231,255,0.07);
            flex: 1;
          }
          .vr-card__arcana-label {
            font-family: var(--ff-mono); font-size: 8.5px;
            letter-spacing: 0.26em; color: var(--c); opacity: 0.7;
          }
          .vr-card__title {
            font-family: var(--ff-title); font-size: 15px; font-weight: 400;
            letter-spacing: 0.06em; color: var(--text-hi); line-height: 1.12;
            text-transform: uppercase;
          }
          .vr-card__summary {
            font-size: 12px; line-height: 1.42; color: var(--text-mid);
          }
          .vr-card__stack {
            display: flex; flex-wrap: wrap; gap: 4px;
          }

          .vr-tag {
            font-family: var(--ff-mono); font-size: 9px; letter-spacing: 0.07em;
            padding: 3px 7px;
            border: 1px solid rgba(87,231,255,0.16);
            color: rgba(175,215,240,0.65);
            background: rgba(6,13,29,0.82);
          }

          .vr-card__footer {
            display: flex; align-items: flex-end;
            justify-content: space-between; gap: 8px;
            margin-top: auto; padding-top: 7px;
            border-top: 1px solid rgba(87,231,255,0.06);
          }
          .vr-card__impact {
            font-size: 10px; color: var(--text-lo); line-height: 1.4; flex: 1;
          }

          /* Hover scan sweep */
          .vr-card__scan {
            position: absolute; inset: 0; z-index: 2; pointer-events: none;
            background: linear-gradient(180deg, transparent 42%, rgba(87,231,255,0.08) 100%);
            opacity: 0; transition: opacity 0.3s ease;
          }
          .vr-card.is-hovered .vr-card__scan { opacity: 0.5; }

          /* Corner brackets */
          .vr-corner {
            position: absolute; width: 11px; height: 11px;
            border-style: solid; border-color: var(--c, var(--cyan));
            opacity: 0; transition: opacity 0.3s ease;
            pointer-events: none;
          }
          .vr-card.is-hovered .vr-corner,
          .vr-summon-card .vr-corner { opacity: 0.65; }
          .vr-corner--tl { top: 5px; left: 5px; border-width: 1px 0 0 1px; }
          .vr-corner--tr { top: 5px; right: 5px; border-width: 1px 1px 0 0; }
          .vr-corner--bl { bottom: 5px; left: 5px; border-width: 0 0 1px 1px; }
          .vr-corner--br { bottom: 5px; right: 5px; border-width: 0 1px 1px 0; }

          /* Hologram stats panel */
          .vr-card__hologram {
            position: absolute;
            inset: 0; z-index: 2;
            display: flex; flex-direction: column; gap: 7px;
            padding: 12px;
            background: linear-gradient(135deg, rgba(87,231,255,0.08) 0%, rgba(87,231,255,0.04) 100%);
            border: 1px solid rgba(87,231,255,0.22);
            backdrop-filter: blur(4px);
            overflow: hidden;
          }

          .vr-holo-stat {
            display: flex; flex-direction: column; gap: 3px;
          }

          .vr-holo-label {
            font-family: var(--ff-mono);
            font-size: 8px; letter-spacing: 0.22em;
            color: var(--c);
            opacity: 0.8;
            text-transform: uppercase;
          }

          .vr-holo-bar {
            height: 4px;
            background: rgba(87,231,255,0.12);
            border-radius: 2px;
            overflow: hidden;
          }

          .vr-holo-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--c), rgba(87,231,255,0.5));
            box-shadow: 0 0 6px var(--c);
          }


          .vr-empty {
            grid-column: 1/-1;
            padding: 40px; text-align: center;
            font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.28em;
            color: var(--text-lo);
            border: 1px dashed rgba(87,231,255,0.12);
          }

          /* ──── INTRO OVERLAY ──── */
          .vr-intro-layer {
            position: fixed; inset: 0; z-index: 200;
            display: flex; align-items: center; justify-content: center;
            padding: clamp(16px, 3vw, 32px);
            background: rgba(3,6,14,0.88);
            backdrop-filter: blur(12px);
          }

          .vr-intro-card {
            position: relative;
            width: min(520px, 100%);
            padding: 32px;
            background: linear-gradient(155deg, #08122f 0%, #040a15 100%);
            border: 1px solid var(--cyan);
            box-shadow:
              0 32px 64px rgba(0,0,0,0.5),
              0 0 36px rgba(87,231,255,0.12);
          }

          .vr-intro-portraits {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 16px; margin-bottom: 20px;
          }

          .vr-intro-portrait {
            display: flex; flex-direction: column; gap: 8px;
            align-items: center;
          }

          .vr-intro-portrait img {
            width: 100%; max-width: 140px; aspect-ratio: 1/1; object-fit: contain;
            filter: drop-shadow(0 8px 24px rgba(87,231,255,0.2));
          }

          .vr-intro-portrait figcaption {
            font-family: var(--ff-mono); font-size: 9px; letter-spacing: 0.26em;
            color: var(--cyan);
          }

          .vr-intro-text {
            padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
            margin-bottom: 18px;
          }

          .vr-intro-speaker {
            font-family: var(--ff-mono); font-size: 8px; letter-spacing: 0.26em;
            color: var(--cyan); margin-bottom: 6px;
          }

          .vr-intro-line {
            font-size: 14px; line-height: 1.6; color: var(--text-mid);
          }

          .vr-intro-buttons {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 10px; margin-top: 20px;
          }

          .vr-intro-btn {
            padding: 10px 14px;
            border: 1px solid var(--border-hi);
            background: rgba(5,11,27,0.88);
            color: var(--cyan);
            font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.2em;
            cursor: pointer; transition: all 0.2s;
            text-transform: uppercase;
          }

          .vr-intro-btn:hover {
            border-color: var(--cyan);
            background: rgba(87,231,255,0.06);
            box-shadow: 0 0 12px rgba(87,231,255,0.2);
          }

          .vr-intro-btn--back { color: rgba(239,71,111,0.8); border-color: rgba(239,71,111,0.4); }
          .vr-intro-btn--back:hover { border-color: var(--red); color: var(--red); background: rgba(239,71,111,0.06); }

          .vr-intro-btn--continue { color: var(--cyan); border-color: var(--border-hi); }
          .vr-intro-btn--continue:hover { background: rgba(87,231,255,0.08); }

          /* Fade to black transition */
          .vr-fade-black {
            position: fixed; inset: 0; z-index: 199;
            background: #000;
            pointer-events: none;
          }

          /* ──── INSTRUCTION PAD ──── */
          .vr-instruction-pad {
            position: fixed;
            bottom: 24px; right: 28px;
            display: flex; flex-direction: column;
            align-items: flex-end; gap: 6px;
            font-family: var(--ff-mono);
            padding: 10px 14px;
            border-radius: 8px;
            border: 1px solid rgba(87,231,255,0.28);
            background: rgba(0,0,0,0.65);
            box-shadow: 0 8px 24px rgba(0,0,0,0.6);
            backdrop-filter: blur(3px);
            z-index: 50;
            pointer-events: none;
          }

          .vr-instruction-row {
            display: flex; align-items: center; gap: 10px;
            font-size: 13px; letter-spacing: 0.16em;
            color: rgba(180,205,230,0.85);
          }

          .vr-instruction-key {
            border: 1px solid rgba(87,231,255,0.36);
            border-radius: 4px;
            background: rgba(0,0,0,0.8);
            color: var(--cyan); padding: 3px 8px;
            font-size: 11px; font-weight: 600;
          }

          .vr-intro-close {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--border-hi);
            background: transparent;
            color: var(--cyan);
            font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.2em;
            cursor: pointer; transition: all 0.2s;
          }
          .vr-intro-close:hover {
            border-color: var(--cyan);
            background: rgba(87,231,255,0.06);
          }

          /* ──── SUMMON OVERLAY ──── */
          .vr-summon-layer {
            position: fixed; inset: 0; z-index: 100;
            display: flex; align-items: center; justify-content: center;
            padding: clamp(16px, 3vw, 32px);
            background: rgba(3,6,14,0.78);
            backdrop-filter: blur(10px) saturate(116%);
          }

          .vr-summon-card {
            position: relative;
            width: min(880px, 100%);
            background: linear-gradient(155deg, #08122f 0%, #040a15 100%);
            border: 1px solid var(--c);
            box-shadow:
              0 36px 74px rgba(0,0,0,0.5),
              0 0 0 1px rgba(0,0,0,0.4),
              0 0 36px var(--cdim);
            overflow: hidden;
          }

          .vr-summon-card__glow {
            position: absolute; inset: 0; pointer-events: none;
            background: radial-gradient(ellipse 80% 50% at 20% 10%, var(--cdim) 0%, transparent 60%);
          }

          .vr-summon-card__head {
            display: grid; grid-template-columns: 110px 1fr auto;
            gap: 18px; padding: 22px; align-items: start;
          }

          .vr-summon-card__art {
            position: relative; width: 110px; height: 110px;
            background: radial-gradient(ellipse at center, var(--cdim) 0%, transparent 70%);
            display: flex; align-items: center; justify-content: center;
          }
          .vr-summon-card__art svg { width: 100%; height: 100%; }
          .vr-summon-card__arcana-num {
            position: absolute; bottom: 4px; right: 6px;
            font-family: var(--ff-title); font-size: 9px;
            color: var(--c); opacity: 0.45;
          }

          .vr-summon-card__info { display: flex; flex-direction: column; gap: 7px; }
          .vr-summon-card__label {
            font-family: var(--ff-mono); font-size: 8.5px; letter-spacing: 0.3em;
            color: var(--c); opacity: 0.65;
          }
          .vr-summon-card__title {
            font-family: var(--ff-title);
            font-size: clamp(20px, 3vw, 34px);
            font-weight: 400; letter-spacing: 0.06em;
            color: var(--text-hi); line-height: 1.1;
            text-shadow: 0 0 30px var(--cdim);
            text-transform: uppercase;
          }
          .vr-summon-card__stack { display: flex; flex-wrap: wrap; gap: 5px; }

          .vr-summon-card__close {
            font-family: var(--ff-mono); font-size: 9.5px; letter-spacing: 0.2em;
            padding: 7px 11px;
            border: 1px solid rgba(87,231,255,0.22);
            background: transparent; color: var(--text-lo);
            cursor: pointer; transition: all 0.2s; flex-shrink: 0;
          }
          .vr-summon-card__close:hover { border-color: var(--c); color: var(--c); }

          .vr-summon-card__divider {
            height: 1px; margin: 0 22px;
            background: linear-gradient(90deg, transparent, var(--c), transparent);
            opacity: 0.28;
          }

          .vr-summon-card__details {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 14px; padding: 18px 22px;
          }

          .vr-detail-block { display: flex; flex-direction: column; gap: 7px; }
          .vr-detail-label {
            font-family: var(--ff-mono); font-size: 8.5px; letter-spacing: 0.26em;
            color: var(--c); opacity: 0.65;
          }
          .vr-detail-text { font-size: 13px; line-height: 1.65; color: var(--text-mid); }
          .vr-detail-text--impact { color: var(--text-hi); font-size: 14px; }

          .vr-summon-card__actions {
            display: flex; flex-wrap: wrap; gap: 9px;
            padding: 14px 22px 22px;
          }

          .vr-action-link {
            display: inline-flex; align-items: center;
            padding: 9px 16px;
            border: 1px solid rgba(87,231,255,0.35);
            background: rgba(7,14,33,0.85);
            color: var(--cyan); text-decoration: none;
            font-family: var(--ff-mono); font-size: 9.5px; letter-spacing: 0.2em;
            transition: background 0.2s;
          }
          .vr-action-link:hover { background: rgba(87,231,255,0.08); }

          /* ──── KEYFRAMES ──── */
          @keyframes vr-breathe {
            0%, 100% { opacity: 0.62; transform: scale(1); }
            50%       { opacity: 0.9; transform: scale(1.04); }
          }

          @keyframes vr-pulse {
            0%, 100% { opacity: 0.45; }
            50%       { opacity: 1; }
          }

          @keyframes vr-blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }

          @media (max-width: 768px) {
            .vr-layout {
              min-height: calc(100dvh - 140px);
            }
            .vr-compendium {
              grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
              gap: 10px;
              padding: 16px;
            }
          }
        `}</style>
      </div>
    </LayoutGroup>
  );
}
