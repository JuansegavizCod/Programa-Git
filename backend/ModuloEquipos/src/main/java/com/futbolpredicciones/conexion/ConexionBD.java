package com.futbolpredicciones.conexion;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * Clase encargada de crear la conexión JDBC hacia la base de datos MySQL
 * "futbol_predicciones" (ver evidencia GA6-220501096-AA2-EV02/EV03).
 *
 * Los datos de conexión NO se dejan escritos en el código: se leen desde
 * el archivo config.properties (carpeta src/main/resources) para poder
 * cambiarlos sin recompilar y para no exponer credenciales en el repositorio.
 */
public class ConexionBD {

    private static final String ARCHIVO_CONFIGURACION = "config.properties";

    // Constructor privado: esta clase solo se usa de forma estática.
    private ConexionBD() {
    }

    public static Connection obtenerConexion() throws SQLException {
        Properties propiedades = cargarPropiedades();

        String urlBaseDatos = propiedades.getProperty("db.url");
        String usuarioBaseDatos = propiedades.getProperty("db.usuario");
        String contrasenaBaseDatos = propiedades.getProperty("db.contrasena");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException excepcion) {
            throw new SQLException("No se encontró el driver JDBC de MySQL (mysql-connector-j) en el classpath.", excepcion);
        }

        return DriverManager.getConnection(urlBaseDatos, usuarioBaseDatos, contrasenaBaseDatos);
    }

    private static Properties cargarPropiedades() throws SQLException {
        Properties propiedades = new Properties();
        try (InputStream entrada = ConexionBD.class.getClassLoader().getResourceAsStream(ARCHIVO_CONFIGURACION)) {
            if (entrada == null) {
                throw new SQLException("No se encontró el archivo " + ARCHIVO_CONFIGURACION + " en el classpath.");
            }
            propiedades.load(entrada);
        } catch (IOException excepcion) {
            throw new SQLException("Error al leer " + ARCHIVO_CONFIGURACION, excepcion);
        }
        return propiedades;
    }
}
