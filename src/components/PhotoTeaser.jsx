import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const FRAMES = [
  { tint: 'linear-gradient(135deg, #d4a574 0%, #6b4a2a 100%)', label: 'rio · 24' },
  { tint: 'linear-gradient(135deg, #4a6a8a 0%, #1a2540 100%)', label: 'kodak' },
  { tint: 'linear-gradient(135deg, #c89968 0%, #5a3f25 100%)', label: 'film' },
]

function Sprockets() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '4px 6px', background: '#0a0a0a',
    }}>
      {[0, 1, 2, 3, 4].map(i => (
        <span key={i} style={{
          width: 8, height: 5, borderRadius: 1.5,
          background: '#1f1f1f',
        }} />
      ))}
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
      onClick={() => navigate('/photography')}
      role="button"
      tabIndex={0}
      aria-label="Check out my photography"
      style={{
        position: 'fixed', right: 14, top: '50%', transform: 'translateY(-50%)',
        zIndex: 9400, cursor: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.3s',
      }}
    >
      {/* Film strip */}
      <div style={{
        background: '#0a0a0a', padding: 0,
        boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
        transform: hover ? 'translateX(-4px) rotate(0deg)' : 'rotate(2deg)',
        transition: 'transform 0.32s var(--ease)',
      }}>
        <Sprockets />
        {FRAMES.map((f, i) => (
          <div key={i} style={{
            width: 96, height: 78, padding: '4px 8px',
            background: '#0a0a0a',
            borderTop: i === 0 ? 'none' : '1px solid #1a1a1a',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: f.tint,
              position: 'relative',
              transition: 'filter 0.3s',
              filter: hover ? 'brightness(1.15)' : 'brightness(0.85)',
            }}>
              <span style={{
                position: 'absolute', bottom: 3, left: 4,
                fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {f.label}
              </span>
            </div>
          </div>
        ))}
        <Sprockets />
      </div>

      {/* Label pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: hover ? 'var(--accent)' : 'var(--surface)',
        color: hover ? '#fff' : 'var(--ink)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)',
        padding: '0.45rem 0.75rem',
        boxShadow: 'var(--shadow-card)',
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        fontWeight: 500, letterSpacing: '0.04em',
        transition: 'background 0.25s, color 0.25s, transform 0.32s var(--ease)',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        whiteSpace: 'nowrap',
      }}>
        check my photography <ArrowRight size={12} />
      </div>
    </div>
  )
}
