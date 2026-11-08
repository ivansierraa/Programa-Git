// ==========================================================
// Motores JEY - Menú lateral desplegable
// Abre y cierra el menú con el botón, la tecla Esc
// o un clic en el fondo oscuro.
// ==========================================================

const botonMenu = document.querySelector(".boton-menu");
const menuLateral = document.querySelector("#menu-lateral");
const fondoMenu = document.querySelector(".fondo-menu");

function abrirMenu() {
  menuLateral.classList.add("menu-lateral--abierto");
  fondoMenu.hidden = false;
  botonMenu.setAttribute("aria-expanded", "true");
  botonMenu.setAttribute("aria-label", "Cerrar menú");
  menuLateral.querySelector("a").focus();
}

function cerrarMenu() {
  menuLateral.classList.remove("menu-lateral--abierto");
  fondoMenu.hidden = true;
  botonMenu.setAttribute("aria-expanded", "false");
  botonMenu.setAttribute("aria-label", "Abrir menú");
  botonMenu.focus();
}

function menuEstaAbierto() {
  return botonMenu.getAttribute("aria-expanded") === "true";
}

botonMenu.addEventListener("click", function () {
  if (menuEstaAbierto()) {
    cerrarMenu();
  } else {
    abrirMenu();
  }
});

fondoMenu.addEventListener("click", cerrarMenu);

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && menuEstaAbierto()) {
    cerrarMenu();
  }
});