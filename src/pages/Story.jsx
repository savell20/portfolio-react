import { useNavigate } from 'react-router-dom'

const MILESTONES = [
  { year: '1998',     where: 'Bogotá, Colombia',  text: "Born and raised in a city that taught me how to design with constraints — limited resources, big ambitions, and zero tolerance for things that don't work." },
  { year: "2020 → '23", where: 'Captura tu mundo', text: 'Started my own visual-storytelling company at 18 and ran it for three years. Learned every part of building a business — finding the idea, shipping the product, talking to the first users, paying the bills.' },
  { year: "2023 → '25", where: 'SCAD · USA',      text: 'Service Design at the Savannah College of Art and Design. Fell deeper in love with product design, methodology, and the systems behind the screens.' },
  { year: '2025',     where: 'HubSpot',           text: 'UI/UX Designer for sales and service hubs used by millions. Learned what it takes to design at scale, with restraint.' },
  { year: "2026 →",   where: 'Zolvo (YC S26)',    text: 'Founding designer for the financial OS for Latin American SMEs. Five core modules shipped in eight weeks, design system from zero.' },
]

export default function Story() {
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
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--accent)', letterSpacing: '0.14em',
          textTransform: 'uppercase', marginBottom: '0.7rem',
        }}>
          # my story
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2rem, 6vw, 3.4rem)', lineHeight: 1.0,
          letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '0.9rem',
        }}>
          Bogotá → SCAD → here
        </h1>
        <p style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.55,
          color: 'var(--ink-soft)', maxWidth: 520, margin: '0 auto',
        }}>
          The long version — every chapter that landed me at this canvas.
        </p>
      </div>

      <div style={{
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)',
        padding: 'clamp(1.4rem, 3vw, 2.4rem)',
      }}>
        {MILESTONES.map((m, i) => (
          <div
            key={m.year}
            style={{
              display: 'grid', gridTemplateColumns: '78px 1fr',
              gap: 'clamp(0.8rem, 2vw, 1.4rem)',
              padding: '1.4rem 0',
              borderTop: i === 0 ? 'none' : '1px solid var(--line)',
              animation: 'rise-in 0.5s var(--ease) both',
              animationDelay: `${i * 0.06}s`,
            }}
          >
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 600,
                color: 'var(--accent)', letterSpacing: '0.04em',
              }}>
                {m.year}
              </p>
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.18rem', letterSpacing: '-0.01em',
                color: 'var(--ink)', marginBottom: '0.45rem',
              }}>
                {m.where}
              </h3>
              <p style={{ fontSize: '0.96rem', color: 'var(--ink-soft)', lineHeight: 1.65 }}>
                {m.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
