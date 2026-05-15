import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Work from '../components/Work'
import OrbitalTimeline from '../components/OrbitalTimeline'
import About from '../components/About'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <OrbitalTimeline />
        <About />
        <Contact />
      </main>
    </>
  )
}
