/* ── PRELOAD AVATAR PHOTO ── */
const preloadPhoto = new Image();
preloadPhoto.src = "https://raw.githubusercontent.com/Ziyad-web-studio/Assets/refs/heads/main/Images/IMG_20260428_081413.png";

/* ── AVATAR SWAP ── */
function swapAvatar(img, mode) {
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = mode === 'photo' ? img.dataset.photo : img.dataset.logo;
    img.style.opacity = '1';
  }, 150);
}

/* ── HASH ROUTING ── */
const routeMap = {
  '': 'view-main',
  '#': 'view-main',
  '#home': 'view-main',
  '#category': 'view-category',
  '#code': 'view-code',
  '#desain': 'view-files',
  '#ai': 'view-ai',
  '#antigravity': 'view-antigravity',
  '#support': 'view-support'
};

function navigateToHash(hash) {
  const viewId = routeMap[hash] || 'view-main';
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
}

window.addEventListener('hashchange', () => navigateToHash(window.location.hash));
window.addEventListener('popstate', () => navigateToHash(window.location.hash));
navigateToHash(window.location.hash);

/* ── NAVIGATION ── */
function goTo(viewId, animClass, hash) {
  const current = document.querySelector('.view.active');
  if (current) current.classList.remove('active');
  const next = document.getElementById(viewId);
  next.classList.add('active');
  next.classList.remove('slide-in', 'slide-back');
  void next.offsetWidth;
  next.classList.add(animClass || 'slide-in');
  window.scrollTo(0, 0);
  if (hash) history.pushState(null, '', hash);
}

function goBack(viewId, hash) {
  const current = document.querySelector('.view.active');
  if (current) current.classList.remove('active');
  const prev = document.getElementById(viewId);
  prev.classList.add('active');
  prev.classList.remove('slide-in', 'slide-back');
  void prev.offsetWidth;
  prev.classList.add('slide-back');
  window.scrollTo(0, 0);
  if (hash) history.pushState(null, '', hash);
}

function goHome() {
  const current = document.querySelector('.view.active');
  if (current) current.classList.remove('active');
  const home = document.getElementById('view-main');
  home.classList.add('active');
  home.classList.remove('slide-in', 'slide-back');
  void home.offsetWidth;
  home.classList.add('slide-back');
  window.scrollTo(0, 0);
  history.pushState(null, '', '#');
}

/* ── TITLE SWITCHER ── */
const titleEl = document.getElementById('studio-title');
const titles = ['Ziyad Studio', 'Creative Studio'];
let titleIndex = 0;
function cycleTitleOnce() {
  titleIndex = (titleIndex + 1) % titles.length;
  titleEl.style.opacity = '0';
  titleEl.style.transform = 'translateY(-6px)';
  setTimeout(() => {
    titleEl.textContent = titles[titleIndex];
    titleEl.style.opacity = '1';
    titleEl.style.transform = 'translateY(0)';
  }, 300);
}
let titleIntervalId = setInterval(cycleTitleOnce, 3000);

/* Pause title switcher saat tab tidak aktif */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(titleIntervalId);
  } else {
    titleIntervalId = setInterval(cycleTitleOnce, 3000);
  }
});

/* ── LIVE CLOCK ── */
function updateClock() {
  const now = new Date();
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const el = document.getElementById('live-clock');
  const dl = document.getElementById('live-date');
  if (el) el.textContent = `${h}:${m}:${s}`;
  if (dl) dl.textContent = dateStr;
}
updateClock();
setInterval(updateClock, 1000);

/* ── TOAST NOTIFICATION ── */
function showToast(message) {
  let toast = document.getElementById('zs-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'zs-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('show');
  void toast.offsetWidth;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ── COPY ── */
function copyText(id, btn) {
  const text = document.getElementById(id).textContent.trim();
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = '#3953bd';
    btn.style.color = '#fff';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; }, 2000);
  }).catch(() => {
    showToast('Gagal menyalin. Coba salin manual.');
  });
}

