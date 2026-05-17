/**
 * FrameSpeak · LocalStorage 进度管理
 */

const STORAGE_KEY = 'framespeak_progress';

function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // 兼容老数据，如果没有 favorites 字段则补全
      return { ...getDefaultProgress(), ...parsed, favorites: parsed.favorites || [] };
    }
    return getDefaultProgress();
  } catch {
    return getDefaultProgress();
  }
}

function getDefaultProgress() {
  return {
    completedIds: [],
    wrongIds: [],
    favorites: [],
    streak: 0,
    maxStreak: 0,
    totalCorrect: 0,
    totalAttempts: 0,
  };
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export { getProgress, saveProgress, resetProgress, getDefaultProgress };
