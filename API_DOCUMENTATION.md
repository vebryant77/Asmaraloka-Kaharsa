# Panduan Integrasi Database MySQL dengan PHP

Dokumentasi lengkap untuk menghubungkan Asmaraloka Kaharsa dengan database MySQL menggunakan XAMPP.

## 1. Setup Awal

### Langkah 1: Pindahkan Project ke htdocs
```
C:\xampp\htdocs\asmaraloka\
```
(Sesuaikan path jika berbeda dengan instalasi Anda)

### Langkah 2: Start Apache & MySQL
- Buka XAMPP Control Panel
- Klik tombol "Start" pada Apache dan MySQL
- Tunggu hingga status menjadi "Running"

### Langkah 3: Verifikasi Database
- Buka http://localhost/phpmyadmin
- Pastikan database `asmaraloka_kaharsadb` sudah ada
- Lihat tabel yang ada di database (sesuai ER diagram)

## 2. File PHP yang Sudah Dibuat

```
api/
  ├── db.php              # Koneksi database (include di semua file)
  ├── test-connection.php # Test koneksi database
  ├── register.php        # Endpoint registrasi user
  ├── login.php           # Endpoint login
  ├── logout.php          # Endpoint logout
  ├── profile.php         # Endpoint GET/UPDATE profil
  └── pembayaran.php      # Endpoint GET daftar pembayaran
```

## 3. Pengaturan Koneksi Database

Edit file `api/db.php` sesuaikan dengan konfigurasi XAMPP Anda:

```php
$DB_HOST = '127.0.0.1';    // Host MySQL (biasanya localhost atau 127.0.0.1)
$DB_PORT = '3306';          // Port MySQL (default 3306)
$DB_NAME = 'asmaraloka_kaharsadb';  // Nama database Anda
$DB_USER = 'root';          // User MySQL (default XAMPP: root)
$DB_PASS = '';              // Password MySQL (default XAMPP: kosong)
```

## 4. Test Koneksi

Buka di browser:
```
http://localhost/asmaraloka/api/test-connection.php
```

Jika berhasil, akan menampilkan JSON:
```json
{
  "success": true,
  "message": "Koneksi database berhasil",
  "database": "asmaraloka_kaharsadb",
  "tables": [...]
}
```

Jika gagal, periksa:
- Apakah MySQL sudah running?
- Apakah nama database benar?
- Apakah user dan password benar?

## 5. Endpoint API

### 5.1 Registrasi User

**URL:** `POST http://localhost/asmaraloka/api/register.php`

**Input (JSON):**
```json
{
  "nama_depan": "Hosea",
  "nama_belakang": "Kaharsa",
  "username": "hosea",
  "password": "password123",
  "email": "hosea@gmail.com",
  "no_telp": "1234589"
}
```

**Output (Success):**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "user_id": 1,
  "username": "hosea"
}
```

### 5.2 Login User

**URL:** `POST http://localhost/asmaraloka/api/login.php`

**Input (JSON):**
```json
{
  "username": "hosea",
  "password": "password123"
}
```

**Output (Success):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "username": "hosea",
    "nama_depan": "Hosea",
    "nama_belakang": "Kaharsa",
    "email": "hosea@gmail.com",
    "no_telp": "1234589"
  }
}
```

Catatan: Session cookie akan disimpan otomatis.

### 5.3 GET Profil User

**URL:** `GET http://localhost/asmaraloka/api/profile.php`

Requirement: User harus sudah login (session aktif)

**Output (Success):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "nama_depan": "Hosea",
    "nama_belakang": "Kaharsa",
    "username": "hosea",
    "email": "hosea@gmail.com",
    "no_telp": "1234589"
  }
}
```

### 5.4 UPDATE Profil User

**URL:** `POST http://localhost/asmaraloka/api/profile.php`

Requirement: User harus sudah login (session aktif)

**Input (JSON):**
```json
{
  "nama_depan": "Hosea",
  "nama_belakang": "Kaharsa",
  "email": "hosea.new@gmail.com",
  "no_telp": "9876543210"
}
```

**Output (Success):**
```json
{
  "success": true,
  "message": "Profil berhasil diperbarui"
}
```

### 5.5 Logout

**URL:** `GET/POST http://localhost/asmaraloka/api/logout.php`

**Output:**
```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

Session akan dihapus otomatis.

### 5.6 GET Daftar Pembayaran

**URL:** `GET http://localhost/asmaraloka/api/pembayaran.php`

Requirement: User harus sudah login (session aktif)

