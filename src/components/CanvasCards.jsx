import { useState } from 'react'
import { ArrowUpRight, Camera } from 'lucide-react'
import fotoPersonal from '../assets/foto-personal.jpeg'

// All chrome reads from CSS vars so every art-style restyles the cards.
const cardBase = {
  background: 'var(--surface)',
  border: 'var(--border-card)',
  borderRadius: 'var(--radius)',
  boxShadow: 'var(--shadow-card)',
}

function FrameLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 500,
      color: 'var(--ink-faint)', letterSpacing: '0.04em', marginBottom: 6,
      paddingLeft: 2, userSelect: 'none',
    }}>
      {children}
    </div>
  )
}

/* ---- Project ---- */
export function ProjectCard({ data }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FrameLabel>▸ {data.frame}</FrameLabel>
      <div style={{
        ...cardBase,
        overflow: 'hidden',
        transform: hover ? 'translate(-2px, -3px)' : 'translate(0, 0)',
        transition: 'transform 0.22s var(--ease)',
      }}>
        {/* Cover — monogram */}
        <div style={{
          height: 132, background: data.cover,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: '5.5rem', color: 'rgba(255,255,255,0.16)',
            lineHeight: 1, userSelect: 'none',
          }}>
            {data.company[0]}
          </span>
          <span style={{
            position: 'absolute', top: 10, left: 12,
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em',
          }}>
            {data.year}
          </span>
        </div>
        {/* Body */}
        <div style={{ padding: '1.05rem 1.15rem 1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '1.35rem', letterSpacing: '-0.02em', color: 'var(--ink)',
            }}>
              {data.company}
            </h3>
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 26, borderRadius: '50%',
              background: hover ? 'var(--accent)' : 'var(--canvas)',
              color: hover ? 'var(--surface)' : 'var(--ink-soft)',
              transition: 'all 0.2s',
            }}>
              <ArrowUpRight size={14} />
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--accent)', letterSpacing: '0.04em', margin: '0.2rem 0 0.7rem',
          }}>
            {data.role}
          </p>
          <p style={{ fontSize: '0.94rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '0.95rem' }}>
            {data.blurb}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {data.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                color: 'var(--ink-soft)', background: 'var(--canvas)',
                border: '1px solid var(--line)', borderRadius: 5,
                padding: '0.18rem 0.4rem', textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Photography ---- */
export function PhotographyCard() {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FrameLabel>▸ photography.case</FrameLabel>
      <div style={{
        ...cardBase,
        overflow: 'hidden',
        display: 'flex',
        transform: hover ? 'translate(-2px, -3px)' : 'translate(0, 0)',
        transition: 'transform 0.22s var(--ease)',
        height: 290,
      }}>
        {/* Left collage panel */}
        <div style={{
          flex: '0 0 46%', position: 'relative',
          background: 'linear-gradient(135deg, #2a2a30 0%, #1a1a20 100%)',
          overflow: 'hidden',
        }}>
          {/* Polaroid stack */}
          <div style={{
            position: 'absolute', top: 32, left: 38, width: 110, height: 130,
            background: '#FAF8F2', padding: '6px 6px 18px',
            transform: 'rotate(-6deg)',
            boxShadow: '0 12px 26px rgba(0,0,0,0.45)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)',
            }} />
          </div>
          <div style={{
            position: 'absolute', top: 64, left: 96, width: 110, height: 130,
            background: '#FAF8F2', padding: '6px 6px 18px',
            transform: 'rotate(8deg)',
            boxShadow: '0 12px 26px rgba(0,0,0,0.45)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #4a6a8a 0%, #2a3a52 100%)',
            }} />
          </div>
          <div style={{
            position: 'absolute', bottom: 24, left: 60, width: 110, height: 130,
            background: '#FAF8F2', padding: '6px 6px 18px',
            transform: 'rotate(-2deg)',
            boxShadow: '0 12px 26px rgba(0,0,0,0.45)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #c89968 0%, #6b4a2a 100%)',
            }} />
          </div>
          {/* film grain overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: '1.4rem 1.6rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: 'var(--ink-faint)', letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <Camera size={11} /> off the clock
            </span>
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 30, height: 30, borderRadius: '50%',
              background: hover ? 'var(--accent)' : 'var(--canvas)',
              color: hover ? 'var(--surface)' : 'var(--ink-soft)',
              transition: 'all 0.2s',
            }}>
              <ArrowUpRight size={15} />
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '1.7rem', letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '0.5rem',
          }}>
            Photography
          </h3>

          <p style={{
            fontSize: '0.9rem', color: 'var(--ink-soft)',
            lineHeight: 1.6, marginBottom: '0.9rem',
          }}>
            A slow roll — film snapshots from weekends, in-betweens, and the trips
            I almost forgot to bring a camera on. Color, grain, mistakes left in.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
            {['35mm', 'Color', 'Travel', 'Slow living'].map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                color: 'var(--ink-soft)', background: 'var(--canvas)',
                border: '1px solid var(--line)', borderRadius: 5,
                padding: '0.18rem 0.4rem', textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Sticky note ---- */
export function StickyNote({ data }) {
  return (
    <div style={{
      background: data.color, borderRadius: 3,
      padding: '1rem 1.1rem',
      transform: `rotate(${data.rotate}deg)`,
      boxShadow: '0 8px 20px rgba(24,24,26,0.14)',
      minHeight: data.tall ? 150 : 110,
      display: 'flex', flexDirection: 'column',
      justifyContent: data.link ? 'space-between' : 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-note)', fontWeight: 400,
        fontSize: '1.15rem', lineHeight: 1.4, color: '#2a2a26',
      }}>
        {data.text}
      </p>
      {data.link && (
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: '#5a5a52', marginTop: '0.7rem', letterSpacing: '0.03em',
        }}>
          {data.link}
        </p>
      )}
    </div>
  )
}

/* ---- Experience header card (sits above the case studies) ---- */
export function ExperienceCard() {
  return (
    <div>
      <FrameLabel># the arc</FrameLabel>
      <div style={{
        ...cardBase,
        padding: '1.5rem 1.7rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        height: '100%',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--accent)', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '0.7rem',
        }}>
          where I've worked
        </p>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '1.3rem', lineHeight: 1.4, letterSpacing: '-0.01em',
          color: 'var(--ink)',
        }}>
          Designed at a <span style={{ color: 'var(--accent)' }}>YC-backed fintech</span>,
          shipped at <span style={{ color: 'var(--accent)' }}>HubSpot</span>,
          founded my own studio from scratch — here&rsquo;s the arc&nbsp;↓
        </p>
      </div>
    </div>
  )
}

