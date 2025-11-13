<?php
// api/admin_stats.php
session_start();
require_once __DIR__ . '/db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
  http_response_code(401);
  echo json_encode(['error'=>'Unauthorized']);
  exit;
}

try {
  // total users
  $stmt = $pdo->query('SELECT COUNT(*) as cnt FROM user');
  $totalUsers = (int)$stmt->fetchColumn();

  // total orders
  $stmt = $pdo->query('SELECT COUNT(*) as cnt FROM pemesanan');
  $totalOrders = (int)$stmt->fetchColumn();

  // total payments and revenue
  $stmt = $pdo->query('SELECT COUNT(*) as cnt, COALESCE(SUM(total_harga),0) as revenue FROM pembayaran');
  $row = $stmt->fetch();
  $totalPayments = (int)$row['cnt'];
  $totalRevenue = $row['revenue'];

  // monthly revenue (last 6 months)
  $months = [];
  $monthlyRevenue = [];
  try {
    $stmt = $pdo->query("SELECT DATE_FORMAT(tanggal_pembayaran, '%b %Y') as month_label, SUM(total_harga) as total FROM pembayaran WHERE tanggal_pembayaran IS NOT NULL GROUP BY YEAR(tanggal_pembayaran), MONTH(tanggal_pembayaran) ORDER BY YEAR(tanggal_pembayaran) DESC, MONTH(tanggal_pembayaran) DESC LIMIT 6");
    $rows = array_reverse($stmt->fetchAll());
    foreach ($rows as $r) {
      $months[] = $r['month_label'];
      $monthlyRevenue[] = (float)$r['total'];
    }
  } catch (Exception $e) {
    // ignore
  }

  // top selling packages (try join pemesanan -> paket)
  $topPackages = [];
  try {
    $q = '
      SELECT p.id, p.title, COUNT(*) as sold
      FROM pemesanan pm
      JOIN paket p ON (p.id = pm.paket_id OR p.id = pm.id_paket)
      GROUP BY p.id, p.title
      ORDER BY sold DESC
      LIMIT 5
    ';
    $stmt = $pdo->query($q);
    $topPackages = $stmt->fetchAll();
  } catch (Exception $e) {
    // best effort: attempt alternate column names
    try {
      $q2 = 'SELECT id, title, 0 as sold FROM paket LIMIT 5';
      $stmt = $pdo->query($q2);
      $topPackages = $stmt->fetchAll();
    } catch (Exception $e2) {
      $topPackages = [];
    }
  }

  echo json_encode([
    'success' => true,
    'totalUsers' => $totalUsers,
    'totalOrders' => $totalOrders,
    'totalPayments' => $totalPayments,
    'totalRevenue' => $totalRevenue,
    'topPackages' => $topPackages,
    'months' => $months,
    'monthlyRevenue' => $monthlyRevenue
  ]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error'=>'Server error: '.$e->getMessage()]);
}

?>
