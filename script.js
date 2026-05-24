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
  if (target) { target.classList.add('active');
    window.scrollTo(0, 0); }
}

window.addEventListener('hashchange', () => navigateToHash(window.location.hash));
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
setInterval(() => {
  titleIndex = (titleIndex + 1) % titles.length;
  titleEl.style.opacity = '0';
  titleEl.style.transform = 'translateY(-6px)';
  setTimeout(() => {
    titleEl.textContent = titles[titleIndex];
    titleEl.style.opacity = '1';
    titleEl.style.transform = 'translateY(0)';
  }, 300);
}, 3000);

/* ── LIVE CLOCK ── */
function updateClock() {
  const now = new Date();
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const el = document.getElementById('live-clock');
  const dl = document.getElementById('live-date');
  if (el) el.textContent = `${h}:${m}:${s}`;
  if (dl) dl.textContent = dateStr;
}
updateClock();
setInterval(updateClock, 1000);

/* ── COPY ── */
function copyText(id, btn) {
  const text = document.getElementById(id).textContent.trim();
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = '#3953bd';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  });
}

/* ── SHARE PAGE ── */
function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: 'Ziyad Web Studio',
      url: window.location.href
    }).catch(err => {
      console.error('Share failed:', err);
      fallbackShare();
    });
  } else {
    fallbackShare();
  }
}

function fallbackShare() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('Link telah disalin ke clipboard! Anda dapat membagikan link ini.');
  }).catch(err => {
    console.error('Copy failed:', err);
    prompt('Salin URL ini dan bagikan:', window.location.href);
  });
}

/* ── AVATAR GLOW ── */
function glowAvatar(el, on) {
  el.style.boxShadow = on ? '0 0 0 4px #3953bd55, 0 4px 24px #3953bd44' : '';
  el.style.transform = on ? 'scale(1.07)' : '';
}

/* ── FEEDBACK FORM ── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn     = document.getElementById('fb-submit');
    const originalHTML  = submitBtn.innerHTML;
    const nameVal       = (form.querySelector('[name="name"]')?.value    || '').trim();
    const messageVal    = (form.querySelector('[name="message"]')?.value || '').trim();
    const honeypotVal   = (form.querySelector('[name="website"]')?.value || '').trim();

    // Client-side: validasi panjang minimum (UX saja, bukan garis pertahanan utama)
    if (messageVal.length < 5) {
      const textarea = form.querySelector('[name="message"]');
      textarea.focus();
      textarea.style.borderColor = '#ba1a1a';
      setTimeout(() => textarea.style.borderColor = '', 2000);
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.8';
    submitBtn.innerHTML = '<span>Mengirim...</span><span class="material-symbols-outlined animate-spin" style="font-size:20px;">progress_activity</span>';

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    nameVal,
          message: messageVal,
          website: honeypotVal, // honeypot — server akan filter jika terisi
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Sukses
        submitBtn.style.background = '#16a34a';
        submitBtn.style.opacity    = '1';
        submitBtn.innerHTML = '<span>Terkirim!</span><span class="material-symbols-outlined" style="font-size:20px;">check_circle</span>';
        form.reset();
        setTimeout(() => {
          submitBtn.disabled        = false;
          submitBtn.style.background = '';
          submitBtn.style.opacity    = '1';
          submitBtn.innerHTML        = originalHTML;
        }, 4000);
      } else {
        // Error dari server (validasi, spam, rate limit, dsb)
        const msg = result.error || 'Gagal mengirim. Coba lagi.';
        throw new Error(msg);
      }

    } catch (error) {
      submitBtn.style.background = '#ba1a1a';
      submitBtn.style.opacity    = '1';
      submitBtn.innerHTML = `<span>${error.message || 'Gagal!'}</span><span class="material-symbols-outlined" style="font-size:20px;">error</span>`;
      console.error('Feedback error:', error);
      setTimeout(() => {
        submitBtn.disabled         = false;
        submitBtn.style.background = '';
        submitBtn.style.opacity    = '1';
        submitBtn.innerHTML        = originalHTML;
      }, 4000);
    }
  });
});
