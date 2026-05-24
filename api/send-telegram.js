// ============================================================
//  /api/send-telegram.js  —  Vercel Serverless API Route
// ============================================================

const rateLimitMap = new Map();
const WINDOW_MS      = 60 * 1000;
const MAX_PER_WINDOW = 1;

const SPAM_KEYWORDS = [
  'http', '.net', '.org', '.io',
  'bitcoin', 'crypto', 'casino', 'forex',
  'togel', 'slot', 'porn', 'sex', 'viagra',
  'click here', 'free money', 'make money',
];

const ALLOWED_ORIGINS = [
  'https://ziyadbio.my.id',
];

function getClientIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function checkRateLimit(ip) {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (entry.count >= MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

function containsSpam(text) {
  return SPAM_KEYWORDS.some(kw => text.toLowerCase().includes(kw));
}

function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

export default async function handler(req, res) {
  const origin = req.headers['origin'] || '';

  // CORS
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  const clientIP = getClientIP(req);

  // Origin check
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Rate limit
  const rl = checkRateLimit(clientIP);
  if (!rl.allowed) {
    res.setHeader('Retry-After', rl.retryAfter);
    return res.status(429).json({
      error: `Terlalu banyak permintaan. Coba lagi dalam ${rl.retryAfter} detik.`,
      retryAfter: rl.retryAfter
    });
  }

  const { name, message, website } = req.body;

  // Honeypot
  if (website && website.trim() !== '') {
    return res.status(200).json({ success: true });
  }

  // Validasi
  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ error: 'Pesan minimal 5 karakter.' });
  }
  if (message.trim().length > 1000) {
    return res.status(400).json({ error: 'Pesan maksimal 1000 karakter.' });
  }

  // Spam filter
  if (containsSpam(message) || (name && containsSpam(name))) {
    return res.status(400).json({ error: 'Pesan mengandung konten yang tidak diizinkan.' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;
  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Konfigurasi server belum lengkap.' });
  }

  const safeName    = name ? escapeMarkdown(name.trim().substring(0, 100)) : 'Anonim';
  const safeMessage = escapeMarkdown(message.trim());
  const timestamp   = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  const text = [
    '📬 *Feedback Baru*', '',
    `👤 *Nama:* ${safeName}`,
    `💬 *Pesan:* ${safeMessage}`, '',
    `🌐 *IP:* \`${clientIP}\``,
    `🕐 *Waktu:* ${timestamp}`,
  ].join('\n');

  try {
    const tgRes  = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    const tgData = await tgRes.json();
    if (tgData.ok) return res.status(200).json({ success: true });
    return res.status(500).json({ error: 'Gagal mengirim pesan ke Telegram.' });
  } catch (err) {
    return res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
}
