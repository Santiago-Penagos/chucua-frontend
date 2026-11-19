import { etiquetaLegible } from './etiquetas.js';
import { crearContenidoIcono } from './iconoDominio.js';
import { FICHAS_OFICIALES } from '../datos/fichasOficiales.js';

const SIN_VALOR = 'Sin dato';

export class PopupEntidad {
  constructor({ alEditar }) {
    this.alEditar = alEditar;
  }

  crear(dominio, config, entidad) {
    const articulo = document.createElement('article');
    articulo.className = 'popup-entidad';
    articulo.append(
      this._encabezado(entidad, config),
      this._atributos(dominio, entidad),
      this._boton(dominio, entidad)
    );
    return articulo;
  }

  _encabezado(entidad, config) {
    const cabecera = document.createElement('header');
    const titulo = document.createElement('h3');
    titulo.textContent = entidad.nombre || 'Sin nombre';
    const meta = document.createElement('p');
    meta.className = 'popup-meta';
    const dominio = document.createElement('span');
    dominio.className = 'popup-dominio';
    dominio.append(crearContenidoIcono(config), document.createTextNode(config.etiqueta));
    const sector = document.createElement('span');
    sector.textContent = `Sector ${entidad.sector || 'sin asignar'}`;
    meta.append(dominio, sector);
    cabecera.append(titulo, meta);
    return cabecera;
  }

  _atributos(dominio, entidad) {
    const base = Object.entries(entidad.atributos?.() || {});
    const extra = Object.entries(FICHAS_OFICIALES[dominio]?.[entidad.nombre] || {});
    const atributos = [...base, ...extra];
    if (!atributos.length) {
      const aviso = document.createElement('p');
      aviso.className = 'popup-sin-datos';
      aviso.textContent = 'Sin atributos registrados.';
      return aviso;
    }
    const lista = document.createElement('dl');
    lista.className = 'popup-atributos';
    atributos.forEach(([clave, valor]) => {
      const termino = document.createElement('dt');
      termino.textContent = etiquetaLegible(clave);
      const detalle = document.createElement('dd');
      detalle.textContent = this._valor(valor);
      lista.append(termino, detalle);
    });
    return lista;
  }

  _boton(dominio, entidad) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'boton pequeno primario popup-editar';
    boton.textContent = 'Editar';
    boton.addEventListener('click', () => this.alEditar?.(dominio, entidad));
    return boton;
  }

  _valor(valor) {
    const texto = String(valor ?? '').trim();
    return texto || SIN_VALOR;
  }
}
