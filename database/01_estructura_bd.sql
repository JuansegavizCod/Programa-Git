-- ============================================================
-- Evidencia GA6-220501096-AA2-EV02
-- Creación de la estructura de la BD y aplicación de restricciones
-- Proyecto: Sistema de predicción y análisis estadístico de fútbol
-- Motor: MySQL 8.x (compatible con MySQL Workbench)
-- Autor: Juan Sebastián Garibello Vizcaíno
-- ============================================================

CREATE DATABASE IF NOT EXISTS futbol_predicciones
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE futbol_predicciones;

-- ------------------------------------------------------------
-- Tabla: LIGA
-- ------------------------------------------------------------
CREATE TABLE liga (
  id_liga     INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  pais        VARCHAR(60)  NOT NULL,
  temporada   VARCHAR(9)   NOT NULL,
  CONSTRAINT uq_liga_nombre_temporada UNIQUE (nombre, temporada)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: EQUIPO
-- ------------------------------------------------------------
CREATE TABLE equipo (
  id_equipo   INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  id_liga     INT NOT NULL,
  estadio     VARCHAR(100),
  fundacion   DATE,
  CONSTRAINT uq_equipo_nombre UNIQUE (nombre),
  CONSTRAINT fk_equipo_liga FOREIGN KEY (id_liga)
    REFERENCES liga (id_liga)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: USUARIO
-- ------------------------------------------------------------
CREATE TABLE usuario (
  id_usuario     INT AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(100) NOT NULL,
  email          VARCHAR(120) NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,
  rol            ENUM('admin', 'analista') NOT NULL DEFAULT 'analista',
  CONSTRAINT uq_usuario_email UNIQUE (email)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: PARTIDO
-- ------------------------------------------------------------
CREATE TABLE partido (
  id_partido          INT AUTO_INCREMENT PRIMARY KEY,
  id_liga             INT NOT NULL,
  id_equipo_local     INT NOT NULL,
  id_equipo_visitante INT NOT NULL,
  fecha               DATETIME NOT NULL,
  goles_local         SMALLINT,
  goles_visitante     SMALLINT,
  estado              ENUM('programado', 'finalizado', 'suspendido') NOT NULL DEFAULT 'programado',
  CONSTRAINT fk_partido_liga FOREIGN KEY (id_liga)
    REFERENCES liga (id_liga)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_partido_equipo_local FOREIGN KEY (id_equipo_local)
    REFERENCES equipo (id_equipo)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_partido_equipo_visitante FOREIGN KEY (id_equipo_visitante)
    REFERENCES equipo (id_equipo)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_partido_equipos_distintos CHECK (id_equipo_local <> id_equipo_visitante),
  CONSTRAINT chk_partido_goles_local CHECK (goles_local IS NULL OR goles_local >= 0),
  CONSTRAINT chk_partido_goles_visitante CHECK (goles_visitante IS NULL OR goles_visitante >= 0)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: ESTADISTICA_EQUIPO
-- ------------------------------------------------------------
CREATE TABLE estadistica_equipo (
  id_estadistica    INT AUTO_INCREMENT PRIMARY KEY,
  id_equipo         INT NOT NULL,
  temporada         VARCHAR(9) NOT NULL,
  partidos_jugados  SMALLINT NOT NULL DEFAULT 0,
  goles_favor       SMALLINT NOT NULL DEFAULT 0,
  goles_contra      SMALLINT NOT NULL DEFAULT 0,
  CONSTRAINT uq_estadistica_equipo_temporada UNIQUE (id_equipo, temporada),
  CONSTRAINT fk_estadistica_equipo FOREIGN KEY (id_equipo)
    REFERENCES equipo (id_equipo)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT chk_estadistica_partidos CHECK (partidos_jugados >= 0),
  CONSTRAINT chk_estadistica_goles_favor CHECK (goles_favor >= 0),
  CONSTRAINT chk_estadistica_goles_contra CHECK (goles_contra >= 0)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: MODELO_ESTADISTICO
-- ------------------------------------------------------------
CREATE TABLE modelo_estadistico (
  id_modelo             INT AUTO_INCREMENT PRIMARY KEY,
  nombre                VARCHAR(80) NOT NULL,
  tipo                  VARCHAR(60) NOT NULL,
  version               VARCHAR(10) NOT NULL,
  fecha_entrenamiento   DATETIME NOT NULL,
  id_usuario            INT NOT NULL,
  CONSTRAINT fk_modelo_usuario FOREIGN KEY (id_usuario)
    REFERENCES usuario (id_usuario)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Tabla: PREDICCION
-- ------------------------------------------------------------
CREATE TABLE prediccion (
  id_prediccion         INT AUTO_INCREMENT PRIMARY KEY,
  id_partido            INT NOT NULL,
  id_modelo             INT NOT NULL,
  prob_local            DECIMAL(5,4) NOT NULL,
  prob_empate           DECIMAL(5,4) NOT NULL,
  prob_visitante        DECIMAL(5,4) NOT NULL,
  goles_esp_local       DECIMAL(4,2) NOT NULL,
  goles_esp_visitante   DECIMAL(4,2) NOT NULL,
  fecha_generada        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_prediccion_partido FOREIGN KEY (id_partido)
    REFERENCES partido (id_partido)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_prediccion_modelo FOREIGN KEY (id_modelo)
    REFERENCES modelo_estadistico (id_modelo)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_prob_local CHECK (prob_local BETWEEN 0 AND 1),
  CONSTRAINT chk_prob_empate CHECK (prob_empate BETWEEN 0 AND 1),
  CONSTRAINT chk_prob_visitante CHECK (prob_visitante BETWEEN 0 AND 1),
  CONSTRAINT chk_goles_esp_local CHECK (goles_esp_local >= 0),
  CONSTRAINT chk_goles_esp_visitante CHECK (goles_esp_visitante >= 0)
) ENGINE=InnoDB;
