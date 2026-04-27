// Navigation & Deep Linking
function goTo(viewId, animClass = 'slide-in') {
    const current = document.querySelector('.view.active');
    if (current) current.classList.remove('active');
    
    const next = document.getElementById(viewId);
    if (next) {
        next.classList.add('active');
        next.classList.remove('slide-in', 'slide-back');
        void next.offsetWidth; // Trigger reflow
        next.classList.add(animClass);
    }
    
    window.scrollTo(0, 0);
    history.pushState(null, null, '#' + viewId);
}

function goBack(viewId) {
    goTo(viewId, 'slide-back');
}

// Handle Initial Load & Browser Back
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        goTo(hash, 'slide-in');
    }
});

window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1) || 'view-main';
    const target = document.getElementById(hash);
    if (target) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        target.classList.add('active');
    }
});

// Copy Text Function
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

// Title Switcher
const titleEl = document.getElementById('studio-title');
const titles = ['Ziyad Studio', 'Creative Studio'];
let titleIndex = 0;
setInterval(() => {
    if (!titleEl) return;
    titleIndex = (titleIndex + 1) % titles.length;
    titleEl.style.opacity = '0';
    setTimeout(() => {
        titleEl.textContent = titles[titleIndex];
        titleEl.style.opacity = '1';
    }, 300);
}, 3000);
