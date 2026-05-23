import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import MusicPlayer from '../components/MusicPlayer'
import PhotoTeaser from '../components/PhotoTeaser'
import { ProjectCard, StickyNote, AboutCard } from '../components/CanvasCards'

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
const OBJECTS = [
  { id: 'about', type: 'about', x: 540, y: 120, w: 920, h: 360, z: 5 },

  { id: 'zolvo', type: 'project', x: 540, y: 600, w: 296, h: 360, z: 6, to: '/work/zolvo', data: projects.zolvo },
  { id: 'hubspot', type: 'project', x: 852, y: 600, w: 296, h: 360, z: 6, to: '/work/hubspot', data: projects.hubspot },
  { id: 'captura', type: 'project', x: 1164, y: 600, w: 296, h: 360, z: 6, to: '/work/captura', data: projects.captura },

  { id: 'sticky-1', type: 'sticky', x: 240, y: 240, w: 215, h: 165, z: 3, draggable: true,
    data: { text: 'psst — you can drop your own sticky notes ✎', color: 'var(--sticky-yellow)', rotate: -6, tall: true } },
]

const CONNECTORS = [
  { from: 'about', to: 'zolvo', label: '01', fromSide: 'bottom', toSide: 'top' },
  { from: 'about', to: 'hubspot', label: '02', fromSide: 'bottom', toSide: 'top' },
  { from: 'about', to: 'captura', label: '03', fromSide: 'bottom', toSide: 'top' },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'project': return <ProjectCard data={obj.data} />
    case 'sticky': return <StickyNote data={obj.data} />
    case 'about': return <AboutCard />
    default: return null
  }
}

function computeInitialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  // Fit about + 3 project cards on first load. Content x:240–1500, y:120–960.
  const scale = Math.min(
    (w - 80) / 1260,
    (h - 120) / 840,
    0.85,
  )
  return {
    scale,
    x: w / 2 - 870 * scale,
    y: h / 2 - 540 * scale,
  }
}

/* Mobile / touch fallback — a simple stacked board */
function StackedBoard({ navigate }) {
  return (
    <div style={{
      minHeight: '100vh', padding: '1.5rem 1.2rem 4rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 440 }}><AboutCard /></div>
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
