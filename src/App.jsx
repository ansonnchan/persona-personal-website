import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import sharedBackground from './assets/Mainn-web.mp4'
import experienceBackground from './assets/main3.mp4'
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
  return <AnimatedRoutes />
}
