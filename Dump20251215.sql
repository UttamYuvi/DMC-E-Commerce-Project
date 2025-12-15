-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: infinohop
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `addressLine` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `landmark` varchar(150) DEFAULT NULL,
  `addressType` enum('home','work','other') DEFAULT 'home',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`addressId`),
  KEY `fk_address_user` (`userId`),
  CONSTRAINT `fk_address_user` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_pincode_length` CHECK ((char_length(`pincode`) between 4 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,5,'3238 Banjarwara','rewari','haryana','india','123401','near mohit bakery','work','2025-12-15 09:08:31'),(2,6,'2003 TCG, Hinjewadi, Phase-2','Pune','Maharashtra','India','123401','near infosys company','work','2025-12-15 09:29:26');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administration`
--

DROP TABLE IF EXISTS `administration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administration` (
  `adminId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `priority` enum('owner','manager','employee') DEFAULT 'owner',
  `verificationId` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`adminId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administration`
--

LOCK TABLES `administration` WRITE;
/*!40000 ALTER TABLE `administration` DISABLE KEYS */;
/*!40000 ALTER TABLE `administration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` text,
  PRIMARY KEY (`categoryId`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (39,'mens','2025-12-13 09:04:39',NULL),(40,'womens','2025-12-13 09:04:39',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery` (
  `deliveryId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `vendorId` int NOT NULL,
  `deliveryStatus` enum('pending','out_for_delivery','delivered','returned') DEFAULT 'pending',
  `estimatedDeliveryDate` date DEFAULT NULL,
  `actualDeliveryDate` date DEFAULT NULL,
  `trackingNumber` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`deliveryId`),
  KEY `orderId` (`orderId`),
  KEY `vendorId` (`vendorId`),
  CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderid`),
  CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`vendorid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery`
--

LOCK TABLES `delivery` WRITE;
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `orderDetailId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` double DEFAULT NULL,
  PRIMARY KEY (`orderDetailId`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderid`),
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,2,2,2,1000.00,2000),(2,2,3,1,900.00,2900),(3,3,2,2,1000.00,2000),(4,3,3,1,900.00,900),(5,4,3,3,900.00,2700),(6,4,5,2,1800.00,3600),(7,5,2,1,1000.00,1000),(8,5,6,2,3000.00,6000);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `paymentStatus` enum('pending','paid','failed') DEFAULT 'pending',
  `orderStatus` enum('placed','shipped','delivered','cancelled') DEFAULT 'placed',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `addressId` int DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  KEY `userId` (`userId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,1,2900.00,'paid','shipped','2025-10-24 16:46:48',1),(3,2,2900.00,'paid','shipped','2025-10-24 17:24:49',1),(4,5,6300.00,'pending','shipped','2025-12-15 09:22:05',1),(5,6,7000.00,'pending','shipped','2025-12-15 09:33:51',2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL AUTO_INCREMENT,
  `vendorId` int NOT NULL,
  `subCategoryId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int DEFAULT '0',
  `status` enum('continue','discontinue') DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`productId`),
  KEY `vendorId` (`vendorId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`vendorid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,1,1,1,'NIKE','Nike AirForce White',1000.00,5,'continue','2025-10-21 22:03:23'),(3,2,1,1,'Addidas','Black Lether Jacket',900.00,0,'discontinue','2025-10-21 23:22:49'),(4,1,2,1,'Puma','Puma MotorSport Black',2000.00,4,'continue','2025-10-21 23:28:14'),(5,1,2,1,'Levis','StraightFit Blue',1800.00,4,'continue','2025-10-22 07:29:30'),(6,4,1,1,'Addidas','Puma jacket',3000.00,0,'discontinue','2025-12-13 19:22:41'),(7,4,4,2,'Shoes','Black Jordan',9000.00,6,'continue','2025-12-14 07:17:34');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategories` (
  `subCategoryId` int NOT NULL AUTO_INCREMENT,
  `categoryId` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `vendorId` int NOT NULL,
  PRIMARY KEY (`subCategoryId`),
  KEY `categoryId` (`categoryId`),
  KEY `fk_subcategories_vendor` (`vendorId`),
  CONSTRAINT `fk_subcategories_vendor` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`vendorId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `subcategories_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (4,39,'shirt','2025-12-13 10:21:52',4),(5,39,'pant','2025-12-13 10:22:04',4),(6,40,'pant','2025-12-13 10:22:08',5),(7,40,'jacket','2025-12-13 11:31:56',4);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usercredentials`
--

DROP TABLE IF EXISTS `usercredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercredentials` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercredentials`
--

LOCK TABLES `usercredentials` WRITE;
/*!40000 ALTER TABLE `usercredentials` DISABLE KEYS */;
INSERT INTO `usercredentials` VALUES (1,'testing@gmail.com','$2a$10$BFcVXP9D1GNvqjMxCaUwIuIXFpbQ66LiTu1SOVjOX/hVG9MMF1Ja.'),(2,'jatin@gmail.com','$2a$10$9XDmk7YEKXrRD9N.sQ/3Eu0mvCp9NlAYQG2Zl0divazDH3hoCTMYi'),(3,'jayesh@gmail.com','$2a$10$aqBKrlSrDTbmtimBSDfQu.DI01dgcfsJaRyB0O/bNrYPLpRxOWJS2'),(4,'test@gmail.com','$2a$10$R4rSMTV85IMOcSggvXjOseSwJcCcHkNbXvUi2BBO0YE91dOcSgvce');
/*!40000 ALTER TABLE `usercredentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `gender` enum('male','female','others') DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(25) DEFAULT 'USER',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'u0','0u','test@gmail.com','9876543210','male','test','2025-10-20 18:11:55','USER'),(2,'u1','1u','u1@gmail.com','7619493210','female','u1234','2025-10-22 11:58:54','USER'),(3,'new','person','new@gmail.com','8843332766','male','$2a$10$.gpCF46y/g2lk13LZtpNVOxVwHwj80EG7IhNHAeWIQzCTJM8hlrv2','2025-11-11 12:35:01','USER'),(4,'uttammmmm','vermaaaaaa','uttam@gmail.com','8888777766','male','$2a$10$.XzL0.gVpy7SfMxoY.0Yn.iH70HZX3NHOlIYNIwrKork/uPegPVB.','2025-11-11 13:21:31','USER'),(5,'jatin','arora','jatin@gmail.com',NULL,NULL,'$2a$10$BbGGtV4WXIqvrUPF9FtB9eJN6dHUKNwSj4IO8kFOTR/eZbm41Q3/K','2025-11-15 13:27:35','USER'),(6,'jayesh','joshi','jayesh@gmail.com','8888888888','male','$2a$10$N0N8uYrA6rXNm4qdaovwq.DGKpFLyo6PWKNzLeYLV7sFuLNX4CCg.','2025-12-14 05:30:12','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor_categories`
--

DROP TABLE IF EXISTS `vendor_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `vendorId` int NOT NULL,
  `categoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_vendor_category` (`vendorId`,`categoryId`),
  KEY `fk_vendor_categories_category` (`categoryId`),
  CONSTRAINT `fk_vendor_categories_category` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vendor_categories_vendor` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`vendorId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor_categories`
--

LOCK TABLES `vendor_categories` WRITE;
/*!40000 ALTER TABLE `vendor_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `vendorId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `subscriptionStatus` enum('active','inactive') DEFAULT 'inactive',
  `commissionRate` decimal(5,2) DEFAULT '0.00',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` varchar(25) DEFAULT 'VENDOR',
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`vendorId`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `vendorId_UNIQUE` (`vendorId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'','','test@gmail.com','','9876543210','active',50.00,'2025-10-21 22:01:38','VENDOR','2025-12-01 18:03:51'),(2,'','','v1@gmail.com','','1234567890','active',0.00,'2025-10-22 10:28:14','VENDOR','2025-12-01 18:03:51'),(3,'','','vendor101@gmail.com','','9876789989',NULL,0.00,'2025-11-22 19:22:30','VENDOR','2025-12-01 18:03:51'),(4,'Jatin','Arora','jatin@gmail.com','$2a$10$Xzgx.3pXn.sPwPCJVm/lb.bjjZ/bZKGBL7nzvZsmbRa8W0YVmmJWy','6350451333',NULL,0.00,'2025-12-04 04:21:07','VENDOR','2025-12-04 04:21:07'),(5,'vendor','vend','vendor1@gmail.com','$2a$10$Y3deUNPqQABNi8y6ruqR.u1hzNEGpSsyJI3DsjkzlcrCzKHZKne3q','7894561233',NULL,0.00,'2025-12-04 06:35:39','VENDOR','2025-12-04 06:35:39'),(6,'Uttam','verma','uttam@gmail.com','$2a$10$/NNHoFYLzKUaGzrqG6p1Z.r3Zf17ZhGGhSgf7R/r6JVPfkZGoAayO','9999999999',NULL,0.00,'2025-12-14 05:09:16','VENDOR','2025-12-14 05:09:16');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-15 17:35:00
