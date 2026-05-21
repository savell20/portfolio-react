import { motion } from 'framer-motion'

const GRID_LINES = 5

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', padding: '7rem 2rem 0', position: 'relative', zIndex: 1,
    }}>

      {/* Vertical grid lines */}
      <div style={{
        position: 'fixed', inset: 0, display: 'grid',
        gridTemplateColumns: `repeat(${GRID_LINES}, 1fr)`, pointerEvents: 'none', zIndex: 0,
      }}>
        {Array.from({ length: GRID_LINES }).map((_, i) => (
          <span key={i} style={{
            borderRight: '1px solid rgba(255,255,255,0.04)',
            ...(i === 0 ? { borderLeft: '1px solid rgba(255,255,255,0.04)' } : {}),
          }} />
        ))}
      </div>

      {/* Meta row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem',
            color: 'rgba(255,255,255,0.15)', letterSpacing: '0.04em', userSelect: 'none',
          }}>
            01
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#555', fontWeight: 300 }}>
            Hey, I'm Santiago
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
            color: '#e8442a', border: '1px solid rgba(232,68,42,0.25)',
            padding: '0.2rem 0.6rem', borderRadius: 2,
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Zolvo · YC S26
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#555', fontWeight: 300 }}>
            🇺🇸 / 🇨🇴
          </span>
        </div>
      </motion.div>

      {/* Thin horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 1, background: 'rgba(255,255,255,0.07)',
          marginBottom: '2.5rem', transformOrigin: 'left',
        }}
      />

      {/* Big title */}
      <h1 data-cursor-invert style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.92, margin: 0 }}>
        {[
          'a product designer',
          <>that acts <em style={{ fontStyle: 'italic', fontWeight: 300 }}>AI first</em></>,
        ].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.38 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'block',
                fontSize: 'clamp(3.2rem, 9.5vw, 10rem)',
                fontWeight: 800, letterSpacing: '-0.02em',
              }}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </h1>

      {/* Bottom strip — descriptor + scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.6 }}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '2.5rem', paddingTop: '2rem', paddingBottom: '3.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: '#444', letterSpacing: '0.04em', lineHeight: 1.6, maxWidth: 340,
        }}>
          Designing AI-native products that feel inevitable.
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555',
        }}>
          <span>Scroll</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            style={{ width: 40, height: 1, background: '#c8b99a', transformOrigin: 'left' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
