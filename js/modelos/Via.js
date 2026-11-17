import { Entidad } from './Entidad.js';

export class Via extends Entidad {
  constructor(feature = {}) {
    super(feature);
    this.tipo_via = feature.properties?.tipo_via ?? '';
    this.estado = feature.properties?.estado ?? '';
  }

  atributos() {
    return { 'Tipo de vía': this.tipo_via, Estado: this.estado };
  }

  aPayload() {
    return {
      ...super.aPayload(),
      tipo_via: this.tipo_via,
      estado: this.estado,
    };
  }
}
