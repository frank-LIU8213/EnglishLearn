import './CustomScenes.css';

const BrainScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 左右脑轮廓 */}
      <path d="M-30,-10 C-30,-30 -10,-40 0,-30 C10,-40 30,-30 30,-10 C40,10 20,30 0,30 C-20,30 -40,10 -30,-10 Z" 
        fill="none" stroke={color1} strokeWidth="2" strokeLinejoin="round" className="anim-draw-path" />
      
      {/* 神经元连接闪烁 */}
      <g className="anim-fade-in" style={{ animationDelay: '1s' }}>
        <line x1="-15" y1="-10" x2="15" y2="10" stroke={color2} strokeWidth="1" opacity="0.4" />
        <line x1="-15" y1="10" x2="15" y2="-10" stroke={color2} strokeWidth="1" opacity="0.4" />
        <circle cx="-15" cy="-10" r="3" fill={color1} className="anim-pulse-glow" />
        <circle cx="15" cy="10" r="4" fill={color2} className="anim-pulse-glow" style={{ animationDelay: '0.3s' }} />
        <circle cx="-15" cy="10" r="2" fill={color2} className="anim-pulse-glow" style={{ animationDelay: '0.6s' }} />
        <circle cx="15" cy="-10" r="3" fill={color1} className="anim-pulse-glow" style={{ animationDelay: '0.9s' }} />
      </g>
    </g>
  </svg>
);

const ScaleScene = ({ color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 底座 */}
      <path d="M-20,40 L20,40 L0,-10 Z" fill="none" stroke={color1} strokeWidth="2" strokeLinejoin="round" className="anim-draw-path" />
      
      {/* 天平横梁与托盘 (摇摆动画) */}
      <g className="anim-shake">
        <line x1="-40" y1="-10" x2="40" y2="-10" stroke={color1} strokeWidth="3" strokeLinecap="round" />
        {/* 左托盘 */}
        <line x1="-40" y1="-10" x2="-55" y2="15" stroke={color2} strokeWidth="1" />
        <line x1="-40" y1="-10" x2="-25" y2="15" stroke={color2} strokeWidth="1" />
        <path d="M-60,15 Q-40,25 -20,15 Z" fill={color2} opacity="0.3" stroke={color2} strokeWidth="1.5" />
        {/* 右托盘 */}
        <line x1="40" y1="-10" x2="25" y2="15" stroke={color2} strokeWidth="1" />
        <line x1="40" y1="-10" x2="55" y2="15" stroke={color2} strokeWidth="1" />
        <path d="M20,15 Q40,25 60,15 Z" fill={color2} opacity="0.3" stroke={color2} strokeWidth="1.5" />
      </g>
    </g>
  </svg>
);

const AbstractSymbolScene = ({ icon, color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 发散的光晕与几何阵列 */}
      <circle cx="0" cy="0" r="40" fill="none" stroke={color1} strokeWidth="1" strokeDasharray="5 10" opacity="0.3" className="anim-spin-hours" />
      <polygon points="0,-45 40,25 -40,25" fill="none" stroke={color2} strokeWidth="1" opacity="0.2" className="anim-spin-hours" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
      
      {/* 核心符号占位 (用圆形弹跳代替具体的几十个小图标) */}
      <circle cx="0" cy="0" r="15" fill={color1} opacity="0.8" className="anim-pop-in" />
      <circle cx="0" cy="0" r="25" fill="none" stroke={color2} strokeWidth="2" className="anim-pulse-glow" />
      
      {/* 显示标识词以明确语境 */}
      <text x="0" y="4" textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold" className="anim-fade-in" style={{ animationDelay: '0.5s' }}>
        {icon.substring(0, 2).toUpperCase()}
      </text>
    </g>
  </svg>
);

export default function AbstractScenes({ icon, color1, color2 }) {
  if (icon === 'brain' || icon === 'thinking') return <BrainScene color1={color1} color2={color2} />;
  if (icon === 'scale') return <ScaleScene color1={color1} color2={color2} />;
  
  // 对于 puzzle, target, link, warning 等各种抽象概念，统一使用具有哲学感、几何阵列的高级抽象组件
  return <AbstractSymbolScene icon={icon} color1={color1} color2={color2} />;
}
