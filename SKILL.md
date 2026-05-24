---
name: ziyad-web-studio-biolink
description: >
  Skill khusus untuk memahami, memodifikasi, mengembangkan, dan membuat fitur baru
  pada proyek Ziyad Web Studio Bio-Link. Gunakan skill ini setiap kali ada permintaan
  yang berkaitan dengan proyek ini — seperti menambah view baru, memperbaiki bug,
  mengubah konten, menyesuaikan tampilan, atau men-deploy situs. Skill ini juga relevan
  bila ada pertanyaan tentang SPA hash-routing vanilla JS, Tailwind CDN, atau arsitektur
  single-file HTML serupa.
compatibility: HTML5, Tailwind CSS (CDN), Vanilla JavaScript — tidak butuh build step
---

# Ziyad Web Studio — Bio-Link Skill

Panduan lengkap untuk bekerja dengan proyek **Ziyad Web Studio**, sebuah bio-link SPA
(Single-Page App) statis yang dibangun tanpa framework — murni HTML5, Tailwind CSS via CDN,
dan Vanilla JavaScript.

---

## Struktur File

```
bio-ziyad-web/
├── index.html      ← Semua view ada di sini (markup + Tailwind config)
├── style.css       ← Custom CSS: animasi, komponen, override
├── script.js       ← Routing, logika interaktif, avatar swap, jam, copy, share
└── assets/
    ├── favicon.ico / favicon-16x16.png / favicon-32x32.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png / android-chrome-512x512.png
    └── site.webmanifest
```

> Gambar avatar dan logo diambil dari repo eksternal:
> `https://raw.githubusercontent.com/Ziyad-web-studio/Assets/refs/heads/main/Images/`

---

## Arsitektur: SPA Hash-Based Routing

Semua "halaman" adalah `<div class="view">` di dalam satu `index.html`.
Hanya satu view yang punya class `.active` (ditampilkan), sisanya `display:none`.

### Daftar View

| View ID           | Hash          | Fungsi                                      |
|-------------------|---------------|---------------------------------------------|
| `view-main`       | `#` / kosong  | Halaman utama: profil, sosmed, AI tools      |
| `view-category`   | `#category`   | Daftar kategori folder                       |
| `view-code`       | `#code`       | Bahan buat aplikasi (kode, prompt, tools)    |
| `view-files`      | `#desain`     | Assets Desain — currently maintenance        |
| `view-ai`         | `#ai`         | Info & link Trae AI                          |
| `view-antigravity`| `#antigravity`| Info & link Antigravity CLI (Google)         |

### routeMap (di script.js)

```js
const routeMap = {
  '': 'view-main',
  '#': 'view-main',
  '#home': 'view-main',
  '#category': 'view-category',
  '#code': 'view-code',
  '#desain': 'view-files',
  '#ai': 'view-ai'
  // ⚠️ '#antigravity' BELUM terdaftar — ini bug yang harus difix
};
```

---

## Fungsi JavaScript Utama

| Fungsi | Keterangan |
|--------|-----------|
| `goTo(viewId, animClass, hash)` | Navigasi maju, animasi `slide-in` (kanan → kiri) |
| `goBack(viewId, hash)` | Kembali, animasi `slide-back` (kiri → kanan) |
| `goHome()` | Kembali ke `view-main` dari mana saja |
| `navigateToHash(hash)` | Handle URL hash saat load & hashchange |
| `swapAvatar(img, mode)` | Fade logo ↔ foto saat hover/touch avatar |
| `glowAvatar(el, bool)` | ⚠️ Dipanggil di HTML tapi tidak ada di script.js — bug! |
| `updateClock()` | Jam + tanggal real-time (WIB/local) di halaman maintenance |
| `copyText(id, btn)` | Salin isi elemen ke clipboard, feedback ikon ✓ |
| `sharePage()` | Web Share API; fallback clipboard copy |
| `openWhatsApp(e, phone)` | Fix TikTok in-app browser: deep link `whatsapp://` → fallback `wa.me` |

### Animasi Navigasi (style.css)

```css
@keyframes slideIn  { from { opacity:0; transform:translateX(24px) } to { opacity:1; transform:translateX(0) } }
@keyframes slideBack { from { opacity:0; transform:translateX(-24px) } to { opacity:1; transform:translateX(0) } }
.slide-in   { animation: slideIn  0.25s ease forwards; }
.slide-back { animation: slideBack 0.25s ease forwards; }
```

