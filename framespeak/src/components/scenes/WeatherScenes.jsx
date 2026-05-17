import './CustomScenes.css';

const CloudBase = ({ color1 }) => (
  <path d="M-20,10 Q-30,10 -30,0 Q-30,-10 -20,-10 Q-15,-25 0,-25 Q15,-25 20,-10 Q30,-10 30,0 Q30,10 20,10 Z" 
    fill="none" stroke={color1} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
    className="anim-draw-path" />
);

const RainScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 50)" className="anim-cloud-float">
      <CloudBase color1={color1} />
      <g className="anim-fade-in" style={{ animationDelay: '0.8s' }}>
        {[...Array(5)].map((_, i) => (
          <line key={i} x1={-20 + i * 10} y1="15" x2={-22 + i * 10} y2="30" 
            stroke={color2} strokeWidth="2" strokeLinecap="round" 
            className="anim-rain-drop" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </g>
    </g>
  </svg>
);

const SnowScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 50)" className="anim-cloud-float">
      <CloudBase color1={color1} />
      <g className="anim-fade-in" style={{ animationDelay: '0.8s' }}>
        {[...Array(3)].map((_, i) => (
          <g key={i} transform={`translate(${-15 + i * 15}, ${20 + (i%2)*10})`} className="anim-snow-spin" style={{ animationDuration: `${3+i}s` }}>
            <line x1="-5" y1="0" x2="5" y2="0" stroke={color2} strokeWidth="1" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke={color2} strokeWidth="1" />
            <line x1="-3" y1="-3" x2="3" y2="3" stroke={color2} strokeWidth="1" />
            <line x1="-3" y1="3" x2="3" y2="-3" stroke={color2} strokeWidth="1" />
          </g>
        ))}
      </g>
    </g>
  </svg>
);

const WindScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      <path d="M-40,-10 Q-20,-10 -10,-20 Q0,-30 10,-20 Q20,-10 40,-10" fill="none" stroke={color1} strokeWidth="3" strokeLinecap="round" className="anim-draw-path" />
      <path d="M-30,10 Q-10,10 0,20 Q10,30 20,20 Q30,10 50,10" fill="none" stroke={color2} strokeWidth="2" strokeLinecap="round" className="anim-draw-path" style={{ animationDelay: '0.4s' }} />
      <circle cx="20" cy="-20" r="3" fill={color1} className="anim-fade-in" style={{ animationDelay: '1.2s' }} />
      <circle cx="-10" cy="20" r="2" fill={color2} className="anim-fade-in" style={{ animationDelay: '1.4s' }} />
    </g>
  </svg>
);

const WaterScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      <path d="M-50,0 Q-25,-15 0,0 T50,0" fill="none" stroke={color1} strokeWidth="3" className="anim-wave-slide" />
      <path d="M-60,15 Q-35,30 -10,15 T40,15" fill="none" stroke={color2} strokeWidth="2" opacity="0.6" className="anim-wave-slide" style={{ animationDirection: 'reverse' }} />
      <circle cx="0" cy="-25" r="4" fill={color1} className="anim-pop-in" />
    </g>
  </svg>
);

const SunriseScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 70)">
      {/* 太阳 */}
      <circle cx="0" cy="0" r="25" fill="none" stroke={color1} strokeWidth="3" className="anim-draw-circle" />
      <circle cx="0" cy="0" r="20" fill={color1} opacity="0.1" className="anim-pulse-glow" />
      {/* 光芒 */}
      {[...Array(5)].map((_, i) => (
        <line key={i} x1="0" y1="-30" x2="0" y2="-45" stroke={color2} strokeWidth="2" strokeLinecap="round"
          transform={`rotate(${-60 + i * 30})`} className="anim-draw-path" style={{ animationDelay: '0.5s' }} />
      ))}
      {/* 地平线 */}
      <line x1="-50" y1="0" x2="50" y2="0" stroke={color1} strokeWidth="4" strokeLinecap="round" className="anim-draw-path" />
    </g>
  </svg>
);

const MoonScene = ({ color1 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      <path d="M0,-30 A30,30 0 1,0 0,30 A20,20 0 0,1 0,-30" fill="none" stroke={color1} strokeWidth="3" className="anim-draw-path" />
      <circle cx="-10" cy="-10" r="3" fill={color1} opacity="0.5" className="anim-pop-in" style={{ animationDelay: '1s' }} />
      <circle cx="-5" cy="15" r="2" fill={color1} opacity="0.3" className="anim-pop-in" style={{ animationDelay: '1.2s' }} />
      <circle cx="30" cy="-20" r="2" fill={color1} className="anim-pulse-glow" />
      <circle cx="40" cy="10" r="1.5" fill={color1} className="anim-pulse-glow" style={{ animationDelay: '0.5s' }} />
    </g>
  </svg>
);

export default function WeatherScenes({ icon, color1, color2 }) {
  if (icon === 'rain') return <RainScene color1={color1} color2={color2} />;
  if (icon === 'snow') return <SnowScene color1={color1} color2={color2} />;
  if (icon === 'wind') return <WindScene color1={color1} color2={color2} />;
  if (icon === 'water') return <WaterScene color1={color1} color2={color2} />;
  if (icon === 'sunrise') return <SunriseScene color1={color1} color2={color2} />;
  if (icon === 'moon') return <MoonScene color1={color1} />;
  return <RainScene color1={color1} color2={color2} />; // fallback
}
