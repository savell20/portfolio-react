import { useState } from 'react'
import {
  ArrowRight, Camera, Award, Trophy, Star,
  Lightbulb, Sparkles, PenTool, GitBranch, Rocket, RefreshCw,
} from 'lucide-react'

const AWARD_ICONS = { award: Award, trophy: Trophy, star: Star }
const WORKFLOW_ICONS = {
  lightbulb: Lightbulb, sparkles: Sparkles, pentool: PenTool,
  git: GitBranch, rocket: Rocket, refresh: RefreshCw,
}
import fotoPersonal from '../assets/foto-personal.jpeg'

/* Shared arrow chip, points right by default, rotates to diagonal
   top-right (↗) on hover. Same animation on every interactive card. */
export function ArrowChip({ hover, size = 26 }) {
  return (
    <span style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: size, height: size, borderRadius: '50%',
      background: hover ? 'var(--accent)' : 'var(--canvas)',
      color: hover ? 'var(--surface)' : 'var(--ink-soft)',
      transition: 'background 0.2s, color 0.2s',
      flexShrink: 0,
    }}>
      <span style={{
        display: 'inline-flex',
        transform: hover ? 'rotate(-45deg)' : 'rotate(0deg)',
        transition: 'transform 0.28s var(--ease)',
      }}>
        <ArrowRight size={Math.round(size * 0.54)} />
      </span>
    </span>
  )
}

// All chrome reads from CSS vars so every art-style restyles the cards.
const cardBase = {
  background: 'var(--surface)',
  border: 'var(--border-card)',
  borderRadius: 'var(--radius)',
  boxShadow: 'var(--shadow-card)',
}

// FrameLabel floats above the card via absolute positioning so it doesn't
// add height to the card's bounding box, keeps connector anchors flush
// with the card's actual visible edges.
/* Brand logo chips for the project covers. */
function YCLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="3" fill="#F26522" />
      <text x="12" y="18" textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="17" fontWeight="700" fill="#fff">Y</text>
    </svg>
  )
}
function HubSpotLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="3" fill="#FF7A59" />
      <circle cx="11.5" cy="15" r="3.4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <line x1="11.5" y1="15" x2="11.5" y2="9.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="11.5" y1="9.5" x2="17" y2="6.6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="6.5" r="1.6" fill="#fff" />
    </svg>
  )
}

function BadgeChip({ badge }) {
  if (!badge) return null
  const Logo = badge.type === 'yc' ? YCLogo : badge.type === 'hubspot' ? HubSpotLogo : null
  return (
    <span style={{
      position: 'absolute', top: 10, right: 12, zIndex: 2,
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '0.28rem 0.55rem 0.28rem 0.35rem',
      background: 'rgba(0,0,0,0.45)',
      border: '1px solid rgba(255,255,255,0.18)',
      borderRadius: 'var(--radius-pill)',
      backdropFilter: 'blur(8px)',
    }}>
      {Logo && <Logo size={16} />}
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 500,
        color: '#fff', letterSpacing: '0.08em', whiteSpace: 'nowrap',
      }}>
        {badge.label}
      </span>
    </span>
  )
}

