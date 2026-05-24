# 🧬 DNA Web — Ziyad Web Studio Bio-Link

Dokumen ini adalah **identitas desain inti** proyek Ziyad Web Studio.
Gunakan sebagai referensi saat membuat halaman baru, komponen baru, atau
iterasi desain agar tetap konsisten dengan karakter visual yang sudah ada.

---

## 🎯 Kepribadian Desain

> **"Minimalis Apple, hangat Material You."**

Proyek ini terinspirasi dari **estetika Apple** (bersih, luas, tipografi kuat)
yang dipadukan dengan **sistem warna Material You** (token semantik, nuansa
biru-ungu yang lembut). Hasilnya: tampilan yang terasa premium dan personal,
cocok untuk bio-link seorang kreator muda.

**Kata kunci karakter:**
- Bersih & lapang (white space dominan)
- Sudut membulat (border-radius besar — 20px hingga 24px)
- Bayangan tipis dan lembut (bukan drop-shadow keras)
- Interaksi terasa responsif (hover lift, active scale, fade transisi)
- Warna dingin-kalem dengan aksen biru indigo

---

## 🎨 Palet Warna

### Warna Utama

| Nama | Token | Hex | Peran |
|------|-------|-----|-------|
| Primary | `primary` | `#3953bd` | CTA, aksen aktif, label kategori |
| On Primary | `on-primary` | `#ffffff` | Teks di atas tombol primary |
| Background | `background` | `#F0F4F8` | Latar halaman — abu kebiruan lembut |
| Surface | `surface` | `#effcff` | Latar elemen kartu |
| Surface Container | `surface-container` | `#e1f1f5` | Icon wrap default |
| On Surface | `on-surface` | `#0f1e21` | Teks utama |
| On Surface Variant | `on-surface-variant` | `#444653` | Teks sekunder, label |
| Outline Variant | `outline-variant` | `#c5c5d5` | Border tipis, chevron |

### Warna Sekunder & Aksen

| Nama | Token | Hex | Peran |
|------|-------|-----|-------|
| Secondary | `secondary` | `#754aa1` | Aksen ungu (badge, highlight) |
| Secondary Container | `secondary-container` | `#ce9ffd` | Background badge ungu |
| Error | `error` | `#ba1a1a` | State error |

### Warna Status Icon (inline, tidak pakai token)

| Konteks | Background | Warna Icon |
|---------|-----------|-----------|
| WhatsApp Chat | `#dcfce7` | `#16a34a` |
| WA Channel | `#25D366` | `#fff` |
| TikTok / GitHub | `#f1f5f9` | `#0f172a` |
| Trae AI | `#000000` | — (logo image) |
| Assets Desain | `#fef3c7` | `#d97706` |

---

## 🔤 Sistem Tipografi

**Font keluarga:**
- **Manrope** → Heading, judul, nama brand
- **Inter** → Body, label, deskripsi, kode

### Skala Teks

| Token | Font | Size | Line Height | Weight | Penggunaan |
|-------|------|------|-------------|--------|-----------|
| `headline-lg` | Manrope | 24px | 32px | 700 | Judul halaman utama |
| `headline-md` | Manrope | 20px | 28px | 600 | Header nav, nama studio |
| `body-lg` | Inter | 16px | 24px | 500 | Nama item di kartu |
| `body-sm` | Inter | 14px | 20px | 400 | Deskripsi/subtitle di kartu |
| `label-sm` | Inter | 12px | 16px | 400 | Footer kecil, copyright |
| `label-caps` | Inter | 12px | 16px | 600 | Section label (uppercase + letter-spacing) |

---

## 📐 Spacing & Layout

| Elemen | Nilai |
|--------|-------|
| Max lebar konten | `640px` (max-w-[640px] mx-auto) |
| Padding horizontal | `px-6` (24px) |
| Padding vertikal header | `py-4` (16px) |
| Gap antar kartu | `gap-3` (12px) |
| Gap antar section | `gap-6` (24px) |
| Padding kartu | `p-4` (16px) |
| Padding copy-box | `18px` |

---

## 🔲 Border Radius

| Komponen | Radius |
|----------|--------|
| Link card | `rounded-3xl` (24px) |
| Icon wrap | `rounded-full` (bulat penuh) |
| Avatar | `rounded-full` + `border-4 border-on-surface` |
| Code wrapper | `12px` |
| Copy-box container | `20px` |
| Tombol download | `rounded-full` (pill) |
| Tombol nav back/home | `rounded-full` (40×40px) |
| Kartu info (view-ai, view-files) | `rounded-3xl` |
| Badge label (Primary) | `rounded-full` |
| Maintenance badge | `rounded-full` |

---

## 💡 Shadow & Elevasi

