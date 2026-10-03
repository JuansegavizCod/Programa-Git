/* Simulador: el usuario elige dos equipos y se calcula la predicción con Poisson */
document.addEventListener('DOMContentLoaded', function () {
  FP.shell('simulador.html', 'Simulador de predicción', 'Calcula probabilidades para cualquier cruce de equipos');

  var selL = document.getElementById('sel-local');
  var selV = document.getElementById('sel-visitante');
  var out = document.getElementById('resultado');
  var opts = '';
  for (var i = 0; i < FP.EQUIPOS.length; i++) { opts += '<option value="' + FP.EQUIPOS[i].id + '">' + FP.escapar(FP.EQUIPOS[i].nombre) + '</option>'; }
  selL.innerHTML = opts; selV.innerHTML = opts;
  selL.value = FP.param('l') || '1';
  selV.value = FP.param('v') || '2';

  function calcular() {
    var idL = parseInt(selL.value, 10), idV = parseInt(selV.value, 10);
    if (idL === idV) {
      out.innerHTML = '<div class="alert-error" role="alert">Selecciona dos equipos distintos para calcular la predicción.</div>';
      return;
    }
    var pr = FP.predecir(idL, idV);
    var f = '<table class="matrix"><tr><th></th>';
    var N = 5, j, i;
    for (j = 0; j <= N; j++) { f += '<th>' + j + '</th>'; }
    f += '</tr>';
    for (i = 0; i <= N; i++) {
      f += '<tr><th>' + i + '</th>';
      for (j = 0; j <= N; j++) {
        var p = pr.matriz[i][j];
        var mejor = (i + ' - ' + j) === pr.marcador;
        f += '<td class="' + (mejor ? 'best' : '') + '" style="background:rgba(11,110,79,' + Math.min(0.08 + p * 5, 0.9).toFixed(2) + ');color:' + (p > 0.09 ? '#FFFFFF' : '#1B2621') + '">' + (p * 100).toFixed(1) + '%</td>';
      }
      f += '</tr>';
    }
    f += '</table>';
    out.innerHTML =
      '<div class="result-kpis">' +
        '<div class="stat-card"><div class="label">Marcador más probable</div><div class="big-score">' + pr.marcador + '</div><div class="sub">' + pr.marcadorProb + '% de probabilidad</div></div>' +
        '<div class="stat-card"><div class="label">Goles esperados (local)</div><div class="value">' + pr.lamLocal.toFixed(2) + '</div><div class="sub">' + FP.escapar(pr.local.nombre) + '</div></div>' +
        '<div class="stat-card"><div class="label">Goles esperados (visitante)</div><div class="value">' + pr.lamVisitante.toFixed(2) + '</div><div class="sub">' + FP.escapar(pr.visitante.nombre) + '</div></div>' +
      '</div>' +
      '<div class="card"><h2 style="margin-bottom:14px;">Probabilidad del resultado</h2>' + FP.barraProb(pr.pLocal, pr.pEmpate, pr.pVisitante) + '</div>' +
      '<div class="card"><h2 style="margin-bottom:6px;">Matriz de marcadores</h2><p class="muted">Filas: goles del local · Columnas: goles del visitante</p>' + f +
      '<p class="matrix-caption">El borde dorado marca el marcador más probable.</p></div>';
  }

  document.getElementById('btn-calcular').addEventListener('click', calcular);
  selL.addEventListener('change', calcular);
  selV.addEventListener('change', calcular);
  calcular();
});
