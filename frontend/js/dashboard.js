/* Inicio: métricas, próximos partidos y ranking de ataque */
document.addEventListener('DOMContentLoaded', function () {
  FP.shell('dashboard.html', 'Inicio', 'Resumen general del sistema');

  document.getElementById('st-partidos').textContent = FP.PARTIDOS.length;
  document.getElementById('st-pred').textContent = FP.PARTIDOS.length;
  document.getElementById('st-ligas').textContent = FP.LIGAS.length;
  document.getElementById('st-equipos').textContent = FP.EQUIPOS.length;

  var proximos = FP.PARTIDOS.slice().sort(function (a, b) { return a.fecha < b.fecha ? -1 : 1; }).slice(0, 3);
  var html = '';
  for (var i = 0; i < proximos.length; i++) { html += FP.filaPartido(proximos[i]); }
  document.getElementById('lista-partidos').innerHTML = html;

  var equipos = FP.EQUIPOS.slice().sort(function (a, b) { return (b.gf / b.pj) - (a.gf / a.pj); }).slice(0, 4);
  var max = equipos[0].gf / equipos[0].pj, rank = '';
  for (var k = 0; k < equipos.length; k++) {
    var prom = equipos[k].gf / equipos[k].pj;
    rank += '<div class="rank-row"><span class="name">' + FP.escapar(equipos[k].nombre) + '</span>' +
      '<span class="track"><span class="fill" style="display:block;width:' + Math.round(prom / max * 100) + '%"></span></span>' +
      '<span class="val">' + prom.toFixed(2) + '</span></div>';
  }
  document.getElementById('ranking').innerHTML = rank;
});
