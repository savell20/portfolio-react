import { useState, useRef, useEffect } from 'react'
import {
  X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
} from 'lucide-react'
import { isMuted, setMuted } from '../lib/sound'

const LS_KEY = 'music-embed-url-v1'
const LS_VOL = 'music-volume-v1'

/* SANTIAGO — optionally set a default YouTube or Spotify playlist link. */
const DEFAULT_URL = ''

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

/* ---------------- Vinyl record ---------------- */

function Vinyl({ cover, playing, size = 80, onClick }) {
  const labelSize = Math.round(size * 0.42)
  return (
    <button
      onClick={onClick}
      title={cover ? 'Now playing' : 'Music'}
      style={{
        width: size, height: size, padding: 0, border: 'none',
        cursor: 'none', background: 'transparent',
        position: 'relative',
      }}
    >
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: `
          repeating-radial-gradient(circle at 50% 50%,
            rgba(255,255,255,0.045) 0 1.2px, transparent 1.2px 3px),
          radial-gradient(circle at 30% 30%, #2e2e2e 0 8%, #131313 60%, #050505 100%)
        `,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)',
        animation: 'vinyl-spin 8s linear infinite',
        animationPlayState: playing ? 'running' : 'paused',
        position: 'relative',
      }}>
        {/* center label / cover art */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: labelSize, height: labelSize,
          marginLeft: -labelSize / 2, marginTop: -labelSize / 2,
          borderRadius: '50%', overflow: 'hidden',
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--surface)',
          boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.55)',
        }}>
          {cover
            ? <img src={cover} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: labelSize * 0.45, fontWeight: 700 }}>♪</span>}
        </div>
        {/* spindle */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 6, height: 6, marginLeft: -3, marginTop: -3,
          borderRadius: '50%', background: '#070707',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.5)',
        }} />
      </div>
    </button>
  )
}

/* ---------------- Player ---------------- */

