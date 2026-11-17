import { limpiarMensaje, mostrarMensaje } from '../vistas/mensajes.js';

export class AccionesCrud {
  constructor({ api, formulario, mensajes, recargar, contexto }) {
    this.api = api;
    this.formulario = formulario;
    this.mensajes = mensajes;
    this.recargar = recargar;
    this.contexto = contexto;
  }

  nueva() {
    limpiarMensaje(this.mensajes);
    const { dominio, config } = this.contexto();
    this.formulario.abrir(dominio, config);
  }

  editar(entidad) {
    const { dominio, config } = this.contexto();
    this.formulario.abrir(dominio, config, entidad);
  }

  async guardar(dominio, datos, entidad) {
    try {
      if (entidad?.id) {
        await this.api.actualizar(dominio, entidad.id, datos);
      } else {
        await this.api.crear(dominio, datos);
      }
      this.formulario.cerrar();
      const mensaje = entidad
        ? 'Entidad actualizada correctamente'
        : 'Entidad creada correctamente';
      mostrarMensaje(this.mensajes, mensaje, 'exito');
      await this.recargar();
    } catch (error) {
      mostrarMensaje(this.mensajes, error.message, 'error');
      throw error;
    }
  }

  async eliminar(entidad) {
    if (!window.confirm(`¿Eliminar "${entidad.nombre}"?`)) return;
    const { dominio } = this.contexto();
    try {
      await this.api.eliminar(dominio, entidad.id);
      mostrarMensaje(this.mensajes, 'Entidad eliminada', 'exito');
      await this.recargar();
    } catch (error) {
      mostrarMensaje(this.mensajes, error.message, 'error');
    }
  }
}
