import { useState, useRef, useEffect } from 'react'
import { Music2, X, Play, Pause, SkipBack, SkipForward, Minus, Maximize2 } from 'lucide-react'

const LS_KEY = 'music-embed-url-v1'

/* SANTIAGO — optionally set a default playlist (YouTube or Spotify link). */
const DEFAULT_URL = ''

// Parse a pasted Spotify / YouTube link.
function parse(raw) {
  if (!raw) return null
  let u
  try { u = new URL(raw.trim()) } catch { return null }
  const host = u.hostname.replace(/^www\.|^m\./, '')

  if (host === 'open.spotify.com') {
    const [type, id] = u.pathname.split('/').filter(Boolean)
    if (type && id) return { platform: 'spotify', src: `https://open.spotify.com/embed/${type}/${id}` }
  }
  if (host === 'youtube.com') {
    const list = u.searchParams.get('list')
    const v = u.searchParams.get('v')
    if (u.pathname === '/playlist' && list) return { platform: 'youtube', kind: 'playlist', list }
    if (v) return { platform: 'youtube', kind: 'video', videoId: v, list }
  }
  if (host === 'youtu.be') {
    const id = u.pathname.split('/').filter(Boolean)[0]
    if (id) return { platform: 'youtube', kind: 'video', videoId: id }
  }
  return null
}

// Load the YouTube IFrame Player API once.
let ytReady = null
function ytApi() {
  if (ytReady) return ytReady
  ytReady = new Promise(resolve => {
    if (window.YT && window.YT.Player) return resolve(window.YT)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(window.YT) }
    if (![...document.scripts].some(s => s.src.includes('iframe_api'))) {
      const t = document.createElement('script')
      t.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(t)
    }
  })
  return ytReady
}

const shell = {
  position: 'fixed', left: 16, bottom: 62, zIndex: 9000,
  background: 'var(--surface)', border: '1px solid var(--line)',
  borderRadius: 12, boxShadow: '0 8px 28px rgba(0,0,0,0.16)',
}
const iconBtn = {
  border: 'none', background: 'transparent', cursor: 'none',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--ink-soft)',
}

