import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import Photography from './pages/Photography'
import About from './pages/About'
import Hobbies from './pages/Hobbies'
import Testimonials from './pages/Testimonials'
import Story from './pages/Story'
import FigmaCursor from './components/FigmaCursor'
import TopNavbar from './components/TopNavbar'
import ToolsFloater from './components/ToolsFloater'
import { installClickSounds } from './lib/sound'

function BackToCanvas() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/')}
      aria-label="Back to home canvas"
      style={{
        position: 'fixed', top: 16, left: 16, zIndex: 9500,
        display: 'flex', alignItems: 'center', gap: 8,
        height: 36, padding: '0 0.85rem',
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-card)',
        cursor: 'none', color: 'var(--ink-soft)',
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
        animation: 'fade-in 0.4s var(--ease) both',
        transition: 'color 0.18s, background 0.18s, transform 0.18s var(--ease)',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <ArrowLeft size={13} /> home
    </button>
  )
}

function Chrome() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  return (
    <>
      {!onHome && <BackToCanvas />}
      <TopNavbar />
      <ToolsFloater />
    </>
  )
}

export default function App() {
  useEffect(() => { installClickSounds() }, [])

  return (
    <>
      <FigmaCursor />
      <Chrome />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/about" element={<About />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </>
  )
}
