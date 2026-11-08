// ==========================================================
// Motores JEY - Control de sesión en los paneles
// Verifica que haya sesión y que el rol coincida con la
// página; muestra el nombre del usuario y cierra la sesión.
// ==========================================================

const ROL_REQUERIDO = document.currentScript.dataset.rol;

const NOMBRES_ROL = {
  ADMIN: "Administrador",
  MECANICO: "Mecánico",
  CLIENTE: "Cliente"
};

const sesionGuardada = sessionStorage.getItem("motoresJeySesion");
const sesion = sesionGuardada ? JSON.parse(sesionGuardada) : null;
const tieneAcceso = sesion !== null && sesion.rol === ROL_REQUERIDO;

if (sesion === null) {
  window.location.replace("../index.html");
} else if (sesion.rol !== ROL_REQUERIDO) {
  window.location.replace("../403.html");
}

document.addEventListener("DOMContentLoaded", function () {
  if (!tieneAcceso) {
    return;
  }

  document.querySelector(".tarjeta-usuario__nombre").textContent = sesion.nombre;
  document.querySelector(".tarjeta-usuario__rol").textContent = NOMBRES_ROL[sesion.rol];

  document.querySelector(".boton-salir").addEventListener("click", function () {
    sessionStorage.removeItem("motoresJeySesion");
  });
});

window.addEventListener("pageshow", function (evento) {
  if (evento.persisted && sessionStorage.getItem("motoresJeySesion") === null) {
    window.location.replace("../index.html");
  }
});