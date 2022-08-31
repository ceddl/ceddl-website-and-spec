export class CeddlLocalNav extends HTMLElement {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = `<slot id="menuButton" name="menu"></slot><slot></slot>`;
    this.classList.add("ceddl-local-nav");
    this.elm = this;
    this.setOffsets = this.setOffsets.bind(this);
  }

  calcTopOffset(elem) {
    var bounding = elem.getBoundingClientRect();
    return bounding.bottom > 0 ? bounding.bottom : 0;
  };

  setOffsets() {
    this.style.top = this.calcTopOffset(this.header) + 'px';
  };

  sendEventOnMenuClick() {
    const toggleEvent = new CustomEvent('toggle', {});
    this.menubutton = this.querySelector('[slot="menu"]')
    this.menubutton.addEventListener('click', () => {
      document.querySelectorAll('ceddl-fixed-nav').forEach((elm) => {
        elm.dispatchEvent(toggleEvent);
      })
    });
  }

  connectedCallback() {
    this.header = document.body.querySelector('header');
    document.addEventListener('scroll', this.setOffsets);
    window.addEventListener('resize', this.setOffsets);
    this.setOffsets();
    this.sendEventOnMenuClick();
  }
}

window.customElements.define('ceddl-local-nav', CeddlLocalNav);
