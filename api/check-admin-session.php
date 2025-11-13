<?php
// api/check-admin-session.php
// Endpoint untuk cek apakah admin sudah login

session_start();
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
  http_response_code(401);
  echo json_encode(['authenticated' => false]);
  exit;
}

echo json_encode([
  'authenticated' => true,
  'admin_username' => $_SESSION['admin_username'] ?? 'Unknown',
  'login_time' => $_SESSION['login_time'] ?? null
]);
?>
