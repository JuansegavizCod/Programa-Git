package com.futbolpredicciones.app;

import java.sql.SQLException;
import java.util.List;
import java.util.Scanner;

import com.futbolpredicciones.dao.EquipoDAO;
import com.futbolpredicciones.dao.EquipoDAOImpl;
import com.futbolpredicciones.modelo.Equipo;

/**
 * Módulo de consola para gestionar la tabla "equipo" mediante JDBC.
 * Expone un menú con las cuatro operaciones básicas: insertar, consultar,
 * actualizar y eliminar (CRUD), tal como lo pide la evidencia
 * GA7-220501096-AA2-EV01.
 */
public class AplicacionPrincipal {

    private static final EquipoDAO equipoDAO = new EquipoDAOImpl();
    private static final Scanner entradaTeclado = new Scanner(System.in);

    public static void main(String[] argumentos) {
        int opcionSeleccionada;

        do {
            mostrarMenu();
            opcionSeleccionada = leerEntero("Seleccione una opción: ");

            switch (opcionSeleccionada) {
                case 1 -> insertarEquipoDesdeConsola();
                case 2 -> consultarEquiposDesdeConsola();
                case 3 -> actualizarEquipoDesdeConsola();
                case 4 -> eliminarEquipoDesdeConsola();
                case 5 -> System.out.println("Saliendo del módulo. ¡Hasta luego!");
                default -> System.out.println("Opción no válida, intente de nuevo.");
            }
        } while (opcionSeleccionada != 5);

        entradaTeclado.close();
    }

    private static void mostrarMenu() {
        System.out.println("\n===== MÓDULO EQUIPOS - futbol_predicciones =====");
        System.out.println("1. Insertar equipo");
        System.out.println("2. Consultar equipos");
        System.out.println("3. Actualizar equipo");
        System.out.println("4. Eliminar equipo");
        System.out.println("5. Salir");
    }

    private static void insertarEquipoDesdeConsola() {
        System.out.println("\n-- Insertar nuevo equipo --");
        String nombre = leerTexto("Nombre del equipo: ");
        int idLiga = leerEntero("Id de la liga (ver tabla liga): ");
        String estadio = leerTexto("Estadio: ");
        String fechaFundacion = leerTexto("Fecha de fundación (yyyy-MM-dd): ");

        Equipo nuevoEquipo = new Equipo(nombre, idLiga, estadio, fechaFundacion);
        try {
            equipoDAO.insertarEquipo(nuevoEquipo);
            System.out.println("Equipo insertado correctamente.");
        } catch (SQLException excepcion) {
            System.out.println("Error al insertar el equipo: " + excepcion.getMessage());
        }
    }

    private static void consultarEquiposDesdeConsola() {
        System.out.println("\n-- Listado de equipos --");
        try {
            List<Equipo> equipos = equipoDAO.consultarEquipos();
            if (equipos.isEmpty()) {
                System.out.println("No hay equipos registrados todavía.");
            } else {
                for (Equipo equipo : equipos) {
                    System.out.println(equipo);
                }
            }
        } catch (SQLException excepcion) {
            System.out.println("Error al consultar los equipos: " + excepcion.getMessage());
        }
    }

    private static void actualizarEquipoDesdeConsola() {
        System.out.println("\n-- Actualizar equipo --");
        int idEquipo = leerEntero("Id del equipo a actualizar: ");

        try {
            Equipo equipoExistente = equipoDAO.consultarEquipoPorId(idEquipo);
            if (equipoExistente == null) {
                System.out.println("No existe un equipo con ese id.");
                return;
            }

            String nombre = leerTexto("Nuevo nombre (" + equipoExistente.getNombre() + "): ");
            int idLiga = leerEntero("Nuevo id de liga (" + equipoExistente.getIdLiga() + "): ");
            String estadio = leerTexto("Nuevo estadio (" + equipoExistente.getEstadio() + "): ");
            String fechaFundacion = leerTexto("Nueva fecha de fundación (" + equipoExistente.getFechaFundacion() + "): ");

            Equipo equipoActualizado = new Equipo(idEquipo, nombre, idLiga, estadio, fechaFundacion);
            equipoDAO.actualizarEquipo(equipoActualizado);
            System.out.println("Equipo actualizado correctamente.");
        } catch (SQLException excepcion) {
            System.out.println("Error al actualizar el equipo: " + excepcion.getMessage());
        }
    }

    private static void eliminarEquipoDesdeConsola() {
        System.out.println("\n-- Eliminar equipo --");
        int idEquipo = leerEntero("Id del equipo a eliminar: ");
        try {
            equipoDAO.eliminarEquipo(idEquipo);
            System.out.println("Equipo eliminado (si el id existía).");
        } catch (SQLException excepcion) {
            System.out.println("Error al eliminar el equipo: " + excepcion.getMessage());
        }
    }

    private static String leerTexto(String mensaje) {
        System.out.print(mensaje);
        return entradaTeclado.nextLine();
    }

    private static int leerEntero(String mensaje) {
        System.out.print(mensaje);
        while (!entradaTeclado.hasNextInt()) {
            System.out.print("Ingrese un número válido: ");
            entradaTeclado.next();
        }
        int valor = entradaTeclado.nextInt();
        entradaTeclado.nextLine();
        return valor;
    }
}