export default function MusicPlayer() {
  const [url, setUrl] = useState(() => localStorage.getItem(LS_KEY) || DEFAULT_URL)
  const [input, setInput] = useState('')
  const [bad, setBad] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [title, setTitle] = useState('')
  const [videoId, setVideoId] = useState('')
  const [volume, setVolume] = useState(() => {
    const v = Number(localStorage.getItem(LS_VOL))
    return Number.isFinite(v) && v >= 0 && v <= 100 ? v : 70
  })
  const [clickMuted, setClickMutedState] = useState(isMuted())

  const parsed = parse(url)
  const ytHostRef = useRef(null)
  const playerRef = useRef(null)

  /* Build / rebuild the YT player when the url changes. */
  useEffect(() => {
    if (!parsed || parsed.platform !== 'youtube') {
      if (playerRef.current) { try { playerRef.current.destroy() } catch { /* */ } playerRef.current = null }
      setVideoId(''); setTitle(''); setPlaying(false)
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
      const onMeta = (p) => {
        const d = p && p.getVideoData && p.getVideoData()
        if (d) {
          if (d.video_id) setVideoId(d.video_id)
          if (d.title) setTitle(d.title)
        }
        try { p.unMute(); p.setVolume(volume) } catch { /* */ }
      }
      const opts = {
        width: '100%', height: '100%',
        playerVars: parsed.kind === 'playlist'
          ? { listType: 'playlist', list: parsed.list }
          : (parsed.list ? { list: parsed.list } : {}),
        events: {
          onReady: (e) => onMeta(e.target),
          onStateChange: (e) => {
            setPlaying(e.data === 1)
            onMeta(e.target)
          },
        },
      }
      if (parsed.kind === 'video') opts.videoId = parsed.videoId
      playerRef.current = new YT.Player(inner, opts)
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  /* Persist + apply volume to the YT player. */
  useEffect(() => {
    localStorage.setItem(LS_VOL, String(volume))
    const p = playerRef.current
    if (p && p.setVolume) { try { p.setVolume(volume) } catch { /* */ } }
  }, [volume])

  const submit = () => {
    const p = parse(input)
    if (!p) { setBad(true); return }
    setBad(false)
    const v = input.trim()
    setUrl(v); localStorage.setItem(LS_KEY, v)
    setInput(''); setTitle(''); setVideoId('')
  }
  const clear = () => {
    setUrl(''); localStorage.removeItem(LS_KEY)
    setPlaying(false); setTitle(''); setVideoId('')
  }
  const togglePlay = () => {
    const p = playerRef.current; if (!p) return
    if (playing) {
      p.pauseVideo()
    } else {
      try { p.unMute(); p.setVolume(volume) } catch { /* */ }
      p.playVideo()
    }
  }
  const next = () => { const p = playerRef.current; if (p && p.nextVideo) p.nextVideo() }
  const prev = () => { const p = playerRef.current; if (p && p.previousVideo) p.previousVideo() }
  const toggleClickMute = () => { const v = !clickMuted; setMuted(v); setClickMutedState(v) }

  const cover = parsed && parsed.platform === 'youtube' && videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : null

  /* Persistent hidden YT host (audio keeps playing regardless of UI state). */
  const hiddenYtHost = parsed && parsed.platform === 'youtube' && (
    <div
      ref={ytHostRef}
      aria-hidden
      style={{
        position: 'fixed', top: -9999, left: -9999, width: 1, height: 1,
        opacity: 0, pointerEvents: 'none',
      }}
    />
  )

  const panelStyle = {
    position: 'fixed', bottom: 90, left: 16, zIndex: 9500,
    width: 308, padding: '0.85rem',
    background: 'var(--surface)', border: 'var(--border-card)',
    borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-card)',
    animation: 'pop-in 0.22s var(--ease) both',
  }
  const iconBtn = {
    background: 'transparent', border: 'none', cursor: 'none',
    color: 'var(--ink-soft)', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  }

  return (
    <>
      {/* Vinyl — always visible (bottom-left, compact) */}
      <div style={{
        position: 'fixed', bottom: 16, left: 16, zIndex: 9500,
        animation: 'fade-in 0.5s var(--ease) both', animationDelay: '0.2s',
      }}>
        <Vinyl cover={cover} playing={playing} size={62} onClick={() => setExpanded(e => !e)} />
      </div>

      {hiddenYtHost}

      {/* Expanded panel */}
      {expanded && (
        <div style={panelStyle}>
          {/* header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--ink)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1,
            }}>
              {parsed
                ? (parsed.platform === 'youtube' ? (title || 'YouTube — loading…') : 'Spotify')
                : 'Music corner'}
            </span>
            <button onClick={() => setExpanded(false)} title="Close" style={{ ...iconBtn, width: 24, height: 24 }}>
              <X size={13} />
            </button>
          </div>

          {/* Controls per platform */}
          {parsed && parsed.platform === 'youtube' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: '0.75rem' }}>
                <button onClick={prev} title="Previous" style={{ ...iconBtn, width: 32, height: 32 }}><SkipBack size={16} /></button>
                <button
                  onClick={togglePlay}
                  title={playing ? 'Pause' : 'Play'}
                  style={{
                    width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'none',
                    background: 'var(--accent)', color: 'var(--surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {playing ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: 1 }} />}
                </button>
                <button onClick={next} title="Next" style={{ ...iconBtn, width: 32, height: 32 }}><SkipForward size={16} /></button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.8rem' }}>
                <Volume2 size={13} style={{ color: 'var(--ink-faint)', flexShrink: 0 }} />
                <input
                  type="range" min={0} max={100} value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--accent)' }}
                />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--ink-faint)',
                  minWidth: 22, textAlign: 'right',
                }}>
                  {volume}
                </span>
              </div>
            </>
          )}

          {parsed && parsed.platform === 'spotify' && (
            <div style={{ marginBottom: '0.75rem', borderRadius: 8, overflow: 'hidden' }}>
              <iframe
                title="Spotify player"
                src={parsed.src}
                width="100%" height="152" frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                style={{ display: 'block', border: 'none' }}
              />
            </div>
          )}

          {!parsed && (
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
                cursor: 'none', border: 'none', borderRadius: 7, padding: '0 0.65rem',
                background: 'var(--accent)', color: 'var(--surface)',
                display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              }}
            >
              <Play size={11} /> play
            </button>
          </div>

          {bad && (
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--accent)', marginTop: '0.4rem',
            }}>
              Use a Spotify (open.spotify.com) or YouTube link.
            </p>
          )}

          {/* Footer: click-sound mute + clear */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.7rem' }}>
            <button
              onClick={toggleClickMute}
              title={clickMuted ? 'Click sounds: off' : 'Click sounds: on'}
              style={{
                ...iconBtn, gap: 5, padding: '0.25rem 0.45rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.04em',
              }}
            >
              {clickMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              clicks {clickMuted ? 'off' : 'on'}
            </button>
            {parsed && (
              <button
                onClick={clear}
                style={{
                  background: 'none', border: 'none', cursor: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--ink-faint)',
                  padding: 0,
                }}
              >
                clear
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
