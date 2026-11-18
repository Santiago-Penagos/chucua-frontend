export class MapaInteractivo {
  constructor(id, { centro, zoom, dominios, alSeleccionar }) {
    this.mapa = L.map(id).setView(centro, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.mapa);
    this.capas = L.layerGroup().addTo(this.mapa);
    this.alSeleccionar = alSeleccionar;
    this.leyenda = document.querySelector('#leyenda');
    this._leyenda();
  }

  centrar(coordenadas, zoom) {
    this.mapa.invalidateSize();
    this.mapa.setView(coordenadas, zoom, { animate: true });
  }

  _leyenda(config) {
    if (!this.leyenda) return;
    this.leyenda.replaceChildren();
    if (!config) return;
    const item = document.createElement('span');
    const color = document.createElement('i');
    color.style.backgroundColor = config.color;
    item.append(color, document.createTextNode(config.etiqueta));
    this.leyenda.append(item);
  }

  mostrar(datos, dominios, dominioActivo) {
    const config = dominios[dominioActivo];
    const entidades = datos[dominioActivo] || [];
    this.capas.clearLayers();
    this._leyenda(config);
    const dibujadas = [];
    entidades.forEach((entidad) => {
      const capa = this._capa(entidad, config?.color);
      if (!capa) return;
      capa.bindPopup(this._popup(entidad));
      capa.on('click', () => this.alSeleccionar?.(dominioActivo, entidad));
      capa.addTo(this.capas);
      dibujadas.push(capa);
    });
    if (dibujadas.length) {
      this.mapa.fitBounds(L.featureGroup(dibujadas).getBounds().pad(0.15), {
        maxZoom: 17,
      });
    }
  }

  _capa(entidad, color) {
    const tipo = entidad.geometria?.type;
    const coords = entidad.coordenadas;
    if (!tipo || !coords.length) return null;
    if (tipo === 'Point') {
      return L.circleMarker([coords[1], coords[0]], {
        radius: 8,
        color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.85,
      });
    }
    if (tipo === 'LineString') {
      return L.polyline(coords.map(([lon, lat]) => [lat, lon]), {
        color,
        weight: 5,
        opacity: 0.85,
      });
    }
    if (tipo === 'Polygon') {
      return L.polygon(coords[0].map(([lon, lat]) => [lat, lon]), {
        color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.25,
      });
    }
    return null;
  }

  _popup(entidad) {
    const filas = [['Sector', entidad.sector], ...Object.entries(entidad.atributos())]
      .map(
        ([clave, valor]) =>
          `<li><strong>${this._escapar(clave)}:</strong> ${this._escapar(valor)}</li>`
      )
      .join('');
    return `<strong>${this._escapar(entidad.nombre)}</strong><ul class="popup-lista">${filas}</ul>`;
  }

  _escapar(valor) {
    return String(valor ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }
}
