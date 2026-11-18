const BARRIO = 'Chucua de la Vaca';
const TODOS = 'Todos los sectores';

/** Cartel del sector activo, fijado en la esquina superior derecha del mapa. */
export class CartelSector extends L.Control {
  constructor(opciones = {}) {
    super({ position: 'topright', ...opciones });
    this.sector = '';
    this.elemento = null;
  }

  onAdd() {
    this.elemento = document.createElement('div');
    this.elemento.className = 'cartel-sector';
    this.elemento.setAttribute('aria-live', 'polite');
    this._render();
    return this.elemento;
  }

  actualizar(sector) {
    this.sector = sector || '';
    this._render();
  }

  _render() {
    if (!this.elemento) return;
    const titulo = document.createElement('strong');
    titulo.textContent = BARRIO;
    const detalle = document.createElement('span');
    detalle.textContent = this.sector ? `Sector ${this.sector}` : TODOS;
    this.elemento.replaceChildren(titulo, detalle);
  }
}
