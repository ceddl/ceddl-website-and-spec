const template = document.createElement('template');

template.innerHTML = `
        <style>
            .modal{
                justify-content: center;
                align-items: center;
                position: fixed;
                display: none;
                inset: 0;
            }

            .modal::before{
                background-color: rgba(0,0,0,0.8);
                position: fixed;
                content: "";
                inset: 0;
            }

            .modal .modal_content {
                background-color: var(--col_1);
                position: relative;
                border-radius: 4px;
                max-width: 500px;
                padding: 40px;
                color: #333;
            }

            .modal[open]{
                display: flex;
            }

            .modal_content > button{
                all: unset;
                background-color: hsl(240, 74%, 63%);
                position: absolute;
                border-radius: 4px;
                text-align: center;
                font-size: 1.9 rem;
                padding: 5px 15px;
                cursor: pointer;
                color: white;
                right: 10px;
                top: 10px;
            }

            .modal_content > button:hover{
                background-color: hsl(0, 0%, 20%);
            }
        </style>

        <div class="modal">
            <div class="modal_content">
            <div class="content"></div>
            <button type="button">Close</button>
            </div>
        </div>
    `;

class ModalDialog extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector(".content").innerHTML = this.innerHTML;
    this.shadowRoot.querySelector(".modal_content > button").onclick = () => this.close_modal();
  }

  close_modal() {
    this.shadowRoot.querySelector('.modal').removeAttribute('open');
  }
}

window.customElements.define('modal-dialog', ModalDialog);

window.show_modal = () => {
  "use strict";
  document.querySelector("modal-dialog").shadowRoot.querySelector('.modal').setAttribute('open', 'open');
};