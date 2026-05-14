import { useState, useMemo } from 'react'
import './App.css'
import Viewer from './components/Viewer'
import Configurator from './components/Configurator'
import Summary from './components/Summary'

function App() {
  const [activeTab, setActiveTab] = useState('stone')
  const [selectedShape, setSelectedShape] = useState('Round')
  const [carat, setCarat] = useState(1.5)
  const [stoneType, setStoneType] = useState('Colored')
  const [selectedColor, setSelectedColor] = useState('pink')

  const totalPrice = useMemo(() => {
    const base = 8000 + 400 + 2620
    const caratMultiplier = carat / 1.5
    return Math.round(base * caratMultiplier)
  }, [carat])

  return (
    <div className="app-container">
      <div className="configurator-card">
        {/* Top Right Price Bubble */}
        <div className="top-price-bubble">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          ${totalPrice.toLocaleString()}
        </div>

        {/* Left Side: Configurator */}
        <Configurator 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
          carat={carat}
          setCarat={setCarat}
          stoneType={stoneType}
          setStoneType={setStoneType}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        {/* Center: 3D Viewer */}
        <Viewer />

        {/* Right Side: Summary */}
        <Summary 
          config={{
            shape: selectedShape,
            carat: carat,
            stoneType: stoneType,
            stoneColor: selectedColor,
            totalPrice: totalPrice
          }}
        />
      </div>
    </div>
  )
}

export default App