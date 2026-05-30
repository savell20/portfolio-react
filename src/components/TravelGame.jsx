import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Plane, RotateCcw } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
   TRAVEL GAME — "Where has Santi been?"
   A minesweeper-style board: tap the countries you think Santi has
   visited. Each tap reveals ✓ (been) or ✗ (never). Find them all.
   ───────────────────────────────────────────────────────────── */

// Santiago's real travel list.
const VISITED = [
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Dominican Republic', flag: '🇩🇴' },
  { name: 'Guatemala', flag: '🇬🇹' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Puerto Rico', flag: '🇵🇷' },
  { name: 'Bolivia', flag: '🇧🇴' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Czechia', flag: '🇨🇿' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Portugal', flag: '🇵🇹' },
]

// Decoys — places Santi hasn't been (the "mines").
const NOT_VISITED = [
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Thailand', flag: '🇹🇭' },
]

const DECOYS = 9

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildBoard() {
  const v = VISITED.map(c => ({ ...c, visited: true, id: c.name }))
  const n = shuffle(NOT_VISITED).slice(0, DECOYS).map(c => ({ ...c, visited: false, id: c.name }))
  return shuffle([...v, ...n])
}

/* ───────── Tile (boarding-pass departure board) ───────── */
export function TravelGameTile({ height = 320 }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', width: '100%', height,
        // Aircraft fuselage — brushed-aluminium body.
        background: 'linear-gradient(100deg,#dfe6ec 0%,#c3ccd6 38%,#eef2f6 55%,#c9d2db 100%)',
        border: '8px solid #aab4be',
        borderRadius: 14,
        boxShadow: hover ? '0 26px 48px rgba(40,60,90,0.34)' : '0 22px 42px rgba(0,0,0,0.32)',
        overflow: 'hidden',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.25s var(--ease), box-shadow 0.25s var(--ease)',
      }}
    >
      {/* rivet lines on the fuselage */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(120,135,150,0.5) 1px, transparent 1px)',
        backgroundSize: '16px 16px', backgroundPosition: '6px 6px',
        opacity: 0.5, pointerEvents: 'none',
      }} />

      {/* NOW BOARDING sign */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 6,
        padding: '4px 10px', background: '#0a7d2c', color: '#fff',
        fontFamily: 'var(--font-mono)', fontSize: '0.54rem', fontWeight: 800,
        letterSpacing: '0.16em', borderRadius: 2,
        boxShadow: '0 0 12px rgba(20,200,80,0.5)',
      }}>
        NOW BOARDING
      </div>

      {/* The doorway — recessed cabin entrance, revealed when the door swings */}
      <div style={{
        position: 'absolute', top: 46, left: 26, right: 26, bottom: 22,
        borderRadius: '70px 70px 10px 10px',
        background: 'radial-gradient(circle at 50% 35%, #ffe9b8 0%, #d99b3c 45%, #6e4410 100%)',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 6, padding: '1rem',
        overflow: 'hidden',
      }}>
        <Plane size={26} color="#3a2407" strokeWidth={2.2}
          style={{ transform: 'rotate(-45deg)' }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
          letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5a3a10',
        }}>
          guess where
        </span>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800,
          letterSpacing: '-0.02em', lineHeight: 1.05, color: '#2a1a06', textAlign: 'center',
        }}>
          I’ve travelled
        </span>
        <span style={{
          marginTop: 2, fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: '#7a4d12',
        }}>
          18 countries · step aboard
        </span>
      </div>

      {/* The aircraft door — swings open on hover (hinged on the left). */}
      <div style={{
        position: 'absolute', top: 46, left: 26, right: 26, bottom: 22,
        borderRadius: '70px 70px 10px 10px',
        background: 'linear-gradient(100deg,#eef2f6 0%,#cfd8e0 45%,#e7edf2 60%,#c6d0d9 100%)',
        border: '3px solid #aab4be',
        boxShadow: hover
          ? 'inset 0 0 0 1px rgba(255,255,255,0.6), 8px 0 24px rgba(0,0,0,0.35)'
          : 'inset 0 0 0 1px rgba(255,255,255,0.6)',
        transformOrigin: 'left center',
        transform: hover ? 'perspective(900px) rotateY(-78deg)' : 'perspective(900px) rotateY(0deg)',
        transition: 'transform 0.6s var(--ease), box-shadow 0.4s',
        zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
      }}>
        {/* porthole window */}
        <div style={{
          width: 64, height: 86, borderRadius: '32px / 43px',
          background: 'radial-gradient(circle at 50% 35%, #bfe0ff 0%, #5b86b0 70%, #3a5878 100%)',
          border: '6px solid #d7dee5',
          boxShadow: 'inset 0 0 14px rgba(0,0,0,0.35)',
        }} />
        {/* door handle */}
        <div style={{
          width: 30, height: 8, borderRadius: 4,
          background: 'linear-gradient(180deg,#9aa6b2,#6f7c89)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.46rem',
          letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6f7c89',
        }}>
          gate · A18
        </span>
      </div>
    </div>
  )
}

/* ───────── Modal (the game) ───────── */
const accent = '#FFB200'

function PlaneStrip() {
  // A plane flying across a dashed route line — map/boarding vibe.
  return (
    <div style={{ position: 'relative', height: 30, marginBottom: 18 }}>
      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0, height: 0,
        borderTop: '2px dashed rgba(255,178,0,0.45)',
      }} />
      <div style={{
        position: 'absolute', top: -6, left: '-12%',
        animation: 'plane-cross 6s linear infinite',
      }}>
        <Plane size={26} color={accent} strokeWidth={2}
          style={{ filter: 'drop-shadow(0 0 8px rgba(255,178,0,0.5))' }} />
      </div>
    </div>
  )
}

