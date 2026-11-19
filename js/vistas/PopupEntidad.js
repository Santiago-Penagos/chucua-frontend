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
    const extra = FICHAS_OFICIALES[dominio]?.[entidad.nombre] || {};
    articulo.append(
      this._encabezado(entidad, config),
      this._visual(extra.Imagen, entidad.nombre),
      this._atributos(entidad, extra),
      this._boton(dominio, entidad)
    );
    return articulo;
  }

  _visual(src, alt) {
    if (!src) {
      const aviso = document.createElement('p');
      aviso.className = 'popup-sin-imagen';
      aviso.textContent = 'Sin imagen verídica';
      return aviso;
    }
    const img = document.createElement('img');
    img.className = 'popup-foto';
    img.src = src;
    img.alt = alt || 'Fotografía del lugar';
    img.loading = 'lazy';
    img.onerror = () => {
      const aviso = document.createElement('p');
      aviso.className = 'popup-sin-imagen';
      aviso.textContent = 'Sin imagen verídica';
      img.replaceWith(aviso);
    };
    return img;
  }

  _encabezado(entidad, config) {
    const cabecera = document.createElement('header');
    const titulo = document.createElement('h3');
    titulo.textContent = entidad.nombre || 'Sin nombre';
    const meta = document.createElement('p');
    meta.className = 'popup-meta';
    const dom = document.createElement('span');
    dom.className = 'popup-dominio';
    dom.append(crearContenidoIcono(config), document.createTextNode(config.etiqueta));
    const sector = document.createElement('span');
    sector.textContent = `Sector ${entidad.sector || 'sin asignar'}`;
    meta.append(dom, sector);
    cabecera.append(titulo, meta);
    return cabecera;
  }

  _atributos(entidad, extra) {
    const filtrados = Object.entries(extra).filter(([k]) => k !== 'Imagen');
    const atributos = [...Object.entries(entidad.atributos?.() || {}), ...filtrados];
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
    return String(valor ?? '').trim() || SIN_VALOR;
  }
}
