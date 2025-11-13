<?php
// api/admin_payments.php
session_start();
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
  http_response_code(401);
  echo json_encode(['error'=>'Unauthorized']);
  exit;
}

try {
  $sql = '
    SELECT pay.id, pay.id_pemesanan, pay.id_admin, pay.metode_pembayaran, pay.status_pembayaran, pay.total_harga, pay.tanggal_pembayaran,
           pm.id_user, pm.id_paket, pm.status as order_status, pm.tanggal_pemesanan,
           u.username, p.title as paket_title
    FROM pembayaran pay
    LEFT JOIN pemesanan pm ON pm.id_pemesanan = pay.id_pemesanan
    LEFT JOIN user u ON u.id = pm.id_user
    LEFT JOIN paket p ON p.id = pm.id_paket
    ORDER BY pay.tanggal_pembayaran DESC
  ';

  $stmt = $pdo->query($sql);
  $rows = $stmt->fetchAll();
  echo json_encode(['success'=>true,'payments'=>$rows]);
  exit;
}

// Support updating payment status (PUT)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
  parse_str(file_get_contents('php://input'), $input);
  $id = (int)($_GET['id'] ?? $input['id'] ?? 0);
  $action = $input['action'] ?? '';
  if (!$id) { http_response_code(400); echo json_encode(['error'=>'id required']); exit; }
  if ($action === 'mark_paid') {
    $stmt = $pdo->prepare('UPDATE pembayaran SET status_pembayaran = ? , tanggal_pembayaran = NOW() WHERE id = ?');
    $stmt->execute(['sudah dibayar', $id]);
    echo json_encode(['success'=>true]);
    exit;
  }
  http_response_code(400); echo json_encode(['error'=>'unknown action']); exit;
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error'=>'Server error: '.$e->getMessage()]);
}

?>
