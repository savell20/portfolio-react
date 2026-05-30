import { useState } from 'react'
import { Mail, Phone, Copy, Check } from 'lucide-react'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle } from '../components/CanvasCards'
import { PAGE, FIRST_MODULE_Y, pageInitialView } from '../lib/layout'

const EMAIL = 'santi.avella28@gmail.com'
const PHONE_DISPLAY = '+1 (954) 673-2973'
const PHONE_COPY = '+19546732973'

const METHODS = [
  {
    id: 'email', kind: 'email', Icon: Mail,
    label: 'Email', value: EMAIL, copy: EMAIL,
    tint: '#EAEEFF', tintInk: '#2F5CFF',
  },
  {
    id: 'phone', kind: 'phone', Icon: Phone,
    label: 'Phone', value: PHONE_DISPLAY, copy: PHONE_COPY,
    tint: '#FFE8D1', tintInk: '#C45A00',
  },
]

/* Big full-width copy bar. Click anywhere to copy. */
function ContactBar({ data }) {
  const { Icon } = data
  const [copied, setCopied] = useState(false)
  const [hover, setHover] = useState(false)

  const onCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(data.copy)
      setCopied(true)
      setTimeout(() => setCopied(false), 1700)
    } catch { /* */ }
  }

  return (
    <button
      onClick={onCopy}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={copied ? 'Copied!' : `Click to copy my ${data.label.toLowerCase()}`}
      style={{
        width: '100%', height: '100%', boxSizing: 'border-box', cursor: 'none',
        display: 'flex', alignItems: 'center', gap: 24,
        textAlign: 'left',
        background: 'var(--surface)',
        border: hover ? `1.6px solid ${data.tintInk}` : 'var(--border-card)',
        borderRadius: 'var(--radius)',
        boxShadow: hover ? `0 22px 44px ${data.tintInk}26` : 'var(--shadow-card)',
        padding: '2rem 2.2rem',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.2s var(--ease), box-shadow 0.2s, border 0.18s',
      }}
    >
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 64, height: 64, borderRadius: 16, flexShrink: 0,
        background: data.tint, color: data.tintInk,
      }}>
        <Icon size={30} strokeWidth={2.2} />
      </span>

      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
          color: 'var(--ink-faint)', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: 6,
        }}>
          {data.label}
        </span>
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(1.4rem, 3vw, 2.1rem)', color: 'var(--ink)',
          letterSpacing: '-0.02em', lineHeight: 1.1,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {data.value}
        </span>
      </span>

      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
        padding: '0.7rem 1.1rem', borderRadius: 'var(--radius-pill)',
        background: copied ? data.tintInk : data.tint,
        color: copied ? '#fff' : data.tintInk,
        fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 600,
        transition: 'background 0.18s, color 0.18s',
      }}>
        {copied ? <><Check size={15} /> copied</> : <><Copy size={15} /> copy</>}
      </span>
    </button>
  )
}

const ROW_H = 132
const ROW_GAP = 24

const OBJECTS = [
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: PAGE.W, h: PAGE.TITLE_H,
    data: {
      kicker: '# contact',
      title: 'Get in touch.',
      blurb: 'The easiest ways to reach me. Tap either bar to copy — I usually reply within 24 hours.',
    } },

  ...METHODS.map((m, i) => ({
    id: m.id, type: 'contact',
    x: PAGE.X, y: FIRST_MODULE_Y + i * (ROW_H + ROW_GAP),
    w: PAGE.W, h: ROW_H,
    data: m,
  })),
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':   return <PageTitle data={obj.data} />
    case 'contact': return <ContactBar data={obj.data} />
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
