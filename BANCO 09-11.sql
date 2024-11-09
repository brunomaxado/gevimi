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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(25) NOT NULL,
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (79,'com carnee'),(48,'com carneee'),(81,'isadsa'),(80,'iuuuuu'),(67,'macas'),(19,'massa'),(51,'molhos'),(47,'pasteis'),(62,'periosos'),(20,'sei la'),(1,'Suco'),(41,'tererê'),(76,'tortas');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `celular` varchar(11) DEFAULT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `logradouro` varchar(255) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Carlos Alberto Souza','34802226098','42991456495','84030320','121','AP 10 302','Ponta Grossa','Uvaranas',''),(12,'Ricardo Soares','60454328001','84430000','84430000','Rua Valerio Ronchi','23','Imbituva','Uvaranas','não tem'),(13,'Maria Duarte','33646805072','42991456495','84430000','Rua Valerio Ronchi','2','imbituva','Uvaranas',''),(93,'Ana Maria','12345678909','11987654321','12345678','Rua das Flores','10','São Paulo','Centro','Cliente regular'),(102,'Bruno Silva','98765432100','11987654322','23456789','Av. Brasil','11','Rio de Janeiro','Zona Sul','Prefere contato por WhatsApp'),(106,'Fernanda Lima','33344455522','11987654326','67890123','Rua Haddock Lobo','15','Rio de Janeiro','Botafogo','Deseja novidades por e-mail'),(107,'Gabriel Santos','12312312312','11987654327','78901234','Av. Faria Lima','16','São Paulo','Itaim Bibi','Cliente antigo'),(108,'Heloísa Rocha','97688481031','11987654328','89012345','Rua Oscar Freire','17','São Paulo','Jardim América','Cliente regular'),(111,'Kaio Martins','22233344455','11987654331','23456780','Rua da Consolação','20','São Paulo','Consolação','Cliente fiel'),(112,'Larissa Borges','55555555555','11987654332','34567890','Rua Vergueiro','21','São Paulo','Paraíso','Visita a loja frequentemente'),(113,'Matheus Ramos','66677788899','11987654333','45678901','Av. República do Líbano','22','São Paulo','Moema','Recebe recomendações de produtos'),(115,'Otávio Barros','33322211109','11987654335','67890123','Rua Domingos de Morais','24','São Paulo','Vila Mariana','Atendimento personalizado'),(116,'Paula Andrade','22222222222','11987654336','78901234','Av. Morumbi','25','São Paulo','Morumbi','Cliente premium'),(120,'Silvio Costa','11122233355','11987654339','12345678','Av. Brigadeiro','28','São Paulo','Vila Buarque','Cliente frequente'),(121,'Tatiana Lopes','33344455566','11987654340','23456789','Rua São Bento','29','São Paulo','Centro Histórico','Novidade em produtos'),(124,'Wellington Medeiros','44433322211','11987654343','56789012','Rua Consolação','32','São Paulo','Paulista','Preferência por WhatsApp'),(125,'Xavier Monteiro','22211100099','11987654344','67890123','Rua Boa Vista','33','São Paulo','Sé','Comprador assíduo'),(126,'Yasmin Pereira','77766655544','11987654345','78901234','Rua Direita','34','São Paulo','Sé','Atendimento de luxo'),(127,'Thais Fabiana Haus','12888455960','42998423196','84430000','joi','AP 10 302','Imbituva','h',''),(128,'Bruno Machado','44422800027','4299145','8443000','dsa','dsad','Imbituva','dsa',''),(140,'João Souza Silva','896.280.250','(11) 98765-','30260-08','Avenida Churchill','2','Belo Horizonte','Santa Efigênia',''),(141,'2','11157349978','11987654321','30260080','Avenida Churchill','2','Belo Horizonte','Santa Efigênia',''),(142,'Vai se fuder','78541295095','12131232132','32132132','dsadsa','13','312','dsada',''),(143,'amaciante','08615000085','11987654322','84430000','FSD','AP 10 302','Imbituva','FDD','a'),(144,'Luzia Matilda','88216003005','11111111111','84010080','Rua General Osório','AP 10 302','Ponta Grossa','Centro','dsa');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_pedido`
--

