import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Welcome.css';

/**
 * 欢迎界面 — 品牌展示 + 开始按钮
 */
export default function Welcome({ onStart }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.fromTo(el.querySelector('.brand-logo'),
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
    );
    tl.fromTo(el.querySelector('.brand-subtitle'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );
    tl.fromTo(el.querySelector('.brand-slogan'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );
    tl.fromTo(el.querySelector('.brand-desc'),
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );
    tl.fromTo(el.querySelector('.btn-start'),
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
      '-=0.1'
    );
    tl.fromTo(el.querySelector('.hint'),
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );
  }, []);

  const handleStart = () => {
    const el = containerRef.current;
    gsap.to(el, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: onStart,
    });
  };

  return (
    <div ref={containerRef} className="welcome-view">
      <div className="brand">
        <h1 className="brand-logo">
          Frame<span className="highlight">Speak</span>
        </h1>
        <p className="brand-subtitle">破局英语 · 框架思维训练器</p>
      </div>

      <p className="brand-slogan">
        忘掉单词，记住<em>骨架</em>。
      </p>

      <p className="brand-desc">
        跳过逐字翻译的陷阱，直接用英文框架思考。
        <br />
        30 个精选场景，重塑你的造句脑回路。
      </p>

      <button className="btn-start" onClick={handleStart}>
        <span>开始训练</span>
        <span className="arrow">→</span>
      </button>

      <p className="hint">免注册 · 即开即练 · 30 句精选</p>
    </div>
  );
}
