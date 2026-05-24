import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, GraduationCap, Briefcase, Sparkles } from 'lucide-react'
import fotoPersonal from '../assets/foto-personal.jpeg'

function Reveal({ children, delay = 0 }) {
  return (
    <div style={{ animation: 'rise-in 0.6s var(--ease) both', animationDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

const labelCss = {
  fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
  color: 'var(--accent)', letterSpacing: '0.12em',
  textTransform: 'uppercase', marginBottom: '1rem',
}

const FACTS = [
  { Icon: MapPin, k: 'Based', v: 'United States · Bogotá-born' },
  { Icon: GraduationCap, k: 'Schooling', v: 'SCAD — Service Design' },
  { Icon: Briefcase, k: 'Currently', v: 'Founding Designer at Zolvo (YC S26)' },
  { Icon: Sparkles, k: 'Available for', v: 'Design partnerships, advising' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas)', padding: '0 1.2rem 6rem' }}>

      {/* Hero */}
      <div style={{
        maxWidth: 880, margin: '4.5rem auto 0',
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(24,24,26,0.1)',
        animation: 'rise-in 0.55s var(--ease) both',
      }}>
        <div style={{
          padding: '0.7rem 1.5rem', borderBottom: '1px solid var(--line)',
          fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
          color: 'var(--ink-faint)', letterSpacing: '0.04em',
        }}>
          # about-me.case
        </div>

        <div style={{ padding: '2.5rem clamp(1.5rem, 5vw, 3.5rem) 3rem' }}>

          {/* Header row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(1.2rem, 3vw, 2.2rem)',
            marginBottom: '2.5rem', flexWrap: 'wrap',
          }}>
            <img
              src={fotoPersonal}
              alt="Santiago Avella"
              style={{
                width: 140, height: 140,
                borderRadius: 14, objectFit: 'cover', objectPosition: 'top',
                border: '1px solid var(--line)',
                boxShadow: '0 10px 28px rgba(24,24,26,0.12)',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: '1 1 280px' }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                color: 'var(--accent)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: '0.55rem',
              }}>
                hello — I'm
              </p>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', lineHeight: 1.0,
                letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '0.75rem',
              }}>
                Santiago Avella
              </h1>
              <p style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', lineHeight: 1.5,
                color: 'var(--ink-soft)', maxWidth: 520,
              }}>
                Product designer crafting <span style={{ color: 'var(--accent)' }}>AI-native interfaces</span> —
                turning complex systems into things that feel obvious.
              </p>
            </div>
          </div>

          {/* Story */}
          <Reveal delay={0.05}>
            <p style={labelCss}>The long version</p>
            <p style={{ fontSize: '1.02rem', color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: '1rem' }}>
              I grew up in Bogotá, Colombia — a city that taught me how to design with constraints.
              Limited resources, big ambitions, and a culture that punishes anything that doesn't
              actually work for the person using it.
            </p>
            <p style={{ fontSize: '1.02rem', color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: '1rem' }}>
              At 18 I started <strong style={{ color: 'var(--ink)' }}>Captura tu mundo</strong>, a
              visual-storytelling company, and ran it for three years. I learned every part of
              building a business the hard way — finding the idea, shipping the product, talking to
              the first users, paying the bills, deciding what not to do.
            </p>
            <p style={{ fontSize: '1.02rem', color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: '1rem' }}>
              Moved to the US for <strong style={{ color: 'var(--ink)' }}>SCAD</strong>, fell deeper
              in love with product design, and took the lessons from Captura into{' '}
              <strong style={{ color: 'var(--ink)' }}>HubSpot</strong> — designing for sales and
              service hubs used by millions. Now I'm founding designer at{' '}
              <strong style={{ color: 'var(--ink)' }}>Zolvo</strong> (YC S26), building the
              financial OS for Latin American SMEs.
            </p>
            <p style={{ fontSize: '1.02rem', color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              The thread through all of it: I care about what gets shipped, not what gets shown.
              The best interfaces disappear — leaving only the outcome.
            </p>
          </Reveal>

          {/* Facts grid */}
          <Reveal delay={0.1}>
            <p style={labelCss}>Quick facts</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.8rem', marginBottom: '2.5rem',
            }}>
              {FACTS.map(({ Icon, k, v }) => (
                <div key={k} style={{
                  background: 'var(--canvas)', border: '1px solid var(--line)',
                  borderRadius: 10, padding: '0.95rem 1.05rem',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                }}>
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--accent-soft)', color: 'var(--accent)',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} />
                  </span>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                      color: 'var(--ink-faint)', textTransform: 'uppercase',
                      letterSpacing: '0.08em', marginBottom: '0.2rem',
                    }}>
                      {k}
                    </p>
                    <p style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--ink)' }}>
                      {v}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* What I care about */}
          <Reveal delay={0.15}>
            <p style={labelCss}>What I care about</p>
            {[
              ['Shipping over showing', "Real impact comes from the version that ships, not the version that wins the dribble. I optimize for outcomes, not portfolios."],
              ['Systems over screens', 'Great UI is rarely about a screen — it\'s about the system underneath. I design the data model, the states, and the failure cases first.'],
              ['Defensible decisions', "Every design call should survive a 30-second 'why' from engineering or PM. If it can't, it isn't ready."],
            ].map(([t, b], i) => (
              <div key={t} style={{
                display: 'grid', gridTemplateColumns: '52px 1fr', gap: '1.25rem',
                padding: '1.4rem 0',
                borderTop: i === 0 ? '1px solid var(--line)' : '1px solid var(--line)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  color: 'var(--accent)', paddingTop: '0.15rem',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: '1.18rem', letterSpacing: '-0.01em',
                    color: 'var(--ink)', marginBottom: '0.4rem',
                  }}>
                    {t}
                  </h3>
                  <p style={{ fontSize: '0.96rem', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                    {b}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--line)' }} />
          </Reveal>

          {/* Takeaway */}
          <Reveal delay={0.2}>
            <div style={{
              marginTop: '2.5rem', padding: '1.75rem',
              background: 'var(--accent-soft)', borderRadius: 12,
            }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--accent)', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: '0.7rem',
              }}>
                In one line
              </p>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: '1.25rem', lineHeight: 1.5, color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}>
                A designer who thinks like an owner — every pixel tied to a real outcome.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Back — bottom-center pill */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', bottom: 22, left: '50%', transform: 'translateX(-50%)', zIndex: 9000,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)', padding: '0.6rem 1rem', cursor: 'none',
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
          color: 'var(--ink-soft)', boxShadow: 'var(--shadow-card)',
          transition: 'color 0.2s, transform 0.2s var(--ease)',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateX(-50%) translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.transform = 'translateX(-50%) translateY(0)' }}
      >
        <ArrowLeft size={13} /> back to canvas
      </button>
    </div>
  )
}
