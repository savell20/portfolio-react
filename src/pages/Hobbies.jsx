import { useNavigate } from 'react-router-dom'
import { Guitar, F1Car, FlightMap } from '../components/HobbyToys'

function Hero({ title, kicker, blurb }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        color: 'var(--accent)', letterSpacing: '0.14em',
        textTransform: 'uppercase', marginBottom: '0.7rem',
      }}>
        {kicker}
      </p>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 'clamp(2rem, 6vw, 3.2rem)', lineHeight: 1.0,
        letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '0.9rem',
      }}>
        {title}
      </h1>
      <p style={{
        fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.55,
        color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto',
      }}>
        {blurb}
      </p>
    </div>
  )
}

function HobbyBlock({ children, label, body }) {
  return (
    <section style={{
      background: 'var(--surface)', border: 'var(--border-card)',
      borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)',
      padding: '1.4rem', marginBottom: '1.2rem',
      animation: 'rise-in 0.5s var(--ease) both',
    }}>
      <div style={{
        background: 'var(--canvas)', borderRadius: 'calc(var(--radius) - 4px)',
        padding: '0.8rem', marginBottom: '1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {children}
      </div>
      <p style={{
        fontFamily: 'var(--font-note)', fontSize: '1.4rem',
        color: 'var(--accent)', marginBottom: '0.5rem',
      }}>
        {label}
      </p>
      <p style={{ fontSize: '0.95rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
        {body}
      </p>
    </section>
  )
}

export default function Hobbies() {
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
      <Hero
        kicker="# hobbies & life"
        title="Off the clock"
        blurb="A few of the things I'm into when I'm not staring at a Figma file."
      />

      <HobbyBlock
        label="I love guitar"
        body="Tap the strings — that's actually live audio, not a recording. C-major arpeggio, smooth ballpoint feel."
      >
        <div style={{ width: 200 }}>
          <Guitar height={290} />
        </div>
      </HobbyBlock>

      <HobbyBlock
        label="I love Formula One"
        body="Watching every race, learning every track. The intersection of design, engineering, and grit at 300 km/h."
      >
        <div style={{ width: '100%', maxWidth: 360 }}>
          <F1Car height={180} />
        </div>
      </HobbyBlock>

      <HobbyBlock
        label="I love traveling"
        body="Bogotá → New York → Lisbon → Tokyo → Brisbane and back. The plane never stops, neither do I."
      >
        <div style={{ width: '100%', maxWidth: 380 }}>
          <FlightMap height={200} />
        </div>
      </HobbyBlock>
    </div>
    </div>
  )
}
