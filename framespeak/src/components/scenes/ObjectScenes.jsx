import './CustomScenes.css';

const FridgeScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 冰箱主体 */}
      <rect x="-25" y="-45" width="50" height="90" rx="4" fill="none" stroke={color1} strokeWidth="2.5" className="anim-draw-path" />
      <line x1="-25" y1="-10" x2="25" y2="-10" stroke={color1} strokeWidth="2" />
      
      {/* 冰箱门打开动画 */}
      <g className="anim-door-open">
        <rect x="-25" y="-45" width="50" height="90" rx="4" fill="var(--bg-primary)" stroke={color2} strokeWidth="1.5" />
        <line x1="-25" y1="-10" x2="25" y2="-10" stroke={color2} strokeWidth="1" />
        {/* 门把手 */}
        <line x1="15" y1="-30" x2="15" y2="-15" stroke={color2} strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="10" x2="15" y2="25" stroke={color2} strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* 内部空虚的雪花/冷气 */}
      <circle cx="0" cy="15" r="5" fill={color1} opacity="0.3" className="anim-fade-in" style={{ animationDelay: '2s' }} />
      <path d="M-10,30 Q0,20 10,30" fill="none" stroke={color2} strokeWidth="1" opacity="0.5" className="anim-fade-in" style={{ animationDelay: '2.2s' }} />
    </g>
  </svg>
);

const BookScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 书本打开的页面 */}
      <path d="M0,30 Q-25,40 -45,30 V-20 Q-25,-10 0,0 Q25,-10 45,-20 V30 Q25,40 0,30 Z" fill="none" stroke={color1} strokeWidth="2" className="anim-draw-path" />
      {/* 中轴线 */}
      <line x1="0" y1="0" x2="0" y2="30" stroke={color1} strokeWidth="2" />
      
      {/* 书页翻动 */}
      <path d="M0,30 Q-20,35 -35,25 V-15 Q-20,-5 0,0" fill="none" stroke={color2} strokeWidth="1" className="anim-pop-in" style={{ animationDelay: '1s' }} />
      <path d="M0,30 Q20,35 35,25 V-15 Q20,-5 0,0" fill="none" stroke={color2} strokeWidth="1" className="anim-pop-in" style={{ animationDelay: '1.2s' }} />
      
      {/* 知识发光点 */}
      <circle cx="-20" cy="5" r="2" fill={color2} className="anim-pulse-glow" />
      <circle cx="20" cy="10" r="1.5" fill={color1} className="anim-pulse-glow" style={{ animationDelay: '0.5s' }} />
    </g>
  </svg>
);

const BulbScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 灯泡轮廓 */}
      <path d="M-20,-10 A25,25 0 1,1 20,-10 C20,10 10,20 10,30 H-10 C-10,20 -20,10 -20,-10" fill="none" stroke={color1} strokeWidth="3" className="anim-draw-path" />
      <line x1="-10" y1="35" x2="10" y2="35" stroke={color1} strokeWidth="2" />
      <line x1="-6" y1="40" x2="6" y2="40" stroke={color1} strokeWidth="2" />
      
      {/* 灯丝闪烁 */}
      <path d="M-10,5 L-5,-10 L5,-10 L10,5" fill="none" stroke={color2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="anim-pulse-glow" />
      
      {/* 光芒四射 */}
      {[...Array(6)].map((_, i) => (
        <line key={i} x1="0" y1="-30" x2="0" y2="-45" stroke={color2} strokeWidth="2" strokeLinecap="round"
          transform={`rotate(${-90 + i * 36})`} className="anim-draw-path" style={{ animationDelay: '1s' }} />
      ))}
    </g>
  </svg>
);

const GenericObjectScene = ({ icon, color1, color2 }) => {
  // 一个通用的精致展示台，对于没做精细动画的物体，提供一个统一的高级感托盘
  return (
    <svg viewBox="0 0 200 120" className="custom-scene-svg">
      <g transform="translate(100, 60)">
        {/* 展台 */}
        <ellipse cx="0" cy="30" rx="40" ry="10" fill="none" stroke={color1} strokeWidth="1" opacity="0.3" className="anim-draw-circle" />
        <ellipse cx="0" cy="30" rx="20" ry="5" fill={color1} opacity="0.1" className="anim-pop-in" />
        
        {/* 悬浮物体光晕 */}
        <circle cx="0" cy="-10" r="25" fill={color2} opacity="0.05" className="anim-pulse-glow" />
        
        {/* 这里简化处理：用一个代表物体的几何体替代具体图标，或直接画出该意象的简单轮廓 */}
        <rect x="-15" y="-25" width="30" height="30" rx="4" fill="none" stroke={color1} strokeWidth="2" className="anim-car-bounce" />
        <circle cx="0" cy="-10" r="5" fill={color2} opacity="0.8" className="anim-car-bounce" style={{ animationDelay: '0.1s' }} />
        
        {/* 提示文字（仅为补位） */}
        <text x="0" y="-10" textAnchor="middle" fill={color1} fontSize="8" fontWeight="600" opacity="0.5" className="anim-fade-in">{icon}</text>
      </g>
    </svg>
  );
};

export default function ObjectScenes({ icon, color1, color2 }) {
  if (icon === 'fridge') return <FridgeScene color1={color1} color2={color2} />;
  if (icon === 'book') return <BookScene color1={color1} color2={color2} />;
  if (icon === 'bulb') return <BulbScene color1={color1} color2={color2} />;
  
  // 对于其他未逐一写定动画的 Object，使用高级展台组件包装
  return <GenericObjectScene icon={icon} color1={color1} color2={color2} />;
}
