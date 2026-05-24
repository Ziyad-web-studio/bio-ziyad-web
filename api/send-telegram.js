export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Pesan wajib diisi' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Konfigurasi Telegram belum lengkap di server' });
  }

  const text = `📬 *Feedback Baru*\n\n*Nama:* ${name || 'Anonim'}\n*Pesan:* ${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Gagal mengirim pesan ke Telegram' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
}
