<?php
// api/create_user_izzudin.php
// Create single user 'izzudin' with password '1234' (hashed).
// Run from CLI: php create_user_izzudin.php
// Or via browser (development only): ?run=1&token=createuser

require_once __DIR__ . '/db.php';

$allow = false;
if (PHP_SAPI === 'cli') $allow = true;
if (isset($_GET['run']) && $_GET['run'] == '1' && isset($_GET['token']) && $_GET['token'] === 'createuser') $allow = true;

if (!$allow) {
  echo "Run via CLI: php create_user_izzudin.php\nOr open with ?run=1&token=createuser\n";
  exit;
}

try {
  $username = 'izzudin';
  $password = '1234';
  $nama_depan = 'Izzudin';
  $nama_belakang = '';
  $email = 'izzudin@example.com';
  $no_telp = '';

  // Check exists
  $stmt = $pdo->prepare('SELECT id FROM user WHERE username = ? LIMIT 1');
  $stmt->execute([$username]);
  if ($stmt->fetch()) {
    echo "User '$username' already exists.\n";
    exit;
  }

  $password_hash = password_hash($password, PASSWORD_DEFAULT);
  $ins = $pdo->prepare('INSERT INTO user (nama_depan, nama_belakang, username, password, email, no_telp) VALUES (?, ?, ?, ?, ?, ?)');
  $ins->execute([$nama_depan, $nama_belakang, $username, $password_hash, $email, $no_telp]);

  echo "Created user '$username' with id: " . $pdo->lastInsertId() . "\n";
} catch (Exception $e) {
  echo "Error: " . $e->getMessage() . "\n";
}

?>
