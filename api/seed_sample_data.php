<?php
// api/seed_sample_data.php
// Simple seeder for development. Run from CLI: php seed_sample_data.php
// Or via browser with token: /api/seed_sample_data.php?run=1&token=seed123

require_once __DIR__ . '/db.php';

// Safety: allow only CLI or explicit token
$allow = false;
if (PHP_SAPI === 'cli') $allow = true;
if (isset($_GET['run']) && $_GET['run'] == '1' && isset($_GET['token']) && $_GET['token'] === 'seed123') $allow = true;

if (!$allow) {
  echo "Seeder disabled. Run via CLI or provide ?run=1&token=seed123\n";
  exit;
}

try {
  $pdo->beginTransaction();

  // Sample users
  $users = [
    ['nama_depan'=>'Hosea','nama_belakang'=>'Kaharsa','username'=>'hosea','password'=>'password123','email'=>'hosea@example.com','no_telp'=>'081234567890'],
    ['nama_depan'=>'John','nama_belakang'=>'Doe','username'=>'johndoe','password'=>'password123','email'=>'john@example.com','no_telp'=>'08111111111'],
    ['nama_depan'=>'Jane','nama_belakang'=>'Smith','username'=>'janes','password'=>'password123','email'=>'jane@example.com','no_telp'=>'08222222222'],
  ];

  $insertUser = $pdo->prepare('INSERT IGNORE INTO user (nama_depan,nama_belakang,username,password,email,no_telp) VALUES (?,?,?,?,?,?)');
  foreach ($users as $u) {
    $hash = password_hash($u['password'], PASSWORD_DEFAULT);
    $insertUser->execute([$u['nama_depan'],$u['nama_belakang'],$u['username'],$hash,$u['email'],$u['no_telp']]);
  }

  // Sample packages
  $packages = [
    ['title'=>'Paket Silver','description'=>'Paket pernikahan sederhana','price'=>2500000.00],
    ['title'=>'Paket Gold','description'=>'Paket pernikahan lengkap','price'=>5000000.00],
    ['title'=>'Paket Platinum','description'=>'Paket premium termasuk vendor top','price'=>10000000.00],
  ];
  $insertPkg = $pdo->prepare('INSERT IGNORE INTO paket (title,description,price) VALUES (?,?,?)');
  foreach ($packages as $p) $insertPkg->execute([$p['title'],$p['description'],$p['price']]);

  // Create some pemesanan and pembayaran for existing users/packages
  $usersDb = $pdo->query('SELECT id FROM user')->fetchAll(PDO::FETCH_COLUMN);
  $pkgsDb = $pdo->query('SELECT id, price FROM paket')->fetchAll(PDO::FETCH_ASSOC);

  if ($usersDb && $pkgsDb) {
    $insertOrder = $pdo->prepare('INSERT INTO pemesanan (id_user,id_paket,status,total_harga) VALUES (?,?,?,?)');
    $insertPayment = $pdo->prepare('INSERT INTO pembayaran (id_pemesanan,id_admin,metode_pembayaran,status_pembayaran,total_harga,tanggal_pembayaran) VALUES (?,?,?,?,?,?)');

    foreach ($usersDb as $uid) {
      // pick random package
      $pkg = $pkgsDb[array_rand($pkgsDb)];
      $status = (rand(0,1) ? 'confirmed' : 'pending');
      $insertOrder->execute([$uid, $pkg['id'], $status, $pkg['price']]);
      $orderId = $pdo->lastInsertId();

      // create payment record (some paid, some pending)
      $paid = rand(0,1);
      $payStatus = $paid ? 'sudah dibayar' : 'belum dibayar';
      $tanggal = $paid ? date('Y-m-d H:i:s', strtotime('-'.rand(1,30).' days')) : null;
      $insertPayment->execute([$orderId, null, 'transfer', $payStatus, $pkg['price'], $tanggal]);
    }
  }

  $pdo->commit();
  echo "Seeder completed successfully.\n";
} catch (Exception $e) {
  $pdo->rollBack();
  echo "Seeder failed: " . $e->getMessage() . "\n";
}

?>
