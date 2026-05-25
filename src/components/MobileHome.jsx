import { useNavigate } from 'react-router-dom'
import { ArrowRight, Camera, Headphones, MapPin, Quote, BookOpen } from 'lucide-react'
import fotoPersonal from '../assets/foto-personal.jpeg'

const projects = {
  zolvo: {
    company: 'Zolvo (YC P26)', year: "'26", role: 'Founding Designer',
    blurb: 'Designed five core fintech modules in eight weeks.',
    cover: 'linear-gradient(135deg,#2F3BC9,#5B6CF5)',
    badge: { type: 'yc', label: 'YC P26' },
  },
  hubspot: {
    company: 'HubSpot', year: "'25", role: 'UI/UX Designer',
    blurb: 'Product experiences for sales & service teams.',
    cover: 'linear-gradient(135deg,#E8551E,#FF8A4C)',
    badge: { type: 'hubspot', label: 'HubSpot' },
  },
  captura: {
    company: 'Captura tu mundo', year: "'20", role: 'Founder & Designer',
    blurb: 'Visual-storytelling startup, built end to end.',
    cover: 'linear-gradient(135deg,#1F8A6E,#3FBE96)',
  },
}

const SECTIONS = [
  { to: '/about',        Icon: BookOpen,    title: 'About me',      blurb: 'Bogotá → SCAD → here',         tint: 'var(--accent-soft)' },
  { to: '/hobbies',      Icon: Headphones,  title: 'Hobbies & life',blurb: 'Guitar, Formula One, travel',  tint: '#FFE9A8' },
  { to: '/photography',  Icon: Camera,      title: 'Photography',   blurb: 'Off the clock, on film',       tint: '#FFD3DA' },
  { to: '/testimonials', Icon: Quote,       title: 'Testimonials',  blurb: 'Words from teammates',         tint: '#C9DDFF' },
  { to: '/story',        Icon: MapPin,      title: 'My story',      blurb: "The long version",             tint: '#C5EBD6' },
]

function SectionCard({ to, Icon, title, blurb, tint, navigate }) {
  return (
    <button
      onClick={() => navigate(to)}
      style={{
        width: '100%', textAlign: 'left',
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '0.95rem 1rem',
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)',
        cursor: 'none',
      }}
    >
      <span style={{
        width: 44, height: 44, borderRadius: 10,
        background: tint, color: 'var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} strokeWidth={2.2} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '1.02rem', color: 'var(--ink)', letterSpacing: '-0.01em',
          marginBottom: 2,
        }}>
          {title}
        </p>
        <p style={{
          fontSize: '0.78rem', color: 'var(--ink-soft)', lineHeight: 1.35,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {blurb}
        </p>
      </div>
      <ArrowRight size={16} style={{ color: 'var(--ink-faint)', flexShrink: 0 }} />
    </button>
  )
}

function MiniLogo({ type }) {
  if (type === 'yc') return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="3" fill="#F26522" />
      <text x="12" y="18" textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif" fontSize="17" fontWeight="700" fill="#fff">Y</text>
    </svg>
  )
  if (type === 'hubspot') return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="3" fill="#FF7A59" />
      <circle cx="11.5" cy="15" r="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <line x1="11.5" y1="15" x2="11.5" y2="9.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="11.5" y1="9.5" x2="17" y2="6.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="6.5" r="1.6" fill="#fff" />
    </svg>
  )
  return null
}

function ProjectMobileCard({ slug, data, navigate }) {
  return (
    <button
      onClick={() => navigate(`/work/${slug}`)}
      style={{
        width: '100%', textAlign: 'left', padding: 0,
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)',
        cursor: 'none', overflow: 'hidden',
      }}
    >
      <div style={{
        height: 92, background: data.cover,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem', position: 'relative',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: '3.4rem', color: 'rgba(255,255,255,0.18)', lineHeight: 1,
        }}>
          {data.company[0]}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em',
        }}>
          {data.year}
        </span>
        {data.badge && (
          <span style={{
            position: 'absolute', top: 8, right: 10,
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '0.22rem 0.5rem 0.22rem 0.32rem',
            background: 'rgba(0,0,0,0.45)', borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <MiniLogo type={data.badge.type} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
              color: '#fff', letterSpacing: '0.08em',
            }}>
              {data.badge.label}
            </span>
          </span>
        )}
      </div>
      <div style={{ padding: '0.95rem 1.05rem 1.05rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '1.15rem', color: 'var(--ink)', letterSpacing: '-0.02em',
        }}>
          {data.company}
        </h3>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--accent)', letterSpacing: '0.04em', margin: '0.2rem 0 0.45rem',
        }}>
          {data.role}
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          {data.blurb}
        </p>
      </div>
    </button>
  )
}

export default function MobileHome() {
  const navigate = useNavigate()
  return (
    <div style={{
      minHeight: '100vh', background: 'var(--canvas)',
      padding: '1.2rem 1.1rem 4rem',
      display: 'flex', flexDirection: 'column', gap: '1.5rem',
      maxWidth: 560, margin: '0 auto',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.2rem 0.2rem 0',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--ink-faint)', letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          Portfolio · 2026
        </span>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--ink-soft)',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#28C76F',
            boxShadow: '0 0 0 3px rgba(40,199,111,0.18)',
          }} />
          Available
        </span>
      </header>

      {/* Hero */}
      <section style={{
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)',
        padding: '1.4rem 1.3rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <img
            src={fotoPersonal}
            alt="Santiago Avella"
            style={{
              width: 80, height: 80, borderRadius: 12,
              objectFit: 'cover', objectPosition: 'top',
              border: '1px solid var(--line)',
              boxShadow: '0 6px 16px rgba(24,24,26,0.15)',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: 'var(--accent)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 4,
            }}>
              hello — I'm
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '1.65rem', lineHeight: 1.05,
              letterSpacing: '-0.02em', color: 'var(--ink)',
            }}>
              Santiago Avella
            </h1>
          </div>
        </div>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '1.02rem', lineHeight: 1.45, color: 'var(--ink)',
        }}>
          Product designer crafting <span style={{ color: 'var(--accent)' }}>AI-native interfaces</span> —
          turning complex systems into things that feel obvious.
        </p>
        <button
          onClick={() => navigate('/about')}
          style={{
            marginTop: '1rem',
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '0.55rem 0.95rem', cursor: 'none',
            background: 'var(--accent)', color: '#fff', border: 'none',
            borderRadius: 'var(--radius-pill)',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 500,
          }}
        >
          about me <ArrowRight size={12} />
        </button>
      </section>

      {/* Case studies */}
      <section>
        <h2 style={sectionTitle}>Selected work</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.entries(projects).map(([slug, data]) => (
            <ProjectMobileCard key={slug} slug={slug} data={data} navigate={navigate} />
          ))}
        </div>
      </section>

      {/* Section nav */}
      <section>
        <h2 style={sectionTitle}>More about me</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SECTIONS.map(s => (
            <SectionCard key={s.to} {...s} navigate={navigate} />
          ))}
        </div>
      </section>

      <footer style={{
        textAlign: 'center', marginTop: '1rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: 'var(--ink-faint)', letterSpacing: '0.1em',
      }}>
        santiagoavellad@gmail.com
      </footer>
    </div>
  )
}

const sectionTitle = {
  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
  color: 'var(--accent)', letterSpacing: '0.14em',
  textTransform: 'uppercase', marginBottom: '0.6rem',
  paddingLeft: 2,
}
