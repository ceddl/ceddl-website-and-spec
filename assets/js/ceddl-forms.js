import autoBind from "./utils/autobind";
import MicroXhr from "./utils/microxhr";

export class CeddlForms extends HTMLElement {
  constructor() {
    super();
    autoBind(this);
  }

  getAllFormElements(form) {
    let elements = [];
    let elementQuerys = [
      'select',
      'textarea',
      'input[type="email"]',
      'input[type="tel"]',
      'input[type="url"]',
      'input[type="text"]',
      'input[type="radio"]',
      'input[type="checkbox"]',
      'input[type="number"]'
    ]

    for (let selector of elementQuerys) {
      let detectedElms = this.querySelectorAll(selector);
      if (detectedElms.length > 0) {
        for (let i = 0; i < detectedElms.length; i++) {
          elements.push(detectedElms[i]);
        }
      }
    }

    return elements;
  }

  html5ValidTest(Elm) {
    return !Elm.validity.valid;
  }

  formIsValid() {
    let invalid = this.inputs.filter(this.html5ValidTest);
    if (invalid.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  checkValidity(elm) {
    return () => {
      if (this.hasDirectResponce(elm)) {
        if (elm.validity.valid) {
          this.renderOK(elm);
        } else {
          this.renderError(elm);
        }
      }
    }
  }

  formSerialize() {
    var obj = {};
    var elements = this.querySelector('form').querySelectorAll('input, select, textarea');
    for (var i = 0; i < elements.length; ++i) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;

      if (name) {
        obj[name] = value;
      }
    }

    return obj;
  }

  handleSubmit() {
    var body = this.formSerialize(this.form);
    var feedbackEl = this.querySelector('.js-ceddl-form-feedback');
    new MicroXhr(this.action, {
      m: this.method,
      b: JSON.stringify(body),
      h: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        var clone = document.importNode(this.successTemplate.content, true);
        feedbackEl.innerHTML = '';
        feedbackEl.appendChild(clone);
      }).catch(() => {
      var clone = document.importNode(this.errorTemplate.content, true);
      feedbackEl.innerHTML = '';
      feedbackEl.appendChild(clone);
    });
  }


  setlisteners() {
    this.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.inputs.forEach(elm => {
        this.enableDirectResponce(elm).call(this);
        this.checkValidity(elm).call(this);
      })
      if (!this.formIsValid()) {
        this.querySelector('.error').scrollIntoView({block: "start", behavior: "smooth"});
      } else {
        this.handleSubmit();
      }
    }, false);
    this.inputs.forEach((elm) => {
      elm.addEventListener('blur', this.enableDirectResponce(elm), false);
    });
    this.inputs.forEach((elm) => {
      if (elm.nodeName === 'SELECT') {
        elm.addEventListener('change', this.checkValidity(elm), false);
      } else if (elm.type === 'radio') {
        elm.addEventListener('click', this.checkValidity(elm), false);
      } else {
        elm.addEventListener('keyup', this.checkValidity(elm), false);
        elm.addEventListener('click', this.checkValidity(elm), false);
      }
    });
  }

  enableDirectResponce(elm) {
    return () => {
      if (!this.hasDirectResponce(elm)) {
        elm.parentElement.classList.add('ceddl-form-touched');
        if (elm.validity.valid) {
          this.renderOK(elm);
        } else {
          this.renderError(elm);
        }
      }
    }
  }

  hasDirectResponce(elm) {
    return elm.parentElement.classList.contains('ceddl-form-touched');
  }

  renderOK(Elm) {
    Elm.parentElement.classList.remove('error');
    Elm.parentElement.classList.add('success');
  }

  renderError(Elm) {
    Elm.parentElement.classList.remove('success');
    Elm.parentElement.classList.add('error');
  }

  connectedCallback() {
    this.submitEl = this.querySelector('input[type="submit"]');
    this.inputs = this.getAllFormElements();
    this.action = this.getAttribute('action');
    this.method = this.getAttribute('method');
    this.errorTemplate = this.querySelector('.js-ceddl-form-error');
    this.successTemplate = this.querySelector('.js-ceddl-form-success');

    if (!this.method || !this.action) {
      throw new Error('action and method are required attributes on ceddl-forms');
    }

    this.setlisteners();
  }
}

window.customElements.define('ceddl-forms', CeddlForms);
