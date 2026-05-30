/* ──────────────────────────────────────────────────────────────────────────
   CANVAS BOUNDS — single source of truth for pan borders + zoom limits.

   Both the full Canvas (home) and MiniCanvas (every subpage) import these,
   so changing a value here updates the border / zoom behaviour across the
   ENTIRE website at once.
   ────────────────────────────────────────────────────────────────────────── */

// Minimum px of content that must stay on screen while panning. Higher =
// tighter (less drift into empty space). Horizontal is tighter than vertical.
export const KEEP_X = 1200
export const KEEP_Y = 440

// Hard zoom range.
export const MAX_SCALE = 2.2
export const MIN_SCALE = 0.4

// How far below the opening view the user may zoom out (1 = not at all,
// 0.85 = 15% looser). Applied as initialView.scale * this.
export const MIN_SCALE_FACTOR = 0.85

// Below this many px of visible content, show the "feeling lost?" nudge.
export const LOST_THRESHOLD = 140
