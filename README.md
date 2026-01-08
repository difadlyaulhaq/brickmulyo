I. Panduan Branding & Visual (Tema: "Industrial Earth")
Karena produknya adalah Batu Bata, kita hindari warna-warna neon atau pastel. Kita gunakan warna earthy (tanah) yang dikombinasikan dengan gaya modern (Dark UI pada Peta).

1. Palet Warna (Color Palette)
Primary Color (Merah Bata): #C04A35

Kegunaan: Warna utama Marker (Pin), Tombol CTA utama (Hubungi WA), Judul penting.

Secondary Color (Tanah Liat/Orange Muted): #D98E56

Kegunaan: Hover state, garis batas wilayah (GeoJSON stroke), icon pendukung.

Neutral Dark (Charcoal/Aspal): #1E293B (Slate-800 di Tailwind)

Kegunaan: Background peta (agar marker mencolok), teks heading.

Neutral Light (Abu Semen): #F1F5F9

Kegunaan: Background panel informasi/popup, background body.

2. Tipografi
Font: Gunakan "Inter" atau "Poppins" (Google Fonts).

Kenapa? Bersih, modern, dan sangat mudah dibaca di layar HP (karena target pengguna mungkin akses via HP).

II. Roadmap Pengembangan (7 Hari - Sprint)
Target: Website "Polosan" tapi interaktif untuk presentasi.

Hari 1: Setup & Environment
Tech: React (Vite) + Tailwind CSS + React-Leaflet.

Task:

Install project.

Setup Tailwind config dengan warna branding di atas.

Siapkan struktur folder: /components, /data, /assets.

Hari 2: Core Map & Wilayah (Fitur Utama)
Task:

Integrasi Leaflet Map.

Fitur "Potongan Map": Cari koordinat batas desa (GeoJSON) di geojson.io atau openstreetmap.

Masking: Buat logic agar area luar desa menjadi gelap (opacity 0.7), dan area desa terlihat terang/jelas.

Styling: Terapkan warna #D98E56 untuk garis batas wilayah.

Hari 3: Data Dummy (Pengganti Database/CRUD)
Task: Buat file src/data/umkm.json.

Format Data:

JSON

[
  {
    "id": 1,
    "nama": "Batu Bata Merah Pak Joyo",
    "pemilik": "Joyo Sudarmo",
    "lat": -7.xxxx,
    "lng": 110.xxxx,
    "wa": "628xxxx",
    "alamat": "Dusun A, RT 02",
    "foto": "/images/bata1.jpg",
    "desc": "Spesialis bata ekspos."
  }
  // Buat 5-10 data dummy agar peta terlihat ramai
]
Hari 4: Rendering Marker & Popup
Task:

Looping data JSON ke dalam map menjadi Marker.

Gunakan Custom Icon untuk Marker (bisa pakai icon SVG sederhana warna Merah Bata #C04A35).

Buat Popup/Modal Interaktif: Saat marker diklik, muncul card kecil berisi Nama & Foto sekilas.

Hari 5: Detail Page / Drawer & Action Button
Task:

Perhalus UI Popup. Tambahkan tombol aksi nyata:

Tombol "Chat WA": Link https://wa.me/{no_hp}?text=Saya+tertarik+batu+bata...

Tombol "Navigasi": Link https://www.google.com/maps/dir/?api=1&destination={lat},{lng}

Hari 6: Overlay Informasi (Sesuai Referensi)
Task:

Tambahkan elemen UI melayang (Overlay) di pojok peta.

Isi: Judul Peta, Legenda (Keterangan simbol), dan Deskripsi singkat potensi desa.

Pastikan overlay ini bisa di-minimize di tampilan HP agar tidak menutupi peta.

Hari 7: Finishing & Deploy
Task:

Cek responsivitas (Mobile vs Desktop).

Deploy ke Vercel (paling cepat & gratis untuk React).

Siapkan link demo untuk diserahkan ke klien.