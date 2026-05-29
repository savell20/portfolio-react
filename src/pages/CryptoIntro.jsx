import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Polaroid from '../components/Polaroid'
import fotoPersonal from '../assets/foto-personal.jpeg'

// Live Figma presentation prototype.
const FIGMA_URL = 'https://www.figma.com/proto/10otwEjLWMjZijbiy3VIfj/Portfolio---Santiago-Avella?node-id=1-50769&viewport=292%2C233%2C0.02&t=4LjBWMfSDK1Pthkc-1&scaling=contain&content-scaling=fixed&starting-point-node-id=1%3A50753&page-id=0%3A1'

/* Hidden standalone intro page (no navbar / chrome). Reached only by
   typing the URL directly — used as a clean landing for a live
   presentation. */
export default function CryptoIntro() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--canvas)',
      backgroundImage: 'radial-gradient(circle, rgba(24,24,26,0.08) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '3rem 1.5rem',
    }}>
      <div style={{
        display: 'flex', gap: 'clamp(2rem, 6vw, 5rem)',
        alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
        maxWidth: 1000,
        animation: 'rise-in 0.6s var(--ease) both',
      }}>
        {/* Polaroid */}
        <div style={{ width: 300, flexShrink: 0 }}>
          <Polaroid
            src={fotoPersonal}
            caption="Santiago Avella"
            tags={['🇺🇸 US citizen', '📍 San Francisco, CA']}
            rotate={-4}
          />
        </div>

        {/* Intro copy */}
        <div style={{ flex: 1, minWidth: 300, maxWidth: 520 }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--accent)', letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: '0.9rem',
          }}>
            # hello crypto.com
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', lineHeight: 1.02,
            letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: '1.2rem',
          }}>
            Hi, I’m Santiago.
          </h1>

          <p style={{
            fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--ink-soft)',
            marginBottom: '1rem',
          }}>
            Founding Product Designer at Zolvo (YC P26), ex-HubSpot, and a SCAD UX
            grad with Colombian roots, now based in San Francisco. I turn complex,
            messy systems into products that feel obvious.
          </p>

          <p style={{
            fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--ink-soft)',
            marginBottom: '2rem',
          }}>
            Outside of work I’m usually behind a camera, playing guitar, chasing F1
            weekends, or hopping on a flight somewhere new. I love building things
            fast and shipping them even faster.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <a
              href={FIGMA_URL} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--accent)', color: '#fff',
                border: 'none', borderRadius: 'var(--radius-pill)',
                boxShadow: 'var(--shadow-card)', cursor: 'none',
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600,
                padding: '0.85rem 1.4rem', textDecoration: 'none',
                transition: 'transform 0.15s var(--ease), filter 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}
            >
              View my presentation <ArrowUpRight size={15} />
            </a>

            <button
              onClick={() => navigate('/')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--surface)', color: 'var(--ink)',
                border: 'var(--border-card)', borderRadius: 'var(--radius-pill)',
                boxShadow: 'var(--shadow-card)', cursor: 'none',
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600,
                padding: '0.85rem 1.4rem',
                transition: 'background 0.15s, color 0.15s, transform 0.15s var(--ease)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Check my whole portfolio (in progress) <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
