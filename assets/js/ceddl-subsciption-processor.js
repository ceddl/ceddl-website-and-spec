import autoBind from "./utils/autobind";
import MicroXhr from "./utils/microxhr";

export class CeddlSubscribe extends HTMLElement {
  constructor() {
    super();
    autoBind(this);
  }

  handleSubmit() {
    var data = {
      uuid: window.location.hash.substring(1),
      member_submit: this.member_submit
    }

    new MicroXhr(this.action, {
      m: this.method,
      b: JSON.stringify(data),
      h: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        const clone = document.importNode(this.successTemplate.content, true);
        this.innerHTML = '';
        this.appendChild(clone);
      }).catch((err) => {
      if (err.status === 404) {
        const clone = document.importNode(this.notFoundTemplate.content, true);
        this.innerHTML = '';
        this.appendChild(clone)
      } else {
        const clone = document.importNode(this.errorTemplate.content, true);
        this.innerHTML = '';
        this.appendChild(clone)
      }
      ;
    });
  }


  connectedCallback() {
    this.action = this.getAttribute('action');
    this.method = this.getAttribute('method');
    this.member_submit = this.getAttribute('data-member-submit');
    this.errorTemplate = this.querySelector('.js-ceddl-error');
    this.successTemplate = this.querySelector('.js-ceddl-success');
    this.notFoundTemplate = this.querySelector('.js-ceddl-not-found');

    if (!this.member_submit) {
      throw new Error('data-member-submit is a required attributes on ceddl-subscription-processor');
    }

    if (!this.method || !this.action) {
      throw new Error('action and method are required attributes on ceddl-subscription-processor');
    }

    this.handleSubmit();
  }
}

window.customElements.define('ceddl-subscription-processor', CeddlSubscribe);
