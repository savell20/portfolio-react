import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const jobs = [
  { company: 'Zolvo', date: 'Mar. 2026 — Present', tag: 'Y Combinator', role: 'UI/UX', accent: true, path: '/work/zolvo' },
  { company: 'HubSpot', date: 'Jan. 2025 — Dec. 2025', tag: 'CRM Platform', role: 'UI/UX', accent: false, path: null },
  { company: 'Captura tu mundo', date: 'Jun. 2020 — May 2023', tag: 'Founder', role: 'Startup', accent: false, path: null },
]

function WorkCard({ job, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => job.path && navigate(job.path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.75rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: hovered
          ? (job.accent ? 'rgba(232,68,42,0.05)' : '#111')
          : '#0a0a0a',
        transition: 'background 0.25s ease',
        cursor: job.path ? 'none' : 'default',
      }}
    >
      {/* Left: date + company + tag */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: '#555', fontWeight: 300, minWidth: 170,
        }}>
          {job.date}
        </span>
        <h2 style={{
          fontSize: 'clamp(1.3rem, 2.8vw, 2rem)', fontWeight: 700,
          letterSpacing: '-0.02em', margin: 0,
          color: hovered && job.path ? '#fff' : '#fff',
          transition: 'color 0.2s',
        }}>
          {job.company}
        </h2>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
          color: '#555', border: '1px solid rgba(255,255,255,0.07)',
          padding: '0.2rem 0.55rem', borderRadius: 2,
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {job.tag}
        </span>
      </div>

      {/* Right: role + arrow for clickable rows */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: hovered && job.path ? 'rgba(255,255,255,0.8)' : '#555',
          fontWeight: 300, transition: 'color 0.2s',
        }}>
          {job.role}
        </span>
        {job.path && (
          <motion.div
            animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={14} style={{ color: hovered ? '#fff' : '#555' }} />
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
      {/* Section label */}
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
          <WorkCard key={job.company} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
