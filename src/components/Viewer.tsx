import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, ContactShadows, Preload } from '@react-three/drei'
import { Suspense, memo, useMemo } from 'react'
import { Rotate3d, Maximize2, RefreshCw } from 'lucide-react'

interface ViewerProps {
  selectedColor?: string;
}

function RingModel({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl)
  // Clone the scene to ensure it's fresh and doesn't conflict with other instances
  const clonedScene = useMemo(() => scene.clone(), [scene])

  return (
    <primitive
      object={clonedScene}
      scale={0.08}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
}

const colorModelMap: Record<string, string> = {
  blue: '/Blue.glb',
  green: '/Green.glb',
  pink: '/Rose.glb',
  purple: '/Purple.glb',
  yellow: '/Yellow.glb',
  red: '/Red.glb',
  teal: '/Teal.glb',
  black: '/Black.glb',
  brown: '/Brown.glb',
  gold: '/Gold.glb',
};

const Viewer = memo(function Viewer({ selectedColor }: ViewerProps) {
  const modelUrl = selectedColor && colorModelMap[selectedColor]
    ? colorModelMap[selectedColor]
    : '/diamond_engagement_ring_wedding_ring.glb';

  return (
    <div className="viewer-main">
      <Suspense fallback={<div className="loading">Initializing 3D Viewer...</div>}>
        <Canvas
          camera={{ position: [0, 1, 5], fov: 35 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance"
          }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <RingModel key={modelUrl} modelUrl={modelUrl} />

          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={0.8}
          />

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={false}
          />

          <Environment preset="city" />
          <Preload all />
        </Canvas>
      </Suspense>

      <div className="viewer-controls">
        <button className="control-btn" title="360 View">
          <Rotate3d size={20} />
        </button>
        <button className="control-btn" title="View Detail">
          <Maximize2 size={20} />
        </button>
        <button className="control-btn" title="Reset View">
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  )
})

export default Viewer