function FrameLabel({ children }) {
  return (
    <div style={{
      position: 'absolute', left: 2, bottom: 'calc(100% + 6px)',
      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 500,
      color: 'var(--ink-faint)', letterSpacing: '0.04em', userSelect: 'none',
      whiteSpace: 'nowrap',
    }}>
      {typeof children === 'string' ? children.replace(/^#\s*/, '') : children}
    </div>
  )
}

/* ---- Project ---- */
export function ProjectCard({ data }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{
        ...cardBase,
        overflow: 'hidden',
        transform: hover ? 'translate(-2px, -3px)' : 'translate(0, 0)',
        transition: 'transform 0.22s var(--ease)',
      }}>
        {/* Cover — real image if provided, otherwise gradient + monogram */}
        <div style={{
          height: 240,
          background: data.coverImage ? '#222' : data.cover,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {data.coverImage ? (
            <img
              src={data.coverImage}
              alt={data.company}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: '8rem', color: 'rgba(255,255,255,0.18)',
              lineHeight: 1, userSelect: 'none',
            }}>
              {data.company[0]}
            </span>
          )}
        </div>
        {/* Body */}
        <div style={{ padding: '1.05rem 1.15rem 1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '1.35rem', letterSpacing: '-0.02em', color: 'var(--ink)',
            }}>
              {data.company}
            </h3>
            <ArrowChip hover={hover} size={26} />
          </div>
          <p style={{ fontSize: '0.94rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: '0.5rem' }}>
            {data.blurb}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---- Photography ---- */
export function PhotographyCard() {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FrameLabel>▸ photography.case</FrameLabel>
      <div style={{
        ...cardBase,
        overflow: 'hidden',
        display: 'flex',
        transform: hover ? 'translate(-2px, -3px)' : 'translate(0, 0)',
        transition: 'transform 0.22s var(--ease)',
        height: 290,
      }}>
        {/* Left collage panel */}
        <div style={{
          flex: '0 0 46%', position: 'relative',
          background: 'linear-gradient(135deg, #2a2a30 0%, #1a1a20 100%)',
          overflow: 'hidden',
        }}>
          {/* Polaroid stack */}
          <div style={{
            position: 'absolute', top: 32, left: 38, width: 110, height: 130,
            background: '#FAF8F2', padding: '6px 6px 18px',
            transform: 'rotate(-6deg)',
            boxShadow: '0 12px 26px rgba(0,0,0,0.45)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)',
            }} />
          </div>
          <div style={{
            position: 'absolute', top: 64, left: 96, width: 110, height: 130,
            background: '#FAF8F2', padding: '6px 6px 18px',
            transform: 'rotate(8deg)',
            boxShadow: '0 12px 26px rgba(0,0,0,0.45)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #4a6a8a 0%, #2a3a52 100%)',
            }} />
          </div>
          <div style={{
            position: 'absolute', bottom: 24, left: 60, width: 110, height: 130,
            background: '#FAF8F2', padding: '6px 6px 18px',
            transform: 'rotate(-2deg)',
            boxShadow: '0 12px 26px rgba(0,0,0,0.45)',
          }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #c89968 0%, #6b4a2a 100%)',
            }} />
          </div>
          {/* film grain overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: '1.4rem 1.6rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              color: 'var(--ink-faint)', letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <Camera size={11} /> off the clock
            </span>
            <ArrowChip hover={hover} size={30} />
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '1.7rem', letterSpacing: '-0.02em',
            color: 'var(--ink)', marginBottom: '0.5rem',
          }}>
            Photography
          </h3>

          <p style={{
            fontSize: '0.9rem', color: 'var(--ink-soft)',
            lineHeight: 1.6, marginBottom: '0.9rem',
          }}>
            A slow roll, film snapshots from weekends, in-betweens, and the trips
            I almost forgot to bring a camera on. Color, grain, mistakes left in.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
            {['35mm', 'Color', 'Travel', 'Slow living'].map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                color: 'var(--ink-soft)', background: 'var(--canvas)',
                border: '1px solid var(--line)', borderRadius: 5,
                padding: '0.18rem 0.4rem', textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Workflow step (AI-workflow zone) ---- */
export function WorkflowStep({ data }) {
  const Icon = WORKFLOW_ICONS[data.icon] || Sparkles
  return (
    <div style={{
      ...cardBase,
      padding: '1rem 1.1rem 1.1rem',
      display: 'flex', flexDirection: 'column', gap: 6,
      transform: `rotate(${data.rotate || 0}deg)`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 30, height: 30, borderRadius: 7,
          background: data.tint || 'var(--accent-soft)',
          color: data.tintInk || 'var(--accent)',
        }}>
          <Icon size={15} strokeWidth={2.2} />
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          color: 'var(--ink-faint)', letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          step {data.n}
        </span>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: '1rem', lineHeight: 1.15, letterSpacing: '-0.01em',
        color: 'var(--ink)',
      }}>
        {data.title}
      </h3>
      <p style={{ fontSize: '0.74rem', color: 'var(--ink-soft)', lineHeight: 1.45 }}>
        {data.body}
      </p>
    </div>
  )
}

/* ---- Award card (top-left zone) ---- */
export function AwardCard({ data }) {
  const Icon = AWARD_ICONS[data.icon] || Award
  return (
    <div style={{
      ...cardBase,
      padding: '1rem 1.05rem 1.1rem',
      display: 'flex', flexDirection: 'column', gap: 8,
      transform: `rotate(${data.rotate || 0}deg)`,
    }}>
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: 9,
        background: 'var(--accent-soft)', color: 'var(--accent)',
      }}>
        <Icon size={18} strokeWidth={2.2} />
      </span>
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '0.98rem', lineHeight: 1.2,
          letterSpacing: '-0.01em', color: 'var(--ink)',
          marginBottom: 3,
        }}>
          {data.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          color: 'var(--ink-soft)', letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          {data.org} · {data.year}
        </p>
      </div>
    </div>
  )
}

