# Programa-Git — Sistema de predicción y análisis estadístico de fútbol

Proyecto formativo — Tecnología en Análisis y Desarrollo de Software (ADSO)
Ficha 3186698 — SENA
Aprendiz: Juan Sebastián Garibello Vizcaíno

## Qué es este proyecto

Un sistema que predice resultados de partidos de fútbol (victoria, empate,
derrota y goles esperados) usando un modelo estadístico de regresión de
Poisson, para las ligas Champions League y Premier League.

Este repositorio reúne todo lo construido hasta el momento en el programa:
la base de datos, el backend en Java y el front-end en HTML/CSS/JS.

## Estructura del repositorio

```
Programa-Git/
├── database/     Scripts SQL (estructura, datos de prueba) y diagrama entidad-relación
├── backend/      Módulo Java (JDBC) con el CRUD de equipos — ModuloEquipos/
├── frontend/     Interfaz web (login, dashboard, partidos, simulador, etc.)
└── docs/         Informes técnicos entregados como evidencias del SENA
```

## Cómo se conecta todo

1. **database/**: ejecuta `02_forward_engineer.sql` en MySQL Workbench para crear
   la base de datos `futbol_predicciones` con sus 7 tablas. Opcionalmente,
   ejecuta `03_datos_prueba.sql` para cargar datos de ejemplo.
2. **backend/ModuloEquipos/**: proyecto Maven en Java que se conecta a esa
   base de datos por JDBC y permite insertar, consultar, actualizar y eliminar
   equipos. Instrucciones detalladas en `backend/ModuloEquipos/README.md`.
3. **frontend/**: páginas HTML que hoy funcionan con datos de ejemplo
   (`frontend/js/data.js`); en una fase posterior del proyecto se conectarán
   al backend real en lugar de a esos datos fijos.

## Evidencias del SENA cubiertas en este repositorio

| Evidencia | Contenido | Carpeta |
|---|---|---|
| GA6-220501096-AA2-EV02 | Estructura de la BD y restricciones | `database/`, `docs/` |
| GA6-220501096-AA2-EV03 | Script de base de datos (Forward Engineer) | `database/` |
| GA6-220501096-AA3-EV01 | Selección herramienta de prototipado | `docs/` |
| GA6-220501096-AA4-EV03 | Diseño front-end (HTML/CSS/JS) | `frontend/` |
| GA7-220501096-AA1-EV01 | Informe técnico de versionamiento (Git/GitHub) | `docs/` |
| GA7-220501096-AA1-EV05 | Video de Git instalado y configurado | `docs/` (guion) |
| GA7-220501096-AA2-EV01 | Codificación módulo Equipos (JDBC) | `backend/` |

## Versionamiento

Este proyecto sigue la estrategia definida en el informe técnico
(`docs/Informe_Tecnico_Versionamiento_GA7-220501096-AA1-EV01.pdf`):
Git + GitHub, ramas `feature/nombre-corto`, commits con el formato
`tipo: descripción` (feat, fix, docs, refactor, test) y versiones
etiquetadas con versionado semántico (v0.1.0, v0.2.0, v1.0.0...).
