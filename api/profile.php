<?php
// api/profile.php
// Endpoint untuk GET dan UPDATE profil user

session_start();
require_once __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
  json_response(['error' => 'Anda belum login'], 401);
}

$user_id = (int)$_SESSION['user_id'];

// GET - Ambil data profil
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $stmt = $pdo->prepare('
    SELECT id, nama_depan, nama_belakang, username, email, no_telp
    FROM user
    WHERE id = ?
  ');
  $stmt->execute([$user_id]);
  $user = $stmt->fetch();

  if (!$user) {
    json_response(['error' => 'User tidak ditemukan'], 404);
  }

  json_response(['success' => true, 'user' => $user]);
  exit;
}

// POST - Update profil
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

  $nama_depan = trim($input['nama_depan'] ?? '');
  $nama_belakang = trim($input['nama_belakang'] ?? '');
  $email = trim($input['email'] ?? '');
  $no_telp = trim($input['no_telp'] ?? '');

  if (!$nama_depan || !$email) {
    json_response(['error' => 'Nama depan dan email wajib diisi'], 400);
  }

  try {
    $stmt = $pdo->prepare('
      UPDATE user
      SET nama_depan = ?, nama_belakang = ?, email = ?, no_telp = ?
      WHERE id = ?
    ');
    $stmt->execute([$nama_depan, $nama_belakang, $email, $no_telp, $user_id]);

    json_response(['success' => true, 'message' => 'Profil berhasil diperbarui']);
  } catch (Exception $e) {
    json_response(['error' => 'Update gagal: ' . $e->getMessage()], 500);
  }
  exit;
}

json_response(['error' => 'Method not allowed'], 405);
?>
