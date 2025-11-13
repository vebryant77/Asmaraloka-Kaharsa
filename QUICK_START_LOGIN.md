# 🎉 SISTEM LOGIN TERINTEGRASI - PANDUAN CEPAT

Sistem login User dan Admin sudah siap! Ada 2 halaman yang bisa diakses dengan username/password berbeda.

## 🚀 Quick Start

### 1. Login Sebagai User
- URL: http://localhost/asmaraloka/login.html
- Klik tab **"User Login"** (warna coklat)
- Masukkan username & password user
- Redirect ke: `indexlog.html` ✅

**User Yang Bisa Login:**
- Username: `hosea` (daftar di database MySQL)
- Username: `(user lain yang sudah registrasi)`

### 2. Login Sebagai Admin
- URL: http://localhost/asmaraloka/login.html
- Klik tab **"Admin Login"** (warna abu-abu)
- Masukkan username & password admin
- Redirect ke: `admin/dashboard.html` ✅

**Admin Yang Bisa Login (Default):**
- Username: `hosea`
- Password: `1234`

## 📁 File-File Baru

```
/api/
  ├── admin-login.php              ← Login admin dengan whitelist
  ├── admin-logout.php             ← Logout admin
  ├── check-admin-session.php      ← Check session admin
  └── (file API user sudah ada)

/admin/
  └── dashboard.html               ← Halaman dashboard admin

/
  ├── login.html                   ← Updated dengan toggle User/Admin
  ├── ADMIN_DOCUMENTATION.md       ← Dokumentasi admin lengkap
  ├── API_DOCUMENTATION.md         ← Dokumentasi API (sudah ada)
  └── (file lain tidak berubah)
```

## ⚙️ Cara Tambah Admin Baru

Edit file: `api/admin-login.php` (cari bagian ini):

```php
$ADMIN_CREDENTIALS = [
  'hosea' => '1234',
  // TAMBAHKAN DI SINI:
  'admin2' => 'password2',
  'admin3' => 'password3',
];
```

Save dan selesai! Admin baru langsung bisa login.

## 🔐 Workflow Login

```
User buka login.html
       ↓
[User Login] ← Tab toggle → [Admin Login]
       ↓                           ↓
User submit form              Admin submit form
       ↓                           ↓
POST ke api/login.php         POST ke api/admin-login.php
       ↓                           ↓
Check MySQL database          Check whitelist (hardcoded)
       ↓                           ↓
Success → Set session         Success → Set session
    ↓                             ↓
Redirect indexlog.html    Redirect admin/dashboard.html
```

## 📊 Admin Dashboard

Halaman: `admin/dashboard.html`

Fitur saat ini:
- ✅ Protected (hanya admin bisa akses)
- ✅ Tampil username admin
- ✅ Logout button
- ✅ Placeholder statistik (bisa dikembangkan)

Fitur yang bisa ditambahkan nanti:
- [ ] Kelola User (CRUD)
- [ ] Kelola Pesanan
- [ ] Kelola Pembayaran
- [ ] Laporan penjualan
- [ ] Settings sistem

## 🧪 Testing

### Test Login User
1. Buka http://localhost/asmaraloka/login.html
2. Pastikan tab "User Login" aktif (warna coklat)
3. Masukkan user yang sudah terdaftar (cth: hosea / password)
4. Klik "User Login"
5. Seharusnya redirect ke indexlog.html

### Test Login Admin
1. Buka http://localhost/asmaraloka/login.html
2. Klik tab "Admin Login" (warna abu-abu)
3. Masukkan: `hosea` / `1234`
4. Klik "Admin Login"
5. Seharusnya redirect ke admin/dashboard.html
6. Halaman menampilkan: "Selamat datang, hosea"

### Test Logout
1. Di halaman admin dashboard, klik "Logout"
2. Akan muncul confirm dialog
3. Klik OK
4. Redirect ke login.html

## 🛡️ Keamanan

### Saat Ini (Development)
- ✅ Whitelist-based access
- ✅ Session management
- ✅ HTML/JSON injection prevention
- ⚠️ Password plain text (OK untuk dev)

### Untuk Production
Recommended improvements di ADMIN_DOCUMENTATION.md:
1. Hash password dengan bcrypt
2. Pindahkan admin ke database
3. Tambah rate limiting
4. Logging & monitoring
5. 2FA untuk admin

## 🔗 API Endpoints

### User
- POST `/api/login.php` - User login
- GET `/api/logout.php` - User logout
- GET `/api/profile.php` - Get profil user
- POST `/api/profile.php` - Update profil user

### Admin
- POST `/api/admin-login.php` - Admin login
- GET `/api/admin-logout.php` - Admin logout
- GET `/api/check-admin-session.php` - Check admin session

## ❓ FAQ

**Q: Bagaimana cara login sebagai user yang baru?**
A: User harus registrasi dulu atau ada di database MySQL `user` table. Bisa via API `/api/register.php` atau insert manual di phpMyAdmin.

**Q: Bisa ubah password admin?**
A: Edit hardcoded di `api/admin-login.php` untuk sekarang. Untuk production, gunakan database.

**Q: User bisa akses admin dashboard?**
A: Tidak! Dashboard cek session dengan `check-admin-session.php` dan redirect ke login jika bukan admin.

**Q: Admin bisa akses halaman user?**
A: Bisa, karena session admin terpisah dari user. Untuk pembatasan, tambahkan check di halaman user.

**Q: Reset password user?**
A: Bisa via email (perlu implementasi SMTP) atau admin reset manual di database.

---

## 🎯 Next Steps (Opsional)

1. **Develop admin pages lebih lengkap** (user management, order management, etc.)
2. **Tambah database table untuk admin** (lebih aman daripada hardcoded)
3. **Implementasi email notification**
4. **Tambah 2FA untuk admin**
5. **Dashboard analytics**

---

**Perlu bantuan?** Tanya kapan saja! 😊
