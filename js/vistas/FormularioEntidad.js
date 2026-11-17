import { parsearPunto, parsearVertices } from '../modelos/geometria.js';
import { plantilla } from './plantillaFormulario.js';

export class FormularioEntidad {
  constructor(elemento, { alGuardar }) {
    this.elemento = elemento;
    this.alGuardar = alGuardar;
    this.dominio = null;
    this.config = null;
    this.entidad = null;
    this._enviar = this._enviar.bind(this);
    this.elemento.addEventListener('submit', this._enviar);
  }

  abrir(dominio, config, entidad = null) {
    this.dominio = dominio;
    this.config = config;
    this.entidad = entidad;
    this.elemento.innerHTML = plantilla(config, entidad || {});
    this.elemento.classList.remove('oculto');
    this.elemento
      .querySelector('[data-cancelar]')
      .addEventListener('click', () => this.cerrar());
    this.elemento.querySelector('input[name="nombre"]').focus();
  }

  cerrar() {
    this.elemento.classList.add('oculto');
    this.elemento.innerHTML = '';
    this.dominio = null;
    this.config = null;
    this.entidad = null;
  }

  async _enviar(event) {
    event.preventDefault();
    const error = this.elemento.querySelector('[data-error]');
    const boton = this.elemento.querySelector('button[type="submit"]');
    error.textContent = '';
    try {
      const datos = this._leer();
      if (boton) boton.disabled = true;
      await this.alGuardar(this.dominio, datos, this.entidad);
    } catch (excepcion) {
      error.textContent = excepcion.message;
    } finally {
      if (boton) boton.disabled = false;
    }
  }

  _leer() {
    const datos = new FormData(this.elemento);
    const nombre = String(datos.get('nombre') || '').trim();
    if (!nombre) throw new Error('El nombre es obligatorio');
    const payload = {
      nombre,
      sector: datos.get('sector'),
      geometry: this._geometria(datos),
    };
    this.config.campos.forEach((campo) => {
      const valor = datos.get(campo.nombre);
      if (campo.requerido && String(valor ?? '').trim() === '') {
        throw new Error(`El campo ${campo.etiqueta} es obligatorio`);
      }
      payload[campo.nombre] =
        campo.tipo === 'number' ? Number(valor) : String(valor);
    });
    return payload;
  }

  _geometria(datos) {
    if (this.config.geometria === 'Point') {
      return {
        type: 'Point',
        coordinates: parsearPunto(datos.get('lon'), datos.get('lat')),
      };
    }
    const esPoligono = this.config.geometria === 'Polygon';
    const coords = parsearVertices(
      datos.get('vertices'),
      esPoligono ? 3 : 2,
      esPoligono
    );
    return {
      type: this.config.geometria,
      coordinates: esPoligono ? [coords] : coords,
    };
  }
}
