/* Modelo estadístico de predicción (regresión de Poisson simplificada).
   Se calcula la fuerza de ataque y defensa de cada equipo respecto al
   promedio de goles y se estima la probabilidad de cada marcador. */

FP.mediaGoles = function () {
  var gf = 0, pj = 0;
  for (var i = 0; i < FP.EQUIPOS.length; i++) { gf += FP.EQUIPOS[i].gf; pj += FP.EQUIPOS[i].pj; }
  return gf / pj;
};

FP.fuerza = function (eq) {
  var m = FP.mediaGoles();
  return { ataque: (eq.gf / eq.pj) / m, defensa: (eq.gc / eq.pj) / m };
};

FP.poisson = function (k, lambda) {
  var p = Math.exp(-lambda);
  for (var i = 1; i <= k; i++) { p = p * lambda / i; }
  return p;
};

FP.predecir = function (idLocal, idVisitante) {
  var L = FP.equipoPorId(idLocal), V = FP.equipoPorId(idVisitante);
  if (!L || !V || idLocal === idVisitante) { return null; }
  var m = FP.mediaGoles();
  var fl = FP.fuerza(L), fv = FP.fuerza(V);
  var lamL = fl.ataque * fv.defensa * m * 1.10;   // ventaja de local
  var lamV = fv.ataque * fl.defensa * m * 0.92;
  var MAX = 8, total = 0, pl = 0, pe = 0, pv = 0, best = { p: -1, i: 0, j: 0 };
  var matriz = [];
  for (var i = 0; i <= MAX; i++) {
    matriz[i] = [];
    for (var j = 0; j <= MAX; j++) {
      var p = FP.poisson(i, lamL) * FP.poisson(j, lamV);
      matriz[i][j] = p;
      total += p;
    }
  }
  for (var a = 0; a <= MAX; a++) {
    for (var b = 0; b <= MAX; b++) {
      matriz[a][b] = matriz[a][b] / total;
      if (a > b) { pl += matriz[a][b]; } else if (a === b) { pe += matriz[a][b]; } else { pv += matriz[a][b]; }
      if (matriz[a][b] > best.p) { best = { p: matriz[a][b], i: a, j: b }; }
    }
  }
  var rl = Math.round(pl * 100), re = Math.round(pe * 100);
  return {
    local: L, visitante: V,
    lamLocal: lamL, lamVisitante: lamV,
    pLocal: rl, pEmpate: re, pVisitante: 100 - rl - re,
    marcador: best.i + ' - ' + best.j, marcadorProb: Math.round(best.p * 100),
    matriz: matriz
  };
};
