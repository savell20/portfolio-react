import { useState } from 'react'
import { Mail, Phone, FileText, Copy, Check, ArrowUpRight } from 'lucide-react'

// LinkedIn brand icon, lucide dropped this in v1, so we inline it.
function Linkedin({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 6.4a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 13.4c0-2.46-1.32-3.6-3.08-3.6-1.42 0-2.06.78-2.42 1.33V9.67h-2.67V18h2.67v-4.4c0-1.16.22-2.28 1.65-2.28 1.41 0 1.43 1.32 1.43 2.35V18h2.67v-4.6z" />
    </svg>
  )
}
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle } from '../components/CanvasCards'
import { PAGE, FIRST_MODULE_Y, pageInitialView } from '../lib/layout'

const EMAIL = 'santi.avella28@gmail.com'
const PHONE_DISPLAY = '+1 (954) 673-2973'
const PHONE_COPY = '+19546732973'
const LINKEDIN_URL = 'https://linkedin.com/in/santiagoavella'
const RESUME_URL = 'https://drive.google.com/file/d/1mkUQy2AQd0vYHAqsHoGi-qibLa5ssIcC/view?usp=sharing'

const METHODS = [
  {
    id: 'email',
    Icon: Mail,
    label: 'Email',
    value: EMAIL,
    action: 'copy', copyText: EMAIL,
    tint: '#EAEEFF', tintInk: '#2F5CFF',
  },
  {
    id: 'phone',
    Icon: Phone,
    label: 'Phone',
    value: PHONE_DISPLAY,
    action: 'copy', copyText: PHONE_COPY,
    tint: '#EAEEFF', tintInk: '#2F5CFF',
  },
  {
    id: 'linkedin',
    Icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/santiagoavella',
    action: 'link', href: LINKEDIN_URL,
    tint: '#D9EAFA', tintInk: '#0A66C2',
  },
  {
    id: 'resume',
    Icon: FileText,
    label: 'Résumé',
    value: 'Google Drive · PDF',
    action: 'link', href: RESUME_URL,
    tint: '#FFE8D1', tintInk: '#FF8A1F',
  },
]

function ActionPill({ copied, action, tint, tintInk, hover }) {
  if (action === 'copy') {
    const filled = copied || hover
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '0.55rem 0.9rem', flexShrink: 0,
        background: filled ? tintInk : tint,
        color: filled ? '#fff' : tintInk,
        border: `1.4px solid ${tintInk}`,
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 600,
        transition: 'background 0.18s, color 0.18s',
        pointerEvents: 'none',
      }}>
        {copied ? <><Check size={13} /> copied</> : <><Copy size={13} /> copy</>}
      </span>
    )
  }
  const filled = hover
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '0.55rem 0.9rem', flexShrink: 0,
      background: filled ? tintInk : tint,
      color: filled ? '#fff' : tintInk,
      border: `1.4px solid ${tintInk}`,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 600,
      transition: 'background 0.18s, color 0.18s',
      pointerEvents: 'none',
    }}>
      open <ArrowUpRight size={13} strokeWidth={2.4} />
    </span>
  )
}

function ContactRow({ data }) {
  const { Icon } = data
  const [hover, setHover] = useState(false)
  const [copied, setCopied] = useState(false)

  const onActivate = async (e) => {
    e.stopPropagation()
    if (data.action === 'copy') {
      try {
        await navigator.clipboard.writeText(data.copyText)
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      } catch { /* */ }
    } else if (data.action === 'link') {
      window.open(data.href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      onClick={onActivate}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(e) } }}
      title={data.action === 'copy' ? `Click to copy ${data.label.toLowerCase()}` : `Open ${data.label}`}
      style={{
        background: 'var(--surface)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius)',
        boxShadow: hover
          ? '0 18px 36px rgba(24,24,26,0.12)'
          : 'var(--shadow-card)',
        padding: '1rem 1.15rem',
        display: 'flex', alignItems: 'center', gap: 16,
        color: 'var(--ink)',
        width: '100%', height: '100%',
        cursor: 'none',
        transform: hover ? 'translate(-2px, -3px)' : 'translate(0, 0)',
        transition: 'transform 0.22s var(--ease), box-shadow 0.22s',
      }}
    >
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        background: data.tint, color: data.tintInk,
      }}>
        <Icon size={20} strokeWidth={2.2} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          color: 'var(--ink-faint)', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 3,
        }}>
          {data.label}
        </p>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '1.02rem', color: 'var(--ink)', lineHeight: 1.2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {data.value}
        </p>
      </div>
      <ActionPill
        copied={copied} action={data.action}
        tint={data.tint} tintInk={data.tintInk} hover={hover}
      />
    </div>
  )
}

const ROW_H = 88
const ROW_GAP = PAGE.ROW_GAP

const OBJECTS = [
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: PAGE.W, h: PAGE.TITLE_H,
    data: {
      kicker: '# contact',
      title: 'Get in touch.',
      blurb: 'Easiest way to reach me, pick any of the rows below. I usually reply within 24 hours.',
    } },

  ...METHODS.map((m, i) => ({
    id: m.id, type: 'method',
    x: PAGE.X, y: FIRST_MODULE_Y + i * (ROW_H + ROW_GAP),
    w: PAGE.W, h: ROW_H,
    data: m,
  })),
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':  return <PageTitle data={obj.data} />
    case 'method': return <ContactRow data={obj.data} />
    default: return null
  }
}

export default function Contact() {
  const [view] = useState(pageInitialView)
  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={[]}
      initialView={view}
      renderObject={renderObject}
    />
  )
}
