export class PanelCrud {
  constructor({ elemento, alEditar, alEliminar }) {
    this.elemento = elemento;
    this.alEditar = alEditar;
    this.alEliminar = alEliminar;
  }

  render(config, entidades) {
    this.elemento.replaceChildren();
    if (!entidades.length) {
      const vacio = document.createElement('li');
      vacio.className = 'vacio';
      vacio.textContent = 'Sin registros para este filtro.';
      this.elemento.append(vacio);
      return;
    }
    entidades.forEach((entidad) => {
      const item = document.createElement('li');
      const informacion = document.createElement('div');
      informacion.className = 'item-info';
      const titulo = document.createElement('strong');
      titulo.textContent = entidad.nombre;
      const detalle = document.createElement('span');
      detalle.textContent = `Sector ${entidad.sector} · ${config.etiqueta}`;
      informacion.append(titulo, detalle);

      const acciones = document.createElement('div');
      acciones.className = 'acciones-fila';
      const editar = document.createElement('button');
      editar.type = 'button';
      editar.className = 'boton pequeno';
      editar.textContent = 'Editar';
      editar.addEventListener('click', () => this.alEditar(entidad));
      const eliminar = document.createElement('button');
      eliminar.type = 'button';
      eliminar.className = 'boton pequeno peligro';
      eliminar.textContent = 'Eliminar';
      eliminar.addEventListener('click', () => this.alEliminar(entidad));
      acciones.append(editar, eliminar);

      item.append(informacion, acciones);
      this.elemento.append(item);
    });
  }
}
