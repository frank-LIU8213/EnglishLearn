import { useEffect, useRef } from 'react';
import './Particles.css';

/**
 * 浮动粒子背景 — 星座图谱氛围
 */
export default function Particles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      const isCyan = Math.random() > 0.4;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${isCyan ? 'var(--accent-cyan)' : 'var(--accent-amber)'};
        --p-opacity: ${Math.random() * 0.4 + 0.2};
        --p-drift: ${(Math.random() - 0.5) * 100}px;
        animation-duration: ${Math.random() * 15 + 15}s;
        animation-delay: ${Math.random() * -20}s;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    return () => particles.forEach(p => p.remove());
  }, []);

  return <div ref={containerRef} className="particles-container" />;
}