export default function MusicPlayer() {
  const [url, setUrl] = useState(() => localStorage.getItem(LS_KEY) || DEFAULT_URL)
  const [input, setInput] = useState('')
  const [bad, setBad] = useState(false)
  const [opened, setOpened] = useState(false)
  const [mini, setMini] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [title, setTitle] = useState('')

  const parsed = parse(url)
  const ytHostRef = useRef(null)
  const playerRef = useRef(null)

  // Manage the YouTube player across url changes — it stays mounted while a
  // link is loaded, so collapsing the panel never stops playback.
  useEffect(() => {
    if (!parsed || parsed.platform !== 'youtube') {
      if (playerRef.current) { try { playerRef.current.destroy() } catch { /* */ } playerRef.current = null }
      return
    }
    let cancelled = false
    ytApi().then(YT => {
      const host = ytHostRef.current
      if (cancelled || !host) return
      if (playerRef.current) { try { playerRef.current.destroy() } catch { /* */ } playerRef.current = null }
      host.innerHTML = ''
      const inner = document.createElement('div')
      host.appendChild(inner)
      const opts = {
        width: '100%', height: '100%',
        playerVars: parsed.kind === 'playlist'
          ? { listType: 'playlist', list: parsed.list }
          : (parsed.list ? { list: parsed.list } : {}),
        events: {
          onReady: (e) => setTitle(e.target.getVideoData()?.title || ''),
          onStateChange: (e) => {
            setPlaying(e.data === 1)
            const d = e.target.getVideoData && e.target.getVideoData()
            if (d && d.title) setTitle(d.title)
          },
        },
      }
      if (parsed.kind === 'video') opts.videoId = parsed.videoId
      playerRef.current = new YT.Player(inner, opts)
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const submit = () => {
    const p = parse(input)
    if (!p) { setBad(true); return }
    setBad(false)
    const v = input.trim()
    setUrl(v)
    localStorage.setItem(LS_KEY, v)
    setInput('')
    setTitle('')
    setMini(false)
  }
  const clear = () => {
    setUrl(''); localStorage.removeItem(LS_KEY)
    setPlaying(false); setTitle('')
  }

  const yt = () => playerRef.current
  const togglePlay = () => {
    const p = yt()
    if (!p) return
    if (playing) p.pauseVideo()
    else p.playVideo()
  }
  const next = () => { const p = yt(); if (p && p.nextVideo) p.nextVideo() }
  const prev = () => { const p = yt(); if (p && p.previousVideo) p.previousVideo() }

  /* ---------- collapsed pill (nothing loaded yet) ---------- */
  if (!parsed && !opened) {
    return (
      <button
        onClick={() => setOpened(true)}
        style={{
          ...shell, display: 'flex', alignItems: 'center', gap: 6,
          padding: '0.45rem 0.7rem', cursor: 'none',
          fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--ink)',
          animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.3s',
        }}
      >
        <Music2 size={13} style={{ color: 'var(--accent)' }} /> music
      </button>
    )
  }

  /* ---------- YouTube player host (kept mounted whenever a YT link is loaded) ---------- */
  const ytHost = parsed && parsed.platform === 'youtube' && (
    <div
      ref={ytHostRef}
      style={{
        width: mini ? 96 : '100%',
        height: mini ? 54 : 176,
        flexShrink: 0,
        borderRadius: 8, overflow: 'hidden', background: '#000',
      }}
    />
  )
  const spotifyEmbed = parsed && parsed.platform === 'spotify' && (
    <iframe
      title="Spotify player"
      src={parsed.src}
      width="100%"
      height={mini ? 80 : 152}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      style={{ display: 'block', border: 'none', borderRadius: 8 }}
    />
  )

  /* ---------- minimized bar ---------- */
  if (mini && parsed) {
    return (
      <div style={{ ...shell, width: 288, padding: '0.55rem 0.6rem', animation: 'pop-in 0.22s var(--ease) both' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--ink-soft)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 210,
          }}>
            {parsed.platform === 'youtube' ? (title || 'now playing') : 'Spotify — now playing'}
          </span>
          <button onClick={() => setMini(false)} title="Expand" style={{ ...iconBtn, width: 22, height: 22 }}>
            <Maximize2 size={13} />
          </button>
        </div>

        {parsed.platform === 'youtube' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {ytHost}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button onClick={prev} title="Previous" style={{ ...iconBtn, width: 30, height: 30 }}>
                <SkipBack size={15} />
              </button>
              <button
                onClick={togglePlay}
                title={playing ? 'Pause' : 'Play'}
                style={{
                  width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'none',
                  background: 'var(--accent)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {playing ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 1 }} />}
              </button>
              <button onClick={next} title="Next" style={{ ...iconBtn, width: 30, height: 30 }}>
                <SkipForward size={15} />
              </button>
            </div>
          </div>
        ) : (
          spotifyEmbed
        )}
      </div>
    )
  }

  /* ---------- expanded panel ---------- */
  return (
    <div style={{ ...shell, width: 320, padding: '0.7rem', animation: 'pop-in 0.22s var(--ease) both' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 500, color: 'var(--ink)',
        }}>
          <Music2 size={13} style={{ color: 'var(--accent)' }} /> Music corner
        </span>
        <button
          onClick={() => (parsed ? setMini(true) : setOpened(false))}
          title={parsed ? 'Minimize' : 'Close'}
          style={{ ...iconBtn, width: 22, height: 22 }}
        >
          {parsed ? <Minus size={14} /> : <X size={13} />}
        </button>
      </div>

      {parsed ? (
        <div style={{ marginBottom: '0.6rem' }}>
          {parsed.platform === 'youtube' ? ytHost : spotifyEmbed}
        </div>
      ) : (
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-soft)',
          lineHeight: 1.6, marginBottom: '0.6rem',
        }}>
          🎧 Paste a Spotify or YouTube playlist link to start.
        </p>
      )}

      <div style={{ display: 'flex', gap: 5 }}>
        <input
          value={input}
          onChange={(e) => { setInput(e.target.value); setBad(false) }}
          onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
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
          onClick={submit}
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
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--accent)', marginTop: '0.4rem' }}>
          Use a Spotify (open.spotify.com) or YouTube link.
        </p>
      )}
      {parsed && (
        <button
          onClick={clear}
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
