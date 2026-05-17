import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Complete.css';

/**
 * 完成界面 — 统计摘要 + 重新开始
 */
export default function Complete({ progress, onRestart }) {
  const containerRef = useRef(null);
  const accuracy = progress.totalAttempts > 0
    ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100)
    : 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.fromTo(el.querySelector('.complete-emoji'),
      { opacity: 0, scale: 0.3, rotation: -30 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' }
    );
    tl.fromTo(el.querySelector('.complete-title'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    );
    tl.fromTo(el.querySelector('.complete-subtitle'),
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      '-=0.2'
    );
    tl.fromTo(el.querySelectorAll('.stat-card'),
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.2)' },
      '-=0.1'
    );
    tl.fromTo(el.querySelector('.btn-restart'),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4 },
      '-=0.1'
    );
  }, []);

  return (
    <div ref={containerRef} className="complete-view">
      <div className="complete-emoji">🎯</div>
      <h2 className="complete-title">训练完成</h2>
      <p className="complete-subtitle">你的大脑正在构建新的英语回路</p>

      <div className="complete-stats">
        <div className="stat-card">
          <div className="stat-number text-cyan">{progress.totalCorrect}</div>
          <div className="stat-label">正确</div>
        </div>
        <div className="stat-card">
          <div className="stat-number text-amber">{accuracy}%</div>
          <div className="stat-label">正确率</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--accent-red)' }}>
            {progress.maxStreak}
          </div>
          <div className="stat-label">最高连胜</div>
        </div>
      </div>

      <button className="btn-restart" onClick={onRestart}>
        <span>再来一轮</span>
        <span className="arrow">↻</span>
      </button>
    </div>
  );
}
