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
  // Polaroid on the left
  { id: 'me', type: 'identity', x: 200, y: 220, w: 320, h: 400, z: 5, to: '/about' },

  // Case Studies header — top of the right column
  { id: 'cs-title', type: 'cs-title', x: 640, y: 220, w: 940, h: 100 },

  // Three case studies in a row to the right of the polaroid
  { id: 'zolvo',   type: 'project', x: 640,  y: 360, w: 296, h: 360, z: 6, to: '/work/zolvo',   data: projects.zolvo },
  { id: 'hubspot', type: 'project', x: 962,  y: 360, w: 296, h: 360, z: 6, to: '/work/hubspot', data: projects.hubspot },
  { id: 'captura', type: 'project', x: 1284, y: 360, w: 296, h: 360, z: 6, to: '/work/captura', data: projects.captura },
]

const CONNECTORS = []

function CaseStudiesTitle() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      height: '100%', paddingBottom: 12,
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
        color: 'var(--accent)', letterSpacing: '0.16em',
        textTransform: 'uppercase', marginBottom: 8,
      }}>
        # selected work
      </p>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '2.6rem', lineHeight: 1, letterSpacing: '-0.03em',
        color: 'var(--ink)',
      }}>
        Case Studies
      </h2>
    </div>
  )
}

function makeRenderObject(navigate) {
  return function renderObject(obj) {
    switch (obj.type) {
      case 'cs-title': return <CaseStudiesTitle />

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
  // Polaroid (left) + Case Studies title + 3 project cards (right).
  // Content bbox: x:200–1580 (1380w), y:220–720 (500h). Centered around (890, 470).
  const scale = Math.min(0.85, (w - 100) / 1380, (h - 240) / 500)
  return {
    scale,
    x: w / 2 - 890 * scale,
    y: h / 2 - 470 * scale,
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
