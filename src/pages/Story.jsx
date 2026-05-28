import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, BioCard } from '../components/CanvasCards'
import { PAGE, FIRST_MODULE_Y, pageInitialView } from '../lib/layout'

const MILESTONES = [
  { year: '1998',         where: 'Bogotá, Colombia', text: 'Born and raised in a city that taught me how to design with constraints.' },
  { year: "2020 → '23",   where: 'Captura tu mundo', text: 'Started my own visual-storytelling company at 18 and ran it for three years. Learned every part of building a business.' },
  { year: "2023 → '25",   where: 'SCAD · USA',       text: 'Service Design at SCAD. Fell deeper in love with product design, methodology, and the systems behind the screens.' },
  { year: '2025',         where: 'HubSpot',          text: 'UI/UX Designer for sales and service hubs used by millions. Learned what it takes to design at scale.' },
  { year: "2026 →",       where: 'Zolvo (YC P26)',   text: 'Founding designer for the financial OS for Latin American SMEs. Five core modules shipped in eight weeks.' },
]

const MILE_H = 180
const MILE_GAP = PAGE.ROW_GAP

const OBJECTS = [
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: PAGE.W, h: PAGE.TITLE_H,
    data: {
      kicker: '# my story',
      title: 'Bogotá → SCAD → here.',
      blurb: 'Every chapter that landed me at this canvas, laid out as a timeline.',
    } },

  ...MILESTONES.map((m, i) => ({
    id: `milestone-${i}`, type: 'milestone',
    x: PAGE.X, y: FIRST_MODULE_Y + i * (MILE_H + MILE_GAP),
    w: PAGE.W, h: MILE_H,
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

export default function Story() {
  const [view] = useState(pageInitialView)
  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={CONNECTORS}
      initialView={view}
      renderObject={renderObject}
    />
  )
}
