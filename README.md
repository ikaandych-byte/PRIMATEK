# PT. PRIMA TEKNIK TRADA - Precision Machinery & Automation Showcase

[![Deploy to GitHub Pages](https://github.com/actions/workflows/deploy.yml/badge.svg)](https://github.com/actions/workflows/deploy.yml)
[![ISO 9001:2015](https://img.shields.io/badge/ISO-9001%3A2015-amber.svg)](https://www.pttid.com)
[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-blue.svg)](https://www.pttid.com)

Website showcase resmi untuk **PT. PRIMA TEKNIK TRADA** (*Your Reliable Sourcing for Customized Machine, Automation System, Precision Parts, Jig & Fixture, Dies & Molds, and Mass Production*).

- **Situs Resmi / Custom Domain:** [https://www.pttid.com](https://www.pttid.com)
- **Deployment Platform:** GitHub Pages (Automated CI/CD via GitHub Actions)
- **Lokasi Pabrik:** Kawasan Industri MM2100, Jl. Flores 1 Blok C1 No. 17-18, Cibitung, Bekasi – 17520, Indonesia

---

## 🚀 Fitur Website

1. **Hero Visual & Machinery Background**:
   - Gambar fasilitas pabrik beresolusi tinggi yang tajam & jelas di mode terang (*light*) dan mode gelap (*dark*).
   - Opsi pemutaran video mesin real-time (*Automated Robotics* & *Precision CNC Machining*).
   - Opsi tampilan hening HD (*Plant Facility Still HD*).
2. **Katalog Produk & Spesifikasi Lengkap**:
   - *Automation & Customized Machines* (SPM, Conveyor Lines, Robotic Cells).
   - *Precision Jig & Fixtures* (Checking Fixtures, Welding Jigs, Assembly Fixtures).
   - *Stamping Dies & Moulds* (Progressive Dies, Blanking/Piercing, Injection Moulds).
   - *Mass Production Parts* (Suku Cadang Presisi Otomotif Tier-1).
3. **Modal Spesifikasi Teknis & Komparasi Mesin**:
   - Perbandingan head-to-head parameter mesin (Stroke, Table Size, Accuracy, Controller).
4. **Permintaan Penawaran Terintegrasi (RFQ)**:
   - Keranjang penawaran interaktif (*RFQ list*).
   - Pengiriman otomatis ke WhatsApp resmi (*One-click WhatsApp quote generator*).
   - Pengiriman via Email Resmi (*mailto generator*).
5. **Dukungan Multi-Bahasa & Tema**:
   - Bahasa Indonesia & English.
   - Mode Gelap (*Dark*) & Mode Terang (*Light*).

---

## 🛠️ Konfigurasi GitHub Pages

Website ini telah dikonfigurasi secara optimal untuk GitHub Pages:

| Berkas / Pengaturan | Fungsi |
|---|---|
| `vite.config.ts` | Menggunakan `base: './'` sehingga berkas bundel (JS, CSS, gambar) dimuat dengan benar baik di domain root (`pttid.com`) maupun subpath repository (`username.github.io/repo/`). |
| `public/404.html` | Skrip pengalihan cerdas SPA yang mengenali path repositori GitHub Pages dan meneruskan route ke hash internal secara otomatis. |
| `public/.nojekyll` | Memastikan GitHub Pages tidak mengabaikan berkas atau folder berawalan underscore. |
| `public/CNAME` & `CNAME` | Konfigurasi custom domain untuk `pttid.com`. |
| `public/favicon.svg` | Favicon SVG resmi industrial PTT untuk tab browser. |
| `.github/workflows/deploy.yml` | Alur kerja GitHub Actions otomatis yang melakukan build dan deploy setiap kali ada push ke branch `main`. |

---

## 💻 Pengembangan Lokal

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan lokal (port 3000)
npm run dev

# 3. Jalankan pengujian lint & type check
npm run lint

# 4. Build untuk produksi (output di folder /dist)
npm run build

# 5. Pratinjau hasil build produksi
npm run preview
```

---

## 🏢 Kontak Perusahaan

- **Telepon:** (021) 8980378 (Hunting)
- **Fax:** (021) 8980379
- **Email:** primatech@centrin.net.id / ikaandych@gmail.com
- **Situs:** [www.pttid.com](https://www.pttid.com)
