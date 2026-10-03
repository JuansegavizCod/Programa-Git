/* Pantalla de acceso: validación, mostrar contraseña y recordar correo */
(function () {
  var form = document.getElementById('form-login');
  var email = document.getElementById('email');
  var pass = document.getElementById('password');
  var errEmail = document.getElementById('err-email');
  var errPass = document.getElementById('err-pass');
  var btn = document.getElementById('btn-entrar');

  try { var guardado = window.localStorage.getItem('fp_email'); if (guardado) { email.value = guardado; document.getElementById('recordar').checked = true; } } catch (e) {}

  document.getElementById('ver-pass').addEventListener('click', function () {
    var visible = pass.type === 'text';
    pass.type = visible ? 'password' : 'text';
    this.textContent = visible ? 'Mostrar' : 'Ocultar';
  });

  function marcar(campo, msg, ok) {
    campo.className = ok ? '' : 'invalid';
    campo.setAttribute('aria-invalid', ok ? 'false' : 'true');
    msg.style.display = ok ? 'none' : 'block';
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    var okPass = pass.value.length >= 6;
    marcar(email, errEmail, okEmail);
    marcar(pass, errPass, okPass);
    if (!okEmail) { email.focus(); return; }
    if (!okPass) { pass.focus(); return; }
    try {
      if (document.getElementById('recordar').checked) { window.localStorage.setItem('fp_email', email.value); }
      else { window.localStorage.removeItem('fp_email'); }
    } catch (e) {}
    btn.textContent = 'Ingresando...';
    btn.disabled = true;
    setTimeout(function () { window.location.href = 'dashboard.html'; }, 500);
  });
})();
