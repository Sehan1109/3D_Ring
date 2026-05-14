import { useState, useMemo } from 'react'
import { Eye, Settings2, List } from 'lucide-react'
import './App.css'
import Viewer from './components/Viewer'
import Configurator from './components/Configurator'
import Summary from './components/Summary'

function App() {
  const [activeTab, setActiveTab] = useState('stone')
  const [mobileTab, setMobileTab] = useState('viewer') // 'config', 'viewer', 'summary'
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
        <div className={`top-price-bubble ${mobileTab !== 'viewer' ? 'mobile-hidden' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          ${totalPrice.toLocaleString()}
        </div>

        {/* Left Side: Configurator */}
        <div className={`layout-section config-section-wrapper ${mobileTab === 'config' ? 'mobile-active' : ''}`}>
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
        </div>

        {/* Center: 3D Viewer */}
        <div className={`layout-section viewer-section-wrapper ${mobileTab === 'viewer' ? 'mobile-active' : ''}`}>
          <Viewer />
        </div>

        {/* Right Side: Summary */}
        <div className={`layout-section summary-section-wrapper ${mobileTab === 'summary' ? 'mobile-active' : ''}`}>
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

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          <button 
            className={`mobile-nav-item ${mobileTab === 'config' ? 'active' : ''}`}
            onClick={() => setMobileTab('config')}
          >
            <Settings2 size={20} />
            <span>Design</span>
          </button>
          <button 
            className={`mobile-nav-item ${mobileTab === 'viewer' ? 'active' : ''}`}
            onClick={() => setMobileTab('viewer')}
          >
            <Eye size={20} />
            <span>View 3D</span>
          </button>
          <button 
            className={`mobile-nav-item ${mobileTab === 'summary' ? 'active' : ''}`}
            onClick={() => setMobileTab('summary')}
          >
            <List size={20} />
            <span>Summary</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App