import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Unsplash photos — travel/landscape feel
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

function seededRandom(seed) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function PhotoCard({ photo, index, onClick }) {
  const rot = (seededRandom(index) - 0.5) * 12
  const floatDuration = 3 + seededRandom(index + 50) * 2
  const floatDelay = seededRandom(index + 100) * 2
  const floatY = 6 + seededRandom(index + 200) * 8

  return (
    <motion.div
      onClick={() => onClick(photo)}
      initial={{ opacity: 0, scale: 0.8, rotate: rot }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: rot,
        y: [0, -floatY, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.05 },
        scale: { duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] },
        y: {
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileHover={{ scale: 1.06, rotate: 0, zIndex: 50 }}
      style={{
        cursor: 'none',
        background: '#111',
        padding: '10px 10px 36px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
        position: 'relative',
        zIndex: 1,
        willChange: 'transform',
      }}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        style={{ display: 'block', width: '100%', height: 180, objectFit: 'cover' }}
        loading="lazy"
      />
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.6rem', color: '#555',
        textAlign: 'center', marginTop: '0.5rem',
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        {photo.caption}
      </p>
    </motion.div>
  )
}

export default function Photography() {
  const [lightbox, setLightbox] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', padding: '0' }}>
      {/* Header */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.4rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)',
      }}>
        <motion.button
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: 'none', border: 'none', cursor: 'none',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
        >
          <ArrowLeft size={12} /> back
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
            color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          travel photography
        </motion.p>

        <div style={{ width: 60 }} />
      </div>

      {/* Grid of floating cards */}
      <div style={{
        paddingTop: '7rem',
        paddingBottom: '4rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '2.5rem',
        alignItems: 'start',
      }}>
        {photos.map((photo, i) => (
          <PhotoCard key={photo.id} photo={photo} index={i} onClick={setLightbox} />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#111', padding: '12px 12px 48px',
                boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
                maxWidth: 720, width: '100%', position: 'relative',
              }}
            >
              <img
                src={lightbox.src.replace('w=600', 'w=1200')}
                alt={lightbox.caption}
                style={{ width: '100%', display: 'block', maxHeight: '80vh', objectFit: 'contain' }}
              />
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem', color: '#555',
                textAlign: 'center', marginTop: '0.75rem',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {lightbox.caption}
              </p>
              <button onClick={() => setLightbox(null)} style={{
                position: 'absolute', top: 12, right: 12,
                background: 'rgba(255,255,255,0.08)', border: 'none',
                borderRadius: '50%', width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'none', color: '#fff',
              }}>
                <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