---

## Design System

### Warna (Material You-inspired, didefinisikan di tailwind.config)

| Token | Hex | Penggunaan |
|-------|-----|-----------|
| `primary` | `#3953bd` | Tombol utama, aksen aktif, label |
| `on-primary` | `#ffffff` | Teks di atas primary |
| `surface` | `#effcff` | Background card |
| `background` | `#F0F4F8` | Background halaman |
| `on-surface` | `#0f1e21` | Teks utama |
| `on-surface-variant` | `#444653` | Teks sekunder / label |
| `outline-variant` | `#c5c5d5` | Border tipis, chevron icon |
| `secondary` | `#754aa1` | Aksen ungu |
| `secondary-container` | `#ce9ffd` | Background badge ungu |

### Tipografi

| Token Tailwind | Font | Ukuran | Weight |
|----------------|------|--------|--------|
| `text-headline-lg` | Manrope | 24px / lh 32px | 700 |
| `text-headline-md` | Manrope | 20px / lh 28px | 600 |
| `text-body-lg` | Inter | 16px / lh 24px | 500 |
| `text-body-sm` | Inter | 14px / lh 20px | 400 |
| `text-label-sm` | Inter | 12px / lh 16px | 400 |
| `text-label-caps` | Inter | 12px / lh 16px | 600 + letter-spacing |

### Komponen CSS Utama

**`.link-card`** — Kartu navigasi interaktif
```css
/* rounded-3xl, bg-white, shadow, border transparent */
/* hover: shadow lebih besar, border primary/20, translateY(-2px) */
/* active: scale(0.98) */
```

**`.copy-box`** — Container kode/resource yang bisa disalin
```css
/* bg-white, rounded-20px, shadow, border slate-200 */
```

**`.code-wrapper`** — Inner box kode monospace
```css
/* bg-slate-50, rounded-12px, padding-right:48px untuk tombol copy */
```

**`.card-icon-wrap`** — Ikon bulat 48×48 di setiap kartu
```css
/* rounded-full, bg: e1f1f5 (default), color: primary */
```

**`.btn-dl`** — Tombol download/link aksi
```css
/* bg-primary, rounded-full, shadow, hover: darker + translateY(-1px) */
```

---

## Menambah View Baru

### 1. Tambah markup di index.html
```html
<div id="view-namaview" class="view flex-col min-h-screen">
  <header>...</header>
  <main>...</main>
</div>
```

### 2. Daftarkan di routeMap (script.js)
```js
const routeMap = {
  // ...existing...
  '#namaview': 'view-namaview'
};
```

### 3. Buat tombol navigasi
```html
<button onclick="goTo('view-namaview','slide-in','#namaview')" class="link-card">
  ...
</button>
```

---

## Bug yang Diketahui

| Bug | Lokasi | Fix |
|-----|--------|-----|
| `glowAvatar` tidak terdefinisi | `index.html` (event handler avatar) | Tambahkan fungsi di `script.js` |
| `#antigravity` tidak ada di `routeMap` | `script.js` | Tambahkan `'#antigravity': 'view-antigravity'` |
| Copyright tulis "© 2025" | `index.html` footer | Update ke "© 2026" |
| Dark mode dikonfigurasi tapi tidak diimplementasi | `tailwind.config` | Tambah toggle dark mode |

---

## Dependency Eksternal

| Library | URL CDN | Kegunaan |
|---------|---------|---------|
| Tailwind CSS | `cdn.tailwindcss.com?plugins=forms,container-queries` | Styling |
| Manrope + Inter | `fonts.googleapis.com` | Tipografi |
| Material Symbols | `fonts.googleapis.com` | Ikon sistem UI |
| Font Awesome 6.4 | `cdnjs.cloudflare.com` | Ikon brand (WA, TikTok, GitHub) |

---

## Deployment

Situs ini **100% statis** — tidak butuh server-side processing.

- **Vercel** (direkomendasikan): push ke GitHub → import di vercel.com → auto-deploy
- **Netlify**: build command kosong, publish directory `/`
- **GitHub Pages**: Settings → Pages → Deploy from branch `main` → root `/`
- **Python lokal**: `python3 -m http.server 8000`
- **Docker**: `FROM nginx:alpine` + `COPY . /usr/share/nginx/html`

> ⚠️ Web Share API dan Clipboard API butuh `https://` atau `http://localhost` — tidak bekerja di `file://`
