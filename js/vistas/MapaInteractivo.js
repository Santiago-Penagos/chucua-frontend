import { CapaSectores } from './CapaSectores.js';
import { PopupEntidad } from './PopupEntidad.js';
import { crearIcono, crearContenidoIcono } from './iconoDominio.js';

const TESELAS = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export class MapaInteractivo {
  constructor(id, { centro, zoom, alEditar }) {
    this.mapa = L.map(id).setView(centro, zoom);
    L.tileLayer(TESELAS, {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.mapa);
    this.capaSectores = new CapaSectores(this.mapa);
    this.capas = L.layerGroup().addTo(this.mapa);
    this.popup = new PopupEntidad({ alEditar });
    this.leyenda = document.querySelector('#leyenda');
    this._leyenda();
  }

  centrar(coordenadas, zoom) {
    this.mapa.invalidateSize();
    this.mapa.setView(coordenadas, zoom, { animate: true });
  }

  async cargarSectores(api) {
    try {
      this.capaSectores.mostrar(await api.sectores());
    } catch (error) {
      this.capaSectores.mostrar({ features: [] });
    }
  }

  filtrarSector(sector) {
    if (sector) this.capaSectores.seleccionar(sector);
    else this.capaSectores.todos();
  }

  mostrar(datos, dominios, dominioActivo) {
    const config = dominios[dominioActivo];
    this.capas.clearLayers();
    this._leyenda(config);
    (datos[dominioActivo] || []).forEach((entidad) => {
      const capa = this._capa(entidad, config);
      if (!capa) return;
      capa.bindPopup(() => this.popup.crear(dominioActivo, config, entidad), {
        maxWidth: 330,
        className: 'popup-chucua',
      });
      capa.addTo(this.capas);
    });
  }

  _capa(entidad, config) {
    const tipo = entidad.geometria?.type;
    const coords = entidad.coordenadas;
    if (!tipo || !coords.length) return null;
    if (tipo === 'Point') {
      return L.marker([coords[1], coords[0]], {
        icon: crearIcono(config, entidad.nombre),
        title: entidad.nombre,
        alt: entidad.nombre,
      });
    }
    if (tipo === 'LineString') {
      const puntos = coords.map(([lon, lat]) => [lat, lon]);
      return L.polyline(puntos, { color: config.color, weight: 5, opacity: 0.85 });
    }
    if (tipo === 'Polygon') {
      const anillo = coords[0].map(([lon, lat]) => [lat, lon]);
      return L.polygon(anillo, {
        color: config.color,
        weight: 2,
        fillColor: config.color,
        fillOpacity: 0.25,
      });
    }
    return null;
  }

  _leyenda(config) {
    if (!this.leyenda) return;
    this.leyenda.replaceChildren();
    if (!config) return;
    const item = document.createElement('span');
    const texto = document.createElement('span');
    texto.textContent = config.etiqueta;
    item.append(crearContenidoIcono(config, { pequeno: true }), texto);
    this.leyenda.append(item);
  }
}
