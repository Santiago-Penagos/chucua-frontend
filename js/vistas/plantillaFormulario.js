import { textoVertices } from '../modelos/geometria.js';

const SECTORES = ['I', 'II', 'III'];

export function escapar(valor) {
  return String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function opciones(lista, valor) {
  return lista
    .map(
      (opcion) =>
        `<option value="${opcion}" ${
          String(valor) === opcion ? 'selected' : ''
        }>${opcion}</option>`
    )
    .join('');
}

function campo(campo, props) {
  const valor = props[campo.nombre] ?? '';
  if (campo.tipo === 'select') {
    return `<label>${campo.etiqueta}<select name="${campo.nombre}" required>${opciones(
      campo.opciones,
      valor
    )}</select></label>`;
  }
  const tipo = campo.tipo === 'number' ? 'number' : 'text';
  return `<label>${campo.etiqueta}<input type="${tipo}" step="any" name="${
    campo.nombre
  }" required value="${escapar(valor)}"></label>`;
}

function geometria(tipo, props) {
  const coords = props.geometria?.coordinates;
  if (tipo === 'Point') {
    const lon = Array.isArray(coords) ? coords[0] : '';
    const lat = Array.isArray(coords) ? coords[1] : '';
    return `<fieldset><legend>Ubicación</legend>
      <label>Longitud<input type="number" step="any" name="lon" required value="${lon}"></label>
      <label>Latitud<input type="number" step="any" name="lat" required value="${lat}"></label>
    </fieldset>`;
  }
  const texto = coords ? textoVertices(coords) : '';
  const ayuda =
    tipo === 'LineString'
      ? 'Una coordenada por línea: longitud, latitud (mínimo 2 vértices).'
      : 'Una coordenada por línea: longitud, latitud (mínimo 3; el anillo se cierra solo).';
  return `<fieldset><legend>Vértices</legend><p class="ayuda">${ayuda}</p>
    <textarea name="vertices" rows="5" required>${escapar(texto)}</textarea></fieldset>`;
}

export function plantilla(config, props = {}) {
  const titulo = props.id ? 'Editar' : 'Nueva';
  return `
    <h2>${titulo} ${escapar(config.etiqueta)}</h2>
    <label>Nombre<input name="nombre" required value="${escapar(
      props.nombre ?? ''
    )}"></label>
    <label>Sector<select name="sector">${opciones(
      SECTORES,
      props.sector ?? 'I'
    )}</select></label>
    ${config.campos.map((item) => campo(item, props)).join('')}
    ${geometria(config.geometria, props)}
    <div class="acciones-fila">
      <button type="submit" class="boton primario">Guardar</button>
      <button type="button" class="boton" data-cancelar>Cancelar</button>
    </div>
    <p class="error-campo" data-error role="alert"></p>`;
}
