/* Detalle de un partido (se abre con partido.html?id=N) */
document.addEventListener('DOMContentLoaded', function () {
  FP.shell('partidos.html', 'Análisis del partido', 'Predicción estadística detallada');
  var cont = document.getElementById('detalle');
  var id = parseInt(FP.param('id'), 10), partido = null;
  for (var i = 0; i < FP.PARTIDOS.length; i++) { if (FP.PARTIDOS[i].id === id) { partido = FP.PARTIDOS[i]; } }
  if (!partido) {
    cont.innerHTML = '<div class="card empty-state"><b>Partido no encontrado</b>Selecciona un partido desde el calendario.<br><br><a class="btn btn-primary" href="partidos.html">Ir a partidos</a></div>';
    return;
  }
  var pr = FP.predecir(partido.local, partido.visitante);
  var L = pr.local, V = pr.visitante, liga = FP.ligaPorClave(partido.liga);

  function item(txt, pct, cls) {
    return '<div class="prob-item"><div class="row"><span>' + txt + '</span><b>' + pct + '%</b></div><div class="bar"><div class="' + cls + '" style="width:' + pct + '%"></div></div></div>';
  }
  function fila(nombre, a, b) { return '<tr><td>' + nombre + '</td><td class="num">' + a + '</td><td class="num">' + b + '</td></tr>'; }

  cont.innerHTML =
    '<p style="margin-bottom:14px;"><a href="partidos.html">\u2190 Volver a partidos</a></p>' +
    '<div class="match-hero">' +
      '<div class="team-block"><div class="team-crest">' + FP.iniciales(L.nombre) + '</div><div class="tname">' + FP.escapar(L.nombre) + '</div><div class="tsub">Local · ' + FP.escapar(L.estadio) + '</div></div>' +
      '<div class="score-block"><div class="vs-big">VS</div><div class="when">' + liga.nombre + '<br>' + FP.fecha(partido.fecha) + ' · ' + FP.hora(partido.fecha) + '</div></div>' +
      '<div class="team-block"><div class="team-crest">' + FP.iniciales(V.nombre) + '</div><div class="tname">' + FP.escapar(V.nombre) + '</div><div class="tsub">Visitante · ' + FP.escapar(V.estadio) + '</div></div>' +
    '</div>' +
    '<div class="two-col">' +
      '<div class="card"><h2 style="margin-bottom:16px;">Predicción del modelo</h2>' +
        item('Victoria ' + FP.escapar(L.nombre), pr.pLocal, 'fill-local') +
        item('Empate', pr.pEmpate, 'fill-empate') +
        item('Victoria ' + FP.escapar(V.nombre), pr.pVisitante, 'fill-visit') +
        '<p class="muted" style="margin-top:6px;">Goles esperados: <b>' + pr.lamLocal.toFixed(2) + '</b> (local) · <b>' + pr.lamVisitante.toFixed(2) + '</b> (visitante)</p>' +
        '<p class="muted" style="margin-top:6px;">Marcador más probable: <b>' + pr.marcador + '</b> (' + pr.marcadorProb + '%)</p>' +
      '</div>' +
      '<div class="card"><h2 style="margin-bottom:16px;">Estadísticas de temporada</h2>' +
        '<table class="data"><tr><th>Indicador</th><th class="num">' + FP.escapar(L.nombre) + '</th><th class="num">' + FP.escapar(V.nombre) + '</th></tr>' +
        fila('Partidos jugados', L.pj, V.pj) + fila('Goles a favor', L.gf, V.gf) + fila('Goles en contra', L.gc, V.gc) +
        fila('Promedio goles a favor', (L.gf / L.pj).toFixed(2), (V.gf / V.pj).toFixed(2)) + '</table>' +
        '<p style="margin-top:14px;"><a class="btn btn-outline" href="simulador.html?l=' + L.id + '&v=' + V.id + '">Abrir en el simulador</a></p>' +
      '</div>' +
    '</div>' +
    '<div class="note"><b>Nota:</b> Predicción generada con el modelo de regresión de Poisson v1.0. Uso académico y analítico.</div>';
});
