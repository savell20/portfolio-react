import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'projects', to: '/#projects' },
  { label: 'about', to: '/#about' },
  { label: 'travel photography', to: '/photography' },
  { label: 'contact', to: '/#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleLink = (to) => {
    setOpen(false)
    if (to.startsWith('/#')) {
      navigate('/')
      setTimeout(() => {
        const id = to.replace('/#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      navigate(to)
    }
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.4rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(12px)',
      }}>
        <Link to="/" style={{ fontWeight: 500, letterSpacing: '0.05em', fontSize: '0.9rem', color: '#fff', textDecoration: 'none' }}>SA</Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: '2.5rem' }}>
          {links.map(l => (
            <button key={l.label} onClick={() => handleLink(l.to)} style={{
              background: 'none', border: 'none', cursor: 'none',
              fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
            >{l.label}</button>
          ))}
        </div>

        {/* Hamburger */}
        <button className="flex md:hidden" onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 4 }}>
          {[0,1,2].map(i => (
            <motion.span key={i} style={{ display: 'block', width: 22, height: 1.5, background: '#fff', borderRadius: 1 }}
              animate={open ? {
                rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                y: i === 0 ? 6.5 : i === 2 ? -6.5 : 0,
                opacity: i === 1 ? 0 : 1,
              } : { rotate: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: '#0a0a0a', zIndex: 99,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem' }}>
            {links.map((l, i) => (
              <motion.button key={l.label} onClick={() => handleLink(l.to)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{ background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(1.4rem, 6vw, 2rem)',
                  color: '#fff', letterSpacing: '0.04em' }}>
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
