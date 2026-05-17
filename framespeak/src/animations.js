/**
 * FrameSpeak · GSAP 动画系统
 * 四种核心教学动画 + 过渡效果
 */
import gsap from 'gsap';

/**
 * 粉碎特效 — 错误直译单词碎裂飞散
 */
export function shatterEffect(element, onComplete) {
  const rect = element.getBoundingClientRect();
  const parent = element.parentElement;
  const fragments = 8;
  
  // 创建碎片
  for (let i = 0; i < fragments; i++) {
    const frag = document.createElement('span');
    frag.textContent = element.textContent.slice(
      Math.floor(i * element.textContent.length / fragments),
      Math.floor((i + 1) * element.textContent.length / fragments)
    ) || '·';
    frag.style.cssText = `
      position: absolute;
      left: ${rect.left + (i % 4) * (rect.width / 4)}px;
      top: ${rect.top}px;
      font-size: inherit;
      color: var(--accent-red);
      pointer-events: none;
      z-index: 1000;
    `;
    document.body.appendChild(frag);
    
    gsap.to(frag, {
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 300 - 100,
      rotation: (Math.random() - 0.5) * 720,
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => frag.remove(),
    });
  }
  
  // 原元素缩小消失
  gsap.to(element, {
    scale: 0,
    opacity: 0,
    duration: 0.3,
    onComplete,
  });
}

/**
 * 磁吸拼接 — 语块飞入吸附
 */
export function magneticSnap(chunks, onComplete) {
  const tl = gsap.timeline({ onComplete });
  
  chunks.forEach((el, i) => {
    // 设定初始位置（散落在周围）
    gsap.set(el, {
      opacity: 0,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100 + 50,
      scale: 0.7,
    });
    
    tl.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }, i * 0.15);
    
    // 吸附闪光效果
    tl.fromTo(el, 
      { boxShadow: '0 0 0px rgba(0,212,255,0)' },
      { 
        boxShadow: '0 0 20px rgba(0,212,255,0.5)',
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      },
      i * 0.15 + 0.3
    );
  });
  
  return tl;
}

/**
 * 动词翻转 — 助动词/Be 动词抛物线飞至句首
 */
export function verbFlip(chunks, verbIndex, onComplete) {
  const tl = gsap.timeline({ onComplete });
  
  // 先让所有 chunks 出现
  chunks.forEach((el, i) => {
    gsap.set(el, { opacity: 0, y: 20 });
    tl.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    }, i * 0.1);
  });
  
  // 动词高亮
  if (chunks[verbIndex]) {
    tl.to(chunks[verbIndex], {
      color: '#ff9f43',
      scale: 1.15,
      duration: 0.3,
    }, '+=0.2');
    
    // 动词抛物线翻转
    tl.to(chunks[verbIndex], {
      y: -60,
      duration: 0.3,
      ease: 'power2.out',
    });
    
    tl.to(chunks[verbIndex], {
      y: 0,
      scale: 1,
      color: 'var(--accent-cyan)',
      duration: 0.4,
      ease: 'bounce.out',
    });
  }
  
  return tl;
}

/**
 * 主语位移 + 高亮脉冲
 */
export function subjectShift(chunks, onComplete) {
  const tl = gsap.timeline({ onComplete });
  
  chunks.forEach((el, i) => {
    gsap.set(el, { opacity: 0, x: i === 0 ? 100 : 0, y: 20 });
    
    tl.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, i * 0.12);
  });
  
  // 第一个 chunk 高亮脉冲
  if (chunks[0]) {
    tl.to(chunks[0], {
      boxShadow: '0 0 24px rgba(0,212,255,0.4)',
      duration: 0.4,
      yoyo: true,
      repeat: 2,
      ease: 'sine.inOut',
    }, '+=0.1');
  }
  
  return tl;
}

/**
 * 高亮脉冲 — 地道小词闪烁强调
 */
export function highlightPulse(chunks, onComplete) {
  const tl = gsap.timeline({ onComplete });
  
  chunks.forEach((el, i) => {
    gsap.set(el, { opacity: 0, scale: 0.9 });
    
    tl.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.4)',
    }, i * 0.12);
  });
  
  // 关键词脉冲
  chunks.forEach((el, i) => {
    tl.to(el, {
      backgroundColor: 'rgba(0,212,255,0.2)',
      boxShadow: '0 0 16px rgba(0,212,255,0.3)',
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    }, '-=0.1');
  });
  
  return tl;
}

/**
 * 题目切换过渡
 */
export function transitionOut(container, onComplete) {
  gsap.to(container, {
    y: -40,
    opacity: 0,
    duration: 0.35,
    ease: 'power2.in',
    onComplete,
  });
}

export function transitionIn(container) {
  gsap.fromTo(container,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
  );
}

/**
 * 根据 animation_type 分发动画
 */
export function playAnimation(type, chunks, onComplete) {
  switch (type) {
    case 'shatter_effect':
      return magneticSnap(chunks, onComplete); // shatter 在选错时用
    case 'magnetic_snap':
      return magneticSnap(chunks, onComplete);
    case 'verb_flip':
      return verbFlip(chunks, 0, onComplete);
    case 'subject_shift':
      return subjectShift(chunks, onComplete);
    case 'highlight_pulse':
      return highlightPulse(chunks, onComplete);
    default:
      return magneticSnap(chunks, onComplete);
  }
}
