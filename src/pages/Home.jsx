import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import MusicPlayer from '../components/MusicPlayer'
import PhotoTeaser from '../components/PhotoTeaser'
import { ProjectCard, StickyNote, ExperienceCard } from '../components/CanvasCards'
import Polaroid from '../components/Polaroid'
import fotoPersonal from '../assets/foto-personal.jpeg'

const projects = {
  zolvo: {
    company: 'Zolvo', frame: 'zolvo.case', year: "'26",
    role: 'Founding Designer · YC S26',
    blurb: 'Designed five core fintech modules — AI invoice verification, reconciliation, collections — in eight weeks.',
    tags: ['Fintech', 'AI', '0→1'],
    cover: 'linear-gradient(135deg,#2F3BC9,#5B6CF5)',
  },
  hubspot: {
    company: 'HubSpot', frame: 'hubspot.case', year: "'25",
    role: 'UI/UX Designer',
    blurb: 'Product experiences for sales & service teams across a CRM used by millions.',
    tags: ['CRM', 'Scale', 'Systems'],
    cover: 'linear-gradient(135deg,#E8551E,#FF8A4C)',
  },
  captura: {
    company: 'Captura tu mundo', frame: 'captura.case', year: "'20",
    role: 'Founder & Designer',
    blurb: 'Founded a visual-storytelling startup — designed and built the entire product.',
    tags: ['Founder', 'Brand', 'Product'],
    cover: 'linear-gradient(135deg,#1F8A6E,#3FBE96)',
  },
}

// Trimmed composition: an About hero on top, 3 project cards beneath,
// plus the draggable sticky notes. (Contact info lives in the right
// ContactDock; identity was folded into About.)
// Layout grid:
//   - Projects row spans x:540 → x:1460 (3 cards × 296 + 2 gaps × 16 = 920)
//   - Polaroid left edge aligns with Zolvo (x:540)
//   - Sticky right edge aligns with Captura (x:1460)
//   - Whole composition is centered on canvas around x = 1000
const OBJECTS = [
  // Identity polaroid — left edge at x:540 (aligned with Zolvo below)
  { id: 'me', type: 'identity', x: 540, y: 160, w: 300, h: 360, z: 5 },

  // Experience card — right edge at x:1460 (aligned with Captura below)
  // h matches the card's natural rendered height so the connector lands flush
  { id: 'experience', type: 'experience', x: 880, y: 240, w: 580, h: 170, z: 4 },

  // Case studies — centered trio at canvas x:540 → x:1460
  { id: 'zolvo', type: 'project', x: 540, y: 580, w: 296, h: 360, z: 6, to: '/work/zolvo', data: projects.zolvo },
  { id: 'hubspot', type: 'project', x: 852, y: 580, w: 296, h: 360, z: 6, to: '/work/hubspot', data: projects.hubspot },
  { id: 'captura', type: 'project', x: 1164, y: 580, w: 296, h: 360, z: 6, to: '/work/captura', data: projects.captura },
]

const CONNECTORS = [
  { from: 'experience', to: 'zolvo', label: '01', fromSide: 'bottom', toSide: 'top' },
  { from: 'experience', to: 'hubspot', label: '02', fromSide: 'bottom', toSide: 'top' },
  { from: 'experience', to: 'captura', label: '03', fromSide: 'bottom', toSide: 'top' },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'project': return <ProjectCard data={obj.data} />
    case 'sticky': return <StickyNote data={obj.data} />
    case 'identity': return <Polaroid src={fotoPersonal} caption="Santiago Avella" rotate={-4} />
    case 'experience': return <ExperienceCard />
    default: return null
  }
}

function computeInitialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  // Content bbox: x:540–1460 (920w), y:160–940 (780h). Centered around (1000, 550).
  const scale = Math.min(
    (w - 120) / 920,
    (h - 180) / 780,
    0.95,
  )
  return {
    scale,
    x: w / 2 - 1000 * scale,
    y: h / 2 - 550 * scale,
  }
}

/* Mobile / touch fallback — a simple stacked board */
function StackedBoard({ navigate }) {
  return (
    <div style={{
      minHeight: '100vh', padding: '1.5rem 1.2rem 4rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
    }}>
      <div style={{ width: 220, height: 280 }}>
        <Polaroid src={fotoPersonal} caption="Santiago Avella" rotate={-3} />
      </div>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <StickyNote data={{
          text: 'Product designer crafting AI-native interfaces — turning complex systems into things that feel obvious 🎯',
          color: 'var(--sticky-yellow)', rotate: 2, tall: true,
        }} />
      </div>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <StickyNote data={{
          text: "Designed at a YC-backed fintech, shipped at HubSpot, founded my own studio from scratch — here's the arc ↓",
          color: 'var(--sticky-blue)', rotate: -2, tall: true,
        }} />
      </div>
      {['zolvo', 'hubspot', 'captura'].map(slug => (
        <div
          key={slug}
          onClick={() => navigate(`/work/${slug}`)}
          style={{ width: '100%', maxWidth: 440, cursor: 'pointer' }}
        >
          <ProjectCard data={projects[slug]} />
        </div>
      ))}
      <div
        onClick={() => navigate('/photography')}
        style={{ width: 210, cursor: 'pointer' }}
      >
        <StickyNote data={{ text: 'off the clock, I shoot film 📷', color: 'var(--sticky-pink)', rotate: -3, tall: true, link: '→ open the roll' }} />
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [isCanvas] = useState(() => window.innerWidth >= 820)
  const [view] = useState(computeInitialView)

  const onActivate = (id) => {
    const obj = OBJECTS.find(o => o.id === id)
    if (obj && obj.to) navigate(obj.to)
  }

  if (!isCanvas) return <StackedBoard navigate={navigate} />

  return (
    <>
      <Canvas
        initialObjects={OBJECTS}
        connectors={CONNECTORS}
        initialView={view}
        renderObject={renderObject}
        onActivate={onActivate}
      />
      <MusicPlayer />
      <PhotoTeaser />

      {/* Floating hint — bottom-center */}
      <div
        style={{
          position: 'fixed', bottom: 22, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9000, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)',
          padding: '0.45rem 0.85rem',
          boxShadow: 'var(--shadow-card)',
          fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
          color: 'var(--ink-soft)', letterSpacing: '0.02em',
          animation: 'hint-float 3.6s ease-in-out infinite, fade-in 0.6s var(--ease) both',
          animationDelay: '0s, 0.9s',
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--accent)',
          animation: 'hint-pulse 1.8s ease-in-out infinite',
        }} />
        drag to move · scroll to zoom
      </div>
    </>
  )
}
