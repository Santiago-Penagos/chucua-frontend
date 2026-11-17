export class ErrorApi extends Error {
  constructor(mensaje, estado) {
    super(mensaje);
    this.name = 'ErrorApi';
    this.estado = estado;
  }
}

export class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async _solicitar(ruta, opciones = {}) {
    const { headers, ...resto } = opciones;
    let respuesta;
    try {
      respuesta = await fetch(`${this.baseUrl}${ruta}`, {
        headers: { 'Content-Type': 'application/json', ...(headers || {}) },
        ...resto,
      });
    } catch (error) {
      throw new ErrorApi('No se pudo conectar con la API', 0);
    }
    if (!respuesta.ok) {
      let detalle = `Error ${respuesta.status}`;
      try {
        const cuerpo = await respuesta.json();
        detalle = this._texto(cuerpo.detail) || detalle;
      } catch (error) {
        detalle = `Error ${respuesta.status}`;
      }
      throw new ErrorApi(detalle, respuesta.status);
    }
    return respuesta.status === 204 ? null : respuesta.json();
  }

  _texto(detalle) {
    if (typeof detalle === 'string') return detalle;
    if (Array.isArray(detalle)) return detalle.map((item) => item.msg).join('; ');
    return '';
  }

  listar(dominio, sector) {
    const filtro = sector ? `?sector=${encodeURIComponent(sector)}` : '';
    return this._solicitar(`/api/v1/${dominio}${filtro}`);
  }

  obtener(dominio, id) {
    return this._solicitar(`/api/v1/${dominio}/${id}`);
  }

  crear(dominio, datos) {
    return this._solicitar(`/api/v1/${dominio}`, {
      method: 'POST',
      body: JSON.stringify(datos),
    });
  }

  actualizar(dominio, id, datos) {
    return this._solicitar(`/api/v1/${dominio}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(datos),
    });
  }

  eliminar(dominio, id) {
    return this._solicitar(`/api/v1/${dominio}/${id}`, { method: 'DELETE' });
  }
}
