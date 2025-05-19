[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Web%20Framework-blue?logo=express)](https://expressjs.com/)
[![Status](https://img.shields.io/badge/status-BETA-orange)]()

# QRIS Dynamic QR Code Generator API

Sebuah aplikasi kecil menggunakan Node.js + Express yang menghasilkan QR Code QRIS secara dinamis berdasarkan nominal, tanpa menyimpan file ke disk. QR Code diambil dari API eksternal dan langsung dikirim sebagai gambar PNG.

## 🚀 Fitur

- Endpoint QRIS dinamis: `/qris/:nominal`
- Tidak menyimpan file ke disk (gambar dikirim langsung)
- Validasi nominal minimum dan maksimum
- CRC-16-CCITT otomatis dihitung
- Endpoint status: `/`

## 🧾 Prasyarat

Pastikan Anda telah menginstal:

- Node.js (versi 18 ke atas)
- npm

## ⚙️ Instalasi

```bash
https://github.com/homwic/api-qris-lutify.git
cd qris-api
npm install
```

Atau jika kamu hanya menyalin file JS, pastikan file bernama `index.js` dan jalankan:

### Install Dependensi

```bash
npm install express axios crc
```

### ▶️ Menjalankan Server

```bash
node index.js
```

Server akan berjalan di:  
[http://localhost:3000](http://localhost:3000)

## 📌 Penggunaan

### 1. Cek Status Server

```bash
curl http://localhost:3000
```

Output:
```json
{ "status": "oke" }
```

### 2. Generate QRIS dengan nominal tertentu

Contoh:

```bash
curl http://localhost:3000/qris/15000 --output qris.png
```

Gambar QRIS akan disimpan sebagai `qris.png`.

### 3. Akses via Browser

Buka di browser:

```
http://localhost:3000/qris/15000
```

Gambar QRIS akan langsung ditampilkan.

## ❗ Batasan Nominal

- Minimal: Rp100  
- Maksimal: Rp500.000  

Jika nilai di luar batas, server akan mengembalikan error dalam format JSON.

## 📂 Struktur Proyek

```
.
├── index.js          # File utama Express app
├── package.json
└── README.md
```
