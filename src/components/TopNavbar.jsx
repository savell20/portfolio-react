import { useNavigate, useLocation } from 'react-router-dom'
import { Mail, FileText } from 'lucide-react'

const RESUME_URL = 'https://drive.google.com/file/d/1mkUQy2AQd0vYHAqsHoGi-qibLa5ssIcC/view?usp=sharing'
const EMAIL = 'santi.avella28@gmail.com'
const LINKEDIN_URL = 'https://linkedin.com/in/santiagoavella'

// Action-button colors — picked so each CTA owns a distinct hue.
const RESUME_COLOR = '#FF8A1F'      // warm coral / orange
const LINKEDIN_BLUE = '#0A66C2'     // LinkedIn brand blue

const LINKS = [
  { to: '/',             label: 'Home' },
  { to: '/about',        label: 'About Me' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/photography',  label: 'Photography' },
]

function LinkedinGlyph({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 6.4a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 13.4c0-2.46-1.32-3.6-3.08-3.6-1.42 0-2.06.78-2.42 1.33V9.67h-2.67V18h2.67v-4.4c0-1.16.22-2.28 1.65-2.28 1.41 0 1.43 1.32 1.43 2.35V18h2.67v-4.6z" />
    </svg>
  )
}

function Divider() {
  return <span style={{ width: 1, height: 22, background: 'var(--line)', margin: '0 4px' }} />
}

export default function TopNavbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
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
      {LINKS.map(({ to, label }) => {
        const active = pathname === to
        return (
          <button
            key={to}
            onClick={() => navigate(to)}
            style={{
              height: 34, padding: '0 0.85rem',
              borderRadius: 'calc(var(--radius-pill) - 2px)',
              background: active ? 'var(--accent)' : 'transparent',
              color: active ? '#fff' : 'var(--ink-soft)',
              border: 'none', cursor: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500,
              whiteSpace: 'nowrap', flexShrink: 0,
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--canvas)'; e.currentTarget.style.color = 'var(--ink)' } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-soft)' } }}
          >
            {label}
          </button>
        )
      })}

      <Divider />

      {/* Résumé — eye-catching orange */}
      <a
        href={RESUME_URL} target="_blank" rel="noopener noreferrer"
        title="Open résumé (Google Drive PDF)"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          height: 34, padding: '0 0.85rem',
          borderRadius: 'calc(var(--radius-pill) - 2px)',
          background: RESUME_COLOR, color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600,
          textDecoration: 'none', cursor: 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
          boxShadow: '0 4px 12px rgba(255,138,31,0.45)',
          transition: 'transform 0.15s var(--ease), filter 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.filter = 'brightness(1.08)'
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,138,31,0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.filter = 'brightness(1)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,138,31,0.45)'
        }}
      >
        <FileText size={13} /> résumé
      </a>

      {/* Let's talk — blue accent CTA */}
      <a
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent("I'm interested in working with you!")}`}
        target="_blank" rel="noopener noreferrer"
        title="Send me an email"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          height: 34, padding: '0 0.85rem',
          borderRadius: 'calc(var(--radius-pill) - 2px)',
          background: 'var(--accent)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500,
          textDecoration: 'none', cursor: 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
          transition: 'transform 0.15s var(--ease), filter 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}
      >
        <Mail size={13} /> let&rsquo;s talk
      </a>

      {/* LinkedIn — filled brand-blue button with icon + text */}
      <a
        href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
        title="LinkedIn" aria-label="LinkedIn"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          height: 34, padding: '0 0.85rem',
          borderRadius: 'calc(var(--radius-pill) - 2px)',
          background: LINKEDIN_BLUE, color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500,
          textDecoration: 'none', cursor: 'none',
          whiteSpace: 'nowrap', flexShrink: 0,
          transition: 'transform 0.15s var(--ease), filter 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}
      >
        <LinkedinGlyph size={14} /> LinkedIn
      </a>
    </nav>
  )
}
