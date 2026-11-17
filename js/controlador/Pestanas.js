export class Pestanas {
  constructor({ elemento, dominios, orden, alCambiar }) {
    this.elemento = elemento;
    this.dominios = dominios;
    this.orden = orden;
    this.alCambiar = alCambiar;
    this.activo = orden[0];
  }

  render() {
    this.elemento.replaceChildren();
    this.orden.forEach((dominio) => {
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.textContent = this.dominios[dominio].etiqueta;
      boton.dataset.dominio = dominio;
      boton.addEventListener('click', () => this.alCambiar(dominio));
      this.elemento.append(boton);
    });
    this.marcar(this.activo);
  }

  marcar(dominio) {
    this.activo = dominio;
    this.elemento.querySelectorAll('button').forEach((boton) => {
      const activo = boton.dataset.dominio === dominio;
      boton.classList.toggle('activo', activo);
      boton.setAttribute('aria-pressed', String(activo));
    });
  }
}
