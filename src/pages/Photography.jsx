import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RoomShell from '../components/RoomShell'

const EASE = [0.16, 1, 0.3, 1]

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

function getInitialPos(index) {
  const cols = 4
  const col = index % cols
  const row = Math.floor(index / cols)
  const baseX = (col / cols) * 74 + 4
  const baseY = (row / 3) * 58 + 6
  return {
    left: baseX + (sr(index * 11 + 7) - 0.5) * 13,
    top: baseY + (sr(index * 13 + 3) - 0.5) * 14,
  }
}

function Print({ photo, index, onOpen, bringToFront, containerRef }) {
  const [isDragging, setIsDragging] = useState(false)
  const [zIdx, setZIdx] = useState(index + 2)
  const wasDragging = useRef(false)

  const rot = (sr(index) - 0.5) * 12
  const floatDuration = 3.5 + sr(index + 50) * 2.5
  const floatDelay = sr(index + 100) * 3
  const floatY = 6 + sr(index + 200) * 8
  const pos = getInitialPos(index)

  return (
    <div style={{ position: 'absolute', left: `${pos.left}%`, top: `${pos.top}%`, zIndex: zIdx }}>
      {/* Float layer */}
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
          initial={{ opacity: 0, scale: 0.78, rotate: rot }}
          animate={{ opacity: 1, scale: 1, rotate: rot }}
          whileDrag={{ scale: 1.07, rotate: rot * 0.35 }}
          transition={{
            opacity: { duration: 0.5, delay: index * 0.05 },
            scale: { duration: 0.7, delay: index * 0.05, ease: EASE },
          }}
          onPointerDown={() => { wasDragging.current = false }}
          onDragStart={() => {
            wasDragging.current = true
            setIsDragging(true)
            setZIdx(bringToFront())
          }}
          onDragEnd={() => setIsDragging(false)}
          onPointerUp={() => { if (!wasDragging.current) onOpen(photo) }}
          style={{
            cursor: isDragging ? 'grabbing' : 'none',
            touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none',
          }}
        >
          {/* Photographic print */}
          <div style={{
            background: '#FBFAF5',
            padding: '9px 9px 32px',
            width: 184,
            border: '1px solid rgba(22,19,16,0.07)',
            boxShadow: isDragging
              ? '0 34px 64px rgba(22,19,16,0.34), 0 6px 16px rgba(22,19,16,0.22)'
              : '0 8px 26px rgba(22,19,16,0.18), 0 2px 6px rgba(22,19,16,0.1)',
            transition: 'box-shadow 0.35s ease',
          }}>
            <img
              src={photo.src}
              alt={photo.caption}
              data-loupe
              draggable={false}
              style={{ display: 'block', width: '100%', height: 152, objectFit: 'cover' }}
              loading="lazy"
            />
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: 'var(--ink-faint)', textAlign: 'center', marginTop: '0.6rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
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
    <RoomShell number="05" name="Photography">
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          height: 'calc(100vh - 4.8rem)',
          overflow: 'hidden',
        }}
      >
        {/* Ghost title */}
        <div style={{
          position: 'absolute', bottom: '-1.5rem', right: '0.5rem',
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(5rem, 20vw, 17rem)', fontStyle: 'italic',
          letterSpacing: '-0.04em', color: 'rgba(28,26,22,0.045)',
          userSelect: 'none', pointerEvents: 'none', lineHeight: 1, zIndex: 0,
        }}>
          Roll 02
        </div>

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

        {/* Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5, times: [0, 0.12, 0.72, 1], delay: 1.2 }}
          style={{
            position: 'absolute', bottom: '1.6rem', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-hand)', fontSize: '1.5rem',
            color: 'var(--grease)', zIndex: 9970, pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          drag the prints around · click one to enlarge
        </motion.div>
      </div>

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
              position: 'fixed', inset: 0, zIndex: 99990,
              background: 'rgba(22,19,16,0.86)', backdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, rotate: (sr(lightbox.id) - 0.5) * 7 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: EASE, duration: 0.5 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#FBFAF5', padding: '13px 13px 50px',
                boxShadow: '0 48px 120px rgba(0,0,0,0.7)',
                maxWidth: 720, width: '100%', position: 'relative',
              }}
            >
              <img
                src={lightbox.src.replace('w=620', 'w=1400')}
                alt={lightbox.caption}
                style={{ width: '100%', display: 'block', maxHeight: '76vh', objectFit: 'contain' }}
              />
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--ink-faint)', textAlign: 'center', marginTop: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {lightbox.caption}
              </p>
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: 'absolute', top: 13, right: 13,
                  background: 'var(--rebate)', border: 'none',
                  width: 30, height: 30, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'none', color: 'var(--paper)',
                }}
              >
                <X size={12} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </RoomShell>
  )
}