/* ---- Annotation label, feels like marker writing on the canvas grid ---- */
// All arrows share an identical sweep so the waymarkers feel consistent.
const ARROW_PATHS = {
  '↑': 'M50 90 C 46 70, 56 50, 50 12 M 50 12 L 41 22 M 50 12 L 59 22',
  '↓': 'M50 10 C 54 30, 44 50, 50 88 M 50 88 L 41 78 M 50 88 L 59 78',
  '←': 'M90 50 C 70 46, 50 54, 12 50 M 12 50 L 22 41 M 12 50 L 22 59',
  '→': 'M10 50 C 30 54, 50 46, 88 50 M 88 50 L 78 41 M 88 50 L 78 59',
  // diagonal: down-right. Starts at the SVG's vertical center so the
  // arrow head leaves from the text baseline, then curves down-right.
  '↘': 'M8 50 C 26 56, 48 66, 84 92 M 84 92 L 72 88 M 84 92 L 80 76',
}

function HandArrow({ direction, size = 70 }) {
  const d = ARROW_PATHS[direction] || ARROW_PATHS['→']
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <path
        d={d}
        fill="none" stroke="var(--accent)"
        strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

/* Tall handwritten "↓" hint, the arrow purposely runs off the bottom
   of the initial viewport so visitors feel there's more below. */
export function LongDownArrow({ data }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      transform: `rotate(${data.rotate || 0}deg)`,
      userSelect: 'none',
    }}>
      <span style={{
        fontFamily: 'var(--font-note)', fontSize: '1.4rem',
        color: 'var(--accent)', whiteSpace: 'nowrap', lineHeight: 1.05,
        marginBottom: 6,
      }}>
        {data.text}
      </span>
      <svg width="40" height={data.length || 280}
        viewBox={`0 0 40 ${data.length || 280}`}
        style={{ overflow: 'visible', display: 'block' }}
      >
        <path
          d={`M20 4 C 16 ${(data.length || 280) * 0.3}, 24 ${(data.length || 280) * 0.65}, 20 ${(data.length || 280) - 14}
              M 20 ${(data.length || 280) - 14} L 11 ${(data.length || 280) - 26}
              M 20 ${(data.length || 280) - 14} L 29 ${(data.length || 280) - 26}`}
          fill="none" stroke="var(--accent)" strokeWidth="2.6"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function AnnotationLabel({ data }) {
  const isVertical = data.arrow === '↑' || data.arrow === '↓'
  const arrowAfter = data.arrow === '→' || data.arrow === '↓' || data.arrow === '↘'
  return (
    <div style={{
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      alignItems: 'center', gap: isVertical ? 4 : 8,
      transform: `rotate(${data.rotate || 0}deg)`,
      userSelect: 'none',
    }}>
      {!arrowAfter && <HandArrow direction={data.arrow} />}
      <span style={{
        fontFamily: 'var(--font-note)', fontSize: '1.35rem',
        fontWeight: 400, color: 'var(--accent)',
        whiteSpace: 'nowrap', lineHeight: 1,
      }}>
        {data.text}
      </span>
      {arrowAfter && <HandArrow direction={data.arrow} />}
    </div>
  )
}

