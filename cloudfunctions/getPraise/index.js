const cloud = require('wx-server-sdk');
const https = require('https');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || 'YOUR_OPENROUTER_API_KEY';

function callOpenRouter(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'anthropic/claude-sonnet-4-20250514',
      max_tokens: 200,
      messages: [
        { role: 'system', content: '你是一个真诚有温度的鼓励者，风格在走心暖心和幽默俏皮之间灵活切换，根据用户内容判断风格。' },
        { role: 'user', content: prompt }
      ]
    });

    const options = {
      hostname: 'openrouter.ai',
      port: 443,
      path: '/api/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const text = json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
          resolve(text ? text.trim() : null);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

exports.main = async (event) => {
  const { goalName, days, content, isMilestone } = event;

  const msNote = isMilestone
    ? `今天恰好是第${days}天里程碑，这是非常特别的时刻！`
    : '';

  const prompt = `目标：「${goalName}」第${days}天，进展：「${content}」${msNote}
写一段夸夸：真诚有力不套话，结合具体内容让Ta感觉被看见，60字以内，用"你"，最多1个emoji，只输出正文。`;

  try {
    const praise = await callOpenRouter(prompt);
    return { praise: praise || fallback() };
  } catch (err) {
    console.error('AI praise error:', err);
    return { praise: fallback() };
  }
};

function fallback() {
  const arr = [
    '你做到了！每一小步都是真实的前进 🌱',
    '就是今天这一步，让你离目标更近了一点',
    '记录下来的，都是你认真对待自己的证明'
  ];
  return arr[Math.floor(Math.random() * arr.length)];
}
