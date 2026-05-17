/**
 * FrameSpeak · 语音朗读
 */

export function speak(text, lang = 'en-US') {
  if (!window.speechSynthesis) return;
  
  window.speechSynthesis.cancel();
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
}

// 专门用于解决移动端（iOS/Android）在 setTimeout 中无法自动发声的权限机制
// 必须在用户的第一次点击（onClick）事件中同步调用此方法
export function unlockAudio() {
  if (!window.speechSynthesis) return;
  // iOS Safari 对纯空字符串和 volume=0 可能会有静默挂起的玄学 bug
  // 这里使用一个空格，并给予极小的音量
  const utterance = new SpeechSynthesisUtterance(' ');
  utterance.volume = 0.01;
  utterance.rate = 10; // 尽快读完
  window.speechSynthesis.speak(utterance);
}