/* ---- Resume entry (company logo + role + dates) ---- */
function AmazonLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <rect width="28" height="28" rx="6" fill="#FF9900" />
      <text x="14" y="17" textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="14" fontWeight="800" fill="#232F3E">a</text>
      <path d="M 7 21 Q 14 24, 21 21" fill="none" stroke="#232F3E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 19 21 L 21 21 L 21 19" fill="none" stroke="#232F3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function BMWLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <circle cx="14" cy="14" r="13" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="9.5" fill="#000" />
      <path d="M 14 4.5 A 9.5 9.5 0 0 1 23.5 14 L 14 14 Z" fill="#fff" />
      <path d="M 14 23.5 A 9.5 9.5 0 0 1 4.5 14 L 14 14 Z" fill="#fff" />
      <path d="M 14 4.5 A 9.5 9.5 0 0 0 4.5 14 L 14 14 Z" fill="#2A9DF4" />
      <path d="M 14 23.5 A 9.5 9.5 0 0 0 23.5 14 L 14 14 Z" fill="#2A9DF4" />
    </svg>
  )
}
function OshkoshLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <rect width="28" height="28" rx="6" fill="#000" />
      <path d="M 9 8 L 19 8 L 14 14 L 19 20 L 9 20 L 14 14 Z" fill="#fff" />
    </svg>
  )
}
function SCADLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <rect width="28" height="28" rx="6" fill="#FFD400" />
      <text x="14" y="19" textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="11" fontWeight="800" fill="#000">SCAD</text>
    </svg>
  )
}

function ZolvoLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <rect width="28" height="28" rx="6" fill="#2F3BC9" />
      <text x="14" y="20" textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="16" fontWeight="800" fill="#fff">Z</text>
    </svg>
  )
}
function ThinkerfaceLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <rect width="28" height="28" rx="6" fill="#6B3FFF" />
      <text x="14" y="20" textAnchor="middle"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="16" fontWeight="800" fill="#fff">T</text>
    </svg>
  )
}
function CapturaLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      <rect width="28" height="28" rx="6" fill="#1F8A6E" />
      <circle cx="14" cy="15" r="5.5" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="14" cy="15" r="2" fill="#fff" />
      <rect x="11" y="8" width="6" height="2.2" rx="0.5" fill="#fff" />
    </svg>
  )
}

const RESUME_LOGOS = {
  amazon: AmazonLogo, bmw: BMWLogo, oshkosh: OshkoshLogo, scad: SCADLogo,
  yc: YCLogo, hubspot: HubSpotLogo,
  zolvo: ZolvoLogo, thinkerface: ThinkerfaceLogo, captura: CapturaLogo,
}

