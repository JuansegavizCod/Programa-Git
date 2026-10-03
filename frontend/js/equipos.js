/* Equipos y ligas: filtro por liga y tabla ordenable */
document.addEventListener('DOMContentLoaded', function () {
  FP.shell('equipos.html', 'Equipos y ligas', 'Rendimiento histórico por temporada');

  var estado = { liga: 'todas', col: 'gfp', dir: -1 };
  var tbody = document.getElementById('tabla-equipos');
  var ths = document.querySelectorAll('th.sortable');

  function valor(e, col) {
    if (col === 'nombre') { return e.nombre; }
    if (col === 'liga') { return FP.ligaPorClave(e.liga).nombre; }
    if (col === 'gfp') { return e.gf / e.pj; }
    if (col === 'gcp') { return e.gc / e.pj; }
    return e[col];
  }

  function pintar() {
    var lista = [];
    for (var i = 0; i < FP.EQUIPOS.length; i++) {
      if (estado.liga === 'todas' || FP.EQUIPOS[i].liga === estado.liga) { lista.push(FP.EQUIPOS[i]); }
    }
    lista.sort(function (a, b) {
      var x = valor(a, estado.col), y = valor(b, estado.col);
      return (x < y ? -1 : (x > y ? 1 : 0)) * estado.dir;
    });
    var html = '';
    for (var k = 0; k < lista.length; k++) {
      var e = lista[k];
      html += '<tr><td>' + FP.escapar(e.nombre) + '</td><td>' + FP.ligaPorClave(e.liga).nombre + '</td>' +
        '<td class="num">' + e.pj + '</td><td class="num">' + e.gf + '</td><td class="num">' + e.gc + '</td>' +
        '<td class="num">' + (e.gf / e.pj).toFixed(2) + '</td><td class="num">' + (e.gc / e.pj).toFixed(2) + '</td></tr>';
    }
    tbody.innerHTML = html;
    for (var t = 0; t < ths.length; t++) {
      var activo = ths[t].getAttribute('data-col') === estado.col;
      ths[t].setAttribute('aria-sort', activo ? (estado.dir === 1 ? 'ascending' : 'descending') : 'none');
      ths[t].querySelector('.arrow').textContent = activo ? (estado.dir === 1 ? '\u25b2' : '\u25bc') : '';
    }
  }

  for (var t = 0; t < ths.length; t++) {
    ths[t].addEventListener('click', function () {
      var col = this.getAttribute('data-col');
      if (estado.col === col) { estado.dir = -estado.dir; } else { estado.col = col; estado.dir = (col === 'nombre' || col === 'liga') ? 1 : -1; }
      pintar();
    });
  }
  var chips = document.querySelectorAll('.chip');
  for (var c = 0; c < chips.length; c++) {
    chips[c].addEventListener('click', function () {
      for (var j = 0; j < chips.length; j++) { chips[j].classList.remove('active'); }
      this.classList.add('active');
      estado.liga = this.getAttribute('data-liga');
      pintar();
    });
  }
  pintar();
});
