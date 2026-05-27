import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, AnnotationLabel } from '../components/CanvasCards'
import { Guitar, F1Car, FlightMap } from '../components/HobbyToys'

const OBJECTS = [
  { id: 'title', type: 'title', x: 80, y: 80, w: 540, h: 220,
    data: {
      kicker: '# hobbies & life',
      title: 'Off the clock.',
      blurb: 'A few things I’m into when I’m not staring at a Figma file. Try the guitar — it actually plays.',
    } },

  { id: 'toy-guitar', type: 'guitar', x: 80, y: 360, w: 220, h: 360,
    data: { label: 'I love guitar' } },
  { id: 'toy-f1', type: 'f1', x: 340, y: 410, w: 320, h: 240,
    data: { label: 'I love Formula One' } },
  { id: 'toy-plane', type: 'flight', x: 700, y: 400, w: 360, h: 260,
    data: { label: 'I love traveling' } },

  // A hint annotation
  { id: 'note', type: 'note', x: 70, y: 720, w: 280, h: 80, z: 8,
    data: { text: 'click the guitar', arrow: '↑', rotate: -2 } },
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':  return <PageTitle data={obj.data} />
    case 'guitar': return <Guitar label={obj.data?.label} />
    case 'f1':     return <F1Car label={obj.data?.label} />
    case 'flight': return <FlightMap label={obj.data?.label} />
    case 'note':   return <AnnotationLabel data={obj.data} />
    default: return null
  }
}

function initialView() {
  const w = window.innerWidth
  const h = window.innerHeight
  const scale = Math.min(0.9, (w - 100) / 1100, (h - 160) / 800)
  return {
    scale,
    x: w / 2 - 580 * scale,
    y: h / 2 - 420 * scale,
  }
}

export default function Hobbies() {
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
