# Panduan Mengubah Konten Website BrickMulyo

Panduan ini ditujukan bagi pengelola website untuk mengubah teks, gambar, dan data produk tanpa perlu keahlian coding yang mendalam.

## 📂 Struktur Folder Penting

Semua file yang perlu Anda ubah berada di dalam folder `src/`. Berikut adalah lokasi-lokasi penting:

1.  **Halaman Utama (Landing Page):** `src/App.jsx`
2.  **Peta & Lokasi:** `src/components/Map.jsx`
3.  **Data Peta:** `src/components/Overlay.jsx`
4.  **Gambar:** Folder `public/` (Untuk gambar lokal)

---

## ✏️ Cara Mengubah Konten

### 1. Mengubah Data Produk (Harga, Nama, Deskripsi)
Buka file `src/App.jsx` dan cari bagian `const products = [...]`.

```javascript
// Contoh kode di dalam src/App.jsx
const products = [
  { 
    name: 'Bata Merah Press', // Ganti Nama Produk
    price: 'Rp 850/biji',     // Ganti Harga
    desc: 'Kualitas premium...', // Ganti Deskripsi
    image: '/Batu-bata-background.png' // Ganti Nama File Gambar (harus ada di folder public)
  },
  // ... produk lainnya
];
```

### 2. Mengubah Foto Produk & Galeri
1.  Siapkan file gambar baru (format .jpg atau .png).
2.  Simpan gambar tersebut ke dalam folder **`public/`** di proyek ini.
3.  Di file `src/App.jsx`, ubah nama file pada bagian `src` atau `image`.
    *   Contoh: `image: '/foto-baru-anda.jpg'`

### 3. Mengubah Nomor WhatsApp
Untuk mengubah nomor tujuan pemesanan, cari kode berikut di `src/App.jsx` dan `src/components/OrderPage.jsx`:

```javascript
// Cari angka ini dan ganti dengan nomor baru (format 62...)
https://wa.me/62812345678
```

### 4. Mengubah Teks Informasi Peta (Overlay)
Buka file `src/components/Overlay.jsx`. Di sini Anda bisa mengubah teks judul, intro, goal, dan deskripsi yang muncul di atas peta.

```javascript
// Contoh di src/components/Overlay.jsx
<h1 ...>Peta Persebaran UMKM</h1> // Ubah Judul
<p ...>Dusun Srimulyo merupakan...</p> // Ubah Deskripsi
```

### 5. Mengubah Titik Lokasi Peta
Data lokasi UMKM disimpan terpisah agar mudah dikelola.
*   Buka file: `src/data/umkm.json`
*   Format data:
    ```json
    {
      "id": 1,
      "nama": "Nama Usaha",
      "lat": -7.362, // Koordinat Latitude
      "lng": 111.035, // Koordinat Longitude
      "wa": "628123...", // Nomor WA Pemilik
      ...
    }
    ```

---

## 🚀 Cara Update Website (Deploy)

Jika website sudah online (misal di Vercel/Netlify), setelah Anda mengubah file di atas:
1.  Simpan semua perubahan (Save).
2.  Lakukan **Commit** dan **Push** ke repository GitHub Anda.
3.  Website akan otomatis ter-update dalam beberapa menit.

---

**Butuh Bantuan?**
Hubungi tim developer jika Anda mengalami kesulitan teknis dalam pengeditan kode yang lebih kompleks.
