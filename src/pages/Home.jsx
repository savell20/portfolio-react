import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import MusicPlayer from '../components/MusicPlayer'
import {
  ProjectCard, StickyNote, ExperienceCard,
  AnnotationLabel, StoryCard, PhotoPrint, PhotoBoothCabin,
  AwardCard, WorkflowStep,
} from '../components/CanvasCards'
import { Guitar, F1Car, FlightMap } from '../components/HobbyToys'
import MobileHome from '../components/MobileHome'
import Polaroid from '../components/Polaroid'
import fotoPersonal from '../assets/foto-personal.jpeg'

const projects = {
  zolvo: {
    company: 'Zolvo (YC P26)', frame: 'zolvo.case', year: "'26",
    role: 'Founding Designer',
    blurb: 'Designed five core fintech modules — AI invoice verification, reconciliation, collections — in eight weeks.',
    tags: ['Fintech', 'AI', '0→1'],
    cover: 'linear-gradient(135deg,#2F3BC9,#5B6CF5)',
    badge: { type: 'yc', label: 'YC P26' },
  },
  hubspot: {
    company: 'HubSpot', frame: 'hubspot.case', year: "'25",
    role: 'UI/UX Designer',
    blurb: 'Product experiences for sales & service teams across a CRM used by millions.',
    tags: ['CRM', 'Scale', 'Systems'],
    cover: 'linear-gradient(135deg,#E8551E,#FF8A4C)',
    badge: { type: 'hubspot', label: 'HubSpot' },
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

  // Places-I've-worked card — right edge at x:1460 (aligned with Captura).
  // Tall enough to fit 3 rows of company logos + header.
  { id: 'experience', type: 'experience', x: 880, y: 170, w: 580, h: 320, z: 4 },

  // Case studies — centered trio at canvas x:540 → x:1460
  { id: 'zolvo', type: 'project', x: 540, y: 580, w: 296, h: 360, z: 6, to: '/work/zolvo', data: projects.zolvo },
  { id: 'hubspot', type: 'project', x: 852, y: 580, w: 296, h: 360, z: 6, to: '/work/hubspot', data: projects.hubspot },
  { id: 'captura', type: 'project', x: 1164, y: 580, w: 296, h: 360, z: 6, to: '/work/captura', data: projects.captura },

  // ─── Hand-drawn waymarkers ───
  { id: 'note-awards', type: 'note', x: 880, y: 0, w: 280, h: 80, z: 8,
    data: { text: 'awards', arrow: '↑', rotate: -2 } },
  // Sits right above the polaroid corner, arrow swoops diagonally down-right at it
  { id: 'note-polaroid', type: 'note', x: 360, y: 95, w: 320, h: 80, z: 8,
    data: { text: 'click my photo', arrow: '↘', rotate: -4 } },
  { id: 'note-left', type: 'note', x: 200, y: 540, w: 320, h: 80, z: 8,
    data: { text: "projects I've built", arrow: '←', rotate: -3 } },
  // Points right at the photo print cluster — sits the same distance from
  // the main composition that the projects waymarker sits on the opposite side
  { id: 'note-photography', type: 'note', x: 1500, y: 420, w: 360, h: 80, z: 8,
    data: { text: 'the world through my eyes', arrow: '→', rotate: -3 } },
  // Sits above the cabin, pointing down at it
  { id: 'note-booth', type: 'note', x: 2110, y: 130, w: 340, h: 80, z: 8,
    data: { text: 'snap a photobooth strip', arrow: '↓', rotate: 2 } },
  { id: 'note-workflow', type: 'note', x: 800, y: 1060, w: 360, h: 80, z: 8,
    data: { text: 'how I built this with AI', arrow: '↓', rotate: 1 } },

  // ─── LEFT — hobbies & life: three interactive toys, each with a caption ───
  // Row 1: guitar + F1 side by side
  { id: 'toy-guitar', type: 'guitar', x: -340, y: 170, w: 200, h: 340, z: 6,
    data: { label: 'I love guitar' } },
  { id: 'toy-f1', type: 'f1', x: -110, y: 220, w: 260, h: 220, z: 6,
    data: { label: 'I love Formula One' } },
  // Row 2: plane (travel) below
  { id: 'toy-plane', type: 'flight', x: -350, y: 540, w: 290, h: 240, z: 6,
    data: { label: 'I love traveling' } },

  // ─── TOP — awards I've won (spread across the top of the canvas) ───
  { id: 'award-1', type: 'award', x: 460, y: -230, w: 280, h: 130, z: 5,
    data: { icon: 'trophy', title: 'Site of the Day', org: 'Awwwards', year: '2024', rotate: -3 } },
  { id: 'award-2', type: 'award', x: 800, y: -260, w: 280, h: 130, z: 5,
    data: { icon: 'award', title: 'Best UX · Fintech', org: 'CSS Design Awards', year: '2024', rotate: 2 } },
  { id: 'award-3', type: 'award', x: 1140, y: -230, w: 280, h: 130, z: 5,
    data: { icon: 'star', title: 'Design Excellence Award', org: 'SCAD · Service Design', year: '2025', rotate: -1 } },

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

  // ─── BOTTOM — how I built this portfolio with AI ───
  // Six workflow steps laid out horizontally; CONNECTORS wire them
  // left → right so the diagram reads as one continuous loop.
  { id: 'wf-1', type: 'workflow', x: 240, y: 1200, w: 210, h: 175, z: 5,
    data: { n: '01', icon: 'lightbulb', title: 'Spark',
      body: 'Sketched "infinite canvas portfolio" in 5 minutes. No Figma file — straight to a Notion brief.',
      tint: '#FFE9A8', tintInk: '#8a6a18', rotate: -1 } },
  { id: 'wf-2', type: 'workflow', x: 510, y: 1180, w: 220, h: 175, z: 5,
    data: { n: '02', icon: 'sparkles', title: 'Claude Code',
      body: 'Pair-programmed every component live with Claude — designer intent → working React in seconds.',
      tint: '#EAEEFF', tintInk: '#2F5CFF', rotate: 1 } },
  { id: 'wf-3', type: 'workflow', x: 790, y: 1200, w: 220, h: 175, z: 5,
    data: { n: '03', icon: 'pentool', title: 'Design system',
      body: 'CSS variables for surface, ink, accent, radius — restyle the whole canvas by editing six tokens.',
      tint: '#C5EBD6', tintInk: '#1F8A6E', rotate: -1 } },
  { id: 'wf-4', type: 'workflow', x: 1070, y: 1180, w: 220, h: 175, z: 5,
    data: { n: '04', icon: 'git', title: 'Git + GitHub',
      body: 'Every change committed to main with a clear message. Full history, free rollback, public source.',
      tint: '#F3F3F3', tintInk: '#18181A', rotate: 1 } },
  { id: 'wf-5', type: 'workflow', x: 1350, y: 1200, w: 220, h: 175, z: 5,
    data: { n: '05', icon: 'rocket', title: 'Vercel',
      body: 'Auto-deploys from main on every push. ~30 seconds from local edit to live URL.',
      tint: '#111', tintInk: '#fff', rotate: -1 } },
  { id: 'wf-6', type: 'workflow', x: 1630, y: 1180, w: 220, h: 175, z: 5,
    data: { n: '06', icon: 'refresh', title: 'See & iterate',
      body: 'Open the live site, screenshot the rough edge, paste it back to Claude. Loop until it sings.',
      tint: '#FFD3DA', tintInk: '#B23A56', rotate: 1 } },
]

const CONNECTORS = [
  { from: 'experience', to: 'zolvo', label: '01', fromSide: 'bottom', toSide: 'top' },
  { from: 'experience', to: 'hubspot', label: '02', fromSide: 'bottom', toSide: 'top' },
  { from: 'experience', to: 'captura', label: '03', fromSide: 'bottom', toSide: 'top' },
  // Workflow flow: spark → claude → design → git → vercel → iterate → loop back
  { from: 'wf-1', to: 'wf-2', fromSide: 'right', toSide: 'left' },
  { from: 'wf-2', to: 'wf-3', fromSide: 'right', toSide: 'left' },
  { from: 'wf-3', to: 'wf-4', fromSide: 'right', toSide: 'left' },
  { from: 'wf-4', to: 'wf-5', fromSide: 'right', toSide: 'left' },
  { from: 'wf-5', to: 'wf-6', fromSide: 'right', toSide: 'left' },
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
      case 'award': return <AwardCard data={obj.data} />
      case 'workflow': return <WorkflowStep data={obj.data} />
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

  if (!isCanvas) return <MobileHome />

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
    </>
  )
}
