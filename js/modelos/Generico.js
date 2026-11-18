import { Entidad } from './Entidad.js';

export function crearModelo(campos) {
  return class ModeloGenerico extends Entidad {
    constructor(feature = {}) {
      super(feature);
      const props = feature.properties || {};
      campos.forEach((campo) => {
        const valor = props[campo.nombre];
        this[campo.nombre] = valor ?? (campo.tipo === 'number' ? 0 : '');
      });
    }

    atributos() {
      return Object.fromEntries(
        campos.map((campo) => [campo.etiqueta, this[campo.nombre]])
      );
    }

    aPayload() {
      const payload = super.aPayload();
      campos.forEach((campo) => {
        payload[campo.nombre] =
          campo.tipo === 'number'
            ? Number(this[campo.nombre])
            : String(this[campo.nombre] ?? '');
      });
      return payload;
    }
  };
}