| Level | CSS | Digunakan pada |
|-------|-----|----------------|
| Subtle | `box-shadow: 0 4px 20px rgba(0,0,0,0.05)` | Link card, copy-box (default) |
| Hover | `box-shadow: 0 8px 25px rgba(0,0,0,0.08)` | Link card saat hover |
| Card Info | `shadow-[0_4px_20px_rgba(0,0,0,0.06)]` | View AI / View Files card |
| Nav Button | `shadow-sm border border-slate-200` | Tombol back & home |
| Avatar | `shadow-lg` | Foto profil |

---

## ✨ Animasi & Interaksi

### Transisi Navigasi (SPA)

```
Maju (goTo)  → slide-in:  translateX(24px → 0) + opacity(0 → 1), 0.25s ease
Mundur (goBack) → slide-back: translateX(-24px → 0) + opacity(0 → 1), 0.25s ease
```

### Hover State

| Elemen | Efek |
|--------|------|
| Link card | `translateY(-2px)` + border biru muncul + shadow naik |
| Link card active | `scale(0.98)` |
| Copy button | bg jadi `primary`, warna putih |
| Copy button active | `scale(0.9)` |
| Btn download | `translateY(-1px)` + warna lebih gelap |

### Avatar Swap

```
Hover/touch → opacity 0 → ganti src → opacity 1 (transition 0.25s)
Logo (default) ↔ Foto asli Ziyad
```

### Title Switcher

```
"Ziyad Studio" ↔ "Creative Studio"
Interval: 3000ms
Efek: opacity 0 + translateY(-6px) → ganti teks → kembali normal (300ms)
```

### Live Clock (halaman maintenance)

```
Update setiap 1000ms
Format jam: HH:MM:SS
Format tanggal: Hari, DD Mon YYYY (Bahasa Indonesia)
```

---

## 🧩 Komponen Inti

### Link Card
Kartu navigasi universal. Selalu punya:
- Icon wrap (48×48, rounded-full)
- Teks utama (body-lg) + deskripsi (body-sm)
- Chevron kanan (outline-variant)
- Hover: lift + glow border

### Copy Box
Container sumber daya yang bisa disalin:
- Label kategori (label-caps, warna primary, uppercase)
- Code wrapper dengan copy button absolute
- Optional: download-block untuk app/tools
- Optional: note-text italic dengan border kiri biru

### Card Info
Digunakan di view-ai dan view-antigravity:
- Logo bulat (64×64)
- Heading + paragraf deskripsi
- Dua tombol aksi: primary (filled) + secondary (outline)

### Maintenance Card
Digunakan di view-files:
- Ikon konstruksi (amber)
- Heading + teks penjelasan
- Live clock box (bg slate-50)
- Badge "Maintenance Mode" (amber, animate-pulse dot)

---

## 🗺️ Navigasi & UX

### Header Per View

| View | Header Kiri | Header Tengah | Header Kanan |
|------|------------|--------------|-------------|
| Main | — | Studio title (animated) | Share button |
| Category | Back → main | "Daftar Kategori" | Home |
| Code | Back → category | "On Activity Create" | Home |
| Files | Back → category | "Assets Desain" | Home |
| AI | Back → main | "Trae AI Agent" | Home |
| Antigravity | Back → main | "Antigravity CLI" | Home |

### Hirarki Navigasi

```
view-main
├── view-category
│   ├── view-code
│   └── view-files (maintenance)
├── view-ai
└── view-antigravity
```

---

## 🌐 Ikon & Aset

| Library | Kegunaan |
|---------|---------|
| **Material Symbols Outlined** | Ikon UI: share, folder_open, chevron_right, arrow_back, home, code, palette, construction, open_in_new, download, description |
| **Font Awesome 6 (Brand)** | `fa-whatsapp`, `fa-tiktok`, `fa-github`, `fa-copy`, `fa-check`, `fa-info-circle` |

---

## 📱 Responsivitas

- Layout **mobile-first**, max-width 640px untuk semua konten
- `min-h-screen` pada setiap view agar footer selalu di bawah
- Avatar 96×96px (`w-24 h-24`)
- Tidak ada breakpoint tablet/desktop khusus — desain sudah optimal di semua ukuran dalam 640px container

---

## ⚠️ Aturan Konsistensi (Jangan Dilanggar)

1. **Selalu gunakan `link-card` class** untuk kartu navigasi — jangan buat custom baru
2. **Warna teks utama selalu `text-on-surface`** — bukan `text-black` atau `text-gray-900`
3. **Radius kartu navigasi selalu `rounded-3xl`** (24px) — jangan kurangi
4. **Padding horizontal halaman selalu `px-6`** dan max-width `max-w-[640px]`
5. **Transisi navigasi selalu pakai `goTo` / `goBack` / `goHome`** — jangan manipulasi class `.active` langsung
6. **Icon wrap selalu 48×48, rounded-full** — ukuran seragam di semua kartu
7. **Setiap view baru WAJIB didaftarkan di `routeMap`** agar deep link berfungsi
8. **Background halaman selalu `#F0F4F8`** — ditetapkan di `body` CSS
