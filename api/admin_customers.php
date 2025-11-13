<?php
// api/admin_customers.php
session_start();
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

// Require admin session
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
  http_response_code(401);
  echo json_encode(['error' => 'Unauthorized']);
  exit;
}

try {
  $method = $_SERVER['REQUEST_METHOD'];

  if ($method === 'GET') {
    // If id provided, return single
    if (isset($_GET['id'])) {
      $id = (int)$_GET['id'];
      $stmt = $pdo->prepare('SELECT id, username, nama_depan, nama_belakang, email, no_telp FROM user WHERE id = ? LIMIT 1');
      $stmt->execute([$id]);
      $user = $stmt->fetch();
      echo json_encode(['success' => true, 'user' => $user]);
      exit;
    }

    // List users
    $stmt = $pdo->query('SELECT id, username, nama_depan, nama_belakang, email, no_telp FROM user ORDER BY id DESC');
    $users = $stmt->fetchAll();
    echo json_encode(['success' => true, 'users' => $users]);
    exit;
  }

  if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $username = trim($input['username'] ?? '');
    $password = $input['password'] ?? '';
    $nama_depan = $input['nama_depan'] ?? '';
    $nama_belakang = $input['nama_belakang'] ?? '';
    $email = $input['email'] ?? '';
    $no_telp = $input['no_telp'] ?? '';

    if (!$username || !$password) {
      http_response_code(400);
      echo json_encode(['error' => 'username and password required']);
      exit;
    }

    // hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare('INSERT INTO user (username, password, nama_depan, nama_belakang, email, no_telp) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$username, $password_hash, $nama_depan, $nama_belakang, $email, $no_telp]);
    echo json_encode(['success' => true, 'user_id' => $pdo->lastInsertId()]);
    exit;
  }

  if ($method === 'PUT') {
    parse_str(file_get_contents('php://input'), $input);
    $id = (int)$input['id'];
    if (!$id) { http_response_code(400); echo json_encode(['error'=>'id required']); exit; }

    $fields = [];
    $params = [];
    foreach (['username','nama_depan','nama_belakang','email','no_telp','password'] as $f) {
      if (isset($input[$f]) && $input[$f] !== '') {
        if ($f === 'password') {
          $fields[] = 'password = ?';
          $params[] = password_hash($input[$f], PASSWORD_DEFAULT);
        } else {
          $fields[] = "$f = ?";
          $params[] = $input[$f];
        }
      }
    }
    if (empty($fields)) { echo json_encode(['success'=>true,'message'=>'no changes']); exit; }
    $params[] = $id;
    $sql = 'UPDATE user SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode(['success' => true]);
    exit;
  }

  if ($method === 'DELETE') {
    if (!isset($_GET['id'])) { http_response_code(400); echo json_encode(['error'=>'id required']); exit; }
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare('DELETE FROM user WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);
    exit;
  }

  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

?>
