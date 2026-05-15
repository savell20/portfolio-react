import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Photography from './pages/Photography'
import Zolvo from './pages/Zolvo'
import Cursor from './components/Cursor'

export default function App() {
  return (
    <>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/work/zolvo" element={<Zolvo />} />
      </Routes>
    </>
  )
}
