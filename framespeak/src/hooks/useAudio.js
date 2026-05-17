/**
 * FrameSpeak · 语音朗读
 */

export function speak(text, lang = 'en-US') {
  if (!window.speechSynthesis) return;
  
  // 核心修复：Android Chrome TTS 经常会挂起，必须先 resume 再 cancel 才能清除死锁队列
  window.speechSynthesis.resume();
  window.speechSynthesis.cancel();
  
  // 给系统一点时间清理队列，再执行 speak，否则在部分老安卓上依然会被丢弃
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // 尝试使用更好的英语声音
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
      || voices.find(v => v.lang.startsWith('en-US'))
      || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;
    
    window.speechSynthesis.speak(utterance);
  }, 50);
}

// 专门用于解决移动端（iOS/Android）在 setTimeout 中无法自动发声的权限机制
// 必须在用户的第一次点击（onClick）事件中同步调用此方法
export function unlockAudio() {
  if (!window.speechSynthesis) return;
  // 修复：千万不能设置 rate = 10，安卓原生 TTS 引擎超出 [0.1, 3.0] 限制会直接静默报错并挂起整个引擎！
  // 恢复为空字符串或空格，音量设为 0。
  const utterance = new SpeechSynthesisUtterance('');
  utterance.volume = 0;
  window.speechSynthesis.speak(utterance);
}
