const rateLimit = new Map();

export default async function handler(req, res) {

  // METHOD CHECK
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  // ORIGIN CHECK
  const allowedOrigin = 'https://DOMAINLU.vercel.app';

  if (req.headers.origin !== allowedOrigin) {
    return res.status(403).json({
      error: 'Forbidden origin'
    });
  }

  // IP DETECTION
  const ip =
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    'unknown';

  // RATE LIMIT
  const now = Date.now();
  const cooldown = 60 * 1000;

  if (rateLimit.has(ip)) {
    const lastRequest = rateLimit.get(ip);

    if (now - lastRequest < cooldown) {
      return res.status(429).json({
        error: 'Terlalu banyak request'
      });
    }
  }

  rateLimit.set(ip, now);

  // BODY VALIDATION
  const { name, message, website } = req.body;

  // HONEYPOT
  if (website) {
    return res.status(400).json({
      error: 'Bot detected'
    });
  }

  if (!message || message.length < 5) {
    return res.status(400).json({
      error: 'Pesan tidak valid'
    });
  }

  // SPAM FILTER
  const spamWords = [
    'http',
    '.com',
    'bitcoin',
    'crypto',
    'casino'
  ];

  const lower = message.toLowerCase();

  const detected = spamWords.some(word =>
    lower.includes(word)
  );

  if (detected) {
    return res.status(400).json({
      error: 'Spam terdeteksi'
    });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  try {

    const text =
`📬 *Feedback Baru*

*Nama:* ${name || 'Anonim'}
*Pesan:* ${message}

🛡 IP: ${ip}`;

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'Markdown'
        })
      }
    );

    const data = await response.json();

    if (!data.ok) {
      throw new Error('Telegram API Error');
    }

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    return res.status(500).json({
      error: 'Server error'
    });

  }
}