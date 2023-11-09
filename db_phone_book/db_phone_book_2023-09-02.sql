# ************************************************************
# Sequel Ace SQL dump
# Version 20050
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 8.1.0)
# Database: db_phone_book
# Generation Time: 2023-09-02 05:15:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `name` char(50) NOT NULL,
  `icon` char(100) DEFAULT NULL,
  `slug` char(60) NOT NULL,
  `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  `uuid` varchar(100) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`name`, `icon`, `slug`, `createdDate`, `updateDate`, `deletedDate`, `uuid`)
VALUES
	('People','people','people','2023-08-24 16:47:29.288869','2023-08-24 16:47:29.288869',NULL,'179d6914-fdca-4364-a7a8-f9d16bd3cea5'),
	('Office','office','office','2023-08-24 16:48:05.143213','2023-08-24 16:48:05.143213',NULL,'2cafa395-e245-4778-8c7e-5ba54080c939');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table collection
# ------------------------------------------------------------

DROP TABLE IF EXISTS `collection`;

CREATE TABLE `collection` (
  `name` char(50) NOT NULL,
  `type` char(60) NOT NULL DEFAULT 'contact',
  `image` varchar(255) DEFAULT NULL,
  `slug` char(60) NOT NULL,
  `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  `uuid` varchar(100) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;

INSERT INTO `collection` (`name`, `type`, `image`, `slug`, `createdDate`, `updateDate`, `deletedDate`, `uuid`)
VALUES
	('Family','contact','http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png','family','2023-08-24 16:49:05.628610','2023-08-24 16:49:12.030334',NULL,'7fb5d505-5021-4a97-9a85-e204c2f5ba8c'),
	('Friend','contact','http://s3.amazonaws.com/redqteam.com/pickbazar/banana_thumb.png','friend','2023-08-24 16:49:49.484248','2023-08-24 16:49:49.484248',NULL,'dd514332-81cb-4528-8a08-192774c62586');

/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) DEFAULT NULL,
  `password` char(120) NOT NULL,
  `firstName` char(30) NOT NULL,
  `lastName` char(30) DEFAULT NULL,
  `userName` char(70) NOT NULL,
  `birthdayDate` char(20) DEFAULT NULL,
  `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `uuid`, `password`, `firstName`, `lastName`, `userName`, `birthdayDate`, `createdDate`, `updateDate`, `deletedDate`)
VALUES
	(1,'de4e31bd-393d-40f7-86ae-ce8e25d81b00','Password8','Bayu','Syaits','bayuSyaits','1993-04-24','2023-08-24 15:59:29.077228','2023-08-24 15:59:29.077228',NULL);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table book
# ------------------------------------------------------------

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
  `name` char(50) NOT NULL,
  `description` text,
  `address` text,
  `email` varchar(50) DEFAULT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `type` char(20) DEFAULT NULL,
  `gallery` text,
  `image` varchar(255) DEFAULT NULL,
  `slug` char(60) NOT NULL,
  `userUuid` char(100) DEFAULT NULL,
  `status` enum('offline','online') NOT NULL DEFAULT 'online',
  `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  `uuid` varchar(100) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;

INSERT INTO `book` (`name`,`userUuid`, `description`, `email`, `phoneNumber`, `address`, `type`, `gallery`, `image`, `slug`, `status`, `createdDate`, `updateDate`, `deletedDate`, `uuid`)
VALUES
	('Bayu Syaits','de4e31bd-393d-40f7-86ae-ce8e25d81b00','Lorem Ipsum is simply dummy text.','bayu@agenlaku.com','0823984892111','Kebayoran Lama, Jakarta Selatan','contact','[{\"image\":\"http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg\"}]','http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg','bayu-syaits','online','2023-08-30 06:16:51.507261','2023-08-30 16:54:02.079023',NULL,'8db0a347-c8a8-4954-a5f5-5f4f21bc1382'),
	('Alia Mutia','de4e31bd-393d-40f7-86ae-ce8e25d81b00','Lorem Ipsum is simply dummy text.','alia@agenlaku.com','0823984892113','Kebayoran Lama, Jakarta Selatan','contact','[{\"image\":\"http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg\"}]','http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg','alia-mutia','online','2023-08-30 06:16:51.507261','2023-08-30 16:53:59.372659',NULL,'ef920390-a82e-4f20-9e4f-b1ad3baca9ca');

