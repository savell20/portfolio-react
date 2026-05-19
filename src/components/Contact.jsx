import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/santiagoavella', display: 'linkedin.com/in/santiagoavella' },
  { label: 'Read.cv', href: 'https://read.cv/santiagoavella', display: 'read.cv/santiagoavella' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [emailHovered, setEmailHovered] = useState(false)

  return (
    <section id="contact" ref={ref} style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '6rem 2rem 5rem',
      position: 'relative', zIndex: 1,
    }}>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem',
          color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem',
        }}
      >
        contact
      </motion.p>

      {/* Invitation line */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 'clamp(1.6rem, 4.5vw, 3.5rem)', fontWeight: 800,
          letterSpacing: '-0.025em', lineHeight: 1.05,
          color: 'rgba(255,255,255,0.92)', marginBottom: '3rem', maxWidth: 640,
        }}
      >
        Feel free<br />to reach out.
      </motion.p>

      {/* Email — the hero */}
      <motion.a
        href="mailto:santiagoavellad@gmail.com"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setEmailHovered(true)}
        onMouseLeave={() => setEmailHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          textDecoration: 'none', color: 'inherit',
          padding: '1.75rem 0',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          marginBottom: '2.5rem',
          gap: '1rem',
        }}
      >
        <span style={{
          fontSize: 'clamp(1.3rem, 3.5vw, 2.8rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: emailHovered ? '#fff' : 'rgba(255,255,255,0.65)',
          transition: 'color 0.3s ease',
          wordBreak: 'break-all',
        }}>
          santiagoavellad@gmail.com
        </span>
        <motion.div
          animate={{ x: emailHovered ? 4 : 0, opacity: emailHovered ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink: 0 }}
        >
          <ArrowUpRight size={26} />
        </motion.div>
      </motion.a>

      {/* Secondary links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '5rem' }}
      >
        {socials.map(link => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
              color: '#555', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              transition: 'color 0.2s', letterSpacing: '0.04em',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = '#555'}
          >
            {link.display} <ArrowUpRight size={10} />
          </a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem',
          flexWrap: 'wrap', gap: '0.75rem',
        }}
      >
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
          color: '#2e2e2e', letterSpacing: '0.05em',
        }}>
          © 2026 Santiago Avella
        </p>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem',
          color: '#2e2e2e', letterSpacing: '0.05em',
        }}>
          Designed & built with vibe.
        </p>
      </motion.div>
    </section>
  )
}
