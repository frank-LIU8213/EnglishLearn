import './CustomScenes.css';

const ReceiptScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      <g className="anim-fade-in" style={{ animationDuration: '0.5s' }}>
        <path d="M-20,30 L-15,35 L-10,30 L-5,35 L0,30 L5,35 L10,30 L15,35 L20,30 V-20 H-20 Z" fill="none" stroke={color1} strokeWidth="2" strokeLinejoin="round" />
        <line x1="-10" y1="-10" x2="10" y2="-10" stroke={color2} strokeWidth="1.5" strokeLinecap="round" className="anim-draw-path" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke={color2} strokeWidth="1.5" strokeLinecap="round" className="anim-draw-path" style={{ animationDelay: '0.4s' }} />
        <line x1="-10" y1="10" x2="0" y2="10" stroke={color2} strokeWidth="1.5" strokeLinecap="round" className="anim-draw-path" style={{ animationDelay: '0.8s' }} />
        {/* Receipt printing upward movement */}
        <path d="M-20,-20 V-30 H20 V-20" fill="none" stroke={color1} strokeWidth="2" strokeDasharray="2 4" className="anim-road-move" style={{ animationDuration: '2s' }} />
      </g>
    </g>
  </svg>
);

const PlateForkScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* Plate */}
      <ellipse cx="0" cy="10" rx="35" ry="15" fill="none" stroke={color1} strokeWidth="2" className="anim-draw-circle" />
      <ellipse cx="0" cy="10" rx="25" ry="10" fill={color1} opacity="0.1" className="anim-pop-in" />
      {/* Knife and Fork (Cutting motion) */}
      <g className="anim-car-bounce" style={{ animationDuration: '1s' }}>
        <line x1="-25" y1="5" x2="-15" y2="-20" stroke={color2} strokeWidth="2" strokeLinecap="round" />
        <path d="M-15,-20 V-25 M-17,-20 V-25 M-13,-20 V-25" stroke={color2} strokeWidth="1" />
      </g>
      <g className="anim-car-bounce" style={{ animationDuration: '1.2s', animationDelay: '0.5s' }}>
        <line x1="25" y1="5" x2="15" y2="-20" stroke={color2} strokeWidth="2" strokeLinecap="round" />
        <path d="M15,-20 Q12,-25 15,-30" fill="none" stroke={color2} strokeWidth="2" />
      </g>
    </g>
  </svg>
);

const CoffeeCupScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      <path d="M-20,-10 C-20,20 20,20 20,-10 Z" fill="none" stroke={color1} strokeWidth="2.5" className="anim-draw-path" />
      <path d="M20,-5 C25,-5 25,5 20,5" fill="none" stroke={color1} strokeWidth="2" className="anim-pop-in" style={{ animationDelay: '1s' }} />
      <ellipse cx="0" cy="-10" rx="20" ry="5" fill={color1} opacity="0.2" className="anim-pop-in" />
      
      {/* Steam */}
      <path d="M-5,-15 Q-15,-25 -5,-35" fill="none" stroke={color2} strokeWidth="2" className="anim-cloud-float" opacity="0.6" />
      <path d="M5,-20 Q15,-30 5,-40" fill="none" stroke={color2} strokeWidth="2" className="anim-cloud-float" opacity="0.6" style={{ animationDelay: '1s' }} />
    </g>
  </svg>
);

const ShoppingCartScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      <g className="anim-car-bounce">
        <path d="M-30,-20 L-20,-20 L-10,15 L20,15 L30,-10 L-15,-10" fill="none" stroke={color1} strokeWidth="2" strokeLinejoin="round" className="anim-draw-path" />
        <line x1="-12" y1="-2" x2="25" y2="-2" stroke={color1} strokeWidth="1" opacity="0.5" />
        <line x1="-8" y1="7" x2="21" y2="7" stroke={color1} strokeWidth="1" opacity="0.5" />
        
        {/* Wheels */}
        <circle cx="-5" cy="22" r="3" fill={color2} className="anim-wheel-spin" />
        <circle cx="15" cy="22" r="3" fill={color2} className="anim-wheel-spin" />
      </g>
      {/* Moving ground */}
      <line x1="-40" y1="25" x2="40" y2="25" stroke={color2} strokeWidth="1" strokeDasharray="5 10" className="anim-road-move" />
    </g>
  </svg>
);

const PillScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      <g className="anim-spin-hours" style={{ animationDuration: '10s' }}>
        <path d="M-20,-10 A10,10 0 0,0 -20,10 L0,10 L0,-10 Z" fill={color1} opacity="0.5" stroke={color1} strokeWidth="2" className="anim-pop-in" />
        <path d="M20,10 A10,10 0 0,0 20,-10 L0,-10 L0,10 Z" fill={color2} opacity="0.8" stroke={color2} strokeWidth="2" className="anim-pop-in" style={{ animationDelay: '0.2s' }} />
      </g>
      <circle cx="-30" cy="20" r="2" fill={color1} className="anim-pulse-glow" />
      <circle cx="30" cy="-20" r="3" fill={color2} className="anim-pulse-glow" style={{ animationDelay: '1s' }} />
    </g>
  </svg>
);

const StethoscopeScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      <path d="M-20,-30 C-20,0 20,0 20,-30" fill="none" stroke={color1} strokeWidth="3" className="anim-draw-path" />
      <circle cx="-20" cy="-32" r="3" fill={color2} className="anim-pop-in" style={{ animationDelay: '1s' }} />
      <circle cx="20" cy="-32" r="3" fill={color2} className="anim-pop-in" style={{ animationDelay: '1s' }} />
      
      <path d="M0,-8 V20 Q0,30 15,30" fill="none" stroke={color1} strokeWidth="2" className="anim-draw-path" style={{ animationDelay: '0.5s' }} />
      <circle cx="20" cy="30" r="6" fill="none" stroke={color2} strokeWidth="3" className="anim-heart-beat" />
    </g>
  </svg>
);

// Fallback logic for life scenes
export default function LifeScenes({ icon, color1, color2 }) {
  if (icon === 'receipt') return <ReceiptScene color1={color1} color2={color2} />;
  if (icon === 'plate_fork' || icon === 'food' || icon === 'menu') return <PlateForkScene color1={color1} color2={color2} />;
  if (icon === 'coffee_cup') return <CoffeeCupScene color1={color1} color2={color2} />;
  if (icon === 'shopping_cart') return <ShoppingCartScene color1={color1} color2={color2} />;
  if (icon === 'pill') return <PillScene color1={color1} color2={color2} />;
  if (icon === 'stethoscope') return <StethoscopeScene color1={color1} color2={color2} />;
  
  // Generic fallback using PlateFork style but abstracted
  return <CoffeeCupScene color1={color1} color2={color2} />;
}
