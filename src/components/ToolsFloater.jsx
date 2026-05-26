import { useState, useEffect } from 'react'
import { Sun, Moon, HelpCircle, Volume2, VolumeX } from 'lucide-react'
import { isMuted, setMuted } from '../lib/sound'
import Tutorial from './Tutorial'

function initialTheme() {
  const s = localStorage.getItem('theme')
  if (s === 'light' || s === 'dark') return s
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function IconBtn({ onClick, title, children, dim }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      style={{
        width: 32, height: 32, border: 'none', cursor: 'none',
        borderRadius: 'calc(var(--radius-pill) - 3px)',
        background: 'transparent',
        color: dim ? 'var(--ink-faint)' : 'var(--ink-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--canvas)'; e.currentTarget.style.color = 'var(--ink)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = dim ? 'var(--ink-faint)' : 'var(--ink-soft)' }}
    >
      {children}
    </button>
  )
}

/* Bottom-right utility cluster — sits just above the zoom Toolbar.
   Toggle (theme) · Help (tutorial) · Click sounds. */
export default function ToolsFloater() {
  const [theme, setTheme] = useState(initialTheme)
  const [clickMuted, setClickMutedState] = useState(isMuted())
  const [tutOpen, setTutOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const isDark = theme === 'dark'
  const SunOrMoon = isDark ? Sun : Moon

  return (
    <>
      <div
        style={{
          position: 'fixed', bottom: 64, right: 16, zIndex: 9500,
          display: 'flex', alignItems: 'center', gap: 1,
          background: 'var(--surface)', border: 'var(--border-card)',
          borderRadius: 'var(--radius-pill)', padding: 4,
          boxShadow: 'var(--shadow-card)',
          animation: 'fade-in 0.5s var(--ease) both',
        }}
      >
        <IconBtn onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
                 title={isDark ? 'Switch to light' : 'Switch to dark'}>
          <SunOrMoon size={15} strokeWidth={2.2} />
        </IconBtn>
        <IconBtn onClick={() => setTutOpen(true)} title="Show tutorial">
          <HelpCircle size={15} strokeWidth={2.2} />
        </IconBtn>
        <IconBtn
          onClick={() => { const v = !clickMuted; setMuted(v); setClickMutedState(v) }}
          title={clickMuted ? 'Click sounds: off' : 'Click sounds: on'}
          dim={clickMuted}
        >
          {clickMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </IconBtn>
      </div>

      <Tutorial __externalOpen={tutOpen} __setOpen={setTutOpen} />
    </>
  )
}
