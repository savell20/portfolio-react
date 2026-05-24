import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  HelpCircle, X, ChevronLeft, ChevronRight,
  MousePointer2, ZoomIn, StickyNote as StickyIcon,
  Pencil, Music, Sun, Mail, Hand,
} from 'lucide-react'

const STORAGE_KEY = 'tutorial-seen-v1'

const STEPS = [
  {
    Icon: Hand,
    title: 'Welcome to my canvas',
    body: "This portfolio is an infinite FigJam-style board. Everything's interactive — pan, zoom, doodle, write notes. Take a minute and I'll show you around.",
  },
  {
    Icon: MousePointer2,
    title: 'Move around',
    body: 'Two-finger scroll on a trackpad (or scroll wheel) pans the board in any direction. You can still click-drag empty space too if you prefer.',
  },
  {
    Icon: ZoomIn,
    title: 'Zoom in & out',
    body: 'Pinch on a trackpad, or hold ⌘/Ctrl and scroll to zoom toward the cursor. The bottom-right pill has +, −, and a reset button if you get lost.',
  },
  {
    Icon: StickyIcon,
    title: 'Leave a sticky note',
    body: 'Open the left tool dock → tap the sticky icon → click anywhere on the canvas to drop a note. Double-click to edit, drag to move, or hit the × to delete.',
  },
  {
    Icon: Pencil,
    title: 'Draw on the canvas',
    body: 'Grab the pen from the left dock and scribble anywhere. Pick a color from the sub-bar. Trash icon clears all your drawings.',
  },
  {
    Icon: Music,
    title: 'Play music while you browse',
    body: 'Click the vinyl in the top-right and paste any YouTube or Spotify link. The record spins while audio plays — minimize the panel and it keeps going.',
  },
  {
    Icon: Sun,
    title: 'Light or dark',
    body: 'Top-left toggle flips the whole canvas between day and night. Your preference is remembered next visit.',
  },
  {
    Icon: Mail,
    title: 'Get in touch',
    body: 'Bottom-left dock has LinkedIn, email, phone, and résumé. Click a project card to dive into a full case study.',
  },
]

function TutorialModal({ onClose }) {
  const [step, setStep] = useState(0)
  const last = step === STEPS.length - 1
  const { Icon, title, body } = STEPS[step]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && !last) setStep(s => s + 1)
      if (e.key === 'ArrowLeft' && step > 0) setStep(s => s - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, last, onClose])

  return createPortal(
    <div
      onPointerDown={e => e.stopPropagation()}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99990,
        background: 'rgba(12,12,14,0.55)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        animation: 'fade-in 0.22s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 460,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius)', padding: '1.8rem 1.9rem 1.5rem',
          boxShadow: '0 30px 70px rgba(0,0,0,0.35)',
          position: 'relative',
          animation: 'pop-in 0.28s var(--ease) both',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close tutorial"
          style={{
            position: 'absolute', top: 14, right: 14, cursor: 'none',
            background: 'var(--canvas)', border: '1px solid var(--line)',
            width: 28, height: 28, borderRadius: '50%', color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={13} />
        </button>

        <div style={{
          width: 52, height: 52, borderRadius: 'calc(var(--radius) - 2px)',
          background: 'var(--accent-soft)', color: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1rem',
        }}>
          <Icon size={24} strokeWidth={2.2} />
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--ink-faint)', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '0.45rem',
        }}>
          Step {step + 1} of {STEPS.length}
        </p>

        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '1.45rem', letterSpacing: '-0.02em', color: 'var(--ink)',
          marginBottom: '0.65rem',
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.6,
          marginBottom: '1.4rem',
        }}>
          {body}
        </p>

        {/* progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: '1.2rem' }}>
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Go to step ${i + 1}`}
              style={{
                width: i === step ? 18 : 6, height: 6, borderRadius: 3,
                background: i === step ? 'var(--accent)' : 'var(--line-strong)',
                border: 'none', cursor: 'none',
                transition: 'width 0.25s var(--ease), background 0.25s',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* nav */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 4,
              padding: '0.55rem 0.85rem', cursor: 'none',
              background: 'var(--canvas)', border: '1px solid var(--line)',
              borderRadius: 8, color: 'var(--ink-soft)',
              fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
              opacity: step === 0 ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={13} /> back
          </button>
          <button
            onClick={() => last ? onClose() : setStep(s => s + 1)}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              padding: '0.6rem 0.85rem', cursor: 'none',
              background: 'var(--accent)', border: 'none',
              borderRadius: 8, color: '#fff',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
            }}
          >
            {last ? 'start exploring' : <>next <ChevronRight size={13} /></>}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Tutorial() {
  const [open, setOpen] = useState(false)

  // Auto-open on first ever visit.
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setOpen(true), 600)
      return () => clearTimeout(t)
    }
  }, [])

  const close = () => {
    setOpen(false)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="How to use this portfolio"
        title="How to use this portfolio"
        style={{
          position: 'fixed', top: 16, left: 88, zIndex: 9500,
          width: 36, height: 36,
          background: 'var(--surface)',
          border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)',
          boxShadow: 'var(--shadow-card)',
          cursor: 'none', color: 'var(--ink-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fade-in 0.5s var(--ease) both',
          transition: 'color 0.18s, background 0.18s',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = 'var(--canvas)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.background = 'var(--surface)' }}
      >
        <HelpCircle size={16} strokeWidth={2.2} />
      </button>

      {open && <TutorialModal onClose={close} />}
    </>
  )
}
