/* Utilidades de interfaz: menú lateral, barra superior y helpers de formato */

FP.MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

FP.NAV = [
  { href: 'dashboard.html',    icon: '\u2302', label: 'Inicio' },
  { href: 'partidos.html',     icon: '\u26bd', label: 'Partidos' },
  { href: 'equipos.html',      icon: '\u2691', label: 'Equipos y ligas' },
  { href: 'simulador.html',    icon: '\u03bb', label: 'Simulador' },
  { href: 'guia-estilos.html', icon: '\u25a6', label: 'Guía de estilos' }
];

FP.escapar = function (s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

FP.param = function (nombre) {
  var q = window.location.search.replace('?', '').split('&');
  for (var i = 0; i < q.length; i++) {
    var kv = q[i].split('=');
    if (kv[0] === nombre) { return decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); }
  }
  return '';
};

FP.fecha = function (iso) {
  var f = iso.split('T')[0].split('-');
  return parseInt(f[2], 10) + ' ' + FP.MESES[parseInt(f[1], 10) - 1] + ' ' + f[0];
};
FP.hora = function (iso) { return iso.split('T')[1]; };

FP.iniciales = function (nombre) {
  var partes = nombre.split(' ');
  var s = partes[0].charAt(0);
  if (partes.length > 1) { s += partes[1].charAt(0); } else { s += partes[0].charAt(1); }
  return s.toUpperCase();
};

FP.barraProb = function (pl, pe, pv) {
  return '<div class="probbar" role="img" aria-label="Local ' + pl + '%, empate ' + pe + '%, visitante ' + pv + '%">' +
    '<div class="p-local" style="width:' + pl + '%"></div><div class="p-empate" style="width:' + pe + '%"></div><div class="p-visit" style="width:' + pv + '%"></div></div>' +
    '<div class="problegend"><span>Local <b>' + pl + '%</b></span><span>Empate <b>' + pe + '%</b></span><span>Visitante <b>' + pv + '%</b></span></div>';
};

FP.filaPartido = function (p) {
  var L = FP.equipoPorId(p.local), V = FP.equipoPorId(p.visitante);
  var pr = FP.predecir(p.local, p.visitante);
  var liga = FP.ligaPorClave(p.liga);
  return '<div class="match-row" data-liga="' + p.liga + '">' +
    '<div class="match-meta"><b>' + FP.fecha(p.fecha) + ' · ' + FP.hora(p.fecha) + '</b>' + liga.nombre + '</div>' +
    '<div class="match-teams">' + FP.escapar(L.nombre) + '<span class="vs">vs</span>' + FP.escapar(V.nombre) + '</div>' +
    '<div class="match-pred">' + FP.barraProb(pr.pLocal, pr.pEmpate, pr.pVisitante) + '</div>' +
    '<div class="match-action"><a class="btn btn-outline" href="partido.html?id=' + p.id + '">Ver análisis</a></div></div>';
};

FP.shell = function (activo, titulo, subtitulo) {
  var links = '';
  for (var i = 0; i < FP.NAV.length; i++) {
    var n = FP.NAV[i];
    links += '<a href="' + n.href + '"' + (n.href === activo ? ' class="active" aria-current="page"' : '') +
      '><span class="ic">' + n.icon + '</span>' + n.label + '</a>';
  }
  document.getElementById('sidebar').innerHTML =
    '<div class="brand"><div class="brand-dot">FP</div><div class="brand-name">Fútbol<br>Predicciones</div></div>' +
    '<div class="nav-title">Menú principal</div><nav class="nav" aria-label="Menú principal">' + links + '</nav>' +
    '<div class="spacer"></div>' +
    '<div class="user-box"><div class="avatar">JG</div><div><div class="u-name">Juan Garibello</div><div class="u-role">Administrador</div></div></div>' +
    '<nav class="nav" style="margin-top:12px;"><a href="login.html"><span class="ic">\u21aa</span>Cerrar sesión</a></nav>';

  document.getElementById('topbar').innerHTML =
    '<button class="menu-toggle" id="btn-menu" aria-label="Abrir o cerrar menú">\u2630</button>' +
    '<div class="title-wrap"><h1>' + titulo + '</h1><div class="muted">' + subtitulo + '</div></div>' +
    '<input class="search" id="busqueda-global" type="search" placeholder="Buscar equipo..." aria-label="Buscar equipo o partido">';

  var sb = document.getElementById('sidebar');
  document.getElementById('btn-menu').addEventListener('click', function () { sb.classList.toggle('open'); });
  document.getElementById('contenido').addEventListener('click', function () { sb.classList.remove('open'); });
  document.getElementById('busqueda-global').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      window.location.href = 'partidos.html?q=' + encodeURIComponent(this.value);
    }
  });
};
