import { useState } from 'react'
import { playGuitarChord } from '../lib/sound'

/* ─────────────────────────────────────────────────────────────
   GUITAR — click to strum, plays a C-major arpeggio + the
   strings briefly twitch.
   ───────────────────────────────────────────────────────────── */
function ToyCaption({ children }) {
  return (
    <p style={{
      textAlign: 'center', marginTop: 6,
      fontFamily: 'var(--font-note)', fontSize: '1rem',
      color: 'var(--accent)', lineHeight: 1.1,
    }}>
      {children}
    </p>
  )
}

export function Guitar({ height = 270, label }) {
  const [pluck, setPluck] = useState(0)
  const handleStrum = (e) => {
    e.stopPropagation()
    playGuitarChord()
    setPluck(p => p + 1)
  }
  return (
    <div style={{ width: '100%' }}>
    <div
      onClick={handleStrum}
      onPointerDown={e => e.stopPropagation()}
      style={{
        width: '100%', height, cursor: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: pluck ? 'guitar-shake 0.35s ease-out' : 'none',
      }}
      key={pluck}  /* re-mount to retrigger the SVG string animations */
    >
      <svg viewBox="0 0 160 220" width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* Tuning head */}
        <rect x="65" y="6" width="30" height="22" rx="3" fill="#2a1810" />
        {[0, 1, 2].map(i => (
          <circle key={`tl-${i}`} cx={70} cy={14 + i * 5} r={1.6} fill="#d4af6a" />
        ))}
        {[0, 1, 2].map(i => (
          <circle key={`tr-${i}`} cx={90} cy={14 + i * 5} r={1.6} fill="#d4af6a" />
        ))}
        {/* Neck */}
        <rect x="72" y="26" width="16" height="92" fill="#3d2817" />
        {/* Frets */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`fr-${i}`} x1="72" y1={36 + i * 17} x2="88" y2={36 + i * 17}
            stroke="#a78a5e" strokeWidth="0.8" />
        ))}
        {/* Body (acoustic curve) */}
        <ellipse cx="80" cy="155" rx="50" ry="52" fill="#d49b5a" />
        <ellipse cx="80" cy="155" rx="50" ry="52" fill="url(#wood-grain)" opacity="0.35" />
        {/* Sound hole */}
        <circle cx="80" cy="155" r="14" fill="#1a0e08" />
        <circle cx="80" cy="155" r="14" fill="none" stroke="#d4af6a" strokeWidth="1.2" opacity="0.6" />
        {/* Bridge */}
        <rect x="62" y="180" width="36" height="5" rx="1" fill="#2a1810" />

        {/* Strings (6) — vibrate on pluck */}
        {[0, 1, 2, 3, 4, 5].map(i => {
          const x = 73 + i * 2.8
          return (
            <line
              key={`str-${i}`}
              x1={x} y1={28}
              x2={x} y2={182}
              stroke="#f5f0e6" strokeOpacity="0.9"
              strokeWidth="0.7"
              style={{
                animation: `string-pluck ${0.55 + i * 0.04}s ease-out ${i * 0.08}s 1`,
                transformOrigin: 'center',
              }}
            />
          )
        })}

        <defs>
          <radialGradient id="wood-grain" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#8a5a2a" stopOpacity="0" />
            <stop offset="100%" stopColor="#3a1f08" stopOpacity="1" />
          </radialGradient>
        </defs>
      </svg>
    </div>
    {label && <ToyCaption>{label}</ToyCaption>}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   F1 CAR — drives across the frame in a loop, wheels spinning,
   tiny smoke puffs trailing behind.
   ───────────────────────────────────────────────────────────── */
