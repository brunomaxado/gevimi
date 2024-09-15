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
  `tipo` varchar(25) NOT NULL,
  `status` varchar(25) NOT NULL,
  `forma_pagamento` varchar(25) NOT NULL,
  `observacao` text DEFAULT NULL,
  `data_para_entregar` datetime DEFAULT NULL,
  `data_entrega_finalizada` datetime DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (2,'delivery','','cartão','Entregar sem tocar a campainha','2024-09-12 00:00:00',NULL,'2024-09-10 00:00:00',3,7,NULL,NULL),(3,'delivery','','cartão','Entregar sem tocar a campainha','2024-09-12 00:00:00',NULL,'2024-09-10 00:00:00',3,7,NULL,NULL),(4,'delivery','','cartão','Entregar sem tocar a campainha','2024-09-12 00:00:00',NULL,'2024-09-10 00:00:00',3,7,NULL,NULL),(5,'delivery','','cartão','Entregar sem tocar a campainha','2024-09-12 00:00:00',NULL,'2024-09-10 00:00:00',3,7,NULL,NULL),(6,'delivery','','cartão','Entregar sem tocar a campainha','2024-09-12 00:00:00',NULL,'2024-09-10 00:00:00',3,7,NULL,NULL),(7,'delivery','','cartão','Entregar sem tocar a campainha','2024-09-12 00:00:00',NULL,'2024-09-10 00:00:00',3,7,NULL,NULL),(9,'entrega','','pix','a','2024-09-17 20:29:00',NULL,NULL,9,29,NULL,NULL),(10,'','','','','0000-00-00 00:00:00',NULL,NULL,11,NULL,NULL,NULL),(11,'','','','','0000-00-00 00:00:00',NULL,NULL,11,NULL,NULL,NULL),(12,'','','','','0000-00-00 00:00:00',NULL,NULL,11,NULL,NULL,NULL),(13,'','','','','0000-00-00 00:00:00',NULL,NULL,11,NULL,NULL,NULL),(14,'','','','','0000-00-00 00:00:00',NULL,NULL,11,NULL,NULL,NULL),(15,'','','','','0000-00-00 00:00:00',NULL,NULL,11,NULL,NULL,NULL),(16,'','','','','0000-00-00 00:00:00',NULL,NULL,11,NULL,NULL,NULL),(17,'delivery','','cartão','Entregar sem tocar a campainha','2024-09-12 00:00:00',NULL,'2024-09-10 00:00:00',3,7,NULL,NULL),(18,'entrega','','dinheiro','obaa','2024-09-09 22:55:00',NULL,NULL,11,15,NULL,NULL),(19,'','','pix','aaa','0000-00-00 00:00:00',NULL,NULL,9,2,NULL,NULL),(20,'entrega_ifood','','debito','','2024-09-04 15:24:00',NULL,NULL,9,2,NULL,NULL),(21,'','','','','0000-00-00 00:00:00',NULL,NULL,9,NULL,NULL,NULL),(22,'retirada','','pix','','0000-00-00 00:00:00',NULL,NULL,9,17,NULL,NULL);
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

-- Dump completed on 2024-09-15 18:32:44
