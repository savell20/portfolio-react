import { MeshGradient } from '@paper-design/shaders-react'

export default function Background() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      pointerEvents: 'none',
    }}>
      <MeshGradient
        style={{ width: '100%', height: '100%' }}
        colors={['#0a0a0a', '#0d0b12', '#080c14', '#0a0a0a']}
        speed={0.35}
        backgroundColor="#0a0a0a"
      />
    </div>
  )
}
