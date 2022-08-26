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

    connectedCallback() {
        this.header = document.body.querySelector('header');
        document.addEventListener('scroll', this.setOffsets);
        window.addEventListener('resize', this.setOffsets);

        this.menubutton = this.shadowRoot.getElementById('menuButton')
        this.menubutton.addEventListener('click', console.log);
    }
}

window.customElements.define('ceddl-local-nav', CeddlLocalNav);
