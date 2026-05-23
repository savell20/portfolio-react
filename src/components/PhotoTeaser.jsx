import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, ArrowRight } from 'lucide-react'

const POLAROIDS = [
  { tint: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)', rotate: -8, top: 8,  left: 8,  caption: 'morning light' },
  { tint: 'linear-gradient(135deg, #4a6a8a 0%, #2a3a52 100%)', rotate: 6,  top: 22, left: 56, caption: 'rio · 24' },
  { tint: 'linear-gradient(135deg, #c89968 0%, #6b4a2a 100%)', rotate: -3, top: 76, left: 22, caption: 'kodak portra' },
]

function PolaroidPreview({ tint, caption, rotate, top, left }) {
  return (
    <div style={{
      position: 'absolute', top, left,
      width: 116, height: 138, padding: '6px 6px 22px',
      background: '#FAF8F2', boxShadow: '0 14px 28px rgba(0,0,0,0.45)',
      transform: `rotate(${rotate}deg)`,
    }}>
      <div style={{ width: '100%', height: '100%', background: tint }} />
      <p style={{
        position: 'absolute', bottom: 4, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: 'var(--font-hand)', fontSize: '0.85rem', color: '#2a2a26',
      }}>
        {caption}
      </p>
    </div>
  )
}

export default function PhotoTeaser() {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)',
        zIndex: 9400,
        display: 'flex', alignItems: 'center', gap: 12,
      }}
    >
      {/* Hover popover — slides in from the right */}
      <div
        aria-hidden={!hover}
        style={{
          width: 220, height: 240, position: 'relative',
          pointerEvents: hover ? 'auto' : 'none',
          opacity: hover ? 1 : 0,
          transform: hover ? 'translateX(0)' : 'translateX(20px)',
          transition: 'opacity 0.25s var(--ease), transform 0.3s var(--ease)',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}>
          {/* polaroid collage area */}
          <div style={{
            position: 'relative', height: 160,
            background: 'linear-gradient(135deg, #2a2a30 0%, #15151a 100%)',
            overflow: 'hidden',
          }}>
            {POLAROIDS.map((p, i) => <PolaroidPreview key={i} {...p} />)}
          </div>
          {/* caption + CTA */}
          <div style={{ padding: '0.7rem 0.85rem' }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: 'var(--accent)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: '0.2rem',
            }}>
              # off the clock
            </p>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.25,
            }}>
              Check out my photography →
            </p>
          </div>
        </div>
      </div>

      {/* Always-visible tab */}
      <button
        onClick={() => navigate('/photography')}
        aria-label="Photography"
        title="Photography"
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          padding: '0.85rem 0.55rem', cursor: 'none',
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-card)',
          color: 'var(--ink-soft)',
          transition: 'color 0.18s, background 0.18s, transform 0.18s var(--ease)',
          ...(hover ? { color: 'var(--surface)', background: 'var(--accent)', transform: 'translateX(-2px)' } : {}),
        }}
      >
        <Camera size={17} />
        <span style={{
          writingMode: 'vertical-rl', transform: 'rotate(180deg)',
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          photography
        </span>
        <ArrowRight size={13} />
      </button>
    </div>
  )
}
