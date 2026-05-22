import { useState } from 'react'
import { Music2, X, Play } from 'lucide-react'

const LS_KEY = 'music-embed-url-v1'

/* SANTIAGO — optionally set a default playlist here (a YouTube or Spotify
   playlist/video link). Leave '' to start with the paste prompt. */
const DEFAULT_URL = ''

// Turn a pasted Spotify or YouTube link into an embeddable iframe src.
function toEmbed(raw) {
  if (!raw) return null
  const url = raw.trim()
  let u
  try { u = new URL(url) } catch { return null }
  const host = u.hostname.replace(/^www\.|^m\./, '')

  if (host === 'open.spotify.com') {
    const parts = u.pathname.split('/').filter(Boolean) // [type, id]
    if (parts.length >= 2) {
      return { type: 'spotify', src: `https://open.spotify.com/embed/${parts[0]}/${parts[1]}` }
    }
  }
  if (host === 'youtube.com') {
    const list = u.searchParams.get('list')
    const v = u.searchParams.get('v')
    if (u.pathname === '/playlist' && list)
      return { type: 'youtube', src: `https://www.youtube.com/embed/videoseries?list=${list}` }
    if (v)
      return { type: 'youtube', src: `https://www.youtube.com/embed/${v}${list ? `?list=${list}` : ''}` }
    if (u.pathname.startsWith('/embed/'))
      return { type: 'youtube', src: url }
  }
  if (host === 'youtu.be') {
    const id = u.pathname.split('/').filter(Boolean)[0]
    if (id) return { type: 'youtube', src: `https://www.youtube.com/embed/${id}` }
  }
  return null
}

export default function MusicPlayer() {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState(() => localStorage.getItem(LS_KEY) || DEFAULT_URL)
  const [input, setInput] = useState('')
  const [bad, setBad] = useState(false)

  const embed = toEmbed(url)

  const play = () => {
    const e = toEmbed(input)
    if (!e) { setBad(true); return }
    setBad(false)
    setUrl(input.trim())
    localStorage.setItem(LS_KEY, input.trim())
    setInput('')
  }

  // Collapsed pill
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', left: 16, bottom: 62, zIndex: 9000,
          display: 'flex', alignItems: 'center', gap: 6, cursor: 'none',
          background: 'var(--surface)', border: '1px solid var(--line)',
          borderRadius: 10, padding: '0.45rem 0.7rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--ink)',
          animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.3s',
        }}
      >
        <Music2 size={13} style={{ color: 'var(--accent)' }} />
        {embed ? 'now playing' : 'music'}
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed', left: 16, bottom: 62, zIndex: 9000, width: 320,
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 12, padding: '0.7rem', boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
      animation: 'pop-in 0.25s var(--ease) both',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 500, color: 'var(--ink)',
        }}>
          <Music2 size={13} style={{ color: 'var(--accent)' }} /> Music corner
        </span>
        <button
          onClick={() => setOpen(false)}
          style={{
            width: 22, height: 22, borderRadius: 6, border: 'none', cursor: 'none',
            background: 'transparent', color: 'var(--ink-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={13} />
        </button>
      </div>

      {/* Player */}
      {embed ? (
        <div style={{ borderRadius: 8, overflow: 'hidden', marginBottom: '0.6rem' }}>
          <iframe
            title="Music player"
            src={embed.src}
            width="100%"
            height={embed.type === 'spotify' ? 152 : 174}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ display: 'block', border: 'none' }}
          />
        </div>
      ) : (
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-soft)',
          lineHeight: 1.6, marginBottom: '0.6rem',
        }}>
          🎧 Paste a Spotify or YouTube playlist link to start.
        </p>
      )}

      {/* Paste box */}
      <div style={{ display: 'flex', gap: 5 }}>
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); setBad(false) }}
          onKeyDown={(e) => { if (e.key === 'Enter') play() }}
          placeholder="paste a Spotify / YouTube link"
          style={{
            flex: 1, minWidth: 0, padding: '0.45rem 0.55rem',
            background: 'var(--canvas)', borderRadius: 7,
            border: `1px solid ${bad ? 'var(--accent)' : 'var(--line)'}`,
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink)',
            outline: 'none',
          }}
        />
        <button
          onClick={play}
          style={{
            cursor: 'none', border: 'none', borderRadius: 7, padding: '0 0.7rem',
            background: 'var(--accent)', color: '#fff',
            display: 'flex', alignItems: 'center', gap: 4,
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
          }}
        >
          <Play size={11} /> play
        </button>
      </div>

      {bad && (
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--accent)',
          marginTop: '0.4rem',
        }}>
          Use a Spotify (open.spotify.com) or YouTube link.
        </p>
      )}
      {embed && (
        <button
          onClick={() => { setUrl(''); localStorage.removeItem(LS_KEY) }}
          style={{
            background: 'none', border: 'none', cursor: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--ink-faint)',
            marginTop: '0.45rem', padding: 0,
          }}
        >
          clear
        </button>
      )}
    </div>
  )
}
