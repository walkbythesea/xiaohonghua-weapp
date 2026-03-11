function dayCount(iso) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000) + 1;
}

function formatTime(ts) {
  const d = new Date(ts);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${month}月${day}日 ${hours}:${minutes}`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

const FALLBACKS = [
  '你做到了！每一小步都是真实的前进 🌱',
  '就是今天这一步，让你离目标更近了一点',
  '记录下来的，都是你认真对待自己的证明'
];

function fallbackPraise() {
  return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
}

const TITLES_NORMAL = ['又进一步！', '做到了！', '就是这样！', '太棒了！', '你真行！'];
const TITLES_MILESTONE = ['里程碑达成！', '坚持住了！', '这一刻值得铭记！'];

function randomTitle(ms) {
  const arr = ms ? TITLES_MILESTONE : TITLES_NORMAL;
  return arr[Math.floor(Math.random() * arr.length)];
}

function isMilestone(days) {
  return [7, 30, 100].includes(days);
}

function generateId() {
  return Date.now() + '' + Math.floor(Math.random() * 1000);
}

module.exports = {
  dayCount,
  formatTime,
  formatDate,
  fallbackPraise,
  randomTitle,
  isMilestone,
  generateId
};
