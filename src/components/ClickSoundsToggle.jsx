import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isMuted, setMuted } from '../lib/sound'

// Tiny wrapper around lib/sound's mute API as a hook so the icon updates
// when the value changes.
function useClickMute() {
  const [muted, set] = useState(isMuted())
  const toggle = () => { const next = !muted; setMuted(next); set(next) }
  return [muted, toggle]
}

export default function ClickSoundsToggle() {
  const [muted, toggle] = useClickMute()
  const Icon = muted ? VolumeX : Volume2
  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'Click sounds: off' : 'Click sounds: on'}
      title={muted ? 'Click sounds: off' : 'Click sounds: on'}
      style={{
        position: 'fixed', top: 16, left: 130, zIndex: 9500,
        width: 36, height: 36,
        background: 'var(--surface)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-card)',
        cursor: 'none', color: muted ? 'var(--ink-faint)' : 'var(--ink-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fade-in 0.5s var(--ease) both',
        transition: 'color 0.18s, background 0.18s',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.background = 'var(--canvas)' }}
      onMouseLeave={e => { e.currentTarget.style.color = muted ? 'var(--ink-faint)' : 'var(--ink-soft)'; e.currentTarget.style.background = 'var(--surface)' }}
    >
      <Icon size={15} strokeWidth={2.2} />
    </button>
  )
}
