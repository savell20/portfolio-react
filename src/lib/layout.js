/* ──────────────────────────────────────────────────────────────────────────
   DESIGN SYSTEM, page layout tokens for canvas-based subpages.

   Every subpage that uses <MiniCanvas /> should import these and compute its
   OBJECT positions from them so the rhythm (title → content → section →
   content) stays consistent across the whole site. Change a value here and
   every page updates.
   ────────────────────────────────────────────────────────────────────────── */

export const PAGE = {
  /* The single left margin used on every subpage canvas. */
  X: 100,

  /* Width of the main content column. Resume rows, full-width sections,
     three-column grids all add up to this. */
  W: 1204,

  /* Hero (page-title) block. */
  TITLE_Y: 80,
  TITLE_H: 160,

  /* Gap from the bottom of the page title to the next module. */
  HERO_GAP: 24,

  /* Section labels (`# Education`, `# Experience`, …). */
  LABEL_H: 50,

  /* Gap between a section label and the module beneath it. */
  LABEL_GAP: 20,

  /* Gap between adjacent siblings in the same vertical sequence (e.g. two
     resume rows in a row). */
  ROW_GAP: 16,

  /* Gap between major sections, i.e. the bottom of one section's content
     to the top of the next section's label. */
  SECTION_GAP: 56,

  /* Horizontal gutter between cards in a multi-column row. */
  COL_GAP: 24,
}

/* Derived constants, first module always lands at PAGE.TITLE_Y + PAGE.TITLE_H + PAGE.HERO_GAP. */
export const FIRST_MODULE_Y = PAGE.TITLE_Y + PAGE.TITLE_H + PAGE.HERO_GAP   // 264

/* Helper: y-coordinate of a section label that follows a content block
   ending at `prevBottom`. */
export const labelYAfter = (prevBottom) => prevBottom + PAGE.SECTION_GAP

/* Helper: y-coordinate of the module under a section label at `labelY`. */
export const moduleYAfterLabel = (labelY) => labelY + PAGE.LABEL_H + PAGE.LABEL_GAP

/* Shared initial-view helper. Every subpage MUST use this so the page
   title lands at the exact same screen position regardless of route. */
export function pageInitialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  const scale = Math.min(0.78, (w - 100) / (PAGE.W + 100), (h - 160) / 760)
  return {
    scale,
    x: w / 2 - (PAGE.X + PAGE.W / 2) * scale,
    y: 90,
  }
}
