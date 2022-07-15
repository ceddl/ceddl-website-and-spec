
const chaSupportTemplate = (content) => {
    return `<span>${content}</span>`
}


export class ChaSupport extends HTMLElement {
    constructor() {
        super();
        this.elm = this;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        var attr = this.attributes;
        this.elm.innerHTML = chaSupportTemplate(atob('c3VwcG9ydEBjaGFtYXRoZWUuY29t'));
    }
}

window.customElements.define('cha-support', ChaSupport);


export class ChaCall extends HTMLElement {
    constructor() {
        super();
        this.elm = this;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        var attr = this.attributes;
        this.elm.innerHTML = chaSupportTemplate(atob('KzMxIDY4NTgzNTMzOA=='));
    }
}

window.customElements.define('cha-call', ChaCall);


export class ChaAdr extends HTMLElement {
    constructor() {
        super();
        this.elm = this;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        var attr = this.attributes;
        this.elm.innerHTML = chaSupportTemplate(atob('RG9jdG9yIEdvb3NzZW5zc3RyYWF0IDMsIDYzMjUgQlYgQmVyZyBlbiBUZXJibGlqdCwgVGhlIE5ldGhlcmxhbmRz'));
    }
}

window.customElements.define('cha-address', ChaAdr);
