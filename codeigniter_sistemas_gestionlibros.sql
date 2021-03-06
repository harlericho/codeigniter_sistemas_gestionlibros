-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for codeigniter_sistemas_gestionlibros
CREATE DATABASE
IF NOT EXISTS `codeigniter_sistemas_gestionlibros` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `codeigniter_sistemas_gestionlibros`;

-- Dumping structure for table codeigniter_sistemas_gestionlibros.autor
CREATE TABLE
IF NOT EXISTS `autor`
(
  `id_autor` int
(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar
(100) NOT NULL,
  `fecha_c` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` char
(1) NOT NULL DEFAULT 'A',
  `id_pais` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id_autor`),
  KEY `IX_Relationship4`
(`id_pais`),
  CONSTRAINT `Relationship4` FOREIGN KEY
(`id_pais`) REFERENCES `pais`
(`id_pais`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table codeigniter_sistemas_gestionlibros.editorial
CREATE TABLE
IF NOT EXISTS `editorial`
(
  `id_editorial` int
(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar
(200) NOT NULL,
  `telefono` varchar
(10) NOT NULL,
  `direccion` varchar
(500) DEFAULT NULL,
  `fecha_c` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` char
(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY
(`id_editorial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table codeigniter_sistemas_gestionlibros.genero
CREATE TABLE
IF NOT EXISTS `genero`
(
  `id_genero` int
(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar
(100) NOT NULL,
  `descripcion` varchar
(500) DEFAULT NULL,
  `fecha_c` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` char
(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY
(`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table codeigniter_sistemas_gestionlibros.libro
CREATE TABLE
IF NOT EXISTS `libro`
(
  `id_libro` int
(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar
(20) NOT NULL,
  `titulo` varchar
(100) NOT NULL,
  `descripcion` varchar
(500) DEFAULT NULL,
  `edicion` varchar
(50) NOT NULL,
  `ann` varchar
(10) NOT NULL,
  `portada` varchar
(50) DEFAULT NULL,
  `precio_v` decimal
(10,2) NOT NULL,
  `fecha_c` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` char
(1) NOT NULL DEFAULT 'A',
  `id_editorial` int
(11) DEFAULT NULL,
  `id_autor` int
(11) DEFAULT NULL,
  `id_genero` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`id_libro`),
  KEY `IX_Relationship1`
(`id_editorial`),
  KEY `IX_Relationship2`
(`id_autor`),
  KEY `IX_Relationship3`
(`id_genero`),
  CONSTRAINT `Relationship1` FOREIGN KEY
(`id_editorial`) REFERENCES `editorial`
(`id_editorial`),
  CONSTRAINT `Relationship2` FOREIGN KEY
(`id_autor`) REFERENCES `autor`
(`id_autor`),
  CONSTRAINT `Relationship3` FOREIGN KEY
(`id_genero`) REFERENCES `genero`
(`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table codeigniter_sistemas_gestionlibros.login
CREATE TABLE
IF NOT EXISTS `login`
(
  `id_login` int
(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar
(100) NOT NULL,
  `email` varchar
(100) NOT NULL,
  `pass` varchar
(500) NOT NULL,
  `fecha_c` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` char
(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY
(`id_login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table codeigniter_sistemas_gestionlibros.pais
CREATE TABLE
IF NOT EXISTS `pais`
(
  `id_pais` int
(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar
(50) NOT NULL,
  `fecha_c` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` char
(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY
(`id_pais`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for procedure codeigniter_sistemas_gestionlibros.procedure_listado_autor
DELIMITER //
CREATE PROCEDURE `procedure_listado_autor`
()
BEGIN
  SELECT a.id_autor, a.nombres AS autor, a.id_pais, p.nombre AS pais
  FROM autor a
    JOIN pais p ON a.id_pais=p.id_pais
  WHERE a.estado = 'A';
END
//
DELIMITER ;

-- Dumping structure for procedure codeigniter_sistemas_gestionlibros.procedure_listado_autor_libro
DELIMITER //
CREATE PROCEDURE `procedure_listado_autor_libro`
()
BEGIN
  SELECT *
  FROM autor
  WHERE estado ='A';
END
//
DELIMITER ;

-- Dumping structure for procedure codeigniter_sistemas_gestionlibros.procedure_listado_editorial
DELIMITER //
CREATE PROCEDURE `procedure_listado_editorial`
()
BEGIN
  SELECT *
  FROM editorial
  WHERE estado = 'A';
END
//
DELIMITER ;

-- Dumping structure for procedure codeigniter_sistemas_gestionlibros.procedure_listado_genero
DELIMITER //
CREATE PROCEDURE `procedure_listado_genero`
()
BEGIN
  SELECT *
  FROM genero
  WHERE estado ='A';
END
//
DELIMITER ;

-- Dumping structure for procedure codeigniter_sistemas_gestionlibros.procedure_listado_libro
DELIMITER //
CREATE PROCEDURE `procedure_listado_libro`
()
BEGIN
  SELECT
    l.id_libro, l.isbn, l.titulo, l.edicion, l.ann, l.portada, l.precio_v,
    e.nombre as edito, a.nombres as auto, g.nombre as genen
  FROM libro l
    JOIN editorial e ON l.id_editorial=e.id_editorial
    JOIN autor a on l.id_autor=a.id_autor
    JOIN genero g on l.id_genero=g.id_genero
  WHERE l.estado='A';
END
//
DELIMITER ;

-- Dumping structure for procedure codeigniter_sistemas_gestionlibros.procedure_listado_pais
DELIMITER //
CREATE PROCEDURE `procedure_listado_pais`
()
BEGIN
  SELECT *
  FROM pais
  WHERE estado ='A';
END
//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
