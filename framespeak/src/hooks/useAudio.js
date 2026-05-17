/**
 * FrameSpeak · 语音朗读（全平台兼容版）
 *
 * 策略：
 *   1. 主方案 → 在线 TTS 音频（有道词典 API），通过 <audio> 元素播放
 *      所有浏览器、所有设备都支持 <audio>，100% 兼容。
 *   2. 降级方案 → Web Speech API（speechSynthesis）
 *      仅在在线 TTS 加载失败（如离线/网络故障）时自动降级。
 */

// 复用同一个 Audio 实例，避免反复创建
let _audio = null;
function getAudio() {
  if (!_audio) {
    _audio = new Audio();
    _audio.volume = 1;
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

  // 停掉当前正在播放的
  audio.pause();
  audio.currentTime = 0;

  audio.src = getTTSUrl(text);

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
