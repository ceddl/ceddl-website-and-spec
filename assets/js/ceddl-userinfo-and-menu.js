import MicroXhr from "./utils/microxhr";

const template = document.createElement('template');

template.innerHTML = `
    <style>
    .ceddl-user-info-and-menu {
      padding: 4px;
      background: none;
      color: inherit;
      border: none;
      cursor: pointer;
      font-family: Poppins, sans-serif;
      display: flex;
      align-items: center;
      max-height: 32px;
    }
    
    .ceddl-user-info-and-menu:hover {
      background-color: #006060;
      border-radius: 4px;
      transition: all .2s;
    }
    
    .ceddl-user-info-and-menu-gavatar-border {
      background-color: rgb(255, 255, 255);
      border-radius: 50%;
      padding: 2px;
      height: 24px;
    }
   
    .ceddl-user-info-and-menu-gavatar svg {
      display: block;
    } 
    
    .ceddl-user-info-and-menu-cta span {
      padding: 0 0 0 10px;
      color: #FFFFFF;
      text-decoration: none;
      white-space: nowrap;
    }
    </style>
    <button class="ceddl-user-info-and-menu">
        <div class="ceddl-user-info-and-menu-gavatar"></div>
        <div class="ceddl-user-info-and-menu-cta"></div>
    </button>
`;

class CeddlUserinfoAndMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot
      .appendChild(template.content.cloneNode(true))
      .innerHTML = this.innerHTML;
    this.gavatar = this.shadowRoot.querySelector('.ceddl-user-info-and-menu-gavatar');
    this.cta = this.shadowRoot.querySelector('.ceddl-user-info-and-menu-cta');
  }

  updateGavatar() {
    if (this.activeUser) {
      const color = CeddlUserinfoAndMenu.getBackgroundColor(this.activeUser.nickname);
      this.gavatar.innerHTML = `
       <div class="ceddl-user-info-and-menu-gavatar-border">
        <svg style="background-color: transparent; border-radius: 50%; height: 100%; width: 100%;" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="default avatar image">
          <style>
            .circle { 
              transition: all .2s; 
              fill: ${color}; 
            } 
            text {
               font-family: Poppins, sans-serif;
            }
          </style>
        
          <g class="avatar">
            <circle class="circle" cx="64" cy="64" r="64"></circle>
            <text x="32" y="96" font-size="96" fill="#FFFFFF">${this.activeUser.nickname.charAt(0).toUpperCase()}</text>
          </g>
        </svg>
        </div>
      `;
    } else {
      this.gavatar.innerHTML = `  
       <div class="ceddl-user-info-and-menu-gavatar-border">
        <svg style="background-color: transparent; border-radius: 50%; height: 100%; width: 100%;" viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="default avatar image">
          <style>
            .circle { transition: all .2s; fill: rgb(193, 199, 208); } .avatar { fill: #FFFFFF;} .avatar .human { transition: all .2s; fill: #FFFFFF;} .avatar:hover .human { fill: #a6aebb; } .avatar:hover .circle { fill: #7f8a9d; }
          </style>
        
          <g class="avatar">
            <circle class="circle" cx="64" cy="64" r="64"></circle>
            <g>
              <path class="human" d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"></path>
              <path class="human" d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"></path>
            </g>
          </g>
        </svg>
        </div>
      `;
    }
  }

  updateCta() {
    if (this.activeUser) {
      this.cta.innerHTML = `
          <span>Logout</span>
      `;
    } else {
      this.cta.innerHTML = `
          <span>Log In</span>
      `;
    }
  }

  get activeUser() {
    if (this.user && this.user.user && this.user.user.nickname) {
      return this.user.user;
    } else {
      return undefined;
    }
  }

  static getBackgroundColor(stringInput) {
    let stringUniqueHash = Math.abs([...stringInput].reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0));
    return `hsl(${stringUniqueHash % 360}, 60%, 35%)`;
  }

  connectedCallback() {
    new MicroXhr('/me/', {
      m: 'GET',
      h: {
        'Content-Type': 'application/json'
      }
    }).then((request) => {
      this.user = JSON.parse(request.response);
      this.updateGavatar();
      this.updateCta();
    }).catch((e) => {
      this.updateGavatar();
      this.updateCta();
    });

    this.shadowRoot.querySelector('.ceddl-user-info-and-menu').addEventListener('click', () => {
      if (this.activeUser) {
        window.location.href = window.location.origin + '/logout/';
      } else {
        window.location.href = window.location.origin + '/login/';
      }
    })
  }
}

window.customElements.define('ceddl-user-info-and-menu', CeddlUserinfoAndMenu);
