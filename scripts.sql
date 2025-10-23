-- ============================================================
-- 📁 Base de datos Spotify
-- ============================================================

DROP DATABASE IF EXISTS spotify;
CREATE DATABASE spotify CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE spotify;

-- ============================================================
-- 📋 Tabla: pais
-- ============================================================
CREATE TABLE pais (
  id_pais INT AUTO_INCREMENT,
  nombre_pais VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id_pais)
);

-- ============================================================
-- 📋 Tabla: tipo_usuario
-- ============================================================
CREATE TABLE tipo_usuario (
  id_tipo_usuario INT AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (id_tipo_usuario)
);

INSERT INTO tipo_usuario (nombre) VALUES ('free'), ('standard'), ('premium');

-- ============================================================
-- 📋 Tabla: usuario
-- ============================================================
CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  fecha_nac DATE NULL,
  sexo CHAR(1) NULL,
  cp VARCHAR(20) NULL,
  id_pais INT NULL,
  tipo_usuario_actual INT NULL,
  fecha_ult_mod_password DATETIME DEFAULT CURRENT_TIMESTAMP,
  activo BOOLEAN DEFAULT 1,
  PRIMARY KEY (id_usuario),
  FOREIGN KEY (id_pais) REFERENCES pais(id_pais),
  FOREIGN KEY (tipo_usuario_actual) REFERENCES tipo_usuario(id_tipo_usuario)
);

-- ============================================================
-- 📋 Tabla: discografica
-- ============================================================
CREATE TABLE discografica (
  id_discografica INT AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  id_pais INT,
  PRIMARY KEY (id_discografica),
  UNIQUE(nombre, id_pais),
  FOREIGN KEY (id_pais) REFERENCES pais(id_pais)
);

-- ============================================================
-- 📋 Tabla: artista
-- ============================================================
CREATE TABLE artista (
  id_artista INT AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  imagen_url VARCHAR(255),
  PRIMARY KEY (id_artista)
);

-- ============================================================
-- 📋 Tabla: album
-- ============================================================
CREATE TABLE album (
  id_album INT AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  id_artista INT NOT NULL,
  id_discografica INT NOT NULL,
  imagen_portada VARCHAR(255),
  anio_publicacion INT,
  duracion_total_seg INT DEFAULT 0,
  PRIMARY KEY (id_album),
  UNIQUE(id_artista, titulo),
  FOREIGN KEY (id_artista) REFERENCES artista(id_artista),
  FOREIGN KEY (id_discografica) REFERENCES discografica(id_discografica)
);

-- ============================================================
-- 📋 Tabla: genero
-- ============================================================
CREATE TABLE genero (
  id_genero INT AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  PRIMARY KEY (id_genero)
);

-- ============================================================
-- 📋 Tabla: cancion
-- ============================================================
CREATE TABLE cancion (
  id_cancion INT AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  duracion_seg INT NOT NULL,
  id_album INT NOT NULL,
  reproducciones BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  fecha_agregada DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_cancion),
  FOREIGN KEY (id_album) REFERENCES album(id_album)
);

-- ============================================================
-- 📋 Tabla intermedia: cancion_genero (N:M)
-- ============================================================
CREATE TABLE cancion_genero (
  id_cancion INT NOT NULL,
  id_genero INT NOT NULL,
  PRIMARY KEY (id_cancion, id_genero),
  FOREIGN KEY (id_cancion) REFERENCES cancion(id_cancion) ON DELETE CASCADE,
  FOREIGN KEY (id_genero) REFERENCES genero(id_genero) ON DELETE CASCADE
);

-- ============================================================
-- 📋 Tabla: playlist
-- ============================================================
CREATE TABLE playlist (
  id_playlist INT AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  id_usuario INT NOT NULL,
  cant_canciones INT DEFAULT 0,
  estado ENUM('activa', 'eliminada') DEFAULT 'activa',
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_eliminada DATETIME NULL,
  PRIMARY KEY (id_playlist),
  CHECK (
    (estado = 'activa' AND fecha_eliminada IS NULL)
    OR (estado = 'eliminada' AND fecha_eliminada IS NOT NULL)
  ),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- ============================================================
-- 📋 Tabla intermedia: playlist_cancion (N:M)
-- ============================================================
CREATE TABLE playlist_cancion (
  id_playlist INT NOT NULL,
  id_cancion INT NOT NULL,
  orden INT NULL,
  fecha_agregada DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_playlist, id_cancion),
  FOREIGN KEY (id_playlist) REFERENCES playlist(id_playlist) ON DELETE CASCADE,
  FOREIGN KEY (id_cancion) REFERENCES cancion(id_cancion) ON DELETE CASCADE
);

