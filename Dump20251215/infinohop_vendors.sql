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

-- Dump completed on 2025-12-15 16:02:10
