import { motion } from 'framer-motion'
import RoomShell from '../components/RoomShell'
import fotoPersonal from '../assets/foto-personal.jpeg'

const EASE = [0.16, 1, 0.3, 1]

const traits = [
  { label: 'Approach', value: 'AI-first design' },
  { label: 'School', value: 'SCAD' },
  { label: 'Based', value: 'United States' },
  { label: 'Roots', value: 'Colombia' },
]

function Fade({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <RoomShell number="04" name="About">
      <div style={{
        maxWidth: 1000, margin: '0 auto', padding: '3rem 1.6rem 6rem',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: '4rem', alignItems: 'start',
      }}>

        {/* Text */}
        <div>
          <Fade>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
              color: 'var(--grease)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: '1.5rem',
            }}>
              The photographer
            </p>
          </Fade>

          <Fade delay={0.07}>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.08,
              letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '1.75rem',
            }}>
              An optimist who finds{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>
                order in chaos.
              </span>
            </h1>
          </Fade>

          <Fade delay={0.14}>
            <p style={{
              fontSize: '0.96rem', color: 'var(--ink-soft)', lineHeight: 1.85,
              marginBottom: '1.2rem',
            }}>
              I'm a product designer obsessed with making AI feel human. I've
              designed at a YC-backed startup, shipped at HubSpot, and built my
              own company from scratch. The best interfaces, I think, disappear —
              leaving only the outcome.
            </p>
          </Fade>

          <Fade delay={0.2}>
            <p style={{
              fontSize: '0.96rem', color: 'var(--ink-soft)', lineHeight: 1.85,
              marginBottom: '2.5rem',
            }}>
              Outside the screen I'm chasing light with a camera — which is
              really the same job: deciding what belongs inside the frame, and
              what doesn't.
            </p>
          </Fade>

          {/* Trait stamps */}
          <Fade delay={0.28}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1px', background: 'var(--line)',
              border: '1px solid var(--line)',
            }}>
              {traits.map(t => (
                <div key={t.label} style={{ background: 'var(--paper)', padding: '0.95rem 1rem' }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                    color: 'var(--ink-faint)', letterSpacing: '0.1em',
                    textTransform: 'uppercase', marginBottom: '0.35rem',
                  }}>
                    {t.label}
                  </p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>
                    {t.value}
                  </p>
                </div>
              ))}
            </div>
          </Fade>
        </div>

        {/* Portrait print */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: -2.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            background: 'var(--rebate)', padding: '9px 9px 0',
            boxShadow: '0 24px 50px rgba(22,19,16,0.3)', maxWidth: 340,
          }}>
            <img
              src={fotoPersonal}
              alt="Santiago Avella"
              data-loupe
              draggable={false}
              style={{
                width: '100%', display: 'block', aspectRatio: '4/5',
                objectFit: 'cover', objectPosition: 'center top',
              }}
            />
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 4px 9px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                color: 'var(--paper)', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                S. Avella
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.54rem',
                color: 'rgba(237,234,225,0.4)', letterSpacing: '0.04em',
              }}>
                SELF PORTRAIT
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </RoomShell>
  )
}