export function ResumeEntry({ data }) {
  const Logo = RESUME_LOGOS[data.logo] || YCLogo
  const hasBullets = Array.isArray(data.bullets) && data.bullets.length > 0
  return (
    <div style={{
      ...cardBase, padding: '1.15rem 1.3rem',
      display: 'flex', alignItems: 'flex-start', gap: 16,
    }}>
      <Logo size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '1.26rem', color: 'var(--ink)', letterSpacing: '-0.01em',
          lineHeight: 1.25,
        }}>
          {data.role} <span style={{ color: 'var(--ink-faint)', fontWeight: 500 }}> @ </span>
          <span style={{ color: 'var(--ink)' }}>{data.company}</span>
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
          color: 'var(--ink-soft)', letterSpacing: '0.04em', marginTop: 5,
        }}>
          {data.dates}{data.location ? ` · ${data.location}` : ''}
        </p>
        {hasBullets && (
          <ul style={{
            listStyle: 'none', padding: 0,
            margin: '0.8rem 0 0',
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
          }}>
            {data.bullets.map((b, i) => (
              <li key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                fontSize: '1.04rem', color: 'var(--ink-soft)', lineHeight: 1.55,
              }}>
                <span style={{
                  flexShrink: 0, marginTop: 8,
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--accent)',
                }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* ---- Goals card ---- */
export function GoalsCard({ data, height }) {
  return (
    <div style={{
      ...cardBase, padding: '1.4rem 1.55rem',
      minHeight: height || 'auto',
      display: 'flex', flexDirection: 'column',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: 'var(--accent)', letterSpacing: '0.12em',
        textTransform: 'uppercase', marginBottom: '0.55rem',
      }}>
        # my goals
      </p>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '1.5rem', letterSpacing: '-0.02em',
        color: 'var(--ink)', marginBottom: '1rem', lineHeight: 1.1,
      }}>
        Where I’m headed
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {data.items?.map((it, i) => (
          <li key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '0.6rem 0',
            borderTop: i === 0 ? 'none' : '1px solid var(--line)',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--accent)', flexShrink: 0, paddingTop: 1,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{
              fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.55,
            }}>
              {it}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---- Generic bio card (used on /about canvas) ---- */
export function BioCard({ data, height }) {
  return (
    <div>
      <FrameLabel># {data.frame || 'about-me'}</FrameLabel>
      <div style={{
        ...cardBase, padding: '1.6rem 1.7rem',
        minHeight: height || 'auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--accent)', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '0.7rem',
        }}>
          {(data.kicker || '').replace(/^#\s*/, '')}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '1.7rem', letterSpacing: '-0.02em',
          color: 'var(--ink)', marginBottom: '1rem', lineHeight: 1.1,
        }}>
          {data.title}
        </h3>
        {data.paragraphs?.map((p, i) => (
          <p key={i} style={{
            fontSize: '0.96rem', color: 'var(--ink-soft)', lineHeight: 1.65,
            marginBottom: '0.85rem',
          }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ---- Numbered principle row card ---- */
export function PrincipleCard({ data }) {
  return (
    <div style={{
      ...cardBase, padding: '1.1rem 1.2rem 1.2rem',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
        color: 'var(--accent)', letterSpacing: '0.06em',
      }}>
        {data.n}
      </span>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: '1.1rem', letterSpacing: '-0.01em', color: 'var(--ink)',
        lineHeight: 1.15,
      }}>
        {data.title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.55 }}>
        {data.body}
      </p>
    </div>
  )
}

/* ---- Fact chip (Based, School, Currently, …) ---- */
export function FactCard({ data }) {
  return (
    <div style={{
      ...cardBase, padding: '0.95rem 1.05rem',
      display: 'flex', alignItems: 'flex-start', gap: 10,
    }}>
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: 8,
        background: 'var(--accent-soft)', color: 'var(--accent)',
        flexShrink: 0, fontFamily: 'var(--font-display)',
        fontWeight: 800, fontSize: '0.85rem',
      }}>
        {data.icon}
      </span>
      <div>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
          color: 'var(--ink-faint)', textTransform: 'uppercase',
          letterSpacing: '0.08em', marginBottom: 2,
        }}>
          {data.label}
        </p>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.2,
        }}>
          {data.value}
        </p>
      </div>
    </div>
  )
}

/* ---- Big page title card (used as the hero on subpage canvases) ---- */
export function PageTitle({ data }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <h1 style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: '3.2rem', lineHeight: 0.98, letterSpacing: '-0.03em',
        color: 'var(--ink)', marginBottom: '0.7rem',
      }}>
        {data.title}
      </h1>
      <p style={{
        fontSize: '1.05rem', color: 'var(--ink-soft)', lineHeight: 1.5,
        maxWidth: data.blurbWidth || 480,
      }}>
        {data.blurb}
      </p>
    </div>
  )
}

