-- Datos de prueba para futbol_predicciones
-- Complementa futbol_predicciones_ForwardEngineer.sql
-- Ejecutar después de crear el esquema.

USE `futbol_predicciones`;

-- Ligas
INSERT INTO `liga` (`nombre`, `pais`, `temporada`) VALUES
  ('UEFA Champions League', 'Europa', '2025-2026'),
  ('Premier League', 'Inglaterra', '2025-2026');

-- Equipos
INSERT INTO `equipo` (`nombre`, `id_liga`, `estadio`, `fundacion`) VALUES
  ('Real Madrid', 1, 'Santiago Bernabéu', '1902-03-06'),
  ('Manchester City', 1, 'Etihad Stadium', '1880-01-01'),
  ('Liverpool FC', 2, 'Anfield', '1892-06-03'),
  ('Arsenal FC', 2, 'Emirates Stadium', '1886-12-01');

-- Usuario (analista que entrena el modelo)
INSERT INTO `usuario` (`nombre`, `email`, `password_hash`, `rol`) VALUES
  ('Juan Sebastián Garibello Vizcaíno', 'juan.garibello@example.com', '$2b$12$examplehashvalue0000000000000000000000000000000000', 'admin');

-- Modelo estadístico
INSERT INTO `modelo_estadistico` (`nombre`, `tipo`, `version`, `fecha_entrenamiento`, `id_usuario`) VALUES
  ('Poisson-CL-PL-v1', 'Regresión de Poisson', '1.0', '2026-09-01 08:00:00', 1);

-- Partidos
INSERT INTO `partido` (`id_liga`, `id_equipo_local`, `id_equipo_visitante`, `fecha`, `goles_local`, `goles_visitante`, `estado`) VALUES
  (1, 1, 2, '2026-10-21 20:00:00', NULL, NULL, 'programado'),
  (2, 3, 4, '2026-10-25 16:30:00', 2, 1, 'finalizado');

-- Estadísticas por equipo y temporada
INSERT INTO `estadistica_equipo` (`id_equipo`, `temporada`, `partidos_jugados`, `goles_favor`, `goles_contra`) VALUES
  (1, '2025-2026', 8, 18, 5),
  (2, '2025-2026', 8, 21, 7),
  (3, '2025-2026', 8, 16, 6),
  (4, '2025-2026', 8, 14, 9);

-- Predicción generada por el modelo para el partido programado
INSERT INTO `prediccion` (`id_partido`, `id_modelo`, `prob_local`, `prob_empate`, `prob_visitante`, `goles_esp_local`, `goles_esp_visitante`) VALUES
  (1, 1, 0.4520, 0.2610, 0.2870, 1.85, 1.32);
