export class NavegacionPortal {
  constructor({ elemento, secciones }) {
    this.elemento = elemento;
    this.secciones = secciones;
    this.enlaces = [...elemento.querySelectorAll('a[href^="#"]')];
    this.observador = null;
  }

  iniciar() {
    this.enlaces.forEach((enlace) => {
      enlace.addEventListener('click', (evento) => {
        const destino = enlace.getAttribute('href').slice(1);
        evento.preventDefault();
        this.irA(destino);
      });
    });
    this._observarSecciones();
    const inicial = window.location.hash.slice(1) || this.secciones[0];
    this._marcar(inicial);
  }

  irA(id) {
    const destino = document.getElementById(id);
    if (!destino) return;
    destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this._marcar(id);
    history.replaceState(null, '', `#${id}`);
  }

  _marcar(id) {
    this.enlaces.forEach((enlace) => {
      const activo = enlace.getAttribute('href') === `#${id}`;
      if (activo) enlace.setAttribute('aria-current', 'page');
      else enlace.removeAttribute('aria-current');
    });
  }

  _observarSecciones() {
    if (!('IntersectionObserver' in window)) return;
    this.observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) this._marcar(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6] }
    );
    this.secciones.forEach((id) => {
      const seccion = document.getElementById(id);
      if (seccion) this.observador.observe(seccion);
    });
  }
}
