import { FileText, Mail } from 'lucide-react'

const RESUME_URL = '#'
const EMAIL = 'santiagoavellad@gmail.com'

export default function TopBar() {
  return (
    <div
      style={{
        position: 'fixed', top: 16, right: 16, zIndex: 9500,
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'var(--surface)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)',
        padding: 5,
        boxShadow: 'var(--shadow-card)',
        animation: 'fade-in 0.5s var(--ease) both',
      }}
    >
      {/* Résumé */}
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Open résumé"
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          height: 34, padding: '0 0.7rem',
          borderRadius: 'calc(var(--radius-pill) - 2px)',
          background: 'transparent', color: 'var(--ink)',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          textDecoration: 'none', cursor: 'none',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--canvas)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        <FileText size={13} /> résumé
      </a>

      {/* Let's talk */}
      <a
        href={`mailto:${EMAIL}?subject=Let%27s%20talk`}
        title="Send me an email"
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          height: 34, padding: '0 0.85rem',
          borderRadius: 'calc(var(--radius-pill) - 2px)',
          background: 'var(--accent)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
          textDecoration: 'none', cursor: 'none',
          transition: 'transform 0.15s var(--ease), filter 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}
      >
        <Mail size={13} /> let&rsquo;s talk
      </a>
    </div>
  )
}
