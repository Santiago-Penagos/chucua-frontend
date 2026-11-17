import { Entidad } from './Entidad.js';

export class Educativo extends Entidad {
  constructor(feature = {}) {
    super(feature);
    this.nivel_educativo = feature.properties?.nivel_educativo ?? '';
    this.naturaleza = feature.properties?.naturaleza ?? '';
  }

  atributos() {
    return {
      'Nivel educativo': this.nivel_educativo,
      Naturaleza: this.naturaleza,
    };
  }

  aPayload() {
    return {
      ...super.aPayload(),
      nivel_educativo: this.nivel_educativo,
      naturaleza: this.naturaleza,
    };
  }
}
