// Expresiones regulares para las validaciones
// Nombre: solo letras (incluye tildes y ñ) y espacios
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
// Correo: texto@dominio.extension
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

function saludar() {
  // Obtener el valor del input sin espacios al inicio ni al final
  let nombre = document.getElementById("nombre").value.trim();
  let resultado = document.getElementById("resultado");

  // Validar si el usuario escribió algo
  if (nombre === "") {
    resultado.innerText = "Por favor, ingresa tu nombre.";
  } else if (nombre.length < 3) {
    resultado.innerText = "El nombre debe tener al menos 3 caracteres.";
  } else if (!REGEX_NOMBRE.test(nombre)) {
    resultado.innerText = "El nombre solo puede contener letras y espacios.";
  } else {
    resultado.innerText = "Hola " + nombre + ", bienvenido al sistema.";
  }
}

function validarCorreo() {
  // Obtener el valor del input sin espacios al inicio ni al final
  let correo = document.getElementById("correo").value.trim();
  let mensajeCorreo = document.getElementById("mensajeCorreo");

  // Validar si el usuario escribió algo y si tiene un formato válido
  if (correo === "") {
    mensajeCorreo.innerText = "Debe ingresar un correo.";
  } else if (!correo.includes("@")) {
    mensajeCorreo.innerText = "El correo debe contener el símbolo @.";
  } else if (!REGEX_CORREO.test(correo)) {
    mensajeCorreo.innerText = "El formato del correo no es válido. Ejemplo: usuario@gmail.com";
  } else {
    mensajeCorreo.innerText = "Correo " + correo + " registrado correctamente.";
  }
}
