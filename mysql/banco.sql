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
  `data_deletado` datetime DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (40,'bruno','2024-09-15 17:28:02'),(41,'sucoss','2024-09-15 16:31:54'),(42,'delicia','2024-09-15 18:53:57'),(45,'cadeiras',NULL),(46,'d',NULL),(47,'e','2024-09-15 18:49:11'),(49,'se mate','2024-09-15 19:35:05');
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
  `rua` varchar(255) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `data_deletado` datetime DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (2,'teste','11157349978','42991456495','84430000','Rua Valério Ronchi','AP 10 3022','a','Uvaranas','2024-09-15 16:44:35'),(7,'testeeeee','11157349978','42991456495','84434000','aaa','2','Imbituva','Mato Branco de Baixo','2024-09-15 16:57:41'),(17,'Carlos Alberto Souza','06932265010','21998765432','22000001','Rua Barata Ribeiro','200','Rio de Janeiro','Copacabana','2024-09-16 03:50:15'),(19,'Isabelle','11157349978','42911206933','84430000','a','12312','Imbituva','Mato Branco de Baixo','2024-09-16 03:51:30'),(22,'Bruno Machado','11157349978','42991456495','84430000','Rua Valério Ronchi','AP 10 302','imbituva','Uvaranas',NULL);
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
  `data_deletado` datetime DEFAULT NULL,
  `preco_unitario_atual` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_item_pedido`),
  KEY `fk_item_pedido_pedido` (`fk_id_pedido`),
  KEY `fk_item_pedido_produto` (`fk_id_produto`),
  CONSTRAINT `fk_item_pedido_pedido` FOREIGN KEY (`fk_id_pedido`) REFERENCES `pedido` (`id_pedido`),
  CONSTRAINT `fk_item_pedido_produto` FOREIGN KEY (`fk_id_produto`) REFERENCES `produto` (`id_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_pedido`
--

LOCK TABLES `item_pedido` WRITE;
/*!40000 ALTER TABLE `item_pedido` DISABLE KEYS */;
INSERT INTO `item_pedido` VALUES (1,1,1,115,NULL,12.00),(2,1,2,117,NULL,12.00),(3,1,3,117,NULL,12.00),(4,2,4,115,NULL,12.00),(5,2,4,120,NULL,32.00),(6,1,5,115,NULL,12.00),(7,1,6,117,NULL,12.00),(8,1,7,117,NULL,12.00),(9,1,8,115,NULL,12.00),(10,1,9,115,NULL,12.00);
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_insert_pedido
BEFORE INSERT ON pedido
FOR EACH ROW
BEGIN
  SET NEW.data_realizado = NOW();
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_before_insert_pedido
BEFORE INSERT ON pedido
FOR EACH ROW
BEGIN
  -- Verifica se o tipo é 3 (Retirada)
  IF NEW.tipo = 3 THEN
    -- Define o status como 1 (Ativo/Finalizado)
    SET NEW.status = 1;
    -- Define a data_finalizado como o momento atual
    SET NEW.data_finalizado = NOW();
  -- Verifica se o tipo é 1 ou 2 (Entrega ou Ifood)
  ELSEIF NEW.tipo = 1 OR NEW.tipo = 2 THEN
    -- Define o status como 2 (Pendente ou outro valor que você precise)
    SET NEW.status = 2;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_before_update_pedido
BEFORE UPDATE ON pedido
FOR EACH ROW
BEGIN
  -- Verifica se o status foi alterado para 1 (Finalizado) e o status antigo não era 1
  IF NEW.status = 1 AND OLD.status <> 1 THEN
    -- Atualiza a data_finalizado para o momento atual
    SET NEW.data_finalizado = NOW();
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `data_deletado` datetime DEFAULT NULL,
  PRIMARY KEY (`id_produto`),
  KEY `fk_produto_categoria` (`fk_id_categoria`),
  CONSTRAINT `fk_produto_categoria` FOREIGN KEY (`fk_id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (98,'crepusculos','Um livro completo sobre JavaScript moderno.',39.99,NULL,'2024-09-15 16:06:00'),(101,'novo teste','testa',1221.00,NULL,'2024-09-15 16:06:03'),(104,'algodao docess','delicia',12.00,NULL,'2024-09-15 16:05:57'),(105,'Bolo','mto bomm',2.00,NULL,'2024-09-15 16:07:11'),(106,'Bruno Machado','mto bomm',12.00,40,'2024-09-15 16:24:21'),(108,'PRODUTOS BAFONICOS','mto legal',2.00,42,'2024-09-15 18:13:28'),(115,'suco','',12.00,46,NULL),(116,'beterraba','aaaaa',17.00,46,'2024-09-16 03:41:18'),(117,'amaciantes','aaaaa',12.00,46,NULL),(120,'odos os campos obrigatórios devem ser preenchidos.','aaaaa',32.00,49,NULL);
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
  `data_deletado` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'bruno','bruno','123','2024-08-20 18:08:25',0,NULL),(2,'TESTE AGORA','TESTE AGORA','$2a$10$5SZj7x4tr0b4RzNsO6ESY.nTNQlrJ9i4OR2yhN/lD/TCPnSUn3Lky','2024-08-30 22:35:42',0,NULL),(3,'teste','testeey','$2a$10$4hAP0b3VnJz4MSgUTApIY.Hm37NA6LXA3uJFfbnPb8y23lZ4C6BQW','2024-08-30 22:43:59',0,NULL),(4,'João Silva','joao_silva','$2a$10$ljU7IcwUtYgKQjFMLscmfu9dqZuZGzDhUbRdkQjk6u1T4TNO7bo1O','2024-09-04 20:32:08',0,NULL),(5,'AAAAAAAAAAAAAAA','AAAAAAAAAAAA','$2a$10$pF034GQ9qJ/wjmdQf0Rz3um2YAPYsZRcTJG17obbx26W4E2EuhnI6','2024-09-04 20:32:22',0,NULL),(6,'olaaaaaaaa','bruno.machadoooo','$2a$10$hgGvEoQ8Byt2VphGfybWWevNXr/Zzof7lBnZtXoXpl13EagJqOWri','2024-09-04 20:37:48',0,NULL),(7,'sequiserem.me hackear','bruno.machado','$2a$10$DlO/0FR.ArXV6Ak4vS3PVuQQbNr85.0uKC0vIIKOW6dMWQ1lP.iQW','2024-09-04 20:38:16',0,NULL),(8,'isabelle','diluan','$2a$10$vEs2rpPM1.6q2kPI4EjPP.CmFDxOP1a6BVZdN7U4h8ZZgfEcN4V1q','2024-09-04 20:39:33',0,NULL),(9,'morram','morra','$2a$10$Up2FvjEgCx6FXiPKMCTo6eukaLKZJ5CCgSLpS/9W2dJApnjFVpgyK','2024-09-04 21:47:12',0,NULL),(10,'	Açoes e FIIs, conceitos e ideias- segunda edição','menuchun.yashirin','$2a$10$QWAUP/rrhPoaf6ba6aZOpOi9oQlPQ4tVVYhiegUdg1EQUglSvMo5C','2024-09-04 23:17:53',0,NULL),(11,'teste','teste.y','$2a$10$hE5lzZfHkn0vYSQlS9tkge6IsNEC6JVIzotwsd2yC4n6FmT9VwYzi','2024-09-08 22:04:09',0,NULL),(12,'aaa','teste.yy','$2a$10$QJN0Y8V.TvGTQmR8xsjlxuQM8qM2yhpMEUq0XRgcCtHfnleHmVVpm','2024-09-08 22:08:16',0,NULL),(13,'a','teste.ya','$2a$10$3zFaOK1D3uTjjtpQEVzrbuPezssbQBzXFDpIOJJVHP0s7.Ge/Hk82','2024-09-08 22:09:05',0,NULL),(14,'dasdas','teste.ydas','$2a$10$5QZTyFCJ5kwnTVCslWjah.xcAEksmVstP13Zw7RurOQzPbojQX0JS','2024-09-08 22:09:13',0,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gevimi'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `evt_atualizar_status_pedidos` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `evt_atualizar_status_pedidos` ON SCHEDULE EVERY 1 MINUTE STARTS '2024-09-16 01:33:08' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    -- Atualiza o status para 3 quando o prazo de entrega passou e o status ainda não foi atualizado
    UPDATE pedido
    SET status = 3
    WHERE data_para_entregar IS NOT NULL
      AND data_para_entregar < NOW() and data_finalizado is NULL
      AND status != 3;  -- Evita que o status seja alterado repetidamente se já for 3
  END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'gevimi'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-16 11:30:27
