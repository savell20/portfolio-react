import { useState } from 'react'
import MiniCanvas from '../components/MiniCanvas'
import { PageTitle, PhotoPrint, StickyNote } from '../components/CanvasCards'
import { PAGE, FIRST_MODULE_Y, pageInitialView } from '../lib/layout'

// Photo grid lives directly under the hero block, first row starts at
// FIRST_MODULE_Y. Six columns across PAGE.W (200px each + small gaps).
const PHOTO_W = 180
const PHOTO_GAP_X = 20
const PHOTO_GAP_Y = 24
const photoX = (col) => PAGE.X + col * (PHOTO_W + PHOTO_GAP_X)
const photoY = (row) => FIRST_MODULE_Y + row * (200 + PHOTO_GAP_Y)

const PRINTS = [
  { id: 'photo-1',  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', caption: 'peaks',  x: photoX(0), y: photoY(0),       rotate: -4 },
  { id: 'photo-2',  src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', caption: 'dusk',   x: photoX(1), y: photoY(0) + 14,  rotate: 5  },
  { id: 'photo-3',  src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', caption: 'coast',  x: photoX(2), y: photoY(0),       rotate: 3  },
  { id: 'photo-4',  src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80', caption: 'road',   x: photoX(3), y: photoY(0) + 14,  rotate: -3 },
  { id: 'photo-9',  src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80', caption: 'town',   x: photoX(4), y: photoY(0),       rotate: 2  },
  { id: 'photo-11', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', caption: 'summit', x: photoX(5), y: photoY(0) + 14,  rotate: -4 },
  { id: 'photo-5',  src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', caption: 'valley', x: photoX(0), y: photoY(1),       rotate: 4  },
  { id: 'photo-6',  src: 'https://images.unsplash.com/photo-1527430253228-e93688616381?w=600&q=80', caption: 'forest', x: photoX(1), y: photoY(1) + 14,  rotate: -2 },
  { id: 'photo-7',  src: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&q=80', caption: 'desert', x: photoX(2), y: photoY(1),       rotate: 6  },
  { id: 'photo-8',  src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', caption: 'shore',  x: photoX(3), y: photoY(1) + 14,  rotate: -5 },
  { id: 'photo-10', src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80', caption: 'falls',  x: photoX(4), y: photoY(1),       rotate: -3 },
  { id: 'photo-12', src: 'https://images.unsplash.com/photo-1500259571355-332da5cb07aa?w=600&q=80', caption: 'lake',   x: photoX(5), y: photoY(1) + 14,  rotate: 5  },
]

const OBJECTS = [
  { id: 'title', type: 'title', x: PAGE.X, y: PAGE.TITLE_Y, w: PAGE.W, h: PAGE.TITLE_H,
    data: {
      kicker: '# photography',
      title: 'Photography is my main hobby!',
      blurb: 'I love it. Each photograph isn’t just an image, it’s a unique story, frozen the moment the shutter closed.',
    } },

  // Hint sticky tucked to the right of the title
  { id: 'note-drag', type: 'sticky', x: PAGE.X + 920, y: PAGE.TITLE_Y + 30, w: 240, h: 140, z: 4, draggable: true,
    data: { text: '✦ everything below is draggable, make your own mood board',
      color: 'var(--sticky-yellow)', rotate: -3, tall: false } },

  // 12 draggable photo prints in a tight 6x2 grid
  ...PRINTS.map(p => ({
    id: p.id, type: 'photoprint', x: p.x, y: p.y, w: PHOTO_W, h: 200, draggable: true,
    data: { src: p.src, caption: p.caption, rotate: p.rotate },
  })),
]

function renderObject(obj) {
  switch (obj.type) {
    case 'title':      return <PageTitle data={obj.data} />
    case 'photoprint': return <PhotoPrint data={obj.data} />
    case 'sticky':     return <StickyNote data={obj.data} />
    default: return null
  }
}

export default function Photography() {
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
