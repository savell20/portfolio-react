import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'work', to: '/#projects', section: 'projects' },
  { label: 'about', to: '/#about', section: 'about' },
  { label: 'photography', to: '/photography', section: null },
  { label: 'contact', to: '/#contact', section: 'contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') return
    const sections = ['projects', 'about', 'contact']
    const observers = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [location.pathname])

  // Clear active section on non-home pages
  useEffect(() => {
    if (location.pathname !== '/') setActiveSection('')
  }, [location.pathname])

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

  const isActive = (link) => {
    if (link.section) return activeSection === link.section
    return location.pathname === link.to
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
        <Link to="/" style={{
          fontWeight: 700, letterSpacing: '0.05em', fontSize: '0.88rem',
          color: '#fff', textDecoration: 'none',
        }}>
          SA
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ gap: '2.5rem', alignItems: 'center' }}>
          {links.map(l => {
            const active = isActive(l)
            return (
              <button
                key={l.label}
                onClick={() => handleLink(l.to)}
                style={{
                  background: 'none', border: 'none', cursor: 'none',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
                  color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s',
                  position: 'relative', padding: '0.2rem 0',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = active ? '#fff' : 'rgba(255,255,255,0.45)'}
              >
                {l.label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute', bottom: -2, left: 0, right: 0,
                      height: 1, background: '#fff',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              style={{ display: 'block', width: 22, height: 1.5, background: '#fff', borderRadius: 1 }}
              animate={open
                ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 6.5 : i === 2 ? -6.5 : 0, opacity: i === 1 ? 0 : 1 }
                : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, background: '#0a0a0a', zIndex: 99,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem',
            }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                onClick={() => handleLink(l.to)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(1.4rem, 6vw, 2rem)',
                  color: isActive(l) ? '#fff' : 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.04em',
                }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
