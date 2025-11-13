-- SQL setup for Asmaraloka Kaharsa (create tables)
-- Run in phpMyAdmin or MySQL CLI: IMPORT or source this file

CREATE DATABASE IF NOT EXISTS `asmaraloka_kaharsadb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `asmaraloka_kaharsadb`;

-- Users table (used by existing API)
CREATE TABLE IF NOT EXISTS `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_depan` VARCHAR(100) DEFAULT NULL,
  `nama_belakang` VARCHAR(100) DEFAULT NULL,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `no_telp` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Paket table
CREATE TABLE IF NOT EXISTS `paket` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(12,2) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pemesanan table
CREATE TABLE IF NOT EXISTS `pemesanan` (
  `id_pemesanan` INT AUTO_INCREMENT PRIMARY KEY,
  `id_user` INT NOT NULL,
  `id_paket` INT DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'pending',
  `total_harga` DECIMAL(12,2) DEFAULT 0,
  `tanggal_pemesanan` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES `user`(id) ON DELETE CASCADE,
  FOREIGN KEY (id_paket) REFERENCES `paket`(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pembayaran table
CREATE TABLE IF NOT EXISTS `pembayaran` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `id_pemesanan` INT NOT NULL,
  `id_admin` INT DEFAULT NULL,
  `metode_pembayaran` VARCHAR(100) DEFAULT NULL,
  `status_pembayaran` VARCHAR(50) DEFAULT 'belum dibayar',
  `total_harga` DECIMAL(12,2) DEFAULT 0,
  `tanggal_pembayaran` DATETIME DEFAULT NULL,
  FOREIGN KEY (id_pemesanan) REFERENCES `pemesanan`(id_pemesanan) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional: create an admin table (not used by current whitelist implementation)
CREATE TABLE IF NOT EXISTS `admin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample paket entries (safe to run multiple times)
INSERT INTO paket (title, description, price)
VALUES
('Paket Silver','Paket pernikahan sederhana',2500000.00),
('Paket Gold','Paket pernikahan lengkap',5000000.00)
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- End of script
