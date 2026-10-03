# Módulo Equipos — futbol_predicciones

Evidencia GA7-220501096-AA2-EV01 — Codificación de módulos del software.
Proyecto formativo: sistema de predicción y análisis estadístico de fútbol.
Aprendiz: Juan Sebastián Garibello Vizcaíno — Ficha 3186698 (ADSO).

## Qué hace este módulo

Codifica el módulo de gestión de **equipos** del proyecto, con conexión a la
base de datos MySQL `futbol_predicciones` (definida en las evidencias
GA6-220501096-AA2-EV02 y EV03) por medio de **JDBC**, e implementa las cuatro
operaciones básicas sobre la tabla `equipo`:

- **Insertar** un equipo nuevo.
- **Consultar** todos los equipos o uno por su id.
- **Actualizar** los datos de un equipo existente.
- **Eliminar** un equipo por su id.

Se expone a través de un pequeño menú de consola (`AplicacionPrincipal`) que
permite ejecutar y ver en pantalla cada una de las cuatro operaciones.

## Artefactos previos que se tomaron como referencia

- **Diagrama entidad-relación / modelo lógico** (GA4-220501095-AA1-EV02 y
  GA6-220501096-AA2-EV02): estructura y tipos de dato de la tabla `equipo`.
- **Script de base de datos** (GA6-220501096-AA2-EV03): nombres exactos de
  columnas (`id_equipo`, `nombre`, `id_liga`, `estadio`, `fundacion`).
- **Informe técnico de plan de trabajo** (GA7-220501096-AA1-EV01): selección
  de Git/GitHub, convención de ramas `feature/nombre-corto` y de commits
  `feat:`, `fix:`, etc., aplicada al desarrollar este módulo.
- **Diseño front-end** (GA6-220501096-AA4-EV03): este módulo de backend es el
  que alimentará, más adelante, la pantalla "Equipos y ligas" de esa interfaz.

## Estructura del proyecto

```
ModuloEquipos/
├── pom.xml                                  # Proyecto Maven + dependencia JDBC
├── src/main/java/com/futbolpredicciones/
│   ├── modelo/Equipo.java                   # Clase modelo (POJO)
│   ├── conexion/ConexionBD.java             # Conexión JDBC (lee config.properties)
│   ├── dao/EquipoDAO.java                   # Interfaz del CRUD
│   ├── dao/EquipoDAOImpl.java               # Implementación del CRUD con JDBC
│   └── app/AplicacionPrincipal.java         # Menú de consola
└── src/main/resources/config.properties     # Datos de conexión a MySQL
```

## Estándares de codificación aplicados

| Elemento   | Convención           | Ejemplo                                  |
|------------|-----------------------|-------------------------------------------|
| Paquetes   | minúsculas, dominio invertido | `com.futbolpredicciones.dao`       |
| Clases     | PascalCase (sustantivo) | `EquipoDAOImpl`, `ConexionBD`           |
| Interfaces | PascalCase             | `EquipoDAO`                             |
| Métodos    | camelCase (verbo + complemento) | `insertarEquipo`, `consultarEquipoPorId` |
| Variables  | camelCase, nombre descriptivo | `idEquipo`, `equipoExistente`      |
| Constantes | MAYÚSCULAS_CON_GUION_BAJO | `SQL_CONSULTAR_TODOS`                |

## Cómo ejecutarlo

1. Tener MySQL corriendo con la base de datos `futbol_predicciones` creada
   (ver evidencia GA6-220501096-AA2-EV03, archivo
   `futbol_predicciones_ForwardEngineer.sql`).
2. Editar `src/main/resources/config.properties` con el usuario y la
   contraseña reales de su MySQL local.
3. **Con Maven** (recomendado, descarga automáticamente el conector JDBC):
   ```
   mvn compile exec:java -Dexec.mainClass=com.futbolpredicciones.app.AplicacionPrincipal
   ```
4. **Sin Maven** (compilando a mano): descargar el conector
   `mysql-connector-j-8.4.0.jar` desde el sitio oficial de MySQL y ejecutar:
   ```
   javac -d bin $(find src/main/java -name "*.java")
   java -cp "bin:src/main/resources:mysql-connector-j-8.4.0.jar" com.futbolpredicciones.app.AplicacionPrincipal
   ```
   (En Windows, reemplazar los `:` del classpath por `;`).

El proyecto ya se compiló exitosamente en el entorno de trabajo (sin
necesidad del conector, porque el código solo usa las interfaces estándar de
`java.sql`); el conector solo se necesita para conectarse de verdad a MySQL.