/* ---- Long-form story card ---- */
export function StoryCard({ data }) {
  return (
    <div>
      <FrameLabel># my story</FrameLabel>
      <div style={{ ...cardBase, padding: '1.75rem 2rem', position: 'relative' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--accent)', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '0.7rem',
        }}>
          {data.label}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '1.7rem', letterSpacing: '-0.02em',
          color: 'var(--ink)', marginBottom: '1rem',
        }}>
          {data.title}
        </h3>
        {data.paragraphs.map((p, i) => (
          <p key={i} style={{
            fontSize: '0.98rem', color: 'var(--ink-soft)', lineHeight: 1.65,
            marginBottom: '0.85rem',
          }}>
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

/* ---- Photo booth cabin, curtains open on hover ---- */
export function PhotoBoothCabin({ height = 320 }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        width: '100%', height,
        background: '#2a1410',
        border: '6px solid #4a2418',
        borderRadius: 10,
        boxShadow: '0 22px 42px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.25s var(--ease)',
      }}
    >
      {/* Marquee sign */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        background: 'linear-gradient(180deg,#FFD84D 0%,#E8B520 100%)',
        color: '#2a1410',
        padding: '5px 12px', borderRadius: 4,
        fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 800,
        letterSpacing: '0.18em', zIndex: 5, whiteSpace: 'nowrap',
        boxShadow: '0 0 18px rgba(255,216,77,0.55), 0 2px 4px rgba(0,0,0,0.3)',
      }}>
        PHOTO · BOOTH
      </div>

      {/* Inside (revealed when curtains part) */}
      <div style={{
        position: 'absolute', top: 52, left: 10, right: 10, bottom: 10,
        background: 'linear-gradient(180deg,#1a1a2a 0%,#0a0a16 100%)',
        borderRadius: 4,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 10, padding: '1.2rem 0.8rem', textAlign: 'center',
      }}>
        {/* Bench silhouette */}
        <span style={{
          width: '60%', height: 8, background: '#3a2a1a',
          borderRadius: '4px 4px 0 0', marginBottom: 6,
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: '#fff', letterSpacing: '0.16em',
          textTransform: 'uppercase', opacity: 0.7,
        }}>
          step inside
        </span>
        <span style={{
          fontFamily: 'var(--font-note)', fontSize: '1.25rem',
          color: '#FFD84D', lineHeight: 1.15,
        }}>
          snap a strip
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36, borderRadius: '50%',
          background: '#FFD84D', color: '#2a1410',
          transform: hover ? 'rotate(-45deg) scale(1.08)' : 'rotate(0deg)',
          transition: 'transform 0.32s var(--ease)',
          marginTop: 6,
        }}>
          <ArrowRight size={18} />
        </span>
      </div>

      {/* Curtain rod */}
      <div style={{
        position: 'absolute', top: 44, left: 6, right: 6, height: 5,
        background: 'linear-gradient(180deg,#d6b478 0%,#8b6a30 100%)',
        borderRadius: 2, zIndex: 6,
        boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
      }} />

      {/* Curtain, left half */}
      <div style={{
        position: 'absolute', top: 49, bottom: 6, left: 6,
        width: 'calc(50% - 6px)',
        background: 'repeating-linear-gradient(90deg, #b21818 0 8px, #7a0e0e 8px 14px)',
        boxShadow: 'inset -10px 0 16px rgba(0,0,0,0.45)',
        transform: hover ? 'translateX(-96%)' : 'translateX(0)',
        transition: 'transform 0.55s var(--ease)',
        zIndex: 5,
      }} />
      {/* Curtain, right half */}
      <div style={{
        position: 'absolute', top: 49, bottom: 6, right: 6,
        width: 'calc(50% - 6px)',
        background: 'repeating-linear-gradient(90deg, #7a0e0e 0 8px, #b21818 8px 14px)',
        boxShadow: 'inset 10px 0 16px rgba(0,0,0,0.45)',
        transform: hover ? 'translateX(96%)' : 'translateX(0)',
        transition: 'transform 0.55s var(--ease)',
        zIndex: 5,
      }} />
    </div>
  )
}

/* ---- Mini photo print (right-side photography zone) ---- */
export function PhotoPrint({ data }) {
  return (
    <div style={{
      background: '#FAF8F2', padding: '8px 8px 22px',
      boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
      transform: `rotate(${data.rotate || 0}deg)`,
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        flex: 1, overflow: 'hidden', background: '#222',
      }}>
        <img src={data.src} alt={data.caption}
          draggable={false} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
        color: '#5a5a52', marginTop: 6, letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {data.caption}
      </p>
    </div>
  )
}

