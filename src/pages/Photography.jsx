import { useState, useEffect, useRef } from 'react' // useRef kept for containerRef
import { useNavigate } from 'react-router-dom'
import { X, ArrowLeft, Maximize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const photos = [
  { id: 1, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', caption: 'Peaks' },
  { id: 2, src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', caption: 'Light' },
  { id: 3, src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', caption: 'Road' },
  { id: 4, src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', caption: 'Dusk' },
  { id: 5, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', caption: 'Valley' },
  { id: 6, src: 'https://images.unsplash.com/photo-1527430253228-e93688616381?w=600&q=80', caption: 'Forest' },
  { id: 7, src: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&q=80', caption: 'Desert' },
  { id: 8, src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', caption: 'Coast' },
  { id: 9, src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80', caption: 'Town' },
  { id: 10, src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80', caption: 'Falls' },
  { id: 11, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', caption: 'Summit' },
  { id: 12, src: 'https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=600&q=80', caption: 'Lake' },
]

function sr(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// Scatter positions — spread across canvas, avoid header area
function getInitialPos(index) {
  // Use a grid-ish layout with randomness so they don't all clump
  const cols = 4
  const col = index % cols
  const row = Math.floor(index / cols)
  const baseX = (col / cols) * 75 + 4
  const baseY = (row / 3) * 60 + 12
  return {
    left: baseX + (sr(index * 11 + 7) - 0.5) * 14,
    top: baseY + (sr(index * 13 + 3) - 0.5) * 16,
  }
}

function PhotoCard({ photo, index, onOpen, bringToFront, containerRef }) {
  const [isDragging, setIsDragging] = useState(false)
  const [zIdx, setZIdx] = useState(index + 2)

  const rot = (sr(index) - 0.5) * 13
  const floatDuration = 3.5 + sr(index + 50) * 2.5
  const floatDelay = sr(index + 100) * 3
  const floatY = 7 + sr(index + 200) * 9
  const pos = getInitialPos(index)

  return (
    <div
      style={{
        position: 'absolute',
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        zIndex: zIdx,
      }}
    >
      {/* Float layer — only animates when not dragging */}
      <motion.div
        animate={isDragging ? { y: 0 } : { y: [0, -floatY, 0] }}
        transition={
          isDragging
            ? { duration: 0.25, ease: 'easeOut' }
            : { duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* Drag layer */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragMomentum={false}
          dragElastic={0.04}
          initial={{ opacity: 0, scale: 0.75, rotate: rot }}
          animate={{ opacity: 1, scale: 1, rotate: rot }}
          whileDrag={{ scale: 1.07, rotate: rot * 0.35 }}
          transition={{
            opacity: { duration: 0.45, delay: index * 0.055 },
            scale: { duration: 0.7, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] },
          }}
          onDragStart={() => {
            setIsDragging(true)
            const z = bringToFront()
            setZIdx(z)
          }}
          onDragEnd={() => {
            setIsDragging(false)
          }}
          onTap={() => onOpen(photo)}
          style={{
            cursor: isDragging ? 'grabbing' : 'none',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {/* Polaroid card */}
          <div
            style={{
              background: '#0f0f0f',
              padding: '9px 9px 44px',
              width: 188,
              boxShadow: isDragging
                ? '0 32px 80px rgba(0,0,0,0.95), 0 8px 20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)'
                : '0 8px 32px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
              transition: 'box-shadow 0.35s ease',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              draggable={false}
              style={{ display: 'block', width: '100%', height: 158, objectFit: 'cover' }}
              loading="lazy"
            />
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.56rem',
                color: '#3a3a3a',
                textAlign: 'center',
                marginTop: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              {photo.caption}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Photography() {
  const [lightbox, setLightbox] = useState(null)
  const [topZ, setTopZ] = useState(photos.length + 2)
  const navigate = useNavigate()
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
    <div style={{ width: '100vw', height: '100vh', background: '#080808', overflow: 'hidden', position: 'fixed', inset: 0 }}>

      {/* Fixed header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9990,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.3rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(16px)',
      }}>
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >
          <ArrowLeft size={12} /> back
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
            color: '#333', textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            travel photography
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem',
            color: '#252525', letterSpacing: '0.06em',
          }}>
            — drag to arrange
          </span>
        </motion.div>

        <div style={{ width: 60 }} />
      </div>

      {/* Ghost title — deep background */}
      <div style={{
        position: 'absolute', bottom: '-2rem', right: '-1rem',
        fontFamily: "'Manrope', sans-serif",
        fontSize: 'clamp(6rem, 22vw, 20rem)',
        fontWeight: 800,
        letterSpacing: '-0.05em',
        color: 'rgba(255,255,255,0.018)',
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 1,
        zIndex: 0,
      }}>
        TRAVEL
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          paddingTop: '60px',
          zIndex: 1,
        }}
      >
        {photos.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={i}
            onOpen={setLightbox}
            bringToFront={bringToFront}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* Hint — fades out after 4s */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4.5, times: [0, 0.15, 0.7, 1], delay: 1.5 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
          color: '#2a2a2a', textTransform: 'uppercase', letterSpacing: '0.1em',
          zIndex: 9980, pointerEvents: 'none', whiteSpace: 'nowrap',
        }}
      >
        drag · rearrange · click to expand
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 99999,
              background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, rotate: (sr(lightbox.id) - 0.5) * 8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#0f0f0f',
                padding: '12px 12px 56px',
                boxShadow: '0 48px 120px rgba(0,0,0,1), 0 8px 32px rgba(0,0,0,0.8)',
                maxWidth: 740, width: '100%', position: 'relative',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <img
                src={lightbox.src.replace('w=600', 'w=1400')}
                alt={lightbox.caption}
                style={{ width: '100%', display: 'block', maxHeight: '78vh', objectFit: 'contain' }}
              />
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.6rem', color: '#333',
                textAlign: 'center', marginTop: '0.9rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {lightbox.caption}
              </p>
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: 'absolute', top: 14, right: 14,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                  width: 30, height: 30, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'none', color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                <X size={12} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
