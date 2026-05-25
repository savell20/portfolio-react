import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import MusicPlayer from '../components/MusicPlayer'
import {
  ProjectCard, StickyNote, ExperienceCard,
  AnnotationLabel, StoryCard, PhotoPrint, PhotoBoothCabin,
} from '../components/CanvasCards'
import { Guitar, F1Car, FlightMap } from '../components/HobbyToys'
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
  { id: 'me', type: 'identity', x: 540, y: 160, w: 300, h: 360, z: 5, to: '/about' },

  // Experience card — right edge at x:1460 (aligned with Captura below)
  // h matches the card's natural rendered height so the connector lands flush
  { id: 'experience', type: 'experience', x: 880, y: 240, w: 580, h: 170, z: 4 },

  // Case studies — centered trio at canvas x:540 → x:1460
  { id: 'zolvo', type: 'project', x: 540, y: 580, w: 296, h: 360, z: 6, to: '/work/zolvo', data: projects.zolvo },
  { id: 'hubspot', type: 'project', x: 852, y: 580, w: 296, h: 360, z: 6, to: '/work/hubspot', data: projects.hubspot },
  { id: 'captura', type: 'project', x: 1164, y: 580, w: 296, h: 360, z: 6, to: '/work/captura', data: projects.captura },

  // ─── Hand-drawn waymarkers (positioned to mirror the reference layout) ───
  { id: 'note-top', type: 'note', x: 880, y: 0, w: 280, h: 80, z: 8,
    data: { text: 'what people say', arrow: '↑', rotate: -2 } },
  // Sits right above the polaroid corner, arrow swoops diagonally down-right at it
  { id: 'note-polaroid', type: 'note', x: 360, y: 95, w: 320, h: 80, z: 8,
    data: { text: 'click my photo', arrow: '↘', rotate: -4 } },
  { id: 'note-left', type: 'note', x: 240, y: 540, w: 240, h: 80, z: 8,
    data: { text: 'hobbies & life', arrow: '←', rotate: -3 } },
  // Points right at the photo print cluster — sits the same distance from
  // the main composition that "hobbies & life ←" sits on the opposite side
  { id: 'note-photography', type: 'note', x: 1540, y: 420, w: 240, h: 80, z: 8,
    data: { text: 'my photography', arrow: '→', rotate: -3 } },
  // Sits above the cabin, pointing down at it
  { id: 'note-booth', type: 'note', x: 2120, y: 130, w: 240, h: 80, z: 8,
    data: { text: 'snap a polaroid', arrow: '↓', rotate: 2 } },
  { id: 'note-bottom', type: 'note', x: 870, y: 1060, w: 240, h: 80, z: 8,
    data: { text: 'my story', arrow: '↓', rotate: 1 } },

  // ─── LEFT — hobbies & life: three interactive toys, each with a caption ───
  // Row 1: guitar + F1 side by side
  { id: 'toy-guitar', type: 'guitar', x: -340, y: 170, w: 200, h: 340, z: 6,
    data: { label: 'I love guitar' } },
  { id: 'toy-f1', type: 'f1', x: -110, y: 220, w: 260, h: 220, z: 6,
    data: { label: 'I love Formula One' } },
  // Row 2: plane (travel) below
  { id: 'toy-plane', type: 'flight', x: -350, y: 540, w: 290, h: 240, z: 6,
    data: { label: 'I love traveling' } },

  // ─── TOP — testimonials ───
  { id: 'test-1', type: 'sticky', x: 540, y: -210, w: 290, h: 180, z: 5, draggable: true,
    data: { text: '"Santi turns ambiguity into shipped product faster than anyone I\'ve worked with."\n— Maria, PM at Zolvo', color: 'var(--sticky-blue)', rotate: -3, tall: true } },
  { id: 'test-2', type: 'sticky', x: 870, y: -240, w: 280, h: 180, z: 5, draggable: true,
    data: { text: '"Rare designer — thinks like an engineer, ships like a founder."\n— David, Eng Lead', color: 'var(--sticky-pink)', rotate: 2, tall: true } },
  { id: 'test-3', type: 'sticky', x: 1190, y: -210, w: 280, h: 170, z: 5, draggable: true,
    data: { text: '"Calm under pressure, surgical with feedback. The teammate I always want."\n— Ana, Director of Design', color: 'var(--sticky-mint)', rotate: -2, tall: true } },

  // ─── RIGHT — tight photography cluster (2x2) + photo booth furthest right ───
  // Spacing matches the gap that "hobbies & life ←" has from the main composition
  { id: 'photo-1', type: 'photoprint', x: 1800, y: 280, w: 170, h: 190, z: 5, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', caption: 'peaks', rotate: -4 } },
  { id: 'photo-2', type: 'photoprint', x: 1940, y: 300, w: 170, h: 190, z: 5, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80', caption: 'dusk', rotate: 5 } },
  { id: 'photo-3', type: 'photoprint', x: 1800, y: 470, w: 170, h: 190, z: 5, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80', caption: 'coast', rotate: 3 } },
  { id: 'photo-4', type: 'photoprint', x: 1940, y: 490, w: 170, h: 190, z: 5, draggable: true,
    data: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80', caption: 'road', rotate: -3 } },
  // Photo booth — far right, big and red
  { id: 'photobooth', type: 'photobooth', x: 2160, y: 240, w: 220, h: 360, z: 6, to: '__photobooth__' },

  // ─── BOTTOM — my story ───
  { id: 'story', type: 'story', x: 540, y: 1180, w: 920, h: 360, z: 5,
    data: {
      label: 'the long version',
      title: 'Bogotá → SCAD → here',
      paragraphs: [
        "I grew up in Bogotá, Colombia — a city that taught me how to design with constraints. Limited resources, big ambitions, and a culture that punishes anything that doesn't actually work.",
        "Moved to the US for SCAD, fell in love with product design, founded my own visual-storytelling company at 18, learned every part of running a business the hard way, then took the lessons to HubSpot and now Zolvo.",
        "The thread through all of it: I care about what gets shipped, not what gets shown. Best interfaces disappear — leaving only the outcome.",
      ],
    } },
]

const CONNECTORS = [
  { from: 'experience', to: 'zolvo', label: '01', fromSide: 'bottom', toSide: 'top' },
  { from: 'experience', to: 'hubspot', label: '02', fromSide: 'bottom', toSide: 'top' },
  { from: 'experience', to: 'captura', label: '03', fromSide: 'bottom', toSide: 'top' },
]

function makeRenderObject(navigate) {
  return function renderObject(obj) {
    switch (obj.type) {
      case 'project': return <ProjectCard data={obj.data} />
      case 'sticky': return <StickyNote data={obj.data} />
      case 'identity': return (
        <Polaroid
          src={fotoPersonal}
          caption="Santiago Avella"
          rotate={-4}
          clickable
        />
      )
      case 'experience': return <ExperienceCard />
      case 'note': return <AnnotationLabel data={obj.data} />
      case 'story': return <StoryCard data={obj.data} />
      case 'photoprint': return <PhotoPrint data={obj.data} />
      case 'photobooth': return <PhotoBoothCabin />
      case 'guitar': return <Guitar label={obj.data?.label} />
      case 'f1': return <F1Car label={obj.data?.label} />
      case 'flight': return <FlightMap label={obj.data?.label} />
      default: return null
    }
  }
}

function computeInitialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  // Always open at 82% on first load (clamped down on small screens so the
  // central hero still fits without scrolling).
  const scale = Math.min(0.82, (w - 80) / 1380, (h - 140) / 990)
  return {
    scale,
    x: w / 2 - 1010 * scale,
    y: h / 2 - 535 * scale,
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
  const [renderObject] = useState(() => makeRenderObject(navigate))

  const onActivate = (id) => {
    const obj = OBJECTS.find(o => o.id === id)
    if (!obj) return
    if (obj.to === '__photobooth__') {
      window.dispatchEvent(new CustomEvent('open-photo-booth'))
    } else if (obj.to) {
      navigate(obj.to)
    }
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
        scroll to move · ⌘ + scroll to zoom
      </div>
    </>
  )
}
