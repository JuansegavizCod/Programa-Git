-- MySQL Workbench Forward Engineering
-- Proyecto formativo: Sistema de predicción y análisis estadístico de fútbol
-- Evidencia GA6-220501096-AA2-EV03 - Script bases de datos del proyecto
-- Aprendiz: Juan Sebastián Garibello Vizcaíno - Ficha 3186698 (ADSO)
-- Generado a partir del modelo físico diseñado en MySQL Workbench (EV02)

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema futbol_predicciones
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `futbol_predicciones` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `futbol_predicciones`;

-- -----------------------------------------------------
-- Table `futbol_predicciones`.`liga`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `futbol_predicciones`.`liga`;
CREATE TABLE IF NOT EXISTS `futbol_predicciones`.`liga` (
  `id_liga` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `pais` VARCHAR(60) NOT NULL,
  `temporada` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`id_liga`),
  UNIQUE INDEX `uq_liga_nombre_temporada` (`nombre` ASC, `temporada` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `futbol_predicciones`.`equipo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `futbol_predicciones`.`equipo`;
CREATE TABLE IF NOT EXISTS `futbol_predicciones`.`equipo` (
  `id_equipo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `id_liga` INT NOT NULL,
  `estadio` VARCHAR(100) NULL,
  `fundacion` DATE NULL,
  PRIMARY KEY (`id_equipo`),
  UNIQUE INDEX `uq_equipo_nombre` (`nombre` ASC) VISIBLE,
  INDEX `fk_equipo_liga_idx` (`id_liga` ASC) VISIBLE,
  CONSTRAINT `fk_equipo_liga`
    FOREIGN KEY (`id_liga`)
    REFERENCES `futbol_predicciones`.`liga` (`id_liga`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `futbol_predicciones`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `futbol_predicciones`.`usuario`;
CREATE TABLE IF NOT EXISTS `futbol_predicciones`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `rol` ENUM('admin', 'analista') NOT NULL DEFAULT 'analista',
  PRIMARY KEY (`id_usuario`),
  UNIQUE INDEX `uq_usuario_email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `futbol_predicciones`.`partido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `futbol_predicciones`.`partido`;
CREATE TABLE IF NOT EXISTS `futbol_predicciones`.`partido` (
  `id_partido` INT NOT NULL AUTO_INCREMENT,
  `id_liga` INT NOT NULL,
  `id_equipo_local` INT NOT NULL,
  `id_equipo_visitante` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  `goles_local` SMALLINT NULL,
  `goles_visitante` SMALLINT NULL,
  `estado` ENUM('programado', 'finalizado', 'suspendido') NOT NULL DEFAULT 'programado',
  PRIMARY KEY (`id_partido`),
  INDEX `fk_partido_liga_idx` (`id_liga` ASC) VISIBLE,
  INDEX `fk_partido_equipo_local_idx` (`id_equipo_local` ASC) VISIBLE,
  INDEX `fk_partido_equipo_visitante_idx` (`id_equipo_visitante` ASC) VISIBLE,
  CONSTRAINT `fk_partido_liga`
    FOREIGN KEY (`id_liga`)
    REFERENCES `futbol_predicciones`.`liga` (`id_liga`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_partido_equipo_local`
    FOREIGN KEY (`id_equipo_local`)
    REFERENCES `futbol_predicciones`.`equipo` (`id_equipo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_partido_equipo_visitante`
    FOREIGN KEY (`id_equipo_visitante`)
    REFERENCES `futbol_predicciones`.`equipo` (`id_equipo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `chk_partido_equipos_distintos` CHECK (`id_equipo_local` <> `id_equipo_visitante`),
  CONSTRAINT `chk_partido_goles_local` CHECK (`goles_local` IS NULL OR `goles_local` >= 0),
  CONSTRAINT `chk_partido_goles_visitante` CHECK (`goles_visitante` IS NULL OR `goles_visitante` >= 0))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `futbol_predicciones`.`estadistica_equipo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `futbol_predicciones`.`estadistica_equipo`;
CREATE TABLE IF NOT EXISTS `futbol_predicciones`.`estadistica_equipo` (
  `id_estadistica` INT NOT NULL AUTO_INCREMENT,
  `id_equipo` INT NOT NULL,
  `temporada` VARCHAR(9) NOT NULL,
  `partidos_jugados` SMALLINT NOT NULL DEFAULT 0,
  `goles_favor` SMALLINT NOT NULL DEFAULT 0,
  `goles_contra` SMALLINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_estadistica`),
  UNIQUE INDEX `uq_estadistica_equipo_temporada` (`id_equipo` ASC, `temporada` ASC) VISIBLE,
  CONSTRAINT `fk_estadistica_equipo`
    FOREIGN KEY (`id_equipo`)
    REFERENCES `futbol_predicciones`.`equipo` (`id_equipo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `chk_estadistica_partidos` CHECK (`partidos_jugados` >= 0),
  CONSTRAINT `chk_estadistica_goles_favor` CHECK (`goles_favor` >= 0),
  CONSTRAINT `chk_estadistica_goles_contra` CHECK (`goles_contra` >= 0))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `futbol_predicciones`.`modelo_estadistico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `futbol_predicciones`.`modelo_estadistico`;
CREATE TABLE IF NOT EXISTS `futbol_predicciones`.`modelo_estadistico` (
  `id_modelo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(80) NOT NULL,
  `tipo` VARCHAR(60) NOT NULL,
  `version` VARCHAR(10) NOT NULL,
  `fecha_entrenamiento` DATETIME NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_modelo`),
  INDEX `fk_modelo_usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_modelo_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `futbol_predicciones`.`usuario` (`id_usuario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `futbol_predicciones`.`prediccion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `futbol_predicciones`.`prediccion`;
CREATE TABLE IF NOT EXISTS `futbol_predicciones`.`prediccion` (
  `id_prediccion` INT NOT NULL AUTO_INCREMENT,
  `id_partido` INT NOT NULL,
  `id_modelo` INT NOT NULL,
  `prob_local` DECIMAL(5,4) NOT NULL,
  `prob_empate` DECIMAL(5,4) NOT NULL,
  `prob_visitante` DECIMAL(5,4) NOT NULL,
  `goles_esp_local` DECIMAL(4,2) NOT NULL,
  `goles_esp_visitante` DECIMAL(4,2) NOT NULL,
  `fecha_generada` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_prediccion`),
  INDEX `fk_prediccion_partido_idx` (`id_partido` ASC) VISIBLE,
  INDEX `fk_prediccion_modelo_idx` (`id_modelo` ASC) VISIBLE,
  CONSTRAINT `fk_prediccion_partido`
    FOREIGN KEY (`id_partido`)
    REFERENCES `futbol_predicciones`.`partido` (`id_partido`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_prediccion_modelo`
    FOREIGN KEY (`id_modelo`)
    REFERENCES `futbol_predicciones`.`modelo_estadistico` (`id_modelo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `chk_prob_local` CHECK (`prob_local` BETWEEN 0 AND 1),
  CONSTRAINT `chk_prob_empate` CHECK (`prob_empate` BETWEEN 0 AND 1),
  CONSTRAINT `chk_prob_visitante` CHECK (`prob_visitante` BETWEEN 0 AND 1),
  CONSTRAINT `chk_goles_esp_local` CHECK (`goles_esp_local` >= 0),
  CONSTRAINT `chk_goles_esp_visitante` CHECK (`goles_esp_visitante` >= 0))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
