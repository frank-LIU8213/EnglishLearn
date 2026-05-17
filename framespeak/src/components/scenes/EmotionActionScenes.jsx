import './CustomScenes.css';

const HeartSmileScene = ({ icon, color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 情感波纹扩散 */}
      <circle cx="0" cy="0" r="10" fill="none" stroke={color1} strokeWidth="2" className="anim-pulse-glow" style={{ animationDuration: '1.5s' }} />
      <circle cx="0" cy="0" r="25" fill="none" stroke={color2} strokeWidth="1" opacity="0.5" className="anim-pulse-glow" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
      <circle cx="0" cy="0" r="40" fill="none" stroke={color1} strokeWidth="0.5" opacity="0.2" className="anim-pulse-glow" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
      
      {/* 心跳/笑脸主体动画 */}
      <g className={icon === 'heart' ? 'anim-heart-beat' : 'anim-car-bounce'}>
        {icon === 'heart' ? (
          <path d="M0,15 L-15,-5 A10,10 0 0,1 0,-15 A10,10 0 0,1 15,-5 Z" fill={color2} opacity="0.8" stroke={color1} strokeWidth="1" />
        ) : (
          <>
            <circle cx="0" cy="0" r="20" fill={color1} opacity="0.2" stroke={color1} strokeWidth="2" />
            <circle cx="-7" cy="-5" r="2" fill={color2} />
            <circle cx="7" cy="-5" r="2" fill={color2} />
            <path d="M-10,5 Q0,15 10,5" fill="none" stroke={color2} strokeWidth="2" strokeLinecap="round" />
          </>
        )}
      </g>
    </g>
  </svg>
);

const HandActionScene = ({ icon, color1, color2 }) => (
  <svg viewBox="0 0 200 120" className="custom-scene-svg">
    <g transform="translate(100, 60)">
      {/* 动感放射线 */}
      {[...Array(8)].map((_, i) => (
        <line key={i} x1="0" y1="-25" x2="0" y2="-40" stroke={color1} strokeWidth="2" strokeLinecap="round"
          transform={`rotate(${i * 45})`} className="anim-draw-path" style={{ animationDelay: '0.5s' }} opacity="0.3" />
      ))}
      
      {/* 手部动作抽象块，模拟握手、挥手、拳头等力度感 */}
      <g className={icon === 'stop' || icon === 'fist' ? 'anim-shake' : 'anim-car-bounce'}>
        <rect x="-15" y="-15" width="30" height="30" rx="8" fill={color1} opacity="0.3" stroke={color1} strokeWidth="2" />
        <rect x="-10" y="-10" width="20" height="20" rx="4" fill={color2} opacity="0.6" />
        <text x="0" y="4" textAnchor="middle" fill="var(--bg-primary)" fontSize="10" fontWeight="bold">
          {icon.substring(0, 3).toUpperCase()}
        </text>
      </g>
    </g>
  </svg>
);

export default function EmotionActionScenes({ icon, color1, color2 }) {
  if (['heart', 'smile', 'face', 'tear'].includes(icon)) {
    return <HeartSmileScene icon={icon} color1={color1} color2={color2} />;
  }
  
  // handshake, hand, wave, fist, walk, stop, peace, run
  return <HandActionScene icon={icon} color1={color1} color2={color2} />;
}
