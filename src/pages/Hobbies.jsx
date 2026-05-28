import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, AnnotationLabel } from '../components/CanvasCards'
import { Guitar, F1Car, FlightMap } from '../components/HobbyToys'
import { PAGE, FIRST_MODULE_Y, pageInitialView } from '../lib/layout'

const OBJECTS = [
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: PAGE.W, h: PAGE.TITLE_H,
    data: {
      kicker: '# hobbies & life',
      title: 'Off the clock.',
      blurb: 'A few things I’m into when I’m not staring at a Figma file. Try the guitar, it actually plays.',
    } },

  { id: 'toy-guitar', type: 'guitar', x: PAGE.X,       y: FIRST_MODULE_Y,       w: 220, h: 360,
    data: { label: 'I love guitar' } },
  { id: 'toy-f1',     type: 'f1',     x: PAGE.X + 260, y: FIRST_MODULE_Y + 50,  w: 320, h: 240,
    data: { label: 'I love Formula One' } },
  { id: 'toy-plane',  type: 'flight', x: PAGE.X + 620, y: FIRST_MODULE_Y + 40,  w: 360, h: 260,
    data: { label: 'I love traveling' } },

  // Hint
  { id: 'note', type: 'note', x: PAGE.X - 10, y: FIRST_MODULE_Y + 380, w: 280, h: 80, z: 8,
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

export default function Hobbies() {
  const [view] = useState(pageInitialView)
  return (
    <MiniCanvas
      objects={OBJECTS}
      connectors={[]}
      initialView={view}
      renderObject={renderObject}
    />
  )
}
