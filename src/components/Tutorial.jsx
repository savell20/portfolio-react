import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  HelpCircle, X, ChevronRight, Check,
  Hand, MousePointer2, ZoomIn, StickyNote,
  Camera, BookOpen, Sparkles,
} from 'lucide-react'

/* Interactive video-game-style tutorial.
   Each step describes a gesture to try; the tutorial detects when the
   gesture happens and auto-advances. The user can always press "skip step"
   to move on, or × to bail. */
const STEPS = [
  {
    id: 'welcome',
    Icon: Hand,
    title: 'Welcome to my canvas',
    body: "Quick tour — under a minute. I'll point at things, you try them.",
    cta: "Let's go",
  },
  {
    id: 'pan',
    Icon: MousePointer2,
    title: 'Move around the board',
    body: 'Two-finger scroll on a trackpad — or your mouse wheel — pans the canvas in any direction.',
    hint: '↑ try scrolling now',
    detect: 'pan',
  },
  {
    id: 'zoom',
    Icon: ZoomIn,
    title: 'Zoom in and out',
    body: 'Pinch on a trackpad, or hold ⌘/Ctrl and scroll. The bottom-right pill has buttons too.',
    hint: 'try pinching, or ⌘ + scroll',
    detect: 'zoom',
  },
  {
    id: 'sticky',
    Icon: StickyNote,
    title: 'Stickies are draggable',
    body: 'The colorful sticky notes around the board can be picked up and moved. Grab any of them.',
    hint: 'try dragging a sticky',
    detect: 'drag',
  },
  {
    id: 'booth',
    Icon: Camera,
    title: 'The photo booth',
    body: 'See the red-curtain cabin on the right? Click it — you can take a 3-shot strip with your camera.',
    hint: 'click the photo booth',
    detect: 'photobooth',
  },
  {
    id: 'cards',
    Icon: BookOpen,
    title: 'Dive into anything',
    body: 'Click my polaroid for my bio, click any case-study card for the deep dive, click the film strip on the right for photography.',
  },
  {
    id: 'done',
    Icon: Sparkles,
    title: "That's it — explore!",
    body: "You're all set. Music lives bottom-left, dark/light toggle top-left, contact top-right.",
    cta: 'Start exploring',
  },
]

