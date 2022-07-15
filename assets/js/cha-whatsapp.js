
const chaWhatsappTemplate = () => {
    return `
<a style="position: fixed; right: 10px; bottom: 15px; z-index:100;" href="https://wa.me/31685835338">
    <img src="/images/whatsapp.png">
</a>
`
}

export class ChaWhatsapp extends HTMLElement {
    constructor() {
        super();
        this.elm = this;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        var attr = this.attributes;
        this.elm.innerHTML = chaWhatsappTemplate();
    }
}

window.customElements.define('cha-whatsapp', ChaWhatsapp);
