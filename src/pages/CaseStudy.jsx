import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const STUDIES = {
  zolvo: {
    name: 'Zolvo',
    frame: 'zolvo.case',
    role: 'Founding Designer',
    dates: 'Mar 2026 — Present',
    tags: ['Fintech', 'AI', 'YC P26'],
    cover: 'linear-gradient(135deg,#2F3BC9,#5B6CF5)',
    intro: 'Founding designer at a YC-backed fintech — five core product modules designed and shipped in eight weeks.',
    stats: [
      ['5', 'Core modules'],
      ['8wk', 'Shipped in'],
      ['1', 'Designer'],
      ['YC', "Spring '26"],
    ],
    overview: [
      'Zolvo is building the financial operating system for Latin American SMEs — starting with invoice financing and collections. I joined as the founding designer when the product was still a deck.',
      'The mandate: design the entire product surface from zero, ship fast enough to keep up with engineering, and set a design foundation that scales past YC Demo Day.',
    ],
    modules: [
      { n: '01', t: 'AI Invoice Verification', d: 'An AI-driven pipeline that extracts, validates, and flags discrepancies in invoices — cutting manual review time by 80%. The UI surfaces confidence scores so operators resolve edge cases without breaking flow.' },
      { n: '02', t: 'Real-time Reconciliation', d: 'A live ledger that reconciles transactions across multiple payment rails at once. Designed for density — finance teams need data, not whitespace.' },
      { n: '03', t: 'Loan Collections', d: 'The collections workflow end to end — from delinquency triage to automated outreach. Sensitive UX: firm, but never predatory.' },
      { n: '04', t: 'Operator Dashboard', d: 'The control center — real-time stats, exception queues, and team management in one view, built around what a manager cares about at 8am.' },
      { n: '05', t: 'Design System', d: 'A complete component library in Figma — tokens, primitives, patterns — so every new screen could be assembled in hours, not days.' },
    ],
    takeaway: 'Shipping at startup speed forces clarity. With 8 weeks and 5 modules, every decision had to be defensible in 30 seconds — so I learned to cut ruthlessly and trust engineering as a creative partner.',
  },
  hubspot: {
    name: 'HubSpot',
    frame: 'hubspot.case',
    role: 'UI/UX Designer',
    dates: 'Jan 2025 — Dec 2025',
    tags: ['CRM', 'Scale', 'Design systems'],
    cover: 'linear-gradient(135deg,#E8551E,#FF8A4C)',
    intro: 'UI/UX Designer on one of the world’s leading CRM platforms — product experiences used daily by teams at scale.',
    stats: [
      ['1Y', 'Tenure'],
      ['M+', 'Users reached'],
      ['CRM', 'Sales & service'],
    ],
    overview: [
      'At HubSpot scale, design is a discipline of restraint. Millions of users meant every change rippled outward, so I shipped deliberately — prototype, test against real workflows, defend each decision with evidence.',
      'I worked inside an established design system, extending patterns rather than reinventing them, in tight partnership with engineering and product.',
    ],
    highlights: [
      'Shipped product surfaces across the sales and service hubs.',
      'Extended an established design system — patterns, not one-offs.',
      'Partnered with engineering and PM on scoped, measurable releases.',
    ],
    takeaway: 'Designing at scale taught me that the best ideas still lose if they can’t survive contact with millions of real workflows. Evidence beats taste.',
  },
  captura: {
    name: 'Captura tu mundo',
    frame: 'captura.case',
    role: 'Founder & Designer',
    dates: 'Jun 2020 — May 2023',
    tags: ['Founder', 'Brand', '0→1'],
    cover: 'linear-gradient(135deg,#1F8A6E,#3FBE96)',
    intro: 'Founded and ran a visual-storytelling startup — wearing every hat from designer to founder to builder.',
    stats: [
      ['3yrs', 'Building'],
      ['1', 'Founder'],
      ['0→1', 'From scratch'],
    ],
    overview: [
      'Captura tu mundo taught me the whole arc — finding the idea, shaping the product, talking to the first users, and keeping it alive.',
      'It’s where I learned that design isn’t a department. It’s how you decide what to build, and why.',
    ],
    highlights: [
      'Designed and built the entire product and brand end to end.',
      'Owned strategy, customer conversations, and daily operations.',
      'Learned to make confident calls with incomplete information.',
    ],
    takeaway: 'Running my own company made me a designer who thinks like an owner — every pixel tied to a real outcome.',
  },
}

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

