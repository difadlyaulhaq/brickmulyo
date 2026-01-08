# BrickMulyo - Landing Page & Peta Persebaran UMKM

Web app landing page modern untuk pusat industri batu bata merah di **Srimulyo, Gondang, Sragen**. Proyek ini mencakup halaman promosi produk dan peta interaktif (GIS Dashboard) untuk memvisualisasikan persebaran UMKM.

## 🚀 Fitur Utama

### 1. Modern Landing Page
Halaman depan yang responsif dan menarik untuk meningkatkan konversi penjualan.
- **Hero Section:** Judul impactfull dengan CTA (Call to Action) yang jelas.
- **Showcase Produk:** Menampilkan varian bata (Press, Biasa, Expose) beserta harga.
- **Keunggulan:** Bagian "Kenapa Memilih Kami" dengan ikon visual.
- **Kontak Langsung:** Integrasi tombol WhatsApp dan Telepon di berbagai titik strategis.

### 2. Peta Interaktif (GIS Dashboard)
Peta persebaran UMKM dengan gaya visual "Dashboard KKN/Pemetaan Wilayah".
- **Satellite View:** Menggunakan citra satelit (Esri World Imagery) untuk tampilan realistis.
- **Batas Wilayah:** Polygon area **Desa Srimulyo** dengan border kuning menyala.
- **Informasi Overlay:** Panel informasi melayang yang menampilkan Intro, Goal, dan Deskripsi proyek.
- **Marker Interaktif:** Titik lokasi UMKM yang ketika diklik menampilkan:
  - Foto UMKM
  - Nama Pemilik & Alamat
  - Tombol Chat WhatsApp (Direct Link)
  - Tombol Navigasi (Google Maps)

### 3. Manajemen Data Sederhana (No-Backend)
Sesuai permintaan untuk "Frontend Only", data dikelola melalui file JSON statis sehingga mudah diedit tanpa database.
- Data UMKM: `src/data/umkm.json`
- Data Wilayah: `src/data/village-boundary.json`

## 🛠️ Teknologi yang Digunakan
- **React (Vite):** Framework frontend utama.
- **Tailwind CSS:** Styling utility-first untuk desain cepat dan responsif.
- **React-Leaflet:** Library peta interaktif.
- **Lucide React:** Ikonografi modern.

## 📝 Changelog & Update Terakhir

### Localization & Map Update
- **Lokasi:** Mengubah fokus peta dan konten dari Yogyakarta ke **Srimulyo, Gondang, Sragen**.
- **Style Peta:** Mengganti style peta menjadi *Dark Satellite* dengan efek *Vignette* untuk meniru referensi desain.
- **Overlay:** Menambahkan komponen `Overlay.jsx` untuk menampilkan informasi dashboard (Intro, Goal, Desc) di atas peta.
- **Marker:** Menyesuaikan warna marker menjadi Kuning/Oranye agar kontras dengan background satelit.
- **Data:** Mengatur data awal menampilkan 1 titik "Pabrik Bata Merah Brick Mulyo" sebagai sampel.

## 💻 Cara Menjalankan

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan Mode Development:**
   ```bash
   npm run dev
   ```

3. **Build untuk Production:**
   ```bash
   npm run build
   ```

---

## 📂 Struktur File Penting

```
src/
├── components/
│   ├── Map.jsx       # Komponen Peta Utama
│   └── Overlay.jsx   # Dashboard Info di atas Peta
├── data/
│   ├── umkm.json             # Edit file ini untuk menambah/mengubah data UMKM
│   └── village-boundary.json # Koordinat batas desa
└── App.jsx           # Halaman Utama Landing Page
```

---

## 📜 Original Requirements Log (Chat History)

[6/1, 23.09] Praditus: Wokeyy
[6/1, 23.09] Praditus: Kira kira ada dana berapa?
[6/1, 23.10] +62 851-1760-9645: saya ada range 300an mas bisa agak melar[18/12/2025, 09.55] Praditus: website buat informasi 1 produk gitu, kyk informasi, cara kerja, kelebihan, manfaat, sama cara pemesanan yang kalo diklik diarahin ke WA

