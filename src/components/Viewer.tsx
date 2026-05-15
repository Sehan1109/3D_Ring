import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, ContactShadows, Preload } from '@react-three/drei'
import { Suspense, memo, useMemo, useEffect } from 'react'
import { Rotate3d, Maximize2, RefreshCw } from 'lucide-react'
import * as THREE from 'three'

interface ViewerProps {
  selectedColor?: string;
  selectedShape?: string;
}

function RingModel({
  selectedColor,
  selectedShape
}: {
  selectedColor?: string
  selectedShape?: string
}) {

  let modelPath = '/DiamondRing.glb'
  const shape = selectedShape?.toLowerCase()
  if (shape === 'round') modelPath = '/RGold.glb'
  else if (shape === 'emerald') modelPath = '/EGreen.glb'
  else if (shape === 'heart') modelPath = '/HBlue.glb'

  const { scene } = useGLTF(modelPath)

  const colorMap: Record<string, string> = {
    blue: '#7bb2e0',
    green: '#7bc7a5',
    pink: '#e8a1c1',
    purple: '#a682c3',
    yellow: '#f5d67b',
    red: '#e07b7b',
    teal: '#7be0d1',
    black: '#1d1d1f',
    brown: '#8b5e3c',
    gold: '#d4af37',
  }

  const stoneColor = colorMap[selectedColor || 'blue']

  const diamondMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: stoneColor,
    transmission: 1,
    thickness: 1,
    roughness: 0,
    metalness: 0,
    ior: 2.4,
    clearcoat: 1,
    transparent: true,
    opacity: 1
  }), [stoneColor])

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        if (!child.userData.originalMaterialName) {
          child.userData.originalMaterialName = child.material.name.toLowerCase();
        }
        const name = child.userData.originalMaterialName;
        // Identify metals to skip them (they use material_0, scene, or white_gold/gold)
        const isMetal = name.includes('material_0') || name.includes('scene') || name.includes('gold');
        
        if (!isMetal) {
          child.material = diamondMaterial;
        }
      }
    });
  }, [scene, diamondMaterial])

  return (
    <group
      scale={0.08}
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI / 4, 0]}
    >
      <primitive object={scene} />
    </group>
  )
}

const Viewer = memo(function Viewer({ selectedColor, selectedShape }: ViewerProps) {

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

          <RingModel
            selectedColor={selectedColor}
            selectedShape={selectedShape}
          />

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
