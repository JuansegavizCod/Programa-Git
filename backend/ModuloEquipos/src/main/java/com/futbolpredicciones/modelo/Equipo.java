package com.futbolpredicciones.modelo;

/**
 * Clase modelo (POJO) que representa un registro de la tabla "equipo"
 * de la base de datos futbol_predicciones.
 *
 * Estándares de nombramiento aplicados:
 * - Clase: sustantivo en PascalCase (Equipo).
 * - Atributos y métodos: camelCase, iniciando en minúscula.
 * - Paquete: en minúsculas y con el dominio invertido de la organización.
 */
public class Equipo {

    private int idEquipo;
    private String nombre;
    private int idLiga;
    private String estadio;
    private String fechaFundacion; // formato yyyy-MM-dd

    public Equipo() {
    }

    public Equipo(int idEquipo, String nombre, int idLiga, String estadio, String fechaFundacion) {
        this.idEquipo = idEquipo;
        this.nombre = nombre;
        this.idLiga = idLiga;
        this.estadio = estadio;
        this.fechaFundacion = fechaFundacion;
    }

    // Constructor sin id, útil para insertar un equipo nuevo (el id lo genera la BD)
    public Equipo(String nombre, int idLiga, String estadio, String fechaFundacion) {
        this.nombre = nombre;
        this.idLiga = idLiga;
        this.estadio = estadio;
        this.fechaFundacion = fechaFundacion;
    }

    public int getIdEquipo() {
        return idEquipo;
    }

    public void setIdEquipo(int idEquipo) {
        this.idEquipo = idEquipo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getIdLiga() {
        return idLiga;
    }

    public void setIdLiga(int idLiga) {
        this.idLiga = idLiga;
    }

    public String getEstadio() {
        return estadio;
    }

    public void setEstadio(String estadio) {
        this.estadio = estadio;
    }

    public String getFechaFundacion() {
        return fechaFundacion;
    }

    public void setFechaFundacion(String fechaFundacion) {
        this.fechaFundacion = fechaFundacion;
    }

    @Override
    public String toString() {
        return "Equipo{" +
                "idEquipo=" + idEquipo +
                ", nombre='" + nombre + '\'' +
                ", idLiga=" + idLiga +
                ", estadio='" + estadio + '\'' +
                ", fechaFundacion='" + fechaFundacion + '\'' +
                '}';
    }
}
