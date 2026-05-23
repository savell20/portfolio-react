import { Minus, Plus, Maximize2 } from 'lucide-react'

const stopPan = (e) => e.stopPropagation()

function ZoomBtn({ onClick, children, label }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      style={{
        background: 'none', border: 'none', cursor: 'none',
        width: 30, height: 30, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: 'var(--ink-soft)',
        borderRadius: 'calc(var(--radius-pill) - 3px)',
        transition: 'all 0.15s',
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

export default function Toolbar({ scale, onZoomIn, onZoomOut, onReset }) {
  return (
    <div
      onPointerDown={stopPan}
      style={{
        position: 'fixed', bottom: 16, right: 16, zIndex: 9000,
        display: 'flex', alignItems: 'center', gap: 1,
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)', padding: 4,
        boxShadow: 'var(--shadow-card)',
        animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.15s',
      }}
    >
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
  )
}
