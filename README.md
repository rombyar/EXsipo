# EXsipo

**EX**-treme **Si**mple **Po**rtfolio — template portfolio personal yang ringan, data-driven, dan bebas dependensi eksternal.

## Fitur

- Data dari `data.json` — isi satu file, semua halaman terisi otomatis
- Halaman: Beranda, Proyek, Tentang, Kontak, 404
- Dark mode dengan desain minimalis
- Responsif & mobile-friendly
- Tombol Cetak CV dengan print stylesheet
- Open Graph meta tags untuk sharing di sosial media
- Zero framework, zero build step — langsung buka di browser

## Cara Pakai

**1. Clone repositori**
```bash
git clone https://github.com/rombyar/EXsipo.git
cd EXsipo
```

**2. Salin template data**
```bash
cp data.default.json data.json
```

**3. Isi `data.json` dengan informasi Anda**
```json
{
  "name": "Nama Anda",
  "headline": "Web Developer",
  "location": "Jakarta, Indonesia",
  "about": "Bio singkat.",
  "email": "nama@domain.com",
  "social": {
    "linkedin": "https://linkedin.com/in/username",
    "github": "https://github.com/username"
  },
  "skills": ["HTML", "CSS", "JavaScript"],
  "projects": [
    {
      "name": "Nama Proyek",
      "description": "Deskripsi singkat.",
      "tags": ["Laravel", "MySQL"],
      "url": "https://demo.com",
      "github": "https://github.com/username/repo"
    }
  ]
}
```

**4. Jalankan via server lokal**

`data.json` dibaca lewat `fetch()`, sehingga perlu server HTTP. Gunakan salah satu:

```bash
# Node.js
npx serve .

# Python
python -m http.server 8000

# VS Code: Live Server extension
```

> **Catatan:** `data.json` sudah di-`.gitignore`. Data pribadi Anda tidak akan ikut ke repositori.

## Struktur Proyek

```
EXsipo/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── 404.html
├── data.default.json   ← template (commit ini)
├── data.json           ← data pribadi (gitignored)
├── css/
│   └── master.css
├── js/
│   └── master.js
└── img/
    └── my-photo.jpg    ← ganti dengan foto Anda
```

## Lisensi

MIT
