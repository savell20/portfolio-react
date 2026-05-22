// Decorative film sprocket-hole strip — dark rebate band with paper-cut holes.
export default function FilmEdge({ orientation = 'horizontal', count = 22, thickness = 17 }) {
  const horizontal = orientation === 'horizontal'
  return (
    <div
      aria-hidden
      style={{
        background: 'var(--rebate)',
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: horizontal ? '0 10px' : '10px 0',
        width: horizontal ? '100%' : thickness,
        height: horizontal ? thickness : '100%',
        flexShrink: 0,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            background: 'var(--paper)',
            borderRadius: 1.5,
            width: horizontal ? 13 : 7,
            height: horizontal ? 7 : 13,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}
