import Cookies from "./utils/cookie";

const template = document.createElement('template');

template.innerHTML = `
<div>
  <slot style="display: none" name="default"></slot>
  <slot style="display: none" name="yes"></slot>
  <slot style="display: none" name="no"></slot>
</div>`;

export class CeddlCookieStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }


  connectedCallback() {
    const alertEl = document.querySelector('ceddl-cookie-alert');

    if (alertEl) {
      this.render(alertEl.getCurrentStatus())
      alertEl.addEventListener('updated', () => {
        this.render(alertEl.getCurrentStatus());
      })
      this.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-cookie-status-disable')) {
          alertEl.disableNonEssentials();
        }
        if (event.target.classList.contains('js-cookie-status-enable')) {
          alertEl.enableNonEssentials();
        }
      })
    }
  }

  render(status) {
    this.shadowRoot.querySelectorAll('slot').forEach((el) => {
      el.style.display = 'none'
    })
    if (status === 'y') {
      this.shadowRoot.querySelector('slot[name="yes"]').style.display = 'block';
    } else if (status === 'n') {
      this.shadowRoot.querySelector('slot[name="no"]').style.display = 'block';
    } else {
      this.shadowRoot.querySelector('slot[name="default"]').style.display = 'block';
    }
  }

}

customElements.define("ceddl-cookie-status", CeddlCookieStatus);
