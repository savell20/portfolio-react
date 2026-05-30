import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
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
import { TravelGameTile, TravelGameModal } from '../components/TravelGame'
import Puzzle from '../components/Puzzle'
import fotoPersonal from '../assets/foto-personal.jpeg'
import { Sparkles } from 'lucide-react'

const projects = {
  zolvo: {
    company: 'Zolvo (YC P26)', frame: 'zolvo.case', year: "'26",
    role: 'Founding Designer',
    blurb: 'Designed five core fintech modules, AI invoice verification, reconciliation, collections, in eight weeks.',
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
    blurb: 'Founded a visual-storytelling startup, designed and built the entire product.',
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
  // 🥚 Easter egg — hidden ABOVE the hero. Only found by panning up.
  { id: 'egg', type: 'easter-egg', x: 430, y: -470, w: 920, h: 340, z: 4 },

  // Polaroid on the left
  { id: 'me', type: 'identity', x: 200, y: 220, w: 340, h: 500, z: 5, to: '/about' },

  // Featured Projects header, top of the right column
  // Uses its own type so we can render a 'View all →' button next to the title.
  { id: 'cs-title', type: 'featured-title', x: 640, y: 220, w: 940, h: 100,
    data: { kicker: '# featured', title: 'Work Experience.' } },

  // Three case studies in a row to the right of the polaroid
  { id: 'zolvo',   type: 'project', x: 640,  y: 320, w: 296, h: 360, z: 6, to: '/work/zolvo',   data: projects.zolvo },
  { id: 'hubspot', type: 'project', x: 962,  y: 320, w: 296, h: 360, z: 6, to: '/work/hubspot', data: projects.hubspot },
  { id: 'captura', type: 'project', x: 1284, y: 320, w: 296, h: 360, z: 6, to: '/work/captura', data: projects.captura },

  // ─── About Me overview — a quick read with a link into the full page.
  { id: 'about-title', type: 'cs-title', x: 200, y: 858, w: 800, h: 90,
    data: { kicker: '# about me', title: 'About me.' } },
  { id: 'about-card', type: 'about-overview', x: 200, y: 968, w: 1380, h: 230,
    data: {
      bio: 'Product designer with Colombian roots, based in San Francisco and US citizen. Bilingual in English and Spanish, with 3 years of experience turning complex systems into things that feel obvious.',
      facts: ['3 yrs experience', '2× Red Dot Awards', 'EN · ES bilingual', 'YC-backed startup'],
      images: [
        fotoPersonal,
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80',
      ],
    } },

  // ─── "Fun" teaser — the games live on the Fun page; here we just invite.
  { id: 'fun-title', type: 'cs-title', x: 200, y: 1340, w: 800, h: 100,
    data: { kicker: '# my place for fun', title: 'Play around.' } },
  { id: 'fun-teaser', type: 'fun-teaser', x: 200, y: 1460, w: 1380, h: 220, z: 6 },

  // ─── Behind the build — the process, as boxes + arrows.
  { id: 'build-title', type: 'cs-title', x: 200, y: 1800, w: 800, h: 100,
    data: { kicker: '# behind the build', title: 'How I built this.' } },
  { id: 'build-1', type: 'workflow', x: 200,  y: 1930, w: 300, h: 190,
    data: { n: '01', icon: 'lightbulb', title: 'Design it',
      body: 'Sketched the concept, layout and visual language in Figma.',
      tint: 'var(--accent-soft)', tintInk: 'var(--accent)' } },
  { id: 'build-2', type: 'workflow', x: 560,  y: 1930, w: 300, h: 190,
    data: { n: '02', icon: 'sparkles', title: 'Build with Claude Code',
      body: 'Paired with Claude Code and a modern stack to ship the canvas fast.',
      tint: '#EDE7FF', tintInk: '#6B3FFF' } },
  { id: 'build-3', type: 'workflow', x: 920,  y: 1930, w: 300, h: 190,
    data: { n: '03', icon: 'refresh', title: 'Test with 30+ designers',
      body: 'Put it in front of 30+ product designers for honest, candid feedback.',
      tint: '#FFE8D1', tintInk: '#C45A00' } },
  { id: 'build-4', type: 'workflow', x: 1280, y: 1930, w: 300, h: 190,
    data: { n: '04', icon: 'rocket', title: 'Iterate & ship',
      body: 'Folded their input back in and shipped — and I’m still iterating.',
      tint: '#DDF1E2', tintInk: '#1F8A6E' } },
]

const CONNECTORS = [
  // "How I built this" workflow — arrows between the four steps.
  { from: 'build-1', to: 'build-2', fromSide: 'right', toSide: 'left' },
  { from: 'build-2', to: 'build-3', fromSide: 'right', toSide: 'left' },
  { from: 'build-3', to: 'build-4', fromSide: 'right', toSide: 'left' },
]

function SectionTitle({ title }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      height: '100%', paddingBottom: 12,
    }}>
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