/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table book_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `book_category`;

CREATE TABLE `book_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(100) DEFAULT NULL,
  `userUuid` char(100) DEFAULT NULL,
  `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  `bookUuid` char(100) DEFAULT NULL,
  `categoryUuid` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c3d50a9276f1b3a7ce7eca0253d` (`bookUuid`),
  KEY `FK_8c23f18bc7c2e1d2dab519fe82b` (`categoryUuid`),
  CONSTRAINT `FK_8c23f18bc7c2e1d2dab519fe82b` FOREIGN KEY (`categoryUuid`) REFERENCES `category` (`uuid`),
  CONSTRAINT `FK_c3d50a9276f1b3a7ce7eca0253d` FOREIGN KEY (`bookUuid`) REFERENCES `book` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `book_category` WRITE;
/*!40000 ALTER TABLE `book_category` DISABLE KEYS */;

INSERT INTO `book_category` (`id`, `uuid`, `userUuid`, `createdDate`, `updateDate`, `deletedDate`, `bookUuid`, `categoryUuid`)
VALUES
	(1,'9b74e6b8-32d2-4ffd-a0fc-eb55b8996ac7','de4e31bd-393d-40f7-86ae-ce8e25d81b00','2023-08-30 06:24:16.421626','2023-08-30 06:24:53.604785',NULL,'8db0a347-c8a8-4954-a5f5-5f4f21bc1382','179d6914-fdca-4364-a7a8-f9d16bd3cea5'),
	(2,'ee7367b8-32db-4f05-8830-96c89ec247fd','de4e31bd-393d-40f7-86ae-ce8e25d81b00','2023-08-30 06:24:16.421626','2023-08-30 06:25:33.679747',NULL,'8db0a347-c8a8-4954-a5f5-5f4f21bc1382','2cafa395-e245-4778-8c7e-5ba54080c939'),
	(3,'81daa4f0-46f5-4f7d-8069-e68f24628afc','de4e31bd-393d-40f7-86ae-ce8e25d81b00','2023-08-30 06:24:16.421626','2023-08-30 06:27:20.107806',NULL,'ef920390-a82e-4f20-9e4f-b1ad3baca9ca','2cafa395-e245-4778-8c7e-5ba54080c939');

/*!40000 ALTER TABLE `book_category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table book_collection
# ------------------------------------------------------------

DROP TABLE IF EXISTS `book_collection`;

CREATE TABLE `book_collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(100) DEFAULT NULL,
  `userUuid` char(100) DEFAULT NULL,
  `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedDate` datetime(6) DEFAULT NULL,
  `bookUuid` char(100) DEFAULT NULL,
  `collectionUuid` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ecbeeb02d7c6a988e138a801ab` (`uuid`),
  KEY `FK_055b8398ab98e8d9605246dd78d` (`bookUuid`),
  KEY `FK_26918fb061771063518a8e0a0b9` (`collectionUuid`),
  CONSTRAINT `FK_055b8398ab98e8d9605246dd78d` FOREIGN KEY (`bookUuid`) REFERENCES `book` (`uuid`),
  CONSTRAINT `FK_26918fb061771063518a8e0a0b9` FOREIGN KEY (`collectionUuid`) REFERENCES `collection` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `book_collection` WRITE;
/*!40000 ALTER TABLE `book_collection` DISABLE KEYS */;

INSERT INTO `book_collection` (`id`, `uuid`, `userUuid`, `createdDate`, `updateDate`, `deletedDate`, `bookUuid`, `collectionUuid`)
VALUES
	(1,'a30d5295-9342-4d18-9f60-6f5f84753d69','de4e31bd-393d-40f7-86ae-ce8e25d81b00','2023-09-01 09:48:09.544504','2023-09-01 09:48:09.544504',NULL,'ef920390-a82e-4f20-9e4f-b1ad3baca9ca','7fb5d505-5021-4a97-9a85-e204c2f5ba8c'),
	(2,'ba29b004-9a62-492d-8c5d-04e6f967c888','de4e31bd-393d-40f7-86ae-ce8e25d81b00','2023-09-01 10:04:17.592462','2023-09-01 10:04:17.592462',NULL,'ef920390-a82e-4f20-9e4f-b1ad3baca9ca','dd514332-81cb-4528-8a08-192774c62586');

/*!40000 ALTER TABLE `book_collection` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
