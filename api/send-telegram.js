// ============================================================
//  /api/send-telegram.js  —  Vercel Serverless API Route
//  Security hardened: rate limit, honeypot, origin check,
//  input validation, spam filter, env vars, IP logging
// ============================================================

// ── In-memory rate limiter (resets on cold start, good enough for Vercel)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 detik
const RATE_LIMIT_MAX = 1;               // max 1 request per window

// ── Spam keyword filter (case-insensitive)
const SPAM_KEYWORDS = [
  'http', '.com', '.net', '.org', '.io',
  'bitcoin', 'crypto', 'casino', 'forex',
  'togel', 'slot', 'porn', 'sex', 'viagra',
  'click here', 'free money', 'make money',
];

// ── Allowed origins (tambahkan domain kamu di sini)
const ALLOWED_ORIGINS = [
  'https://ziyad-studio.vercel.app',
  'https://ziyadwebstudio.vercel.app',
  'https://ziyad-web-studio.vercel.app',
];

// ────────────────────────────────────────────────────────────
//  Helpers
// ────────────────────────────────────────────────────────────

function getClientIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
    // Window baru — reset counter
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - entry.timestamp)) / 1000
    );
    return { allowed: false, retryAfter };
  }

  entry.count++;
  rateLimitMap.set(ip, entry);
  return { allowed: true, retryAfter: 0 };
}

function containsSpam(text) {
  const lower = text.toLowerCase();
  return SPAM_KEYWORDS.some((kw) => lower.includes(kw));
}

function escapeMarkdown(text) {
  // Escape karakter khusus Telegram Markdown v1
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

// ────────────────────────────────────────────────────────────
//  Main handler
// ────────────────────────────────────────────────────────────

export default async function handler(req, res) {

  // 1️⃣ Method check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIP = getClientIP(req);

  // 2️⃣ Origin validation
  const origin = req.headers['origin'] || '';
  if (!ALLOWED_ORIGINS.includes(origin)) {
    console.warn(`[BLOCKED] Invalid origin: ${origin} | IP: ${clientIP}`);
    return res.status(403).json({ error: 'Forbidden' });
  }

  // 3️⃣ Rate limiting berbasis IP
  const { allowed, retryAfter } = checkRateLimit(clientIP);
  if (!allowed) {
    console.warn(`[RATE LIMIT] IP: ${clientIP} diblokir — coba lagi dalam ${retryAfter}s`);
    res.setHeader('Retry-After', retryAfter);
    return res.status(429).json({
      error: `Terlalu banyak permintaan. Coba lagi dalam ${retryAfter} detik.`,
    });
  }

  const { name, message, website } = req.body;

  // 4️⃣ Honeypot anti-bot
  // Field "website" hidden di frontend — manusia asli tidak mengisinya
  if (website && website.trim() !== '') {
    console.warn(`[HONEYPOT] Bot terdeteksi | IP: ${clientIP}`);
    // Return 200 palsu agar bot tidak tahu ia diblokir
    return res.status(200).json({ success: true });
  }

  // 5️⃣ Validasi input
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Pesan wajib diisi.' });
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 5) {
    return res.status(400).json({ error: 'Pesan minimal 5 karakter.' });
  }

  if (trimmedMessage.length > 1000) {
    return res.status(400).json({ error: 'Pesan maksimal 1000 karakter.' });
  }

  // 6️⃣ Spam keyword filter
  if (containsSpam(trimmedMessage) || (name && containsSpam(name))) {
    console.warn(`[SPAM] Pesan ditolak | IP: ${clientIP} | Pesan: ${trimmedMessage.substring(0, 60)}...`);
    return res.status(400).json({ error: 'Pesan mengandung konten yang tidak diizinkan.' });
  }

  // 7️⃣ Ambil token dari environment variables
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('[CONFIG] TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID belum disetel di env');
    return res.status(500).json({ error: 'Konfigurasi server belum lengkap.' });
  }

  // 8️⃣ Bangun pesan Telegram (sertakan IP untuk monitoring)
  const safeName    = name ? escapeMarkdown(name.trim().substring(0, 100)) : 'Anonim';
  const safeMessage = escapeMarkdown(trimmedMessage);
  const timestamp   = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

  const text = [
    '📬 *Feedback Baru*',
    '',
    `👤 *Nama:* ${safeName}`,
    `💬 *Pesan:* ${safeMessage}`,
    '',
    `🌐 *IP:* \`${clientIP}\``,
    `🕐 *Waktu:* ${timestamp}`,
  ].join('\n');

  // 9️⃣ Kirim ke Telegram
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('[TELEGRAM] API error:', data);
      return res.status(500).json({ error: 'Gagal mengirim pesan ke Telegram.' });
    }
  } catch (error) {
    console.error('[TELEGRAM] Fetch error:', error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
}