DROP TABLE IF EXISTS `item_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_pedido` (
  `id_item_pedido` int(11) NOT NULL AUTO_INCREMENT,
  `quantidade` int(11) NOT NULL,
  `fk_id_pedido` int(11) NOT NULL,
  `fk_id_produto` int(11) NOT NULL,
  `preco_unitario_atual` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_item_pedido`),
  KEY `fk_item_pedido_pedido` (`fk_id_pedido`),
  KEY `fk_item_pedido_produto` (`fk_id_produto`),
  CONSTRAINT `fk_item_pedido_pedido` FOREIGN KEY (`fk_id_pedido`) REFERENCES `pedido` (`id_pedido`),
  CONSTRAINT `fk_item_pedido_produto` FOREIGN KEY (`fk_id_produto`) REFERENCES `produto` (`id_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_pedido`
--

LOCK TABLES `item_pedido` WRITE;
/*!40000 ALTER TABLE `item_pedido` DISABLE KEYS */;
INSERT INTO `item_pedido` VALUES (1,1,1,2,156.00),(2,1,2,2,156.00),(3,2,3,4,123.00),(4,1,3,2,156.00),(5,3,4,2,156.00),(6,1,4,7,12.00),(7,1,5,5,213.00),(8,1,6,4,123.00),(9,1,7,2,156.00),(11,1,9,5,1.00),(13,1,11,2,100.00),(18,2,18,4,50.00),(19,1,18,4,100.00),(24,2,21,4,50.00),(25,1,21,4,100.00),(26,2,22,4,50.00),(27,1,22,4,100.00),(28,2,23,4,50.00),(29,1,23,4,100.00),(40,2,29,4,50.00),(41,1,29,4,100.00),(42,2,30,4,50.00),(43,1,30,4,100.00),(44,2,31,4,50.00),(45,1,31,4,100.00),(46,2,32,4,50.00),(47,1,32,4,100.00),(48,2,33,4,50.00),(49,1,33,4,100.00),(50,2,34,4,50.00),(51,1,34,4,100.00),(52,2,35,4,50.00),(53,1,35,4,100.00),(54,2,36,4,50.00),(55,1,36,4,100.00),(56,2,37,4,50.00),(57,1,37,4,100.00),(58,2,38,4,50.00),(59,1,38,4,100.00),(60,2,39,4,50.00),(61,1,39,4,100.00),(62,2,40,4,50.00),(63,1,40,4,100.00),(64,2,41,4,50.00),(65,1,41,4,100.00),(66,2,42,4,50.00),(67,1,42,4,100.00),(68,2,43,4,50.00),(69,1,43,4,100.00),(70,2,44,4,50.00),(71,1,44,4,100.00),(72,2,45,4,50.00),(73,1,45,4,100.00),(74,2,46,4,50.00),(75,1,46,4,100.00),(76,2,47,4,50.00),(77,1,47,4,100.00),(78,1,48,6,0.00),(79,2,48,4,123.00),(80,1,48,15,29.99),(81,1,48,54,29.99),(82,1,48,53,29.99),(83,1,49,18,29.99),(84,2,49,39,29.99),(86,1,51,9,12.23),(87,1,52,6,0.00),(88,5,53,7,12.00),(89,1,53,9,12.23),(90,1,53,22,29.99),(91,2,54,9,12.23),(92,1,54,18,29.99),(108,1,58,14,1222.34),(109,2,58,18,29.99),(110,2,58,9,12.23),(111,1,58,46,29.99),(112,1,58,51,29.99),(113,1,59,14,1222.34),(114,2,59,18,29.99),(115,2,59,9,12.23),(116,1,59,46,29.99),(117,1,59,51,29.99),(118,1,60,14,1222.34),(119,2,60,18,29.99),(120,2,60,9,12.23),(121,1,60,46,29.99),(122,1,60,51,29.99),(123,1,61,14,1222.34),(124,2,61,18,29.99),(125,2,61,9,12.23),(126,1,61,46,29.99),(127,1,61,51,29.99),(128,1,62,14,1222.34),(129,2,62,18,29.99),(130,2,62,9,12.23),(131,1,62,46,29.99),(132,1,62,51,29.99),(138,1,64,9,12.23),(139,1,65,6,0.00),(140,1,66,7,12.00),(141,2,67,6,50.00),(142,1,68,5,1.00),(144,1,70,4,123.00),(145,5,71,18,29.99),(146,6,71,45,29.99),(147,1,71,7,12.00),(148,1,71,46,29.99),(149,2,72,53,29.99),(150,2,73,53,1.00),(151,1,74,7,12.00),(152,1,74,4,123.00),(153,1,75,6,50.00),(154,1,76,7,12.00),(155,1,77,5,1.00),(156,1,77,10,12.00),(157,1,77,14,1222.34),(158,1,77,15,29.99),(159,1,77,20,29.99),(160,1,77,19,29.99),(161,1,78,5,1.00),(162,1,79,19,29.99),(163,2,79,6,50.00),(164,1,80,4,123.00),(165,1,81,4,123.00),(166,1,82,6,50.00),(167,1,83,18,29.99),(168,1,84,5,1.00),(169,3,84,7,12.00),(170,1,85,4,123.00),(171,1,86,6,50.00),(172,1,87,5,1.00),(173,1,88,9,12.23),(174,2,89,4,123.00),(175,1,89,10,12.00),(176,1,89,9,12.23);
/*!40000 ALTER TABLE `item_pedido` ENABLE KEYS */;
UNLOCK TABLES;

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
  `frete` decimal(10,2) DEFAULT NULL,
  `fk_id_usuario` int(11) NOT NULL,
  `fk_id_cliente` int(11) DEFAULT NULL,
  `preco_total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_pedido_usuario` (`fk_id_usuario`),
  KEY `fk_pedido_cliente` (`fk_id_cliente`),
  CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (`fk_id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,3,1,2,'se mate imundo','0000-00-00 00:00:00','2024-10-16 00:24:30','2024-10-16 00:24:30',NULL,1,1,NULL),(2,2,1,3,'','2024-10-04 21:57:00','2024-10-17 21:55:10','2024-10-17 21:54:37',NULL,2,1,NULL),(3,3,1,2,'','0000-00-00 00:00:00','2024-10-18 19:13:55','2024-10-18 19:13:55',NULL,7,1,NULL),(4,2,1,1,'','2024-09-18 10:06:00','2024-10-26 16:56:28','2024-10-25 10:04:17',NULL,8,1,NULL),(5,1,1,3,'','2024-10-02 21:26:00','2024-10-27 21:39:32','2024-10-27 21:26:19',NULL,1,1,NULL),(6,2,1,3,'','2024-10-03 21:39:00','2024-10-28 15:22:51','2024-10-27 21:39:46',NULL,4,1,NULL),(7,2,1,3,'','2024-10-27 22:21:00','2024-10-27 23:20:21','2024-10-27 22:20:19',NULL,4,1,NULL),(9,3,1,2,'','0000-00-00 00:00:00','2024-10-28 15:51:39','2024-10-28 15:51:39',NULL,4,NULL,NULL),(11,1,1,2,'Entrega rápida','2024-11-05 10:00:00','2024-11-02 16:12:55','2024-11-02 15:57:46',NULL,1,1,NULL),(18,1,1,2,'Entrega rápida','2024-11-05 10:00:00','2024-11-05 23:03:48','2024-11-02 15:58:38',NULL,2,NULL,NULL),(21,1,1,2,'Entrega rápida','2024-11-05 10:00:00','2024-11-02 19:28:09','2024-11-02 15:58:42',NULL,2,NULL,NULL),(22,1,1,2,'Entrega rápida','2024-11-05 10:00:00','2024-11-02 18:58:01','2024-11-02 15:58:43',NULL,2,NULL,NULL),(23,1,1,2,'Entrega rápida','2024-11-05 10:00:00','2024-11-02 16:00:29','2024-11-02 15:58:44',NULL,2,NULL,NULL),(29,1,1,2,'Entrega rápida','2024-11-05 10:00:00','2024-11-02 18:59:21','2024-11-02 15:58:48',NULL,2,NULL,NULL),(30,1,1,2,'Entrega rápida','2024-11-05 10:00:00','2024-11-05 23:12:08','2024-11-02 15:58:49',NULL,2,NULL,NULL),(31,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 15:58:49',NULL,2,NULL,NULL),(32,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 15:58:50',NULL,2,NULL,NULL),(33,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 15:58:51',NULL,2,NULL,NULL),(34,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 15:58:51',NULL,2,NULL,NULL),(35,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 15:58:52',NULL,2,NULL,NULL),(36,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 15:58:52',NULL,2,NULL,NULL),(37,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 15:58:53',NULL,2,NULL,NULL),(38,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:25',NULL,2,NULL,NULL),(39,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:26',NULL,2,NULL,NULL),(40,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:27',NULL,2,NULL,NULL),(41,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:27',NULL,2,NULL,NULL),(42,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:28',NULL,2,NULL,NULL),(43,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:29',NULL,2,NULL,NULL),(44,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:29',NULL,2,NULL,NULL),(45,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:30',NULL,2,NULL,NULL),(46,1,1,2,'Entrega rápida','2024-11-05 10:00:00','2024-11-05 23:40:30','2024-11-02 18:56:30',NULL,2,NULL,NULL),(47,1,3,2,'Entrega rápida','2024-11-05 10:00:00',NULL,'2024-11-02 18:56:31',NULL,2,NULL,NULL),(48,1,1,2,'dsa','2024-11-05 15:57:00','2024-11-03 15:58:05','2024-11-03 15:57:18',NULL,4,112,NULL),(49,3,1,1,'cufdgfdf','2024-11-03 17:03:00','2024-11-03 16:06:23','2024-11-03 16:06:23',1.00,4,108,NULL),(51,4,3,2,'','0000-00-00 00:00:00',NULL,'2024-11-03 16:12:44',0.00,4,107,NULL),(52,4,1,2,'','0000-00-00 00:00:00','2024-11-03 19:13:19','2024-11-03 19:13:19',0.00,4,13,NULL),(53,4,1,2,'as','0000-00-00 00:00:00','2024-11-03 19:25:14','2024-11-03 19:25:14',0.00,4,1,NULL),(54,2,1,2,'','2024-11-21 19:44:00','2024-11-05 23:13:39','2024-11-03 19:44:50',40.00,4,108,NULL),(58,3,3,2,'','2024-11-03 23:27:00',NULL,'2024-11-03 21:29:11',122.00,4,13,NULL),(59,3,3,2,'','2024-11-03 23:27:00',NULL,'2024-11-03 21:29:13',122.00,4,13,NULL),(60,3,3,2,'','2024-11-03 23:27:00',NULL,'2024-11-03 21:29:13',122.00,4,13,NULL),(61,3,3,2,'','2024-11-03 23:27:00',NULL,'2024-11-03 21:29:13',122.00,4,13,NULL),(62,3,3,2,'','2024-11-03 23:27:00',NULL,'2024-11-03 21:29:14',122.00,4,13,NULL),(64,4,1,2,'','0000-00-00 00:00:00','2024-11-03 21:29:40','2024-11-03 21:29:40',0.00,4,12,NULL),(65,1,1,3,'','2024-11-03 21:33:00','2024-11-03 22:16:07','2024-11-03 21:32:29',0.00,4,108,NULL),(66,4,1,2,'minha mae querida','0000-00-00 00:00:00','2024-11-03 23:13:21','2024-11-03 23:13:21',0.00,4,107,NULL),(67,1,1,1,'','2024-11-03 23:35:00','2024-11-06 01:08:27','2024-11-03 23:33:39',7.00,4,13,NULL),(68,4,1,4,'dsa','0000-00-00 00:00:00','2024-11-03 23:39:36','2024-11-03 23:39:36',NULL,4,107,NULL),(70,4,1,2,'cliente ama pizza','0000-00-00 00:00:00','2024-11-03 23:45:23','2024-11-03 23:45:23',NULL,4,13,NULL),(71,4,1,2,'tudore','0000-00-00 00:00:00','2024-11-05 23:20:30','2024-11-05 23:20:30',NULL,4,112,NULL),(72,4,1,2,'','0000-00-00 00:00:00','2024-11-06 01:13:23','2024-11-06 01:13:23',NULL,4,124,NULL),(73,4,1,1,'','0000-00-00 00:00:00','2024-11-06 01:14:03','2024-11-06 01:14:03',NULL,4,124,NULL),(74,4,1,1,'','0000-00-00 00:00:00','2024-11-06 01:17:21','2024-11-06 01:17:21',NULL,4,120,NULL),(75,2,3,2,'','2024-11-06 01:22:00',NULL,'2024-11-06 01:19:14',2.00,4,124,NULL),(76,1,3,1,'','2024-11-06 02:53:00',NULL,'2024-11-06 02:48:59',321.00,4,125,NULL),(77,1,3,1,'','2024-11-06 08:25:00',NULL,'2024-11-06 03:19:40',123.00,4,121,NULL),(78,1,3,1,'','2024-11-06 04:10:00',NULL,'2024-11-06 03:20:46',0.00,4,125,NULL),(79,1,2,3,'As duas cocas já foram levadas.','2024-11-14 04:13:00',NULL,'2024-11-06 04:12:33',0.00,4,120,NULL),(80,4,1,2,'','0000-00-00 00:00:00','2024-11-06 10:18:18','2024-11-06 10:18:18',NULL,4,127,NULL),(81,4,1,2,'dd','0000-00-00 00:00:00','2024-11-07 01:49:17','2024-11-07 01:49:17',NULL,4,120,NULL),(82,1,3,2,'','2024-11-03 01:49:00',NULL,'2024-11-07 01:50:02',1.00,4,13,NULL),(83,4,1,2,'','0000-00-00 00:00:00','2024-11-07 01:52:27','2024-11-07 01:52:27',NULL,4,121,NULL),(84,1,3,1,'','2024-11-07 04:11:00',NULL,'2024-11-07 02:10:19',1222.22,4,116,NULL),(85,2,1,1,'minha mae querida','2024-11-07 02:14:00','2024-11-07 02:17:51','2024-11-07 02:11:16',12.22,4,124,NULL),(86,1,1,1,'','2024-11-07 02:15:00','2024-11-07 02:15:57','2024-11-07 02:14:21',1000.00,4,124,NULL),(87,3,3,1,'','2024-11-07 04:17:00',NULL,'2024-11-07 02:15:27',NULL,4,1,NULL),(88,1,3,1,'','2024-11-07 14:21:00',NULL,'2024-11-07 14:19:47',12.22,4,116,NULL),(89,3,2,1,'','2024-11-09 15:15:00',NULL,'2024-11-08 15:13:13',NULL,4,124,NULL);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id_produto` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `preco_unitario` decimal(10,2) NOT NULL,
  `fk_id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_produto`),
  UNIQUE KEY `nome` (`nome`),
  KEY `fk_produto_categoria` (`fk_id_categoria`),
  CONSTRAINT `fk_produto_categoria` FOREIGN KEY (`fk_id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (2,'pastel de carne','',156.00,48),(4,'pizza','mto gostosa essa pizza',123.00,19),(5,'Sucrilhos','123',1.00,41),(6,'oii','dsa',50.00,19),(7,'TESTE SUPREMO','TESTE SUPREMO',12.00,19),(9,'Hmm delicia','delicioso',12.23,20),(10,'suco','suco',12.00,19),(14,'Coca 600ml','',1222.34,19),(15,'Produto Exemplo','Descrição do produto exemplo.',29.99,1),(18,'Produto Exemplo3','Descrição do produto exemplo.',29.99,1),(19,'Produto Exemplo4','Descrição do produto exemplo.',29.99,1),(20,'Produto Exemplo5','Descrição do produto exemplo.',29.99,1),(22,'Produto Exemplo6','Descrição do produto exemplo.',29.99,1),(23,'Produto Exemplo7','Descrição do produto exemplo.',29.99,1),(24,'Produto Exemplo8','Descrição do produto exemplo.',29.99,1),(25,'Produto Exemplo9','Descrição do produto exemplo.',29.99,1),(26,'Produto Exemplo10','Descrição do produto exemplo.',29.99,1),(27,'Produto Exemplo11','Descrição do produto exemplo.',29.99,1),(28,'Produto Exemplo12','Descrição do produto exemplo.',29.99,1),(29,'Produto Exemplo13','Descrição do produto exemplo.',29.99,1),(32,'Produto Exemplo16','Descrição do produto exemplo.',29.99,1),(35,'Produto Exemplo19','Descrição do produto exemplo.',29.99,1),(37,'Produto Exemplo21','Descrição do produto exemplo.',29.99,1),(38,'Produto Exemplo22','Descrição do produto exemplo.',29.99,1),(39,'Produto Exemplo23','Descrição do produto exemplo.',29.99,1),(41,'Produto Exemplo2333','Descrição do produto exemplo.',29.99,1),(43,'Produto Exemplo25','Descrição do produto exemplo.',29.99,1),(44,'Produto Exemplo26','Descrição do produto exemplo.',29.99,1),(45,'Produto Exemplo27','Descrição do produto exemplo.',29.99,1),(46,'Sabonete','Descrição do produto exemplo.',29.99,1),(48,'v','Descrição do produto exemplo.',29.99,1),(51,'d','Descrição do produto exemplo.',29.99,1),(52,'ww','Descrição do produto exemplo.',29.99,1),(53,'wgd','Descrição do produto exemplo.',1.00,76),(54,'whf','Descrição do produto exemplo.',29.99,1),(55,'was','Descrição do produto exemplo.',29.99,1),(56,'whgd','Descrição do produto exemplo.',29.99,1),(57,'whfd','Descrição do produto exemplo.',29.99,1),(58,'Hehe','dsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadasdsadsadas',1212.00,19),(61,'bala da milena','minion',0.00,51),(64,'TESTE','',0.00,1),(66,'00003','dsa',0.00,20),(67,'0dfe','',11.12,41),(68,'dsa','',65.66,1),(69,'099','',2.33,41);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_criado` datetime NOT NULL DEFAULT current_timestamp(),
  `administrador` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'0a','teste','$2a$10$S/99wslaPxc/Xwvqmf1eZe6RHZ2.b4MAbXxAyJiiY0/dANlGjof7S','0000-00-00 00:00:00',1),(2,'Bruno Machadorr','bruno.machado','$2a$10$kTNuI920/eqlbZ2YvxLj5uHlW0nS.ckSOiuEC8uAISizvNVUYjMk6','2024-10-16 23:14:20',1),(4,'USER FOUNDED','morra','$2a$10$QY8YHovf8osElKciRDGgJu1UdRQMdCqetjoKrZRVL5717vP9xQzZ.','2024-10-16 23:33:48',1),(5,'3','morra33','$2a$10$ZGohktLLyEqJGMMKDNsJFetA0Z0V8hX.UEq0hqOXHBX7rbly.3/9i','2024-10-16 23:34:07',0),(7,'adm','adm','$2a$10$3yLNHEBgnAnW3FfGZjpR0eZbHSN51ZG.6g.fsnqFsQRRQaIVgbxiC','2024-10-16 23:45:08',1),(8,'smt','smt','$2a$10$CC4VTfol3F1G0LP0EX58auj5YFZy6jPX.0hSy09tTdOQkepb7BhQq','2024-10-24 11:55:20',1),(11,'d','d','$2a$10$3xrfHjkewoXZLI2hjUAb1eNSWKfK8lQbSCIEnZvOL1UWuS4vN5fje','2024-11-02 22:29:49',0),(15,'teste1','teste2','$2a$10$SQlryKMcZEFeR3u0pe4UueMkKpf6224Q6Ign1xaRBvZSWd5wGJ2xm','2024-11-02 23:23:38',0),(16,'João Silva','joao.silva','$2a$10$V2eN2kViwS1x7TxJ4keqJ.vZ8sZ.eWbTHeQowMgfZn3F2vOeK8VbC','2024-11-02 23:24:39',0),(18,'Carlos Pereira','carlos.pereira','$2a$10$WwHUpG6JOn8Okt2Zbkl7ZeVg61sLzqZ1HbsFmb0W0MFL4Gy6gGE2C','2024-11-02 23:24:39',0),(20,'Fernando Lima','fernando.lima','$2a$10$gjEBtMEBtgHRW7Da3b2NyeOpIEVcfGT5tAWgHQ1cmj0G1M66/y0GK','2024-11-02 23:24:39',0),(21,'Claudia Santos','claudia.santos','$2a$10$QoElxSH8XLB5bT/Dd6iAKO4xC5mFjH4ZTcvPSHk0.oyB6G00J3Zbi','2024-11-02 23:24:39',0),(22,'Roberto Costa','roberto.costa','$2a$10$8efm4xfvXk/bE9Q4FMx.AON9.BQaT4PbSKtdtB5CpG6ivO3O.NRBG','2024-11-02 23:24:39',0),(24,'Tiago Martins','tiago.martins','$2a$10$0MB5D/2pU.q9AnBoNQ6v7OukDdID3xEEYy/ti/23V4xYtEEhDwYJq','2024-11-02 23:24:39',0),(25,'Mariana Nascimento','mariana.nascimento','$2a$10$HoJW4D.5q8XxHfyOt8L5eOjEkDNzWZzCKD9P0z76ZJ3GCQOCnWvlO','2024-11-02 23:24:39',0),(26,'Bruno Rodrigues','bruno.rodrigues','$2a$10$5cPBrh9.FYX6cBz3fy5KxOIM2O3Kh9ToD3nM.m0VP5C3Aqfy4LauK','2024-11-02 23:24:39',0),(27,'Lívia Rocha','livia.rocha','$2a$10$9ZrMHVEk5HH3PLD4ZY8bYuIAcyUPvJ0Fi/kh3JWwF24e1Oqffz35y','2024-11-02 23:24:39',0),(31,'Rafaela Santos','rafaela.santos','$2a$10$slO8BGWlC7dsOUxpsRfgc.R3Z5BOUgo7gt.cj1o6GL5KcP5CgN9mG','2024-11-02 23:24:39',0),(33,'Patrícia Ferreira','patricia.ferreira','$2a$10$1ovfH4HMLgZfAIC5.xAD3O23pMExO.dHpbGbtyHk3hZUm4O.SuvL.','2024-11-02 23:24:39',0),(34,'Gabriel Almeida','gabriel.almeida','$2a$10$GbC2n6OSKb8d4uwMcDgtPOq1STzt97kU/0p7eXSVhK0MY3Xe/pcxK','2024-11-02 23:24:39',0),(35,'Jessica Costa','jessica.costa','$2a$10$PiYoU1ckdX/s6oIv7uDkBuWgNJKp8yY.N2RzB3o/ZsFsloT6U3sM.','2024-11-02 23:24:39',0),(36,'Thiago Nunes','thiago.nunes','$2a$10$5vL9WkE2uP4M9M8bBQubJeOZcoZVuwIg3T7c1xogZbgbBdcSc9h/.','2024-11-02 23:24:39',0),(37,'Rita Lopes','rita.lopes','$2a$10$bpNllucFgSy3c0a56b44yO/J4LrMtC.MRmskDW1WyhbT3C9KnCw5O','2024-11-02 23:24:39',0),(38,'Eduardo Barros','eduardo.barros','$2a$10$Hr8CP0O.dH0c2r.F96s7aeWb0T.CwFSoQsYlx8HhjBlYQ47tG7GyO','2024-11-02 23:24:39',0),(39,'Fernanda Lima','fernanda.lima','$2a$10$tbKZ2FLxq8IS6SgO5uj4Me5Jl3z38IQk1cHbphP9KD1nd5kpQXhO.','2024-11-02 23:24:39',0),(40,'Ricardo Melo','ricardo.melo','$2a$10$lmXnl.vW4hCvUwE1m3v6JeKRCbxdwMltp4m.ML2xO4FdF47KTlTNe','2024-11-02 23:24:39',0),(41,'Natália Ferreira','natalia.ferreira','$2a$10$Fq/RR4e3WyN2H6vSPQ/GOu8HXK.AHvlC1X3iFk1U9r2S.j1KiC.wa','2024-11-02 23:24:39',0),(42,'Gustavo Silva','gustavo.silva','$2a$10$afRQMS0kDZmVS2YwRwiRpe5CWy5YptgEFZg0qZGtNLyVZpa/Dq5hW','2024-11-02 23:24:39',0),(43,'Luciana Santos','luciana.santos','$2a$10$gBhP/zTYzRdp5z7Db5mHqOtXzqBoq9gOdKJzNFQHQ3HWp7yH6jC9G','2024-11-02 23:24:39',0),(44,'Samuel Lima','samuel.lima','$2a$10$MCW0/VF.E.i9yDNeQ2doPejMn36hQjsElyRHTy6ISOKUwxnM.AkQi','2024-11-02 23:24:39',0),(45,'Verônica Torres','veronica.torres','$2a$10$myTc5MT5x3xwYGrE49bxOe0k5U5E2.bchjBWK9/z0fBg/iQQA0.N2','2024-11-02 23:24:39',0),(46,'Sérgio Gomes','sergio.gomes','$2a$10$kIrfAqPfrQ/BsfmtyGZgEu7ULMD3USdrH4udI8AoyN6k7gg8TX5Mi','2024-11-02 23:24:39',1),(47,'a','morraaaa','$2a$10$K89vBNqXJNbyTgg3awzOLOV6SxTC0Bk6bms6m2d9K622R/I0tm.RO','2024-11-06 00:57:30',0),(48,'aasd','aa','$2a$10$PF5HBhVywfKgvE3Vj.3yRugO30VqbUa3neubG0sKa5jyk4.x5j4dC','2024-11-06 23:24:36',0),(49,'a','morraaaaa','$2a$10$HUIzPgw7Nd6FxNiutd1F9eg2yKg1567b.LSKWfWXVI/xEKL6W7X5.','2024-11-06 23:36:16',0),(50,'ola','dsa','$2a$10$ktdhnJeNFt5fK07ZwpabweFhIuKL275bLdJ.8EAhemtUXJUQNSsBW','2024-11-06 23:36:41',1),(51,'DSA','morraAA','$2a$10$ypjoIgYprSr.ESubEHYABOOCYN0.uOQqc4gSsCFGxZ4z42PcAlyrm','2024-11-06 23:46:13',0),(52,'dsad','morra312','$2a$10$ycSnI25HxnuKX98danU8redci6exjQz1a6yskKlvx6NLbdJEv.i6u','2024-11-06 23:47:08',0),(53,'dsa','morraaaadsar3wq2','$2a$10$onyiaaDsv5mmm1JckipOFORQf0hqGo0F5L43rg/agPB.uxLOg5wfe','2024-11-06 23:48:43',0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-09 10:14:09
