import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const GRID_LINES = 5

export default function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', padding: '7rem 2rem 0', position: 'relative', zIndex: 1 }}>

      {/* Grid lines */}
      <div style={{ position: 'fixed', inset: 0, display: 'grid',
        gridTemplateColumns: `repeat(${GRID_LINES}, 1fr)`, pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: GRID_LINES }).map((_, i) => (
          <span key={i} style={{
            borderRight: '1px solid rgba(255,255,255,0.07)',
            ...(i === 0 ? { borderLeft: '1px solid rgba(255,255,255,0.07)' } : {})
          }} />
        ))}
      </div>

      {/* Meta row */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#888', fontWeight: 300 }}>
          Hey, I'm Santiago
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#888', fontWeight: 300 }}>
          🇺🇸 American / 🇨🇴 Colombian
        </span>
      </motion.div>

      {/* Big title */}
      <h1 style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.92, paddingBottom: '2.5rem', margin: 0 }}>
        {['a product designer that', <>acts <em style={{ fontStyle: 'italic', fontWeight: 300 }}>AI first</em></>].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block', fontSize: 'clamp(3.2rem, 9.5vw, 10rem)',
                fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </h1>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ position: 'absolute', bottom: '3rem', left: '2rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>
        <span>Scroll</span>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ width: 40, height: 1, background: '#c8b99a', transformOrigin: 'left' }} />
      </motion.div>
    </section>
  )
}
