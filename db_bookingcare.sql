-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 19, 2023 lúc 05:39 AM
-- Phiên bản máy phục vụ: 10.4.18-MariaDB
-- Phiên bản PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `db_bookingcare`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `allcodes`
--

CREATE TABLE `allcodes` (
  `id` int(11) NOT NULL,
  `key` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `valueEn` varchar(255) DEFAULT NULL,
  `valueVi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `allcodes`
--

INSERT INTO `allcodes` (`id`, `key`, `type`, `valueEn`, `valueVi`, `createdAt`, `updatedAt`) VALUES
(1, 'R1', 'ROLE', 'Admin', 'Quản trị viên', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'R2', 'ROLE', 'Doctor', 'Bác sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'R3', 'ROLE', 'Patient', 'Bệnh nhân', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'S1', 'STATUS', 'New', 'Lịch hẹn mới', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'S2', 'STATUS', 'Confirmed', 'Đã xác nhận', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'S3', 'STATUS', 'Done', 'Đã khám xong', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'S4', 'STATUS', 'Cancel', 'Đã hủy', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'T1', 'TIME', '8:00 AM - 9:00 AM', '8:00 - 9:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'T2', 'TIME', '9:00 AM - 10:00 AM', '9:00 - 10:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'T3', 'TIME', '10:00 AM - 11:00 AM', '10:00 - 11:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'T4', 'TIME', '11:00 AM - 0:00 PM', '11:00 - 12:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'T5', 'TIME', '1:00 PM - 2:00 PM', '13:00 - 14:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'T6', 'TIME', '2:00 PM - 3:00 PM', '14:00 - 15:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'T7', 'TIME', '3:00 PM - 4:00 PM', '15:00 - 16:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'T8', 'TIME', '4:00 PM - 5:00 PM', '16:00 - 17:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'P0', 'POSITION', 'None', 'Bác sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'P1', 'POSITION', 'Master', 'Thạc sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'P2', 'POSITION', 'Doctor', 'Tiến sĩ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'P3', 'POSITION', 'Associate Professor', 'Phó giáo sư', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'P4', 'POSITION', 'Professor', 'Giáo sư', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'M', 'GENDER', 'Male', 'Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'F', 'GENDER', 'Female', 'Nữ', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'O', 'GENDER', 'Other', 'Khác', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `statusId` varchar(255) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `patientId` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `timeType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `clinics`
--

CREATE TABLE `clinics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctor_clinic_specialty`
--

CREATE TABLE `doctor_clinic_specialty` (
  `id` int(11) NOT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `clinicId` int(11) DEFAULT NULL,
  `specialtyId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `patientId` int(11) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `files` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `currentNumber` int(11) DEFAULT NULL,
  `maxNumber` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `timeType` varchar(255) DEFAULT NULL,
  `doctorId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('migration-create-allcode.js'),
('migration-create-booking.js'),
('migration-create-clinic.js'),
('migration-create-doctor-clinic-specialty.js'),
('migration-create-history.js'),
('migration-create-schedule.js'),
('migration-create-specialty.js'),
('migration-create-user.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `specialties`
--

CREATE TABLE `specialties` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenumber` tinyint(1) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `roleId` tinyint(1) DEFAULT NULL,
  `positionId` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `address`, `phonenumber`, `gender`, `image`, `roleId`, `positionId`, `createdAt`, `updatedAt`) VALUES
(2, 'tranthengoc@gmail.com', '$2a$10$c7WSCgycyXLAjf9o9m9SCOk0szhJN4vAw6z.ZkscBk68bvtRtLu7u', 'hạo', 'nam', 'nguyễn huệ, sửa edit', 127, 1, NULL, 1, NULL, '2023-03-21 04:46:52', '2023-05-06 16:52:27'),
(13, 'vanthanh@gmail.com', '$2a$10$TzT4PU/oO0ZueXh/nW.lJeyvfw5q7VSSomZhhBj7W4BF7HBm8j1JW', 'van', 'thanh', 'van hong hanh TP Hà Nội', 127, 1, NULL, 7, NULL, '2023-03-24 22:16:06', '2023-03-24 22:16:06'),
(14, 'quantinh@gmail.com', '$2a$10$uqHE7enan9rl94xu8ghEeO1zdx4WFAUcW89QCP/eSgK2win3MPxR.', 'Hà', 'Tính', 'k245 Âu Cơ, TP Đà Nẵng', 127, 1, NULL, 1, NULL, '2023-04-14 10:28:38', '2023-04-14 10:28:38'),
(23, 'hoidanit@gmail.com', '$2a$10$uDWwV4N7k18OfDYnewY1W.vnH8M2vwNMiNzSk8tV/7ufBkwC4YFaK', 'hoi', 'dan', 'it phuong xa', NULL, 0, NULL, NULL, NULL, '2023-05-03 23:42:50', '2023-05-03 23:42:50'),
(24, 'tranvannam@gmail.com', '$2a$10$Eb92ocuclaoBPj.04n1esuUllhVwe5HB1wp5trkpTR5PAI5hbR.2W', 'van', 'dan', 'hoang hoa tham, hai chau', NULL, 0, NULL, NULL, NULL, '2023-05-04 10:39:06', '2023-05-04 10:39:06'),
(26, 'tranthenhat@gmai.com', '$2a$10$nhw/WoOGzVh66jnKyPIaiugc2/k.R7EAoNaMRUzHeD/O4Xk8wg8ZG', 'nguyen', 'the', 'hoàng hoa thám ', NULL, 0, NULL, NULL, NULL, '2023-05-06 12:41:36', '2023-05-06 12:41:36'),
(28, 'htinh7444@gmail.com', '$2a$10$NLptNFRDA1iT5dwbr82fauYN5rQLY9NkHaXFUr1kdmxS9Q7ZinNm2', 'Hà', 'Tính', 'k245 Âu Cơ, TP Đà Nẵng', NULL, 0, NULL, NULL, NULL, '2023-05-06 16:20:23', '2023-05-06 16:20:23'),
(29, 'nguyenvannhung@gmail.com', '$2a$10$swDmBBjTBkxJCnu8Mq/UzuWqVxjksqMrG5O4iEKuwNU3aGOW6fpY2', 'van', 'nhung', 'trường chinh, TP Đà Nẵng', NULL, 0, NULL, NULL, NULL, '2023-05-06 16:41:04', '2023-05-06 16:41:04'),
(30, 'haodan@gmail.com', '$2a$10$swDmBBjTBkxJCnu8Mq/UzuWqVxjksqMrG5O4iEKuwNU3aGOW6fpY2', 'hạo', 'dân', 'nguyễn huệ', NULL, 0, NULL, NULL, NULL, '2023-05-06 16:42:08', '2023-05-06 16:42:08'),
(31, 'tranminhdang@gmail.com', '$2a$10$/3ny0ObUCBjOd7YogIdsm.wIJoJUKxOhEL8bdpMsuA68sLemjACue', 'minh', 'dang', 'k245 Âu Cơ, TP Đà Nẵng, Hà Nội', NULL, 0, NULL, NULL, NULL, '2023-05-17 22:52:04', '2023-05-17 22:52:04');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `allcodes`
--
ALTER TABLE `allcodes`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `clinics`
--
ALTER TABLE `clinics`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `doctor_clinic_specialty`
--
ALTER TABLE `doctor_clinic_specialty`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `allcodes`
--
ALTER TABLE `allcodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `clinics`
--
ALTER TABLE `clinics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `doctor_clinic_specialty`
--
ALTER TABLE `doctor_clinic_specialty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `specialties`
--
ALTER TABLE `specialties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
