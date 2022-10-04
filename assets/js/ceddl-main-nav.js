import autoBind from './utils/autobind';

export class CeddlMainNav extends HTMLElement {

  constructor() {

    super()
      .attachShadow({mode: 'open'})
      .innerHTML = `<slot></slot>`;
    this.backdropElm = null;

    autoBind(this);
  }

  toggle() {
    this.querySelector('.js-main-nav').classList.toggle("hidden");
  }


  connectedCallback() {
    this.querySelectorAll('.js-main-nav-toggle').forEach((elm) => {
      elm.addEventListener('click', this.toggle);
    })

  }
}

window.customElements.define('ceddl-main-nav', CeddlMainNav);