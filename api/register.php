<?php
// api/register.php
// Endpoint untuk registrasi user baru

session_start();
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$nama_depan = trim($input['nama_depan'] ?? '');
$nama_belakang = trim($input['nama_belakang'] ?? '');
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';
$email = trim($input['email'] ?? '');
$no_telp = trim($input['no_telp'] ?? '');

// Validasi
if (!$nama_depan || !$username || !$password || !$email) {
  json_response(['error' => 'Nama depan, username, password, dan email wajib diisi'], 400);
}

if (strlen($password) < 6) {
  json_response(['error' => 'Password minimal 6 karakter'], 400);
}

// Check username sudah ada
$stmt = $pdo->prepare('SELECT id FROM user WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
if ($stmt->fetch()) {
  json_response(['error' => 'Username sudah terdaftar'], 409);
}

// Hash password
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Insert user baru
try {
  $stmt = $pdo->prepare('
    INSERT INTO user (nama_depan, nama_belakang, username, password, email, no_telp)
    VALUES (?, ?, ?, ?, ?, ?)
  ');
  $stmt->execute([$nama_depan, $nama_belakang, $username, $password_hash, $email, $no_telp]);
  $user_id = $pdo->lastInsertId();

  // Auto-login setelah registrasi
  $_SESSION['user_id'] = $user_id;
  $_SESSION['username'] = $username;

  json_response([
    'success' => true,
    'message' => 'Registrasi berhasil',
    'user_id' => $user_id,
    'username' => $username
  ], 201);
} catch (Exception $e) {
  json_response(['error' => 'Registrasi gagal: ' . $e->getMessage()], 500);
}
?>
