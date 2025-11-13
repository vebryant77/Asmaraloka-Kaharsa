<?php
// api/admin_packages.php
session_start();
require_once __DIR__ . '/db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] !== true) {
  http_response_code(401);
  echo json_encode(['error' => 'Unauthorized']);
  exit;
}

try {
  $method = $_SERVER['REQUEST_METHOD'];

  if ($method === 'GET') {
    if (isset($_GET['id'])) {
      $id = (int)$_GET['id'];
      $stmt = $pdo->prepare('SELECT id, title, description, price, created_at FROM paket WHERE id = ? LIMIT 1');
      $stmt->execute([$id]);
      $pkg = $stmt->fetch();
      echo json_encode(['success' => true, 'package' => $pkg]);
      exit;
    }

    $stmt = $pdo->query('SELECT id, title, description, price, created_at FROM paket ORDER BY id DESC');
    $packages = $stmt->fetchAll();
    echo json_encode(['success' => true, 'packages' => $packages]);
    exit;
  }

  if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $price = $input['price'] ?? 0;
    if (!$title) { http_response_code(400); echo json_encode(['error'=>'title required']); exit; }
    $stmt = $pdo->prepare('INSERT INTO paket (title, description, price, created_at) VALUES (?, ?, ?, NOW())');
    $stmt->execute([$title, $description, $price]);
    echo json_encode(['success'=>true,'package_id'=>$pdo->lastInsertId()]);
    exit;
  }

  if ($method === 'PUT') {
    parse_str(file_get_contents('php://input'), $input);
    $id = (int)$input['id']; if(!$id){http_response_code(400); echo json_encode(['error'=>'id required']); exit;}
    $fields = [];$params = [];
    foreach(['title','description','price'] as $f) {
      if (isset($input[$f])) { $fields[] = "$f = ?"; $params[] = $input[$f]; }
    }
    if (empty($fields)) { echo json_encode(['success'=>true,'message'=>'no changes']); exit; }
    $params[] = $id;
    $sql = 'UPDATE paket SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode(['success'=>true]);
    exit;
  }

  if ($method === 'DELETE') {
    if (!isset($_GET['id'])) { http_response_code(400); echo json_encode(['error'=>'id required']); exit; }
    $id = (int)$_GET['id'];
    $stmt = $pdo->prepare('DELETE FROM paket WHERE id = ?');
    $stmt->execute([$id]);
    echo json_encode(['success'=>true]);
    exit;
  }

  http_response_code(405); echo json_encode(['error'=>'Method not allowed']);
} catch (PDOException $e) {
  // If paket table does not exist, return helpful SQL
  if (stripos($e->getMessage(), 'no such table') !== false || stripos($e->getMessage(), 'doesn\'t exist') !== false) {
    http_response_code(500);
    echo json_encode(['error'=>'Table `paket` not found. Create with SQL: CREATE TABLE paket (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, price DECIMAL(12,2) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)']);
    exit;
  }
  http_response_code(500); echo json_encode(['error'=>'DB error: '.$e->getMessage()]);
}

?>
