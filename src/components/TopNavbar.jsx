import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Mail, FileText, Phone, ChevronDown } from 'lucide-react'

const RESUME_URL = 'https://drive.google.com/file/d/1mkUQy2AQd0vYHAqsHoGi-qibLa5ssIcC/view?usp=sharing'
const EMAIL = 'santi.avella28@gmail.com'
const PHONE_DISPLAY = '+1 (XXX) XXX-XXXX'
const PHONE_TEL = '+1XXXXXXXXXX'
const LINKEDIN_URL = 'https://linkedin.com/in/santiagoavella'

// Eye-catching color for the contact button — distinct from page-active accent.
const CONTACT_COLOR = '#FF8A1F'           // warm coral/orange
const CONTACT_COLOR_DARK = '#E66A00'

const LINKS = [
  { to: '/about',           label: 'About Me' },
  { to: '/work/zolvo',      label: 'Case Study 1' },
  { to: '/work/hubspot',    label: 'Case Study 2' },
  { to: '/work/captura',    label: 'Case Study 3' },
  { to: '/testimonials',    label: 'Testimonials' },
  { to: '/photography',     label: 'Photography' },
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

function ContactPopover({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9550,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', top: 62, left: '50%', transform: 'translateX(-50%)',
          width: 280, padding: '0.9rem',
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius)', boxShadow: '0 24px 56px rgba(0,0,0,0.3)',
          animation: 'pop-in 0.22s var(--ease) both',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          color: CONTACT_COLOR_DARK, letterSpacing: '0.14em',
          textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4,
        }}>
          ☎ get in touch
        </p>

        <a href={`tel:${PHONE_TEL}`} style={contactRow}>
          <span style={{ ...iconWrap, background: '#FFE2C7', color: CONTACT_COLOR_DARK }}>
            <Phone size={14} strokeWidth={2.2} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={rowLabel}>Phone</p>
            <p style={rowValue}>{PHONE_DISPLAY}</p>
          </div>
        </a>

        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent("I'm interested in working with you!")}`}
           target="_blank" rel="noopener noreferrer" style={contactRow}>
          <span style={{ ...iconWrap, background: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <Mail size={14} strokeWidth={2.2} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={rowLabel}>Email</p>
            <p style={rowValue}>{EMAIL}</p>
          </div>
        </a>

        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={contactRow}>
          <span style={{ ...iconWrap, background: 'var(--canvas)', color: 'var(--ink)' }}>
            <FileText size={14} strokeWidth={2.2} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={rowLabel}>Résumé</p>
            <p style={rowValue}>Google Drive · PDF</p>
          </div>
        </a>
      </div>
    </div>
  )
}

const contactRow = {
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '0.55rem 0.5rem', borderRadius: 8,
  textDecoration: 'none', cursor: 'none',
  color: 'var(--ink)',
}
const iconWrap = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 34, height: 34, borderRadius: 9, flexShrink: 0,
}
const rowLabel = {
  fontFamily: 'var(--font-mono)', fontSize: '0.54rem',
  color: 'var(--ink-faint)', letterSpacing: '0.1em',
  textTransform: 'uppercase', marginBottom: 2,
}
const rowValue = {
  fontFamily: 'var(--font-display)', fontWeight: 600,
  fontSize: '0.82rem', color: 'var(--ink)', lineHeight: 1.15,
  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
}

export default function TopNavbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [contactOpen, setContactOpen] = useState(false)

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

        {/* LinkedIn icon */}
        <a
          href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
          title="LinkedIn" aria-label="LinkedIn"
          style={{
            width: 34, height: 34, borderRadius: 'calc(var(--radius-pill) - 2px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ink-soft)', cursor: 'none', textDecoration: 'none',
            flexShrink: 0, transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#0A66C2'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-soft)' }}
        >
          <LinkedinGlyph size={15} />
        </a>

        {/* CONTACT INFO — eye-catching orange button with popover */}
        <button
          onClick={() => setContactOpen(o => !o)}
          title="Contact info"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            height: 34, padding: '0 0.85rem',
            borderRadius: 'calc(var(--radius-pill) - 2px)',
            background: CONTACT_COLOR, color: '#fff', border: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600,
            cursor: 'none', whiteSpace: 'nowrap', flexShrink: 0,
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
          <Phone size={13} /> contact info <ChevronDown size={11} style={{ marginLeft: 2 }} />
        </button>

        {/* Let's talk — keep the blue accent action */}
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
      </nav>

      {contactOpen && <ContactPopover onClose={() => setContactOpen(false)} />}
    </>
  )
}
