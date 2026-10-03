/* Partidos: búsqueda, filtro por liga y ordenamiento */
document.addEventListener('DOMContentLoaded', function () {
  FP.shell('partidos.html', 'Partidos', 'Calendario con probabilidades estimadas');

  var estado = { liga: 'todas', q: FP.param('q'), orden: 'fecha' };
  var buscador = document.getElementById('filtro-texto');
  var orden = document.getElementById('filtro-orden');
  var lista = document.getElementById('lista-partidos');
  var contador = document.getElementById('contador');
  buscador.value = estado.q;

  function pintar() {
    var q = estado.q.toLowerCase();
    var res = [];
    for (var i = 0; i < FP.PARTIDOS.length; i++) {
      var p = FP.PARTIDOS[i];
      var L = FP.equipoPorId(p.local), V = FP.equipoPorId(p.visitante);
      var texto = (L.nombre + ' ' + V.nombre).toLowerCase();
      if ((estado.liga === 'todas' || p.liga === estado.liga) && texto.indexOf(q) !== -1) {
        res.push({ p: p, pr: FP.predecir(p.local, p.visitante) });
      }
    }
    res.sort(function (a, b) {
      if (estado.orden === 'prob') { return b.pr.pLocal - a.pr.pLocal; }
      return a.p.fecha < b.p.fecha ? -1 : 1;
    });
    var html = '';
    for (var k = 0; k < res.length; k++) { html += FP.filaPartido(res[k].p); }
    lista.innerHTML = html || '<div class="empty-state"><b>Sin resultados</b>No hay partidos que coincidan con la búsqueda o el filtro.</div>';
    contador.textContent = 'Mostrando ' + res.length + ' de ' + FP.PARTIDOS.length + ' partidos';
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
  buscador.addEventListener('input', function () { estado.q = this.value; pintar(); });
  orden.addEventListener('change', function () { estado.orden = this.value; pintar(); });
  pintar();
});
