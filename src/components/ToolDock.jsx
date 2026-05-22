import { useState } from 'react'
import { MousePointer2, StickyNote, Pencil, Volume2, VolumeX, Trash2 } from 'lucide-react'
import { isMuted, setMuted, playClick } from '../lib/sound'
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
      style={{
        width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? '#fff' : 'var(--ink-soft)',
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
  const [muted, setMutedState] = useState(isMuted())

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    setMutedState(next)
    if (!next) playClick()
  }

  return (
    <>
      {/* Left tool dock */}
      <div style={{
        position: 'fixed', left: 16, top: '50%', transform: 'translateY(-50%)',
        zIndex: 9000, display: 'flex', flexDirection: 'column', gap: 2,
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 12, padding: 5,
        boxShadow: '0 6px 22px rgba(0,0,0,0.1)',
      }}>
        {TOOLS.map(({ id, Icon, title }) => (
          <ToolBtn key={id} active={mode === id} title={title} onClick={() => setMode(id)}>
            <Icon size={17} />
          </ToolBtn>
        ))}
        <div style={{ height: 1, background: 'var(--line)', margin: '4px 6px' }} />
        <ToolBtn active={false} title={muted ? 'Sound off' : 'Sound on'} onClick={toggleMute}>
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </ToolBtn>
      </div>

      {/* Draw sub-toolbar */}
      {mode === 'draw' && (
        <div style={{
          position: 'fixed', left: 64, top: '50%', transform: 'translateY(-50%)',
          zIndex: 9000, display: 'flex', flexDirection: 'column', gap: 8,
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 12, padding: '0.6rem 0.5rem',
          boxShadow: '0 6px 22px rgba(0,0,0,0.1)', alignItems: 'center',
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
          <div style={{ height: 1, width: 22, background: 'var(--line)' }} />
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
    </>
  )
}
