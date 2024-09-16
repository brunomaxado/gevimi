-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: gevimi
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` int(1) DEFAULT NULL,
  `status` int(1) DEFAULT NULL,
  `forma_pagamento` int(1) DEFAULT NULL,
  `observacao` text DEFAULT NULL,
  `data_para_entregar` datetime DEFAULT NULL,
  `data_finalizado` datetime DEFAULT NULL,
  `data_realizado` datetime DEFAULT current_timestamp(),
  `fk_id_usuario` int(11) NOT NULL,
  `fk_id_cliente` int(11) DEFAULT NULL,
  `preco_total` decimal(10,2) DEFAULT NULL,
  `data_deletado` datetime DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedido_usuario` (`fk_id_usuario`),
  KEY `fk_pedido_cliente` (`fk_id_cliente`),
  CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`fk_id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,1,1,1,'','2024-09-16 04:25:00','2024-09-16 04:21:23','2024-09-16 04:21:18',9,22,NULL,NULL),(2,2,1,1,'','2024-09-16 05:39:00','2024-09-16 04:36:32','2024-09-16 04:36:23',9,22,NULL,NULL),(3,3,1,1,'','0000-00-00 00:00:00','2024-09-16 04:45:32','2024-09-16 04:45:32',9,22,NULL,'2024-09-16 04:52:43'),(4,1,1,2,'','2024-09-16 04:54:00','2024-09-16 04:54:24','2024-09-16 04:53:17',9,22,NULL,'2024-09-16 04:55:03'),(5,2,3,2,'','2024-09-16 04:59:00',NULL,'2024-09-16 04:53:46',9,22,NULL,'2024-09-16 04:54:56'),(6,1,3,1,'','2024-09-16 05:02:00',NULL,'2024-09-16 05:01:07',11,22,NULL,NULL),(7,1,3,1,'','2024-09-16 05:53:00',NULL,'2024-09-16 05:04:13',11,22,NULL,NULL),(8,2,1,1,'','2024-09-16 05:35:00','2024-09-16 05:12:57','2024-09-16 05:04:35',11,22,NULL,NULL),(9,2,1,3,'','2024-10-01 05:08:00','2024-09-16 10:03:11','2024-09-16 05:04:48',11,22,NULL,NULL);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-16 11:29:10
