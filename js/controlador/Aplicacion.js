import { AccionesCrud } from './AccionesCrud.js';
import { Cargador } from './Cargador.js';
import { Pestanas } from './Pestanas.js';
import { FormularioEntidad } from '../vistas/FormularioEntidad.js';
import { Mapa } from '../vistas/Mapa.js';
import { PanelCrud } from '../vistas/PanelCrud.js';
import { mostrarMensaje } from '../vistas/mensajes.js';

export class Aplicacion {
  constructor({ api, dominios, orden, centro, zoom }) {
    this.api = api;
    this.dominios = dominios;
    this.orden = orden;
    this.estado = { dominio: orden[0], sector: '', datos: {} };
    this.cargador = new Cargador(api, orden);
    this.mapa = new Mapa('mapa', {
      centro,
      zoom,
      dominios,
      alSeleccionar: (dominio) => this.cambiarDominio(dominio),
    });
    this.formulario = new FormularioEntidad(
      document.querySelector('#formulario'),
      { alGuardar: (dominio, datos, entidad) => this.acciones.guardar(dominio, datos, entidad) }
    );
    this.acciones = new AccionesCrud({
      api,
      formulario: this.formulario,
      mensajes: document.querySelector('#mensajes'),
      recargar: () => this.cargar(),
      contexto: () => ({
        dominio: this.estado.dominio,
        config: this.dominios[this.estado.dominio],
      }),
    });
    this.panel = new PanelCrud({
      elemento: document.querySelector('#lista-entidades'),
      alEditar: (entidad) => this.acciones.editar(entidad),
      alEliminar: (entidad) => this.acciones.eliminar(entidad),
    });
    this.pestanas = new Pestanas({
      elemento: document.querySelector('#dominio-tabs'),
      dominios,
      orden,
      alCambiar: (dominio) => this.cambiarDominio(dominio),
    });
    this.mensajes = document.querySelector('#mensajes');
    this.estadoApi = document.querySelector('#estado-api');
  }

  iniciar() {
    this.pestanas.render();
    document.querySelector('#filtro-sector').addEventListener('change', (evento) => {
      this.estado.sector = evento.target.value;
      this.cargar();
    });
    document.querySelector('#btn-nueva').addEventListener('click', () => this.acciones.nueva());
    this.cargar();
  }

  cambiarDominio(dominio) {
    if (!this.dominios[dominio]) return;
    this.estado.dominio = dominio;
    this.pestanas.marcar(dominio);
    this.formulario.cerrar();
    this._renderPanel();
  }

  _renderPanel() {
    const { dominio, datos } = this.estado;
    this.panel.render(this.dominios[dominio], datos[dominio] || []);
  }

  async cargar() {
    this.estadoApi.textContent = 'Cargando…';
    this.estadoApi.className = 'estado';
    try {
      this.estado.datos = await this.cargador.cargar(this.estado.sector);
      this.mapa.mostrar(this.estado.datos, this.dominios);
      this._renderPanel();
      this.estadoApi.textContent = 'API conectada';
      this.estadoApi.className = 'estado conectado';
    } catch (error) {
      this.estadoApi.textContent = 'Sin conexión';
      this.estadoApi.className = 'estado desconectado';
      mostrarMensaje(
        this.mensajes,
        `No se pudo cargar la información: ${error.message}`,
        'error'
      );
    }
  }
}
