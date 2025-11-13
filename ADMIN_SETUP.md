**Admin Setup & DB Init**

Langkah-langkah cepat untuk menyiapkan database dan menguji admin dashboard lokal.

1) Import SQL (phpMyAdmin)
   - Buka: `http://localhost/phpmyadmin`
   - Pilih tab `Import` dan unggah file: `sql/setup_tables.sql`

   Atau via MySQL CLI (PowerShell):
   ```powershell
   # Replace path if MySQL not in PATH. Use full path to mysql.exe if needed.
   mysql -u root -p < "C:\xampp\htdocs\asmaralokakaharsa\sql\setup_tables.sql"
   ```

2) Buat user contoh (opsional)
   - Disarankan menggunakan endpoint registrasi yang sudah ada untuk membuat user baru:
   ```powershell
   curl -X POST http://localhost/asmaraloka/api/register.php -H "Content-Type: application/json" -d '{"nama_depan":"Test","nama_belakang":"User","username":"test","password":"password123","email":"test@example.com","no_telp":"081234"}' -c cookies.txt
   ```

3) Admin credentials (dev)
   - Default admin untuk development sudah ada di `api/admin-login.php` (whitelist):
     - Username: `hosea`
     - Password: `1234`

4) Jalankan XAMPP
   - Start `Apache` dan `MySQL` di XAMPP Control Panel (`C:\xampp\xampp-control.exe`)

5) Buka halaman admin
   - Admin login: `http://localhost/asmaraloka/login.html` (pilih tab Admin Login)
   - Setelah login (hosea/1234) buka: `http://localhost/asmaraloka/admin/admin-model.html`

6) Jika ingin menggunakan admin table dan hashed passwords
   - Anda bisa menyimpan admin di database dengan hash:
   ```php
   // contoh snippet PHP (jalankan sekali)
   $hash = password_hash('1234', PASSWORD_DEFAULT);
   // INSERT INTO admin (username, password_hash) VALUES ('hosea', '$hash');
   ```

7) Testing API endpoints (contoh)
   - List users: `GET http://localhost/asmaraloka/api/admin_customers.php` (butuh admin session cookie)
   - List packages: `GET http://localhost/asmaraloka/api/admin_packages.php`
   - Stats: `GET http://localhost/asmaraloka/api/admin_stats.php`

   8) Seed sample data (optional, development)
       - Saya menyediakan seeder PHP di: `api/seed_sample_data.php`.
       - Jalankan dari CLI (direkomendasikan):
          ```powershell
          php "C:\xampp\htdocs\asmaralokakaharsa\api\seed_sample_data.php"
          ```
       - Atau jalankan dari browser (development only) dengan token:
          `http://localhost/asmaraloka/api/seed_sample_data.php?run=1&token=seed123`
       - Seeder akan menambahkan beberapa user, paket, pemesanan, dan pembayaran contoh.


Jika butuh, saya bisa membuat skrip PHP kecil untuk menambahkan admin ke table `admin` secara otomatis.