-- ============================================================
-- 📋 Tabla: suscripcion
-- ============================================================
CREATE TABLE suscripcion (
  id_suscripcion INT AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  tipo_usuario INT NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_renovacion DATE NOT NULL,
  PRIMARY KEY (id_suscripcion),
  UNIQUE (id_usuario, fecha_inicio),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario),
  CHECK (fecha_renovacion > fecha_inicio)
);

-- ============================================================
-- 📋 Tabla: metodo_pago
-- ============================================================
CREATE TABLE metodo_pago (
  id_metodo_pago INT AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  tipo_forma_pago ENUM('tarjeta', 'transferencia', 'debito') NOT NULL,
  cbu VARCHAR(30) NULL,
  banco_codigo VARCHAR(20) NULL,
  nro_tarjeta_masc VARCHAR(30) NULL,
  mes_caduca INT NULL,
  anio_caduca INT NULL,
  PRIMARY KEY (id_metodo_pago),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- ============================================================
-- 📋 Tabla: pago
-- ============================================================
CREATE TABLE pago (
  id_pago INT AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_suscripcion INT NOT NULL,
  id_metodo_pago INT NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  fecha_pago DATE NOT NULL,
  PRIMARY KEY (id_pago),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_suscripcion) REFERENCES suscripcion(id_suscripcion),
  FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago)
);

-- ============================================================
-- ✅ Datos mínimos
-- ============================================================

INSERT INTO pais (nombre_pais) VALUES 
('Argentina'), ('Estados Unidos'), ('España');

INSERT INTO discografica (nombre, id_pais) VALUES 
('Sony Music', 1), ('Warner Music Group', 2), ('Universal Music', 3);

INSERT INTO artista (nombre) VALUES 
('Gustavo Cerati'), ('The Beatles'), ('Shakira');

INSERT INTO album (titulo, id_artista, id_discografica, anio_publicacion)
VALUES 
('Bocanada', 1, 1, 1999),
('Abbey Road', 2, 2, 1969),
('Fijación Oral', 3, 3, 2005);

INSERT INTO genero (nombre) VALUES ('Rock'), ('Pop'), ('Alternativo');

INSERT INTO cancion (titulo, duracion_seg, id_album, reproducciones, likes)
VALUES 
('Puente', 260, 1, 100000, 5000),
('Come Together', 250, 2, 200000, 9000),
('La Tortura', 220, 3, 150000, 7000);

INSERT INTO usuario (email, password_hash, id_pais)
VALUES
('user1@spotify.com', '123456', 1),
('user2@spotify.com', '123456', 2),
('user3@spotify.com', '123456', 3);

-- 👇 Corregido para cumplir el CHECK constraint
INSERT INTO playlist (titulo, id_usuario, estado, fecha_creacion, fecha_eliminada)
VALUES
('Mis favoritas', 1, 'activa', NOW(), NULL),
('Playlist vieja', 2, 'eliminada', '2024-01-10', '2024-01-10');

INSERT INTO playlist_cancion (id_playlist, id_cancion, orden)
VALUES
(1, 1, 1),
(1, 2, 2),
(2, 3, 1);

INSERT INTO suscripcion (id_usuario, tipo_usuario, fecha_inicio, fecha_renovacion)
VALUES
(1, 3, '2025-01-01', '2025-12-31'),
(2, 2, '2025-03-01', '2025-09-01');

INSERT INTO metodo_pago (id_usuario, tipo_forma_pago, nro_tarjeta_masc, mes_caduca, anio_caduca)
VALUES
(1, 'tarjeta', '**** **** **** 1234', 12, 2030),
(2, 'transferencia', NULL, NULL, NULL);

INSERT INTO pago (id_usuario, id_suscripcion, id_metodo_pago, importe, fecha_pago)
VALUES
(1, 1, 1, 999.99, '2025-10-01'),
(2, 2, 2, 499.99, '2025-09-01');
