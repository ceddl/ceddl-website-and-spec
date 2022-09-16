import Cookies from "./utils/cookie";

const template = document.createElement('template');

template.innerHTML = `
<div class="">
  <slot></slot>
</div>`;

export class CeddlCookieAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
    this.setAttribute("message", value);
  }

  connectedCallback() {
    const cookiesAccepted = Cookies.getCookie("ceddlbyexample-accept-cookies")

    if (cookiesAccepted === "y") {
      this.style.visibility = "hidden";
    } else {
      this.querySelector("button").addEventListener("click", () => {
        this.style.visibility = "hidden";
        Cookies.setCookie("ceddlbyexample-accept-cookies", "y", 365);
      });
    }
  }


  static get observedAttributes() {
    return ["message"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "message") {
        this._message = newValue;
        if (this.childElementCount > 0) this.updateMessage();
      }
    }
  }
}

customElements.define("ceddl-cookie-alert", CeddlCookieAlert);
