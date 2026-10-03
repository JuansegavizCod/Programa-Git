package com.futbolpredicciones.dao;

import java.sql.SQLException;
import java.util.List;

import com.futbolpredicciones.modelo.Equipo;

/**
 * Contrato de acceso a datos para la entidad Equipo.
 * Define las cuatro operaciones básicas (CRUD): insertar, consultar,
 * actualizar y eliminar.
 */
public interface EquipoDAO {

    void insertarEquipo(Equipo equipo) throws SQLException;

    List<Equipo> consultarEquipos() throws SQLException;

    Equipo consultarEquipoPorId(int idEquipo) throws SQLException;

    void actualizarEquipo(Equipo equipo) throws SQLException;

    void eliminarEquipo(int idEquipo) throws SQLException;
}
