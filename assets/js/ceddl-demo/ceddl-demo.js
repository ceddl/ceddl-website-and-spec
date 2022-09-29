import {ceddlPolyfillTour} from './ceddl-polyfill-tour.js';

export class CeddlDemos {

  constructor() {
    document.querySelectorAll('#demo-start').forEach((elm) => elm.addEventListener('click', () => {
      ceddlPolyfillTour.startTime = Date.now();
      ceddlPolyfillTour.start()
    }));
  }

}



