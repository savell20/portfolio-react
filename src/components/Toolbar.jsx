import { Minus, Plus, RotateCcw } from 'lucide-react'

const stopPan = (e) => e.stopPropagation()

function ZoomBtn({ onClick, children, label }) {
  return (
    <button
      aria-label={label}
      title={label}
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

export default function Toolbar({ onZoomIn, onZoomOut, onReset }) {
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
      <ZoomBtn onClick={onZoomIn} label="Zoom in"><Plus size={15} /></ZoomBtn>
      <div style={{ width: 1, height: 18, background: 'var(--line)', margin: '0 2px' }} />
      <ZoomBtn onClick={onReset} label="Reset view"><RotateCcw size={13} /></ZoomBtn>
    </div>
  )
}
