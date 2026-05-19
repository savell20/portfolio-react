import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Zap } from 'lucide-react'

const modules = [
  {
    number: '01',
    title: 'AI Invoice Verification',
    description: 'Built an AI-driven pipeline that extracts, validates, and flags discrepancies in invoices — reducing manual review time by 80%. Designed the verification UI to surface confidence scores and let operators resolve edge cases without breaking flow.',
    tags: ['AI/ML', 'Data viz', 'Trust design'],
  },
  {
    number: '02',
    title: 'Real-time Reconciliation',
    description: 'A live ledger view that reconciles transactions across multiple payment rails simultaneously. Designed for density — finance teams need data, not whitespace. Every pixel earns its place.',
    tags: ['Finance UX', 'Live data', 'Density'],
  },
  {
    number: '03',
    title: 'Loan Collections',
    description: 'Designed the collections workflow end-to-end — from delinquency triage to automated outreach scheduling. Sensitive UX: the interface needed to feel firm but never predatory.',
    tags: ['Workflow', 'Ethics', 'Automation'],
  },
  {
    number: '04',
    title: 'Operator Dashboard',
    description: 'The control center. Real-time stats, exception queues, and team management in one view. Designed the information hierarchy from scratch — prioritizing what a collections manager cares about at 8am.',
    tags: ['Dashboard', 'Information hierarchy', 'Analytics'],
  },
  {
    number: '05',
    title: 'Design System',
    description: 'Spun up a complete component library in Figma — tokens, primitives, patterns — so every new screen could be assembled in hours, not days. Built for a team that moves at startup speed.',
    tags: ['Design systems', 'Figma', 'Scale'],
  },
]

const stats = [
  { value: '5', label: 'Core modules' },
  { value: '8wk', label: 'Shipped in' },
  { value: '1', label: 'Designer' },
  { value: 'YC', label: "Spring '26" },
]

function ModuleRow({ mod, index: i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid', gridTemplateColumns: '52px 1fr',
        gap: '2rem', padding: '2.5rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
        color: '#444', paddingTop: '0.25rem', letterSpacing: '0.04em',
      }}>
        {mod.number}
      </span>
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
          {mod.title}
        </h3>
        <p style={{ fontSize: '0.92rem', color: '#888', lineHeight: 1.8, marginBottom: '1rem' }}>
          {mod.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {mod.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
              color: '#555', border: '1px solid rgba(255,255,255,0.07)',
              padding: '0.2rem 0.5rem', borderRadius: 2,
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Zolvo() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.4rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
            color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
        >
          <ArrowLeft size={11} /> back
        </button>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
          color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          case study
        </span>
        <div style={{ width: 60 }} />
      </nav>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '8rem 2rem 8rem' }}>

        {/* Hero */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}
          >
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
              color: '#e8442a', border: '1px solid rgba(232,68,42,0.25)',
              padding: '0.2rem 0.55rem', borderRadius: 2,
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              YC Spring '26
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
              color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Mar 2026 — Present
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 0.92, marginBottom: '1.75rem',
            }}
          >
            Zolvo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '1rem', color: '#888', lineHeight: 1.8, maxWidth: 540 }}
          >
            Founding designer at a YC-backed fintech. Built 5 core product modules
            in 8 weeks — AI-driven invoice verification, real-time reconciliation,
            and loan collections.
          </motion.p>
        </div>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px', background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 4, overflow: 'hidden', marginBottom: '5rem',
          }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: '#0a0a0a', padding: '2rem 1rem', textAlign: 'center' }}>
                <p style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
                  letterSpacing: '-0.03em', marginBottom: '0.35rem',
                }}>
                  {s.value}
                </p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
                  color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Context */}
        <FadeIn>
          <div style={{ marginBottom: '5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem',
            }}>
              context
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              <p style={{ fontSize: '0.92rem', color: '#888', lineHeight: 1.8 }}>
                Zolvo is building the financial operating system for Latin American SMEs —
                starting with invoice financing and collections. I joined as the founding
                designer when the product was still a deck.
              </p>
              <p style={{ fontSize: '0.92rem', color: '#888', lineHeight: 1.8 }}>
                My mandate: design the entire product surface from zero, ship fast enough
                to keep up with engineering, and establish a design foundation that scales
                post-YC Demo Day.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Modules */}
        <FadeIn>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
            color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem',
          }}>
            what I built
          </p>
        </FadeIn>

        <div>
          {modules.map((mod, i) => <ModuleRow key={mod.number} mod={mod} index={i} />)}
        </div>

        {/* Key learning */}
        <FadeIn>
          <div style={{
            marginTop: '5rem', padding: '2rem',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4,
            background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Zap size={12} style={{ color: '#14b8a6' }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
                color: '#14b8a6', textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                key learning
              </span>
            </div>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: '#888', maxWidth: 560 }}>
              Shipping at startup speed forces clarity. When you have 8 weeks and 5 modules,
              every design decision has to be defensible in 30 seconds. I learned to cut
              ruthlessly, prototype fast, and trust engineering as a creative partner.
            </p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              color: '#555', marginBottom: '1.25rem', letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              want to see the actual work?
            </p>
            <a
              href="mailto:santiagoavellad@gmail.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                color: '#fff', textDecoration: 'none',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
                letterSpacing: '0.04em',
                border: '1px solid rgba(255,255,255,0.15)', padding: '0.75rem 1.25rem',
                borderRadius: 2, transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              get in touch <ArrowUpRight size={13} />
            </a>
          </div>
        </FadeIn>

      </main>
    </div>
  )
}
