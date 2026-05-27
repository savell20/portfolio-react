import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, StickyNote } from '../components/CanvasCards'

const OBJECTS = [
  { id: 'title', type: 'title', x: 80, y: 80, w: 540, h: 220,
    data: {
      kicker: '# testimonials',
      title: 'What people say.',
      blurb: 'Past teammates, PMs, engineers, design leads — honest words from the people I’ve actually shipped with.',
    } },

  { id: 'q-1', type: 'sticky', x: 80, y: 360, w: 280, h: 200, draggable: true,
    data: { text: '"Santi turns ambiguity into shipped product faster than anyone I\'ve worked with."\n— Maria, PM at Zolvo',
      color: 'var(--sticky-blue)', rotate: -3, tall: true } },
  { id: 'q-2', type: 'sticky', x: 400, y: 380, w: 280, h: 200, draggable: true,
    data: { text: '"Rare designer — thinks like an engineer, ships like a founder."\n— David, Engineering Lead',
      color: 'var(--sticky-pink)', rotate: 2, tall: true } },
  { id: 'q-3', type: 'sticky', x: 720, y: 360, w: 280, h: 200, draggable: true,
    data: { text: '"Calm under pressure, surgical feedback. The teammate I always want."\n— Ana, Director of Design',
      color: 'var(--sticky-mint)', rotate: -2, tall: true } },
  { id: 'q-4', type: 'sticky', x: 1040, y: 380, w: 280, h: 200, draggable: true,
    data: { text: '"He sees the entire system before anyone else does — designer-engineer-PM in one."\n— Alex, Founder',
      color: 'var(--sticky-yellow)', rotate: 4, tall: true } },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':  return <PageTitle data={obj.data} />
    case 'sticky': return <StickyNote data={obj.data} />
    default: return null
  }
}

function initialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  const scale = Math.min(0.85, (w - 100) / 1280, (h - 160) / 620)
  return {
    scale,
    x: w / 2 - 700 * scale,
    y: h / 2 - 330 * scale,
  }
}

export default function Testimonials() {
  const [view] = useState(initialView)
  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={[]}
      initialView={view}
      renderObject={renderObject}
    />
  )
}
