import {
  Circle,
  Diamond,
  Square,
  Heart,
  Hexagon,
  Info,
  Gem
} from 'lucide-react';

interface ConfiguratorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedShape: string;
  setSelectedShape: (shape: string) => void;
  carat: number;
  setCarat: (val: number) => void;
  stoneType: string;
  setStoneType: (type: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const shapes = [
  { id: 'round', name: 'Round', icon: <Circle size={24} /> },
  { id: 'emerald', name: 'Emerald', icon: <Square size={24} /> },
  { id: 'oval', name: 'Oval', icon: <Gem size={24} /> },
  { id: 'pear', name: 'Pear', icon: <Gem size={24} /> },
  { id: 'cushion', name: 'Cushion', icon: <Square size={24} /> },
  { id: 'radiant', name: 'Radiant', icon: <Diamond size={24} /> },
  { id: 'marquise', name: 'Marquise', icon: <Diamond size={24} /> },
  { id: 'princess', name: 'Princess', icon: <Square size={24} /> },
  { id: 'heart', name: 'Heart', icon: <Heart size={24} /> },
  { id: 'asscher', name: 'Asscher', icon: <Hexagon size={24} /> },
];

const colors = [
  { id: 'blue', color: '#7bb2e0' },
  { id: 'green', color: '#7bc7a5' },
  { id: 'pink', color: '#e8a1c1' },
  { id: 'purple', color: '#a682c3' },
  { id: 'yellow', color: '#f5d67b' },
  { id: 'red', color: '#e07b7b' },
  { id: 'teal', color: '#7be0d1' },
  { id: 'black', color: '#1d1d1f' },
  { id: 'brown', color: '#8b5e3c' },
  { id: 'gold', color: '#d4af37' },
];

export default function Configurator({
  activeTab,
  setActiveTab,
  selectedShape,
  setSelectedShape,
  carat,
  setCarat,
  stoneType,
  setStoneType,
  selectedColor,
  setSelectedColor
}: ConfiguratorProps) {
  return (
    <aside className="config-sidebar">
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeTab === 'shank' ? 'active' : ''}`}
          onClick={() => setActiveTab('shank')}
        >
          <Circle size={14} /> SHANK
        </button>
        <button
          className={`tab-btn ${activeTab === 'head' ? 'active' : ''}`}
          onClick={() => setActiveTab('head')}
        >
          <Diamond size={14} /> HEAD
        </button>
        <button
          className={`tab-btn ${activeTab === 'stone' ? 'active' : ''}`}
          onClick={() => setActiveTab('stone')}
        >
          <Gem size={14} /> STONE
        </button>
      </div>

      <div className="config-content">
        <div className="config-section">
          <div className="section-title">
            <h3>SHAPE <span style={{ fontWeight: 400, color: '#86868b' }}>{selectedShape}</span></h3>
            <span className="price-label">$400</span>
          </div>
          <div className="shape-grid">
            {shapes.map(shape => (
              <div
                key={shape.id}
                className={`shape-item ${selectedShape.toLowerCase() === shape.id ? 'active' : ''}`}
                onClick={() => setSelectedShape(shape.name)}
              >
                <div className="shape-icon-placeholder">{shape.icon}</div>
                <span style={{ fontSize: '10px', marginTop: '4px' }}>{shape.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="config-section">
          <div className="section-title">
            <h3>CARAT <span className="value-label">{carat}</span></h3>
          </div>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={carat}
            onChange={(e) => setCarat(parseFloat(e.target.value))}
            className="custom-slider"
          />
          <div className="slider-labels">
            <span>0.5</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <div className="config-section">
          <div className="section-title">
            <h3>TYPE <span className="value-label">{stoneType}</span></h3>
          </div>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${stoneType === 'Colorless' ? 'active' : ''}`}
              onClick={() => setStoneType('Colorless')}
            >
              Colorless
            </button>
            <button
              className={`toggle-btn ${stoneType === 'Colored' ? 'active' : ''}`}
              onClick={() => setStoneType('Colored')}
            >
              Colored
            </button>
            <button
              className={`toggle-btn ${stoneType === 'Gemstone' ? 'active' : ''}`}
              onClick={() => setStoneType('Gemstone')}
            >
              Gemstone
            </button>
          </div>
        </div>

        {stoneType !== 'Colorless' && (
          <div className="config-section">
            <div className="swatch-group">
              {colors.map(c => (
                <div
                  key={c.id}
                  className={`swatch ${selectedColor === c.id ? 'active' : ''}`}
                  style={{ backgroundColor: c.color }}
                  onClick={() => setSelectedColor(c.id)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="config-section">
          <div className="section-title">
            <h3>QUALITY <Info size={14} /></h3>
          </div>
        </div>
      </div>
    </aside>
  );
}
