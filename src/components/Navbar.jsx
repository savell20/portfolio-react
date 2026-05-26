import { useNavigate, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/about',        label: 'About' },
  { to: '/hobbies',      label: 'Hobbies' },
  { to: '/photography',  label: 'Photography' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/story',        label: 'Story' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav
      style={{
        position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9500,
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)', padding: 5,
        boxShadow: 'var(--shadow-card)',
        animation: 'fade-in 0.5s var(--ease) both',
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
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
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
    </nav>
  )
}
