const COLORES = {
  I: '#0b6b4f',
  II: '#1c7ed6',
  III: '#e8590c',
};

const ESTILOS = {
  base: { weight: 2, opacity: 0.9, fillOpacity: 0.08 },
  activo: { weight: 3, opacity: 1, fillOpacity: 0.24 },
  atenuado: { weight: 1, opacity: 0.35, color: '#adb5bd', fillColor: '#adb5bd', fillOpacity: 0.03 },
};

export class CapaSectores {
  constructor(mapa) {
    this.mapa = mapa;
    this.grupo = L.layerGroup().addTo(mapa);
    this.capas = new Map();
    this.etiquetas = new Map();
    this.seleccion = '';
  }

  mostrar(coleccion) {
    this.grupo.clearLayers();
    this.capas.clear();
    this.etiquetas.clear();
    (coleccion?.features || []).forEach((feature) => this._agregar(feature));
    if (this.seleccion) this.seleccionar(this.seleccion);
    else this.todos();
  }

  todos() {
    this.seleccion = '';
    this.capas.forEach((capa, sector) => {
      const color = COLORES[sector];
      capa.setStyle({ ...ESTILOS.base, color, fillColor: color });
      this.etiquetas.get(sector)?.setOpacity(1);
    });
    this._encuadrar([...this.capas.values()]);
  }

  seleccionar(sector) {
    this.seleccion = sector;
    if (!this.capas.has(sector)) return;
    this.capas.forEach((capa, clave) => {
      const activo = clave === sector;
      const color = COLORES[clave];
      capa.setStyle(activo ? { ...ESTILOS.activo, color, fillColor: color } : ESTILOS.atenuado);
      this.etiquetas.get(clave)?.setOpacity(activo ? 1 : 0.35);
    });
    this._encuadrar([this.capas.get(sector)]);
  }

  _agregar(feature) {
    const sector = feature.properties?.sector;
    const anillo = (feature.geometry?.coordinates?.[0] || []).map(([lon, lat]) => [lat, lon]);
    if (!sector || anillo.length < 3) return;
    const color = COLORES[sector] || ESTILOS.base.color;
    const capa = L.polygon(anillo, { ...ESTILOS.base, color, fillColor: color });
    const nombre = feature.properties?.nombre || `Sector ${sector}`;
    const descripcion = feature.properties?.descripcion || '';
    capa.bindTooltip(descripcion ? `${nombre}<br><small>${descripcion}</small>` : nombre, {
      sticky: true,
      direction: 'top',
    });
    capa.addTo(this.grupo);
    this.capas.set(sector, capa);
    this.etiquetas.set(sector, this._etiqueta(capa, sector));
  }

  _etiqueta(capa, sector) {
    const marcador = L.marker(capa.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'etiqueta-sector',
        html: `Sector ${sector}`,
        iconSize: [74, 24],
        iconAnchor: [37, 12],
      }),
      interactive: false,
      keyboard: false,
    });
    return marcador.addTo(this.grupo);
  }

  _encuadrar(capas) {
    if (!capas.length) return;
    this.mapa.invalidateSize();
    const limites = L.featureGroup(capas).getBounds();
    if (limites.isValid()) this.mapa.fitBounds(limites.pad(0.06), { maxZoom: 17 });
  }
}
