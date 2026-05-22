import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, Music2 } from 'lucide-react'

/* SANTIAGO — swap these for your own tracks (any direct audio URL).
   These SoundHelix tracks are royalty-free placeholders. */
const TRACKS = [
  { title: 'Midnight Drive', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { title: 'Soft Focus', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { title: 'Late Studio', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
]

export default function MusicPlayer() {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  // When the track changes, keep playing if we were.
  useEffect(() => {
    const a = audioRef.current
    if (a && playing) a.play().catch(() => setPlaying(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const next = () => setI(p => (p + 1) % TRACKS.length)

  return (
    <div style={{
      position: 'fixed', left: 16, bottom: 62, zIndex: 9000,
      display: 'flex', alignItems: 'center', gap: 6,
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 10, padding: '0.35rem 0.5rem 0.35rem 0.6rem',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.3s',
    }}>
      <audio ref={audioRef} src={TRACKS[i].url} onEnded={next} preload="none" />

      <Music2 size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />

      <button
        onClick={toggle}
        title={playing ? 'Pause' : 'Play'}
        style={{
          width: 26, height: 26, borderRadius: '50%', border: 'none', cursor: 'none',
          background: 'var(--accent)', color: '#fff', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {playing ? <Pause size={12} /> : <Play size={12} style={{ marginLeft: 1 }} />}
      </button>

      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--ink)',
        minWidth: 86, maxWidth: 86, overflow: 'hidden', textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {TRACKS[i].title}
      </span>

      <button
        onClick={next}
        title="Next track"
        style={{
          width: 24, height: 24, borderRadius: 6, border: 'none', cursor: 'none',
          background: 'transparent', color: 'var(--ink-soft)', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)' }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ink-soft)' }}
      >
        <SkipForward size={13} />
      </button>
    </div>
  )
}