function FeaturedTitle({ data, navigate }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      height: '100%', paddingBottom: 12, gap: 16,
    }}>
      <div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '2.6rem', lineHeight: 1, letterSpacing: '-0.03em',
          color: 'var(--ink)',
        }}>
          {data.title}
        </h2>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); navigate('/projects') }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          height: 38, padding: '0 1rem', cursor: 'none',
          background: 'var(--surface)', color: 'var(--ink)',
          border: 'var(--border-card)', borderRadius: 'var(--radius-pill)',
          boxShadow: 'var(--shadow-card)',
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600,
          whiteSpace: 'nowrap',
          transition: 'background 0.15s, color 0.15s, transform 0.15s var(--ease)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        view all →
      </button>
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

function AboutOverview({ data, navigate }) {
  const imgs = data.images || []
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--surface)', border: 'var(--border-card)',
      borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)',
      padding: '1.6rem 1.8rem',
      display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap',
    }}>
      {/* Bio + facts */}
      <div style={{ flex: 1, minWidth: 300 }}>
        <p style={{
          fontSize: '1.1rem', color: 'var(--ink-soft)', lineHeight: 1.65,
          marginBottom: '1.1rem', maxWidth: 640,
        }}>
          {data.bio}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {data.facts.map((f) => (
            <span key={f} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
              color: 'var(--ink)', background: 'var(--canvas)',
              border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)',
              padding: '5px 11px',
            }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Two quick snapshots */}
      <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
        {imgs.slice(0, 2).map((src, i) => (
          <div key={i} style={{
            width: 130, height: 156, background: '#FAF8F2',
            padding: '7px 7px 18px',
            boxShadow: '0 10px 22px rgba(0,0,0,0.16)',
            transform: `rotate(${i ? 3 : -3}deg)`,
          }}>
            <img src={src} alt="" draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>

      {/* Read the full story button — simple pill */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate('/about') }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
          height: 44, padding: '0 1.4rem', cursor: 'none',
          background: 'var(--accent)', color: '#fff',
          border: 'none', borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 600,
          whiteSpace: 'nowrap', boxShadow: 'var(--shadow-card)',
          transition: 'transform 0.15s var(--ease), filter 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.1)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}
      >
        read the full story →
      </button>
    </div>
  )
}

function EasterEgg() {
  return (
    <div style={{
      width: '100%', height: '100%', boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #18181A 0%, #2a2150 60%, #3a1f4d 100%)',
      borderRadius: 'var(--radius)',
      boxShadow: '0 26px 60px rgba(0,0,0,0.4)',
      padding: '1.8rem 2rem',
      display: 'flex', alignItems: 'center', gap: '2rem',
      color: '#fff', overflow: 'hidden', position: 'relative',
    }}>
      {/* Hidden "video" thumbnail (swap for a real clip later) */}
      <div style={{
        position: 'relative', flexShrink: 0,
        width: 220, height: 250, borderRadius: 12, overflow: 'hidden',
        boxShadow: '0 12px 28px rgba(0,0,0,0.5)',
        transform: 'rotate(-3deg)',
      }}>
        <img src={fotoPersonal} alt="" draggable={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <span style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.25)',
        }}>
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)', color: '#18181A',
            fontSize: '1.4rem', paddingLeft: 4,
          }}>
            ▶
          </span>
        </span>
        <span style={{
          position: 'absolute', bottom: 8, left: 8,
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
          background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: 3,
          letterSpacing: '0.08em',
        }}>
          SECRET CLIP
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
          color: '#FFD166', letterSpacing: '0.18em', textTransform: 'uppercase',
          marginBottom: 10,
        }}>
          🥚 you found the secret spot
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em',
          lineHeight: 1.1, marginBottom: 12,
        }}>
          Hey — you weren’t supposed to scroll up here.
        </h3>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.9, maxWidth: 540 }}>
          But respect, you’re curious — that’s the best trait a designer can have.
          So here’s a secret: I grew a <strong style={{ color: '#fff' }}>226K-person photography
          community</strong> from my bedroom during lockdown, with zero budget — just an
          obsession with shipping and learning in public. Now you know. 🤫
        </p>
      </div>
    </div>
  )
}

