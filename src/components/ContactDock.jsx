import { useState } from 'react'
import { Mail, Phone, FileText } from 'lucide-react'

// lucide dropped brand icons — inline LinkedIn glyph.
function Linkedin({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 6.4a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 13.4c0-2.46-1.32-3.6-3.08-3.6-1.42 0-2.06.78-2.42 1.33V9.67h-2.67V18h2.67v-4.4c0-1.16.22-2.28 1.65-2.28 1.41 0 1.43 1.32 1.43 2.35V18h2.67v-4.6z" />
    </svg>
  )
}

/* ───────────────────────────────────────────────────────────
   SANTIAGO — edit these two:
   PHONE      : your number (digits, for the tel: link)
   RESUME_URL : a link to your résumé PDF
   ─────────────────────────────────────────────────────────── */
const PHONE = '+1 000 000 0000'
const RESUME_URL = '#'

const LINKS = [
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/santiagoavella', ext: true },
  { Icon: Mail, label: 'Email', href: 'mailto:santi.avella28@gmail.com' },
  { Icon: Phone, label: 'Call', href: `tel:${PHONE.replace(/[^+\d]/g, '')}` },
  { Icon: FileText, label: 'Résumé', href: RESUME_URL, ext: true },
]

function DockItem({ Icon, label, href, ext }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={href}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        justifyContent: 'center', width: 38, height: 38,
        borderRadius: 'calc(var(--radius-pill) - 2px)',
        textDecoration: 'none', cursor: 'none',
        background: hover ? 'var(--accent)' : 'transparent',
        color: hover ? '#fff' : 'var(--ink-soft)',
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      <Icon size={17} />
      {hover && (
        <span style={{
          position: 'absolute', right: 'calc(100% + 8px)', whiteSpace: 'nowrap',
          background: 'var(--ink)', color: 'var(--surface)',
          fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
          padding: '0.3rem 0.5rem', borderRadius: 6,
        }}>
          {label}
        </span>
      )}
    </a>
  )
}

export default function ContactDock() {
  return (
    <div style={{
      position: 'fixed', left: 92, bottom: 16,
      zIndex: 9000, display: 'flex', flexDirection: 'row', gap: 2,
      background: 'var(--surface)', border: 'var(--border-card)',
      borderRadius: 'var(--radius-pill)', padding: 5,
      boxShadow: 'var(--shadow-card)',
      animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.2s',
    }}>
      {LINKS.map(l => <DockItem key={l.label} {...l} />)}
    </div>
  )
}
