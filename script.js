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
  '':          'view-main',
  '#':         'view-main',
  '#home':     'view-main',
  '#category': 'view-category',
  '#code':     'view-code',
  '#desain':   'view-files',
};

function navigateToHash(hash) {
  const viewId = routeMap[hash] || 'view-main';
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
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
  const now    = new Date();
  const days   = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const h      = String(now.getHours()).padStart(2, '0');
  const m      = String(now.getMinutes()).padStart(2, '0');
  const s      = String(now.getSeconds()).padStart(2, '0');
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