import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { playAnimation, transitionOut, transitionIn } from '../animations';
import { speak, unlockAudio } from '../hooks/useAudio';
import SceneIllustration from './SceneIllustration';
import sentencesData from '../data/sentences.json';
import './Practice.css';

/**
 * 练习界面 — 核心交互循环
 */
export default function Practice({ sentences, category, onComplete, progress, setProgress }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState('prompt'); // prompt | result
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [options, setOptions] = useState([]);
  const [shaking, setShaking] = useState(false);

  const containerRef = useRef(null);
  const chunksRef = useRef([]);
  const currentSentence = sentences[currentIndex];

  // 生成选项（1个正确 + 2个强迷惑性干扰项）
  const generateOptions = useCallback((sentence) => {
    const correct = sentence.core_framework;
    const allFrameworks = Array.from(new Set(sentencesData.map(s => s.core_framework)));
    
    // 过滤掉正确答案
    let others = allFrameworks.filter(f => f !== correct);

    // 提取首词用于匹配迷惑性
    const getFirstWord = (str) => str.replace(/[^\w\s\']/gi, '').trim().split(/\s+/)[0].toLowerCase();
    const correctFirstWord = getFirstWord(correct);
    
    // 筛选出首词相同的骨架，极具迷惑性
    let confusingOptions = others.filter(f => getFirstWord(f) === correctFirstWord);

    // 随机打乱
    confusingOptions = confusingOptions.sort(() => Math.random() - 0.5);
    let randomOthers = others.sort(() => Math.random() - 0.5);

    let finalDistractors = [];
    
    if (confusingOptions.length >= 2) {
      finalDistractors = confusingOptions.slice(0, 2);
    } else if (confusingOptions.length === 1) {
      finalDistractors = [confusingOptions[0]];
      const rest = randomOthers.filter(f => !finalDistractors.includes(f));
      finalDistractors.push(rest[0]);
    } else {
      // 退而求其次，找单词数相近的
      const correctLen = correct.trim().split(/\s+/).length;
      let lenMatchOptions = randomOthers.filter(f => {
         const len = f.trim().split(/\s+/).length;
         return Math.abs(len - correctLen) <= 1;
      });
      if (lenMatchOptions.length >= 2) {
        finalDistractors = lenMatchOptions.slice(0, 2);
      } else {
        finalDistractors = randomOthers.slice(0, 2);
      }
    }

    const all = [correct, ...finalDistractors].sort(() => Math.random() - 0.5);
    return all;
  }, []);

  useEffect(() => {
    if (currentSentence) {
      setOptions(generateOptions(currentSentence));
      setPhase('prompt');
      setSelectedOption(null);
      setIsCorrect(null);
      chunksRef.current = [];
    }
  }, [currentIndex, currentSentence, generateOptions]);

  // 入场动画
  useEffect(() => {
    if (containerRef.current) {
      transitionIn(containerRef.current);
    }
  }, [currentIndex]);

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return; // 已选过
    
    // 核心：在真正的点击事件中同步唤醒语音引擎
    unlockAudio();

    setSelectedOption(option);
    const correct = option === currentSentence.core_framework;
    setIsCorrect(correct);

    if (correct) {
      // 正确
      setProgress(prev => ({
        ...prev,
        totalCorrect: prev.totalCorrect + 1,
        totalAttempts: prev.totalAttempts + 1,
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.streak + 1),
        completedIds: [...new Set([...prev.completedIds, currentSentence.id])],
      }));

      setPhase('result');

      // 延迟播放动画
      setTimeout(() => {
        const chunks = chunksRef.current.filter(Boolean);
        if (chunks.length > 0) {
          playAnimation(currentSentence.animation_type, chunks, () => {
            // 朗读句子
            speak(currentSentence.correct_english);
          });
        }
      }, 300);

      // 自动切换下一题
      setTimeout(() => {
        goNext();
      }, 4000);
    } else {
      // 错误
      setShaking(true);
      setTimeout(() => setShaking(false), 400);

      setProgress(prev => ({
        ...prev,
        totalAttempts: prev.totalAttempts + 1,
        streak: 0,
        wrongIds: [...new Set([...prev.wrongIds, currentSentence.id])],
      }));

      // 1.5 秒后显示正确答案
      setTimeout(() => {
        setPhase('result');
        setTimeout(() => {
          const chunks = chunksRef.current.filter(Boolean);
          if (chunks.length > 0) {
            playAnimation(currentSentence.animation_type, chunks);
          }
        }, 300);

        setTimeout(() => goNext(), 4000);
      }, 1200);
    }
  };

  const goNext = () => {
    if (currentIndex >= sentences.length - 1) {
      onComplete();
      return;
    }

    transitionOut(containerRef.current, () => {
      setCurrentIndex(prev => prev + 1);
    });
  };

  const toggleFavorite = () => {
    if (!currentSentence) return;
    setProgress(prev => {
      const isFav = prev.favorites.includes(currentSentence.id);
      let newFavorites;
      if (isFav) {
        newFavorites = prev.favorites.filter(id => id !== currentSentence.id);
      } else {
        newFavorites = [...prev.favorites, currentSentence.id];
      }
      return { ...prev, favorites: newFavorites };
    });
  };

  if (!sentences || sentences.length === 0) {
    return (
      <div className="practice-view empty-state">
        <div className="empty-content">
          <div className="empty-icon">⭐</div>
          <h2>暂无收藏内容</h2>
          <p>快去其他分类练习并把喜欢的句子加入收藏夹吧！</p>
        </div>
      </div>
    );
  }

  if (!currentSentence) return null;

  const progressPercent = ((currentIndex + 1) / sentences.length) * 100;
  const isFavorite = progress.favorites.includes(currentSentence.id);

  return (
    <div className="practice-view">
      {/* 进度条 */}
      <div className="progress-bar" style={{ width: `${progressPercent}%` }} />

      {/* 统计 */}
      <div className="stats-panel">
        <div className="stat-item">
          <span className="stat-icon">✓</span>
          <span className="value">{progress.totalCorrect}</span>
          <span>/{progress.totalAttempts}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🔥</span>
          <span className="value streak-value">{progress.streak}</span>
        </div>
      </div>

      <div ref={containerRef} className={`practice-content ${shaking ? 'shake' : ''}`}>
        {/* 状态栏 */}
        <div className="status-bar">
          <span className="category-badge">
            <span className="badge-dot" />
            {currentSentence.category}
          </span>
          
          <div className="status-right">
            <button 
              className={`fav-btn ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              title={isFavorite ? "取消收藏" : "加入收藏"}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
            <span className="question-num">
              {currentIndex + 1} / {sentences.length}
            </span>
          </div>
        </div>

        {/* SVG 场景插图 */}
        <SceneIllustration key={currentIndex} sentence={currentSentence} />

        {/* 中文意图卡片 */}
        <div className="intent-card">
          <div className="intent-label">用英文表达</div>
          <div className="intent-text">{currentSentence.chinese_intent}</div>
          <div className="anti-warning">
            <span className="icon">🚫</span>
            <span>{currentSentence.anti_interference}</span>
          </div>
        </div>

        {phase === 'prompt' && (
          /* 框架选项 */
          <div className="options-container">
            <div className="options-label">选出正确的句型骨架</div>
            {options.map((opt, i) => {
              let cls = 'option-btn';
              if (selectedOption !== null) {
                if (opt === currentSentence.core_framework) cls += ' correct';
                else if (opt === selectedOption) cls += ' wrong';
                else cls += ' disabled';
              }
              return (
                <button
                  key={`${currentIndex}-${i}`}
                  className={cls}
                  onClick={() => handleOptionClick(opt)}
                  disabled={selectedOption !== null}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {phase === 'result' && (
          /* 结果展示 */
          <div className="result-area">
            <div className="sentence-display">
              {currentSentence.highlight_chunks.map((chunk, i) => (
                <span
                  key={i}
                  className="chunk"
                  ref={el => chunksRef.current[i] = el}
                >
                  {chunk}
                </span>
              ))}
            </div>

            <div className="full-sentence">{currentSentence.correct_english}</div>

            <div className="knowledge-card">
              <div className="label">💡 知识点</div>
              <div className="text">{currentSentence.knowledge_point}</div>
            </div>

            <button className="speak-btn" onClick={() => speak(currentSentence.correct_english)}>
              🔊 再听一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
