import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import fotoPersonal from '../assets/foto-personal.jpeg'

const cardBase = {
  background: 'var(--surface)',
  border: '1px solid var(--line)',
  borderRadius: 14,
  boxShadow: '0 6px 22px rgba(24,24,26,0.07)',
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

/* ---- Title ---- */
export function TitleCard() {
  return (
    <div>
      <FrameLabel># intro</FrameLabel>
      <div style={{ ...cardBase, padding: '1.6rem 1.7rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.1rem' }}>
          <img
            src={fotoPersonal}
            alt="Santiago Avella"
            draggable={false}
            style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }}
          />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
            color: 'var(--ink-faint)', letterSpacing: '0.08em',
          }}>
            PORTFOLIO — 2026
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '2.5rem', lineHeight: 1.02, letterSpacing: '-0.03em',
          color: 'var(--ink)', marginBottom: '0.6rem',
        }}>
          Santiago Avella
        </h1>
        <p style={{
          fontSize: '0.96rem', color: 'var(--ink-soft)', lineHeight: 1.55,
          marginBottom: '1.15rem',
        }}>
          Product designer crafting <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>
          AI-native interfaces</strong> — turning complex systems into things
          that feel obvious.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { dot: '#28C76F', text: 'Available for work' },
            { dot: null, text: 'Bogotá → USA' },
          ].map(c => (
            <span key={c.text} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
              color: 'var(--ink-soft)', background: 'var(--canvas)',
              border: '1px solid var(--line)', borderRadius: 6,
              padding: '0.25rem 0.55rem',
            }}>
              {c.dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot }} />}
              {c.text}
            </span>
          ))}
        </div>
      </div>
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
        border: hover ? '1px solid var(--accent)' : '1px solid var(--line)',
        boxShadow: hover
          ? '0 16px 38px rgba(24,24,26,0.16)'
          : '0 6px 22px rgba(24,24,26,0.07)',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.22s var(--ease)',
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
              fontSize: '1.2rem', letterSpacing: '-0.02em', color: 'var(--ink)',
            }}>
              {data.company}
            </h3>
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 26, borderRadius: '50%',
              background: hover ? 'var(--accent)' : 'var(--canvas)',
              color: hover ? '#fff' : 'var(--ink-soft)',
              transition: 'all 0.2s',
            }}>
              <ArrowUpRight size={14} />
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: 'var(--accent)', letterSpacing: '0.04em', margin: '0.15rem 0 0.6rem',
          }}>
            {data.role}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
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
        fontFamily: 'var(--font-hand)', fontWeight: 600,
        fontSize: '1.4rem', lineHeight: 1.15, color: '#2a2a26',
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

/* ---- About ---- */
const traits = [
  ['Approach', 'AI-first'],
  ['School', 'SCAD'],
  ['Based', 'United States'],
  ['Roots', 'Colombia'],
]

export function AboutCard() {
  return (
    <div>
      <FrameLabel># about</FrameLabel>
      <div style={{ ...cardBase, padding: '1.5rem 1.6rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.9rem',
        }}>
          WHO'S DRIVING
        </p>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '1.15rem', lineHeight: 1.4, color: 'var(--ink)',
          letterSpacing: '-0.01em', marginBottom: '0.85rem',
        }}>
          An optimist who finds order in chaos.
        </p>
        <p style={{ fontSize: '0.86rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '1.2rem' }}>
          I've designed at a YC-backed startup, shipped at HubSpot, and built my
          own company from scratch. The best interfaces disappear — leaving only
          the outcome.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {traits.map(([k, v]) => (
            <div key={k} style={{
              background: 'var(--canvas)', border: '1px solid var(--line)',
              borderRadius: 7, padding: '0.5rem 0.65rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                color: 'var(--ink-faint)', textTransform: 'uppercase',
                letterSpacing: '0.08em', marginBottom: '0.15rem',
              }}>
                {k}
              </p>
              <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---- Contact ---- */
const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/santiagoavella' },
  { label: 'Read.cv', href: 'https://read.cv/santiagoavella' },
]

export function ContactCard() {
  const [hover, setHover] = useState(false)
  const stop = (e) => e.stopPropagation()
  return (
    <div>
      <FrameLabel># contact</FrameLabel>
      <div style={{ ...cardBase, padding: '1.5rem 1.6rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '0.7rem',
        }}>
          LET'S BUILD SOMETHING
        </p>
        <a
          href="mailto:santiagoavellad@gmail.com"
          onPointerDown={stop}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '1.18rem', letterSpacing: '-0.02em',
            color: hover ? 'var(--accent)' : 'var(--ink)',
            textDecoration: 'none', marginBottom: '1rem',
            transition: 'color 0.2s', wordBreak: 'break-all',
          }}
        >
          santiagoavellad@gmail.com
          <ArrowUpRight size={16} style={{ flexShrink: 0 }} />
        </a>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={stop}
              style={{
                flex: 1, textAlign: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
                color: 'var(--ink-soft)', textDecoration: 'none',
                background: 'var(--canvas)', border: '1px solid var(--line)',
                borderRadius: 7, padding: '0.5rem 0',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.color = 'var(--ink-soft)'
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