**Output (Success):**
```json
{
  "success": true,
  "payments": [
    {
      "id": 1,
      "id_pemesanan": 1,
      "id_admin": 1,
      "metode_pembayaran": "transfer",
      "status_pembayaran": "belum dibayar",
      "total_harga": "2500000",
      "tanggal_pembayaran": "2025-01-15 10:30:00"
    }
  ]
}
```

## 6. Testing dengan Postman atau cURL

### Test Registrasi
```bash
curl -X POST http://localhost/asmaraloka/api/register.php \
  -H "Content-Type: application/json" \
  -d '{
    "nama_depan": "Hosea",
    "nama_belakang": "Kaharsa",
    "username": "hosea",
    "password": "password123",
    "email": "hosea@gmail.com",
    "no_telp": "1234589"
  }'
```

### Test Login
```bash
curl -X POST http://localhost/asmaraloka/api/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "username": "hosea",
    "password": "password123"
  }' \
  -c cookies.txt
```

### Test GET Profile (dengan session cookie)
```bash
curl -X GET http://localhost/asmaraloka/api/profile.php \
  -b cookies.txt
```

## 7. Integrasi dengan Front-End (JavaScript)

### Contoh: Ganti Login Form

Edit `login.html`:

```html
<form id="loginForm">
  <div class="form-group">
    <input type="text" id="username" class="form-control" placeholder="Username" required>
  </div>
  <div class="form-group">
    <input type="password" id="password" class="form-control" placeholder="Password" required>
  </div>
  <button type="submit" class="btn btn-login">Login</button>
</form>

<script>
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch('api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'  // Penting untuk session
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      alert('Login berhasil');
      window.location.href = 'indexlog.html';
    } else {
      alert(data.error || 'Login gagal');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
</script>
```

### Contoh: Load Profil di profile.html

```javascript
async function loadProfile() {
  try {
    const response = await fetch('api/profile.php', {
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      document.getElementById('fullName').value = data.user.nama_depan + ' ' + data.user.nama_belakang;
      document.getElementById('email').value = data.user.email;
      document.getElementById('phone').value = data.user.no_telp;
    } else {
      alert(data.error || 'Gagal memuat profil');
      window.location.href = 'login.html';
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Jalankan saat halaman load
window.addEventListener('load', loadProfile);
```

### Contoh: Update Profil

```javascript
document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const nama_depan = document.getElementById('fullName').value.split(' ')[0];
  const nama_belakang = document.getElementById('fullName').value.split(' ').slice(1).join(' ');
  const email = document.getElementById('email').value;
  const no_telp = document.getElementById('phone').value;
  
  try {
    const response = await fetch('api/profile.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama_depan,
        nama_belakang,
        email,
        no_telp
      }),
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      alert(data.message);
    } else {
      alert(data.error || 'Update gagal');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
```

### Contoh: Load Daftar Pembayaran

```javascript
async function loadPayments() {
  try {
    const response = await fetch('api/pembayaran.php', {
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      const tbody = document.querySelector('table tbody');
      tbody.innerHTML = '';
      
      data.payments.forEach(payment => {
        const row = `
          <tr>
            <td>${payment.tanggal_pembayaran}</td>
            <td>${payment.id_pemesanan}</td>
            <td>Rp ${parseInt(payment.total_harga).toLocaleString('id-ID')}</td>
            <td><span class="label label-${getStatusClass(payment.status_pembayaran)}">${payment.status_pembayaran}</span></td>
            <td>${payment.metode_pembayaran}</td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    } else {
      alert(data.error || 'Gagal memuat pembayaran');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function getStatusClass(status) {
  if (status === 'belum dibayar') return 'warning';
  if (status === 'sudah dibayar') return 'success';
  if (status === 'lunas') return 'success';
  return 'default';
}

window.addEventListener('load', loadPayments);
```

## 8. Keamanan

- ✅ Gunakan prepared statements (sudah dilakukan)
- ✅ Hash password dengan password_hash() (sudah dilakukan)
- ✅ Validasi input (sudah dilakukan)
- ⚠️ Di production, gunakan HTTPS
- ⚠️ Jangan expose password atau API key
- ⚠️ Setup proper database user dengan minimal privileges

## 9. Troubleshooting

### Koneksi database gagal
- Periksa MySQL running di XAMPP
- Verifikasi nama database, user, password di `api/db.php`
- Test di `api/test-connection.php`

### Session tidak bekerja
- Pastikan `credentials: 'include'` dalam fetch request
- Cookies harus enabled di browser
- Jangan jalankan via file:// protokol, gunakan http://localhost

### CORS Error
- Jika API di domain berbeda, tambahkan CORS header di `db.php`
- Sudah ada helper `set_cors_headers()` yang bisa digunakan

---

**Perlu bantuan lebih lanjut?** Hubungi atau modifikasi file API sesuai kebutuhan.
