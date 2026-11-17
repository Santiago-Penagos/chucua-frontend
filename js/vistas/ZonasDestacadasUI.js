export class ZonasDestacadasUI {
  constructor({ elemento, zonas, alUbicar }) {
    this.elemento = elemento;
    this.zonas = zonas;
    this.alUbicar = alUbicar;
  }

  render() {
    this.elemento.replaceChildren(...this.zonas.map((zona) => this._tarjeta(zona)));
  }

  _tarjeta(zona) {
    const articulo = document.createElement('article');
    articulo.className = 'zona';
    articulo.id = `zona-${zona.id}`;

    const titulo = document.createElement('h3');
    titulo.textContent = zona.titulo;
    const sector = document.createElement('p');
    sector.className = 'zona-sector';
    sector.textContent = zona.sector;
    const descripcion = document.createElement('p');
    descripcion.textContent = zona.descripcion;
    const detalle = document.createElement('p');
    detalle.className = 'zona-detalle';
    detalle.textContent = zona.detalle;

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'boton primario';
    boton.textContent = 'Ubicar en el mapa';
    boton.dataset.zona = zona.id;
    boton.setAttribute('aria-label', `Ubicar ${zona.titulo} en el mapa`);
    boton.addEventListener('click', () => this.alUbicar?.(zona));

    articulo.append(titulo, sector, descripcion, detalle, boton);
    return articulo;
  }
}
