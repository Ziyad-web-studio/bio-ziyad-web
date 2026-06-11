# Ziyad Web Studio - Halaman Link & Sumber Daya

Sebuah web app satu halaman (single‑page) yang simpel dan elegan, berfungsi sebagai bio‑link personal sekaligus pusat sumber daya untuk **Ziyad Web Studio**. Dibangun dengan **HTML5**, **Tailwind CSS** (via CDN), dan **vanilla JavaScript**, hasilnya adalah pengalaman SPA yang responsif dengan hash‑based routing, animasi halus, serta fitur share / copy sekali ketuk.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## Daftar Isi
- [Gambaran Umum](#overview)
- [Fitur Unggulan](#key-features)
- [Tech Stack](#tech-stack)
- [Struktur File](#file-structure)
- [Memulai (Development Lokal)](#getting-started-local-development)
- [Kustomisasi](#customization)
- [Feedback Form (Telegram Setup)](#feedback-form-telegram-setup)
- [Opsi Deployment](#deployment-options)
- [Troubleshooting](#troubleshooting)
- [Lisensi](#license)

---

## Gambaran Umum

Ziyad Web Studio adalah website **statis, client‑only** yang menampilkan:

- Halaman profil utama dengan avatar switcher yang animasi.
- Akses cepat ke folder, proyek, media sosial, dan tools AI.
- Tombol share yang memanfaatkan Web Share API (dengan fallback ke clipboard copy).
- Jam real‑time di halaman maintenance.
- Navigasi hash‑route yang mulus tanpa perlu reload halaman.

Desainnya terinspirasi dari minimalis ala Apple — palet warna bersih, kartu dengan sudut membulat, dan efek glass‑morphism yang subtle lewat utility Tailwind.

---

## Fitur Unggulan

- **Layout responsif** – tampil optimal di mobile, tablet, maupun desktop.
- **Navigasi SPA‑like** – hash‑based routing (`#`, `#category`, `#code`, `#desain`, `#ai`) dengan animasi slide‑in/slide‑out.
- **Avatar interaktif** – ketuk/hover untuk beralih antara logo dan foto, lengkap dengan efek glow.
- **Tombol share** – menggunakan `navigator.share` jika tersedia; jika tidak, URL otomatis disalin ke clipboard.
- **Copy sekali ketuk** – klik ikon copy di samping blok kode untuk langsung menyalin isinya.
- **Jam real‑time** – ditampilkan di halaman maintenance (`#desain`).
- **Kode modular** – dipisah menjadi `index.html` (markup), `style.css` (custom styles), dan `script.js` (routing & logika).
- **Favicon & kesiapan PWA** – sudah dilengkapi favicon set, apple‑touch icon, dan `site.webmanifest` untuk Android Chrome.
- **Ringan** – tidak butuh build step, tidak pakai framework berat, Tailwind langsung diambil dari CDN.

---

## Tech Stack

| Teknologi            | Peran / Kegunaan                                       |
|----------------------|--------------------------------------------------------|
| **HTML5**            | Markup semantis dan struktur halaman SPA-like          |
| **Tailwind CSS**     | Styling utility‑first via CDN (`cdn.tailwindcss.com`)  |
| **Vanilla JS**       | Routing, manipulasi DOM, avatar swap, logika share, jam |
| **Font Awesome**     | Ikon brand untuk WhatsApp, TikTok, GitHub, dll.        |
| **Material Symbols** | Ikon UI (share, folder, code, palette, dll.)           |
| **Google Fonts**     | Manrope (heading) & Inter (body) via fonts.googleapis.com |
| **Favicon set**      | `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-*.png` |
| **Web App Manifest** | `site.webmanifest` untuk pengalaman PWA yang bisa diinstal |

---

## Struktur File

```
bio-ziyad-web/
├── index.html          # HTML utama – berisi semua view (main, category, code, files, ai)
├── style.css           # CSS kustom (animasi, override, dll.)
├── script.js           # JavaScript – routing, avatar swap, share, clock, copy
├─ assets/
│   ├─ favicon.ico
│   ├─ favicon-16x16.png
│   ├─ favicon-32x32.png
│   ├─ apple-touch-icon.png
│   ├─ android-chrome-192x192.png
│   ├─ android-chrome-512x512.png
│   └─ site.webmanifest
└── README.md           # File ini
```

> **Catatan:** Semua aset statis (ikon, favicon) disimpan di dalam folder `assets/` dan dirujuk dengan path relatif (`assets/...`).

---

## Memulai (Development Lokal)

Karena proyeknya murni file statis, kamu bisa langsung membukanya di browser **atau** menyajikannya lewat static server agar mime type‑nya benar dan terhindar dari masalah CORS saat menggunakan fitur seperti Web Share API.

### Opsi 1: Buka file langsung (paling cepat)

```bash
# Pastikan kamu berada di root proyek
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

> Beberapa fitur (misalnya Web Share API) mengharuskan halaman diakses via `http://` atau `https://`. Membuka lewat `file://` bisa menonaktifkan tombol share.

### Opsi 2: Jalankan dengan local dev server (direkomendasikan)

Bisa pakai salah satu dari berikut ini:

#### Python 3
```bash
python3 -m http.server 8000
# Lalu buka http://localhost:8000
```

#### Node.js (http-server)
```bash
npx http-server -p 8000
# Lalu buka http://localhost:8000
```

#### Ekstensi VS Code Live Server
1. Instal ekstensi "Live Server".
2. Klik kanan `index.html` → **Open with Live Server**.
3. Halaman akan otomatis reload setiap ada perubahan.

### Opsi 3: Pakai `vite` atau `parcel` (agak berlebihan tapi bisa)

Kalau kamu ingin dev server dengan hot reload:

```bash
npm init -y
npm install -D vite
npx vite
```

Lalu konfigurasi `vite` untuk menyajikan folder tersebut (secara default sudah serve `index.html`).

---

## Kustomisasi

### Mengubah Konten

Semua teks dan link ada di dalam `index.html`. Edit bagian yang relevan:

- **Judul studio** – ubah teks di dalam `<div id="studio-title">`.
- **Gambar avatar** – modifikasi atribut `data-logo` dan `data-photo` pada `<img>` avatar.
- **Link & tombol** – update nilai `href` di tag `<a>` (WhatsApp, TikTok, GitHub, dll.).
- **Blok kode yang bisa disalin** – edit teks di dalam elemen `<div id="text1">`, `#text2`, `#text3`.
- **Teks halaman maintenance** – edit `<p>` di dalam `#view-files`.

### Penyesuaian Tampilan

- **Konfigurasi Tailwind** – sesuaikan warna, font, breakpoint di tag `<script>` pada `index.html`, di bagian `tailwind.config = { ... }`.
- **CSS kustom** – tambahkan atau override rule di `style.css`.
- **Animasi** – ubah durasi transisi atau keyframe di `style.css`.

### Menambahkan View Baru

1. Tambahkan blok `<div id="view-newview" class="view flex-col min-h-screen">` setelah view yang sudah ada.
2. Update objek `routeMap` di `script.js`:
   ```js
   const routeMap = {
     '': 'view-main',
     '#': 'view-main',
     '#home': 'view-main',
     '#category': 'view-category',
     '#code': 'view-code',
     '#desain': 'view-files',
     '#ai': 'view-ai',
     '#newview': 'view-newview'   // <-- tambahkan ini
   };
   ```
3. Buat tombol/link navigasi yang memanggil `goTo('view-newview', 'slide-in', '#newview')`.

### Mengganti Favicon

Ganti file di dalam `assets/` dengan milikmu sendiri, pertahankan nama file yang sama, atau update tag `<link>` di `<head>` pada `index.html` agar mengarah ke path yang baru.

---

## Feedback Form (Telegram Setup)

Proyek ini dilengkapi dengan form feedback kustom yang mengirimkan pesan langsung ke Telegram kamu. Untuk keamanan, sistem ini menggunakan **Vercel Serverless Functions** agar Token Bot Telegram tidak bocor ke publik.

### Cara Menyiapkan (Ziyad's Checklist):

1.  **Buat Bot Telegram:**
    - Chat ke [@BotFather](https://t.me/botfather) di Telegram.
    - Gunakan perintah `/newbot` dan ikuti langkahnya sampai dapat **API Token** (contoh: `123456:ABC-DEF...`).
2.  **Dapatkan Chat ID Kamu:**
    - Chat ke [@userinfobot](https://t.me/userinfobot) di Telegram.
    - Bot akan memberikan angka **Id** (contoh: `987654321`).
3.  **Seting di Vercel Dashboard:**
    - Masuk ke dashboard proyekmu di Vercel.
    - Pergi ke **Settings** > **Environment Variables**.
    - Tambahkan dua variabel baru:
        - `TELEGRAM_BOT_TOKEN`: Isi dengan token dari BotFather.
        - `TELEGRAM_CHAT_ID`: Isi dengan Chat ID dari userinfobot.
4.  **Simpan & Redeploy:**
    - Setelah variabel disimpan, lakukan *redeploy* atau push commit baru ke GitHub agar Vercel mengenali perubahan variabel tersebut.

### Penjelasan Teknis:

- **Frontend:** `index.html` memiliki `<form id="feedback-form">`. Saat dikirim, JavaScript di `script.js` akan mengirim data via `fetch()` ke endpoint `/api/send-telegram`.
- **Backend (Serverless):** File `api/send-telegram.js` adalah fungsi Node.js yang berjalan di server Vercel. Fungsi ini bertugas mengambil token rahasia dari environment variables dan mengirimkan pesan ke API Telegram. Dengan cara ini, orang lain tidak bisa mencuri token bot kamu melalui "Inspect Element".

---

## Opsi Deployment

Karena situsnya sepenuhnya statis, kamu bisa deploy ke provider static hosting mana saja.

### Vercel (Direkomendasikan – tanpa konfigurasi)

1. Push repositori ke GitHub.
2. Import repo di Vercel ([vercel.com/new](https://vercel.com/new)).
3. Vercel otomatis mendeteksi bahwa ini adalah static site dan langsung men-deploy-nya.
4. Kunjungi URL `*.vercel.app` yang sudah diberikan.

### Netlify

1. Push ke GitHub/GitLab/Bitbucket.
2. Di Netlify, pilih **New site from Git**.
3. Build command: biarkan kosong (atau isi `echo "no build"`).
4. Publish directory: `/` (root repo).
5. Deploy.

### GitHub Pages

1. Pastikan repositorinya publik (atau aktifkan GitHub Pages untuk repo privat dengan akun Pro).
2. Buka **Settings → Pages**.
3. Source: `Deploy from a branch` → `main` (atau `master`) → `/ (root)`.
4. Simpan; situsmu akan tersedia di `https://<username>.github.io/<repo>/`.

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # pilih direktori publik sebagai ./ 
firebase deploy
```

### AWS S3 + CloudFront (untuk produksi)

1. Buat bucket S3, aktifkan static website hosting.
2. Upload isi folder (termasuk `assets/`).
3. Opsional: setup CloudFront untuk HTTPS dan caching.

### Docker (jika ingin dikontainerisasi)

Buat `Dockerfile` sederhana:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Lalu:

```bash
docker build -t ziyad-web .
docker run -p 8080:80 ziyad-web
```

Buka `http://localhost:8080`.

---

## Troubleshooting

| Gejala | Kemungkinan Penyebab | Solusi |
|--------|----------------------|--------|
| Favicon tidak muncul | Cache browser masih menyimpan favicon lama | Hard‑refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) atau bersihkan site storage (DevTools → Application → Clear storage). |
| Tombol share tidak bereaksi | Halaman dibuka via `file://` (Web Share API butuh `http(s)`) | Sajikan lewat local server (`python -m http.server`) atau deploy ke HTTPS. |
| Ikon muncul sebagai kotak | CDN Font Awesome / Material Symbols diblokir | Cek console untuk error CORS; pastikan ada koneksi internet untuk memuat link CDN. |
| Layout berantakan di mobile | Tailwind CSS tidak termuat (masalah jaringan) | Verifikasi bahwa `<script src="https://cdn.tailwindcss.com?...">` berhasil dimuat; cek console untuk error 404. |
| Animasi tidak mulus | Perangkat low‑end atau banyak tab berat di background | Kurangi durasi animasi di `style.css`, atau nonaktifkan via media query `prefers-reduced-motion` jika diperlukan. |
| Kode tidak tersalin setelah diklik | Clipboard API ditolak (bukan secure context) | Akses lewat `http://localhost` atau `https://`; Clipboard API butuh secure context. |

Kalau menemui masalah lain, buka console DevTools di browser (`F12`) dan cari pesan error di sana — sebagian besar masalah biasanya langsung terlihat.

---

## Lisensi

Proyek ini dilisensikan di bawah **MIT License** – lihat file [LICENSE](LICENSE) untuk detailnya.

---

## Penghargaan

- [Tailwind CSS](https://tailwindcss.com) – atas framework CSS utility‑first-nya.
- [Font Awesome](https://fontawesome.com) – atas ikon‑ikon brand-nya.
- [Material Symbols](https://fonts.google.com/icons) – atas ikon‑ikon sistem UI‑nya.
- [Google Fonts](https://fonts.google.com) – atas font Manrope dan Inter.
- Ziyad Web Studio – atas konsep dan desain originalnya.

---

## Changelog

### 2026-06-11 — Perbaikan Critical Issues

Berikut daftar perbaikan critical yang diterapkan pada tanggal ini:

#### 1. ✅ SEO & Open Graph Tags (`index.html`)
- Ditambahkan `<meta name="description">` untuk SEO dasar.
- Ditambahkan tag Open Graph lengkap: `og:url`, `og:type`, `og:title`, `og:description`, `og:image` (termasuk `og:image:width`, `og:image:height`, `og:image:type`).
- Gambar banner menggunakan `assets/og-banner.png` (1200×630, image/png) yang sudah tersedia di repo.

#### 2. ✅ Fix Variable Shadowing (`script.js`)
- Variabel `titleEl` di dalam fungsi `showRateLimitModal()` me-*shadow* variabel global `titleEl` (dipakai oleh title switcher di header), yang berpotensi menyebabkan bug.
- Variabel lokal di dalam modal di-rename menjadi `modalTitle`, `modalDesc`, `modalBadge`, dan `modalIcon` agar tidak bertabrakan dengan scope global.

#### 3. ✅ Dokumentasi Rate Limiting Serverless (`api/send-telegram.js`)
- Ditambahkan komentar dokumentasi yang menjelaskan bahwa `Map()` in-memory **akan di-reset setiap cold start** di Vercel Serverless.
- `WINDOW_MS` dinaikkan dari 60 detik → **90 detik** agar selaras dengan cooldown timer di sisi UI (client).
- Disarankan migrasi ke **Vercel KV** atau **Upstash Redis** untuk rate limiting yang benar-benar persisten.

#### 4. ✅ Web App Manifest (`assets/site.webmanifest`)
- Field `name` dan `short_name` yang sebelumnya **kosong** kini diisi: `"Ziyad Web Studio"` dan `"Ziyad Studio"`.
- Ditambahkan `description` dan `start_url` untuk mendukung instalasi PWA yang benar.
- Diperbaiki path ikon yang sebelumnya salah (`assets/android-chrome-*.png` → `android-chrome-*.png`), karena manifest sudah berada di dalam folder `assets/`, sehingga path relatifnya cukup nama file saja.

### 2026-06-11 — Perbaikan Medium Issues

#### 5. ✅ Browser Back Button (`script.js`)
- Ditambahkan `popstate` event listener agar tombol back browser berfungsi penuh bersama hash routing yang menggunakan `pushState`.

#### 6. ✅ Title Switcher Optimization (`script.js`)
- `setInterval` title switcher di-refaktor dengan **Page Visibility API** — interval di-pause saat tab tidak aktif dan di-resume saat tab kembali aktif, menghemat resource CPU.

#### 7. ✅ Toast Notification System (`script.js` + `style.css`)
- Ditambahkan fungsi `showToast()` sebagai pengganti `alert()` yang menampilkan notifikasi pill-shaped di bagian bawah layar dengan animasi slide-up.
- `fallbackShare()` kini menggunakan toast alih-alih `alert()`.
- Ditambahkan CSS untuk komponen `.toast` dan `.toast.show`.

#### 8. ✅ Error Handling `copyText()` (`script.js`)
- Ditambahkan `.catch()` pada `navigator.clipboard.writeText()` di fungsi `copyText()` — jika clipboard gagal, user mendapat feedback toast alih-alih diam saja.

#### 9. ✅ Pindah `openWhatsApp` ke `script.js` (`index.html` → `script.js`)
- Fungsi `openWhatsApp` yang sebelumnya inline di `index.html` telah dipindah ke `script.js` untuk organisasi kode yang lebih rapi.
- Inline script di HTML diganti dengan komentar referensi.

#### 10. ✅ Twitter Card Tags (`index.html`)
- Ditambahkan meta tag `twitter:card`, `twitter:title`, `twitter:description`, dan `twitter:image` untuk preview optimal saat link dibagikan di Twitter/X.

#### 11. ✅ Aksesibilitas Reduced Motion (`style.css`)
- Ditambahkan `@media (prefers-reduced-motion: reduce)` yang menonaktifkan semua animasi dan transisi untuk pengguna yang sensitif terhadap gerakan.

#### 12. ✅ Spam Filter Dipresisikan (`api/send-telegram.js`)
- Keyword spam `'http'`, `'.net'`, `'.org'`, `'.io'` yang terlalu luas diganti dengan `'http://'`, `'https://'`, `'www.'` agar hanya menangkap URL aktual tanpa memblokir feedback yang sah.

---

*Selamat ngoding dan berbagi!* 🚀
