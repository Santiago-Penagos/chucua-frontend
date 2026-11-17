import { Entidad } from './Entidad.js';

export class Catastro extends Entidad {
  constructor(feature = {}) {
    super(feature);
    this.uso_suelo = feature.properties?.uso_suelo ?? '';
    this.area_m2 = feature.properties?.area_m2 ?? '';
  }

  atributos() {
    return { 'Uso del suelo': this.uso_suelo, 'Área (m²)': this.area_m2 };
  }

  aPayload() {
    return {
      ...super.aPayload(),
      uso_suelo: this.uso_suelo,
      area_m2: Number(this.area_m2),
    };
  }
}