/* ── SHARE PAGE ── */
function sharePage() {
  // Selalu pakai URL root yang bersih (tanpa hash) biar OG banner terbaca WA
  const shareUrl   = 'https://www.ziyadbio.my.id/';
  const shareTitle = 'Ziyad Web Studio';
  const shareText  = 'Kumpulan link, tools, dan resources dari Ziyad Web Studio.';

  if (navigator.share) {
    navigator.share({ title: shareTitle, text: shareText, url: shareUrl })
      .catch(err => { console.error('Share failed:', err); fallbackShare(shareUrl); });
  } else {
    fallbackShare(shareUrl);
  }
}

function fallbackShare(url) {
  const shareUrl = url || 'https://www.ziyadbio.my.id/';
  navigator.clipboard.writeText(shareUrl).then(() => {
    showToast('Link telah disalin ke clipboard!');
  }).catch(() => { prompt('Salin URL ini:', shareUrl); });
}

/* ── AVATAR GLOW ── */
function glowAvatar(el, on) {
  el.style.boxShadow = on ? '0 0 0 4px #3953bd55, 0 4px 24px #3953bd44' : '';
  el.style.transform = on ? 'scale(1.07)' : '';
}

/* ── RATE LIMIT MODAL ── */
// Inject modal HTML + CSS sekali saat script load
(function injectRateLimitModal() {
  const style = document.createElement('style');
  style.textContent = `
    #rl-overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0,0,0,0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    #rl-overlay.show { display: flex; }
    #rl-card {
      background: #fff;
      border-radius: 28px;
      padding: 36px 28px 32px;
      max-width: 340px;
      width: 100%;
      text-align: center;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      animation: rl-pop .25s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes rl-pop {
      from { transform: scale(.85); opacity: 0; }
      to   { transform: scale(1);   opacity: 1; }
    }
    #rl-icon {
      width: 64px; height: 64px; border-radius: 50%;
      background: #fef2f2;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 20px;
    }
    #rl-title {
      font-family: 'Manrope', sans-serif;
      font-size: 20px; font-weight: 700;
      color: #0f1e21; margin-bottom: 8px;
    }
    #rl-desc {
      font-family: 'Inter', sans-serif;
      font-size: 14px; color: #6b7280; margin-bottom: 24px; line-height: 1.6;
    }
    #rl-timer-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 20px;
    }
    #rl-timer-label {
      font-family: 'Inter', sans-serif;
      font-size: 11px; font-weight: 600;
      letter-spacing: .08em; text-transform: uppercase;
      color: #9ca3af; margin-bottom: 6px;
    }
    #rl-timer {
      font-family: 'Manrope', sans-serif;
      font-size: 36px; font-weight: 800;
      color: #0f1e21; letter-spacing: .02em;
    }
    #rl-badge {
      display: inline-flex; align-items: center; gap: 6px;
      background: #fef2f2; border: 1px solid #fecaca;
      border-radius: 999px; padding: 6px 14px;
      font-family: 'Inter', sans-serif;
      font-size: 11px; font-weight: 600;
      letter-spacing: .06em; text-transform: uppercase;
      color: #dc2626;
    }
    #rl-badge .dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #ef4444;
      animation: rl-pulse 1.2s ease-in-out infinite;
    }
    @keyframes rl-pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50%      { opacity: .5; transform: scale(.8); }
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'rl-overlay';
  overlay.innerHTML = `
    <div id="rl-card">
      <div id="rl-icon">
        <span class="material-symbols-outlined" style="font-size:32px;color:#ef4444;font-variation-settings:'FILL' 1;">timer</span>
      </div>
      <div id="rl-title">Slow down!</div>
      <div id="rl-desc">Feedback kamu sudah terkirim.<br>Tunggu sebentar sebelum mengirim lagi.</div>
      <div id="rl-timer-box">
        <div id="rl-timer-label">Bisa kirim lagi dalam</div>
        <div id="rl-timer">1:30</div>
      </div>
      <div id="rl-badge"><span class="dot"></span>Cooldown Aktif</div>
    </div>
  `;
  document.body.appendChild(overlay);
})();

let rlCountdownInterval = null;

function showRateLimitModal(seconds, hardBlocked = false) {
  const overlay  = document.getElementById('rl-overlay');
  const timerEl  = document.getElementById('rl-timer');
  const modalTitle = document.getElementById('rl-title');
  const modalDesc  = document.getElementById('rl-desc');
  const modalBadge = document.getElementById('rl-badge');
  const modalIcon  = document.getElementById('rl-icon');
  if (!overlay || !timerEl) return;

  if (hardBlocked) {
    if (modalTitle) modalTitle.textContent = 'Kamu Diblokir!';
    if (modalDesc)  modalDesc.innerHTML    = 'Terlalu banyak percobaan.<br>IP kamu diblokir sementara.';
    if (modalBadge) modalBadge.innerHTML   = '<span class="dot"></span>Hard Block Aktif';
    if (modalIcon)  modalIcon.innerHTML    = '<span class="material-symbols-outlined" style="font-size:32px;color:#ef4444;font-variation-settings:\'FILL\' 1;">block</span>';
  } else {
    if (modalTitle) modalTitle.textContent = 'Slow down!';
    if (modalDesc)  modalDesc.innerHTML    = 'Feedback kamu sudah terkirim.<br>Tunggu sebentar sebelum mengirim lagi.';
    if (modalBadge) modalBadge.innerHTML   = '<span class="dot"></span>Cooldown Aktif';
    if (modalIcon)  modalIcon.innerHTML    = '<span class="material-symbols-outlined" style="font-size:32px;color:#ef4444;font-variation-settings:\'FILL\' 1;">timer</span>';
  }

  let remaining = seconds;

  function fmt(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2,'0')}`;
  }

  timerEl.textContent = fmt(remaining);
  overlay.classList.add('show');

  if (rlCountdownInterval) clearInterval(rlCountdownInterval);
  rlCountdownInterval = setInterval(() => {
    remaining--;
    timerEl.textContent = fmt(Math.max(0, remaining));
    if (remaining <= 0) {
      clearInterval(rlCountdownInterval);
      rlCountdownInterval = null;
      window.location.reload();
    }
  }, 1000);
}

