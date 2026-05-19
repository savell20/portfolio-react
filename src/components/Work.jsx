import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const jobs = [
  {
    number: '01',
    company: 'Zolvo',
    date: 'Mar. 2026 — Present',
    tag: 'Y Combinator',
    role: 'UI/UX',
    accent: true,
    path: '/work/zolvo',
  },
  {
    number: '02',
    company: 'HubSpot',
    date: 'Jan. 2025 — Dec. 2025',
    tag: 'CRM Platform',
    role: 'UI/UX',
    accent: false,
    path: null,
  },
  {
    number: '03',
    company: 'Captura tu mundo',
    date: 'Jun. 2020 — May 2023',
    tag: 'Founder',
    role: 'Startup',
    accent: false,
    path: null,
  },
]

function WorkRow({ job, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => job.path && navigate(job.path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '7rem 1fr auto',
        alignItems: 'center',
        padding: '2rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: hovered
          ? (job.accent ? 'rgba(232,68,42,0.03)' : 'rgba(255,255,255,0.012)')
          : 'transparent',
        transition: 'background 0.35s ease',
        cursor: job.path ? 'none' : 'default',
        overflow: 'hidden',
      }}
    >
      {/* Ghost ordinal */}
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
        fontWeight: 700,
        color: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        transition: 'color 0.4s ease',
        userSelect: 'none',
        display: 'block',
      }}>
        {job.number}
      </span>

      {/* Center — company name + meta */}
      <div style={{ paddingLeft: '0.25rem' }}>
        <h2 style={{
          fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          margin: 0,
          lineHeight: 1.05,
          color: '#fff',
          transition: 'color 0.2s',
        }}>
          {job.company}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.55rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
            color: '#555', fontWeight: 300,
          }}>
            {job.date}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.57rem',
            color: '#444', border: '1px solid rgba(255,255,255,0.06)',
            padding: '0.15rem 0.45rem', borderRadius: 2,
            textTransform: 'uppercase', letterSpacing: '0.07em',
          }}>
            {job.tag}
          </span>
        </div>
      </div>

      {/* Right — role + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: hovered && job.path ? 'rgba(255,255,255,0.75)' : '#555',
          fontWeight: 300, transition: 'color 0.2s',
        }}>
          {job.role}
        </span>
        {job.path && (
          <motion.div
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={15} style={{ color: hovered ? '#fff' : '#555', transition: 'color 0.2s' }} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="projects" style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      position: 'relative', zIndex: 1,
    }}>
      <motion.p
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em',
          padding: '2rem 2rem 0',
        }}
      >
        selected work
      </motion.p>

      <div style={{ marginTop: '1.5rem' }}>
        {jobs.map((job, i) => (
          <WorkRow key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
