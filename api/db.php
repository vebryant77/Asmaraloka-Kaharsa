<?php
// api/db.php
// Koneksi database menggunakan PDO (aman, prepared statements)

declare(strict_types=1);

$DB_HOST = '127.0.0.1';
$DB_PORT = '3306';
$DB_NAME = 'asmaraloka_kaharsadb';
$DB_USER = 'root'; // sesuaikan dengan user MySQL Anda
$DB_PASS = ''; // sesuaikan dengan password MySQL Anda (default XAMPP: kosong)
$CHARSET = 'utf8mb4';

$dsn = "mysql:host=$DB_HOST;port=$DB_PORT;dbname=$DB_NAME;charset=$CHARSET";

$options = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false,
];

try {
  $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
} catch (Exception $e) {
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode(['error' => 'Koneksi database gagal: ' . $e->getMessage()]);
  exit;
}

// Helper function untuk response JSON
function json_response($data, $code = 200) {
  http_response_code($code);
  header('Content-Type: application/json');
  echo json_encode($data);
  exit;
}

// Helper untuk CORS (jika diperlukan)
function set_cors_headers() {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  set_cors_headers();
  exit;
}
?>
