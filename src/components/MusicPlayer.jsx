import { useState, useRef, useEffect } from 'react'
import {
  X, Play, Pause, SkipBack, SkipForward, Volume2,
} from 'lucide-react'

const LS_VOL = 'music-volume-v1'

/* Santiago's favorite-music playlist (YouTube). The only source of truth. */
const PLAYLIST_ID = 'PLBFuW0T9rxlTyIxvrXFyIHdpMb-3rBQPE'
const FIRST_VIDEO_ID = 'yKNxeF4KMsY'

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
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [title, setTitle] = useState('')
  const [videoId, setVideoId] = useState(FIRST_VIDEO_ID)
  const [volume, setVolume] = useState(() => {
    const v = Number(localStorage.getItem(LS_VOL))
    return Number.isFinite(v) && v >= 0 && v <= 100 ? v : 70
  })

  const ytHostRef = useRef(null)
  const playerRef = useRef(null)

  /* Build the YouTube player once, loading Santiago's playlist. */
  useEffect(() => {
    let cancelled = false
    ytApi().then(YT => {
      const host = ytHostRef.current
      if (cancelled || !host) return
      if (playerRef.current) return
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
      playerRef.current = new YT.Player(inner, {
        width: '100%', height: '100%',
        videoId: FIRST_VIDEO_ID,
        playerVars: { list: PLAYLIST_ID, listType: 'playlist' },
        events: {
          onReady: (e) => onMeta(e.target),
          onStateChange: (e) => {
            setPlaying(e.data === 1)
            onMeta(e.target)
          },
        },
      })
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Persist + apply volume. */
  useEffect(() => {
    localStorage.setItem(LS_VOL, String(volume))
    const p = playerRef.current
    if (p && p.setVolume) { try { p.setVolume(volume) } catch { /* */ } }
  }, [volume])

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

  const cover = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : null

  /* Persistent hidden YT host (audio keeps playing regardless of UI state). */
  const hiddenYtHost = (
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
    width: 308, padding: '0.95rem 1rem 0.85rem',
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.56rem',
                color: 'var(--accent)', letterSpacing: '0.14em',
                textTransform: 'uppercase', marginBottom: 3,
              }}>
                # my favorite music
              </p>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: '0.86rem', color: 'var(--ink)',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                lineHeight: 1.2,
              }}>
                {title || 'Loading playlist…'}
              </p>
            </div>
            <button onClick={() => setExpanded(false)} title="Close" style={{ ...iconBtn, width: 24, height: 24 }}>
              <X size={13} />
            </button>
          </div>

          {/* Transport */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: '0.85rem' }}>
            <button onClick={prev} title="Previous" style={{ ...iconBtn, width: 34, height: 34 }}><SkipBack size={17} /></button>
            <button
              onClick={togglePlay}
              title={playing ? 'Pause' : 'Play'}
              style={{
                width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'none',
                background: 'var(--accent)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {playing ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 1 }} />}
            </button>
            <button onClick={next} title="Next" style={{ ...iconBtn, width: 34, height: 34 }}><SkipForward size={17} /></button>
          </div>

          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.7rem' }}>
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

        </div>
      )}
    </>
  )
}
