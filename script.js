/* ── FILE DATA ── */
const fileData = {
    'desain': {
        title: "Assets Desain",
        files: [
            { name: "logo_utama.png", sub: "1.2 MB - Image", icon: "fas fa-image", link: "javascript:void(0)" },
            { name: "bg_bintang.jpg", sub: "3.5 MB - Image", icon: "fas fa-image", link: "javascript:void(0)" },
            { name: "icon_pack.zip", sub: "15 MB - Archive", icon: "fas fa-file-archive", link: "javascript:void(0)" }
        ]
    }
};

/* ── NAVIGATION ── */
function openCategories() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('category-view').classList.remove('hidden');
}
function closeCategories() {
    document.getElementById('category-view').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
}
function openCodeCopyView() {
    document.getElementById('category-view').classList.add('hidden');
    document.getElementById('code-copy-view').classList.remove('hidden');
}
function closeCodeCopyView() {
    document.getElementById('code-copy-view').classList.add('hidden');
    document.getElementById('category-view').classList.remove('hidden');
}
function openFileList(categoryKey) {
    const data = fileData[categoryKey];
    if (!data) return;
    document.getElementById('file-view-title').innerText = data.title;
    const container = document.getElementById('file-list-container');
    let htmlContent = '';
    data.files.forEach(file => {
        htmlContent += `
            <a href="${file.link}" target="_blank" rel="noopener noreferrer" class="link-card">
                <div class="card-icon"><i class="${file.icon}"></i></div>
                <div class="card-content">
                    <span class="card-title">${file.name}</span><br>
                    <span class="card-sub">${file.sub}</span>
                </div>
                <i class="fas fa-download arrow-icon"></i>
            </a>`;
    });
    container.innerHTML = htmlContent;
    document.getElementById('category-view').classList.add('hidden');
    document.getElementById('file-view').classList.remove('hidden');
}
function closeFileList() {
    document.getElementById('file-view').classList.add('hidden');
    document.getElementById('category-view').classList.remove('hidden');
}

/* ── COPY ── */
function copyDivText(id, btn) {
    const text = document.getElementById(id).textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => { btn.innerHTML = originalIcon; }, 2000);
    });
}

/* ── AURORA ── */
const auroraCanvas = document.getElementById('aurora-canvas');
const actx = auroraCanvas.getContext('2d');
const auroraBands = [
    { y: 0.25, color: [0, 210, 160],  speed: 0.35, amp: 70,  freq: 0.75 },
    { y: 0.42, color: [100, 0, 230],  speed: 0.22, amp: 90,  freq: 0.55 },
    { y: 0.55, color: [0, 170, 255],  speed: 0.50, amp: 55,  freq: 0.95 },
    { y: 0.35, color: [160, 0, 255],  speed: 0.28, amp: 75,  freq: 0.65 },
    { y: 0.60, color: [0, 230, 120],  speed: 0.40, amp: 45,  freq: 1.10 },
];
let auroraTime = 0;

function resizeAurora() {
    auroraCanvas.width = window.innerWidth;
    auroraCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeAurora);
resizeAurora();

function drawAurora() {
    const AW = auroraCanvas.width, AH = auroraCanvas.height;
    actx.clearRect(0, 0, AW, AH);
    auroraBands.forEach(b => {
        const [r, g, bl] = b.color;
        const cy = b.y * AH + Math.sin(auroraTime * b.speed) * b.amp;
        const spread = AH * 0.22;
        const g2 = actx.createRadialGradient(AW / 2, cy, 0, AW / 2, cy, AW * 0.75);
        g2.addColorStop(0,   `rgba(${r},${g},${bl},0.20)`);
        g2.addColorStop(0.4, `rgba(${r},${g},${bl},0.08)`);
        g2.addColorStop(1,   `rgba(${r},${g},${bl},0)`);
        actx.beginPath();
        actx.moveTo(0, cy + spread);
        for (let x = 0; x <= AW; x += 8) {
            const wave = Math.sin(x * b.freq * 0.01 + auroraTime * b.speed * 1.5) * 28
                       + Math.sin(x * 0.005 + auroraTime * b.speed * 0.7) * 22;
            actx.lineTo(x, cy - spread + wave);
        }
        actx.lineTo(AW, cy + spread);
        actx.closePath();
        actx.fillStyle = g2;
        actx.fill();
    });
    auroraTime += 0.015;
    requestAnimationFrame(drawAurora);
}
drawAurora();

/* ── STARS ── */
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let width, height;
const stars = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.8 + 0.2
    });
}

let angle = 0;
function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate(angle);
    angle += 0.0003;
    stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x - width / 2, s.y - height / 2, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.a})`;
        ctx.fill();
    });
    ctx.restore();
    requestAnimationFrame(animate);
}
animate();

/* ── SHOOTING STAR ── */
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    shootingStar.style.top  = (Math.random() * 30 - 10) + 'vh';
    shootingStar.style.left = (Math.random() * 80) + 'vw';
    document.body.appendChild(shootingStar);
    setTimeout(() => shootingStar.remove(), 1500);
}
setTimeout(() => {
    createShootingStar();
    setInterval(createShootingStar, 5000);
}, 4000);
