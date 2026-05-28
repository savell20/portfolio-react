import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Sparkles, Download, RefreshCw } from 'lucide-react'

const HD_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=90'
const PUZZLE_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
const TILES = 4 // 2x2

function shuffled() {
  const arr = [0, 1, 2, 3]
  // Pick a non-trivial scramble (not the solved order)
  while (true) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    if (arr.some((v, i) => v !== i)) return arr
  }
}

export default function Puzzle({ onClose }) {
  const [order, setOrder] = useState(() => shuffled())
  const [selected, setSelected] = useState(null)
  const [solved, setSolved] = useState(false)

  useEffect(() => {
    if (order.every((v, i) => v === i)) {
      setTimeout(() => setSolved(true), 300)
    }
  }, [order])

  const tap = (idx) => {
    if (selected === null) { setSelected(idx); return }
    if (selected === idx) { setSelected(null); return }
    setOrder(o => {
      const next = o.slice()
      ;[next[selected], next[idx]] = [next[idx], next[selected]]
      return next
    })
    setSelected(null)
  }

  const reset = () => { setOrder(shuffled()); setSelected(null); setSolved(false) }
  const download = () => {
    const a = document.createElement('a')
    a.href = HD_IMAGE
    a.download = 'santiago-avella-thanks-for-finding-it.jpg'
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return createPortal(
    <div
      onPointerDown={e => e.stopPropagation()}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99990,
        background: 'rgba(6,6,10,0.78)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fade-in 0.22s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(420px, calc(100vw - 32px))',
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius)',
          padding: '1.5rem 1.6rem 1.4rem',
          boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
          position: 'relative',
          animation: 'pop-in 0.3s var(--ease) both',
        }}
      >
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 14, right: 14,
          width: 28, height: 28, borderRadius: '50%', cursor: 'none',
          background: 'var(--canvas)', border: '1px solid var(--line)',
          color: 'var(--ink-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <X size={12} />
        </button>

        {/* Header */}
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          color: 'var(--accent)', letterSpacing: '0.14em',
          textTransform: 'uppercase', marginBottom: 6,
        }}>
          ✦ hidden puzzle
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '1.35rem', letterSpacing: '-0.02em',
          color: 'var(--ink)', marginBottom: 6,
        }}>
          {solved ? 'You found the gift 🎁' : 'You found my secret puzzle'}
        </h3>
        <p style={{
          fontSize: '0.85rem', color: 'var(--ink-soft)', lineHeight: 1.5,
          marginBottom: '1rem',
        }}>
          {solved
            ? "Thanks for poking around. Here's one of my photos in HD, a wallpaper from me to you."
            : 'Tap two tiles to swap them. Reassemble the photo to unlock a little gift.'}
        </p>

        {/* Board */}
        {!solved ? (
          <div style={{
            position: 'relative',
            width: '100%', aspectRatio: '1 / 1',
            background: '#111', borderRadius: 'calc(var(--radius) - 4px)',
            padding: 4, marginBottom: '1rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr',
            gap: 4,
          }}>
            {order.map((piece, slot) => {
              const row = Math.floor(piece / 2)
              const col = piece % 2
              const isSel = selected === slot
              return (
                <button
                  key={slot}
                  onClick={() => tap(slot)}
                  style={{
                    width: '100%', height: '100%',
                    padding: 0, border: isSel ? '3px solid var(--accent)' : '3px solid transparent',
                    borderRadius: 6, cursor: 'none',
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundSize: '200% 200%',
                    backgroundPosition: `${col * 100}% ${row * 100}%`,
                    transition: 'transform 0.15s var(--ease)',
                    transform: isSel ? 'scale(0.96)' : 'scale(1)',
                  }}
                />
              )
            })}
          </div>
        ) : (
          <div style={{
            width: '100%', aspectRatio: '1 / 1',
            background: `url(${PUZZLE_IMAGE}) center/cover`,
            borderRadius: 'calc(var(--radius) - 4px)',
            marginBottom: '1rem',
            position: 'relative', overflow: 'hidden',
            animation: 'pop-in 0.4s var(--ease) both',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 50%)',
            }} />
            <Sparkles size={32} style={{
              position: 'absolute', top: 14, right: 14, color: '#FFD84D',
              filter: 'drop-shadow(0 0 8px rgba(255,216,77,0.6))',
            }} />
            <p style={{
              position: 'absolute', bottom: 16, left: 16, right: 16,
              fontFamily: 'var(--font-note)', fontSize: '1.5rem',
              color: '#fff', lineHeight: 1.1,
            }}>
              thanks for finding me ✦
            </p>
          </div>
        )}

        {/* Actions */}
        {solved ? (
          <button
            onClick={download}
            style={{
              width: '100%', cursor: 'none',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '0.8rem 0.9rem',
              background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 8,
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 500,
            }}
          >
            <Download size={14} /> download HD wallpaper
          </button>
        ) : (
          <button
            onClick={reset}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0.55rem 0.85rem', cursor: 'none',
              background: 'var(--canvas)', border: '1px solid var(--line)',
              borderRadius: 8, color: 'var(--ink-soft)',
              fontFamily: 'var(--font-mono)', fontSize: '0.66rem',
            }}
          >
            <RefreshCw size={12} /> shuffle again
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}
