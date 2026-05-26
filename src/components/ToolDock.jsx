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
        width: 48, height: 48, border: 'none', cursor: 'none',
        borderRadius: 'calc(var(--radius-pill) - 2px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? '#fff' : 'var(--ink-soft)',
        transition: 'background 0.15s, color 0.15s, transform 0.15s',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--canvas)'; e.currentTarget.style.color = 'var(--ink)' } e.currentTarget.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-soft)' } e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {children}
    </button>
  )
}

export default function ToolDock({ mode, setMode, drawColor, setDrawColor, onClearDrawing }) {
  return (
    <>
      {/* Draw sub-toolbar — appears ABOVE the bottom dock when drawing */}
      {mode === 'draw' && (
        <div
          onPointerDown={e => e.stopPropagation()}
          style={{
            position: 'fixed', left: '50%', bottom: 92, transform: 'translateX(-50%)',
            zIndex: 9000, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12,
            background: 'var(--surface)', border: 'var(--border-card)',
            borderRadius: 'var(--radius-pill)', padding: '0.55rem 0.85rem',
            boxShadow: 'var(--shadow-card)',
            animation: 'pop-in 0.2s var(--ease) both',
          }}
        >
          {DRAW_COLORS.map(c => (
            <button
              key={c}
              title="Pen color"
              onClick={() => setDrawColor(c)}
              onPointerDown={e => e.stopPropagation()}
              style={{
                width: 26, height: 26, borderRadius: '50%', cursor: 'none',
                background: c,
                border: drawColor === c ? '2px solid var(--ink)' : '2px solid transparent',
                boxShadow: drawColor === c ? '0 0 0 2px var(--surface), 0 0 0 3px var(--ink)' : 'none',
              }}
            />
          ))}
          <div style={{ width: 1, height: 22, background: 'var(--line)' }} />
          <button
            title="Clear all drawings"
            onClick={onClearDrawing}
            onPointerDown={e => e.stopPropagation()}
            style={{
              width: 32, height: 32, borderRadius: 8, border: 'none', cursor: 'none',
              background: 'transparent', color: 'var(--ink-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)' }}
          >
            <Trash2 size={17} />
          </button>
        </div>
      )}

      {/* Bottom-center FigJam-style tool dock — big and chunky */}
      <div
        onPointerDown={e => e.stopPropagation()}
        style={{
          position: 'fixed', left: '50%', bottom: 20, transform: 'translateX(-50%)',
          zIndex: 9000,
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)', padding: 7,
          boxShadow: '0 12px 32px rgba(24,24,26,0.18), 0 4px 10px rgba(24,24,26,0.08)',
          animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.2s',
        }}
      >
        {TOOLS.map(({ id, Icon, title }) => (
          <ToolBtn key={id} active={mode === id} title={title} onClick={() => setMode(id)}>
            <Icon size={22} strokeWidth={2.1} />
          </ToolBtn>
        ))}
      </div>
    </>
  )
}
