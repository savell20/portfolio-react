import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import Tutorial from './Tutorial'

/* Bottom-right floater — just the Help button. Sits above the zoom Toolbar. */
export default function ToolsFloater() {
  const [tutOpen, setTutOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setTutOpen(true)}
        title="Show tutorial"
        aria-label="Show tutorial"
        style={{
          position: 'fixed', top: 16, right: 16, zIndex: 9500,
          width: 40, height: 40, padding: 0, cursor: 'none',
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)',
          boxShadow: 'var(--shadow-card)',
          color: 'var(--ink-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fade-in 0.5s var(--ease) both',
          transition: 'color 0.15s, background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--canvas)'; e.currentTarget.style.color = 'var(--ink)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--ink-soft)' }}
      >
        <HelpCircle size={16} strokeWidth={2.2} />
      </button>

      <Tutorial __externalOpen={tutOpen} __setOpen={setTutOpen} />
    </>
  )
}
