import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import fotoPersonal from '../assets/foto-personal.jpeg'

const traits = [
  { label: 'Approach', value: 'AI-first design' },
  { label: 'School', value: 'SCAD' },
  { label: 'Based', value: 'USA' },
  { label: 'Roots', value: 'Colombia' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '5rem 2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '4rem',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Left — text */}
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
            color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}
        >
          about
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800,
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}
        >
          An optimist who finds<br />order in chaos.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: '0.92rem', color: '#888', lineHeight: 1.8,
            maxWidth: 480, marginBottom: '2.5rem' }}
        >
          I'm a product designer obsessed with making AI feel human. I've designed
          at a YC-backed startup, shipped at HubSpot, and built my own company from scratch.
          I believe the best interfaces disappear — leaving only the outcome.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: '0.92rem', color: '#888', lineHeight: 1.8,
            maxWidth: 480, marginBottom: '2.5rem' }}
        >
          Outside the screen I'm chasing light with a camera, thinking about craft,
          and endlessly curious about how things work.
        </motion.p>

        {/* Traits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}
        >
          {traits.map(t => (
            <div key={t.label} style={{
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 4, padding: '0.75rem 1rem',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem',
                color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                {t.label}
              </p>
              <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>{t.value}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div style={{ position: 'relative', maxWidth: 380, width: '100%' }}>
          {/* Decorative border offset */}
          <div style={{
            position: 'absolute', inset: 0,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 4,
            transform: 'translate(10px, 10px)',
            pointerEvents: 'none',
          }} />
          <img
            src={fotoPersonal}
            alt="Santiago Avella"
            style={{ width: '100%', borderRadius: 4, display: 'block',
              filter: 'grayscale(20%)', objectFit: 'cover', aspectRatio: '4/5' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
