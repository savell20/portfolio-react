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
import { DarkRoomDoor, DarkRoomModal } from '../components/DarkRoom'
import Puzzle from '../components/Puzzle'
import fotoPersonal from '../assets/foto-personal.jpeg'
import { Sparkles } from 'lucide-react'

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

  // Experience header card — right edge at x:1460 (aligned with Captura below)
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
      case 'darkroom': return <DarkRoomDoor />
      case 'puzzle': return (
        <div title="psst — click me" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%',
          color: 'var(--accent)',
          filter: 'drop-shadow(0 0 14px rgba(47,92,255,0.6))',
          animation: 'hint-pulse 2.4s ease-in-out infinite',
        }}>
          <Sparkles size={36} strokeWidth={1.8} />
        </div>
      )
      default: return null
    }
  }
}

function computeInitialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  // Always open at 82% on first load (clamped down on small screens so the
  // central hero still fits without scrolling).
  // Simplified canvas — just polaroid + experience + 3 case studies.
  // Content bbox: x:540–1460 (920w), y:160–940 (780h). Centered around (1000, 550).
  const scale = Math.min(0.95, (w - 100) / 920, (h - 240) / 780)
  return {
    scale,
    x: w / 2 - 1000 * scale,
    y: h / 2 - 550 * scale,
  }
}


export default function Home() {
  const navigate = useNavigate()
  const [isCanvas] = useState(() => window.innerWidth >= 820)
  const [view] = useState(computeInitialView)
  const [renderObject] = useState(() => makeRenderObject(navigate))

  const [darkRoomOpen, setDarkRoomOpen] = useState(false)
  const [puzzleOpen, setPuzzleOpen] = useState(false)

  const onActivate = (id) => {
    const obj = OBJECTS.find(o => o.id === id)
    if (!obj) return
    if (obj.to === '__photobooth__') {
      window.dispatchEvent(new CustomEvent('open-photo-booth'))
    } else if (obj.to === '__darkroom__') {
      setDarkRoomOpen(true)
    } else if (obj.to === '__puzzle__') {
      setPuzzleOpen(true)
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
      {darkRoomOpen && <DarkRoomModal onClose={() => setDarkRoomOpen(false)} />}
      {puzzleOpen && <Puzzle onClose={() => setPuzzleOpen(false)} />}
    </>
  )
}