export function F1Car({ height = 150, label }) {
  return (
    <div style={{ width: '100%' }}>
    <div style={{
      width: '100%', height,
      background: 'linear-gradient(180deg,#1a1d2e 0%,#0a0c1a 70%, #2a2520 100%)',
      borderRadius: 8,
      position: 'relative', overflow: 'hidden',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
    }}>
      {/* asphalt strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%',
        background: 'linear-gradient(180deg,#2a2520 0%,#1a1612 100%)',
      }} />
      {/* lane markings — sliding to fake speed */}
      <div style={{
        position: 'absolute', bottom: '17%', left: 0, right: 0, height: 4,
        background: 'repeating-linear-gradient(90deg, #FFD800 0 22px, transparent 22px 44px)',
        animation: 'f1-road 0.45s linear infinite',
      }} />

      {/* the car */}
      <div style={{
        position: 'absolute', bottom: '20%', left: 0,
        width: 130, height: 50,
        animation: 'f1-drive 6.5s linear infinite',
      }}>
        <svg viewBox="0 0 240 100" width="100%" height="100%">
          {/* rear wing */}
          <rect x="6" y="34" width="24" height="4" rx="1" fill="#222" />
          <rect x="14" y="38" width="6" height="22" fill="#222" />
          {/* body */}
          <path d="M 22 64 L 30 52 L 56 44 L 96 37 L 168 40 L 204 50 L 218 62 L 218 70 L 22 70 Z"
            fill="#E10600" />
          {/* sponsor stripe */}
          <rect x="60" y="55" width="100" height="4" fill="#fff" opacity="0.85" />
          {/* cockpit */}
          <path d="M 102 39 Q 118 22, 146 25 L 152 42 Z" fill="#0a0a0a" />
          {/* helmet */}
          <ellipse cx="128" cy="30" rx="7" ry="6" fill="#FFD800" />
          <rect x="121" y="29" width="14" height="3" fill="#0a0a0a" />
          {/* front wing */}
          <rect x="200" y="62" width="34" height="3" rx="1" fill="#222" />
          <rect x="216" y="55" width="4" height="10" fill="#222" />
          {/* wheels — spin */}
          <g style={{ transformOrigin: '46px 76px', animation: 'f1-wheel 0.18s linear infinite' }}>
            <circle cx="46" cy="76" r="14" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <circle cx="46" cy="76" r="5" fill="#777" />
            <line x1="46" y1="62" x2="46" y2="90" stroke="#444" strokeWidth="1.4" />
            <line x1="32" y1="76" x2="60" y2="76" stroke="#444" strokeWidth="1.4" />
          </g>
          <g style={{ transformOrigin: '184px 76px', animation: 'f1-wheel 0.18s linear infinite' }}>
            <circle cx="184" cy="76" r="14" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <circle cx="184" cy="76" r="5" fill="#777" />
            <line x1="184" y1="62" x2="184" y2="90" stroke="#444" strokeWidth="1.4" />
            <line x1="170" y1="76" x2="198" y2="76" stroke="#444" strokeWidth="1.4" />
          </g>
        </svg>
      </div>

      {/* corner label */}
      <span style={{
        position: 'absolute', top: 8, right: 10,
        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
        color: '#fff', opacity: 0.55, letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}>
        Mónaco · {new Date().getFullYear()}
      </span>
    </div>
    {label && <ToyCaption>{label}</ToyCaption>}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FLIGHT MAP — a tiny stylized world with a plane looping
   between cities I've lived in or want to visit.
   ───────────────────────────────────────────────────────────── */
const STOPS = [
  { x: 50,  y: 110, label: 'BOG' },
  { x: 110, y: 70,  label: 'NYC' },
  { x: 170, y: 60,  label: 'LIS' },
  { x: 220, y: 80,  label: 'TYO' },
  { x: 240, y: 130, label: 'BNE' },
]
const ROUTE = 'M 50,110 Q 80,30 110,70 T 170,60 T 220,80 T 240,130'

export function FlightMap({ height = 170, label }) {
  return (
    <div style={{ width: '100%' }}>
    <div style={{
      width: '100%', height,
      background: 'linear-gradient(180deg,#0a1530 0%, #050a1c 100%)',
      borderRadius: 8, position: 'relative', overflow: 'hidden',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
    }}>
      {/* twinkling stars */}
      {[[18, 22], [40, 14], [70, 30], [125, 18], [195, 26], [255, 12], [275, 40]].map(([x, y], i) => (
        <span key={i} style={{
          position: 'absolute', left: x, top: y,
          width: 2, height: 2, borderRadius: '50%',
          background: '#fff', opacity: 0.85,
          animation: `star-twinkle ${1.6 + (i % 3) * 0.4}s ease-in-out ${i * 0.3}s infinite`,
        }} />
      ))}

      <svg viewBox="0 0 280 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {/* abstract continents (blobs) */}
        <g fill="rgba(255,255,255,0.08)">
          <path d="M 22,85 Q 30,70 50,75 Q 70,90 65,115 Q 50,135 28,128 Q 12,108 22,85 Z" />
          <path d="M 90,55 Q 110,42 135,52 Q 140,75 120,80 Q 95,78 90,55 Z" />
          <path d="M 150,45 Q 175,40 200,52 Q 195,75 170,70 Q 152,62 150,45 Z" />
          <path d="M 210,60 Q 235,55 260,72 Q 258,100 230,98 Q 210,85 210,60 Z" />
          <path d="M 220,118 Q 240,112 256,128 Q 250,145 232,140 Q 218,130 220,118 Z" />
        </g>

        {/* flight route (dashed) */}
        <path d={ROUTE} fill="none"
          stroke="rgba(255,216,77,0.55)" strokeWidth="1.4" strokeDasharray="3 4" />

        {/* city dots + labels */}
        {STOPS.map((s, i) => (
          <g key={s.label}>
            <circle cx={s.x} cy={s.y} r="3" fill="#FFD84D" />
            <circle cx={s.x} cy={s.y} r="6" fill="none" stroke="#FFD84D" strokeOpacity="0.4"
              style={{
                animation: `ping-pulse ${2}s ease-out ${i * 0.4}s infinite`,
                transformOrigin: 'center', transformBox: 'fill-box',
              }} />
            <text x={s.x + 6} y={s.y - 4}
              fontFamily="JetBrains Mono, monospace" fontSize="6.5"
              fill="#FFD84D" opacity="0.85" letterSpacing="0.5">
              {s.label}
            </text>
          </g>
        ))}

        {/* plane */}
        <g>
          <path d="M -8 0 L 8 -2.5 L 14 0 L 8 2.5 L -8 0 Z M -2 -2 L -2 -6 L 2 -6 L 2 -2 Z M -2 2 L -2 6 L 2 6 L 2 2 Z"
            fill="#fff" stroke="#222" strokeWidth="0.4" />
          <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
            <mpath href="#flight-path" />
          </animateMotion>
        </g>
        {/* hidden path for animateMotion */}
        <path id="flight-path" d={ROUTE} fill="none" stroke="none" />
      </svg>

      {/* corner label */}
      <span style={{
        position: 'absolute', top: 8, left: 10,
        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
        color: '#FFD84D', opacity: 0.7, letterSpacing: '0.16em',
        textTransform: 'uppercase',
      }}>
        Always somewhere
      </span>
    </div>
    {label && <ToyCaption>{label}</ToyCaption>}
    </div>
  )
}
