import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Zolvo from './pages/Zolvo'
import WorkRoom from './pages/WorkRoom'
import About from './pages/About'
import Photography from './pages/Photography'
import Contact from './pages/Contact'
import Loupe from './components/Loupe'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/work/zolvo" element={<Zolvo />} />
          <Route path="/work/:slug" element={<WorkRoom />} />
          <Route path="/about" element={<About />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <Loupe />
      <AnimatedRoutes />
    </>
  )
}
