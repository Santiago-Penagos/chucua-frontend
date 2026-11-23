import { CapaSectores } from './CapaSectores.js';
import { CapaInfluencia } from './CapaInfluencia.js';
import { CartelSector } from './CartelSector.js';
import { PopupEntidad } from './PopupEntidad.js';
import { crearIcono, crearContenidoIcono } from './iconoDominio.js';

const OSM = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const SAT = 'https://google.com{x}&y={y}&z={z}';

export class MapaInteractivo {
  constructor(id, { centro, zoom, alEditar }) {
    this.mapa = L.map(id).setView(centro, zoom);
    const calles = L.tileLayer(OSM, { maxZoom: 19, attribution: '© OpenStreetMap contributors' }).addTo(this.mapa);
    const satelite = L.tileLayer(SAT, { maxZoom: 20, attribution: '© Google Satellite' });
    L.control.layers({ 'Mapa callejero': calles, 'Vista satelital': satelite }, null, { position: 'topleft' }).addTo(this.mapa);
    this.capaSectores = new CapaSectores(this.mapa);
    this.capaInfluencia = new CapaInfluencia(this.mapa);
    this.cartel = new CartelSector().addTo(this.mapa);
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
    this.cartel.actualizar(sector);
    if (sector) this.capaSectores.seleccionar(sector);
    else this.capaSectores.todos();
  }

  mostrar(datos, dominios, dominioActivo) {
    const config = dominios[dominioActivo];
    this.capas.clearLayers();
    this._leyenda(config, dominioActivo);
    this.capaInfluencia.mostrar(dominioActivo, this.capaSectores.seleccion);
    (datos[dominioActivo] || []).forEach((entidad) => {
      const capa = this._capa(entidad, config);
      if (!capa) return;
      capa.bindPopup(() => this.popup.crear(dominioActivo, config, entidad), { maxWidth: 330, className: 'popup-chucua' });
      capa.addTo(this.capas);
    });
  }

  _capa(entidad, config) {
    const tipo = entidad.geometria?.type;
    const coords = entidad.coordenadas;
    if (!tipo || !coords.length) return null;
    if (tipo === 'Point') {
      return L.marker([coords.at(1), coords.at(0)], { icon: crearIcono(config, entidad.nombre), title: entidad.nombre, alt: entidad.nombre });
    }
    if (tipo === 'LineString') {
      return L.polyline(coords.filter((p) => Array.isArray(p) && p.length >= 2).map((par) => [par.at(1), par.at(0)]), { color: config.color, weight: 5, opacity: 0.85 });
    }
    if (tipo === 'Polygon') {
      return L.polygon((coords.at(0) || []).filter((p) => Array.isArray(p) && p.length >= 2).map((par) => [par.at(1), par.at(0)]), { color: config.color, weight: 2, fillColor: config.color, fillOpacity: 0.25 });
    }
    return null;
  }

  _leyenda(config, dominioActivo) {
    if (!this.leyenda) return;
    this.leyenda.replaceChildren();
    if (!config) return;
    const item = document.createElement('span');
    const texto = document.createElement('span');
    texto.textContent = config.etiqueta;
    item.append(crearContenidoIcono(config, { pequeno: true }), texto);
    this.leyenda.append(item);
    this.capaInfluencia.agregarLeyenda(this.leyenda, dominioActivo);
  }
}
