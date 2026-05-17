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
