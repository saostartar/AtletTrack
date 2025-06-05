-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2025 at 12:14 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_atlettrack`
--

-- --------------------------------------------------------

--
-- Table structure for table `activitylogs`
--

CREATE TABLE `activitylogs` (
  `id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `adminId` int(11) DEFAULT NULL,
  `koordinatorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activitylogs`
--

INSERT INTO `activitylogs` (`id`, `action`, `timestamp`, `createdAt`, `updatedAt`, `adminId`, `koordinatorId`) VALUES
(1, 'Added Koordinator: Rolland@gmail.com', '2024-12-16 21:18:22', '2024-12-16 21:18:22', '2024-12-16 21:18:22', 1, NULL),
(2, 'Added Koordinator: Herry@gmail.com', '2024-12-16 21:18:42', '2024-12-16 21:18:42', '2024-12-16 21:18:42', 1, NULL),
(3, 'Added Koordinator: Jeremy@gmail.com', '2024-12-16 21:19:07', '2024-12-16 21:19:07', '2024-12-16 21:19:07', 1, NULL),
(4, 'Deleted Koordinator: Jeremy@gmail.com', '2024-12-16 21:21:25', '2024-12-16 21:21:25', '2024-12-16 21:21:25', 1, NULL),
(5, 'Deleted Koordinator: Herry@gmail.com', '2024-12-16 21:21:26', '2024-12-16 21:21:26', '2024-12-16 21:21:26', 1, NULL),
(6, 'Added Koordinator: Michael@gmail.com', '2024-12-17 06:22:01', '2024-12-17 06:22:01', '2024-12-17 06:22:01', 1, NULL),
(7, 'Menambahkan Evaluasi untuk Atlet: Joaquin Tumuwo', '2024-12-17 06:30:52', '2024-12-17 06:30:52', '2024-12-17 06:30:52', NULL, 1),
(8, 'Menambahkan katalog latihan baru: Dribble Stamina Boost', '2025-01-05 19:03:41', '2025-01-05 19:03:41', '2025-01-05 19:03:41', NULL, 1),
(9, 'Menambahkan katalog latihan baru: Dribble Stamina Boost', '2025-01-05 19:53:19', '2025-01-05 19:53:19', '2025-01-05 19:53:19', NULL, 1),
(10, 'Mengupdate katalog latihan: Dribble Stamina Boost', '2025-01-05 20:02:17', '2025-01-05 20:02:17', '2025-01-05 20:02:17', NULL, 1),
(11, 'Mengupdate katalog latihan: Dribble Stamina Boost', '2025-01-05 20:03:11', '2025-01-05 20:03:11', '2025-01-05 20:03:11', NULL, 1),
(12, 'Menambahkan opsi latihan baru: Zig-Zag Dribble ke katalog Dribble Stamina Boost', '2025-01-05 20:10:23', '2025-01-05 20:10:23', '2025-01-05 20:10:23', NULL, 1),
(13, 'Menambahkan opsi latihan baru: Sprint Dribble Challenge ke katalog Dribble Stamina Boost', '2025-01-05 20:40:16', '2025-01-05 20:40:16', '2025-01-05 20:40:16', NULL, 1),
(14, 'Menambahkan katalog latihan baru: Lari', '2025-01-14 06:58:46', '2025-01-14 06:58:46', '2025-01-14 06:58:46', NULL, 1),
(15, 'Menambahkan opsi latihan baru: lari zigzag ke katalog Lari', '2025-01-14 06:59:43', '2025-01-14 06:59:43', '2025-01-14 06:59:43', NULL, 1),
(16, 'Menambahkan katalog latihan baru: Shooting', '2025-01-14 07:04:56', '2025-01-14 07:04:56', '2025-01-14 07:04:56', NULL, 1),
(17, 'Memulai latihan baru: Dribble Stamina Boost', '2025-01-14 10:46:31', '2025-01-14 10:46:31', '2025-01-14 10:46:31', NULL, NULL),
(18, 'Memulai latihan baru: Dribble Stamina Boost', '2025-01-14 10:46:31', '2025-01-14 10:46:31', '2025-01-14 10:46:31', NULL, NULL),
(19, 'Memulai latihan baru: Dribble Stamina Boost', '2025-01-14 14:17:47', '2025-01-14 14:17:47', '2025-01-14 14:17:47', NULL, NULL),
(20, 'Memulai latihan baru: Dribble Stamina Boost', '2025-01-14 14:17:47', '2025-01-14 14:17:47', '2025-01-14 14:17:47', NULL, NULL),
(21, 'Menambahkan evaluasi KETAHANAN untuk latihan ID: 2', '2025-01-14 14:20:41', '2025-01-14 14:20:41', '2025-01-14 14:20:41', NULL, 1),
(22, 'Menambahkan katalog latihan baru: Sprint Interval (KETAHANAN)', '2025-01-14 15:20:53', '2025-01-14 15:20:53', '2025-01-14 15:20:53', NULL, 1),
(23, 'Menambahkan opsi latihan baru: Sprint Interval 30-30 ke katalog Sprint Interval', '2025-01-14 15:22:29', '2025-01-14 15:22:29', '2025-01-14 15:22:29', NULL, 1),
(24, 'Menambahkan opsi latihan baru: Sprint Interval 45-15 ke katalog Sprint Interval', '2025-01-14 15:22:57', '2025-01-14 15:22:57', '2025-01-14 15:22:57', NULL, 1),
(25, 'Memulai latihan baru: Sprint Interval', '2025-01-14 15:24:46', '2025-01-14 15:24:46', '2025-01-14 15:24:46', NULL, NULL),
(26, 'Memulai latihan baru: Sprint Interval', '2025-01-14 15:24:46', '2025-01-14 15:24:46', '2025-01-14 15:24:46', NULL, NULL),
(27, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 15:35:49', '2025-01-14 15:35:49', '2025-01-14 15:35:49', NULL, 1),
(28, 'Menghapus evaluasi untuk Sprint Interval', '2025-01-14 15:36:00', '2025-01-14 15:36:00', '2025-01-14 15:36:00', NULL, 1),
(29, 'Memulai latihan baru: Sprint Interval', '2025-01-14 16:52:01', '2025-01-14 16:52:01', '2025-01-14 16:52:01', NULL, NULL),
(30, 'Memulai latihan baru: Sprint Interval', '2025-01-14 16:52:01', '2025-01-14 16:52:01', '2025-01-14 16:52:01', NULL, NULL),
(31, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 16:52:47', '2025-01-14 16:52:47', '2025-01-14 16:52:47', NULL, 1),
(32, 'Memulai latihan baru: Sprint Interval', '2025-01-14 16:53:52', '2025-01-14 16:53:52', '2025-01-14 16:53:52', NULL, NULL),
(33, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 17:12:16', '2025-01-14 17:12:16', '2025-01-14 17:12:16', NULL, 1),
(34, 'Memulai latihan baru: Sprint Interval', '2025-01-14 17:13:21', '2025-01-14 17:13:21', '2025-01-14 17:13:21', NULL, NULL),
(35, 'Memulai latihan baru: Sprint Interval', '2025-01-14 17:13:21', '2025-01-14 17:13:21', '2025-01-14 17:13:21', NULL, NULL),
(36, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 17:13:56', '2025-01-14 17:13:56', '2025-01-14 17:13:56', NULL, 1),
(37, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 18:39:55', '2025-01-14 18:39:55', '2025-01-14 18:39:55', NULL, 1),
(38, 'Memulai latihan baru: Sprint Interval', '2025-01-14 19:04:26', '2025-01-14 19:04:26', '2025-01-14 19:04:26', NULL, NULL),
(39, 'Memulai latihan baru: Sprint Interval', '2025-01-14 19:04:26', '2025-01-14 19:04:26', '2025-01-14 19:04:26', NULL, NULL),
(40, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 19:05:22', '2025-01-14 19:05:22', '2025-01-14 19:05:22', NULL, 1),
(41, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 19:22:26', '2025-01-14 19:22:26', '2025-01-14 19:22:26', NULL, 1),
(42, 'Menghapus evaluasi untuk Sprint Interval', '2025-01-14 19:35:07', '2025-01-14 19:35:07', '2025-01-14 19:35:07', NULL, 1),
(43, 'Menghapus evaluasi untuk Sprint Interval', '2025-01-14 19:35:11', '2025-01-14 19:35:11', '2025-01-14 19:35:11', NULL, 1),
(44, 'Memulai latihan baru: Sprint Interval', '2025-01-14 20:08:02', '2025-01-14 20:08:02', '2025-01-14 20:08:02', NULL, NULL),
(45, 'Memulai latihan baru: Sprint Interval', '2025-01-14 20:08:02', '2025-01-14 20:08:02', '2025-01-14 20:08:02', NULL, NULL),
(46, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 20:08:36', '2025-01-14 20:08:36', '2025-01-14 20:08:36', NULL, 1),
(47, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 20:12:54', '2025-01-14 20:12:54', '2025-01-14 20:12:54', NULL, 1),
(48, 'Memulai latihan baru: Sprint Interval', '2025-01-14 20:14:50', '2025-01-14 20:14:50', '2025-01-14 20:14:50', NULL, NULL),
(49, 'Memulai latihan baru: Sprint Interval', '2025-01-14 20:14:50', '2025-01-14 20:14:50', '2025-01-14 20:14:50', NULL, NULL),
(50, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 20:15:42', '2025-01-14 20:15:42', '2025-01-14 20:15:42', NULL, 1),
(51, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 20:15:47', '2025-01-14 20:15:47', '2025-01-14 20:15:47', NULL, 1),
(52, 'Memulai latihan baru: Sprint Interval', '2025-01-14 20:27:42', '2025-01-14 20:27:42', '2025-01-14 20:27:42', NULL, NULL),
(53, 'Memulai latihan baru: Sprint Interval', '2025-01-14 20:27:42', '2025-01-14 20:27:42', '2025-01-14 20:27:42', NULL, NULL),
(54, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 20:28:28', '2025-01-14 20:28:28', '2025-01-14 20:28:28', NULL, 1),
(55, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 20:44:06', '2025-01-14 20:44:06', '2025-01-14 20:44:06', NULL, 1),
(56, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-01-14 20:44:09', '2025-01-14 20:44:09', '2025-01-14 20:44:09', NULL, 1),
(57, 'Menambahkan katalog latihan baru: Push-Up Variasi (KEKUATAN)', '2025-01-15 13:10:10', '2025-01-15 13:10:10', '2025-01-15 13:10:10', NULL, 1),
(58, 'Mengupdate katalog latihan: Dribbling dengan Kecepatan Tinggi', '2025-01-15 13:11:33', '2025-01-15 13:11:33', '2025-01-15 13:11:33', NULL, 1),
(59, 'Menambahkan opsi latihan baru: Dribbling Sprint Lurus ke katalog Dribbling dengan Kecepatan Tinggi', '2025-01-15 13:13:14', '2025-01-15 13:13:14', '2025-01-15 13:13:14', NULL, 1),
(60, 'Menambahkan opsi latihan baru: Dribbling Zig-Zag Kecepatan Tinggi ke katalog Dribbling dengan Kecepatan Tinggi', '2025-01-15 13:13:44', '2025-01-15 13:13:44', '2025-01-15 13:13:44', NULL, 1),
(61, 'Menambahkan opsi latihan baru: Dribbling Kecepatan dengan Perubahan Arah Cepat ke katalog Dribbling dengan Kecepatan Tinggi', '2025-01-15 13:15:32', '2025-01-15 13:15:32', '2025-01-15 13:15:32', NULL, 1),
(62, 'Memulai latihan baru: Dribbling dengan Kecepatan Tinggi', '2025-01-15 13:17:39', '2025-01-15 13:17:39', '2025-01-15 13:17:39', NULL, NULL),
(63, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-01-15 13:18:34', '2025-01-15 13:18:34', '2025-01-15 13:18:34', NULL, 1),
(64, 'Memulai latihan baru: Dribbling dengan Kecepatan Tinggi', '2025-01-16 05:29:49', '2025-01-16 05:29:49', '2025-01-16 05:29:49', NULL, NULL),
(65, 'Memulai latihan baru: Dribbling dengan Kecepatan Tinggi', '2025-01-16 05:29:49', '2025-01-16 05:29:49', '2025-01-16 05:29:49', NULL, NULL),
(66, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-01-16 05:34:32', '2025-01-16 05:34:32', '2025-01-16 05:34:32', NULL, 1),
(67, 'Menambahkan katalog latihan baru: Passing (KOORDINASI)', '2025-01-16 05:38:06', '2025-01-16 05:38:06', '2025-01-16 05:38:06', NULL, 1),
(68, 'Menambahkan opsi latihan baru: Passing dada ke katalog Passing', '2025-01-16 05:41:20', '2025-01-16 05:41:20', '2025-01-16 05:41:20', NULL, 1),
(69, 'Memulai latihan baru: Passing', '2025-01-16 05:44:34', '2025-01-16 05:44:34', '2025-01-16 05:44:34', NULL, NULL),
(70, 'Memulai latihan baru: Passing', '2025-01-16 05:44:34', '2025-01-16 05:44:34', '2025-01-16 05:44:34', NULL, NULL),
(71, 'Menambahkan evaluasi untuk latihan Passing', '2025-01-16 05:47:08', '2025-01-16 05:47:08', '2025-01-16 05:47:08', NULL, 1),
(72, 'Memulai latihan baru: Passing', '2025-01-16 06:43:29', '2025-01-16 06:43:29', '2025-01-16 06:43:29', NULL, NULL),
(73, 'Memulai latihan baru: Passing', '2025-01-16 06:43:29', '2025-01-16 06:43:29', '2025-01-16 06:43:29', NULL, NULL),
(74, 'Menambahkan evaluasi untuk latihan Passing', '2025-01-16 06:45:32', '2025-01-16 06:45:32', '2025-01-16 06:45:32', NULL, 1),
(75, 'Menambahkan evaluasi untuk latihan Passing', '2025-01-21 08:17:39', '2025-01-21 08:17:39', '2025-01-21 08:17:39', NULL, 1),
(76, 'Memulai latihan baru: Sprint Interval', '2025-04-18 06:29:28', '2025-04-18 06:29:28', '2025-04-18 06:29:28', NULL, NULL),
(77, 'Memulai latihan baru: Sprint Interval', '2025-04-18 06:29:28', '2025-04-18 06:29:28', '2025-04-18 06:29:28', NULL, NULL),
(78, 'Updated Koordinator: Michael@gmail.com', '2025-05-17 08:56:23', '2025-05-17 08:56:23', '2025-05-17 08:56:23', 1, NULL),
(79, 'Menghapus atlet: Chris ', '2025-05-23 19:34:30', '2025-05-23 19:34:30', '2025-05-23 19:34:30', NULL, 1),
(80, 'Menghapus atlet: Joaquin Tumuwo', '2025-05-23 19:42:00', '2025-05-23 19:42:00', '2025-05-23 19:42:00', NULL, 1),
(81, 'Menghapus atlet: Joaquin Tumuwo', '2025-05-23 19:42:09', '2025-05-23 19:42:09', '2025-05-23 19:42:09', NULL, 1),
(82, 'Menghapus atlet: Joaquin Tumuwo', '2025-05-23 19:44:08', '2025-05-23 19:44:08', '2025-05-23 19:44:08', NULL, 1),
(83, 'Menghapus atlet: Joaquin Tumuwo', '2025-05-23 19:46:17', '2025-05-23 19:46:17', '2025-05-23 19:46:17', NULL, 1),
(84, 'Menambahkan atlet baru: Haezargreaves Shaq Bigael Joaquin Tumuwo', '2025-05-23 19:47:02', '2025-05-23 19:47:02', '2025-05-23 19:47:02', NULL, 1),
(85, 'Menambahkan atlet baru: Christ Ellia Yohannes Sembel', '2025-05-23 19:47:37', '2025-05-23 19:47:37', '2025-05-23 19:47:37', NULL, 1),
(86, 'Mengupdate data atlet: Christ Ellia Yohannes Sembel', '2025-05-23 19:47:43', '2025-05-23 19:47:43', '2025-05-23 19:47:43', NULL, 1),
(87, 'Menambahkan atlet baru: Jason Edward Tjioe Sidabutar', '2025-05-23 19:48:18', '2025-05-23 19:48:18', '2025-05-23 19:48:18', NULL, 1),
(88, 'Menambahkan atlet baru: Karl Patrick Utiarahman Gloria', '2025-05-23 19:50:09', '2025-05-23 19:50:09', '2025-05-23 19:50:09', NULL, 1),
(89, 'Mengupdate data atlet: Claudio Yeheskiel Johanis Rarumengkey', '2025-05-23 19:50:32', '2025-05-23 19:50:32', '2025-05-23 19:50:32', NULL, 1),
(90, 'Mengupdate data atlet: Reinhard Oktonuel Titing', '2025-05-23 19:50:56', '2025-05-23 19:50:56', '2025-05-23 19:50:56', NULL, 1),
(91, 'Menambahkan atlet baru: Christyanto Imanuel Machmoed', '2025-05-23 19:51:28', '2025-05-23 19:51:28', '2025-05-23 19:51:28', NULL, 1),
(92, 'Menambahkan atlet baru: Sergyo Stevanus Antonio Susilo Mangundap', '2025-05-23 19:51:58', '2025-05-23 19:51:58', '2025-05-23 19:51:58', NULL, 1),
(93, 'Menambahkan atlet baru: Toraya A. Pontuluran', '2025-05-23 19:52:17', '2025-05-23 19:52:17', '2025-05-23 19:52:17', NULL, 1),
(94, 'Menambahkan katalog latihan baru: Dribbling Statis (KOORDINASI)', '2025-05-23 20:06:43', '2025-05-23 20:06:43', '2025-05-23 20:06:43', NULL, 1),
(95, 'Menambahkan opsi latihan baru: Dribble Tangan Kanan ke katalog Dribbling Statis', '2025-05-23 20:07:30', '2025-05-23 20:07:30', '2025-05-23 20:07:30', NULL, 1),
(96, 'Menambahkan opsi latihan baru: Dribble Tangan Kiri ke katalog Dribbling Statis', '2025-05-23 20:08:01', '2025-05-23 20:08:01', '2025-05-23 20:08:01', NULL, 1),
(97, 'Menambahkan opsi latihan baru: Dribble Bergantian ke katalog Dribbling Statis', '2025-05-23 20:08:29', '2025-05-23 20:08:29', '2025-05-23 20:08:29', NULL, 1),
(98, 'Menambahkan katalog latihan baru: Push-up Modifikasi (KEKUATAN)', '2025-05-23 20:09:50', '2025-05-23 20:09:50', '2025-05-23 20:09:50', NULL, 1),
(99, 'Menghapus katalog latihan: Dribbling Statis', '2025-05-23 20:10:36', '2025-05-23 20:10:36', '2025-05-23 20:10:36', NULL, 1),
(100, 'Menghapus katalog latihan: Push-up Modifikasi', '2025-05-23 20:10:39', '2025-05-23 20:10:39', '2025-05-23 20:10:39', NULL, 1),
(101, 'Menambahkan katalog latihan baru: Sprint Garis Lapangan (KECEPATAN)', '2025-05-23 20:15:16', '2025-05-23 20:15:16', '2025-05-23 20:15:16', NULL, 1),
(102, 'Menambahkan opsi latihan baru: Set Standar ke katalog Sprint Garis Lapangan', '2025-05-23 20:16:12', '2025-05-23 20:16:12', '2025-05-23 20:16:12', NULL, 1),
(103, 'Menambahkan opsi latihan baru: Interval dengan Istirahat Tidak Penuh ke katalog Sprint Garis Lapangan', '2025-05-23 20:16:44', '2025-05-23 20:16:44', '2025-05-23 20:16:44', NULL, 1),
(104, 'Menambahkan katalog latihan baru: Dribbling Zig-Zag Melewati Cone (KELINCAHAN)', '2025-05-23 20:17:37', '2025-05-23 20:17:37', '2025-05-23 20:17:37', NULL, 1),
(105, 'Menambahkan opsi latihan baru: Fokus Kontrol dan Pergantian Tangan ke katalog Dribbling Zig-Zag Melewati Cone', '2025-05-23 20:18:20', '2025-05-23 20:18:20', '2025-05-23 20:18:20', NULL, 1),
(106, 'Menambahkan opsi latihan baru: Kelincahan dengan Tekanan Waktu ke katalog Dribbling Zig-Zag Melewati Cone', '2025-05-23 20:18:48', '2025-05-23 20:18:48', '2025-05-23 20:18:48', NULL, 1),
(107, 'Memulai latihan baru: Dribbling Zig-Zag Melewati Cone', '2025-05-23 20:19:55', '2025-05-23 20:19:55', '2025-05-23 20:19:55', NULL, NULL),
(108, 'Memulai latihan baru: Dribbling Zig-Zag Melewati Cone', '2025-05-23 20:19:55', '2025-05-23 20:19:55', '2025-05-23 20:19:55', NULL, NULL),
(109, 'Memulai latihan baru: Sprint Garis Lapangan', '2025-05-23 20:50:57', '2025-05-23 20:50:57', '2025-05-23 20:50:57', NULL, NULL),
(110, 'Memulai latihan baru: Sprint Garis Lapangan', '2025-05-23 20:50:57', '2025-05-23 20:50:57', '2025-05-23 20:50:57', NULL, NULL),
(111, 'Memulai latihan baru: Passing', '2025-05-23 21:16:05', '2025-05-23 21:16:05', '2025-05-23 21:16:05', NULL, NULL),
(112, 'Memulai latihan baru: Passing', '2025-05-23 21:16:05', '2025-05-23 21:16:05', '2025-05-23 21:16:05', NULL, NULL),
(113, 'Memulai latihan baru: Dribbling dengan Kecepatan Tinggi', '2025-05-23 21:27:37', '2025-05-23 21:27:37', '2025-05-23 21:27:37', NULL, NULL),
(114, 'Memulai latihan baru: Sprint Interval', '2025-05-23 21:29:26', '2025-05-23 21:29:26', '2025-05-23 21:29:26', NULL, NULL),
(115, 'Memulai latihan baru: Sprint Interval', '2025-05-23 21:29:26', '2025-05-23 21:29:26', '2025-05-23 21:29:26', NULL, NULL),
(116, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-05-23 21:31:03', '2025-05-23 21:31:03', '2025-05-23 21:31:03', NULL, 1),
(117, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-23 21:31:14', '2025-05-23 21:31:14', '2025-05-23 21:31:14', NULL, 1),
(118, 'Menambahkan evaluasi untuk latihan Passing', '2025-05-23 21:31:18', '2025-05-23 21:31:18', '2025-05-23 21:31:18', NULL, 1),
(119, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-23 21:31:24', '2025-05-23 21:31:24', '2025-05-23 21:31:24', NULL, 1),
(120, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-23 21:31:28', '2025-05-23 21:31:28', '2025-05-23 21:31:28', NULL, 1),
(121, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-05-23 21:31:33', '2025-05-23 21:31:33', '2025-05-23 21:31:33', NULL, 1),
(122, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-23 21:31:37', '2025-05-23 21:31:37', '2025-05-23 21:31:37', NULL, 1),
(123, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-05-23 21:31:50', '2025-05-23 21:31:50', '2025-05-23 21:31:50', NULL, 1),
(124, 'Menambahkan evaluasi untuk latihan Passing', '2025-05-23 21:32:11', '2025-05-23 21:32:11', '2025-05-23 21:32:11', NULL, 1),
(125, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-05-23 21:32:19', '2025-05-23 21:32:19', '2025-05-23 21:32:19', NULL, 1),
(126, 'Menambahkan evaluasi untuk latihan Sprint Interval', '2025-05-23 21:32:28', '2025-05-23 21:32:28', '2025-05-23 21:32:28', NULL, 1),
(127, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-23 21:32:46', '2025-05-23 21:32:46', '2025-05-23 21:32:46', NULL, 1),
(128, 'Menghapus evaluasi untuk Dribbling Zig-Zag Melewati Cone', '2025-05-23 21:33:28', '2025-05-23 21:33:28', '2025-05-23 21:33:28', NULL, 1),
(129, 'Menghapus evaluasi untuk Sprint Interval', '2025-05-23 21:33:31', '2025-05-23 21:33:31', '2025-05-23 21:33:31', NULL, 1),
(130, 'Menghapus evaluasi untuk Sprint Interval', '2025-05-23 21:33:32', '2025-05-23 21:33:32', '2025-05-23 21:33:32', NULL, 1),
(131, 'Menghapus evaluasi untuk Passing', '2025-05-23 21:33:34', '2025-05-23 21:33:34', '2025-05-23 21:33:34', NULL, 1),
(132, 'Menghapus evaluasi untuk Sprint Interval', '2025-05-23 21:33:36', '2025-05-23 21:33:36', '2025-05-23 21:33:36', NULL, 1),
(133, 'Memulai latihan baru: Dribbling Zig-Zag Melewati Cone', '2025-05-23 21:35:11', '2025-05-23 21:35:11', '2025-05-23 21:35:11', NULL, NULL),
(134, 'Memulai latihan baru: Sprint Garis Lapangan', '2025-05-23 21:35:45', '2025-05-23 21:35:45', '2025-05-23 21:35:45', NULL, NULL),
(135, 'Memulai latihan baru: Passing', '2025-05-23 21:36:14', '2025-05-23 21:36:14', '2025-05-23 21:36:14', NULL, NULL),
(136, 'Memulai latihan baru: Passing', '2025-05-23 21:36:14', '2025-05-23 21:36:14', '2025-05-23 21:36:14', NULL, NULL),
(137, 'Menghapus katalog latihan: Passing', '2025-05-23 21:41:20', '2025-05-23 21:41:20', '2025-05-23 21:41:20', NULL, 1),
(138, 'Menghapus katalog latihan: Sprint Interval', '2025-05-23 21:41:38', '2025-05-23 21:41:38', '2025-05-23 21:41:38', NULL, 1),
(139, 'Menambahkan katalog latihan baru: Lari Keliling Lapangan Penuh (KETAHANAN)', '2025-05-23 21:42:16', '2025-05-23 21:42:16', '2025-05-23 21:42:16', NULL, 1),
(140, 'Menambahkan opsi latihan baru: Interval Pendek ke katalog Lari Keliling Lapangan Penuh', '2025-05-23 21:42:55', '2025-05-23 21:42:55', '2025-05-23 21:42:55', NULL, 1),
(141, 'Menambahkan opsi latihan baru: Ketahanan Berkelanjutan ke katalog Lari Keliling Lapangan Penuh', '2025-05-23 21:43:26', '2025-05-23 21:43:26', '2025-05-23 21:43:26', NULL, 1),
(142, 'Menambahkan katalog latihan baru: Lempar Tangkap Bola ke Tembok (KOORDINASI)', '2025-05-23 21:44:51', '2025-05-23 21:44:51', '2025-05-23 21:44:51', NULL, 1),
(143, 'Menambahkan opsi latihan baru: Dasar Satu Tangan dan Dua Tangan ke katalog Lempar Tangkap Bola ke Tembok', '2025-05-23 21:45:39', '2025-05-23 21:45:39', '2025-05-23 21:45:39', NULL, 1),
(144, 'Menambahkan opsi latihan baru: Reaksi Cepat dan Variasi Lemparan ke katalog Lempar Tangkap Bola ke Tembok', '2025-05-23 21:46:13', '2025-05-23 21:46:13', '2025-05-23 21:46:13', NULL, 1),
(145, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok', '2025-05-23 21:51:01', '2025-05-23 21:51:01', '2025-05-23 21:51:01', NULL, NULL),
(146, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-23 21:52:08', '2025-05-23 21:52:08', '2025-05-23 21:52:08', NULL, 1),
(147, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:01:13', '2025-05-23 22:01:13', '2025-05-23 22:01:13', NULL, NULL),
(148, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:01:13', '2025-05-23 22:01:13', '2025-05-23 22:01:13', NULL, NULL),
(149, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-23 22:03:07', '2025-05-23 22:03:07', '2025-05-23 22:03:07', NULL, 1),
(150, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:03:58', '2025-05-23 22:03:58', '2025-05-23 22:03:58', NULL, NULL),
(151, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:03:58', '2025-05-23 22:03:58', '2025-05-23 22:03:58', NULL, NULL),
(152, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:13:30', '2025-05-23 22:13:30', '2025-05-23 22:13:30', NULL, NULL),
(153, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:13:30', '2025-05-23 22:13:30', '2025-05-23 22:13:30', NULL, NULL),
(154, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-23 22:16:19', '2025-05-23 22:16:19', '2025-05-23 22:16:19', NULL, 1),
(155, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-23 22:16:23', '2025-05-23 22:16:23', '2025-05-23 22:16:23', NULL, 1),
(156, 'Memulai latihan baru: Sprint Garis Lapangan', '2025-05-23 22:17:00', '2025-05-23 22:17:00', '2025-05-23 22:17:00', NULL, NULL),
(157, 'Memulai latihan baru: Sprint Garis Lapangan', '2025-05-23 22:17:00', '2025-05-23 22:17:00', '2025-05-23 22:17:00', NULL, NULL),
(158, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:21:24', '2025-05-23 22:21:24', '2025-05-23 22:21:24', NULL, NULL),
(159, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:21:24', '2025-05-23 22:21:24', '2025-05-23 22:21:24', NULL, NULL),
(160, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:33:58', '2025-05-23 22:33:58', '2025-05-23 22:33:58', NULL, NULL),
(161, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:33:58', '2025-05-23 22:33:58', '2025-05-23 22:33:58', NULL, NULL),
(162, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok', '2025-05-23 22:36:05', '2025-05-23 22:36:05', '2025-05-23 22:36:05', NULL, NULL),
(163, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok', '2025-05-23 22:36:05', '2025-05-23 22:36:05', '2025-05-23 22:36:05', NULL, NULL),
(164, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:46:54', '2025-05-23 22:46:54', '2025-05-23 22:46:54', NULL, NULL),
(165, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:46:54', '2025-05-23 22:46:54', '2025-05-23 22:46:54', NULL, NULL),
(166, 'Memulai latihan baru: Dribbling dengan Kecepatan Tinggi', '2025-05-23 22:47:52', '2025-05-23 22:47:52', '2025-05-23 22:47:52', NULL, NULL),
(167, 'Memulai latihan baru: Dribbling dengan Kecepatan Tinggi', '2025-05-23 22:47:52', '2025-05-23 22:47:52', '2025-05-23 22:47:52', NULL, NULL),
(168, 'Memulai latihan baru: Dribbling dengan Kecepatan Tinggi', '2025-05-23 22:48:20', '2025-05-23 22:48:20', '2025-05-23 22:48:20', NULL, NULL),
(169, 'Memulai latihan baru: Dribbling dengan Kecepatan Tinggi', '2025-05-23 22:48:20', '2025-05-23 22:48:20', '2025-05-23 22:48:20', NULL, NULL),
(170, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:55:37', '2025-05-23 22:55:37', '2025-05-23 22:55:37', NULL, NULL),
(171, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 22:55:37', '2025-05-23 22:55:37', '2025-05-23 22:55:37', NULL, NULL),
(172, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 23:00:27', '2025-05-23 23:00:27', '2025-05-23 23:00:27', NULL, NULL),
(173, 'Memulai latihan baru: Lari Keliling Lapangan Penuh', '2025-05-23 23:00:27', '2025-05-23 23:00:27', '2025-05-23 23:00:27', NULL, NULL),
(174, 'Memulai latihan baru: Lari Keliling Lapangan Penuh oleh atlet Fernando Fransco Manangsang', '2025-05-23 23:07:35', '2025-05-23 23:07:35', '2025-05-23 23:07:35', NULL, 1),
(175, 'Memulai latihan baru: Lari Keliling Lapangan Penuh oleh atlet Fernando Fransco Manangsang', '2025-05-23 23:07:35', '2025-05-23 23:07:35', '2025-05-23 23:07:35', NULL, 1),
(176, 'Memulai latihan baru: Lari Keliling Lapangan Penuh oleh atlet Fernando Fransco Manangsang', '2025-05-23 23:08:05', '2025-05-23 23:08:05', '2025-05-23 23:08:05', NULL, 1),
(177, 'Memulai latihan baru: Lari Keliling Lapangan Penuh oleh atlet Fernando Fransco Manangsang', '2025-05-23 23:08:05', '2025-05-23 23:08:05', '2025-05-23 23:08:05', NULL, 1),
(178, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok oleh atlet Fernando Fransco Manangsang', '2025-05-23 23:10:30', '2025-05-23 23:10:30', '2025-05-23 23:10:30', NULL, 1),
(179, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok oleh atlet Fernando Fransco Manangsang', '2025-05-23 23:10:30', '2025-05-23 23:10:30', '2025-05-23 23:10:30', NULL, 1),
(180, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok', '2025-05-23 23:13:24', '2025-05-23 23:13:24', '2025-05-23 23:13:24', NULL, NULL),
(181, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok', '2025-05-23 23:13:24', '2025-05-23 23:13:24', '2025-05-23 23:13:24', NULL, NULL),
(182, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok', '2025-05-23 23:14:37', '2025-05-23 23:14:37', '2025-05-23 23:14:37', NULL, NULL),
(183, 'Memulai latihan baru: Lempar Tangkap Bola ke Tembok', '2025-05-23 23:14:37', '2025-05-23 23:14:37', '2025-05-23 23:14:37', NULL, NULL),
(184, 'Menghapus opsi latihan: Dribbling Kecepatan dengan Perubahan Arah Cepat', '2025-05-23 23:30:48', '2025-05-23 23:30:48', '2025-05-23 23:30:48', NULL, 1),
(185, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-23 23:31:07', '2025-05-23 23:31:07', '2025-05-23 23:31:07', NULL, 1),
(186, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-23 23:31:19', '2025-05-23 23:31:19', '2025-05-23 23:31:19', NULL, 1),
(187, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-23 23:31:24', '2025-05-23 23:31:24', '2025-05-23 23:31:24', NULL, 1),
(188, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:11:57', '2025-05-24 07:11:57', '2025-05-24 07:11:57', NULL, 1),
(189, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:12:02', '2025-05-24 07:12:02', '2025-05-24 07:12:02', NULL, 1),
(190, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:12:08', '2025-05-24 07:12:08', '2025-05-24 07:12:08', NULL, 1),
(191, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:12:13', '2025-05-24 07:12:13', '2025-05-24 07:12:13', NULL, 1),
(192, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-24 07:14:57', '2025-05-24 07:14:57', '2025-05-24 07:14:57', NULL, 1),
(193, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:15:01', '2025-05-24 07:15:01', '2025-05-24 07:15:01', NULL, 1),
(194, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:15:05', '2025-05-24 07:15:05', '2025-05-24 07:15:05', NULL, 1),
(195, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:15:09', '2025-05-24 07:15:09', '2025-05-24 07:15:09', NULL, 1),
(196, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:15:13', '2025-05-24 07:15:13', '2025-05-24 07:15:13', NULL, 1),
(197, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-24 07:17:29', '2025-05-24 07:17:29', '2025-05-24 07:17:29', NULL, 1),
(198, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:17:33', '2025-05-24 07:17:33', '2025-05-24 07:17:33', NULL, 1),
(199, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:17:36', '2025-05-24 07:17:36', '2025-05-24 07:17:36', NULL, 1),
(200, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:17:40', '2025-05-24 07:17:40', '2025-05-24 07:17:40', NULL, 1),
(201, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:18:02', '2025-05-24 07:18:02', '2025-05-24 07:18:02', NULL, 1),
(202, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-24 07:23:03', '2025-05-24 07:23:03', '2025-05-24 07:23:03', NULL, 1),
(203, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:23:07', '2025-05-24 07:23:07', '2025-05-24 07:23:07', NULL, 1),
(204, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:23:10', '2025-05-24 07:23:10', '2025-05-24 07:23:10', NULL, 1),
(205, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:23:13', '2025-05-24 07:23:13', '2025-05-24 07:23:13', NULL, 1),
(206, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:23:16', '2025-05-24 07:23:16', '2025-05-24 07:23:16', NULL, 1),
(207, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-24 07:25:21', '2025-05-24 07:25:21', '2025-05-24 07:25:21', NULL, 1),
(208, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:25:25', '2025-05-24 07:25:25', '2025-05-24 07:25:25', NULL, 1),
(209, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:25:28', '2025-05-24 07:25:28', '2025-05-24 07:25:28', NULL, 1),
(210, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:25:32', '2025-05-24 07:25:32', '2025-05-24 07:25:32', NULL, 1),
(211, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:25:37', '2025-05-24 07:25:37', '2025-05-24 07:25:37', NULL, 1),
(212, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:25:41', '2025-05-24 07:25:41', '2025-05-24 07:25:41', NULL, 1),
(213, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-24 07:28:37', '2025-05-24 07:28:37', '2025-05-24 07:28:37', NULL, 1),
(214, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:28:40', '2025-05-24 07:28:40', '2025-05-24 07:28:40', NULL, 1),
(215, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:28:44', '2025-05-24 07:28:44', '2025-05-24 07:28:44', NULL, 1),
(216, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:28:47', '2025-05-24 07:28:47', '2025-05-24 07:28:47', NULL, 1),
(217, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:28:51', '2025-05-24 07:28:51', '2025-05-24 07:28:51', NULL, 1),
(218, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-24 07:30:48', '2025-05-24 07:30:48', '2025-05-24 07:30:48', NULL, 1),
(219, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:30:52', '2025-05-24 07:30:52', '2025-05-24 07:30:52', NULL, 1),
(220, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:30:55', '2025-05-24 07:30:55', '2025-05-24 07:30:55', NULL, 1),
(221, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:30:58', '2025-05-24 07:30:58', '2025-05-24 07:30:58', NULL, 1),
(222, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:31:05', '2025-05-24 07:31:05', '2025-05-24 07:31:05', NULL, 1),
(223, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-24 07:32:59', '2025-05-24 07:32:59', '2025-05-24 07:32:59', NULL, 1),
(224, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:33:03', '2025-05-24 07:33:03', '2025-05-24 07:33:03', NULL, 1),
(225, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:33:07', '2025-05-24 07:33:07', '2025-05-24 07:33:07', NULL, 1),
(226, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:33:10', '2025-05-24 07:33:10', '2025-05-24 07:33:10', NULL, 1),
(227, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:33:16', '2025-05-24 07:33:16', '2025-05-24 07:33:16', NULL, 1),
(228, 'Menambahkan evaluasi untuk latihan Dribbling dengan Kecepatan Tinggi', '2025-05-24 07:35:15', '2025-05-24 07:35:15', '2025-05-24 07:35:15', NULL, 1),
(229, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-24 07:35:19', '2025-05-24 07:35:19', '2025-05-24 07:35:19', NULL, 1),
(230, 'Menambahkan evaluasi untuk latihan Dribbling Zig-Zag Melewati Cone', '2025-05-24 07:35:23', '2025-05-24 07:35:23', '2025-05-24 07:35:23', NULL, 1),
(231, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-24 07:35:28', '2025-05-24 07:35:28', '2025-05-24 07:35:28', NULL, 1),
(232, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-24 07:35:32', '2025-05-24 07:35:32', '2025-05-24 07:35:32', NULL, 1),
(233, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-25 20:16:19', '2025-05-25 20:16:19', '2025-05-25 20:16:19', NULL, 1),
(234, 'Menambahkan evaluasi untuk latihan Lari Keliling Lapangan Penuh', '2025-05-25 20:17:24', '2025-05-25 20:17:24', '2025-05-25 20:17:24', NULL, 1),
(235, 'Menambahkan evaluasi untuk latihan Sprint Garis Lapangan', '2025-05-25 20:23:17', '2025-05-25 20:23:17', '2025-05-25 20:23:17', NULL, 1),
(236, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-05-28 21:20:28', '2025-05-28 21:20:28', '2025-05-28 21:20:28', NULL, 1),
(237, 'Menambahkan evaluasi untuk latihan Lempar Tangkap Bola ke Tembok', '2025-06-05 12:29:29', '2025-06-05 12:29:29', '2025-06-05 12:29:29', NULL, 1),
(238, 'Menghapus evaluasi untuk Lempar Tangkap Bola ke Tembok', '2025-06-05 12:29:50', '2025-06-05 12:29:50', '2025-06-05 12:29:50', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$10$khy5Hm/.F/WXcYSUJqvRSOEDQtA7.jTB4EBkVTjxMTCSZH1etn9Wq', '2024-12-16 21:16:24', '2024-12-16 21:16:24');

-- --------------------------------------------------------

--
-- Table structure for table `atlets`
--

CREATE TABLE `atlets` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cabangOlahraga` varchar(255) NOT NULL,
  `grupId` int(11) DEFAULT NULL,
  `koordinatorId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `atlets`
--

INSERT INTO `atlets` (`id`, `nama`, `email`, `password`, `cabangOlahraga`, `grupId`, `koordinatorId`, `createdAt`, `updatedAt`) VALUES
(2, 'Fernando Fransco Manangsang', 'Fernando@gmail.com', '$2b$10$fT7T/E05ko7jMgB55UvOJu04QuMqisrsDVxWtl/c04zE4vblyC80G', 'Basket', NULL, 1, '2024-12-16 21:24:44', '2024-12-16 21:24:44'),
(3, 'Christian Timothy Edbert Tuwaidan', 'Christian@gmail.com', '$2b$10$LAWSuWdEYVfLElKm9F21JennB6p/PBkv65azHb9ogWDoim/IDoY9O', 'Basket', 1, 1, '2024-12-16 21:25:05', '2024-12-17 06:32:44'),
(5, 'Claudio Yeheskiel Johanis Rarumengkey', 'Claudio@gmail.com', '$2b$10$67FkkEhw4N9z6Vjmy95EBeIzxZUFU8AxHLyS7sMA7iBpRCYfT/xKm', 'Basket', NULL, 1, '2024-12-16 21:26:08', '2025-05-23 19:50:32'),
(6, 'Reinhard Oktonuel Titing', 'Reinhard@gmail.com', '$2b$10$qXodY7GGmr5pUGqn8nwMjOdeHkBJ9prS976SxDdEZiR83r.ubYCii', 'Basket', NULL, 1, '2024-12-17 05:55:41', '2025-05-23 19:50:56'),
(8, 'Haezargreaves Shaq Bigael Joaquin Tumuwo', 'joaquin@gmail.com', '$2b$10$3S6SzNq4jLfuwy7A6nTipuRoAMj0vu1l0hh.oPhXJqoXKWTBskwZi', 'Basket', NULL, 1, '2025-05-23 19:47:02', '2025-05-23 19:47:02'),
(9, 'Christ Ellia Yohannes Sembel', 'christ@gmail.com', '$2b$10$prwXlDhvU4dtGVZ9eBZsKOqfRJyTLzLeCkWx5tXodonMRPSh1g1gO', 'Basket', NULL, 1, '2025-05-23 19:47:37', '2025-05-23 19:47:43'),
(10, 'Jason Edward Tjioe Sidabutar', 'jason@gmail.com', '$2b$10$7oA0gmErLf8Fe3Ylr/LDTu9iHNqEH3kTgrDJhfamb76WS0ALIBAK.', 'Basket', NULL, 1, '2025-05-23 19:48:18', '2025-05-23 19:48:18'),
(11, 'Karl Patrick Utiarahman Gloria', 'karl@gmail.com', '$2b$10$fGsdwRAcWHlnxXuHh8BN9Osn.Fr07G5hWEBOyGM/kAMYzbpXaEAK2', 'Basket', NULL, 1, '2025-05-23 19:50:09', '2025-05-23 19:50:09'),
(12, 'Christyanto Imanuel Machmoed', 'christyanto@gmail.com', '$2b$10$NmzdM5vgxlyyXCdk1QMRV.4oelhfKQ9WO9h.KwL5lM9nLRT/NXE8q', 'Basket', NULL, 1, '2025-05-23 19:51:28', '2025-05-23 19:51:28'),
(13, 'Sergyo Stevanus Antonio Susilo Mangundap', 'sergyo@gmail.com', '$2b$10$0aZG8K3QgDGLYmQuQnZqX.2rsSF.Ysko5tEv4H30FSajBGdzPgSzu', 'Basket', NULL, 1, '2025-05-23 19:51:58', '2025-05-23 19:51:58'),
(14, 'Toraya A. Pontuluran', 'toraya@gmail.com', '$2b$10$h.RdlzK3qllfmlhL165E8u3ztbSPxixEzdJYqFqLn12lhR/9HhgSK', 'Basket', NULL, 1, '2025-05-23 19:52:17', '2025-05-23 19:52:17');

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` int(11) NOT NULL,
  `koordinatorId` int(11) NOT NULL,
  `atletId` int(11) NOT NULL,
  `lastMessageAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `koordinatorId`, `atletId`, `lastMessageAt`, `createdAt`, `updatedAt`) VALUES
(2, 1, 2, '2024-12-17 06:31:41', '2024-12-17 06:31:41', '2024-12-17 06:31:41'),
(3, 1, 3, '2025-01-14 23:24:38', '2025-01-14 23:24:38', '2025-01-14 23:24:38');

-- --------------------------------------------------------

--
-- Table structure for table `evaluasis`
--

CREATE TABLE `evaluasis` (
  `id` int(11) NOT NULL,
  `latihanAtletId` int(11) NOT NULL,
  `atletId` int(11) NOT NULL,
  `koordinatorId` int(11) NOT NULL,
  `jenisLatihan` enum('KETAHANAN','KEKUATAN','KECEPATAN','KELINCAHAN','KOORDINASI') NOT NULL,
  `skor` int(11) NOT NULL,
  `targetPencapaian` int(11) NOT NULL,
  `aspekPenilaian` text NOT NULL COMMENT 'Kriteria penilaian berdasarkan jenis latihan',
  `komentar` text DEFAULT NULL,
  `tanggalEvaluasi` datetime DEFAULT NULL,
  `totalRepetisiTercapai` int(11) NOT NULL COMMENT 'Jumlah repetisi yang berhasil diselesaikan',
  `totalRepetisiTarget` int(11) NOT NULL COMMENT 'Jumlah repetisi yang ditargetkan',
  `persentaseKetercapaian` float NOT NULL COMMENT 'Persentase ketercapaian dari target repetisi',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `evaluasis`
--

INSERT INTO `evaluasis` (`id`, `latihanAtletId`, `atletId`, `koordinatorId`, `jenisLatihan`, `skor`, `targetPencapaian`, `aspekPenilaian`, `komentar`, `tanggalEvaluasi`, `totalRepetisiTercapai`, `totalRepetisiTarget`, `persentaseKetercapaian`, `createdAt`, `updatedAt`) VALUES
(14, 14, 3, 1, 'KEKUATAN', 40, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-01-15 13:18:34', 6, 15, 40, '2025-01-15 13:18:34', '2025-01-15 13:18:34'),
(15, 15, 3, 1, 'KEKUATAN', 73, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-01-16 05:34:32', 11, 15, 73.3333, '2025-01-16 05:34:32', '2025-01-16 05:34:32'),
(20, 29, 8, 1, 'KEKUATAN', 100, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-23 21:31:14', 16, 15, 106.667, '2025-05-23 21:31:14', '2025-05-23 21:31:14'),
(22, 25, 8, 1, 'KECEPATAN', 88, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-23 21:31:24', 7, 8, 87.5, '2025-05-23 21:31:24', '2025-05-23 21:31:24'),
(23, 24, 8, 1, 'KELINCAHAN', 63, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-23 21:31:28', 5, 8, 62.5, '2025-05-23 21:31:28', '2025-05-23 21:31:28'),
(25, 16, 3, 1, 'KEKUATAN', 93, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-23 21:31:37', 14, 15, 93.3333, '2025-05-23 21:31:37', '2025-05-23 21:31:37'),
(31, 36, 8, 1, 'KOORDINASI', 75, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-23 21:52:08', 6, 8, 75, '2025-05-23 21:52:08', '2025-05-23 21:52:08'),
(32, 37, 8, 1, 'KETAHANAN', 71, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-23 22:03:07', 5, 7, 71.4286, '2025-05-23 22:03:07', '2025-05-23 22:03:07'),
(33, 33, 2, 1, 'KECEPATAN', 50, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-23 22:16:19', 4, 8, 50, '2025-05-23 22:16:19', '2025-05-23 22:16:19'),
(34, 32, 2, 1, 'KELINCAHAN', 63, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-23 22:16:23', 5, 8, 62.5, '2025-05-23 22:16:23', '2025-05-23 22:16:23'),
(35, 76, 2, 1, 'KEKUATAN', 60, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-23 23:31:07', 9, 15, 60, '2025-05-23 23:31:07', '2025-05-23 23:31:07'),
(36, 75, 2, 1, 'KOORDINASI', 80, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-23 23:31:19', 8, 8, 100, '2025-05-23 23:31:19', '2025-05-23 23:31:19'),
(37, 63, 2, 1, 'KETAHANAN', 71, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-23 23:31:24', 5, 7, 71.4286, '2025-05-23 23:31:24', '2025-05-23 23:31:24'),
(38, 80, 3, 1, 'KOORDINASI', 38, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:11:57', 3, 8, 37.5, '2025-05-24 07:11:57', '2025-05-24 07:11:57'),
(39, 79, 3, 1, 'KELINCAHAN', 50, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:12:02', 4, 8, 50, '2025-05-24 07:12:02', '2025-05-24 07:12:02'),
(40, 78, 3, 1, 'KECEPATAN', 75, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:12:08', 6, 8, 75, '2025-05-24 07:12:08', '2025-05-24 07:12:08'),
(41, 77, 3, 1, 'KETAHANAN', 57, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:12:13', 4, 7, 57.1429, '2025-05-24 07:12:13', '2025-05-24 07:12:13'),
(42, 85, 9, 1, 'KEKUATAN', 45, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-24 07:14:57', 5, 11, 45.4545, '2025-05-24 07:14:57', '2025-05-24 07:14:57'),
(43, 84, 9, 1, 'KECEPATAN', 63, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:15:01', 5, 8, 62.5, '2025-05-24 07:15:01', '2025-05-24 07:15:01'),
(44, 83, 9, 1, 'KELINCAHAN', 50, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:15:05', 4, 8, 50, '2025-05-24 07:15:05', '2025-05-24 07:15:05'),
(45, 82, 9, 1, 'KETAHANAN', 71, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:15:09', 5, 7, 71.4286, '2025-05-24 07:15:09', '2025-05-24 07:15:09'),
(46, 81, 9, 1, 'KOORDINASI', 63, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:15:13', 5, 8, 62.5, '2025-05-24 07:15:13', '2025-05-24 07:15:13'),
(47, 90, 10, 1, 'KEKUATAN', 55, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-24 07:17:29', 6, 11, 54.5455, '2025-05-24 07:17:29', '2025-05-24 07:17:29'),
(48, 89, 10, 1, 'KECEPATAN', 50, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:17:33', 4, 8, 50, '2025-05-24 07:17:33', '2025-05-24 07:17:33'),
(49, 88, 10, 1, 'KELINCAHAN', 50, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:17:36', 4, 8, 50, '2025-05-24 07:17:36', '2025-05-24 07:17:36'),
(50, 87, 10, 1, 'KETAHANAN', 57, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:17:40', 4, 7, 57.1429, '2025-05-24 07:17:40', '2025-05-24 07:17:40'),
(51, 86, 10, 1, 'KOORDINASI', 50, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:18:02', 4, 8, 50, '2025-05-24 07:18:02', '2025-05-24 07:18:02'),
(52, 95, 11, 1, 'KEKUATAN', 64, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-24 07:23:03', 7, 11, 63.6364, '2025-05-24 07:23:03', '2025-05-24 07:23:03'),
(53, 94, 11, 1, 'KECEPATAN', 63, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:23:07', 5, 8, 62.5, '2025-05-24 07:23:07', '2025-05-24 07:23:07'),
(54, 93, 11, 1, 'KELINCAHAN', 63, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:23:10', 5, 8, 62.5, '2025-05-24 07:23:10', '2025-05-24 07:23:10'),
(55, 92, 11, 1, 'KETAHANAN', 43, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:23:13', 3, 7, 42.8571, '2025-05-24 07:23:13', '2025-05-24 07:23:13'),
(56, 91, 11, 1, 'KOORDINASI', 63, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:23:16', 5, 8, 62.5, '2025-05-24 07:23:16', '2025-05-24 07:23:16'),
(57, 101, 5, 1, 'KEKUATAN', 45, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-24 07:25:21', 5, 11, 45.4545, '2025-05-24 07:25:21', '2025-05-24 07:25:21'),
(58, 100, 5, 1, 'KECEPATAN', 50, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:25:25', 4, 8, 50, '2025-05-24 07:25:25', '2025-05-24 07:25:25'),
(59, 99, 5, 1, 'KELINCAHAN', 63, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:25:28', 5, 8, 62.5, '2025-05-24 07:25:28', '2025-05-24 07:25:28'),
(60, 98, 5, 1, 'KETAHANAN', 57, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:25:32', 4, 7, 57.1429, '2025-05-24 07:25:32', '2025-05-24 07:25:32'),
(61, 97, 5, 1, 'KOORDINASI', 50, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:25:37', 4, 8, 50, '2025-05-24 07:25:37', '2025-05-24 07:25:37'),
(62, 96, 5, 1, 'KOORDINASI', 38, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:25:41', 3, 8, 37.5, '2025-05-24 07:25:41', '2025-05-24 07:25:41'),
(63, 106, 6, 1, 'KEKUATAN', 18, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-24 07:28:37', 2, 11, 18.1818, '2025-05-24 07:28:37', '2025-05-24 07:28:37'),
(64, 105, 6, 1, 'KECEPATAN', 25, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:28:40', 2, 8, 25, '2025-05-24 07:28:40', '2025-05-24 07:28:40'),
(65, 104, 6, 1, 'KELINCAHAN', 25, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:28:44', 2, 8, 25, '2025-05-24 07:28:44', '2025-05-24 07:28:44'),
(66, 103, 6, 1, 'KETAHANAN', 29, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:28:47', 2, 7, 28.5714, '2025-05-24 07:28:47', '2025-05-24 07:28:47'),
(67, 102, 6, 1, 'KOORDINASI', 25, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:28:51', 2, 8, 25, '2025-05-24 07:28:51', '2025-05-24 07:28:51'),
(68, 111, 12, 1, 'KEKUATAN', 18, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-24 07:30:48', 2, 11, 18.1818, '2025-05-24 07:30:48', '2025-05-24 07:30:48'),
(69, 110, 12, 1, 'KECEPATAN', 25, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:30:52', 2, 8, 25, '2025-05-24 07:30:52', '2025-05-24 07:30:52'),
(70, 109, 12, 1, 'KELINCAHAN', 25, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:30:55', 2, 8, 25, '2025-05-24 07:30:55', '2025-05-24 07:30:55'),
(71, 108, 12, 1, 'KETAHANAN', 29, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:30:58', 2, 7, 28.5714, '2025-05-24 07:30:58', '2025-05-24 07:30:58'),
(72, 107, 12, 1, 'KOORDINASI', 25, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:31:05', 2, 8, 25, '2025-05-24 07:31:05', '2025-05-24 07:31:05'),
(73, 116, 13, 1, 'KEKUATAN', 27, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-24 07:32:59', 3, 11, 27.2727, '2025-05-24 07:32:59', '2025-05-24 07:32:59'),
(74, 115, 13, 1, 'KECEPATAN', 38, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:33:03', 3, 8, 37.5, '2025-05-24 07:33:03', '2025-05-24 07:33:03'),
(75, 114, 13, 1, 'KELINCAHAN', 38, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:33:07', 3, 8, 37.5, '2025-05-24 07:33:07', '2025-05-24 07:33:07'),
(76, 113, 13, 1, 'KETAHANAN', 43, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:33:10', 3, 7, 42.8571, '2025-05-24 07:33:10', '2025-05-24 07:33:10'),
(77, 112, 13, 1, 'KOORDINASI', 100, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:33:16', 8, 8, 100, '2025-05-24 07:33:16', '2025-05-24 07:33:16'),
(78, 121, 14, 1, 'KEKUATAN', 82, 65, '{\"kriteria\":[\"Beban maksimal yang dapat diangkat\",\"Jumlah repetisi dengan beban tetap\",\"Teknik pengangkatan\",\"Stabilitas gerakan\"],\"targetMinimal\":65}', '', '2025-05-24 07:35:15', 9, 11, 81.8182, '2025-05-24 07:35:15', '2025-05-24 07:35:15'),
(79, 120, 14, 1, 'KECEPATAN', 75, 75, '{\"kriteria\":[\"Waktu eksekusi gerakan\",\"Akselerasi\",\"Kecepatan maksimal\",\"Konsistensi kecepatan\"],\"targetMinimal\":75}', '', '2025-05-24 07:35:19', 6, 8, 75, '2025-05-24 07:35:19', '2025-05-24 07:35:19'),
(80, 119, 14, 1, 'KELINCAHAN', 75, 70, '{\"kriteria\":[\"Kemampuan mengubah arah\",\"Keseimbangan\",\"Koordinasi gerakan\",\"Waktu reaksi\"],\"targetMinimal\":70}', '', '2025-05-24 07:35:23', 6, 8, 75, '2025-05-24 07:35:23', '2025-05-24 07:35:23'),
(81, 118, 14, 1, 'KETAHANAN', 71, 70, '{\"kriteria\":[\"Durasi latihan tanpa istirahat\",\"Konsistensi performa\",\"Daya tahan kardiovaskular\",\"Kemampuan recovery\"],\"targetMinimal\":70}', '', '2025-05-24 07:35:28', 5, 7, 71.4286, '2025-05-24 07:35:28', '2025-05-24 07:35:28'),
(82, 117, 14, 1, 'KOORDINASI', 75, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-24 07:35:32', 6, 8, 75, '2025-05-24 07:35:32', '2025-05-24 07:35:32'),
(86, 125, 6, 1, 'KOORDINASI', 63, 75, '{\"kriteria\":[\"Ketepatan gerakan\",\"Timing\",\"Keselarasan gerakan\",\"Efisiensi gerakan\"],\"targetMinimal\":75}', '', '2025-05-28 21:20:28', 5, 8, 62.5, '2025-05-28 21:20:28', '2025-05-28 21:20:28');

-- --------------------------------------------------------

--
-- Table structure for table `kataloglatihans`
--

CREATE TABLE `kataloglatihans` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `jenisLatihan` varchar(255) NOT NULL,
  `tingkatKesulitan` varchar(255) NOT NULL,
  `durasi` int(11) NOT NULL,
  `peralatan` text DEFAULT NULL,
  `manfaat` text DEFAULT NULL,
  `cabangOlahraga` varchar(255) NOT NULL,
  `koordinatorId` int(11) NOT NULL,
  `targetSkor` int(11) NOT NULL COMMENT 'Target skor yang harus dicapai atlet',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kataloglatihans`
--

INSERT INTO `kataloglatihans` (`id`, `nama`, `deskripsi`, `jenisLatihan`, `tingkatKesulitan`, `durasi`, `peralatan`, `manfaat`, `cabangOlahraga`, `koordinatorId`, `targetSkor`, `createdAt`, `updatedAt`) VALUES
(2, 'Dribbling dengan Kecepatan Tinggi', 'Latihan ini fokus pada pengembangan kekuatan kaki dan kontrol bola dalam kondisi kecepatan tinggi. Atlet diminta untuk melakukan dribbling bola dengan kecepatan maksimal di sepanjang garis lurus sambil menjaga kontrol bola tetap stabil.', 'KEKUATAN', 'MENENGAH', 15, 'Bola Basket', 'Meningkatkan kekuatan kaki dan stamina\nMeningkatkan kecepatan gerakan dan kontrol bola saat bergerak cepat\nMembantu meningkatkan kelincahan dan reaksi cepat di lapangan\n', 'Basket', 1, 65, '2025-01-15 13:10:10', '2025-01-15 13:11:33'),
(6, 'Sprint Garis Lapangan', 'Lari sprint bolak-balik dari baseline menyentuh garis lemparan bebas, garis tengah lapangan, garis lemparan bebas seberang, dan kembali ke baseline awal.', 'KECEPATAN', 'LANJUTAN', 12, 'Lapangan Basket', 'Meningkatkan kecepatan lari jarak pendek, akselerasi, deselerasi, dan kemampuan mengubah arah dengan cepat (agility).', 'Basket', 1, 75, '2025-05-23 20:15:16', '2025-05-23 20:15:16'),
(7, 'Dribbling Zig-Zag Melewati Cone', 'Melakukan dribbling bola basket (tangan kanan, kiri, atau bergantian) secara zig-zag melewati rintangan cone yang disusun berbaris.', 'KELINCAHAN', 'MENENGAH', 15, 'Bola basket, 5-8 cone', 'Meningkatkan kelincahan (agility), koordinasi tangan-mata, kemampuan mengontrol bola saat bergerak dan mengubah arah, serta footwork.', 'Basket', 1, 70, '2025-05-23 20:17:37', '2025-05-23 20:17:37'),
(8, 'Lari Keliling Lapangan Penuh', 'Lari mengelilingi lapangan basket dengan kecepatan konstan untuk membangun daya tahan dasar.', 'KETAHANAN', 'PEMULA', 18, 'Lapangan Basket', 'Meningkatkan daya tahan kardiovaskular, stamina, dan kapasitas aerobik pemain.', 'Basket', 1, 70, '2025-05-23 21:42:16', '2025-05-23 21:42:16'),
(9, 'Lempar Tangkap Bola ke Tembok', 'Berdiri menghadap tembok, melempar bola ke tembok dan menangkapnya kembali. Variasi meliputi penggunaan satu tangan, dua tangan, lemparan dada, lemparan pantul, atau menangkap setelah satu pantulan di lantai.', 'KOORDINASI', 'MENENGAH', 10, 'Bola Basket, Tembok yang kokoh dan rata', 'Meningkatkan koordinasi tangan-mata, waktu reaksi, akurasi lemparan dan tangkapan, serta penguatan otot tangan dan pergelangan tangan.', 'Basket', 1, 75, '2025-05-23 21:44:51', '2025-05-23 21:44:51');

-- --------------------------------------------------------

--
-- Table structure for table `koordinators`
--

CREATE TABLE `koordinators` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `adminId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `koordinators`
--

INSERT INTO `koordinators` (`id`, `nama`, `email`, `password`, `createdAt`, `updatedAt`, `adminId`) VALUES
(1, 'Rolland Lengkong', 'Rolland@gmail.com', '$2b$10$730BBezkMdVTN3RrfiBS2.1MpVbx9R25WvsLdeWOzgdBAbAQVTNnK', '2024-12-16 21:18:22', '2024-12-16 21:18:22', 1),
(4, 'Michael ', 'Michael@gmail.com', '$2b$10$5dpizTPhT61sCIK/KAN7oOpfGW4jDRCXSOaqUjunZUs2StBDp8rQ6', '2024-12-17 06:22:01', '2025-05-17 08:56:23', 1);

-- --------------------------------------------------------

--
-- Table structure for table `latihanatlets`
--

CREATE TABLE `latihanatlets` (
  `id` int(11) NOT NULL,
  `atletId` int(11) NOT NULL,
  `katalogLatihanId` int(11) NOT NULL,
  `status` enum('ONGOING','COMPLETED') DEFAULT 'ONGOING',
  `tanggalMulai` datetime NOT NULL,
  `tanggalSelesai` datetime DEFAULT NULL,
  `currentOpsiIndex` int(11) DEFAULT 0,
  `progressLatihan` text DEFAULT NULL COMMENT 'Menyimpan progress repetisi untuk setiap opsi latihan',
  `totalRepetisiTercapai` int(11) DEFAULT 0 COMMENT 'Total repetisi yang berhasil diselesaikan',
  `totalRepetisiTarget` int(11) DEFAULT 0 COMMENT 'Total target repetisi dari semua opsi',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `latihanatlets`
--

INSERT INTO `latihanatlets` (`id`, `atletId`, `katalogLatihanId`, `status`, `tanggalMulai`, `tanggalSelesai`, `currentOpsiIndex`, `progressLatihan`, `totalRepetisiTercapai`, `totalRepetisiTarget`, `createdAt`, `updatedAt`) VALUES
(14, 3, 2, 'COMPLETED', '2025-01-15 13:17:39', '2025-01-15 13:17:53', 2, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":2,\"waktuMulai\":\"2025-01-15T13:17:40.467Z\",\"targetTercapai\":false},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":2,\"waktuMulai\":\"2025-01-15T13:17:44.753Z\",\"targetTercapai\":false},{\"opsiId\":5,\"nama\":\"Dribbling Kecepatan dengan Perubahan Arah Cepat\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":2,\"waktuMulai\":\"2025-01-15T13:17:50.124Z\",\"targetTercapai\":false}]', 6, 15, '2025-01-15 13:17:39', '2025-01-15 13:17:53'),
(15, 3, 2, 'COMPLETED', '2025-01-16 05:29:49', '2025-01-16 05:30:19', 2, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":4,\"waktuMulai\":\"2025-01-16T05:29:51.520Z\",\"targetTercapai\":false},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":3,\"waktuMulai\":\"2025-01-16T05:30:07.461Z\",\"targetTercapai\":false},{\"opsiId\":5,\"nama\":\"Dribbling Kecepatan dengan Perubahan Arah Cepat\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":4,\"waktuMulai\":\"2025-01-16T05:30:14.710Z\",\"targetTercapai\":true}]', 11, 15, '2025-01-16 05:29:49', '2025-01-16 05:30:19'),
(16, 3, 2, 'COMPLETED', '2025-01-16 05:29:49', '2025-01-16 05:44:25', 2, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":5,\"waktuMulai\":\"2025-01-16T05:44:02.504Z\",\"targetTercapai\":true},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":5,\"waktuMulai\":\"2025-01-16T05:44:13.365Z\",\"targetTercapai\":false},{\"opsiId\":5,\"nama\":\"Dribbling Kecepatan dengan Perubahan Arah Cepat\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":4,\"waktuMulai\":\"2025-01-16T05:44:18.981Z\",\"targetTercapai\":true}]', 14, 15, '2025-01-16 05:29:49', '2025-01-16 05:44:25'),
(24, 8, 7, 'COMPLETED', '2025-05-23 20:19:55', '2025-05-23 20:20:08', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":2,\"waktuMulai\":\"2025-05-23T20:19:58.791Z\",\"targetTercapai\":false},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":0,\"repetisi\":3,\"waktuMulai\":\"2025-05-23T20:20:05.419Z\",\"targetTercapai\":false}]', 5, 8, '2025-05-23 20:19:55', '2025-05-23 20:20:08'),
(25, 8, 6, 'COMPLETED', '2025-05-23 20:50:57', '2025-05-23 20:54:01', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"waktuMulai\":\"2025-05-23T20:53:27.542Z\",\"durasi\":0,\"repetisi\":3,\"targetRepetisi\":3,\"targetDurasi\":2,\"targetTercapai\":true},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"waktuMulai\":\"2025-05-23T20:53:55.180Z\",\"durasi\":0,\"repetisi\":4,\"targetRepetisi\":5,\"targetDurasi\":3,\"targetTercapai\":false}]', 7, 8, '2025-05-23 20:50:57', '2025-05-23 20:54:01'),
(29, 8, 2, 'COMPLETED', '2025-05-23 21:27:37', '2025-05-23 21:28:20', 2, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":9,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":5,\"repetisi\":5,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":5,\"nama\":\"Dribbling Kecepatan dengan Perubahan Arah Cepat\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":7,\"repetisi\":7,\"targetTercapai\":true,\"waktuMulai\":null}]', 16, 15, '2025-05-23 21:27:37', '2025-05-23 21:28:20'),
(32, 2, 7, 'COMPLETED', '2025-05-23 21:35:11', '2025-05-23 21:35:26', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":4,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-23 21:35:11', '2025-05-23 21:35:26'),
(33, 2, 6, 'COMPLETED', '2025-05-23 21:35:45', '2025-05-23 21:35:58', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 8, '2025-05-23 21:35:45', '2025-05-23 21:35:58'),
(36, 8, 9, 'COMPLETED', '2025-05-23 21:51:01', '2025-05-23 21:51:15', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 6, 8, '2025-05-23 21:51:01', '2025-05-23 21:51:15'),
(37, 8, 8, 'COMPLETED', '2025-05-23 22:01:13', '2025-05-23 22:01:33', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 7, '2025-05-23 22:01:13', '2025-05-23 22:01:33'),
(63, 2, 8, 'COMPLETED', '2025-05-23 23:08:05', '2025-05-23 23:10:18', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":6,\"repetisi\":3,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 7, '2025-05-23 23:08:05', '2025-05-23 23:10:18'),
(75, 2, 9, 'COMPLETED', '2025-05-23 23:27:17', '2025-05-23 23:29:18', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":26,\"repetisi\":4,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":72,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 8, 8, '2025-05-23 23:27:17', '2025-05-23 23:29:18'),
(76, 2, 2, 'COMPLETED', '2025-05-23 23:29:51', '2025-05-23 23:30:16', 2, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":6,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":5,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":5,\"nama\":\"Dribbling Kecepatan dengan Perubahan Arah Cepat\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":5,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 9, 15, '2025-05-23 23:29:51', '2025-05-23 23:30:16'),
(77, 3, 8, 'COMPLETED', '2025-05-24 07:10:16', '2025-05-24 07:10:29', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":4,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":4,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 7, '2025-05-24 07:10:16', '2025-05-24 07:10:29'),
(78, 3, 6, 'COMPLETED', '2025-05-24 07:10:39', '2025-05-24 07:10:49', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":4,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 6, 8, '2025-05-24 07:10:39', '2025-05-24 07:10:49'),
(79, 3, 7, 'COMPLETED', '2025-05-24 07:10:59', '2025-05-24 07:11:09', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":4,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 8, '2025-05-24 07:10:59', '2025-05-24 07:11:09'),
(80, 3, 9, 'COMPLETED', '2025-05-24 07:11:22', '2025-05-24 07:11:32', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 3, 8, '2025-05-24 07:11:22', '2025-05-24 07:11:32'),
(81, 9, 9, 'COMPLETED', '2025-05-24 07:13:27', '2025-05-24 07:13:35', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-24 07:13:27', '2025-05-24 07:13:35'),
(82, 9, 8, 'COMPLETED', '2025-05-24 07:13:41', '2025-05-24 07:13:52', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":6,\"repetisi\":3,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 7, '2025-05-24 07:13:41', '2025-05-24 07:13:52'),
(83, 9, 7, 'COMPLETED', '2025-05-24 07:13:57', '2025-05-24 07:14:04', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 8, '2025-05-24 07:13:57', '2025-05-24 07:14:04'),
(84, 9, 6, 'COMPLETED', '2025-05-24 07:14:10', '2025-05-24 07:14:18', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-24 07:14:10', '2025-05-24 07:14:18'),
(85, 9, 2, 'COMPLETED', '2025-05-24 07:14:23', '2025-05-24 07:14:33', 1, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":4,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 11, '2025-05-24 07:14:23', '2025-05-24 07:14:33'),
(86, 10, 9, 'COMPLETED', '2025-05-24 07:16:09', '2025-05-24 07:16:16', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":1,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 8, '2025-05-24 07:16:09', '2025-05-24 07:16:16'),
(87, 10, 8, 'COMPLETED', '2025-05-24 07:16:20', '2025-05-24 07:16:27', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 7, '2025-05-24 07:16:20', '2025-05-24 07:16:27'),
(88, 10, 7, 'COMPLETED', '2025-05-24 07:16:31', '2025-05-24 07:16:38', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":3,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":1,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 8, '2025-05-24 07:16:31', '2025-05-24 07:16:38'),
(89, 10, 6, 'COMPLETED', '2025-05-24 07:16:42', '2025-05-24 07:16:49', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 8, '2025-05-24 07:16:42', '2025-05-24 07:16:49'),
(90, 10, 2, 'COMPLETED', '2025-05-24 07:16:58', '2025-05-24 07:17:08', 1, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":6,\"repetisi\":5,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 6, 11, '2025-05-24 07:16:58', '2025-05-24 07:17:08'),
(91, 11, 9, 'COMPLETED', '2025-05-24 07:20:35', '2025-05-24 07:20:45', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":6,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-24 07:20:35', '2025-05-24 07:20:45'),
(92, 11, 8, 'COMPLETED', '2025-05-24 07:20:49', '2025-05-24 07:20:55', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 3, 7, '2025-05-24 07:20:49', '2025-05-24 07:20:55'),
(93, 11, 7, 'COMPLETED', '2025-05-24 07:20:59', '2025-05-24 07:21:05', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-24 07:20:59', '2025-05-24 07:21:05'),
(94, 11, 6, 'COMPLETED', '2025-05-24 07:21:09', '2025-05-24 07:21:16', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-24 07:21:09', '2025-05-24 07:21:16'),
(95, 11, 2, 'COMPLETED', '2025-05-24 07:22:39', '2025-05-24 07:22:47', 1, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 7, 11, '2025-05-24 07:22:39', '2025-05-24 07:22:47'),
(96, 5, 9, 'COMPLETED', '2025-05-24 07:23:52', '2025-05-24 07:23:59', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 3, 8, '2025-05-24 07:23:52', '2025-05-24 07:23:59'),
(97, 5, 9, 'COMPLETED', '2025-05-24 07:24:03', '2025-05-24 07:24:10', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 8, '2025-05-24 07:24:03', '2025-05-24 07:24:10'),
(98, 5, 8, 'COMPLETED', '2025-05-24 07:24:15', '2025-05-24 07:24:21', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":1,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 7, '2025-05-24 07:24:15', '2025-05-24 07:24:21'),
(99, 5, 7, 'COMPLETED', '2025-05-24 07:24:26', '2025-05-24 07:24:34', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-24 07:24:26', '2025-05-24 07:24:34'),
(100, 5, 6, 'COMPLETED', '2025-05-24 07:24:39', '2025-05-24 07:24:45', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":1,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 4, 8, '2025-05-24 07:24:39', '2025-05-24 07:24:45'),
(101, 5, 2, 'COMPLETED', '2025-05-24 07:24:50', '2025-05-24 07:24:59', 1, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 11, '2025-05-24 07:24:50', '2025-05-24 07:24:59'),
(102, 6, 9, 'COMPLETED', '2025-05-24 07:27:19', '2025-05-24 07:27:27', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 8, '2025-05-24 07:27:19', '2025-05-24 07:27:27'),
(103, 6, 8, 'COMPLETED', '2025-05-24 07:27:30', '2025-05-24 07:27:36', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 7, '2025-05-24 07:27:30', '2025-05-24 07:27:36'),
(104, 6, 7, 'COMPLETED', '2025-05-24 07:27:39', '2025-05-24 07:27:45', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 8, '2025-05-24 07:27:39', '2025-05-24 07:27:45'),
(105, 6, 6, 'COMPLETED', '2025-05-24 07:27:50', '2025-05-24 07:27:56', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 8, '2025-05-24 07:27:50', '2025-05-24 07:27:56'),
(106, 6, 2, 'COMPLETED', '2025-05-24 07:28:09', '2025-05-24 07:28:15', 1, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 11, '2025-05-24 07:28:09', '2025-05-24 07:28:15'),
(107, 12, 9, 'COMPLETED', '2025-05-24 07:29:33', '2025-05-24 07:29:44', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":6,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 8, '2025-05-24 07:29:33', '2025-05-24 07:29:44'),
(108, 12, 8, 'COMPLETED', '2025-05-24 07:29:48', '2025-05-24 07:29:55', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 7, '2025-05-24 07:29:48', '2025-05-24 07:29:55'),
(109, 12, 7, 'COMPLETED', '2025-05-24 07:29:59', '2025-05-24 07:30:05', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 8, '2025-05-24 07:29:59', '2025-05-24 07:30:05'),
(110, 12, 6, 'COMPLETED', '2025-05-24 07:30:09', '2025-05-24 07:30:17', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 8, '2025-05-24 07:30:09', '2025-05-24 07:30:17'),
(111, 12, 2, 'COMPLETED', '2025-05-24 07:30:23', '2025-05-24 07:30:31', 1, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null}]', 2, 11, '2025-05-24 07:30:23', '2025-05-24 07:30:31'),
(112, 13, 9, 'COMPLETED', '2025-05-24 07:31:45', '2025-05-24 07:31:53', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":true,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":3,\"repetisi\":5,\"targetTercapai\":true,\"waktuMulai\":null}]', 8, 8, '2025-05-24 07:31:45', '2025-05-24 07:31:53'),
(113, 13, 8, 'COMPLETED', '2025-05-24 07:32:04', '2025-05-24 07:32:10', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 3, 7, '2025-05-24 07:32:04', '2025-05-24 07:32:10'),
(114, 13, 7, 'COMPLETED', '2025-05-24 07:32:14', '2025-05-24 07:32:20', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 3, 8, '2025-05-24 07:32:14', '2025-05-24 07:32:20'),
(115, 13, 6, 'COMPLETED', '2025-05-24 07:32:24', '2025-05-24 07:32:31', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 3, 8, '2025-05-24 07:32:24', '2025-05-24 07:32:31'),
(116, 13, 2, 'COMPLETED', '2025-05-24 07:32:35', '2025-05-24 07:32:42', 1, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":1,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null}]', 3, 11, '2025-05-24 07:32:35', '2025-05-24 07:32:42'),
(117, 14, 9, 'COMPLETED', '2025-05-24 07:34:05', '2025-05-24 07:34:13', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 6, 8, '2025-05-24 07:34:05', '2025-05-24 07:34:13'),
(118, 14, 8, 'COMPLETED', '2025-05-24 07:34:16', '2025-05-24 07:34:23', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 7, '2025-05-24 07:34:16', '2025-05-24 07:34:23'),
(119, 14, 7, 'COMPLETED', '2025-05-24 07:34:26', '2025-05-24 07:34:33', 1, '[{\"opsiId\":12,\"nama\":\"Fokus Kontrol dan Pergantian Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":13,\"nama\":\"Kelincahan dengan Tekanan Waktu\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 6, 8, '2025-05-24 07:34:26', '2025-05-24 07:34:33'),
(120, 14, 6, 'COMPLETED', '2025-05-24 07:34:37', '2025-05-24 07:34:43', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 6, 8, '2025-05-24 07:34:37', '2025-05-24 07:34:43'),
(121, 14, 2, 'COMPLETED', '2025-05-24 07:34:47', '2025-05-24 07:34:55', 1, '[{\"opsiId\":3,\"nama\":\"Dribbling Sprint Lurus\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":4,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":4,\"nama\":\"Dribbling Zig-Zag Kecepatan Tinggi\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":5,\"targetTercapai\":false,\"waktuMulai\":null}]', 9, 11, '2025-05-24 07:34:47', '2025-05-24 07:34:55'),
(122, 6, 9, 'COMPLETED', '2025-05-25 20:12:48', '2025-05-25 20:13:10', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":7,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":9,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 6, 8, '2025-05-25 20:12:48', '2025-05-25 20:13:10'),
(123, 6, 8, 'COMPLETED', '2025-05-25 20:14:10', '2025-05-25 20:14:33', 1, '[{\"opsiId\":14,\"nama\":\"Interval Pendek\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":9,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":15,\"nama\":\"Ketahanan Berkelanjutan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":7,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 7, '2025-05-25 20:14:10', '2025-05-25 20:14:33'),
(124, 6, 6, 'COMPLETED', '2025-05-25 20:21:33', '2025-05-25 20:22:21', 1, '[{\"opsiId\":10,\"nama\":\"Set Standar\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":21,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":11,\"nama\":\"Interval dengan Istirahat Tidak Penuh\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":8,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-25 20:21:33', '2025-05-25 20:22:21'),
(125, 6, 9, 'COMPLETED', '2025-05-28 21:19:57', '2025-05-28 21:20:06', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":3,\"targetTercapai\":false,\"waktuMulai\":null}]', 5, 8, '2025-05-28 21:19:57', '2025-05-28 21:20:06'),
(126, 12, 9, 'COMPLETED', '2025-06-05 12:28:35', '2025-06-05 12:28:45', 1, '[{\"opsiId\":16,\"nama\":\"Dasar Satu Tangan dan Dua Tangan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":2,\"targetTercapai\":false,\"waktuMulai\":null},{\"opsiId\":17,\"nama\":\"Reaksi Cepat dan Variasi Lemparan\",\"selesai\":true,\"sedangBerjalan\":false,\"durasi\":2,\"repetisi\":4,\"targetTercapai\":false,\"waktuMulai\":null}]', 6, 8, '2025-06-05 12:28:35', '2025-06-05 12:28:45');

-- --------------------------------------------------------

--
-- Table structure for table `opsilatihans`
--

CREATE TABLE `opsilatihans` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `durasi` int(11) NOT NULL,
  `repetisi` int(11) NOT NULL,
  `deskripsi` text NOT NULL,
  `target` varchar(255) NOT NULL,
  `instruksi` text NOT NULL,
  `katalogLatihanId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `opsilatihans`
--

INSERT INTO `opsilatihans` (`id`, `nama`, `durasi`, `repetisi`, `deskripsi`, `target`, `instruksi`, `katalogLatihanId`, `createdAt`, `updatedAt`) VALUES
(3, 'Dribbling Sprint Lurus', 10, 5, 'Atlet akan berlari sepanjang garis lurus sambil melakukan dribbling dengan kecepatan tinggi. Fokus utama adalah pada kecepatan dan kontrol bola di bawah tekanan kecepatan.', 'Meningkatkan kecepatan dribbling Mengembangkan kontrol bola dalam situasi cepat Meningkatkan ketepatan dan reaksi dalam pengambilan keputusan cepat', 'Mulai dengan posisi siap di garis start.\nDribble bola dengan kecepatan tinggi, pastikan bola tetap berada dekat dengan tubuh.\nFokus pada kecepatan lari dan kontrol bola di sepanjang garis lurus.\nSetelah mencapai garis finish, istirahat 30 detik sebelum melanjutkan set berikutnya.', 2, '2025-01-15 13:13:14', '2025-01-15 13:13:14'),
(4, 'Dribbling Zig-Zag Kecepatan Tinggi', 15, 6, 'Atlet akan melakukan dribbling dengan kecepatan tinggi melalui serangkaian cone atau tanda yang membentuk pola zig-zag. Latihan ini menantang atlet untuk mengontrol bola saat mengubah arah dengan cepat sambil mempertahankan kecepatan tinggi.', 'Meningkatkan kontrol bola saat bergerak cepat dan mengubah arah Meningkatkan kelincahan dan responsivitas Meningkatkan koordinasi tangan-kaki saat berlari dan dribbling', 'Atur cone atau tanda dalam pola zig-zag dengan jarak sekitar 2-3 meter.\nDribble bola dengan kecepatan tinggi dan berusaha mempertahankan kontrol bola saat melewati setiap cone.\nFokus pada perubahan arah yang cepat dan menjaga bola dekat dengan tubuh.\nSetelah menyelesaikan satu set, istirahat selama 20 detik dan ulangi.', 2, '2025-01-15 13:13:44', '2025-01-15 13:13:44'),
(10, 'Set Standar', 2, 3, 'Selesaikan satu putaran penuh suicide sprint secepat mungkin, jalan kembali ke baseline untuk pemulihan aktif sebelum set berikutnya.', 'Meningkatkan kecepatan maksimal dan daya tahan anaerobik.', 'Sentuh setiap garis dengan tangan atau kaki. Lari dengan usaha maksimal pada setiap segmen. Jaga keseimbangan saat berbelok dan mengubah arah.', 6, '2025-05-23 20:16:12', '2025-05-23 20:16:12'),
(11, 'Interval dengan Istirahat Tidak Penuh', 3, 5, 'Selesaikan satu putaran suicide sprint, istirahat singkat, lalu ulangi. Fokus pada mempertahankan kecepatan meskipun ada kelelahan.', 'Meningkatkan daya tahan kecepatan (speed endurance) dan kemampuan bekerja pada intensitas tinggi dengan pemulihan singkat.', 'Fokus pada efisiensi gerakan dan ledakan dari setiap garis. Usahakan waktu tempuh konsisten antar set.', 6, '2025-05-23 20:16:44', '2025-05-23 20:16:44'),
(12, 'Fokus Kontrol dan Pergantian Tangan', 7, 3, 'Dribbling melewati cone dengan fokus pada menjaga bola tetap rendah dan dekat dengan tubuh, serta melakukan gerakan crossover atau behind-the-back di setiap cone jika sudah mahir.', 'Meningkatkan kontrol bola dengan kedua tangan, kemampuan melakukan dribble-move, dan perubahan arah yang halus.', 'Jaga kepala tetap tegak untuk melihat lapangan. Gunakan ujung jari untuk mengontrol bola. Dorong bola ke depan saat bergerak, bukan ke bawah. Variasikan kecepatan.', 7, '2025-05-23 20:18:20', '2025-05-23 20:18:20'),
(13, 'Kelincahan dengan Tekanan Waktu', 7, 5, 'Dribbling zig-zag secepat mungkin sambil tetap menjaga kontrol bola dan tidak menjatuhkan cone.', 'Meningkatkan kelincahan dengan bola pada kecepatan tinggi dan di bawah tekanan.', 'Fokus pada kecepatan gerakan kaki dan tangan. Usahakan melakukan gerakan serendah mungkin untuk stabilitas. Tetap jaga kontrol bola meskipun bergerak cepat.', 7, '2025-05-23 20:18:48', '2025-05-23 20:18:48'),
(14, 'Interval Pendek', 10, 3, 'Lari keliling lapangan dengan kecepatan sedang selama 5 menit, istirahat 1 menit, ulangi.', 'Membangun dasar ketahanan aerobik dan kemampuan pemulihan.', 'Pertahankan kecepatan lari yang stabil selama 5 menit. Fokus pada pernapasan yang teratur. Gunakan waktu istirahat untuk mengatur napas.', 8, '2025-05-23 21:42:55', '2025-05-23 21:42:55'),
(15, 'Ketahanan Berkelanjutan', 15, 4, 'Lari keliling lapangan tanpa berhenti selama 15 menit dengan kecepatan yang dapat dipertahankan.', 'Meningkatkan kapasitas aerobik maksimal dan mental toughness.', 'Atur ritme lari agar dapat bertahan selama durasi yang ditentukan. Hindari memulai terlalu cepat.', 8, '2025-05-23 21:43:26', '2025-05-23 21:43:26'),
(16, 'Dasar Satu Tangan dan Dua Tangan', 5, 3, 'Lakukan lemparan dan tangkapan dengan tangan kanan saja, lalu tangan kiri saja. Kemudian lanjutkan dengan lemparan dan tangkapan dua tangan (chest pass ke tembok).', 'Meningkatkan akurasi lemparan, kekuatan pergelangan tangan, dan kemampuan menangkap dengan satu dan dua tangan.', 'Jaga pandangan pada bola dan target di tembok. Variasikan jarak dari tembok untuk tingkat kesulitan berbeda. Fokus pada tangkapan yang bersih dan kontrol bola.', 9, '2025-05-23 21:45:39', '2025-05-23 21:45:39'),
(17, 'Reaksi Cepat dan Variasi Lemparan', 10, 5, 'Lakukan serangkaian lemparan dan tangkapan dengan cepat, mengubah jenis lemparan dan cara menangkap secara periodik untuk melatih adaptasi dan reaksi.', 'Meningkatkan reaksi cepat, koordinasi dinamis, dan kemampuan beradaptasi dengan berbagai situasi bola.', 'Jaga kaki tetap aktif dan siap bergerak. Antisipasi pantulan bola. Usahakan menjaga ritme yang cepat namun terkontrol.', 9, '2025-05-23 21:46:13', '2025-05-23 21:46:13');

-- --------------------------------------------------------

--
-- Table structure for table `pencapaians`
--

CREATE TABLE `pencapaians` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `atletId` int(11) DEFAULT NULL,
  `koordinatorId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pesans`
--

CREATE TABLE `pesans` (
  `id` int(11) NOT NULL,
  `isi` text NOT NULL,
  `status` enum('sent','read') NOT NULL DEFAULT 'sent',
  `senderRole` enum('atlet','koordinator') NOT NULL,
  `conversationId` int(11) NOT NULL,
  `atletId` int(11) DEFAULT NULL,
  `koordinatorId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesans`
--

INSERT INTO `pesans` (`id`, `isi`, `status`, `senderRole`, `conversationId`, `atletId`, `koordinatorId`, `createdAt`, `updatedAt`) VALUES
(2, 'selamat siang', 'sent', 'koordinator', 2, 2, 1, '2024-12-17 06:31:41', '2024-12-17 06:31:41'),
(3, 'Hallo', 'sent', 'atlet', 3, 3, 1, '2025-01-14 23:24:38', '2025-01-14 23:24:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activitylogs`
--
ALTER TABLE `activitylogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adminId` (`adminId`),
  ADD KEY `koordinatorId` (`koordinatorId`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `atlets`
--
ALTER TABLE `atlets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `grupId` (`grupId`),
  ADD KEY `koordinatorId` (`koordinatorId`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `koordinatorId` (`koordinatorId`),
  ADD KEY `atletId` (`atletId`);

--
-- Indexes for table `evaluasis`
--
ALTER TABLE `evaluasis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `latihanAtletId` (`latihanAtletId`),
  ADD KEY `atletId` (`atletId`),
  ADD KEY `koordinatorId` (`koordinatorId`);

--
-- Indexes for table `kataloglatihans`
--
ALTER TABLE `kataloglatihans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `koordinatorId` (`koordinatorId`);

--
-- Indexes for table `koordinators`
--
ALTER TABLE `koordinators`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `adminId` (`adminId`);

--
-- Indexes for table `latihanatlets`
--
ALTER TABLE `latihanatlets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `atletId` (`atletId`),
  ADD KEY `katalogLatihanId` (`katalogLatihanId`);

--
-- Indexes for table `opsilatihans`
--
ALTER TABLE `opsilatihans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `katalogLatihanId` (`katalogLatihanId`);

--
-- Indexes for table `pencapaians`
--
ALTER TABLE `pencapaians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `atletId` (`atletId`),
  ADD KEY `koordinatorId` (`koordinatorId`);

--
-- Indexes for table `pesans`
--
ALTER TABLE `pesans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversationId` (`conversationId`),
  ADD KEY `atletId` (`atletId`),
  ADD KEY `koordinatorId` (`koordinatorId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activitylogs`
--
ALTER TABLE `activitylogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=239;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `atlets`
--
ALTER TABLE `atlets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `evaluasis`
--
ALTER TABLE `evaluasis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `kataloglatihans`
--
ALTER TABLE `kataloglatihans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `koordinators`
--
ALTER TABLE `koordinators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `latihanatlets`
--
ALTER TABLE `latihanatlets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `opsilatihans`
--
ALTER TABLE `opsilatihans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `pencapaians`
--
ALTER TABLE `pencapaians`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pesans`
--
ALTER TABLE `pesans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activitylogs`
--
ALTER TABLE `activitylogs`
  ADD CONSTRAINT `activitylogs_ibfk_1` FOREIGN KEY (`adminId`) REFERENCES `admins` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `activitylogs_ibfk_2` FOREIGN KEY (`koordinatorId`) REFERENCES `koordinators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `atlets`
--
ALTER TABLE `atlets`
  ADD CONSTRAINT `atlets_ibfk_1` FOREIGN KEY (`grupId`) REFERENCES `grupsesis` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `atlets_ibfk_2` FOREIGN KEY (`koordinatorId`) REFERENCES `koordinators` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_ibfk_1` FOREIGN KEY (`koordinatorId`) REFERENCES `koordinators` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `conversations_ibfk_2` FOREIGN KEY (`atletId`) REFERENCES `atlets` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `evaluasis`
--
ALTER TABLE `evaluasis`
  ADD CONSTRAINT `evaluasis_ibfk_1` FOREIGN KEY (`latihanAtletId`) REFERENCES `latihanatlets` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluasis_ibfk_2` FOREIGN KEY (`atletId`) REFERENCES `atlets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluasis_ibfk_3` FOREIGN KEY (`koordinatorId`) REFERENCES `koordinators` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kataloglatihans`
--
ALTER TABLE `kataloglatihans`
  ADD CONSTRAINT `kataloglatihans_ibfk_1` FOREIGN KEY (`koordinatorId`) REFERENCES `koordinators` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `koordinators`
--
ALTER TABLE `koordinators`
  ADD CONSTRAINT `koordinators_ibfk_1` FOREIGN KEY (`adminId`) REFERENCES `admins` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `latihanatlets`
--
ALTER TABLE `latihanatlets`
  ADD CONSTRAINT `latihanatlets_ibfk_1` FOREIGN KEY (`atletId`) REFERENCES `atlets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `latihanatlets_ibfk_2` FOREIGN KEY (`katalogLatihanId`) REFERENCES `kataloglatihans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `opsilatihans`
--
ALTER TABLE `opsilatihans`
  ADD CONSTRAINT `opsilatihans_ibfk_1` FOREIGN KEY (`katalogLatihanId`) REFERENCES `kataloglatihans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pencapaians`
--
ALTER TABLE `pencapaians`
  ADD CONSTRAINT `pencapaians_ibfk_1` FOREIGN KEY (`atletId`) REFERENCES `atlets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pencapaians_ibfk_2` FOREIGN KEY (`koordinatorId`) REFERENCES `koordinators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pesans`
--
ALTER TABLE `pesans`
  ADD CONSTRAINT `pesans_ibfk_1` FOREIGN KEY (`conversationId`) REFERENCES `conversations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesans_ibfk_2` FOREIGN KEY (`atletId`) REFERENCES `atlets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesans_ibfk_3` FOREIGN KEY (`koordinatorId`) REFERENCES `koordinators` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
