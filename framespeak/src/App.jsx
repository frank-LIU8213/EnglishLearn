import { useState, useEffect, useMemo } from 'react';
import sentencesData from './data/sentences.json';
import { getProgress, saveProgress, getDefaultProgress } from './hooks/useStorage';
import Particles from './components/Particles';
import Welcome from './components/Welcome';
import Practice from './components/Practice';
import Complete from './components/Complete';
import CategoryNav from './components/CategoryNav';
import './App.css';

/**
 * FrameSpeak · 主应用
 */
export default function App() {
  const [view, setView] = useState('welcome'); // welcome | practice | complete
  const [category, setCategory] = useState('all');
  const [progress, setProgress] = useState(() => getProgress());

  // 持久化进度
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // 预加载语音引擎
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  // 根据分类筛选并打乱题目
  const filteredSentences = useMemo(() => {
    let data;
    if (category === 'all') {
      data = [...sentencesData];
    } else if (category === 'favorites') {
      data = sentencesData.filter(s => progress.favorites.includes(s.id));
    } else {
      data = sentencesData.filter(s => s.category === category);
    }
    // Fisher-Yates 打乱
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    return data;
  }, [category, view]); // view 变化时也重新打乱

  // 连胜视觉效果
  useEffect(() => {
    const streak = progress.streak;
    if (streak >= 3) {
      document.body.classList.add('streak-active');
      const hue = Math.min(streak * 10, 200); // 从暖色到冷色
      document.body.style.setProperty('--streak-color', `hsla(${hue}, 80%, 30%, 0.15)`);
    } else {
      document.body.classList.remove('streak-active');
    }
  }, [progress.streak]);

  const handleStart = () => {
    setProgress(prev => ({ ...prev, streak: 0 }));
    setView('practice');
  };

  const handleComplete = () => {
    setView('complete');
  };

  const handleRestart = () => {
    setProgress(prev => ({
      ...getDefaultProgress(),
      favorites: prev.favorites || []
    }));
    setView('welcome');
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (view === 'practice') {
      setProgress(prev => ({ ...prev, streak: 0 }));
      setView('welcome');
    }
  };

  return (
    <div className="app-container">
      <Particles />

      {view === 'welcome' && (
        <Welcome onStart={handleStart} />
      )}

      {view === 'practice' && (
        <Practice
          sentences={filteredSentences}
          category={category}
          onComplete={handleComplete}
          progress={progress}
          setProgress={setProgress}
        />
      )}

      {view === 'complete' && (
        <Complete progress={progress} onRestart={handleRestart} />
      )}

      {view !== 'welcome' && (
        <CategoryNav active={category} onChange={handleCategoryChange} />
      )}
    </div>
  );
}
