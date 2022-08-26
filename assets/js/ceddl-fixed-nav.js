export class CeddlFixedNav extends HTMLElement {
    constructor() {
        super()
            .attachShadow({mode: 'open'})
            .innerHTML = `<slot></slot>`;
        this.classList.add("ceddl-fixed-nav");
        this.elm = this;
        this.setOffsets = this.setOffsets.bind(this);
    }

    calcTopOffset(elem) {
        var bounding = elem.getBoundingClientRect();
        return bounding.bottom > 0 ? bounding.bottom : 0;
    };

    calcBottomOffset(elem) {
        var bounding = elem.getBoundingClientRect();
        return -(bounding.top - window.innerHeight) > 0 ? -(bounding.top - window.innerHeight) : 0;
    };

    setOffsets() {
        if (window.matchMedia("(max-width: 1024px)").matches === true) {
            if (!this.classList.contains('ceddl-fixed-nav--vissible')) {
                this.classList.add('ceddl-fixed-nav--hidden')
            }
            if (!this.classList.contains('ceddl-fixed-nav--transitions')) {
                setTimeout(() => this.classList.add('ceddl-fixed-nav--transitions'), 10);
            }
            this.style.top = '0px';
            this.style.bottom = '0px';
        } else {
            this.classList.remove('ceddl-fixed-nav--transitions')
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
        this.setOffsets()
    }
}

window.customElements.define('ceddl-fixed-nav', CeddlFixedNav);
