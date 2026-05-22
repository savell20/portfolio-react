import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      style={{
        position: 'fixed', bottom: 16, left: 16, zIndex: 9500,
        display: 'flex', alignItems: 'center', gap: '0.45rem',
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 10, padding: '0.5rem 0.7rem', cursor: 'none',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        color: 'var(--ink-soft)', transition: 'color 0.18s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink-soft)')}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 500,
        letterSpacing: '0.04em',
      }}>
        {isDark ? 'light' : 'dark'}
      </span>
    </button>
  )
}
