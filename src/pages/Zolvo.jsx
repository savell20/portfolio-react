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
  { value: '8', label: 'Weeks to ship' },
  { value: '1', label: 'Designer (me)' },
  { value: 'YC', label: 'Spring \'26' },
]

function ModuleRow({ mod, index: i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid', gridTemplateColumns: '60px 1fr',
        gap: '2rem', padding: '2.5rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
        color: '#333', paddingTop: '0.2rem' }}>
        {mod.number}
      </span>
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em',
          marginBottom: '0.75rem' }}>
          {mod.title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.75,
          marginBottom: '1rem' }}>
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

function Section({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
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
          style={{ background: 'none', border: 'none', cursor: 'none',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
        >
          <ArrowLeft size={12} /> back
        </button>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          case study
        </span>
        <div style={{ width: 60 }} />
      </nav>

      <main style={{ maxWidth: 860, margin: '0 auto', padding: '8rem 2rem 6rem' }}>

        {/* Hero */}
        <div style={{ marginBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              color: '#e8442a', border: '1px solid rgba(232,68,42,0.3)',
              padding: '0.2rem 0.6rem', borderRadius: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              YC Spring '26
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Mar 2026 — Present
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 0.92, marginBottom: '1.5rem' }}
          >
            Zolvo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#888',
              lineHeight: 1.7, maxWidth: 580 }}
          >
            Founding designer at a YC-backed fintech. Built 5 core product modules
            in 8 weeks — AI-driven invoice verification, real-time reconciliation,
            and loan collections.
          </motion.p>
        </div>

        {/* Stats */}
        <Section delay={0.1}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px', background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 4, overflow: 'hidden',
            marginBottom: '5rem',
          }}>
            {stats.map(s => (
              <div key={s.label} style={{
                background: '#0a0a0a', padding: '2rem 1.5rem',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800,
                  letterSpacing: '-0.03em', marginBottom: '0.3rem' }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
                  color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Context */}
        <Section delay={0}>
          <div style={{ marginBottom: '5rem', paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
              context
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <p style={{ fontSize: '0.95rem', color: '#888', lineHeight: 1.8 }}>
                Zolvo is building the financial operating system for Latin American SMEs —
                starting with invoice financing and collections. I joined as the founding
                designer when the product was still a deck.
              </p>
              <p style={{ fontSize: '0.95rem', color: '#888', lineHeight: 1.8 }}>
                My mandate: design the entire product surface from zero, ship fast enough
                to keep up with engineering, and establish a design foundation that can scale
                post-YC Demo Day.
              </p>
            </div>
          </div>
        </Section>

        {/* Modules */}
        <Section delay={0}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
            color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>
            what I built
          </p>
        </Section>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {modules.map((mod, i) => (
            <ModuleRow key={mod.number} mod={mod} index={i} />
          ))}
        </div>

        {/* Reflection */}
        <Section delay={0}>
          <div style={{ marginTop: '5rem', padding: '2.5rem',
            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4,
            background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Zap size={13} style={{ color: '#14b8a6' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
                color: '#14b8a6', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                key learning
              </span>
            </div>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#ccc', maxWidth: 600 }}>
              Shipping at startup speed forces clarity. When you have 8 weeks and 5 modules,
              every design decision has to be defensible in 30 seconds. I learned to cut
              ruthlessly, prototype fast, and trust engineering as a creative partner.
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section delay={0}>
          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
              color: '#555', marginBottom: '1rem', letterSpacing: '0.06em' }}>
              want to see the actual work?
            </p>
            <a href="mailto:santiagoavellad@gmail.com"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                color: '#fff', textDecoration: 'none', fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem',
                borderRadius: 2, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            >
              get in touch <ArrowUpRight size={14} />
            </a>
          </div>
        </Section>
      </main>
    </div>
  )
}
