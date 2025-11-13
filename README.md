# 📖 README - Asmaraloka Kaharsa Website

Panduan lengkap setup dan menjalankan website Asmaraloka Kaharsa dengan PHP, MySQL, dan sistem login terintegrasi.

---

## 📋 Daftar Isi

1. [Prasyarat](#prasyarat)
2. [Langkah Setup](#langkah-setup)
3. [Struktur Project](#struktur-project)
4. [Login & Authentication](#login--authentication)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)
7. [Dokumentasi Lengkap](#dokumentasi-lengkap)

---

## 🔧 Prasyarat

Pastikan kamu sudah memiliki:

### Software yang Diperlukan
- ✅ **XAMPP** (untuk Apache, PHP, MySQL)
  - Download: https://www.apachefriends.org/
  - Versi minimum: PHP 7.4, MySQL 5.7
- ✅ **Web Browser** (Chrome, Firefox, Edge, dll)
- ✅ **Text Editor** (Visual Studio Code, Notepad++, dll) - untuk edit file

### Pengetahuan Dasar
- Navigasi folder di Windows
- Membuka dan edit file text
- Menjalankan aplikasi

---

## 🚀 Langkah Setup

### Langkah 1: Install XAMPP

1. Download XAMPP dari https://www.apachefriends.org/
2. Jalankan installer `.exe`
3. Pilih komponen:
   - ✅ Apache
   - ✅ MySQL
   - ✅ PHP
   - (Optional: Perl, PhpMyAdmin)
4. Pilih folder instalasi (default: `C:\xampp\`)
5. Selesaikan instalasi

### Langkah 2: Pindahkan Project ke htdocs

**PENTING:** PHP hanya bisa dijalankan lewat web server. Kamu HARUS memindahkan project ke folder `htdocs`.

#### Metode 1: Copy-Paste Manual

1. **Buka File Explorer**
   - Tekan: `Windows + E`

2. **Navigasi ke project folder**
   - Buka: `d:\Asmaraloka Kaharsa\`
   - Atau di mana pun project kamu disimpan

3. **Pilih Semua File**
   - Tekan: `Ctrl + A`
   - Atau klik kanan → "Select All"

4. **Copy File**
   - Tekan: `Ctrl + C`
   - Atau klik kanan → "Copy"

5. **Navigasi ke htdocs**
   - Buka: `C:\xampp\htdocs\`
   - (Sesuaikan jika XAMPP di drive/lokasi lain)

6. **Buat Folder untuk Project**
   - Klik kanan di kosong → "New Folder"
   - Beri nama: `asmaraloka`
   - (Atau nama lain yang kamu sukai)

7. **Paste File ke Folder Baru**
   - Buka folder `asmaraloka` yang baru dibuat
   - Tekan: `Ctrl + V`
   - Tunggu proses copy selesai

#### Metode 2: Command Line (PowerShell)

Jika lebih nyaman dengan terminal:

```powershell
# Buka PowerShell sebagai Administrator
# (Klik kanan menu Start → Windows PowerShell (Admin))

# Copy folder
Copy-Item -Path "d:\Asmaraloka Kaharsa" -Destination "C:\xampp\htdocs\asmaraloka" -Recurse

# Verify - pastikan folder ada
dir "C:\xampp\htdocs\asmaraloka"

# Seharusnya muncul file seperti:
# index.html, login.html, admin/, api/, css/, js/, images/, etc.
```

**Hasil Akhir (Struktur Folder):**
```
C:\xampp\htdocs\asmaraloka\
  ├── index.html
  ├── login.html
  ├── profile.html
  ├── README.md                    ← File ini
  ├── admin/
  │   └── dashboard.html
  ├── api/
  │   ├── db.php
  │   ├── login.php
  │   ├── admin-login.php
  │   └── ... (file API lainnya)
  ├── css/
  ├── js/
  ├── images/
  └── ... (file lainnya)
```

### Langkah 3: Start XAMPP

1. **Buka XAMPP Control Panel**
   - Cari file: `C:\xampp\xampp-control.exe`
   - Double-click untuk jalankan
   - (Atau bisa dari Start Menu)

2. **Tampilan XAMPP Control Panel:**
   ```
   ┌─────────────────────────────────────┐
   │ Apache        [Start] [Stop]        │
   │ MySQL         [Start] [Stop]        │
   │ FileZilla     [Start] [Stop]        │
   │ Tomcat        [Start] [Stop]        │
   └─────────────────────────────────────┘
   ```

3. **Jalankan Apache**
   - Klik tombol **[Start]** di baris Apache
   - Tunggu sampai berubah warna ke HIJAU (Running)

4. **Jalankan MySQL**
   - Klik tombol **[Start]** di baris MySQL
   - Tunggu sampai berubah warna ke HIJAU (Running)

**Status:**
```
Apache   ✅ Running (Port 80)
MySQL    ✅ Running (Port 3306)
```

### Langkah 4: Verifikasi Database

1. **Buka phpMyAdmin**
   - Buka browser
   - Ketik: `http://localhost/phpmyadmin`
   - Tekan: Enter

2. **Login phpMyAdmin**
   - Username: `root`
   - Password: (kosongkan/Enter)
   - Klik: **Go**

3. **Cek Database**
   - Di sebelah kiri, cari list database
   - Pastikan ada database: `asmaraloka_kaharsadb`
   - Klik untuk melihat tabel-tabelnya

Jika database belum ada:
- Buka file SQL (dari phpmyadmin)
- Atau buat manual sesuai dokumentasi `API_DOCUMENTATION.md`

### Langkah 5: Konfigurasi Database Connection

Edit file: `C:\xampp\htdocs\asmaraloka\api\db.php`

1. Buka file `api/db.php` dengan text editor
2. Cari bagian ini:
   ```php
   $DB_HOST = '127.0.0.1';
   $DB_PORT = '3306';
   $DB_NAME = 'asmaraloka_kaharsadb';
   $DB_USER = 'root';
   $DB_PASS = '';
   ```
3. **Sesuaikan dengan konfigurasi MySQL kamu:**
   - `$DB_HOST`: Biasanya `127.0.0.1` atau `localhost`
   - `$DB_PORT`: Biasanya `3306` (default MySQL)
   - `$DB_NAME`: `asmaraloka_kaharsadb` (sesuai nama database)
   - `$DB_USER`: `root` (default XAMPP)
   - `$DB_PASS`: Kosongkan jika no password (default XAMPP)

4. **Save file** (Ctrl + S)

---

## 📂 Struktur Project

```
asmaraloka/
├── 📄 README.md                          ← File ini
├── 📄 QUICK_START_LOGIN.md               ← Panduan cepat login
├── 📄 API_DOCUMENTATION.md               ← Dokumentasi API
├── 📄 ADMIN_DOCUMENTATION.md             ← Dokumentasi admin
│
├── 📄 index.html                         ← Halaman utama (public)
├── 📄 login.html                         ← Halaman login (User & Admin)
├── 📄 profile.html                       ← Profil user (protected)
├── 📄 indexlog.html                      ← Home user (setelah login)
├── 📄 about.html, services.html, etc.    ← Halaman lainnya
│
├── 📁 admin/                             ← Folder admin
│   └── 📄 dashboard.html                 ← Admin dashboard (protected)
│
├── 📁 api/                               ← REST API (PHP)
│   ├── 📄 db.php                         ← Database connection
│   ├── 📄 test-connection.php            ← Test DB connection
│   ├── 🔐 login.php                      ← User login API
│   ├── 🔐 logout.php                     ← User logout API
│   ├── 🔐 register.php                   ← User register API
│   ├── 🔐 profile.php                    ← Profile API (GET/POST)
│   ├── 🔐 pembayaran.php                 ← Payment API
│   ├── 🔐 admin-login.php                ← Admin login API
│   ├── 🔐 admin-logout.php               ← Admin logout API
│   └── 🔐 check-admin-session.php        ← Check admin session
│
├── 📁 css/                               ← Stylesheet
│   ├── style.css
│   ├── bootstrap.css
│   └── ... (CSS lainnya)
│
├── 📁 js/                                ← JavaScript
│   ├── main.js
│   ├── auth.js                           ← Authentication logic
│   ├── jquery.min.js
│   └── ... (JS lainnya)
│
├── 📁 images/                            ← Gambar & asset
│   ├── user-icon.svg                     ← Default avatar
│   └── ... (gambar lainnya)
│
└── 📁 sass/                              ← SASS files (optional)
    └── ... (SCSS files)

Legend:
📄 = File HTML/Config
📁 = Folder
🔐 = File API (memerlukan autentikasi)
```

---

## 🔐 Login & Authentication

Project ini memiliki **2 sistem login terpisah**: User dan Admin.

### User Login

**Akses:** http://localhost/asmaraloka/login.html

1. Klik tab **"User Login"** (warna coklat)
2. Masukkan **username** dan **password**
3. Klik tombol **"User Login"**
4. Jika berhasil → Redirect ke `indexlog.html` ✅

**Username yang Tersedia:**
- Dari database `user` table (yang sudah registrasi)
- Contoh: `hosea` (jika sudah ada di DB)

**Fitur User:**
- View profil (nama, email, telepon)
- Edit profil
- Lihat riwayat pembayaran
- Logout

---

### Admin Login

**Akses:** http://localhost/asmaraloka/login.html

1. Klik tab **"Admin Login"** (warna abu-abu)
2. Masukkan **username** dan **password**
3. Klik tombol **"Admin Login"**
4. Jika berhasil → Redirect ke `admin/dashboard.html` ✅

**Username & Password Admin (Default):**
```
Username: hosea
Password: 1234
```

**Tempat Ubah Admin:**
- Edit file: `api/admin-login.php` (baris ~30-35)
- Cari: `$ADMIN_CREDENTIALS`
- Tambah/ubah username dan password

**Contoh - Tambah Admin Baru:**
```php
$ADMIN_CREDENTIALS = [
  'hosea' => '1234',           // Admin 1
  'admin2' => 'password2',     // Admin 2 (baru)
  'superadmin' => 'super123',  // Admin 3 (baru)
];
```

**Fitur Admin:**
- View dashboard dengan statistik
- Kelola user
- Kelola pesanan & pembayaran
- Generate laporan
- Logout

---

## 🧪 Testing

### Test 1: Koneksi Database

**URL:** http://localhost/asmaraloka/api/test-connection.php

**Expected Output:**
```json
{
  "success": true,
  "message": "Koneksi database berhasil",
  "database": "asmaraloka_kaharsadb",
  "tables": [
    "admin",
    "user",
    "pemesanan",
    "pembayaran",
    ...
  ]
}
```

**Jika Error:**
- Cek Apache & MySQL sudah running?
- Cek database `asmaraloka_kaharsadb` ada?
- Cek config di `api/db.php`

---

### Test 2: User Registration (Opsional)

**URL:** http://localhost/asmaraloka/api/register.php

**Via Postman / cURL:**
```bash
curl -X POST http://localhost/asmaraloka/api/register.php \
  -H "Content-Type: application/json" \
  -d '{
    "nama_depan": "John",
    "nama_belakang": "Doe",
    "username": "john",
    "password": "password123",
    "email": "john@example.com",
    "no_telp": "081234567890"
  }'
```

**Expected Output:**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "user_id": 1,
  "username": "john"
}
```

---

### Test 3: User Login

**Via Browser:**
1. Buka: http://localhost/asmaraloka/login.html
2. Tab "User Login"
3. Username: (username yang sudah registrasi)
4. Password: (password saat registrasi)
5. Klik "User Login"
6. Seharusnya redirect ke `indexlog.html` ✅

**Via Postman / cURL:**
```bash
curl -X POST http://localhost/asmaraloka/api/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "password": "password123"
  }' \
  -c cookies.txt
```

**Expected Output:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "username": "john",
    "nama_depan": "John",
    "nama_belakang": "Doe",
    "email": "john@example.com",
    "no_telp": "081234567890"
  }
}
```

---

### Test 4: Admin Login

**Via Browser:**
1. Buka: http://localhost/asmaralokakaharsa/login.html
2. Tab "Admin Login"
3. Username: `hosea`
4. Password: `1234`
5. Klik "Admin Login"
6. Seharusnya redirect ke `admin/dashboard.html` ✅

**Halaman Admin menampilkan:**
```
Selamat datang di Admin Dashboard
Admin: hosea

[Statistik boxes]
Total User: X
Total Pesanan: X
Total Pembayaran: X
Revenue: Rp X.XXX.XXX
```

---

### Test 5: Get Profile

**Requirement:** User harus sudah login

**Via cURL (dengan session cookie):**
```bash
curl -X GET http://localhost/asmaraloka/api/profile.php \
  -b cookies.txt
```

**Expected Output:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "nama_depan": "John",
    "nama_belakang": "Doe",
    "username": "john",
    "email": "john@example.com",
    "no_telp": "081234567890"
  }
}
```

---

### Test 6: Logout

**Via Browser:**
- Klik tombol "Logout" (di navbar)

**Via cURL:**
```bash
curl -X GET http://localhost/asmaraloka/api/logout.php \
  -b cookies.txt
```

**Expected Output:**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

## 🔧 Troubleshooting

### ❌ Problem: "404 Not Found" saat buka login.html

**Solusi:**
- ✅ Pastikan URL: `http://localhost/asmaraloka/login.html`
- ✅ Jangan buka via: `file:///d:/Asmaraloka Kaharsa/login.html`
- ✅ Apache harus sudah running (status hijau di XAMPP)

---

### ❌ Problem: "Koneksi database gagal" di test-connection.php

**Solusi:**
1. Cek MySQL sudah running (XAMPP Control Panel)
2. Cek database `asmaraloka_kaharsadb` ada:
   - Buka: http://localhost/phpmyadmin
   - Lihat di sidebar kiri
3. Cek config `api/db.php`:
   ```php
   $DB_HOST = '127.0.0.1'  // atau localhost
   $DB_NAME = 'asmaraloka_kaharsadb'
   $DB_USER = 'root'
   $DB_PASS = ''  // kosong untuk default XAMPP
   ```

---

### ❌ Problem: Admin login gagal (error "Username atau password admin salah")

**Solusi:**
1. Pastikan username & password benar (case-sensitive)
2. Default admin: `hosea` / `1234`
3. Jika lupa, edit: `api/admin-login.php` (baris 30-35)

---

### ❌ Problem: User Login berhasil tapi tidak redirect

**Solusi:**
1. Buka browser console (F12)
2. Lihat di tab "Console" apakah ada error JavaScript
3. Cek file `api/login.php` mengembalikan JSON dengan `"success": true`
4. Cek cookies enabled di browser

---

### ❌ Problem: Session tidak bekerja (logout kemudian login lagi, status logout)

**Solusi:**
1. Restart Apache & MySQL (Stop → Start)
2. Clear browser cookies (Ctrl+Shift+Delete)
3. Cek `session.save_path` di `php.ini` (folder `tmp/` harus writable)

---

## 📚 Dokumentasi Lengkap

Untuk informasi lebih detail, baca file-file berikut:

| File | Isi |
|------|-----|
| `QUICK_START_LOGIN.md` | Panduan cepat login User & Admin |
| `API_DOCUMENTATION.md` | Dokumentasi lengkap semua endpoint API |
| `ADMIN_DOCUMENTATION.md` | Dokumentasi admin, security, best practices |

---

## 🎯 Workflow Singkat

### User Workflow
```
1. Buka http://localhost/asmaraloka
   ↓
2. Klik "Login" di navbar
   ↓
3. Masukkan username & password user
   ↓
4. Login berhasil → lihat indexlog.html
   ↓
5. View/edit profile
   ↓
6. Logout
```

### Admin Workflow
```
1. Buka http://localhost/asmaraloka/login.html
   ↓
2. Klik tab "Admin Login"
   ↓
3. Masukkan username & password admin (hosea/1234)
   ↓
4. Login berhasil → lihat admin/dashboard.html
   ↓
5. Kelola user, pesanan, pembayaran, dll
   ↓
6. Logout
```

---

## ✅ Checklist Setup

Pastikan semua item sudah dicek sebelum mulai menggunakan:

- [ ] XAMPP sudah diinstall
- [ ] Project sudah dipindahkan ke `C:\xampp\htdocs\asmaraloka\`
- [ ] Apache running (hijau) di XAMPP Control Panel
- [ ] MySQL running (hijau) di XAMPP Control Panel
- [ ] Database `asmaraloka_kaharsadb` sudah ada
- [ ] Test connection berhasil: http://localhost/asmaraloka/api/test-connection.php
- [ ] User bisa login: http://localhost/asmaraloka/login.html (user login)
- [ ] Admin bisa login: http://localhost/asmaraloka/login.html (admin login, hosea/1234)
- [ ] Profile page accessible (setelah login user)
- [ ] Admin dashboard accessible (setelah login admin)
- [ ] Logout berfungsi

---

## 🆘 Bantuan & Support

Jika ada yang kurang jelas atau ada error:

1. **Baca dokumentasi** di file markdown yang tersedia
2. **Check log file:**
   - Apache: `C:\xampp\apache\logs\error.log`
   - PHP: `C:\xampp\php\logs\php_error.log`
   - MySQL: `C:\xampp\mysql\data\mysql_error.log`
3. **Tanya ke developer** dengan error message lengkap

---

## 📝 Catatan Penting

### Untuk Development
- ✅ Semua sudah siap digunakan
- ✅ Password admin bisa hardcoded (ok untuk dev)
- ✅ Tidak perlu HTTPS
- ✅ Localhost access saja

### Untuk Production
- ⚠️ Jangan gunakan password plain → Hash dengan bcrypt
- ⚠️ Move admin ke database table (jangan hardcoded)
- ⚠️ Gunakan HTTPS
- ⚠️ Setup environment variables (jangan hardcoded DB config)
- ⚠️ Implementasi rate limiting
- ⚠️ Implementasi logging & monitoring
- ⚠️ Regular security audit

---

## 📞 Contact

- Project: Asmaraloka Kaharsa - Wedding Organizer
- Email: asmaralokakaharsa@gmail.com
- Website: (akan ditambahkan)

---

**Last Updated:** 13 November 2025  
**Status:** ✅ Ready for Development

Selamat menggunakan! Happy Coding! 🚀
