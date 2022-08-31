export class CeddlFixedNav extends HTMLElement {
  constructor() {
    super()
      .attachShadow({mode: 'open'})
      .innerHTML = `<slot></slot>`;

    this.classList.add("ceddl-fixed-nav");
    this.elm = this;
    this.setOffsets = this.setOffsets.bind(this);
    this.resetBackdrop = this.resetBackdrop.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  calcTopOffset(elem) {
    var bounding = elem.getBoundingClientRect();
    return bounding.bottom > 0 ? bounding.bottom : 0;
  };

  calcBottomOffset(elem) {
    var bounding = elem.getBoundingClientRect();
    return -(bounding.top - window.innerHeight) > 0 ? -(bounding.top - window.innerHeight) : 0;
  };

  resetBackdrop() {
    const backdropElm = document.querySelector('.ceddl-fixed-nav-backdrop');
    backdropElm.classList.add('hidden');
    backdropElm.classList.remove('fade-out');
    backdropElm.removeEventListener('animationend', this.resetBackdrop);
  }

  toggle() {
    const backdropElm = document.querySelector('.ceddl-fixed-nav-backdrop');
    if (!this.classList.contains('ceddl-fixed-nav--vissible')) {
      this.classList.remove('ceddl-fixed-nav--hidden');
      this.classList.add('ceddl-fixed-nav--vissible');
      backdropElm.classList.remove('hidden');
      backdropElm.classList.add('fade-in');
    } else {
      this.classList.add('ceddl-fixed-nav--hidden');
      this.classList.remove('ceddl-fixed-nav--vissible');
      backdropElm.classList.add('fade-out');
      backdropElm.classList.remove('fade-in');
      backdropElm.addEventListener('animationend', this.resetBackdrop);
    }
  }

  setOffsets() {
    if (window.matchMedia("(max-width: 1024px)").matches === true) {
      if (!this.classList.contains('ceddl-fixed-nav--vissible')) {
        this.classList.add('ceddl-fixed-nav--hidden');
      }
      if (!this.classList.contains('ceddl-fixed-nav--transitions')) {
        setTimeout(() => this.classList.add('ceddl-fixed-nav--transitions'), 10);
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
    window.addEventListener('resize', this.setOffsets);
    this.addEventListener('toggle', this.toggle);
    document.querySelector('.ceddl-fixed-nav-backdrop').addEventListener('click', this.toggle);
    this.setOffsets()
  }
}

window.customElements.define('ceddl-fixed-nav', CeddlFixedNav);
