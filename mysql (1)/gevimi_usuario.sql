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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-16 11:29:10
