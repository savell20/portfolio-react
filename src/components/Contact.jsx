import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'Email', href: 'mailto:santiagoavellad@gmail.com', display: 'santiagoavellad@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/santiagoavella', display: 'linkedin.com/in/santiagoavella' },
  { label: 'Read.cv', href: 'https://read.cv/santiagoavella', display: 'read.cv/santiagoavella' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '6rem 2rem 5rem',
      position: 'relative', zIndex: 1,
    }}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}
      >
        contact
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)', fontWeight: 800,
          letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '3rem', maxWidth: 700 }}
      >
        Feel free<br />to reach out.
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1.4rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              textDecoration: 'none', color: 'inherit',
              transition: 'color 0.2s',
              maxWidth: 640,
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
                color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: 70 }}>
                {link.label}
              </span>
              <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)' }}>{link.display}</span>
            </div>
            <ArrowUpRight size={14} style={{ color: '#555', flexShrink: 0 }} />
          </motion.a>
        ))}
      </div>

      {/* Footer line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem',
          color: '#333', marginTop: '4rem', letterSpacing: '0.05em' }}
      >
        © 2026 Santiago Avella — Designed & built with vibe.
      </motion.p>
    </section>
  )
}
