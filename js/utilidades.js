// Funciones utilitarias compartidas

function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function generarID() {
  return Date.now();
}

function guardarEnLocalStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

function cargarDelLocalStorage(clave) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : null;
}

function limpiarLocalStorage(clave) {
  localStorage.removeItem(clave);
}

function mostrarNotificacion(mensaje, tipo = 'success') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${tipo} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.insertBefore(alertDiv, document.body.firstChild);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}

// Validaciones
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTexto(texto, minLength = 1, maxLength = 500) {
  return texto.length >= minLength && texto.length <= maxLength;
}

function validarNumero(num, min = 0, max = 10) {
  const n = parseFloat(num);
  return n >= min && n <= max;
}