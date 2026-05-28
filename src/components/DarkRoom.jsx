import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Droplets } from 'lucide-react'

const NEGATIVES = [
  { id: 'n1', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', caption: 'peaks' },
  { id: 'n2', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', caption: 'light' },
  { id: 'n3', src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', caption: 'road' },
  { id: 'n4', src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', caption: 'coast' },
  { id: 'n5', src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', caption: 'dusk' },
  { id: 'n6', src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', caption: 'valley' },
]

/* ─────────────────────────────────────────────────────────────
   DARK ROOM DOOR, canvas object. Opens on hover, click to enter.
   ───────────────────────────────────────────────────────────── */
export function DarkRoomDoor({ height = 320 }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        width: '100%', height,
        background: 'linear-gradient(180deg,#1a0a0a 0%,#3a1e0e 100%)',
        border: '8px solid #2a1410',
        borderRadius: 10,
        boxShadow: '0 22px 42px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.25s var(--ease)',
      }}
    >
      {/* Sign */}
      <div style={{
        position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
        zIndex: 5, padding: '4px 10px',
        background: '#8B0000', color: '#fff',
        fontFamily: 'var(--font-mono)', fontSize: '0.58rem', fontWeight: 700,
        letterSpacing: '0.16em',
        boxShadow: '0 0 14px rgba(255,40,40,0.55)',
        borderRadius: 2,
      }}>
        DARKROOM
      </div>

      {/* Glowing interior revealed when door is open */}
      <div style={{
        position: 'absolute', inset: 50,
        background: 'radial-gradient(circle at 50% 50%, #8B0000 0%, #1a0606 75%)',
        borderRadius: 4,
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 6, padding: '1rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
          color: '#fff', letterSpacing: '0.16em', textTransform: 'uppercase',
          opacity: 0.85,
        }}>
          enter the
        </span>
        <span style={{
          fontFamily: 'var(--font-note)', fontSize: '1.4rem',
          color: '#fff', lineHeight: 1, opacity: 0.95,
        }}>
          developing room
        </span>
      </div>

      {/* Left door panel, hinges left, swings out */}
      <div style={{
        position: 'absolute', top: 42, bottom: 8, left: 8,
        width: 'calc(50% - 8px)',
        background:
          'repeating-linear-gradient(180deg, #4a2418 0 8px, #3a1c14 8px 16px)',
        borderRadius: '2px 0 0 2px',
        boxShadow: 'inset -10px 0 18px rgba(0,0,0,0.55)',
        transformOrigin: 'left center',
        transform: hover ? 'perspective(600px) rotateY(-65deg)' : 'perspective(600px) rotateY(0)',
        transition: 'transform 0.55s var(--ease)',
        zIndex: 4,
      }}>
        {/* knob */}
        <span style={{
          position: 'absolute', top: '50%', right: 8,
          width: 6, height: 6, borderRadius: '50%',
          background: '#c9a86a',
          boxShadow: '0 0 4px rgba(0,0,0,0.7)',
        }} />
      </div>
      {/* Right door panel, hinges right, swings out */}
      <div style={{
        position: 'absolute', top: 42, bottom: 8, right: 8,
        width: 'calc(50% - 8px)',
        background:
          'repeating-linear-gradient(180deg, #3a1c14 0 8px, #4a2418 8px 16px)',
        borderRadius: '0 2px 2px 0',
        boxShadow: 'inset 10px 0 18px rgba(0,0,0,0.55)',
        transformOrigin: 'right center',
        transform: hover ? 'perspective(600px) rotateY(65deg)' : 'perspective(600px) rotateY(0)',
        transition: 'transform 0.55s var(--ease)',
        zIndex: 4,
      }}>
        <span style={{
          position: 'absolute', top: '50%', left: 8,
          width: 6, height: 6, borderRadius: '50%',
          background: '#c9a86a',
          boxShadow: '0 0 4px rgba(0,0,0,0.7)',
        }} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   DARK ROOM MODAL, drag negatives into the developer tray to
   reveal the photos. Stays revealed once developed.
   ───────────────────────────────────────────────────────────── */
function Negative({ neg, developed, onDevelop, containerRef }) {
  const ref = useRef(null)
  const drag = useRef(null)
  const [pos, setPos] = useState(neg.start)
  const [dragging, setDragging] = useState(false)

  const onDown = (e) => {
    e.stopPropagation()
    drag.current = {
      sx: e.clientX, sy: e.clientY,
      ox: pos.x, oy: pos.y,
    }
    setDragging(true)
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* */ }
  }
  const onMove = (e) => {
    if (!drag.current) return
    const nx = drag.current.ox + (e.clientX - drag.current.sx)
    const ny = drag.current.oy + (e.clientY - drag.current.sy)
    setPos({ x: nx, y: ny })

    // Hit-test against the developer tray
    if (!developed && containerRef.current) {
      const tray = containerRef.current.querySelector('[data-tray]')
      if (tray) {
        const t = tray.getBoundingClientRect()
        const r = ref.current?.getBoundingClientRect()
        if (r && r.left + r.width / 2 > t.left && r.left + r.width / 2 < t.right
              && r.top + r.height / 2 > t.top && r.top + r.height / 2 < t.bottom) {
          onDevelop(neg.id)
        }
      }
    }
  }
  const onUp = (e) => {
    drag.current = null; setDragging(false)
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch { /* */ }
  }

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      style={{
        position: 'absolute',
        left: pos.x, top: pos.y,
        width: 130, height: 156,
        padding: '6px 6px 20px',
        background: '#FAF8F2',
        boxShadow: dragging
          ? '0 22px 36px rgba(0,0,0,0.65)'
          : '0 10px 22px rgba(0,0,0,0.45)',
        transform: `rotate(${neg.rotate}deg) ${dragging ? 'scale(1.05)' : 'scale(1)'}`,
        cursor: 'none', touchAction: 'none',
        zIndex: dragging ? 30 : 10,
        transition: dragging ? 'none' : 'transform 0.3s var(--ease), box-shadow 0.3s',
      }}
    >
      <div style={{
        width: '100%', height: '100%',
        background: developed ? `url(${neg.src}) center/cover` : '#1a1a1a',
        position: 'relative', overflow: 'hidden',
        transition: 'background 0.6s ease, filter 0.8s ease',
        filter: developed ? 'none' : 'invert(0.9) brightness(0.4) contrast(1.6)',
        backgroundImage: `url(${neg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* "Wet" sheen when freshly developed */}
        {developed && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.08) 100%)',
            animation: 'pop-in 0.6s var(--ease) both',
            pointerEvents: 'none',
          }} />
        )}
      </div>
      <p style={{
        position: 'absolute', bottom: 4, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
        color: '#5a5a52', letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {developed ? neg.caption : '· · ·'}
      </p>
    </div>
  )
}

export function DarkRoomModal({ onClose }) {
  const containerRef = useRef(null)
  const [developed, setDeveloped] = useState(new Set())
  const handleDevelop = (id) => {
    setDeveloped(s => { if (s.has(id)) return s; const next = new Set(s); next.add(id); return next })
  }

  // Initial scattered positions for the negatives
  const negs = NEGATIVES.map((n, i) => {
    const cols = 3
    const col = i % cols
    const row = Math.floor(i / cols)
    return {
      ...n,
      rotate: ((i % 2 ? 1 : -1) * (4 + (i % 3) * 2)),
      start: {
        x: 40 + col * 175 + (Math.random() * 24 - 12),
        y: 40 + row * 200 + (Math.random() * 30 - 15),
      },
    }
  })

  return createPortal(
    <div
      onPointerDown={e => e.stopPropagation()}
      style={{
        position: 'fixed', inset: 0, zIndex: 99995,
        background: 'radial-gradient(ellipse at 50% 35%, #2a0a0a 0%, #050000 80%)',
        animation: 'fade-in 0.3s ease both',
      }}
    >
      {/* Red safelight overlay (subtle) */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 80% 10%, rgba(255,30,30,0.18) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        position: 'fixed', top: 18, left: 22, right: 22, zIndex: 100000,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            color: '#FF5050', letterSpacing: '0.18em', textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            # darkroom · safelight on
          </p>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
            color: '#fff', letterSpacing: '-0.01em',
            opacity: 0.92,
          }}>
            Dip the negatives in the tray to develop them
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Leave the darkroom"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '0.55rem 0.9rem', cursor: 'none',
            background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 999, color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
          }}
        >
          <X size={13} /> leave
        </button>
      </div>

      {/* Workspace */}
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }}>
        {negs.map(n => (
          <Negative
            key={n.id}
            neg={n}
            developed={developed.has(n.id)}
            onDevelop={handleDevelop}
            containerRef={containerRef}
          />
        ))}

        {/* Developer tray, center-bottom */}
        <div
          data-tray
          style={{
            position: 'absolute',
            left: '50%', bottom: 60,
            transform: 'translateX(-50%)',
            width: 'min(440px, 70vw)', height: 'min(190px, 26vh)',
            background: 'linear-gradient(180deg, #1a3a5a 0%, #0a1f38 100%)',
            border: '6px solid #c0c0c0',
            borderRadius: 12,
            boxShadow: '0 14px 36px rgba(0,0,0,0.6), inset 0 0 40px rgba(0,0,0,0.45)',
            overflow: 'hidden',
          }}
        >
          {/* Water ripples */}
          <div style={{
            position: 'absolute', inset: 8,
            background: `
              radial-gradient(circle at 25% 35%, rgba(255,255,255,0.12) 0%, transparent 18%),
              radial-gradient(circle at 70% 60%, rgba(255,255,255,0.10) 0%, transparent 22%),
              radial-gradient(circle at 50% 80%, rgba(255,255,255,0.08) 0%, transparent 20%)
            `,
            borderRadius: 6,
          }} />
          <span style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
            color: 'rgba(255,255,255,0.6)', letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}>
            <Droplets size={11} /> developer tray
          </span>
        </div>
      </div>
    </div>,
    document.body
  )
}
