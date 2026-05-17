import './CustomScenes.css';

const CarScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 道路后退动画 */}
      <line x1="-80" y1="30" x2="80" y2="30" stroke={color1} strokeWidth="1" opacity="0.3" />
      <line x1="-80" y1="30" x2="80" y2="30" stroke={color2} strokeWidth="2" className="anim-road-move" />
      
      {/* 车体颠簸动画 */}
      <g className="anim-car-bounce">
        <path d="M-30,20 L-30,5 Q-30,-5 -15,-5 L-5,-20 Q0,-25 10,-25 L25,-25 Q35,-25 40,-15 L50,0 Q60,0 60,10 L60,20 Z" 
          fill="none" stroke={color1} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="anim-draw-path" />
        {/* 车窗 */}
        <polygon points="-10,-5 -2,-18 8,-18 10,-5" fill={color2} opacity="0.2" className="anim-fade-in" />
        <polygon points="15,-5 13,-18 25,-18 35,-5" fill={color2} opacity="0.2" className="anim-fade-in" />
        
        {/* 车轮自转 */}
        <g transform="translate(-15, 20)" className="anim-wheel-spin">
          <circle r="8" fill="none" stroke={color1} strokeWidth="2.5" />
          <circle r="3" fill={color2} />
          <line x1="-8" y1="0" x2="8" y2="0" stroke={color1} strokeWidth="1" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke={color1} strokeWidth="1" />
        </g>
        <g transform="translate(35, 20)" className="anim-wheel-spin">
          <circle r="8" fill="none" stroke={color1} strokeWidth="2.5" />
          <circle r="3" fill={color2} />
          <line x1="-8" y1="0" x2="8" y2="0" stroke={color1} strokeWidth="1" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke={color1} strokeWidth="1" />
        </g>
      </g>
    </g>
  </svg>
);

const PlaneScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 云层飞逝 */}
      <path d="M-60,30 Q-50,20 -30,30 M20,-30 Q30,-40 50,-30" fill="none" stroke={color1} strokeWidth="2" opacity="0.3" className="anim-road-move" style={{ animationDuration: '2s' }} />
      
      {/* 飞机机身悬浮 */}
      <g className="anim-car-bounce" style={{ animationDuration: '3s' }}>
        <path d="M-40,0 L10,0 L30,-15 L40,-15 L25,0 L45,0 Q55,0 55,5 Q55,10 45,10 L-20,10 L-35,20 L-45,20 L-35,5 Z" 
          fill="none" stroke={color1} strokeWidth="2.5" strokeLinejoin="round" className="anim-draw-path" />
        <path d="M10,0 L30,-15 L40,-15 L25,0 Z" fill={color2} opacity="0.2" className="anim-fade-in" />
        
        {/* 气流线 */}
        <line x1="-50" y1="5" x2="-80" y2="5" stroke={color2} strokeWidth="1.5" strokeDasharray="5 10" className="anim-road-move" style={{ animationDuration: '0.5s' }} />
      </g>
    </g>
  </svg>
);

const LocationScene = ({ icon, color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 空间透视网格 */}
      <g opacity="0.2" className="anim-fade-in">
        <path d="M-80,40 L0,-10 L80,40 M-40,40 L0,-10 L40,40 M-80,20 L80,20 M-60,10 L60,10 M-40,0 L40,0" fill="none" stroke={color1} strokeWidth="1" />
      </g>
      
      {/* 坐标点/定位符弹跳动画 */}
      <g className="anim-car-bounce" style={{ animationDuration: '1s' }}>
        <path d="M0,-30 C-15,-30 -20,-15 0,0 C20,-15 15,-30 0,-30 Z" fill={color2} opacity="0.3" stroke={color2} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="0" cy="-20" r="4" fill={color1} />
      </g>
      {/* 阴影收缩 */}
      <ellipse cx="0" cy="5" rx="15" ry="3" fill={color1} opacity="0.2" className="anim-car-bounce" style={{ animationDirection: 'reverse' }} />
    </g>
  </svg>
);

export default function VehicleLocationScenes({ icon, color1, color2 }) {
  if (icon === 'car') return <CarScene color1={color1} color2={color2} />;
  if (icon === 'plane') return <PlaneScene color1={color1} color2={color2} />;
  
  // road, map, crossroads, mountain, city, home 使用统一的 3D 地理透视 + 定位跳动
  return <LocationScene icon={icon} color1={color1} color2={color2} />;
}
