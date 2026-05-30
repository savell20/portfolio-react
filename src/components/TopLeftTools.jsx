import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

function initialTheme() {
  const s = localStorage.getItem('theme')
  if (s === 'light' || s === 'dark') return s
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/* Top-right utility pill — light / dark theme toggle. */
export default function TopLeftTools() {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const isDark = theme === 'dark'
  const SunOrMoon = isDark ? Sun : Moon

  return (
    <div
      style={{
        position: 'fixed', top: 16, right: 16, zIndex: 9500,
        display: 'flex', alignItems: 'center', gap: 1,
        background: 'var(--surface)', border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)', padding: 4,
        boxShadow: 'var(--shadow-card)',
        animation: 'fade-in 0.5s var(--ease) both',
      }}
    >
      <button
        onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          width: 36, height: 36, border: 'none', cursor: 'none',
          borderRadius: 'calc(var(--radius-pill) - 3px)',
          background: 'transparent', color: 'var(--ink-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.15s, color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--canvas)'; e.currentTarget.style.color = 'var(--ink)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-soft)' }}
      >
        <SunOrMoon size={16} strokeWidth={2.2} />
      </button>
    </div>
  )
}
