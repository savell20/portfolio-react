import { useNavigate, useLocation } from 'react-router-dom'
import { FileText } from 'lucide-react'

const RESUME_URL = 'https://drive.google.com/file/d/1mkUQy2AQd0vYHAqsHoGi-qibLa5ssIcC/view?usp=sharing'
const LINKEDIN_URL = 'https://linkedin.com/in/santiagoavella'

// Action-button colors, each CTA owns a distinct hue.
const RESUME_COLOR = '#FF8A1F'      // warm coral / orange
const LINKEDIN_BLUE = '#0A66C2'     // LinkedIn brand blue

const LINKS = [
  { to: '/',            label: 'Home' },
  { to: '/projects',    label: 'Projects' },
  { to: '/about',       label: 'About Me' },
  { to: '/photography', label: 'Photography' },
  { to: '/contact',     label: 'Contact' },
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

      {/* Résumé, outline style in coral/orange */}
      <a
        href={RESUME_URL} target="_blank" rel="noopener noreferrer"
        title="Open résumé (Google Drive PDF)"
        style={outlineBtn(RESUME_COLOR, 600)}
        onMouseEnter={fillOnHover(RESUME_COLOR)}
        onMouseLeave={restoreOutline(RESUME_COLOR)}
      >
        <FileText size={13} /> résumé
      </a>

      {/* LinkedIn, outline style in LinkedIn brand blue */}
      <a
        href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
        title="LinkedIn" aria-label="LinkedIn"
        style={outlineBtn(LINKEDIN_BLUE)}
        onMouseEnter={fillOnHover(LINKEDIN_BLUE)}
        onMouseLeave={restoreOutline(LINKEDIN_BLUE)}
      >
        <LinkedinGlyph size={14} /> LinkedIn
      </a>
    </nav>
  )
}

/* Outlined pill: transparent fill, colored border + text. Hover fills it. */
function outlineBtn(color, weight = 500) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    height: 34, padding: '0 0.85rem', boxSizing: 'border-box',
    borderRadius: 'calc(var(--radius-pill) - 2px)',
    background: 'transparent', color,
    border: `1.6px solid ${color}`,
    fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: weight,
    textDecoration: 'none', cursor: 'none',
    whiteSpace: 'nowrap', flexShrink: 0,
    transition: 'background 0.18s, color 0.18s, transform 0.15s var(--ease)',
  }
}
function fillOnHover(color) {
  return (e) => {
    e.currentTarget.style.background = color
    e.currentTarget.style.color = '#fff'
    e.currentTarget.style.transform = 'translateY(-1px)'
  }
}
function restoreOutline(color) {
  return (e) => {
    e.currentTarget.style.background = 'transparent'
    e.currentTarget.style.color = color
    e.currentTarget.style.transform = 'translateY(0)'
  }
}