function TutorialPanel({ onClose }) {
  const [step, setStep] = useState(0)
  const [justCompleted, setJustCompleted] = useState(false)
  const completedRef = useRef(false)
  const current = STEPS[step]
  const last = step === STEPS.length - 1

  const advance = () => {
    if (last) { onClose(); return }
    setStep(s => s + 1)
    completedRef.current = false
    setJustCompleted(false)
  }

  const complete = () => {
    if (completedRef.current) return
    completedRef.current = true
    setJustCompleted(true)
    setTimeout(advance, 650)
  }

  // Gesture detection per step.
  useEffect(() => {
    completedRef.current = false
    setJustCompleted(false)
    const detect = current.detect
    if (!detect) return

    if (detect === 'pan') {
      const onWheel = (e) => {
        if (e.ctrlKey || e.metaKey) return
        if (Math.abs(e.deltaX) + Math.abs(e.deltaY) > 4) complete()
      }
      window.addEventListener('wheel', onWheel, { capture: true, passive: true })
      return () => window.removeEventListener('wheel', onWheel, { capture: true })
    }

    if (detect === 'zoom') {
      const onWheel = (e) => {
        if ((e.ctrlKey || e.metaKey) && Math.abs(e.deltaY) > 0) complete()
      }
      window.addEventListener('wheel', onWheel, { capture: true, passive: true })
      return () => window.removeEventListener('wheel', onWheel, { capture: true })
    }

    if (detect === 'drag') {
      let downAt = null
      const onDown = (e) => {
        const t = e.target
        if (t && t.closest && t.closest('[data-grab]')) {
          downAt = { x: e.clientX, y: e.clientY }
        }
      }
      const onUp = (e) => {
        if (!downAt) return
        const moved = Math.abs(e.clientX - downAt.x) + Math.abs(e.clientY - downAt.y)
        downAt = null
        if (moved > 12) complete()
      }
      window.addEventListener('pointerdown', onDown, { capture: true })
      window.addEventListener('pointerup', onUp, { capture: true })
      return () => {
        window.removeEventListener('pointerdown', onDown, { capture: true })
        window.removeEventListener('pointerup', onUp, { capture: true })
      }
    }

    if (detect === 'photobooth') {
      const onOpen = () => complete()
      window.addEventListener('open-photo-booth', onOpen)
      return () => window.removeEventListener('open-photo-booth', onOpen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Enter') advance()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, last])

  const { Icon, title, body, hint, cta, detect } = current

  return createPortal(
    <div
      onPointerDown={e => e.stopPropagation()}
      style={{
        position: 'fixed', top: 70, left: '50%', transform: 'translateX(-50%)',
        zIndex: 99980, width: 'min(440px, calc(100vw - 32px))',
        pointerEvents: 'auto',
        animation: 'pop-in 0.32s var(--ease) both',
      }}
    >
      <div style={{
        position: 'relative',
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius)', padding: '1.1rem 1.25rem 1rem',
        boxShadow: '0 22px 48px rgba(0,0,0,0.25)',
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close tutorial"
          style={{
            position: 'absolute', top: 10, right: 10,
            width: 24, height: 24, borderRadius: '50%', cursor: 'none',
            background: 'var(--canvas)', border: '1px solid var(--line)',
            color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={11} />
        </button>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{
            width: 36, height: 36, borderRadius: 8,
            background: justCompleted ? '#28C76F' : 'var(--accent-soft)',
            color: justCompleted ? '#fff' : 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.3s, color 0.3s',
            flexShrink: 0,
          }}>
            {justCompleted ? <Check size={18} /> : <Icon size={18} />}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
              color: 'var(--ink-faint)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 2,
            }}>
              Step {step + 1} / {STEPS.length}
            </p>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '1.05rem', letterSpacing: '-0.01em',
              color: 'var(--ink)', lineHeight: 1.15,
            }}>
              {title}
            </h3>
          </div>
        </div>

        <p style={{
          fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5,
          marginTop: 6, marginBottom: hint ? 8 : 10,
        }}>
          {body}
        </p>

        {/* Hint (only on detect steps) */}
        {hint && (
          <p style={{
            fontFamily: 'var(--font-note)', fontSize: '0.95rem',
            color: justCompleted ? '#28C76F' : 'var(--accent)',
            marginBottom: 10, lineHeight: 1.2,
            transition: 'color 0.3s',
          }}>
            {justCompleted ? '✓ nice!' : hint}
          </p>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* progress dots */}
          <div style={{ display: 'flex', gap: 4, flex: 1 }}>
            {STEPS.map((_, i) => (
              <span key={i} style={{
                width: i === step ? 14 : 5, height: 5, borderRadius: 3,
                background: i < step
                  ? 'var(--accent)'
                  : i === step
                    ? 'var(--accent)'
                    : 'var(--line-strong)',
                transition: 'width 0.25s var(--ease), background 0.25s',
              }} />
            ))}
          </div>
          <button
            onClick={advance}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '0.45rem 0.8rem', cursor: 'none',
              background: detect && !justCompleted ? 'var(--canvas)' : 'var(--accent)',
              color: detect && !justCompleted ? 'var(--ink-soft)' : '#fff',
              border: detect && !justCompleted ? '1px solid var(--line)' : 'none',
              borderRadius: 8,
              fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 500,
              whiteSpace: 'nowrap',
            }}
          >
            {last ? (cta || 'Done') : detect && !justCompleted ? 'skip' : (cta || 'next')}
            {!last && <ChevronRight size={11} />}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Tutorial() {
  const [open, setOpen] = useState(false)
  // Do NOT auto-open on first visit anymore. Help button is the only trigger.

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Show tutorial"
        title="Show tutorial"
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

      {open && <TutorialPanel onClose={() => setOpen(false)} />}
    </>
  )
}
