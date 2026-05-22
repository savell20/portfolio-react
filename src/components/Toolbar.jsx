import { Minus, Plus, Maximize2 } from 'lucide-react'

function ZoomBtn({ onClick, children, label }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'none',
        width: 30, height: 30, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: 'var(--ink-soft)', borderRadius: 7, transition: 'all 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--canvas)'
        e.currentTarget.style.color = 'var(--ink)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'none'
        e.currentTarget.style.color = 'var(--ink-soft)'
      }}
    >
      {children}
    </button>
  )
}

const barBase = {
  position: 'fixed', zIndex: 9000,
  background: 'var(--surface)', border: '1px solid var(--line)',
  borderRadius: 10, boxShadow: '0 4px 16px rgba(24,24,26,0.06)',
  animation: 'fade-in 0.5s var(--ease) both',
}

export default function Toolbar({ scale, onZoomIn, onZoomOut, onReset }) {
  return (
    <>
      {/* Top-left — file identity */}
      <div style={{
        ...barBase, top: 16, left: 16,
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        padding: '0.45rem 0.7rem',
      }}>
        <span style={{
          width: 22, height: 22, borderRadius: 6, background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '0.7rem',
        }}>
          S
        </span>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 600,
          color: 'var(--ink)',
        }}>
          santiago-avella
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-faint)',
        }}>
          /portfolio
        </span>
      </div>

      {/* Top-right — presence */}
      <div style={{
        ...barBase, top: 16, right: 16,
        display: 'flex', alignItems: 'center', gap: '0.45rem',
        padding: '0.5rem 0.75rem',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28C76F' }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--ink-soft)',
        }}>
          1 online — you
        </span>
      </div>

      {/* Bottom-right — zoom controls */}
      <div style={{
        ...barBase, bottom: 16, right: 16,
        display: 'flex', alignItems: 'center', gap: '0.1rem', padding: '0.25rem',
      }}>
        <ZoomBtn onClick={onZoomOut} label="Zoom out"><Minus size={15} /></ZoomBtn>
        <button
          onClick={onReset}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500,
            color: 'var(--ink)', minWidth: 46, padding: '0 0.2rem',
          }}
        >
          {Math.round(scale * 100)}%
        </button>
        <ZoomBtn onClick={onZoomIn} label="Zoom in"><Plus size={15} /></ZoomBtn>
        <div style={{ width: 1, height: 18, background: 'var(--line)', margin: '0 2px' }} />
        <ZoomBtn onClick={onReset} label="Reset view"><Maximize2 size={14} /></ZoomBtn>
      </div>
    </>
  )
}
