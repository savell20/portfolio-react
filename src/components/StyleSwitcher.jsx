import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

function initialTheme() {
  const s = localStorage.getItem('theme')
  if (s === 'light' || s === 'dark') return s
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function StyleSwitcher() {
  const [theme, setTheme] = useState(initialTheme)
  const [bumped, setBumped] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const isDark = theme === 'dark'
  const toggle = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
    setBumped(true)
    setTimeout(() => setBumped(false), 360)
  }

  const SLOT = 28
  const PAD = 4
  const knobLeft = isDark ? SLOT + PAD : PAD

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light' : 'Switch to dark'}
      style={{
        position: 'fixed', top: 16, left: 16, zIndex: 9500,
        width: SLOT * 2 + PAD * 2, height: SLOT + PAD * 2,
        padding: 0, cursor: 'none',
        background: 'var(--surface)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-card)',
        animation: 'fade-in 0.5s var(--ease) both',
        overflow: 'hidden',
      }}
    >
      {/* sliding knob (accent) */}
      <span
        aria-hidden
        style={{
          position: 'absolute', top: PAD, left: knobLeft,
          width: SLOT, height: SLOT,
          borderRadius: 'calc(var(--radius-pill) - 2px)',
          background: 'var(--accent)',
          transition: 'left 0.36s cubic-bezier(0.5, 1.4, 0.5, 1), transform 0.32s var(--ease)',
          transform: bumped ? 'scale(0.88)' : 'scale(1)',
        }}
      />

      {/* sun slot */}
      <span style={{
        position: 'absolute', top: PAD, left: PAD,
        width: SLOT, height: SLOT,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isDark ? 'var(--ink-soft)' : 'var(--surface)',
        transition: 'color 0.28s ease, transform 0.28s var(--ease)',
        transform: !isDark && bumped ? 'rotate(40deg) scale(1.08)' : 'rotate(0) scale(1)',
        pointerEvents: 'none',
      }}>
        <Sun size={14} strokeWidth={2.4} />
      </span>

      {/* moon slot */}
      <span style={{
        position: 'absolute', top: PAD, left: SLOT + PAD,
        width: SLOT, height: SLOT,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isDark ? 'var(--surface)' : 'var(--ink-soft)',
        transition: 'color 0.28s ease, transform 0.28s var(--ease)',
        transform: isDark && bumped ? 'rotate(-25deg) scale(1.08)' : 'rotate(0) scale(1)',
        pointerEvents: 'none',
      }}>
        <Moon size={13} strokeWidth={2.4} fill="currentColor" />
      </span>
    </button>
  )
}
