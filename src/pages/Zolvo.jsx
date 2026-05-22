import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import RoomShell from '../components/RoomShell'

const EASE = [0.16, 1, 0.3, 1]

const stats = [
  { value: '5', label: 'Core modules' },
  { value: '8wk', label: 'Shipped in' },
  { value: '1', label: 'Designer' },
  { value: 'YC', label: "Spring '26" },
]

const modules = [
  {
    number: '01',
    title: 'AI Invoice Verification',
    description:
      'An AI-driven pipeline that extracts, validates, and flags discrepancies in invoices — cutting manual review time by 80%. The UI surfaces confidence scores so operators can resolve edge cases without breaking flow.',
    tags: ['AI/ML', 'Data viz', 'Trust design'],
  },
  {
    number: '02',
    title: 'Real-time Reconciliation',
    description:
      'A live ledger that reconciles transactions across multiple payment rails at once. Designed for density — finance teams need data, not whitespace. Every pixel earns its place.',
    tags: ['Finance UX', 'Live data', 'Density'],
  },
  {
    number: '03',
    title: 'Loan Collections',
    description:
      'The collections workflow end to end — from delinquency triage to automated outreach scheduling. Sensitive UX: the interface had to feel firm but never predatory.',
    tags: ['Workflow', 'Ethics', 'Automation'],
  },
  {
    number: '04',
    title: 'Operator Dashboard',
    description:
      'The control center — real-time stats, exception queues, and team management in one view. I built the information hierarchy from scratch around what a collections manager cares about at 8am.',
    tags: ['Dashboard', 'Hierarchy', 'Analytics'],
  },
  {
    number: '05',
    title: 'Design System',
    description:
      'A complete component library in Figma — tokens, primitives, patterns — so every new screen could be assembled in hours, not days. Built for a team moving at startup speed.',
    tags: ['Design systems', 'Figma', 'Scale'],
  },
]

function ModuleRow({ mod, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: EASE }}
      style={{
        display: 'grid', gridTemplateColumns: '56px 1fr', gap: '1.75rem',
        padding: '2.5rem 0', borderTop: '1px solid var(--line)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 500,
        color: 'var(--grease)', paddingTop: '0.4rem', letterSpacing: '0.04em',
      }}>
        ▸{mod.number}
      </span>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: '1.35rem', letterSpacing: '-0.01em', marginBottom: '0.7rem',
          color: 'var(--ink)',
        }}>
          {mod.title}
        </h3>
        <p style={{
          fontSize: '0.94rem', color: 'var(--ink-soft)', lineHeight: 1.8,
          marginBottom: '1.1rem',
        }}>
          {mod.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {mod.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: 'var(--ink-soft)', border: '1px solid var(--line)',
              padding: '0.2rem 0.5rem', textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function Fade({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function Zolvo() {
  return (
    <RoomShell number="01" name="Zolvo">
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '3rem 1.6rem 6rem' }}>

        {/* Stamps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}
        >
          {['YC Spring 26', 'Mar 2026 — Present', 'Founding Designer'].map(s => (
            <span key={s} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: s.includes('YC') ? 'var(--grease)' : 'var(--ink-soft)',
              border: `1px solid ${s.includes('YC') ? 'rgba(210,59,34,0.4)' : 'var(--line)'}`,
              padding: '0.22rem 0.55rem', textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {s}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(3rem, 9vw, 6.5rem)', lineHeight: 0.98,
            letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '1.5rem',
          }}
        >
          Zolvo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(1.2rem, 2.6vw, 1.6rem)', lineHeight: 1.5,
            color: 'var(--ink)', maxWidth: 560, marginBottom: '3rem',
          }}
        >
          Founding designer at a YC-backed fintech — five core product modules
          designed and shipped in eight weeks.
        </motion.p>

        {/* Stats */}
        <Fade>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px', background: 'var(--line)',
            border: '1px solid var(--line)', marginBottom: '4rem',
          }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: 'var(--paper)', padding: '1.6rem 0.75rem', textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', letterSpacing: '-0.02em',
                  color: 'var(--ink)', marginBottom: '0.3rem',
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                  color: 'var(--ink-faint)', textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Fade>

        {/* Context */}
        <Fade>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
            color: 'var(--grease)', textTransform: 'uppercase',
            letterSpacing: '0.12em', marginBottom: '1.25rem',
          }}>
            Context
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem', marginBottom: '4rem',
          }}>
            <p style={{ fontSize: '0.94rem', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
              Zolvo is building the financial operating system for Latin American
              SMEs — starting with invoice financing and collections. I joined as
              the founding designer when the product was still a deck.
            </p>
            <p style={{ fontSize: '0.94rem', color: 'var(--ink-soft)', lineHeight: 1.8 }}>
              The mandate: design the entire product surface from zero, ship fast
              enough to keep up with engineering, and set a design foundation that
              scales past YC Demo Day.
            </p>
          </div>
        </Fade>

        {/* Modules */}
        <Fade>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
            color: 'var(--grease)', textTransform: 'uppercase',
            letterSpacing: '0.12em', marginBottom: '0.5rem',
          }}>
            What I built — Roll 01
          </p>
        </Fade>

        <div style={{ marginBottom: '4rem' }}>
          {modules.map((mod, i) => (
            <ModuleRow key={mod.number} mod={mod} index={i} />
          ))}
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </div>

        {/* Key learning */}
        <Fade>
          <div style={{
            padding: '2.25rem', border: '1px solid var(--line)',
            background: 'var(--paper-dim)',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'var(--grease)', textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: '0.85rem',
            }}>
              ⚡ Key learning
            </p>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontStyle: 'italic', fontSize: '1.25rem', lineHeight: 1.55,
              color: 'var(--ink)',
            }}>
              Shipping at startup speed forces clarity. With 8 weeks and 5 modules,
              every decision has to be defensible in 30 seconds — so I learned to
              cut ruthlessly, prototype fast, and trust engineering as a creative
              partner.
            </p>
          </div>
        </Fade>

        {/* CTA */}
        <Fade delay={0.05}>
          <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--line)' }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
              color: 'var(--ink-faint)', textTransform: 'uppercase',
              letterSpacing: '0.08em', marginBottom: '1.1rem',
            }}>
              Want to see the actual screens?
            </p>
            <a
              href="mailto:santiagoavellad@gmail.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'var(--ink)', textDecoration: 'none',
                border: '1px solid var(--ink)', padding: '0.7rem 1.2rem',
                letterSpacing: '0.04em', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--ink)'
                e.currentTarget.style.color = 'var(--paper)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--ink)'
              }}
            >
              get in touch <ArrowUpRight size={13} />
            </a>
          </div>
        </Fade>
      </div>
    </RoomShell>
  )
}
