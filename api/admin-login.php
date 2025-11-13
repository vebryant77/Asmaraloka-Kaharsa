<?php
// api/admin-login.php
// Endpoint untuk admin login dengan whitelist username/password

session_start();
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$username = trim($input['username'] ?? '');
$password = trim($input['password'] ?? '');

if (!$username || !$password) {
  json_response(['error' => 'Username dan password wajib diisi'], 400);
}

// Whitelist admin credentials (HARDCODED - ganti sesuai kebutuhan)
// Format: 'username' => 'password_yang_di-hash atau plain'
// Untuk production, gunakan hash dan simpan di database table admin
$ADMIN_CREDENTIALS = [
  'hosea' => '1234',
  // Tambahkan admin lain di sini jika diperlukan:
  // 'admin2' => 'password2',
];

// Verifikasi admin
if (!isset($ADMIN_CREDENTIALS[$username]) || $ADMIN_CREDENTIALS[$username] !== $password) {
  // Log attempt for security (optional)
  error_log("Failed admin login attempt: $username from " . $_SERVER['REMOTE_ADDR']);
  
  http_response_code(401);
  json_response(['error' => 'Username atau password admin salah'], 401);
}

// Set session untuk admin
$_SESSION['admin_id'] = md5($username); // Pseudo ID
$_SESSION['admin_username'] = $username;
$_SESSION['is_admin'] = true;
$_SESSION['login_time'] = time();

json_response([
  'success' => true,
  'message' => 'Admin login berhasil',
  'admin' => [
    'username' => $username,
    'role' => 'admin'
  ]
]);
?>