untuk produk ini apakah masih ada?
[6/1, 22.21] +62 851-1760-9645: permisi selamat malam mas Praditus, terkait ini saya masih butuh, tapi agak ada modifikasi
[6/1, 22.24] +62 851-1760-9645: jadi kaya umkm hub, ada peta suatu daerah gitu yang nanti ada titik2 yang punya umkm, yang kalo diklik titik nya ke direct ke page yang isinya lokasi gmapsnya sama contact person yang punya umkm
[6/1, 22.41] Praditus: Baik mas codenya pakai bahasa apa yaa?
[6/1, 22.42] +62 851-1760-9645: preferred php mas, apa bisa ya?
[6/1, 22.46] Praditus: Native kah?
[6/1, 22.46] +62 851-1760-9645: laravel bisa mas
[6/1, 22.52] +62 851-1760-9645: sama sekalian dihostingkan mas kalau bisa, untuk deadline 1 minggu-an apakah bisa mas
[6/1, 22.59] Praditus: Cuma di modif aja kan ya?
[6/1, 23.00] +62 851-1760-9645: kurang lebih jadi kaya gini mas
[6/1, 23.01] Praditus: Klo pakai react gimana mas?
[6/1, 23.01] +62 851-1760-9645: boleh mas
[6/1, 23.02] Praditus: Bisa mas
[6/1, 23.02] Praditus: Tapi tolong di detailin lagi mass
[6/1, 23.02] +62 851-1760-9645: sek bentar mas saya carikan referensinya
[6/1, 23.11] Praditus: Di 500 gimana mas?
[6/1, 23.12] +62 851-1760-9645: bisa mas
[6/1, 23.13] Praditus: Wokeyy mas bisa
[6/1, 23.13] Praditus: FE doang kan?
[6/1, 23.13] +62 851-1760-9645: yess
[6/1, 23.14] Praditus: Wokeyy mas bisa
[6/1, 23.14] +62 851-1760-9645: kedepannya mungkin saya nanya follow up progress gapapa kan mas
[6/1, 23.14] +62 851-1760-9645: sama ini perlu dp dulu apa pas akhir aja nanti
[6/1, 23.20] Praditus: Nanti aja mas
[6/1, 23.20] +62 851-1760-9645: okesiap mass
[6/1, 23.24] Praditus: Mas minta data UMKM nya dong
[6/1, 23.25] +62 851-1760-9645: nah itu mas data nya belum ada, cuma itu nanti menyusul (hopefully saya sendiri yang masukin ke situ)
[6/1, 23.25] +62 851-1760-9645: kalo dibikin placeholder dulu gmn mas
[6/1, 23.25] +62 851-1760-9645: sama kaya crud buat nambah gitu
[6/1, 23.26] Praditus: bisa bisa mas, sama boleh tau mau UMKM Daerah mana biar saya sesuaikan
[6/1, 23.26] +62 851-1760-9645: untuk daerahnya itu terbatas sih mas di daerah Srimulyo, Gondang, Sragen, Jawa Tengah
[6/1, 23.33] +62 851-1760-9645: nah gini mas, jadi saya minta deadline 1 minggu itu ada presentasi projek tahap 1, nah itu rencananya saya mau polosannya dulu, baru setelah itu dilanjutin ditambahin data umkmnya mass
[6/1, 23.34] +62 851-1760-9645: untuk produk umkmnya itu cuma 1 jenis mas, batu bata aja
[6/1, 23.34] +62 851-1760-9645: color pallete ngikut masnya aja yang lebih pahamm
website buat informasi 1 produk gitu, kyk informasi, cara kerja, kelebihan, manfaat, sama cara pemesanan yang kalo diklik diarahin ke WA