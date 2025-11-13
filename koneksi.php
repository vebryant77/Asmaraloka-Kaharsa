<?php
$host = "localhost";       // atau 127.0.0.1
$user = "root";            // username MySQL (default: root)
$pass = "";                // password MySQL (kosong di XAMPP/Laragon)
$db   = "asmaraloka_kaharsadb"; // nama database kamu

// Membuat koneksi
$conn = mysqli_connect($host, $user, $pass, $db);

// Mengecek koneksi
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
// echo "Koneksi berhasil"; // aktifkan untuk testing
?>