export default function CaseStudy() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const data = STUDIES[slug]
  if (!data) return <Navigate to="/" replace />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas)', padding: '0 1.2rem 4rem' }}>

      {/* (Back button is rendered globally in App's Chrome on non-home routes) */}

      {/* Artboard */}
      <div style={{
        maxWidth: 860, margin: '4.5rem auto 0',
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(24,24,26,0.1)',
        animation: 'rise-in 0.55s var(--ease) both',
      }}>
        {/* Frame label bar */}
        <div style={{
          padding: '0.7rem 1.5rem', borderBottom: '1px solid var(--line)',
          fontFamily: 'var(--font-mono)', fontSize: '0.64rem',
          color: 'var(--ink-faint)', letterSpacing: '0.04em',
        }}>
          ▸ {data.frame}
        </div>

        {/* Cover */}
        <div style={{
          height: 200, background: data.cover,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: '8rem', color: 'rgba(255,255,255,0.15)', lineHeight: 1,
          }}>
            {data.name[0]}
          </span>
        </div>

        <div style={{ padding: '2.5rem clamp(1.5rem, 5vw, 3.5rem) 3rem' }}>

          {/* Header */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[data.role, data.dates, ...data.tags].map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                color: 'var(--ink-soft)', background: 'var(--canvas)',
                border: '1px solid var(--line)', borderRadius: 6,
                padding: '0.25rem 0.55rem',
              }}>
                {s}
              </span>
            ))}
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1.0,
            letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '1.1rem',
          }}>
            {data.name}
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)', lineHeight: 1.55,
            color: 'var(--ink-soft)', marginBottom: '2.5rem', maxWidth: 560,
          }}>
            {data.intro}
          </p>

          {/* Stats */}
          <Reveal delay={0.05}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${data.stats.length}, 1fr)`,
              gap: '1px', background: 'var(--line)',
              border: '1px solid var(--line)', borderRadius: 10,
              overflow: 'hidden', marginBottom: '3rem',
            }}>
              {data.stats.map(([v, l]) => (
                <div key={l} style={{ background: 'var(--surface)', padding: '1.25rem 0.75rem', textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', letterSpacing: '-0.02em',
                    color: 'var(--ink)', marginBottom: '0.2rem',
                  }}>
                    {v}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                    color: 'var(--ink-faint)', textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                  }}>
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Overview */}
          <Reveal delay={0.1}>
            <p style={labelCss}>Overview</p>
            {data.overview.map((p, i) => (
              <p key={i} style={{
                fontSize: '1rem', color: 'var(--ink-soft)', lineHeight: 1.8,
                marginBottom: '1rem',
              }}>
                {p}
              </p>
            ))}
          </Reveal>

          {/* Modules or highlights */}
          <div style={{ marginTop: '2.5rem' }}>
            <Reveal delay={0.15}>
              <p style={labelCss}>{data.modules ? 'What I built' : 'Highlights'}</p>
            </Reveal>

            {data.modules && data.modules.map((m) => (
              <Reveal key={m.n} delay={0.18}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr', gap: '1.25rem',
                  padding: '1.6rem 0', borderTop: '1px solid var(--line)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
                    color: 'var(--accent)', paddingTop: '0.2rem',
                  }}>
                    {m.n}
                  </span>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '1.2rem', letterSpacing: '-0.01em',
                      color: 'var(--ink)', marginBottom: '0.4rem',
                    }}>
                      {m.t}
                    </h3>
                    <p style={{ fontSize: '0.94rem', color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                      {m.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            {data.highlights && data.highlights.map((h, i) => (
              <Reveal key={i} delay={0.18}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr', gap: '1.25rem',
                  padding: '1.4rem 0', borderTop: '1px solid var(--line)',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    color: 'var(--accent)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: '0.98rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                    {h}
                  </p>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid var(--line)' }} />
          </div>

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
                Takeaway
              </p>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: '1.15rem', lineHeight: 1.5, color: 'var(--ink)',
                letterSpacing: '-0.01em',
              }}>
                {data.takeaway}
              </p>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.22}>
            <div style={{
              marginTop: '2.5rem', paddingTop: '2rem',
              borderTop: '1px solid var(--line)',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
            }}>
              <a
                href="mailto:santi.avella28@gmail.com"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.74rem',
                  color: '#fff', background: 'var(--accent)', textDecoration: 'none',
                  padding: '0.7rem 1.15rem', borderRadius: 8,
                }}
              >
                get in touch <ArrowUpRight size={13} />
              </a>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: 'none', border: 'none', cursor: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  color: 'var(--ink-soft)',
                }}
              >
                ← back to the canvas
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
