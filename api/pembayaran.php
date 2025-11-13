<?php
// api/pembayaran.php
// Endpoint untuk GET daftar pembayaran user

session_start();
require_once __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
  json_response(['error' => 'Anda belum login'], 401);
}

$user_id = (int)$_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
  json_response(['error' => 'Method not allowed'], 405);
}

try {
  $stmt = $pdo->prepare('
    SELECT
      id,
      id_pemesanan,
      id_admin,
      metode_pembayaran,
      status_pembayaran,
      total_harga,
      tanggal_pembayaran
    FROM pembayaran
    WHERE id_pemesanan IN (
      SELECT id_pemesanan FROM pemesanan WHERE id_user = ?
    )
    ORDER BY tanggal_pembayaran DESC
  ');
  $stmt->execute([$user_id]);
  $payments = $stmt->fetchAll();

  json_response([
    'success' => true,
    'payments' => $payments
  ]);
} catch (Exception $e) {
  json_response(['error' => 'Query gagal: ' . $e->getMessage()], 500);
}
?>