/* ── FEEDBACK FORM + TURNSTILE ── */
(function () {
  let turnstileToken = '';
  let widgetId       = null;

  window._ts = { getToken: () => turnstileToken, getWidget: () => widgetId };

  function renderTurnstile() {
    if (!window.turnstile) return;
    const container = document.getElementById('turnstile-container');
    if (!container) return;

    if (widgetId !== null) {
      try { window.turnstile.remove(widgetId); } catch (e) {}
      widgetId = null;
    }
    turnstileToken = '';

    widgetId = window.turnstile.render(container, {
      sitekey: '0x4AAAAAADVk_HhQ2E8lQoM1',
      theme: 'light',
      callback:           (token) => { turnstileToken = token; console.log('[TS] Token siap ✅'); },
      'expired-callback': ()      => { console.log('[TS] Token expired, re-render'); renderTurnstile(); },
      'error-callback':   ()      => { console.log('[TS] Error, retry...'); setTimeout(renderTurnstile, 2000); },
    });
    console.log('[TS] Widget rendered, id:', widgetId);
  }

  function loadAndRender() {
    if (window.turnstile) {
      renderTurnstile();
      return;
    }
    if (document.getElementById('ts-script')) return;
    const s  = document.createElement('script');
    s.id     = 'ts-script';
    s.src    = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async  = true;
    s.onload = renderTurnstile;
    document.head.appendChild(s);
    console.log('[TS] Script loading...');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    if (!form) return;

    const submitBtn = document.getElementById('fb-submit');
    const container = document.createElement('div');
    container.id = 'turnstile-container';
    container.style.cssText = 'margin-bottom: 4px;';
    form.insertBefore(container, submitBtn);

    const supportView = document.getElementById('view-support');
    if (supportView) {
      new MutationObserver(() => {
        if (supportView.classList.contains('active')) {
          loadAndRender();
        }
      }).observe(supportView, { attributes: true, attributeFilter: ['class'] });

      if (supportView.classList.contains('active')) loadAndRender();
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalHTML = submitBtn.innerHTML;
      const nameVal      = (form.querySelector('[name="name"]')?.value    || '').trim();
      const messageVal   = (form.querySelector('[name="message"]')?.value || '').trim();
      const honeypotVal  = (form.querySelector('[name="website"]')?.value || '').trim();

      if (messageVal.length < 5) {
        const textarea = form.querySelector('[name="message"]');
        textarea.focus();
        textarea.style.borderColor = '#ba1a1a';
        setTimeout(() => textarea.style.borderColor = '', 2000);
        return;
      }

      if (!turnstileToken) {
        submitBtn.style.background = '#ba1a1a';
        submitBtn.innerHTML = '<span>Verifikasi belum siap, tunggu 2 detik lalu coba lagi</span><span class="material-symbols-outlined" style="font-size:18px;">error</span>';
        setTimeout(() => { submitBtn.style.background = ''; submitBtn.innerHTML = originalHTML; }, 3000);
        return;
      }

      submitBtn.disabled      = true;
      submitBtn.style.opacity = '0.8';
      submitBtn.innerHTML     = '<span>Mengirim...</span><span class="material-symbols-outlined animate-spin" style="font-size:20px;">progress_activity</span>';

      const tokenToSend = turnstileToken;
      turnstileToken = '';

      try {
        const response = await fetch('/api/send-telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nameVal, message: messageVal, website: honeypotVal, turnstileToken: tokenToSend })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          submitBtn.disabled         = false;
          submitBtn.style.opacity    = '1';
          submitBtn.style.background = '';
          submitBtn.innerHTML        = originalHTML;
          form.reset();
          renderTurnstile();
          showRateLimitModal(90);

        } else if (response.status === 429) {
          const retryAfter = parseInt(result.retryAfter || 90);
          submitBtn.disabled         = false;
          submitBtn.style.opacity    = '1';
          submitBtn.style.background = '';
          submitBtn.innerHTML        = originalHTML;
          renderTurnstile();
          showRateLimitModal(retryAfter > 0 ? retryAfter : 90, result.hardBlocked || false);

        } else {
          throw new Error(result.error || 'Gagal mengirim. Coba lagi.');
        }

      } catch (error) {
        submitBtn.style.background = '#ba1a1a';
        submitBtn.style.opacity    = '1';
        submitBtn.innerHTML = `<span>${error.message || 'Gagal!'}</span><span class="material-symbols-outlined" style="font-size:20px;">error</span>`;
        console.error('Feedback error:', error);
        renderTurnstile();
        setTimeout(() => {
          submitBtn.disabled         = false;
          submitBtn.style.background = '';
          submitBtn.style.opacity    = '1';
          submitBtn.innerHTML        = originalHTML;
        }, 4000);
      }
    });
  });
})();

/* ── WHATSAPP DEEP LINK (TikTok In-App Browser Fix) ── */
function openWhatsApp(e, phone) {
  e.preventDefault();

  var userAgent = navigator.userAgent || '';
  var isTikTok = userAgent.toLowerCase().indexOf('tiktok') !== -1 ||
                 userAgent.toLowerCase().indexOf('musical_ly') !== -1;

  var waNumber = phone;
  var deepLink = 'whatsapp://send?phone=' + waNumber;
  var fallback = 'https://wa.me/' + waNumber;

  if (isTikTok) {
    var fallbackTimer = setTimeout(function () {
      window.location.href = fallback;
    }, 2500);

    window.addEventListener('blur', function onBlur() {
      clearTimeout(fallbackTimer);
      window.removeEventListener('blur', onBlur);
    });

    window.location.href = deepLink;
  } else {
    window.open(fallback, '_blank');
  }
}
