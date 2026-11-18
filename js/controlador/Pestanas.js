export class Pestanas {
  constructor({ elemento, dominios, orden, grupos, alCambiar }) {
    this.elemento = elemento;
    this.dominios = dominios;
    this.orden = orden;
    this.grupos = grupos;
    this.alCambiar = alCambiar;
    this.activo = orden[0];
  }

  render() {
    const etiqueta = document.createElement('label');
    etiqueta.className = 'selector-dominio';
    etiqueta.append('Dominio');
    this.select = document.createElement('select');
    this.select.id = 'dominio-select';
    this.grupos.forEach((grupo) => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = grupo.nombre;
      grupo.dominios
        .filter((dominio) => this.dominios[dominio])
        .forEach((dominio) => optgroup.append(this._opcion(dominio)));
      if (optgroup.children.length) this.select.append(optgroup);
    });
    this.select.addEventListener('change', () => this.alCambiar(this.select.value));
    etiqueta.append(this.select);

    this.contador = document.createElement('span');
    this.contador.className = 'contador-dominio';
    this.anterior = this._boton('‹', 'Dominio anterior', () => this._mover(-1));
    this.siguiente = this._boton('›', 'Dominio siguiente', () => this._mover(1));
    const navegacion = document.createElement('div');
    navegacion.className = 'navegacion-dominio';
    navegacion.append(this.anterior, this.contador, this.siguiente);

    this.elemento.replaceChildren(etiqueta, navegacion);
    this.marcar(this.activo);
  }

  _opcion(dominio) {
    const opcion = document.createElement('option');
    opcion.value = dominio;
    opcion.textContent = this.dominios[dominio].etiqueta;
    return opcion;
  }

  _boton(texto, etiqueta, accion) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.textContent = texto;
    boton.setAttribute('aria-label', etiqueta);
    boton.addEventListener('click', accion);
    return boton;
  }

  _mover(paso) {
    const indice = this.orden.indexOf(this.activo);
    const destino = this.orden[indice + paso];
    if (destino) this.alCambiar(destino);
  }

  marcar(dominio) {
    this.activo = dominio;
    const indice = this.orden.indexOf(dominio);
    if (this.select) this.select.value = dominio;
    if (this.contador) {
      this.contador.textContent = `${indice + 1} de ${this.orden.length}`;
    }
    if (this.anterior) this.anterior.disabled = indice <= 0;
    if (this.siguiente) this.siguiente.disabled = indice >= this.orden.length - 1;
  }
}