function FunTeaser({ navigate }) {
  return (
    <div
      style={{
        width: '100%', height: '100%', boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 32, flexWrap: 'wrap',
        background: 'linear-gradient(135deg, #2F3BC9 0%, #5B6CF5 55%, #FF8A3D 130%)',
        border: 'none', borderRadius: 'var(--radius)',
        boxShadow: '0 18px 38px rgba(0,0,0,0.22)',
        padding: '2.2rem 2.6rem',
        color: '#fff', overflow: 'hidden', position: 'relative',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
          letterSpacing: '0.16em', textTransform: 'uppercase',
          opacity: 0.85, marginBottom: 10,
        }}>
          📸 🎞 🎸 ✈️ &nbsp; little experiments
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)', letterSpacing: '-0.02em',
          lineHeight: 1.1, marginBottom: 10,
        }}>
          I made some games for fun.
        </h3>
        <p style={{ fontSize: '1rem', lineHeight: 1.5, opacity: 0.92, maxWidth: 620 }}>
          A photo booth, a darkroom, a guitar you can strum, and a guess-where-I’ve-travelled
          game. Come poke around — I’d love for you to check them out.
        </p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); navigate('/hobbies') }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: 'relative', zIndex: 1, flexShrink: 0, cursor: 'none',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#fff', color: '#2F3BC9', border: 'none',
          borderRadius: 'var(--radius-pill)',
          padding: '0.9rem 1.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700,
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          transition: 'transform 0.15s var(--ease), filter 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(0.96)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}
      >
        enter the fun zone →
      </button>
    </div>
  )
}

function GuitarTile() {
  return (
    <div style={{
      position: 'relative', width: '100%', height: 360,
      background: 'linear-gradient(180deg,#3a2415 0%,#241308 100%)',
      border: '8px solid #1c0f06', borderRadius: 14,
      boxShadow: '0 22px 42px rgba(0,0,0,0.4)',
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '1rem',
    }}>
      <div style={{
        position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
        padding: '4px 10px', background: '#d49b5a', color: '#241308',
        fontFamily: 'var(--font-mono)', fontSize: '0.56rem', fontWeight: 800,
        letterSpacing: '0.16em', borderRadius: 2,
      }}>
        ACOUSTIC
      </div>
      <div style={{ width: '70%', marginTop: 14 }}>
        <Guitar height={236} />
      </div>
      <span style={{
        fontFamily: 'var(--font-note)', fontSize: '1.25rem', color: '#f3d9b0',
        marginTop: 4,
      }}>
        strum me 🎸
      </span>
    </div>
  )
}

function makeRenderObject(navigate) {
  return function renderObject(obj) {
    switch (obj.type) {
      case 'cs-title': return <SectionTitle
        kicker={obj.data?.kicker || '# selected work'}
        title={obj.data?.title || 'Case Studies'} />
      case 'featured-title': return <FeaturedTitle data={obj.data} navigate={navigate} />
      case 'about-overview': return <AboutOverview data={obj.data} navigate={navigate} />
      case 'easter-egg': return <EasterEgg />
      case 'fun-teaser': return <FunTeaser navigate={navigate} />
      case 'play-zone': return <PlayZone data={obj.data} />

      case 'project': return <ProjectCard data={obj.data} />
      case 'sticky': return <StickyNote data={obj.data} />
      case 'identity': return (
        <Polaroid
          src={fotoPersonal}
          caption="Santiago Avella"
          role="Product Designer"
          tags={['📍 Based in San Francisco', '🇺🇸 US citizen']}
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
      case 'guitar': return <GuitarTile />
      case 'f1': return <F1Car label={obj.data?.label} />
      case 'flight': return <FlightMap label={obj.data?.label} />
      case 'award': return <AwardCard data={obj.data} />
      case 'workflow': return <WorkflowStep data={obj.data} />
      case 'darkroom': return <DarkRoomDoor />
      case 'travel': return <TravelGameTile />
      case 'puzzle': return (
        <div title="psst, click me" style={{
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
  // fold, visitors discover it by panning down.
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
  const [travelOpen, setTravelOpen] = useState(false)

  const onActivate = (id) => {
    const obj = OBJECTS.find(o => o.id === id)
    if (!obj) return
    if (obj.to === '__photobooth__') {
      window.dispatchEvent(new CustomEvent('open-photo-booth'))
    } else if (obj.to === '__darkroom__') {
      setDarkRoomOpen(true)
    } else if (obj.to === '__travel__') {
      setTravelOpen(true)
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
      {darkRoomOpen && <DarkRoomModal onClose={() => setDarkRoomOpen(false)} />}
      {travelOpen && <TravelGameModal onClose={() => setTravelOpen(false)} />}
      {puzzleOpen && <Puzzle onClose={() => setPuzzleOpen(false)} />}
    </>
  )
}
