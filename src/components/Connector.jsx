// A FigJam-style connector — curved dashed line between two canvas points.
// Rendered as an SVG <g>; place inside the Canvas SVG layer.
// Colors use the `style` prop so CSS vars resolve (and theme-switch works).
export default function Connector({ x1, y1, x2, y2, label }) {
  const dx = x2 - x1
  const dy = y2 - y1
  const horizontal = Math.abs(dx) > Math.abs(dy)

  const c1 = horizontal ? [x1 + dx * 0.5, y1] : [x1, y1 + dy * 0.5]
  const c2 = horizontal ? [x2 - dx * 0.5, y2] : [x2, y2 - dy * 0.5]

  const d = `M ${x1},${y1} C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${x2},${y2}`
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const labelW = label ? label.length * 6.6 + 14 : 0

  return (
    <g>
      <path
        d={d}
        strokeWidth={2.5}
        strokeDasharray="6 6"
        strokeLinecap="round"
        opacity={0.9}
        style={{ fill: 'none', stroke: 'var(--accent)' }}
      />
      <circle cx={x1} cy={y1} r={5} strokeWidth={2.5}
        style={{ fill: 'var(--canvas)', stroke: 'var(--accent)' }} />
      <circle cx={x2} cy={y2} r={5} style={{ fill: 'var(--accent)' }} />
      {label && (
        <g>
          <rect
            x={mx - labelW / 2} y={my - 9}
            width={labelW} height={18} rx={4}
            strokeWidth={1}
            style={{ fill: 'var(--canvas)', stroke: 'var(--line-strong)' }}
          />
          <text
            x={mx} y={my + 3.4} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" fontSize={9}
            letterSpacing="0.03em"
            style={{ fill: 'var(--ink-soft)' }}
          >
            {label}
          </text>
        </g>
      )}
    </g>
  )
}
