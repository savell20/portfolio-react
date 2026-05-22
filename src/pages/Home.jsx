import { motion } from 'framer-motion'
import ContactSheet from '../components/ContactSheet'
import FilmEdge from '../components/FilmEdge'

const EASE = [0.16, 1, 0.3, 1]

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '2rem 1.6rem 5rem' }}>

        {/* Sheet header strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: '0.9rem', borderBottom: '1px solid var(--line)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--grease)', display: 'block',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
              color: 'var(--ink)', letterSpacing: '0.16em',
            }}>
              SANTIAGO AVELLA
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['ISO 400', '36 EXP', 'ROLL 01 — 2026'].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                color: 'var(--ink-faint)', letterSpacing: '0.06em',
              }}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Display statement */}
        <div style={{ padding: '3.5rem 0 2.5rem', overflow: 'hidden' }}>
          {['a product designer', 'with a photographer’s eye'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.15 + i * 0.1, ease: EASE }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.6rem, 6.5vw, 5.6rem)',
                  fontWeight: i === 0 ? 500 : 400,
                  fontStyle: i === 1 ? 'italic' : 'normal',
                  lineHeight: 1.02,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  margin: 0,
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.74rem',
              color: 'var(--ink-soft)', letterSpacing: '0.04em',
              marginTop: '1.5rem', lineHeight: 1.7, maxWidth: 440,
            }}
          >
            Designing AI-native products — currently founding designer
            at Zolvo (YC S26). Every frame below is a click.
          </motion.p>
        </div>

        {/* Grease-pencil "selects" note */}
        <motion.div
          initial={{ opacity: 0, rotate: -6 }}
          animate={{ opacity: 1, rotate: -4 }}
          transition={{ delay: 0.85, duration: 0.5, ease: EASE }}
          style={{
            display: 'inline-block', marginBottom: '0.5rem',
            fontFamily: 'var(--font-hand)', fontSize: '1.7rem',
            color: 'var(--grease)', lineHeight: 1,
          }}
        >
          ↓ my selects — pick a frame
        </motion.div>

        {/* The contact sheet */}
        <div style={{ marginTop: '1.5rem' }}>
          <ContactSheet />
        </div>

        {/* Footer film edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{ marginTop: '4rem' }}
        >
          <FilmEdge orientation="horizontal" count={34} thickness={15} />
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: '1rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'var(--ink-faint)', letterSpacing: '0.06em',
            }}>
              © 2026 — DEVELOPED BY HAND
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'var(--ink-faint)', letterSpacing: '0.06em',
            }}>
              SHOT ON CODE · BOGOTÁ → USA
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
