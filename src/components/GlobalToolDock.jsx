import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ToolDock from './ToolDock'
import { DRAW_COLORS } from './Canvas'

/* Top-level wrapper that mounts a single ToolDock on every page so the
   pointer / sticky / draw controls are always reachable. The dock owns
   the mode state and broadcasts changes via window events; Canvas (on
   the home page) listens and mirrors them into its own state so the
   existing sticky/draw flows keep working. */
export default function GlobalToolDock() {
  const { pathname } = useLocation()
  const [mode, setMode] = useState('select')
  const [drawColor, setDrawColor] = useState(DRAW_COLORS[0])

  // Hide on case study pages — there's no canvas to act on there.
  const hide = pathname.startsWith('/work/')

  // Reset to select whenever the route changes — sticky/draw only
  // make sense on the home canvas.
  useEffect(() => {
    const onPop = () => setMode('select')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Broadcast every change so Canvas can mirror it.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('tool-mode', { detail: { mode, drawColor } }))
    document.body.dataset.toolMode = mode
    return () => { delete document.body.dataset.toolMode }
  }, [mode, drawColor])

  const onClearDrawing = () => {
    window.dispatchEvent(new CustomEvent('tool-clear'))
  }

  if (hide) return null

  return (
    <ToolDock
      mode={mode}
      setMode={setMode}
      drawColor={drawColor}
      setDrawColor={setDrawColor}
      onClearDrawing={onClearDrawing}
    />
  )
}
