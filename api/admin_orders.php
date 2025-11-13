<?php
// api/admin_orders.php
session_start();
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
  http_response_code(401);
  echo json_encode(['error'=>'Unauthorized']);
  exit;
}

try {
  $stmt = $pdo->query('SELECT pm.id_pemesanan, pm.id_user, pm.id_paket, pm.status, pm.total_harga, pm.tanggal_pemesanan, u.username, p.title as package_title FROM pemesanan pm LEFT JOIN user u ON u.id = pm.id_user LEFT JOIN paket p ON p.id = pm.id_paket ORDER BY pm.tanggal_pemesanan DESC');
  $orders = $stmt->fetchAll();
  echo json_encode(['success'=>true,'orders'=>$orders]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error'=>'Server error: '.$e->getMessage()]);
}

?>
