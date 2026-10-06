// Expresiones regulares para las validaciones
// Nombre: solo letras (incluye tildes y ñ) y espacios
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
// Correo: texto@dominio.extension
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

// Muestra un mensaje con estilo según su tipo ("exito" o "error")
// y marca el campo de texto con el mismo color
function mostrarMensaje(mensaje, campo, texto, tipo) {
  let icono = tipo === "exito" ? "✔ " : "✖ ";
  mensaje.innerText = icono + texto;
  mensaje.className = "mensaje " + tipo;
  campo.className = "campo-" + tipo;
}

// Borra el mensaje y el color del campo
function limpiarMensaje(mensaje, campo) {
  mensaje.innerText = "";
  mensaje.className = "";
  campo.className = "";
}

function saludar() {
  let campo = document.getElementById("nombre");
  let resultado = document.getElementById("resultado");
  // Obtener el valor del input sin espacios al inicio ni al final
  let nombre = campo.value.trim();

  // Validar si el usuario escribió algo
  if (nombre === "") {
    mostrarMensaje(resultado, campo, "Por favor, ingresa tu nombre.", "error");
  } else if (nombre.length < 3) {
    mostrarMensaje(resultado, campo, "El nombre debe tener al menos 3 caracteres.", "error");
  } else if (!REGEX_NOMBRE.test(nombre)) {
    mostrarMensaje(resultado, campo, "El nombre solo puede contener letras y espacios.", "error");
  } else {
    mostrarMensaje(resultado, campo, "Hola " + nombre + ", bienvenido al sistema.", "exito");
  }
}

function validarCorreo() {
  let campo = document.getElementById("correo");
  let mensajeCorreo = document.getElementById("mensajeCorreo");
  // Obtener el valor del input sin espacios al inicio ni al final
  let correo = campo.value.trim();

  // Validar si el usuario escribió algo y si tiene un formato válido
  if (correo === "") {
    mostrarMensaje(mensajeCorreo, campo, "Debe ingresar un correo.", "error");
  } else if (!correo.includes("@")) {
    mostrarMensaje(mensajeCorreo, campo, "El correo debe contener el símbolo @.", "error");
  } else if (!REGEX_CORREO.test(correo)) {
    mostrarMensaje(mensajeCorreo, campo, "El formato del correo no es válido. Ejemplo: usuario@gmail.com", "error");
  } else {
    mostrarMensaje(mensajeCorreo, campo, "Correo " + correo + " registrado correctamente.", "exito");
  }
}

// Al volver a escribir en un campo, se borra el mensaje anterior
document.getElementById("nombre").addEventListener("input", function () {
  limpiarMensaje(document.getElementById("resultado"), this);
});

document.getElementById("correo").addEventListener("input", function () {
  limpiarMensaje(document.getElementById("mensajeCorreo"), this);
});

// Al presionar Enter en un campo, se ejecuta su botón
document.getElementById("nombre").addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") saludar();
});

document.getElementById("correo").addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") validarCorreo();
});

// ===== Modo oscuro =====

// Aplica el tema indicado y actualiza el texto del botón
function aplicarTema(oscuro) {
  document.body.classList.toggle("oscuro", oscuro);
  document.getElementById("btnTema").innerText = oscuro ? "☀️ Modo claro" : "🌙 Modo oscuro";
}

// Cambia entre modo claro y oscuro, y guarda la preferencia del usuario
function cambiarTema() {
  let oscuro = !document.body.classList.contains("oscuro");
  aplicarTema(oscuro);
  try {
    localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
  } catch (e) {
    // Si el navegador no permite guardar, el tema solo dura hasta recargar
  }
}

// Al cargar la página, se recupera el tema guardado
try {
  aplicarTema(localStorage.getItem("tema") === "oscuro");
} catch (e) {
  aplicarTema(false);
}
