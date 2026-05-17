import './CustomScenes.css';

const LaptopScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* Laptop Base */}
      <rect x="-35" y="-15" width="70" height="40" rx="3" fill="none" stroke={color1} strokeWidth="2" className="anim-pop-in" />
      <path d="M-45,25 L45,25 L40,30 H-40 Z" fill={color1} opacity="0.3" stroke={color1} strokeWidth="1" className="anim-fade-in" style={{ animationDelay: '0.5s' }} />
      <line x1="-35" y1="25" x2="35" y2="25" stroke={color1} strokeWidth="2" />
      
      {/* Code / Lines on screen */}
      <g className="anim-fade-in" style={{ animationDelay: '1s' }}>
        <line x1="-25" y1="-5" x2="15" y2="-5" stroke={color2} strokeWidth="2" strokeLinecap="round" className="anim-road-move" style={{ animationDuration: '3s' }} />
        <line x1="-25" y1="5" x2="-5" y2="5" stroke={color2} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="-25" y1="15" x2="25" y2="15" stroke={color2} strokeWidth="2" strokeLinecap="round" className="anim-road-move" style={{ animationDuration: '4s' }} />
      </g>
    </g>
  </svg>
);

const ChartBarScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* Axes */}
      <line x1="-30" y1="-20" x2="-30" y2="30" stroke={color1} strokeWidth="2" className="anim-draw-path" />
      <line x1="-30" y1="30" x2="40" y2="30" stroke={color1} strokeWidth="2" className="anim-draw-path" />
      
      {/* Bars growing */}
      <rect x="-20" y="10" width="12" height="20" fill={color2} opacity="0.5" className="anim-sand-bottom" style={{ animationDuration: '2s' }} />
      <rect x="0" y="-10" width="12" height="40" fill={color1} opacity="0.7" className="anim-sand-bottom" style={{ animationDuration: '2s', animationDelay: '0.2s' }} />
      <rect x="20" y="-30" width="12" height="60" fill={color2} opacity="0.9" className="anim-sand-bottom" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
    </g>
  </svg>
);

const BedScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* Bed frame */}
      <path d="M-35,20 V-10 M35,20 V0" stroke={color1} strokeWidth="3" strokeLinecap="round" className="anim-draw-path" />
      <line x1="-35" y1="10" x2="35" y2="10" stroke={color1} strokeWidth="2" />
      
      {/* Mattress and Blanket (Breathing effect) */}
      <g className="anim-cloud-float" style={{ animationDuration: '3s' }}>
        <rect x="-30" y="0" width="65" height="10" rx="3" fill="none" stroke={color1} strokeWidth="1.5" />
        <path d="M-10,0 Q10,-10 30,0" fill={color2} opacity="0.4" />
      </g>
      
      {/* Pillow */}
      <ellipse cx="-20" cy="-3" rx="8" ry="4" fill={color2} opacity="0.8" className="anim-pop-in" style={{ animationDelay: '1s' }} />
    </g>
  </svg>
);

const PhoneMessageScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* Phone Body */}
      <rect x="-20" y="-35" width="40" height="70" rx="6" fill="none" stroke={color1} strokeWidth="2.5" className="anim-draw-path" />
      <circle cx="0" cy="25" r="3" fill={color1} />
      
      {/* Notification Bubbles */}
      <g className="anim-fade-in" style={{ animationDelay: '1s' }}>
        <rect x="-10" y="-20" width="25" height="10" rx="3" fill={color2} opacity="0.8" className="anim-car-bounce" />
        <rect x="-15" y="-5" width="20" height="10" rx="3" fill={color1} opacity="0.3" className="anim-car-bounce" style={{ animationDelay: '0.2s' }} />
      </g>
      
      {/* Signal / Ringing */}
      <path d="M25,-20 A15,15 0 0,1 25,0" fill="none" stroke={color2} strokeWidth="1.5" className="anim-pulse-glow" />
      <path d="M30,-25 A20,20 0 0,1 30,5" fill="none" stroke={color1} strokeWidth="1" className="anim-pulse-glow" style={{ animationDelay: '0.3s' }} />
    </g>
  </svg>
);

export default function WorkTravelScenes({ icon, color1, color2 }) {
  if (icon === 'laptop') return <LaptopScene color1={color1} color2={color2} />;
  if (icon === 'chart_bar') return <ChartBarScene color1={color1} color2={color2} />;
  if (icon === 'bed') return <BedScene color1={color1} color2={color2} />;
  if (icon === 'phone' || icon === 'message') return <PhoneMessageScene color1={color1} color2={color2} />;
  
  // generic fallback
  return <LaptopScene color1={color1} color2={color2} />;
}