/* ---- Sticky note ---- */
export function StickyNote({ data }) {
  return (
    <div style={{
      background: data.color, borderRadius: 3,
      padding: '1rem 1.1rem',
      transform: `rotate(${data.rotate}deg)`,
      boxShadow: '0 8px 20px rgba(24,24,26,0.14)',
      minHeight: data.tall ? 150 : 110,
      display: 'flex', flexDirection: 'column',
      justifyContent: data.link ? 'space-between' : 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-note)', fontWeight: 400,
        fontSize: '1.15rem', lineHeight: 1.4, color: '#2a2a26',
      }}>
        {data.text}
      </p>
      {data.link && (
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: '#5a5a52', marginTop: '0.7rem', letterSpacing: '0.03em',
        }}>
          {data.link}
        </p>
      )}
    </div>
  )
}

/* ---- Experience header card (sits above the case studies) ---- */
export function ExperienceCard() {
  return (
    <div>
      <FrameLabel># who am I</FrameLabel>
      <div style={{
        ...cardBase,
        padding: '1.4rem 1.7rem 1.25rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        height: '100%',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          color: 'var(--accent)', letterSpacing: '0.12em',
          textTransform: 'uppercase', marginBottom: '0.55rem',
        }}>
          . hello
        </p>
        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: '1.4rem', lineHeight: 1.3, letterSpacing: '-0.02em',
          color: 'var(--ink)', marginBottom: '0.9rem',
        }}>
          I'm an <span style={{ color: 'var(--accent)' }}>optimist</span> who
          finds order in chaos.
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          paddingTop: '0.6rem',
          borderTop: '1px solid var(--line)',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'var(--ink-soft)', letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            places I've worked at
          </span>
          <span style={{
            flex: 1, height: 1,
            background: 'repeating-linear-gradient(90deg, var(--line-strong) 0 4px, transparent 4px 8px)',
          }} />
          <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>↓</span>
        </div>
      </div>
    </div>
  )
}

/* ---- About (identity card) ---- */
function LinkedinGlyph({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.67H5.67V18h2.67V9.67zM7 6.4a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 13.4c0-2.46-1.32-3.6-3.08-3.6-1.42 0-2.06.78-2.42 1.33V9.67h-2.67V18h2.67v-4.4c0-1.16.22-2.28 1.65-2.28 1.41 0 1.43 1.32 1.43 2.35V18h2.67v-4.6z" />
    </svg>
  )
}

export function AboutCard() {
  return (
    <div>
      <FrameLabel># about</FrameLabel>
      <div style={{ ...cardBase, padding: '1.9rem 2rem', position: 'relative' }}>
        {/* LinkedIn, corner */}
        <a
          href="https://linkedin.com/in/santiagoavella"
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={e => e.stopPropagation()}
          title="LinkedIn"
          aria-label="LinkedIn"
          style={{
            position: 'absolute', top: 18, right: 18,
            width: 36, height: 36, borderRadius: 'calc(var(--radius) - 4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--canvas)', border: '1px solid var(--line)',
            color: 'var(--ink-soft)', textDecoration: 'none', cursor: 'none',
            transition: 'background 0.18s, color 0.18s, transform 0.18s var(--ease)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#0A66C2'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--canvas)'
            e.currentTarget.style.color = 'var(--ink-soft)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <LinkedinGlyph size={17} />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.3rem' }}>
          <img
            src={fotoPersonal}
            alt="Santiago Avella"
            draggable={false}
            style={{
              width: 112, height: 112,
              borderRadius: 'var(--radius)',
              objectFit: 'cover', objectPosition: 'top',
              border: 'var(--border-card)',
              boxShadow: 'var(--shadow-card)',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--ink-faint)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: '0.4rem',
            }}>
              Portfolio, 2026
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: '2.3rem', lineHeight: 1.02, letterSpacing: '-0.02em',
              color: 'var(--ink)',
            }}>
              Santiago Avella
            </h1>
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: '1.35rem', lineHeight: 1.4, letterSpacing: '-0.01em',
          color: 'var(--ink)', marginTop: '1.4rem',
        }}>
          Product designer crafting <span style={{ color: 'var(--accent)' }}>AI-native interfaces</span>
          turning complex systems into things that feel obvious.
        </p>

        <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginTop: '0.8rem' }}>
          Designed at a YC-backed startup, shipped at HubSpot, and built my own
          company from scratch. The best interfaces disappear, leaving only the outcome.
        </p>
      </div>
    </div>
  )
}
