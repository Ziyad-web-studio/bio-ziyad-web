// ============================================================
//  /api/send-telegram.js  —  Vercel Serverless API Route
// ============================================================

const rateLimitMap = new Map(); // ip -> { count, windowStart, violations }
const blockedIPs   = new Map(); // ip -> unblockAt (timestamp)

const WINDOW_MS        = 60 * 1000;  // window 60 detik
const MAX_PER_WINDOW   = 1;          // max 1 request per window
const MAX_VIOLATIONS   = 3;          // setelah 3x kena rate limit → hard block
const HARD_BLOCK_MS    = 60 * 60 * 1000; // hard block 1 jam

const SPAM_KEYWORDS = [
  'http', '.com', '.net', '.org', '.io',
  'bitcoin', 'crypto', 'casino', 'forex',
  'togel', 'slot', 'porn', 'sex', 'viagra',
  'click here', 'free money', 'make money',
];

const ALLOWED_ORIGINS = [
  'https://ziyadbio.my.id',
];

// ── Helpers ──────────────────────────────────────────────────

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

  // Cek hard block dulu
  const blockedUntil = blockedIPs.get(ip);
  if (blockedUntil) {
    if (now < blockedUntil) {
      const retryAfter = Math.ceil((blockedUntil - now) / 1000);
      return { allowed: false, hardBlocked: true, retryAfter };
    }
    // Hard block expired, bersihkan
    blockedIPs.delete(ip);
    rateLimitMap.delete(ip);
  }

  const entry = rateLimitMap.get(ip) || { count: 0, windowStart: now, violations: 0 };

  // Reset window jika sudah lewat
  if (now - entry.windowStart > WINDOW_MS) {
    entry.count       = 0;
    entry.windowStart = now;
  }

  entry.count++;

  if (entry.count > MAX_PER_WINDOW) {
    entry.violations++;
    rateLimitMap.set(ip, entry);

    // Jika sudah terlalu banyak violation → hard block 1 jam
    if (entry.violations >= MAX_VIOLATIONS) {
      blockedIPs.set(ip, now + HARD_BLOCK_MS);
      console.warn(`[HARD BLOCK] IP: ${ip} diblokir 1 jam (${entry.violations} violations)`);
      return { allowed: false, hardBlocked: true, retryAfter: 3600 };
    }

    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000);
    return { allowed: false, hardBlocked: false, retryAfter };
  }

  rateLimitMap.set(ip, entry);
  return { allowed: true };
}

function containsSpam(text) {
  const lower = text.toLowerCase();
  return SPAM_KEYWORDS.some(kw => lower.includes(kw));
}

function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
}

// ── Main handler ─────────────────────────────────────────────

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
    console.warn(`[BLOCKED] Origin: "${origin}" | IP: ${clientIP}`);
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Rate limit + hard block
  const rl = checkRateLimit(clientIP);
  if (!rl.allowed) {
    const msg = rl.hardBlocked
      ? `IP kamu diblokir selama 1 jam karena terlalu banyak percobaan.`
      : `Terlalu banyak permintaan. Coba lagi dalam ${rl.retryAfter} detik.`;
    console.warn(`[RATE LIMIT] IP: ${clientIP} | hardBlocked: ${rl.hardBlocked} | retry: ${rl.retryAfter}s`);
    res.setHeader('Retry-After', rl.retryAfter);
    return res.status(429).json({ error: msg, retryAfter: rl.retryAfter, hardBlocked: rl.hardBlocked });
  }

  const { name, message, website } = req.body;

  // Honeypot
  if (website && website.trim() !== '') {
    console.warn(`[HONEYPOT] IP: ${clientIP}`);
    return res.status(200).json({ success: true });
  }

  // Validasi input
  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ error: 'Pesan minimal 5 karakter.' });
  }
  if (message.trim().length > 1000) {
    return res.status(400).json({ error: 'Pesan maksimal 1000 karakter.' });
  }

  // Spam filter
  if (containsSpam(message) || (name && containsSpam(name))) {
    console.warn(`[SPAM] IP: ${clientIP}`);
    return res.status(400).json({ error: 'Pesan mengandung konten yang tidak diizinkan.' });
  }

  // Env vars
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID   = process.env.TELEGRAM_CHAT_ID;
  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Konfigurasi server belum lengkap.' });
  }

  // Kirim ke Telegram
  const safeName    = name ? escapeMarkdown(name.trim().substring(0, 100)) : 'Anonim';
  const safeMessage = escapeMarkdown(message.trim());
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

  try {
    const tgRes  = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    const tgData = await tgRes.json();

    if (tgData.ok) return res.status(200).json({ success: true });
    console.error('[TELEGRAM] Error:', tgData);
    return res.status(500).json({ error: 'Gagal mengirim pesan ke Telegram.' });
  } catch (err) {
    console.error('[TELEGRAM] Fetch error:', err);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
}
