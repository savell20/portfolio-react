// A FigJam-style connector — curved dashed line between two canvas points.
// Rendered as an SVG <g>; place inside the Canvas SVG layer.
const ACCENT = '#2F5CFF'
const CANVAS = '#F1F0ED'
const LINE = '#D2D1CC'
const INK_SOFT = '#6A6A70'

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
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        strokeDasharray="2 7"
        strokeLinecap="round"
        opacity={0.5}
      />
      <circle cx={x1} cy={y1} r={4} fill={CANVAS} stroke={ACCENT} strokeWidth={2} />
      <circle cx={x2} cy={y2} r={4} fill={ACCENT} />
      {label && (
        <g>
          <rect
            x={mx - labelW / 2} y={my - 9}
            width={labelW} height={18} rx={4}
            fill={CANVAS} stroke={LINE} strokeWidth={1}
          />
          <text
            x={mx} y={my + 3.4} textAnchor="middle"
            fontFamily="'JetBrains Mono', monospace" fontSize={9}
            fill={INK_SOFT} letterSpacing="0.03em"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  )
}
