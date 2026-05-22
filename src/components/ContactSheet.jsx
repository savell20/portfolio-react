import Frame from './Frame'
import fotoPersonal from '../assets/foto-personal.jpeg'

const U = (id) => `https://images.unsplash.com/photo-${id}?w=720&q=80`

export const frames = [
  {
    number: '01', label: 'Zolvo', meta: 'YC S26',
    image: U('1551288049-bebda4e38f71'), to: '/work/zolvo',
  },
  {
    number: '02', label: 'HubSpot', meta: "'25",
    image: U('1497366754035-f200968a6e72'), to: '/work/hubspot',
  },
  {
    number: '03', label: 'Captura', meta: "'20–'23",
    image: U('1452780212940-6f5c0d14d848'), to: '/work/captura',
  },
  {
    number: '04', label: 'About', meta: 'Portrait',
    image: fotoPersonal, to: '/about',
  },
  {
    number: '05', label: 'Photography', meta: 'Roll 02',
    image: U('1506905925346-21bda4d32df4'), to: '/photography',
  },
  {
    number: '06', label: 'Contact', meta: 'Get in touch',
    image: U('1455390582262-044cdead277a'), to: '/contact',
  },
]

export default function ContactSheet() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(248px, 1fr))',
        gap: '2.75rem 2rem',
      }}
    >
      {frames.map((frame, i) => (
        <Frame key={frame.number} frame={frame} index={i} />
      ))}
    </div>
  )
}
