import { MousePointer2, Trash2 } from 'lucide-react'
import { DRAW_COLORS } from './Canvas'

/* ─────────────────────────────────────────────────────────────
   Illustrated tool glyphs, a tall pencil and a stack of pink
   sticky notes, so the dock feels physical (FigJam-style).
   ───────────────────────────────────────────────────────────── */
function PencilGlyph() {
  return (
    <svg width="34" height="44" viewBox="0 0 34 44" aria-hidden>
      {/* sharpened tip */}
      <polygon points="17,2 9,16 25,16" fill="#F4D9B0" stroke="#2a2a26" strokeWidth="1.2" strokeLinejoin="round" />
      {/* graphite */}
      <polygon points="17,2 13,9 21,9" fill="#2a2a26" />
      {/* wood band */}
      <rect x="9" y="16" width="16" height="3" fill="#E2BC85" stroke="#2a2a26" strokeWidth="1.2" />
      {/* body */}
      <rect x="9" y="19" width="16" height="18" fill="#FAF8F2" stroke="#2a2a26" strokeWidth="1.2" />
      {/* ferrule */}
      <rect x="9" y="37" width="16" height="3" fill="#9aa3b2" stroke="#2a2a26" strokeWidth="1.2" />
      {/* eraser */}
      <rect x="9" y="40" width="16" height="3" fill="#E66A7B" stroke="#2a2a26" strokeWidth="1.2" />
    </svg>
  )
}

function StickyGlyph() {
  return (
    <svg width="38" height="40" viewBox="0 0 38 40" aria-hidden>
      {/* back sheet (lavender) */}
      <rect x="5" y="9" width="22" height="22" fill="#E6CFE8" stroke="#2a2a26" strokeWidth="1.2" transform="rotate(-6 16 20)" />
      {/* middle sheet (light pink) */}
      <rect x="8" y="6" width="22" height="22" fill="#FBC8D7" stroke="#2a2a26" strokeWidth="1.2" transform="rotate(4 19 17)" />
      {/* top sheet w/ folded corner */}
      <g transform="rotate(-2 20 22)">
        <path
          d="M10 12 L30 12 L30 30 L18 30 L10 22 Z"
          fill="#F88FAE" stroke="#2a2a26" strokeWidth="1.2" strokeLinejoin="round"
        />
        <path d="M10 22 L18 22 L18 30 Z" fill="#E0648A" stroke="#2a2a26" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

const TOOLS = [
  { id: 'select', label: 'Select & move', render: () => <MousePointer2 size={22} strokeWidth={2.2} /> },
  { id: 'draw',   label: 'Draw',          render: () => <PencilGlyph /> },
]

function ToolBtn({ active, onClick, title, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
      onPointerDown={e => e.stopPropagation()}
      style={{
        width: 56, height: 56, border: 'none', cursor: 'none',
        borderRadius: 14,
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
      {/* Draw sub-toolbar, appears ABOVE the bottom dock when drawing */}
      {mode === 'draw' && (
        <div
          onPointerDown={e => e.stopPropagation()}
          style={{
            position: 'fixed', left: '50%', bottom: 100, transform: 'translateX(-50%)',
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

      {/* Bottom-center FigJam-style tool dock */}
      <div
        onPointerDown={e => e.stopPropagation()}
        style={{
          position: 'fixed', left: '50%', bottom: 20, transform: 'translateX(-50%)',
          zIndex: 9000,
          display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 18, padding: 8,
          boxShadow: '0 12px 32px rgba(24,24,26,0.18), 0 4px 10px rgba(24,24,26,0.08)',
          animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.2s',
        }}
      >
        {TOOLS.map(({ id, label, render }, i) => (
          <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i === 1 && (
              <div style={{ width: 1, height: 32, background: 'var(--line)', margin: '0 2px' }} />
            )}
            <ToolBtn active={mode === id} title={label} onClick={() => setMode(id)}>
              {render()}
            </ToolBtn>
          </div>
        ))}
      </div>
    </>
  )
}
