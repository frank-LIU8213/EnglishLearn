import './CustomScenes.css';

const ClockScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 表盘 */}
      <circle r="45" fill="none" stroke={color1} strokeWidth="2" className="anim-draw-circle" />
      <circle r="40" fill={color1} opacity="0.05" />
      
      {/* 刻度 */}
      {[...Array(12)].map((_, i) => (
        <line key={i} x1="0" y1="-38" x2="0" y2="-32" stroke={color1} strokeWidth="1.5" 
          transform={`rotate(${i * 30})`} opacity={i % 3 === 0 ? 0.8 : 0.3} />
      ))}
      
      {/* 时针与分针 */}
      <g className="anim-spin-hours">
        <line x1="0" y1="5" x2="0" y2="-20" stroke={color1} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g className="anim-spin-minutes">
        <line x1="0" y1="8" x2="0" y2="-30" stroke={color2} strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle r="3" fill={color1} />
    </g>
  </svg>
);

const HourglassScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 沙漏外壳 */}
      <path d="M-25,-40 H25 M-25,40 H25" stroke={color1} strokeWidth="3" strokeLinecap="round" />
      <path d="M-20,-40 L-5,-10 Q0,0 -5,10 L-20,40 M20,-40 L5,-10 Q0,0 5,10 L20,40" 
        fill="none" stroke={color1} strokeWidth="2" className="anim-draw-path" />
      
      {/* 滴落的沙子 */}
      <polygon points="-15,-38 15,-38 0,-5" fill={color2} opacity="0.6" className="anim-sand-top" />
      <polygon points="0,15 -15,38 15,38" fill={color2} opacity="0.6" className="anim-sand-bottom" />
      
      {/* 下落的沙粒 */}
      <line x1="0" y1="0" x2="0" y2="35" stroke={color2} strokeWidth="1" strokeDasharray="2 4" className="anim-sand-fall" />
    </g>
  </svg>
);

const CalendarScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 日历主体 */}
      <rect x="-35" y="-25" width="70" height="55" rx="4" fill="none" stroke={color1} strokeWidth="2" className="anim-pop-in" />
      <line x1="-35" y1="-5" x2="35" y2="-5" stroke={color1} strokeWidth="2" />
      
      {/* 装订环 */}
      <path d="M-20,-32 V-18 M0,-32 V-18 M20,-32 V-18" stroke={color2} strokeWidth="3" strokeLinecap="round" className="anim-draw-path" />
      
      {/* 日期格子翻页效果 */}
      <rect x="-20" y="5" width="10" height="10" fill={color1} opacity="0.2" className="anim-flip-cell" style={{ animationDelay: '0.2s' }} />
      <rect x="-5" y="5" width="10" height="10" fill={color1} opacity="0.5" className="anim-flip-cell" style={{ animationDelay: '0.4s' }} />
      <rect x="10" y="5" width="10" height="10" fill={color2} opacity="0.8" className="anim-flip-cell" style={{ animationDelay: '0.6s' }} />
    </g>
  </svg>
);

export default function TimeScenes({ icon, color1, color2 }) {
  if (icon === 'clock') return <ClockScene color1={color1} color2={color2} />;
  if (icon === 'hourglass') return <HourglassScene color1={color1} color2={color2} />;
  if (icon === 'calendar') return <CalendarScene color1={color1} color2={color2} />;
  return <ClockScene color1={color1} color2={color2} />; // fallback
}
