export function mostrarMensaje(elemento, texto, tipo = 'info') {
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.className = `mensaje ${tipo}`;
  elemento.hidden = false;
}

export function limpiarMensaje(elemento) {
  if (!elemento) return;
  elemento.textContent = '';
  elemento.className = 'mensaje';
  elemento.hidden = true;
}
