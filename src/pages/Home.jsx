import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import MusicPlayer from '../components/MusicPlayer'
import {
  ProjectCard, StickyNote, ExperienceCard,
  AnnotationLabel, LongDownArrow,
  StoryCard, PhotoPrint, PhotoBoothCabin,
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

  // ─── "My place for fun" — sits well below the hero. Visitors discover
  //     it as they scroll/pan down. Two interactive widgets + two play
  //     areas (stickies + drawing) + a privacy note.
  { id: 'note-down', type: 'long-down', x: 280, y: 760, w: 200, h: 380, z: 8,
    data: { text: 'my place for fun 👀', length: 360, rotate: -3 } },

  // Section header (zone title) at the top of the fun row
  { id: 'fun-title', type: 'cs-title', x: 600, y: 1120, w: 800, h: 100,
    data: { kicker: '# my place for fun', title: 'Play around.' } },

  // Privacy hint sticky — pinned at the start of the zone
  { id: 'privacy', type: 'sticky', x: 200, y: 1240, w: 240, h: 160, z: 5, draggable: true,
    data: { text: '🔒 your stickies & drawings only live in your browser — nobody else sees them, promise',
      color: 'var(--sticky-yellow)', rotate: -3, tall: true } },

  // Photo booth cabin
  { id: 'home-booth', type: 'photobooth', x: 480, y: 1240, w: 220, h: 340, z: 6, to: '__photobooth__' },
  { id: 'note-booth', type: 'note', x: 460, y: 1170, w: 260, h: 70, z: 8,
    data: { text: 'snap a strip', arrow: '↓', rotate: 2 } },

  // Dark room door
  { id: 'home-dark', type: 'darkroom', x: 740, y: 1240, w: 220, h: 340, z: 6, to: '__darkroom__' },
  { id: 'note-dark', type: 'note', x: 720, y: 1170, w: 260, h: 70, z: 8,
    data: { text: 'enter the darkroom', arrow: '↓', rotate: -2 } },

  // Sticky-notes zone (a labelled wall/board for visitors to drop notes)
  { id: 'stickies-zone', type: 'play-zone', x: 1000, y: 1240, w: 320, h: 340, z: 3,
    data: { icon: '✎', title: 'Sticky wall', body: 'Use the sticky tool in the bottom dock to drop notes anywhere — they save only to your browser.', tint: '#FFF6CC' } },

  // Drawing zone
  { id: 'drawing-zone', type: 'play-zone', x: 1360, y: 1240, w: 320, h: 340, z: 3,
    data: { icon: '🖊', title: 'Doodle space', body: 'Switch to the pen tool in the bottom dock and scribble. Trash icon clears your strokes.', tint: '#D9EFFF' } },
]

const CONNECTORS = []

function SectionTitle({ kicker, title }) {
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
        {kicker}
      </p>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '2.6rem', lineHeight: 1, letterSpacing: '-0.03em',
        color: 'var(--ink)',
      }}>
        {title}
      </h2>
    </div>
  )
}

function PlayZone({ data }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: data.tint || 'var(--surface)',
      border: '2px dashed rgba(0,0,0,0.18)',
      borderRadius: 'var(--radius)',
      padding: '1.4rem 1.5rem',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <span style={{ fontSize: '2rem', lineHeight: 1 }}>{data.icon}</span>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.3rem', letterSpacing: '-0.02em',
        color: 'var(--ink)', lineHeight: 1.1,
      }}>
        {data.title}
      </h3>
      <p style={{
        fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.55,
        marginTop: 'auto',
      }}>
        {data.body}
      </p>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
        color: 'var(--ink-faint)', letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        🔒 private to you
      </p>
    </div>
  )
}

function makeRenderObject(navigate) {
  return function renderObject(obj) {
    switch (obj.type) {
      case 'cs-title': return <SectionTitle
        kicker={obj.data?.kicker || '# selected work'}
        title={obj.data?.title || 'Case Studies'} />
      case 'play-zone': return <PlayZone data={obj.data} />

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
      case 'long-down': return <LongDownArrow data={obj.data} />
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
  // Focus on the hero: polaroid (left) + Case Studies title + 3 project
  // cards (right). The creative space below sits intentionally below the
  // fold — visitors discover it by panning down.
  // Hero bbox: x:200–1580 (1380w), y:220–720 (500h). Centered around (890, 470).
  const scale = Math.min(0.88, (w - 100) / 1380, (h - 240) / 520)
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
