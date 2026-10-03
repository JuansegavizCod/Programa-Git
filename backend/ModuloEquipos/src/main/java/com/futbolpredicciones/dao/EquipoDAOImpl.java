package com.futbolpredicciones.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.futbolpredicciones.conexion.ConexionBD;
import com.futbolpredicciones.modelo.Equipo;

/**
 * Implementación de EquipoDAO utilizando JDBC puro (PreparedStatement)
 * sobre la tabla "equipo" de la base de datos futbol_predicciones:
 *
 *   equipo(id_equipo, nombre, id_liga, estadio, fundacion)
 *
 * Cada método abre su propia conexión y la cierra con try-with-resources,
 * evitando fugas de recursos (conexiones, statements y result sets).
 */
public class EquipoDAOImpl implements EquipoDAO {

    private static final String SQL_INSERTAR =
            "INSERT INTO equipo (nombre, id_liga, estadio, fundacion) VALUES (?, ?, ?, ?)";
    private static final String SQL_CONSULTAR_TODOS =
            "SELECT id_equipo, nombre, id_liga, estadio, fundacion FROM equipo ORDER BY nombre";
    private static final String SQL_CONSULTAR_POR_ID =
            "SELECT id_equipo, nombre, id_liga, estadio, fundacion FROM equipo WHERE id_equipo = ?";
    private static final String SQL_ACTUALIZAR =
            "UPDATE equipo SET nombre = ?, id_liga = ?, estadio = ?, fundacion = ? WHERE id_equipo = ?";
    private static final String SQL_ELIMINAR =
            "DELETE FROM equipo WHERE id_equipo = ?";

    @Override
    public void insertarEquipo(Equipo equipo) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_INSERTAR)) {

            sentencia.setString(1, equipo.getNombre());
            sentencia.setInt(2, equipo.getIdLiga());
            sentencia.setString(3, equipo.getEstadio());
            sentencia.setString(4, equipo.getFechaFundacion());
            sentencia.executeUpdate();
        }
    }

    @Override
    public List<Equipo> consultarEquipos() throws SQLException {
        List<Equipo> listaEquipos = new ArrayList<>();

        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_CONSULTAR_TODOS);
             ResultSet resultado = sentencia.executeQuery()) {

            while (resultado.next()) {
                listaEquipos.add(mapearFilaAEquipo(resultado));
            }
        }
        return listaEquipos;
    }

    @Override
    public Equipo consultarEquipoPorId(int idEquipo) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_CONSULTAR_POR_ID)) {

            sentencia.setInt(1, idEquipo);
            try (ResultSet resultado = sentencia.executeQuery()) {
                if (resultado.next()) {
                    return mapearFilaAEquipo(resultado);
                }
            }
        }
        return null;
    }

    @Override
    public void actualizarEquipo(Equipo equipo) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_ACTUALIZAR)) {

            sentencia.setString(1, equipo.getNombre());
            sentencia.setInt(2, equipo.getIdLiga());
            sentencia.setString(3, equipo.getEstadio());
            sentencia.setString(4, equipo.getFechaFundacion());
            sentencia.setInt(5, equipo.getIdEquipo());
            sentencia.executeUpdate();
        }
    }

    @Override
    public void eliminarEquipo(int idEquipo) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_ELIMINAR)) {

            sentencia.setInt(1, idEquipo);
            sentencia.executeUpdate();
        }
    }

    private Equipo mapearFilaAEquipo(ResultSet resultado) throws SQLException {
        Equipo equipo = new Equipo();
        equipo.setIdEquipo(resultado.getInt("id_equipo"));
        equipo.setNombre(resultado.getString("nombre"));
        equipo.setIdLiga(resultado.getInt("id_liga"));
        equipo.setEstadio(resultado.getString("estadio"));
        equipo.setFechaFundacion(resultado.getString("fundacion"));
        return equipo;
    }
}
