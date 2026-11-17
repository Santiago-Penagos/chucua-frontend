import { desdeFeature } from '../modelos/index.js';

export class Cargador {
  constructor(api, orden) {
    this.api = api;
    this.orden = orden;
  }

  async cargar(sector) {
    const respuestas = await Promise.all(
      this.orden.map((dominio) => this.api.listar(dominio, sector))
    );
    const datos = {};
    this.orden.forEach((dominio, indice) => {
      datos[dominio] = (respuestas[indice].features || []).map((feature) =>
        desdeFeature(dominio, feature)
      );
    });
    return datos;
  }
}
