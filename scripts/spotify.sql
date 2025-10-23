-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: spotify
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
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `id_album` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `id_artista` int NOT NULL,
  `id_discografica` int NOT NULL,
  `imagen_portada` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `anio_publicacion` int DEFAULT NULL,
  `duracion_total_seg` int DEFAULT '0',
  PRIMARY KEY (`id_album`),
  UNIQUE KEY `id_artista` (`id_artista`,`titulo`),
  KEY `album_ibfk_2` (`id_discografica`),
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`id_artista`) REFERENCES `artista` (`id_artista`),
  CONSTRAINT `album_ibfk_2` FOREIGN KEY (`id_discografica`) REFERENCES `discografica` (`id_discografica`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'Bocanada',1,1,NULL,1999,0),(2,'Abbey Road',2,2,NULL,1969,0),(3,'Fijación Oral',3,3,NULL,2005,0),(12,'El Amor Después Del Amor',1,4,NULL,1992,0);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artista`
--

DROP TABLE IF EXISTS `artista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artista` (
  `id_artista` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `imagen_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_artista`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artista`
--

LOCK TABLES `artista` WRITE;
/*!40000 ALTER TABLE `artista` DISABLE KEYS */;
INSERT INTO `artista` VALUES (1,'Gustavo Cerati',NULL),(2,'The Beatles',NULL),(3,'Shakira',NULL),(4,'Fito Paez','https://cdn.example.com/fito.jpg');
/*!40000 ALTER TABLE `artista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancion`
--

DROP TABLE IF EXISTS `cancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancion` (
  `id_cancion` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `duracion_seg` int NOT NULL,
  `id_album` int NOT NULL,
  `reproducciones` bigint DEFAULT '0',
  `likes` bigint DEFAULT '0',
  `fecha_agregada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_cancion`),
  KEY `id_album` (`id_album`),
  CONSTRAINT `cancion_ibfk_1` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancion`
--

LOCK TABLES `cancion` WRITE;
/*!40000 ALTER TABLE `cancion` DISABLE KEYS */;
INSERT INTO `cancion` VALUES (1,'Puente',260,1,100000,5000,'2025-10-23 02:40:14'),(2,'Come Together',250,2,200000,9000,'2025-10-23 02:40:14'),(3,'La Tortura',220,3,150000,7000,'2025-10-23 02:40:14'),(4,'Mariposa Tecknicolor',255,1,0,0,'2025-10-23 03:32:05');
/*!40000 ALTER TABLE `cancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancion_genero`
--

DROP TABLE IF EXISTS `cancion_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancion_genero` (
  `id_cancion` int NOT NULL,
  `id_genero` int NOT NULL,
  PRIMARY KEY (`id_cancion`,`id_genero`),
  KEY `id_genero` (`id_genero`),
  CONSTRAINT `cancion_genero_ibfk_1` FOREIGN KEY (`id_cancion`) REFERENCES `cancion` (`id_cancion`) ON DELETE CASCADE,
  CONSTRAINT `cancion_genero_ibfk_2` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id_genero`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancion_genero`
--

LOCK TABLES `cancion_genero` WRITE;
/*!40000 ALTER TABLE `cancion_genero` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancion_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discografica`
--

DROP TABLE IF EXISTS `discografica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discografica` (
  `id_discografica` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `id_pais` int DEFAULT NULL,
  PRIMARY KEY (`id_discografica`),
  UNIQUE KEY `nombre` (`nombre`,`id_pais`),
  KEY `id_pais` (`id_pais`),
  CONSTRAINT `discografica_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discografica`
--

LOCK TABLES `discografica` WRITE;
/*!40000 ALTER TABLE `discografica` DISABLE KEYS */;
INSERT INTO `discografica` VALUES (5,'Apple Records',2),(16,'Commodore',1),(17,'Decca',2),(13,'Dial Records',1),(4,'EMI',1),(12,'Etcetera Records B.V.',3),(6,'Geffen Records',2),(15,'Muscraft',1),(11,'Naxos Records',3),(10,'NMC',3),(14,'Prestige',1),(9,'RCA Victor Red Seal',2),(7,'Sire Warner Bros',2),(1,'Sony Music',1),(8,'Sony Music Entertainment',2),(3,'Universal Music',3),(2,'Warner Music Group',2);
/*!40000 ALTER TABLE `discografica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero`
--

DROP TABLE IF EXISTS `genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_genero`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero`
--

LOCK TABLES `genero` WRITE;
/*!40000 ALTER TABLE `genero` DISABLE KEYS */;
INSERT INTO `genero` VALUES (3,'Alternativo'),(2,'Pop'),(1,'Rock');
/*!40000 ALTER TABLE `genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_pago`
--

DROP TABLE IF EXISTS `metodo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_pago` (
  `id_metodo_pago` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `tipo_forma_pago` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cbu` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `banco_codigo` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nro_tarjeta_masc` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mes_caduca` int DEFAULT NULL,
  `anio_caduca` int DEFAULT NULL,
  PRIMARY KEY (`id_metodo_pago`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `metodo_pago_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_pago`
--

LOCK TABLES `metodo_pago` WRITE;
/*!40000 ALTER TABLE `metodo_pago` DISABLE KEYS */;
INSERT INTO `metodo_pago` VALUES (1,1,'tarjeta',NULL,NULL,'**** **** **** 1234',12,2030),(2,2,'transferencia',NULL,NULL,NULL,NULL,NULL),(3,1,'Tarjeta de crédito',NULL,'BANK01','**** **** **** 1234',12,2027);
/*!40000 ALTER TABLE `metodo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_suscripcion` int NOT NULL,
  `id_metodo_pago` int NOT NULL,
  `importe` decimal(10,2) NOT NULL,
  `fecha_pago` date NOT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_suscripcion` (`id_suscripcion`),
  KEY `id_metodo_pago` (`id_metodo_pago`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`id_suscripcion`) REFERENCES `suscripcion` (`id_suscripcion`),
  CONSTRAINT `pago_ibfk_3` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,1,1,1,999.99,'2025-10-01'),(2,2,2,2,499.99,'2025-09-01');
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pais`
--

DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id_pais` int NOT NULL AUTO_INCREMENT,
  `nombre_pais` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_pais`),
  UNIQUE KEY `nombre_pais` (`nombre_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pais`
--

LOCK TABLES `pais` WRITE;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` VALUES (1,'Argentina'),(6,'Chile'),(5,'Colombia'),(3,'España'),(2,'Estados Unidos'),(4,'México');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id_playlist` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `id_usuario` int NOT NULL,
  `cant_canciones` int DEFAULT '0',
  `estado` enum('activa','eliminada') COLLATE utf8mb4_general_ci DEFAULT 'activa',
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_eliminada` datetime DEFAULT NULL,
  PRIMARY KEY (`id_playlist`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `playlist_chk_1` CHECK ((((`estado` = _utf8mb4'activa') and (`fecha_eliminada` is null)) or ((`estado` = _utf8mb4'eliminada') and (`fecha_eliminada` is not null))))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES (1,'Mis favoritas',1,0,'eliminada','2025-10-23 02:40:14','2025-10-02 10:00:00'),(2,'Playlist vieja',2,0,'eliminada','2024-01-10 00:00:00','2024-01-10 00:00:00'),(3,'Para correr',1,0,'activa','2025-10-23 03:39:12',NULL),(4,'Para correr',1,0,'activa','2025-10-23 03:40:45',NULL);
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_cancion`
--

DROP TABLE IF EXISTS `playlist_cancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_cancion` (
  `id_playlist` int NOT NULL,
  `id_cancion` int NOT NULL,
  `orden` int DEFAULT NULL,
  `fecha_agregada` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_playlist`,`id_cancion`),
  KEY `id_cancion` (`id_cancion`),
  CONSTRAINT `playlist_cancion_ibfk_1` FOREIGN KEY (`id_playlist`) REFERENCES `playlist` (`id_playlist`) ON DELETE CASCADE,
  CONSTRAINT `playlist_cancion_ibfk_2` FOREIGN KEY (`id_cancion`) REFERENCES `cancion` (`id_cancion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_cancion`
--

LOCK TABLES `playlist_cancion` WRITE;
/*!40000 ALTER TABLE `playlist_cancion` DISABLE KEYS */;
INSERT INTO `playlist_cancion` VALUES (1,2,2,'2025-10-23 02:40:14'),(2,3,1,'2025-10-23 02:40:14');
/*!40000 ALTER TABLE `playlist_cancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suscripcion`
--

DROP TABLE IF EXISTS `suscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suscripcion` (
  `id_suscripcion` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `tipo_usuario` int NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_renovacion` date NOT NULL,
  PRIMARY KEY (`id_suscripcion`),
  UNIQUE KEY `id_usuario` (`id_usuario`,`fecha_inicio`),
  KEY `tipo_usuario` (`tipo_usuario`),
  CONSTRAINT `suscripcion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `suscripcion_ibfk_2` FOREIGN KEY (`tipo_usuario`) REFERENCES `tipo_usuario` (`id_tipo_usuario`),
  CONSTRAINT `suscripcion_chk_1` CHECK ((`fecha_renovacion` > `fecha_inicio`))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suscripcion`
--

LOCK TABLES `suscripcion` WRITE;
/*!40000 ALTER TABLE `suscripcion` DISABLE KEYS */;
INSERT INTO `suscripcion` VALUES (1,1,3,'2025-01-01','2025-12-31'),(2,2,2,'2025-03-01','2025-09-01'),(3,1,1,'2025-10-01','2025-11-01');
/*!40000 ALTER TABLE `suscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id_tipo_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_tipo_usuario`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'free'),(3,'premium'),(2,'standard');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_nac` date DEFAULT NULL,
  `sexo` char(1) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cp` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_pais` int DEFAULT NULL,
  `tipo_usuario_actual` int DEFAULT NULL,
  `fecha_ult_mod_password` datetime DEFAULT CURRENT_TIMESTAMP,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  KEY `id_pais` (`id_pais`),
  KEY `tipo_usuario_actual` (`tipo_usuario_actual`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id_pais`),
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`tipo_usuario_actual`) REFERENCES `tipo_usuario` (`id_tipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'user1@spotify.com','$2b$10$hSSHpd7gnyMazKh8vSPv6.OkqwWoR/Ia31kktbkd1fKWKeKPz3hYW',NULL,NULL,NULL,1,NULL,'2025-10-23 03:02:05',1),(2,'user2@spotify.com','123456',NULL,NULL,NULL,2,NULL,'2025-10-23 02:40:14',1),(3,'user3@spotify.com','123456',NULL,NULL,NULL,3,NULL,'2025-10-23 02:40:14',1),(6,'ana.garcia@example.com','$2b$10$e4X01S2.6yPKBn24k.84QOFMN8XJy85XJLjF3tvWHVBJ4vaHQHKum','1995-05-20','F','4600',1,1,'2025-10-23 02:55:30',1);
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

-- Dump completed on 2025-10-23  4:28:15
