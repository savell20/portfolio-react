import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import { TitleCard, ProjectCard, StickyNote, AboutCard, ContactCard } from '../components/CanvasCards'

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

// id, type, position, size (h is approximate — used for connector anchoring)
const OBJECTS = [
  { id: 'title', type: 'title', x: 560, y: 210, w: 430, h: 252, z: 5 },
  { id: 'sticky-drag', type: 'sticky', x: 250, y: 250, w: 185, h: 150, z: 3,
    data: { text: 'drag me around — this whole board is yours ✦', color: 'var(--sticky-yellow)', rotate: -7, tall: true } },
  { id: 'zolvo', type: 'project', x: 430, y: 560, w: 296, h: 380, z: 6, to: '/work/zolvo', data: projects.zolvo },
  { id: 'hubspot', type: 'project', x: 790, y: 645, w: 296, h: 380, z: 6, to: '/work/hubspot', data: projects.hubspot },
  { id: 'captura', type: 'project', x: 1150, y: 560, w: 296, h: 380, z: 6, to: '/work/captura', data: projects.captura },
  { id: 'about', type: 'about', x: 1120, y: 195, w: 350, h: 330, z: 5 },
  { id: 'contact', type: 'contact', x: 1540, y: 560, w: 320, h: 250, z: 5 },
  { id: 'sticky-ai', type: 'sticky', x: 1545, y: 235, w: 195, h: 150, z: 3,
    data: { text: 'AI that feels human — not a magic trick', color: 'var(--sticky-blue)', rotate: 6, tall: true } },
  { id: 'sticky-photo', type: 'sticky', x: 470, y: 1000, w: 205, h: 160, z: 3, to: '/photography',
    data: { text: 'off the clock, I shoot film 📷', color: 'var(--sticky-pink)', rotate: -5, tall: true, link: '→ open the roll' } },
  { id: 'sticky-process', type: 'sticky', x: 905, y: 1075, w: 185, h: 150, z: 3,
    data: { text: 'process > pixels. always.', color: 'var(--sticky-mint)', rotate: 5, tall: true } },
]

const CONNECTORS = [
  { from: 'title', to: 'zolvo', label: '01' },
  { from: 'title', to: 'hubspot', label: '02' },
  { from: 'title', to: 'captura', label: '03' },
  { from: 'title', to: 'about', label: 'who?' },
  { from: 'about', to: 'contact', label: 'say hi' },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title': return <TitleCard />
    case 'project': return <ProjectCard data={obj.data} />
    case 'sticky': return <StickyNote data={obj.data} />
    case 'about': return <AboutCard />
    case 'contact': return <ContactCard />
    default: return null
  }
}

function computeInitialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  const scale = w < 1200 ? 0.6 : 0.76
  return {
    scale,
    x: w / 2 - 1050 * scale,
    y: h / 2 - 700 * scale,
  }
}

/* Mobile / touch fallback — a simple stacked board */
function StackedBoard({ navigate }) {
  return (
    <div style={{
      minHeight: '100vh', padding: '1.5rem 1.2rem 4rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}><TitleCard /></div>
      {['zolvo', 'hubspot', 'captura'].map(slug => (
        <div
          key={slug}
          onClick={() => navigate(`/work/${slug}`)}
          style={{ width: '100%', maxWidth: 420, cursor: 'pointer' }}
        >
          <ProjectCard data={projects[slug]} />
        </div>
      ))}
      <div style={{ width: '100%', maxWidth: 420 }}><AboutCard /></div>
      <div style={{ width: '100%', maxWidth: 420 }}><ContactCard /></div>
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
      {/* hint */}
      <div
        style={{
          position: 'fixed', bottom: 18, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9000, pointerEvents: 'none',
          fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
          color: 'var(--ink-soft)', background: 'var(--surface)',
          border: '1px solid var(--line)', borderRadius: 8,
          padding: '0.5rem 0.9rem', boxShadow: '0 4px 16px rgba(24,24,26,0.08)',
          animation: 'fade-in 0.6s ease both', animationDelay: '0.8s',
        }}
      >
        drag cards · scroll to zoom · drag empty space to pan
      </div>
    </>
  )
}
