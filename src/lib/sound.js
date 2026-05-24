// Tiny Web Audio click/pop sounds — no asset files.
let ctx = null
let muted = localStorage.getItem('sound-muted') === '1'

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    try { ctx = new AC() } catch { return null }
  }
  // Browsers ship the context in "suspended" until a user gesture unlocks it.
  // Resume returns a Promise we don't need to await — once the gesture has
  // happened, subsequent calls will be running.
  if (ctx.state === 'suspended') { try { ctx.resume() } catch { /* noop */ } }
  return ctx
}

// A short shaped blip.
function blip({ freq = 440, dur = 0.06, type = 'sine', gain = 0.12 }) {
  if (muted) return
  const c = ac()
  if (!c) return
  try {
    const osc = c.createOscillator()
    const g = c.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, c.currentTime)
    g.gain.setValueAtTime(0, c.currentTime)
    g.gain.linearRampToValueAtTime(gain, c.currentTime + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur)
    osc.connect(g)
    g.connect(c.destination)
    osc.start()
    osc.stop(c.currentTime + dur)
  } catch { /* AudioContext can throw if it's still locked */ }
}

export function playClick() {
  blip({ freq: 320, dur: 0.045, type: 'triangle', gain: 0.07 })
}

export function playPop() {
  blip({ freq: 540, dur: 0.07, type: 'sine', gain: 0.13 })
  setTimeout(() => blip({ freq: 760, dur: 0.09, type: 'sine', gain: 0.1 }), 45)
}

// A plucked-string-like arpeggio (C major: C E G C). Sawtooth through a
// quickly-closing lowpass gives an acoustic-guitar feel without samples.
export function playGuitarChord() {
  if (muted) return
  const c = ac()
  if (!c) return
  const notes = [261.63, 329.63, 392.00, 523.25]
  notes.forEach((freq, i) => {
    setTimeout(() => {
      try {
        const osc = c.createOscillator()
        const filter = c.createBiquadFilter()
        const g = c.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(freq, c.currentTime)
        filter.type = 'lowpass'
        filter.Q.value = 1.2
        filter.frequency.setValueAtTime(2200, c.currentTime)
        filter.frequency.exponentialRampToValueAtTime(380, c.currentTime + 0.7)
        g.gain.setValueAtTime(0, c.currentTime)
        g.gain.linearRampToValueAtTime(0.07, c.currentTime + 0.015)
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 1.3)
        osc.connect(filter); filter.connect(g); g.connect(c.destination)
        osc.start()
        osc.stop(c.currentTime + 1.5)
      } catch { /* noop */ }
    }, i * 90)
  })
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  localStorage.setItem('sound-muted', value ? '1' : '0')
}

// Global click feedback for interactive elements.
let installed = false
export function installClickSounds() {
  if (installed) return
  installed = true

  // Unlock the AudioContext on the very first interaction (autoplay policy).
  const unlock = () => { ac() }
  window.addEventListener('pointerdown', unlock, { capture: true, once: true })
  window.addEventListener('keydown', unlock, { capture: true, once: true })

  // CAPTURE PHASE: fires before any child handler can call stopPropagation()
  // (e.g. ToolDock buttons, photobooth controls, etc.). Without this, every
  // button that stops pointerdown propagation would also silence its click.
  const onAnyPointer = (e) => {
    const t = e.target
    if (t && t.closest && t.closest('button, a, [data-clicky]')) playClick()
  }
  window.addEventListener('pointerdown', onAnyPointer, { capture: true })
}
