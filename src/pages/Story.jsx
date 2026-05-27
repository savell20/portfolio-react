import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, BioCard } from '../components/CanvasCards'

const MILESTONES = [
  { year: '1998',         where: 'Bogotá, Colombia', text: 'Born and raised in a city that taught me how to design with constraints.' },
  { year: "2020 → '23",   where: 'Captura tu mundo', text: 'Started my own visual-storytelling company at 18 and ran it for three years. Learned every part of building a business.' },
  { year: "2023 → '25",   where: 'SCAD · USA',       text: 'Service Design at SCAD. Fell deeper in love with product design, methodology, and the systems behind the screens.' },
  { year: '2025',         where: 'HubSpot',          text: 'UI/UX Designer for sales and service hubs used by millions. Learned what it takes to design at scale.' },
  { year: "2026 →",       where: 'Zolvo (YC P26)',   text: 'Founding designer for the financial OS for Latin American SMEs. Five core modules shipped in eight weeks.' },
]

const OBJECTS = [
  { id: 'title', type: 'title', x: 80, y: 80, w: 600, h: 240,
    data: {
      kicker: '# my story',
      title: 'Bogotá → SCAD → here.',
      blurb: 'Every chapter that landed me at this canvas — laid out as a timeline.',
    } },

  // Vertical stack of milestone cards on the right; left column for the title
  ...MILESTONES.map((m, i) => ({
    id: `milestone-${i}`, type: 'milestone', x: 700, y: 80 + i * 200, w: 600, h: 180,
    data: {
      frame: m.where.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      kicker: m.year,
      title: m.where,
      paragraphs: [m.text],
    },
  })),
]

const CONNECTORS = MILESTONES.slice(1).map((_, i) => ({
  from: `milestone-${i}`, to: `milestone-${i + 1}`,
  fromSide: 'bottom', toSide: 'top',
}))

function renderObject(obj) {
  switch (obj.type) {
    case 'title':     return <PageTitle data={obj.data} />
    case 'milestone': return <BioCard data={obj.data} />
    default: return null
  }
}

function initialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  // Tall content (5 milestones). Fit width, allow vertical scrolling/panning.
  const scale = Math.min(0.85, (w - 100) / 1300, (h - 160) / 700)
  return {
    scale,
    x: w / 2 - 700 * scale,
    y: 110,
  }
}

export default function Story() {
  const [view] = useState(initialView)
  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={CONNECTORS}
      initialView={view}
      renderObject={renderObject}
    />
  )
}
