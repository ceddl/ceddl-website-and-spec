import {ceddl} from '@ceddl/ceddl-polyfill'

export const renderJson = (object, nesting = 0) => {
  let html = '';
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'object') {
      html = html + `<span class="font-big shepherd-text-green mr-2">${key}:<br /> `
      html = html + renderJson(value, nesting + 1);
    } else {
      html = html + `<span style="margin-left:${nesting * 10}px" class="font-big shepherd-text-green mr-2">${key}:</span><span class="font-big shepherd-text-orange">"${value}"</span><br /> `
    }
  }
  return html;
}

export const getCeddlObject = (type) => {
  switch (type) {
    case 1: {
      return ceddl.getEvents().find((event) => {
        return event.name === 'click' && event.data.xtag === "//*[@id=\"demo-start\"]";
      }).data;
    }
    case 2: {
      return '';
    }
    default: {
      return undefined;
    }
  }
}

export const setCurrentAnalyticsState = (tour) => {
  document.querySelectorAll('[ceddl-observe="funnel"]').forEach((el) => {
    el.removeAttribute('ceddl-observe');
  })
  tour.currentStep.el.setAttribute('ceddl-observe', 'funnel');
  tour.currentStep.el.setAttribute('data-name', tour.options.tourName);
  tour.currentStep.el.setAttribute('data-step', tour.steps.indexOf(tour.currentStep) + 1);
  tour.currentStep.el.setAttribute('data-step-title', tour.currentStep.options.title ? tour.currentStep.options.title : '');
  tour.currentStep.el.setAttribute('data-total-steps', tour.steps.length);
  tour.currentStep.el.setAttribute('data-time-in-funnel', Date.now() - tour.startTime);
}