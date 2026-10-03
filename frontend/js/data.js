/* Datos de ejemplo del sistema (equivalen a las tablas de la base de datos:
   liga, equipo, estadistica_equipo y partido). */
var FP = window.FP || {};
window.FP = FP;

FP.LIGAS = [
  { clave: 'champions', nombre: 'UEFA Champions League', pais: 'Europa', temporada: '2025-2026' },
  { clave: 'premier', nombre: 'Premier League', pais: 'Inglaterra', temporada: '2025-2026' }
];

/* pj: partidos jugados, gf: goles a favor, gc: goles en contra (temporada actual) */
FP.EQUIPOS = [
  { id: 1, nombre: 'Real Madrid',     liga: 'champions', estadio: 'Santiago Bernabéu', pj: 8, gf: 18, gc: 5 },
  { id: 2, nombre: 'Manchester City', liga: 'champions', estadio: 'Etihad Stadium',    pj: 8, gf: 21, gc: 7 },
  { id: 3, nombre: 'Bayern Múnich',   liga: 'champions', estadio: 'Allianz Arena',     pj: 8, gf: 24, gc: 6 },
  { id: 4, nombre: 'Inter de Milán',  liga: 'champions', estadio: 'San Siro',          pj: 8, gf: 15, gc: 8 },
  { id: 5, nombre: 'Liverpool FC',    liga: 'premier',   estadio: 'Anfield',           pj: 8, gf: 16, gc: 6 },
  { id: 6, nombre: 'Arsenal FC',      liga: 'premier',   estadio: 'Emirates Stadium',  pj: 8, gf: 14, gc: 9 },
  { id: 7, nombre: 'Chelsea FC',      liga: 'premier',   estadio: 'Stamford Bridge',   pj: 8, gf: 13, gc: 10 },
  { id: 8, nombre: 'Tottenham',       liga: 'premier',   estadio: 'Tottenham Stadium', pj: 8, gf: 15, gc: 12 }
];

FP.PARTIDOS = [
  { id: 1, liga: 'champions', fecha: '2026-10-21T20:00', local: 1, visitante: 2, estado: 'programado' },
  { id: 2, liga: 'premier',   fecha: '2026-10-25T16:30', local: 5, visitante: 6, estado: 'programado' },
  { id: 3, liga: 'champions', fecha: '2026-10-22T20:00', local: 3, visitante: 4, estado: 'programado' },
  { id: 4, liga: 'premier',   fecha: '2026-10-26T14:00', local: 7, visitante: 8, estado: 'programado' },
  { id: 5, liga: 'champions', fecha: '2026-10-28T20:00', local: 2, visitante: 3, estado: 'programado' },
  { id: 6, liga: 'premier',   fecha: '2026-11-01T15:00', local: 6, visitante: 7, estado: 'programado' }
];

FP.equipoPorId = function (id) {
  for (var i = 0; i < FP.EQUIPOS.length; i++) {
    if (FP.EQUIPOS[i].id === id) { return FP.EQUIPOS[i]; }
  }
  return null;
};

FP.ligaPorClave = function (clave) {
  for (var i = 0; i < FP.LIGAS.length; i++) {
    if (FP.LIGAS[i].clave === clave) { return FP.LIGAS[i]; }
  }
  return null;
};
