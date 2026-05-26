import { useNavigate } from 'react-router-dom'
import { Quote } from 'lucide-react'

const QUOTES = [
  {
    text: "Santi turns ambiguity into shipped product faster than anyone I've worked with.",
    name: 'Maria',
    role: 'PM at Zolvo',
    color: 'var(--sticky-blue)',
  },
  {
    text: 'Rare designer — thinks like an engineer, ships like a founder.',
    name: 'David',
    role: 'Engineering Lead',
    color: 'var(--sticky-pink)',
  },
  {
    text: 'Calm under pressure, surgical with feedback. The teammate I always want.',
    name: 'Ana',
    role: 'Director of Design',
    color: 'var(--sticky-mint)',
  },
]

function QuoteCard({ text, name, role, color, delay }) {
  return (
    <div style={{
      background: color, color: '#2a2a26',
      padding: '1.4rem 1.5rem 1.5rem', borderRadius: 4,
      boxShadow: '0 12px 28px rgba(24,24,26,0.18)',
      marginBottom: '1.4rem',
      animation: 'rise-in 0.55s var(--ease) both',
      animationDelay: `${delay}s`,
      transform: `rotate(${delay * 6 - 3}deg)`,
    }}>
      <Quote size={24} style={{ color: '#2a2a26', opacity: 0.4, marginBottom: 8 }} />
      <p style={{
        fontFamily: 'var(--font-note)', fontSize: '1.4rem',
        lineHeight: 1.35, marginBottom: '1.1rem',
      }}>
        {text}
      </p>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
        letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7,
      }}>
        — {name} · {role}
      </p>
    </div>
  )
}

export default function Testimonials() {
  const navigate = useNavigate()
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) navigate('/') }}
      title="Click the margin to return to the canvas"
      style={{
        minHeight: '100vh', background: 'var(--canvas)',
        padding: '4.5rem 1.1rem 4rem',
      }}
    >
    <div style={{ maxWidth: 620, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--accent)', letterSpacing: '0.14em',
          textTransform: 'uppercase', marginBottom: '0.7rem',
        }}>
          # testimonials
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2rem, 6vw, 3.2rem)', lineHeight: 1.0,
          letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '0.9rem',
        }}>
          What people say
        </h1>
        <p style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.55,
          color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto',
        }}>
          Past teammates, PMs, engineers, design leads.
        </p>
      </div>

      {QUOTES.map((q, i) => (
        <QuoteCard key={q.name} {...q} delay={i * 0.1} />
      ))}
    </div>
    </div>
  )
}
