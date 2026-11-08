// ==========================================================
// Motores JEY - Inicio de sesión (prototipo)
// Valida el formulario, busca el usuario en una lista
// de prueba y redirige al panel según el rol.
// ==========================================================

// Usuarios de prueba. SOLO para el prototipo: en el sistema real
// la verificación la hace el backend (Spring Boot) y las
// contraseñas nunca se escriben en el código del navegador.
const USUARIOS_PRUEBA = [
  { usuario: "admin", clave: "admin123", nombre: "Iván David Sierra", rol: "ADMIN" },
  { usuario: "mecanico", clave: "meca123", nombre: "Samuel Serna", rol: "MECANICO" },
  { usuario: "cliente", clave: "cliente123", nombre: "Yissenia Urueña Moreno", rol: "CLIENTE" }
];

const PANEL_POR_ROL = {
  ADMIN: "admin/dashboard.html",
  MECANICO: "mecanico/dashboard.html",
  CLIENTE: "cliente/dashboard.html"
};

// ---------- Si ya hay sesión, ir directo al panel ----------
const sesionActiva = sessionStorage.getItem("motoresJeySesion");
if (sesionActiva) {
  window.location.replace(PANEL_POR_ROL[JSON.parse(sesionActiva).rol]);
}

const formulario = document.querySelector("#form-login");
const campoUsuario = document.querySelector("#usuario");
const campoClave = document.querySelector("#clave");
const botonVerClave = document.querySelector("#ver-clave");
const casillaRecordar = document.querySelector("#recordar");

// ---------- Mostrar u ocultar la contraseña ----------
botonVerClave.addEventListener("click", function () {
  const estaOculta = campoClave.type === "password";
  campoClave.type = estaOculta ? "text" : "password";
  botonVerClave.setAttribute("aria-pressed", String(estaOculta));
  botonVerClave.setAttribute("aria-label", estaOculta ? "Ocultar contraseña" : "Mostrar contraseña");
});

// ---------- Mensajes de error junto a cada campo ----------
function mostrarError(campo, mensaje) {
  document.querySelector("#" + campo.id + "-error").textContent = mensaje;
  campo.setAttribute("aria-invalid", "true");
}

function limpiarError(campo) {
  document.querySelector("#" + campo.id + "-error").textContent = "";
  campo.removeAttribute("aria-invalid");
}

campoUsuario.addEventListener("input", function () {
  limpiarError(campoUsuario);
});

campoClave.addEventListener("input", function () {
  limpiarError(campoClave);
});

// ---------- Recordar usuario ----------
const usuarioGuardado = localStorage.getItem("motoresJeyUsuario");
if (usuarioGuardado) {
  campoUsuario.value = usuarioGuardado;
  casillaRecordar.checked = true;
}

// ---------- Envío del formulario ----------
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const usuario = campoUsuario.value.trim();
  const clave = campoClave.value;

  if (clave === "") {
    mostrarError(campoClave, "Escribe tu contraseña.");
    campoClave.focus();
  }
  if (usuario === "") {
    mostrarError(campoUsuario, "Escribe tu usuario.");
    campoUsuario.focus();
  }
  if (usuario === "" || clave === "") {
    return;
  }

  const encontrado = USUARIOS_PRUEBA.find(function (persona) {
    return persona.usuario === usuario && persona.clave === clave;
  });

  if (!encontrado) {
    window.location.href = "error.html";
    return;
  }

  if (casillaRecordar.checked) {
    localStorage.setItem("motoresJeyUsuario", usuario);
  } else {
    localStorage.removeItem("motoresJeyUsuario");
  }

  sessionStorage.setItem("motoresJeySesion", JSON.stringify({
    nombre: encontrado.nombre,
    rol: encontrado.rol
  }));

  window.location.href = PANEL_POR_ROL[encontrado.rol];
});