/* ---- About (identity card) ---- */
function LinkedinGlyph({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 6.4a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 13.4c0-2.46-1.32-3.6-3.08-3.6-1.42 0-2.06.78-2.42 1.33V9.67h-2.67V18h2.67v-4.4c0-1.16.22-2.28 1.65-2.28 1.41 0 1.43 1.32 1.43 2.35V18h2.67v-4.6z" />
    </svg>
  )
}

export function AboutCard() {
  return (
    <div>
      <FrameLabel># about</FrameLabel>
      <div style={{ ...cardBase, padding: '1.9rem 2rem', position: 'relative' }}>
        {/* LinkedIn — corner */}
        <a
          href="https://linkedin.com/in/santiagoavella"
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={e => e.stopPropagation()}
          title="LinkedIn"
          aria-label="LinkedIn"
          style={{
            position: 'absolute', top: 18, right: 18,
            width: 36, height: 36, borderRadius: 'calc(var(--radius) - 4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--canvas)', border: '1px solid var(--line)',
            color: 'var(--ink-soft)', textDecoration: 'none', cursor: 'none',
            transition: 'background 0.18s, color 0.18s, transform 0.18s var(--ease)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#0A66C2'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--canvas)'
            e.currentTarget.style.color = 'var(--ink-soft)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <LinkedinGlyph size={17} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.3rem' }}>
          <img
            src={fotoPersonal}
            alt="Santiago Avella"
            draggable={false}
            style={{
              width: 112, height: 112,
              borderRadius: 'var(--radius)',
              objectFit: 'cover', objectPosition: 'top',
              border: 'var(--border-card)',
              boxShadow: 'var(--shadow-card)',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--ink-faint)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: '0.4rem',
            }}>
              Portfolio — 2026
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '2.3rem', lineHeight: 1.02, letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}>
              Santiago Avella
            </h1>
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '1.35rem', lineHeight: 1.4, letterSpacing: '-0.01em',
          color: 'var(--ink)', marginTop: '1.4rem',
        }}>
          Product designer crafting <span style={{ color: 'var(--accent)' }}>AI-native interfaces</span> —
          turning complex systems into things that feel obvious.
        </p>

        <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginTop: '0.8rem' }}>
          Designed at a YC-backed startup, shipped at HubSpot, and built my own
          company from scratch. The best interfaces disappear — leaving only the outcome.
        </p>
      </div>
    </div>
  )
}
