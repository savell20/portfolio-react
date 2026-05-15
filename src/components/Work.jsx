import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const jobs = [
  { company: 'Zolvo', date: 'Mar. 2026 — Present', tag: 'Y Combinator', role: 'UI/UX', accent: true, path: '/work/zolvo' },
  { company: 'HubSpot', date: 'Jan. 2025 — Dec. 2025', tag: 'CRM Company', role: 'UI/UX', accent: false, path: null },
  { company: 'Captura tu mundo', date: 'Jun. 2020 — May 2023', tag: 'Founder', role: 'Startup', accent: false, path: null },
]

function WorkCard({ job, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={() => job.path && navigate(job.path)}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: '#0a0a0a', transition: 'background 0.3s ease',
        cursor: job.path ? 'none' : 'default',
      }}
      whileHover={{ backgroundColor: job.accent ? 'rgba(232,68,42,0.07)' : '#141414' }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
          color: '#555', fontWeight: 300, minWidth: 180 }}>{job.date}</span>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 700,
          letterSpacing: '-0.02em', margin: 0 }}>{job.company}</h2>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
          color: '#555', border: '1px solid rgba(255,255,255,0.07)',
          padding: '0.2rem 0.6rem', borderRadius: 2 }}>{job.tag}</span>
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
        color: '#888', fontWeight: 300 }}>{job.role}</span>
    </motion.div>
  )
}

export default function Work() {
  return (
    <section id="projects" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 1 }}>
      {jobs.map((job, i) => <WorkCard key={job.company} job={job} index={i} />)}
    </section>
  )
}
