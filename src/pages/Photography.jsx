import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import { motion } from 'framer-motion'

const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=620&q=80', caption: 'Peaks' },
  { id: 2, src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=620&q=80', caption: 'Light' },
  { id: 3, src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=620&q=80', caption: 'Road' },
  { id: 4, src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=620&q=80', caption: 'Dusk' },
  { id: 5, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=620&q=80', caption: 'Valley' },
  { id: 6, src: 'https://images.unsplash.com/photo-1527430253228-e93688616381?w=620&q=80', caption: 'Forest' },
  { id: 7, src: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=620&q=80', caption: 'Desert' },
  { id: 8, src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=620&q=80', caption: 'Coast' },
  { id: 9, src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=620&q=80', caption: 'Town' },
  { id: 10, src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=620&q=80', caption: 'Falls' },
  { id: 11, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=620&q=80', caption: 'Summit' },
  { id: 12, src: 'https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=620&q=80', caption: 'Lake' },
]

function sr(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function getPos(index) {
  const cols = 4
  const col = index % cols
  const row = Math.floor(index / cols)
  return {
    left: (col / cols) * 72 + 5 + (sr(index * 11 + 7) - 0.5) * 12,
    top: (row / 3) * 60 + 8 + (sr(index * 13 + 3) - 0.5) * 12,
  }
}

function Print({ photo, index, onOpen, bringToFront, containerRef }) {
  const [isDragging, setIsDragging] = useState(false)
  const [zIdx, setZIdx] = useState(index + 2)
  const wasDragging = useRef(false)

  const rot = (sr(index) - 0.5) * 10
  const fDur = 4 + sr(index + 50) * 2.5
  const fDelay = sr(index + 100) * 3
  const pos = getPos(index)

  return (
    <div style={{ position: 'absolute', left: `${pos.left}%`, top: `${pos.top}%`, zIndex: zIdx }}>
      {/* Float layer — CSS keyframe */}
      <div style={{
        animation: isDragging ? 'none' : `float-y ${fDur}s ease-in-out ${fDelay}s infinite`,
      }}>
        {/* Drag layer — framer-motion */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragMomentum={false}
          dragElastic={0.04}
          whileDrag={{ scale: 1.06 }}
          data-grab=""
          style={{
            rotate: rot, touchAction: 'none', userSelect: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onPointerDown={() => { wasDragging.current = false }}
          onDragStart={() => { wasDragging.current = true; setIsDragging(true); setZIdx(bringToFront()) }}
          onDragEnd={() => setIsDragging(false)}
          onPointerUp={() => { if (!wasDragging.current) onOpen(photo) }}
        >
          {/* Print */}
          <div style={{
            background: 'var(--surface)', padding: '8px 8px 26px',
            width: 178, border: '1px solid var(--line)',
            boxShadow: isDragging
              ? '0 28px 54px rgba(24,24,26,0.26)'
              : '0 8px 24px rgba(24,24,26,0.13)',
            transition: 'box-shadow 0.3s ease',
            animation: 'pop-in 0.5s var(--ease) both',
            animationDelay: `${index * 0.05}s`,
          }}>
            <img
              src={photo.src} alt={photo.caption} draggable={false}
              style={{ display: 'block', width: '100%', height: 144, objectFit: 'cover' }}
              loading="lazy"
            />
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
              color: 'var(--ink-faint)', textAlign: 'center', marginTop: '0.5rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {photo.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Photography() {
  const navigate = useNavigate()
  const [lightbox, setLightbox] = useState(null)
  const [topZ, setTopZ] = useState(photos.length + 2)
  const containerRef = useRef(null)

  const bringToFront = () => {
    const next = topZ + 1
    setTopZ(next)
    return next
  }

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0, background: 'var(--canvas)' }}>

      {/* Back — bottom-center (StyleSwitcher owns top-left, TopBar owns top-right) */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 9000,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)', padding: '0.6rem 1rem', cursor: 'none',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
          color: 'var(--ink-soft)', boxShadow: 'var(--shadow-card)',
          transition: 'color 0.2s, transform 0.2s var(--ease)',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateX(-50%) translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(-50%) translateY(0)' }}
      >
        <ArrowLeft size={13} /> back to canvas
      </button>

      {/* Header label — keeps a bit of distance from the StyleSwitcher / TopBar */}
      <div style={{
        position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9000, textAlign: 'center', pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem',
          color: 'var(--ink)', letterSpacing: '-0.01em',
        }}>
          Off the clock
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--ink-faint)', letterSpacing: '0.08em', marginTop: 2,
        }}>
          35MM — DRAG THE PRINTS, CLICK TO ENLARGE
        </p>
      </div>

      {/* Print board */}
      <div ref={containerRef} style={{ position: 'absolute', inset: 0, paddingTop: '4rem' }}>
        {photos.map((photo, i) => (
          <Print
            key={photo.id}
            photo={photo}
            index={i}
            onOpen={setLightbox}
            bringToFront={bringToFront}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99990,
            background: 'rgba(24,24,26,0.78)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
            animation: 'fade-in 0.2s ease both',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--surface)', padding: '12px 12px 44px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
              maxWidth: 720, width: '100%', position: 'relative',
              animation: 'pop-in 0.35s var(--ease) both',
            }}
          >
            <img
              src={lightbox.src.replace('w=620', 'w=1400')}
              alt={lightbox.caption}
              style={{ width: '100%', display: 'block', maxHeight: '76vh', objectFit: 'contain' }}
            />
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'var(--ink-faint)', textAlign: 'center', marginTop: '0.8rem',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {lightbox.caption}
            </p>
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute', top: 13, right: 13,
                background: 'var(--ink)', border: 'none',
                width: 30, height: 30, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'none', color: '#fff',
              }}
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
