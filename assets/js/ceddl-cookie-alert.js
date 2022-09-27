import Cookies from "./utils/cookie";

const template = document.createElement('template');

template.innerHTML = `
<div>
  <slot></slot>
</div>`;

export class CeddlCookieAlert extends HTMLElement {


  constructor() {
    super();
    this.enableNonEssentials = this.enableNonEssentials.bind(this);
    this.disableNonEssentials = this.disableNonEssentials.bind(this);
    this.updateEvent = new Event('updated');
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }


  connectedCallback() {
    const cookiesAccepted = Cookies.getCookie("ceddlbyexample-accept-cookies")

    if (cookiesAccepted === "y" || cookiesAccepted === "n") {
      this.style.visibility = "hidden";
    } else {
      this.querySelector("button").addEventListener("click", this.enableNonEssentials);
    }
  }

  enableNonEssentials() {
    this.style.visibility = "hidden";
    Cookies.setCookie("ceddlbyexample-accept-cookies", "y", 365);
    this.dispatchEvent(this.updateEvent);
  }

  disableNonEssentials() {
    this.style.visibility = "hidden";
    Cookies.setCookie("ceddlbyexample-accept-cookies", "n", 365);
    this.dispatchEvent(this.updateEvent);
  }

  getCurrentStatus() {
    return Cookies.getCookie("ceddlbyexample-accept-cookies");
  }

}

customElements.define("ceddl-cookie-alert", CeddlCookieAlert);
