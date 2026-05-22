import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import RoomShell from '../components/RoomShell'

const EASE = [0.16, 1, 0.3, 1]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/santiagoavella', display: 'linkedin.com/in/santiagoavella' },
  { label: 'Read.cv', href: 'https://read.cv/santiagoavella', display: 'read.cv/santiagoavella' },
]

export default function Contact() {
  const [hovered, setHovered] = useState(false)

  return (
    <RoomShell number="06" name="Contact">
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.6rem 6rem' }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
            color: 'var(--grease)', letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: '1.75rem',
          }}
        >
          Shutter's open
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(2rem, 5vw, 3.6rem)', lineHeight: 1.05,
            letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: '0.6rem',
          }}
        >
          Let's make something{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 400 }}>worth framing.</span>
        </motion.h1>

        {/* Email — the hero */}
        <motion.a
          href="mailto:santiagoavellad@gmail.com"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '1rem', textDecoration: 'none',
            marginTop: '2.5rem', padding: '1.6rem 0',
            borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 3.6vw, 2.6rem)', fontWeight: 400,
            letterSpacing: '-0.02em', wordBreak: 'break-all',
            color: hovered ? 'var(--grease)' : 'var(--ink)',
            transition: 'color 0.3s ease',
          }}>
            santiagoavellad@gmail.com
          </span>
          <motion.div
            animate={{ x: hovered ? 5 : 0, y: hovered ? -5 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ flexShrink: 0, color: hovered ? 'var(--grease)' : 'var(--ink)' }}
          >
            <ArrowUpRight size={26} />
          </motion.div>
        </motion.a>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', gap: '2.25rem', flexWrap: 'wrap', marginTop: '2.25rem' }}
        >
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'var(--ink-soft)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                letterSpacing: '0.04em', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--grease)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
            >
              {s.display} <ArrowUpRight size={11} />
            </a>
          ))}
        </motion.div>

        {/* Handwritten sign-off */}
        <motion.div
          initial={{ opacity: 0, rotate: -3 }}
          animate={{ opacity: 1, rotate: -2 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-hand)', fontSize: '2rem',
            color: 'var(--grease)', marginTop: '4rem', lineHeight: 1,
          }}
        >
          — see you in the frame, Santiago
        </motion.div>
      </div>
    </RoomShell>
  )
}
