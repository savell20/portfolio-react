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
      position: 'relative', zIndex: 1,
    }}>

      {/* Top label strip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em',
          padding: '2rem 2rem 0',
        }}
      >
        about
      </motion.p>

      {/* Content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '0',
        alignItems: 'stretch',
      }}>

        {/* Left — text */}
        <div style={{ padding: '3rem 2rem 4rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
              letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: '1.75rem',
            }}
          >
            An optimist who finds<br />order in chaos.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '0.92rem', color: '#888', lineHeight: 1.8, marginBottom: '1.25rem' }}
          >
            I'm a product designer obsessed with making AI feel human. I've designed
            at a YC-backed startup, shipped at HubSpot, and built my own company from scratch.
            I believe the best interfaces disappear — leaving only the outcome.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '0.92rem', color: '#888', lineHeight: 1.8, marginBottom: '2.5rem' }}
          >
            Outside the screen I'm chasing light with a camera, thinking about craft,
            and endlessly curious about how things work.
          </motion.p>

          {/* Traits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.32 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.07)' }}
          >
            {traits.map(t => (
              <div key={t.label} style={{
                background: '#0a0a0a',
                padding: '1rem',
              }}>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem',
                  color: '#444', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem',
                }}>
                  {t.label}
                </p>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{t.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderLeft: '1px solid rgba(255,255,255,0.07)',
            position: 'relative', display: 'flex', alignItems: 'stretch',
            minHeight: 480,
          }}
        >
          {/* Decorative offset border */}
          <div style={{
            position: 'absolute', inset: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            pointerEvents: 'none', zIndex: 1,
          }} />
          <img
            src={fotoPersonal}
            alt="Santiago Avella"
            style={{
              width: '100%', height: '100%', display: 'block',
              objectFit: 'cover', objectPosition: 'center top',
              filter: 'grayscale(15%)',
              minHeight: 400,
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
