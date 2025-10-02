# API‑AI

Backend API berbasis Express untuk fitur AI (misalnya generasi gambar/manipulasi konten) dengan dukungan upload file, validasi input, dan struktur modular menggunakan ES Modules.



## 📂 Struktur Direktori (Contoh)

```
api-ai/
├── routes/
│   ├── router.js
│   └── chat.router.js
├── uploads/                # (opsional) direktori file upload
├── .env.example
├── index.js                # atau server.js / app.js
├── package.json
└── README.md
```

---

## ⚙️ Instalasi & Setup

1. **Clone repo**

   ```bash
   git clone https://github.com/yukotanjung/api-ai.git
   cd api-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi environment**

   * Duplikasi `.env.example` menjadi `.env` lalu isi variabel berikut (sesuaikan kebutuhan):

     ```env
     GEMINI_API_KEY=your_api_key_here
     GEMINI_MODEL=your_model_here
     ```

4. **Script & ES Modules** – pastikan `package.json` memiliki:

   ```json
   {
     "type": "module"
   }
   ```

5. **Jalankan server**

   ```bash
   node index.js
   # atau
   nodemon (apabila terinstall nodemon)
   ```

## 🛠️ Dependensi Utama

* **express**
* **multer**
* **express-validator**
* **nodemon** (opsional untuk development)

> Versi paket mengikuti `package.json`.


