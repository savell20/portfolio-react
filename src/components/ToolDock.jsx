import { MousePointer2, StickyNote, Pencil, Trash2 } from 'lucide-react'
import { DRAW_COLORS } from './Canvas'

const TOOLS = [
  { id: 'select', Icon: MousePointer2, title: 'Select & move' },
  { id: 'sticky', Icon: StickyNote, title: 'Add a sticky note' },
  { id: 'draw', Icon: Pencil, title: 'Draw' },
]

function ToolBtn({ active, onClick, title, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
      onPointerDown={e => e.stopPropagation()}
      style={{
        width: 36, height: 36, border: 'none', cursor: 'none',
        borderRadius: 'calc(var(--radius-pill) - 2px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? 'var(--surface)' : 'var(--ink-soft)',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--canvas)'; e.currentTarget.style.color = 'var(--ink)' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-soft)' } }}
    >
      {children}
    </button>
  )
}

export default function ToolDock({ mode, setMode, drawColor, setDrawColor, onClearDrawing }) {
  return (
    <>
      {/* Draw sub-toolbar — appears RIGHT of the left vertical dock when drawing */}
      {mode === 'draw' && (
        <div style={{
          position: 'fixed', left: 66, top: '50%', transform: 'translateY(-50%)',
          zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)', padding: '0.6rem 0.45rem',
          boxShadow: 'var(--shadow-card)',
        }}>
          {DRAW_COLORS.map(c => (
            <button
              key={c}
              title="Pen color"
              onClick={() => setDrawColor(c)}
              style={{
                width: 22, height: 22, borderRadius: '50%', cursor: 'none',
                background: c,
                border: drawColor === c ? '2px solid var(--ink)' : '2px solid transparent',
                boxShadow: drawColor === c ? '0 0 0 2px var(--surface), 0 0 0 3px var(--ink)' : 'none',
              }}
            />
          ))}
          <div style={{ width: 1, height: 18, background: 'var(--line)' }} />
          <button
            title="Clear all drawings"
            onClick={onClearDrawing}
            style={{
              width: 26, height: 26, borderRadius: 7, border: 'none', cursor: 'none',
              background: 'transparent', color: 'var(--ink-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)' }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}

      {/* Left vertical tool dock */}
      <div onPointerDown={e => e.stopPropagation()} style={{
        position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
        zIndex: 9000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)', padding: 5,
        boxShadow: 'var(--shadow-card)',
        animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.2s',
      }}>
        {TOOLS.map(({ id, Icon, title }) => (
          <ToolBtn key={id} active={mode === id} title={title} onClick={() => setMode(id)}>
            <Icon size={17} />
          </ToolBtn>
        ))}
      </div>
    </>
  )
}
