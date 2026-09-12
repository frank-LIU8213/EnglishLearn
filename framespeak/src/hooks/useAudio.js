/**
 * FrameSpeak · 语音朗读（全平台兼容版）
 *
 * 策略：
 *   1. 主方案 → 在线 TTS 音频（有道词典 API），通过 <audio> 元素播放
 *      所有浏览器、所有设备都支持 <audio>，100% 兼容。
 *   2. 降级方案 → Web Speech API（speechSynthesis）
 *      仅在在线 TTS 加载失败（如离线/网络故障）时自动降级。
 *
 * 播放时机：句子出现时仅预加载音频（不播放），避免网络延迟导致
 * 播放请求时音频还没就绪。真正调用 speak() 播放时，必须在用户点击/
 * 触摸事件的同步调用栈内直接调用（不能包在 setTimeout 或动画完成回调
 * 里），否则会脱离用户手势，被移动端浏览器的自动播放策略静默拦截。
 */

// 复用同一个 Audio 实例，避免反复创建
let _audio = null;
function getAudio() {
  if (!_audio) {
    _audio = new Audio();
    _audio.volume = 1;
    _audio.preload = 'auto';
  }
  return _audio;
}

/**
 * 生成在线 TTS 音频 URL
 * 有道词典 TTS 接口，免费、稳定、无 CORS 限制
 */
function getTTSUrl(text) {
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;
}

/**
 * 预加载句子音频，句子出现时调用，只加载不播放
 * 这样用户点击播放按钮时音频已经就绪，播放更即时、更不容易失败
 */
export function preloadAudio(text) {
  if (!text) return;
  const audio = getAudio();
  const url = getTTSUrl(text);
  if (audio.src === url) return; // 已经在加载/加载完成，无需重复触发
  audio.src = url;
  audio.load();
}

/**
 * 使用 Web Speech API 作为降级方案
 */
function speakFallback(text, lang = 'en-US') {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.resume();
  window.speechSynthesis.cancel();

  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
      || voices.find(v => v.lang.startsWith('en-US'))
      || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;

    window.speechSynthesis.speak(utterance);
  }, 50);
}

/**
 * 朗读英文句子（主入口）
 */
export function speak(text) {
  if (!text) return;

  const audio = getAudio();
  const url = getTTSUrl(text);

  // 停掉当前正在播放的
  audio.pause();
  audio.currentTime = 0;

  // 如果已经预加载好同一个句子，直接复用，不重新触发网络请求
  if (audio.src !== url) {
    audio.src = url;
  }

  const playPromise = audio.play();
  if (playPromise && playPromise.catch) {
    playPromise.catch(() => {
      // 在线音频播放失败（离线、CORS、或首次需要手势），降级到 speechSynthesis
      speakFallback(text);
    });
  }
}

/**
 * 解锁移动端音频播放权限
 * 必须在用户的真实 click/touch 事件中同步调用
 */
export function unlockAudio() {
  // 解锁 <audio> 元素
  const audio = getAudio();
  // 播放一个极短的静音，让浏览器授权该 Audio 实例
  audio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
  const p = audio.play();
  if (p && p.catch) p.catch(() => {});

  // 同时解锁 speechSynthesis（作为降级方案的备用）
  if (window.speechSynthesis) {
    const u = new SpeechSynthesisUtterance('');
    u.volume = 0;
    window.speechSynthesis.speak(u);
  }
}
