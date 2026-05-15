import { MeshGradient } from '@paper-design/shaders-react'

export default function Background() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      width: '100vw',
      height: '100vh',
    }}>
      <MeshGradient
        style={{ width: '100%', height: '100%', display: 'block' }}
        colors={['#0a0a0a', '#1a0a2e', '#0a1020', '#0d0d10']}
        speed={0.3}
        distortion={0.7}
        swirl={0.12}
      />
    </div>
  )
}