export function TravelGameModal({ onClose }) {
  const [phase, setPhase] = useState('intro')          // intro | playing | result
  const [tiles, setTiles] = useState(() => buildBoard())
  const [revealed, setRevealed] = useState({})         // id -> 'right' | 'wrong'

  const totalVisited = tiles.filter(t => t.visited).length
  const found = tiles.filter(t => t.visited && revealed[t.id] === 'right').length
  const wrong = Object.values(revealed).filter(v => v === 'wrong').length

  const start = () => { setTiles(buildBoard()); setRevealed({}); setPhase('playing') }
  const tap = (t) => {
    if (revealed[t.id]) return
    setRevealed(r => ({ ...r, [t.id]: t.visited ? 'right' : 'wrong' }))
  }

  useEffect(() => {
    if (phase === 'playing' && totalVisited > 0 && found === totalVisited) {
      const id = setTimeout(() => setPhase('result'), 700)
      return () => clearTimeout(id)
    }
  }, [phase, found, totalVisited])

  return createPortal(
    <div
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        position: 'fixed', inset: 0, zIndex: 99995,
        background: 'radial-gradient(ellipse at 50% 25%, #0b1f3a 0%, #04080f 82%)',
        // faint "map" dot grid
        backgroundImage: 'radial-gradient(ellipse at 50% 25%, #0b1f3a 0%, #04080f 82%), radial-gradient(circle, rgba(138,166,200,0.12) 1px, transparent 1px)',
        backgroundSize: 'cover, 26px 26px',
        animation: 'fade-in 0.3s ease both',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, overflow: 'auto',
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close travel game"
        style={{
          position: 'fixed', top: 18, right: 22, zIndex: 100000,
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '0.55rem 0.9rem', cursor: 'none',
          background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 999, color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
        }}
      >
        <X size={13} /> close
      </button>

      {phase === 'intro' && (
        <div style={{ textAlign: 'center', width: 'min(520px, 92vw)', animation: 'fade-in 0.4s var(--ease) both' }}>
          <PlaneStrip />
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(1.5rem, 4.5vw, 2.4rem)', color: '#fff',
            letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: 14,
          }}>
            Where in the world<br />has Santi been?
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.74rem',
            color: '#8aa6c8', lineHeight: 1.6, marginBottom: 26, maxWidth: 420,
            marginInline: 'auto',
          }}>
            It’s a map minesweeper. Tap the countries you think I’ve actually
            visited — each one flips to ✓ been or ✗ never. Find all {totalVisited}.
          </p>
          <button onClick={start} style={primaryBtn(accent)}>
            <Plane size={15} /> start boarding
          </button>
        </div>
      )}

      {phase === 'playing' && (
        <div style={{ width: 'min(880px, 94vw)', animation: 'fade-in 0.35s var(--ease) both' }}>
          <PlaneStrip />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 20, marginBottom: 18, flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#fff',
            }}>
              ✈️ Found {found} / {totalVisited}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: '#ff8f8f',
            }}>
              wrong guesses: {wrong}
            </span>
          </div>

          {/* The board */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(124px, 1fr))',
            gap: 10,
          }}>
            {tiles.map(t => {
              const state = revealed[t.id]
              const bg = state === 'right' ? 'rgba(46,204,113,0.18)'
                : state === 'wrong' ? 'rgba(255,90,90,0.16)'
                : 'rgba(255,255,255,0.05)'
              const border = state === 'right' ? '#2ecc71'
                : state === 'wrong' ? '#ff5a5a'
                : 'rgba(255,255,255,0.12)'
              return (
                <button
                  key={t.id}
                  onClick={() => tap(t)}
                  disabled={!!state}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                    padding: '0.85rem 0.5rem', cursor: 'none',
                    background: bg, border: `1.6px solid ${border}`,
                    borderRadius: 14, color: '#fff',
                    transition: 'background 0.2s, border 0.2s, transform 0.12s',
                    animation: state ? 'pop-in 0.25s var(--ease) both' : 'none',
                  }}
                >
                  <span style={{ fontSize: '1.9rem', lineHeight: 1 }}>{t.flag}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                    color: '#cdd9e6', textAlign: 'center', lineHeight: 1.2,
                  }}>
                    {t.name}
                  </span>
                  <span style={{
                    height: 14, fontSize: '0.66rem', fontWeight: 700,
                    color: state === 'right' ? '#2ecc71' : state === 'wrong' ? '#ff5a5a' : 'transparent',
                  }}>
                    {state === 'right' ? '✓ been' : state === 'wrong' ? '✗ never' : '·'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div style={{ textAlign: 'center', maxWidth: 440, animation: 'pop-in 0.3s var(--ease) both' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 10 }}>🌍</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '2rem', color: '#fff', letterSpacing: '-0.02em', marginBottom: 10,
          }}>
            You found all {totalVisited}! ✈️
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#8aa6c8',
            lineHeight: 1.6, marginBottom: 24,
          }}>
            {wrong === 0
              ? 'A perfect run — not a single wrong guess. Are you stalking my passport?'
              : `You got there with ${wrong} wrong guess${wrong === 1 ? '' : 'es'}. Nicely done.`}
          </p>
          <button onClick={start} style={primaryBtn(accent)}>
            <RotateCcw size={15} /> play again
          </button>
        </div>
      )}
    </div>,
    document.body
  )
}

const primaryBtn = (accent) => ({
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '0.8rem 1.4rem', cursor: 'none',
  background: accent, color: '#0a1422', border: 'none', borderRadius: 999,
  fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700,
  boxShadow: `0 8px 22px ${accent}55`,
})
