import autoBind from './utils/autobind';

export class CeddlFixedNav extends HTMLElement {

  constructor() {

    super()
      .attachShadow({mode: 'open'})
      .innerHTML = `<slot></slot>`;
    this.backdropElm = null;

    autoBind(this);
    this.classList.add("ceddl-fixed-nav");
  }

  createBackdropElm() {
    this.backdropElm = document.createElement('div');
    this.backdropElm.id = 'ceddl-fixed-nav-backdrop';
    this.backdropElm.setAttribute('ceddl-click', '');
    this.backdropElm.classList.add('ceddl-fixed-nav-backdrop', 'fade-in');
    this.parentNode.insertBefore(this.backdropElm, this);
    this.backdropElm.addEventListener('click', this.toggle);
  };

  clearBackdrop() {
    this.backdropElm.removeEventListener('animationend', this.clearBackdrop);
    this.backdropElm = this.backdropElm.remove();
  }

  calcTopOffset(elem) {
    var bounding = elem.getBoundingClientRect();
    return bounding.bottom > 0 ? bounding.bottom : 0;
  }

  calcBottomOffset(elem) {
    var bounding = elem.getBoundingClientRect();
    return -(bounding.top - window.innerHeight) > 0 ? -(bounding.top - window.innerHeight) : 0;
  };

  toggle() {
    const backdropElm = document.querySelector('.ceddl-fixed-nav-backdrop');
    if (!this.classList.contains('ceddl-fixed-nav--vissible')) {
      this.classList.remove('ceddl-fixed-nav--hidden');
      this.classList.add('ceddl-fixed-nav--vissible');
      this.createBackdropElm();
    } else {
      this.classList.add('ceddl-fixed-nav--hidden');
      this.classList.remove('ceddl-fixed-nav--vissible');
      backdropElm.classList.add('fade-out');
      backdropElm.classList.remove('fade-in');
      backdropElm.addEventListener('animationend', this.clearBackdrop);
    }
  }

  closeifOpen() {
    if (this.classList.contains('ceddl-fixed-nav--vissible')) {
      this.toggle();
    }
  }

  setOffsets() {
    if (window.matchMedia("(max-width: 1024px)").matches === true) {
      if (!this.classList.contains('ceddl-fixed-nav--vissible')) {
        this.classList.add('ceddl-fixed-nav--hidden');
      }
      if (!this.classList.contains('ceddl-fixed-nav--transitions')) {
        this.classList.add('ceddl-fixed-nav--transitions');
      }
      this.style.top = '0px';
      this.style.bottom = '0px';
    } else {
      this.classList.remove('ceddl-fixed-nav--transitions');
      this.classList.remove('ceddl-fixed-nav--hidden');
      this.style.top = this.calcTopOffset(this.header) + 'px';
      this.style.bottom = this.calcBottomOffset(this.footer) + 'px';
    }
  }

  connectedCallback() {
    this.header = document.body.querySelector('header');
    this.footer = document.body.querySelector('footer');
    document.addEventListener('scroll', this.setOffsets);
    window.addEventListener('resize', () => {
      this.setOffsets();
      this.closeifOpen()
    });
    this.addEventListener('toggle', this.toggle);
    this.setOffsets()
  }
}

window.customElements.define('ceddl-fixed-nav', CeddlFixedNav);
