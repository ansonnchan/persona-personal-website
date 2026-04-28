import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import sharedBackground from './assets/Mainn-web.mp4'
import experienceBackground from './assets/main2-web.mp4'
import bgmTrack from './assets/Color Your Night - Lotus Juice - Topic (128k).mp3'
import P3Menu from './P3Menu'
import Experience from './Experience'
import PersonalProjects from './PersonalProjects'
import Skills from './Skills'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={sharedBackground} autoPlay loop muted playsInline />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/experience" element={
          <PageTransition><Experience src={experienceBackground} /></PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition><PersonalProjects /></PageTransition>
        } />
        <Route path="/skills" element={
          <PageTransition><Skills /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    audio.volume = 0.2
    audio.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        setIsMuted((prev) => !prev)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!hasStarted || audio.paused) {
      try {
        await audio.play()
        setHasStarted(true)
      } catch {
        setIsPlaying(false)
      }
      return
    }

    audio.pause()
  }

  const bgmStatus = !hasStarted
    ? 'BGM: PRESS TO PLAY'
    : isPlaying
      ? (isMuted ? 'BGM: MUTED (PRESS M TO UNMUTE)' : 'BGM: ACTIVE (PRESS TO PAUSE)')
      : 'BGM: PAUSED (TAP TO PLAY)'

  return (
    <>
      <audio ref={audioRef} src={bgmTrack} preload="auto" />
      <AnimatedRoutes />

      <button
        type="button"
        className="bgm-hud"
        tabIndex={-1}
        aria-live="polite"
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        onMouseDown={(e) => e.preventDefault()}
        onClick={togglePlayback}
      >
        <div className="bgm-row"><span className="bgm-key">M</span><span>{bgmStatus}</span></div>
        <div className="bgm-title-wrap" aria-hidden="true">
          <div className="bgm-title-marquee">Color Your Night - Azumi Takahashi & Lotus Juice</div>
        </div>
      </button>
    </>
  )
}