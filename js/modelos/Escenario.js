import { Entidad } from './Entidad.js';

export class Escenario extends Entidad {
  constructor(feature = {}) {
    super(feature);
    this.tipo_escenario = feature.properties?.tipo_escenario ?? '';
  }

  atributos() {
    return { 'Tipo de escenario': this.tipo_escenario };
  }

  aPayload() {
    return { ...super.aPayload(), tipo_escenario: this.tipo_escenario };
  }
}
