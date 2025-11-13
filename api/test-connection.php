<?php
// api/test-connection.php
// File untuk test koneksi database

require_once __DIR__ . '/db.php';

try {
  // Test koneksi
  $stmt = $pdo->query('SELECT 1');
  $stmt->fetch();

  // Ambil info database
  $stmt = $pdo->query('SHOW TABLES');
  $tables = $stmt->fetchAll();

  header('Content-Type: application/json');
  http_response_code(200);
  echo json_encode([
    'success' => true,
    'message' => 'Koneksi database berhasil',
    'database' => 'asmaraloka_kaharsadb',
    'tables' => $tables
  ], JSON_PRETTY_PRINT);
} catch (Exception $e) {
  header('Content-Type: application/json');
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'error' => $e->getMessage()
  ], JSON_PRETTY_PRINT);
}
?>
