const ChaIndBarTemplate = (value, of) => {
    var bar = '';
    for (let i = 0; i < of; i++) {
        if (value <= i) {
            bar += '<li class="ind-item"></li>';
        } else {
            bar += '<li class="ind-item ind-active"></li>';
        }
    }
    return bar;
}

const chaIndTemplate = (label, value, of, column) => {
    return `
<section class="ind ${column ? 'ind-column' : ''}">
	<div class="ind-container">
		<div class="ind-title"> <span>${label}</span>
		</div>
		<div class="ind-wrap">
			<ol class="nes-indicator">${ChaIndBarTemplate(value, of)}</ol>
		</div>
		<div class=ind-value>${value}</div>
	</div>
</section>
`
}

export class ChaInd extends HTMLElement {
    constructor() {
        super();
        this.elm = this;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        var attr = this.attributes;
        this.elm.innerHTML = chaIndTemplate(attr.getNamedItem("label").value, parseInt(attr.getNamedItem("value").value), parseInt(attr.getNamedItem("of").value), attr.getNamedItem("column"));
    }
}

window.customElements.define('cha-ind', ChaInd);
