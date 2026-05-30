/* ──────────────────────────────────────────────────────────────────────────
   CANVAS BOUNDS — single source of truth for pan borders + zoom limits.

   Both the full Canvas (home) and MiniCanvas (every subpage) import these and
   call clampCanvasView(), so the border / zoom behaviour is IDENTICAL across
   the entire website. Change a value here → every page updates.
   ────────────────────────────────────────────────────────────────────────── */

// How much empty space (px) the user may drift beyond the content on any
// side, on every page. This is the only "tightness" knob — bigger = looser.
// It's a margin (not a "keep N px of content"), so it feels the same whether
// the page content is narrow (subpages) or wide (home).
export const PAN_MARGIN = 260

// Hard zoom range.
export const MAX_SCALE = 2.2
export const MIN_SCALE = 0.4

// How far below the opening view the user may zoom out (1 = not at all,
// 0.85 = 15% looser). Applied as initialView.scale * this.
export const MIN_SCALE_FACTOR = 0.85

// Below this many px of visible content, show the "feeling lost?" nudge.
export const LOST_THRESHOLD = 140

/* Clamp a view so the user can pan until at most PAN_MARGIN px of empty space
   shows beyond the content — on every axis, every page. When the content is
   smaller than the viewport on an axis it stays centred (± PAN_MARGIN drift);
   when it's larger you can scroll across all of it (+ PAN_MARGIN overscroll). */
export function clampCanvasView(v, bounds, vw, vh) {
  if (!bounds) return v
  const M = PAN_MARGIN
  const cW = (bounds.maxX - bounds.minX) * v.scale
  const cH = (bounds.maxY - bounds.minY) * v.scale

  let x
  if (cW <= vw) {
    const xc = (vw - cW) / 2 - bounds.minX * v.scale   // centred
    x = Math.min(Math.max(v.x, xc - M), xc + M)
  } else {
    const lowerX = vw - M - bounds.maxX * v.scale
    const upperX = M - bounds.minX * v.scale
    x = Math.min(Math.max(v.x, lowerX), upperX)
  }

  let y
  if (cH <= vh) {
    const yc = (vh - cH) / 2 - bounds.minY * v.scale
    y = Math.min(Math.max(v.y, yc - M), yc + M)
  } else {
    const lowerY = vh - M - bounds.maxY * v.scale
    const upperY = M - bounds.minY * v.scale
    y = Math.min(Math.max(v.y, lowerY), upperY)
  }

  return { ...v, x, y }
}
