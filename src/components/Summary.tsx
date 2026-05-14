import { ShoppingCart, Share2, MessageCircle } from 'lucide-react';

interface SummaryProps {
  config: {
    shape: string;
    carat: number;
    stoneType: string;
    stoneColor: string;
    totalPrice: number;
  }
}

export default function Summary({ config }: SummaryProps) {
  return (
    <aside className="summary-sidebar">
      <div className="summary-item">
        <div className="summary-header">
          <span>SHANK</span>
          <span>$8,000</span>
        </div>
        <div className="summary-detail">
          <span className="detail-label">Style</span>
          <span>Plain</span>
        </div>
        <div className="summary-detail">
          <span className="detail-label">Metal</span>
          <span>18K White Gold</span>
        </div>
      </div>

      <div className="summary-item">
        <div className="summary-header">
          <span>HEAD</span>
          <span>$400</span>
        </div>
        <div className="summary-detail">
          <span className="detail-label">Style</span>
          <span>Solitaire</span>
        </div>
      </div>

      <div className="summary-item">
        <div className="summary-header">
          <span>STONE</span>
          <span>$2,620</span>
        </div>
        <div className="summary-detail">
          <span className="detail-label">Shape</span>
          <span>{config.shape}</span>
        </div>
        <div className="summary-detail">
          <span className="detail-label">Carat</span>
          <span>{config.carat}</span>
        </div>
        <div className="summary-detail">
          <span className="detail-label">Type</span>
          <span>{config.stoneType}</span>
        </div>
      </div>

      <div className="total-price">
        <div className="total-header">
          <span>TOTAL</span>
          <span>${config.totalPrice.toLocaleString()}</span>
        </div>
        
        <button className="add-to-cart">
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        <div className="secondary-actions">
          <button className="action-btn">
            <Share2 size={14} />
            Share
          </button>
          <button className="action-btn">
            <MessageCircle size={14} />
            Contact Us
          </button>
        </div>
      </div>
    </aside>
  );
}
