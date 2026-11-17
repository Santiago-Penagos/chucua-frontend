export class Entidad {
  constructor(feature = {}) {
    const props = feature.properties || {};
    this.id = props.id ?? null;
    this.nombre = props.nombre ?? '';
    this.sector = props.sector ?? 'I';
    this.osm_id = props.osm_id ?? null;
    this.geometria = feature.geometry ?? null;
  }

  static desdeFeature(feature) {
    return new this(feature);
  }

  get coordenadas() {
    return this.geometria?.coordinates ?? [];
  }

  atributos() {
    return {};
  }

  aPayload() {
    return {
      nombre: this.nombre,
      sector: this.sector,
      geometry: this.geometria,
    };
  }
}
