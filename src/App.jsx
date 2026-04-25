import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import menuVideo from './assets/main1.mp4'
import main2 from './assets/circletransition.mp4'
import P3Menu from './P3Menu'
import ExperiencePage from './ResumePage'
import PersonalProjects from './PersonalProjects'
import TechnicalSkills from './TechnicalSkills'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline />
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
          <PageTransition><ExperiencePage src={main2} /></PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition><PersonalProjects /></PageTransition>
        } />
        <Route path="/skills" element={
          <PageTransition><TechnicalSkills /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return <AnimatedRoutes />
}
