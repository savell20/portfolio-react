import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Sun, Moon, HelpCircle, Volume2, VolumeX,
  FileText, Mail,
} from 'lucide-react'
import { isMuted, setMuted } from '../lib/sound'
import Tutorial from './Tutorial'

const RESUME_URL = 'https://drive.google.com/file/d/1mkUQy2AQd0vYHAqsHoGi-qibLa5ssIcC/view?usp=sharing'
const EMAIL = 'santi.avella28@gmail.com'
const LINKEDIN_URL = 'https://linkedin.com/in/santiagoavella'

const LINKS = [
  { to: '/about',        label: 'About' },
  { to: '/hobbies',      label: 'Hobbies' },
  { to: '/photography',  label: 'Photography' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/story',        label: 'Story' },
]

function initialTheme() {
  const s = localStorage.getItem('theme')
  if (s === 'light' || s === 'dark') return s
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function Divider() {
  return <span style={{ width: 1, height: 22, background: 'var(--line)', margin: '0 4px' }} />
}

function LinkedinGlyph({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 6.4a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 13.4c0-2.46-1.32-3.6-3.08-3.6-1.42 0-2.06.78-2.42 1.33V9.67h-2.67V18h2.67v-4.4c0-1.16.22-2.28 1.65-2.28 1.41 0 1.43 1.32 1.43 2.35V18h2.67v-4.6z" />
    </svg>
  )
}

function IconBtn({ onClick, title, ariaLabel, children, color }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={ariaLabel || title}
      style={{
        width: 34, height: 34, border: 'none', cursor: 'none',
        borderRadius: 'calc(var(--radius-pill) - 2px)',
        background: 'transparent', color: color || 'var(--ink-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--canvas)'; e.currentTarget.style.color = 'var(--ink)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = color || 'var(--ink-soft)' }}
    >
      {children}
    </button>
  )
}

export default function TopNavbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [theme, setTheme] = useState(initialTheme)
  const [clickMuted, setClickMutedState] = useState(isMuted())
  const [tutorialOpen, setTutorialOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  const toggleClicks = () => {
    const v = !clickMuted
    setMuted(v); setClickMutedState(v)
  }

  const isDark = theme === 'dark'
  const SunOrMoon = isDark ? Sun : Moon

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9500,
          display: 'flex', alignItems: 'center', gap: 2,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)', padding: 5,
          boxShadow: 'var(--shadow-card)',
          animation: 'fade-in 0.5s var(--ease) both',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {/* Utility cluster */}
        <IconBtn onClick={toggleTheme} title={isDark ? 'Switch to light' : 'Switch to dark'}>
          <SunOrMoon size={16} strokeWidth={2.2} />
        </IconBtn>
        <IconBtn onClick={() => setTutorialOpen(true)} title="Show tutorial">
          <HelpCircle size={16} strokeWidth={2.2} />
        </IconBtn>
        <IconBtn
          onClick={toggleClicks}
          title={clickMuted ? 'Click sounds: off' : 'Click sounds: on'}
          color={clickMuted ? 'var(--ink-faint)' : 'var(--ink-soft)'}
        >
          {clickMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </IconBtn>

        <Divider />

        {/* Nav links */}
        {LINKS.map(({ to, label }) => {
          const active = pathname === to
          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              style={{
                height: 34, padding: '0 0.7rem',
                borderRadius: 'calc(var(--radius-pill) - 2px)',
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? '#fff' : 'var(--ink-soft)',
                border: 'none', cursor: 'none',
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500,
                transition: 'background 0.15s, color 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--canvas)'; e.currentTarget.style.color = 'var(--ink)' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-soft)' } }}
            >
              {label}
            </button>
          )
        })}

        <Divider />

        {/* Action cluster */}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          aria-label="LinkedIn"
          style={{
            width: 34, height: 34, borderRadius: 'calc(var(--radius-pill) - 2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink-soft)', cursor: 'none', textDecoration: 'none',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0A66C2'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-soft)' }}
        >
          <LinkedinGlyph size={15} />
        </a>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Open résumé"
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            height: 34, padding: '0 0.7rem',
            borderRadius: 'calc(var(--radius-pill) - 2px)',
            background: 'transparent', color: 'var(--ink)',
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            textDecoration: 'none', cursor: 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--canvas)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          <FileText size={13} /> résumé
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent("I'm interested in working with you!")}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Send me an email"
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            height: 34, padding: '0 0.85rem',
            borderRadius: 'calc(var(--radius-pill) - 2px)',
            background: 'var(--accent)', color: '#fff',
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500,
            textDecoration: 'none', cursor: 'none',
            transition: 'transform 0.15s var(--ease), filter 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.08)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}
        >
          <Mail size={13} /> let&rsquo;s talk
        </a>
      </nav>

      {/* Tutorial modal — controlled from the Help icon */}
      <Tutorial __externalOpen={tutorialOpen} __setOpen={setTutorialOpen} />
    </>
  )
}
