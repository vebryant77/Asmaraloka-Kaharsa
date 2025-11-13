# Dokumentasi Admin Login & Dashboard

Sistem login terpisah untuk User dan Admin dengan kontrol akses berbasis whitelist.

## Struktur

```
/admin/
  ├── dashboard.html      # Dashboard admin (protected)
  └── ...                 # Halaman admin lainnya (nanti)

/api/
  ├── admin-login.php         # Endpoint admin login (whitelist)
  ├── admin-logout.php        # Endpoint admin logout
  ├── check-admin-session.php # Cek session admin
  └── ...                     # API user lainnya
```

## Admin Credentials (Whitelist)

**Default Admin Account:**
- Username: `hosea`
- Password: `1234`

**Lokasi pengaturan:** `api/admin-login.php` (baris ~30-35)

```php
$ADMIN_CREDENTIALS = [
  'hosea' => '1234',
  // Tambahkan admin lain di sini:
  // 'admin2' => 'password2',
];
```

### Cara Tambah Admin Baru:
1. Edit file `api/admin-login.php`
2. Tambahkan entry baru di array `$ADMIN_CREDENTIALS`:
   ```php
   'username_baru' => 'password_baru',
   ```
3. Save file

## Login Flow

### User Login
1. Buka http://localhost/asmaraloka/login.html
2. Klik tab "User Login" (default)
3. Masukkan username & password user biasa
4. Redirect ke `indexlog.html` (halaman user dashboard)

### Admin Login
1. Buka http://localhost/asmaraloka/login.html
2. Klik tab "Admin Login"
3. Masukkan username & password admin (dari whitelist)
4. Redirect ke `admin/dashboard.html` (halaman admin dashboard)

## Endpoint API

### Admin Login

**URL:** `POST /api/admin-login.php`

**Request:**
```json
{
  "username": "hosea",
  "password": "1234"
}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Admin login berhasil",
  "admin": {
    "username": "hosea",
    "role": "admin"
  }
}
```

**Response Error:**
```json
{
  "error": "Username atau password admin salah"
}
```

### Check Admin Session

**URL:** `GET /api/check-admin-session.php`

**Response (Authenticated):**
```json
{
  "authenticated": true,
  "admin_username": "hosea",
  "login_time": 1702345678
}
```

**Response (Not Authenticated):**
```json
{
  "authenticated": false
}
```

### Admin Logout

**URL:** `GET/POST /api/admin-logout.php`

**Response:**
```json
{
  "success": true,
  "message": "Admin logout berhasil"
}
```

## Keamanan

- ✅ Whitelist-based access control
- ✅ Session management (PHP $_SESSION)
- ✅ Cookies dengan HttpOnly flag (implicit di PHP)
- ⚠️ Password disimpan plain di config (untuk development saja)
- ⚠️ Untuk production: gunakan hashed password di database

### Rekomendasi Peningkatan Keamanan:

#### 1. Hash Password (Production Ready)
```php
// Saat setup pertama kali
$ADMIN_CREDENTIALS = [
  'hosea' => '$2y$10$...', // hasil password_hash('1234', PASSWORD_DEFAULT)
];

// Saat login, verifikasi dengan:
if (!password_verify($password, $ADMIN_CREDENTIALS[$username])) {
  // login gagal
}
```

#### 2. Pindahkan ke Database
```php
// Buat table admin di MySQL:
CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active TINYINT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// Query di admin-login.php:
$stmt = $pdo->prepare('SELECT * FROM admin WHERE username = ? AND is_active = 1');
$stmt->execute([$username]);
$admin = $stmt->fetch();
if ($admin && password_verify($password, $admin['password_hash'])) {
  // login success
}
```

#### 3. Rate Limiting
```php
// Cegah brute force
$attempts = $_SESSION['login_attempts'] ?? 0;
if ($attempts > 5) {
  json_response(['error' => 'Terlalu banyak percobaan login gagal'], 429);
}

// Increment counter jika gagal
if (login gagal) {
  $_SESSION['login_attempts'] = $attempts + 1;
}
```

#### 4. Logging & Monitoring
```php
// Log failed login attempts
error_log("Failed admin login: $username from " . $_SERVER['REMOTE_ADDR']);

// Log successful login
error_log("Admin login success: $username at " . date('Y-m-d H:i:s'));
```

## Testing

### Via Browser
1. http://localhost/asmaraloka/login.html
2. Klik "Admin Login"
3. Masukkan hosea / 1234
4. Seharusnya redirect ke admin/dashboard.html

### Via Postman/cURL
```bash
curl -X POST http://localhost/asmaraloka/api/admin-login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"hosea","password":"1234"}' \
  -c cookies.txt

# Check session
curl http://localhost/asmaraloka/api/check-admin-session.php \
  -b cookies.txt
```

## Halaman Admin (Perlu Dikembangkan)

Saat ini dashboard hanya menampilkan placeholder. Fitur yang bisa ditambahkan:

1. **Kelola User** - CRUD user
2. **Kelola Pesanan** - View & update pesanan
3. **Kelola Pembayaran** - Verifikasi pembayaran
4. **Kelola Paket** - Edit paket layanan
5. **Laporan** - Export data Excel/PDF
6. **Settings** - Konfigurasi sistem
7. **Log** - Lihat activity log
8. **Manajemen Admin** - Add/remove admin

## Next Steps

1. Implementasikan database table untuk admin (lebih aman)
2. Tambahkan hashing password
3. Buat halaman kelola user
4. Buat halaman kelola pesanan
5. Buat halaman kelola pembayaran
6. Tambahkan email notification untuk admin
7. Implementasikan 2FA untuk admin

---

**Pertanyaan?** Tanya dan saya akan develop lebih lanjut!
