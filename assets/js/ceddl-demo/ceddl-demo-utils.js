import {ceddl} from '@ceddl/ceddl-polyfill'


export const renderJson = (object) => {
  return `<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${renderJsonLoop(object)}</div>`;
}

const renderJsonLoop = (object, nesting = 0) => {
  let html = '';
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'object') {
      html = html + `<span style="margin-left:${nesting * 10}px" class="font-big shepherd-text-green mr-2">${key}:<br /> `
      html = html + renderJsonLoop(value, nesting + 2);
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
  });
  tour.currentStep.el.setAttribute('id', `${tour.options.id}-${tour.steps.indexOf(tour.currentStep) + 1}`);
  tour.currentStep.el.setAttribute('ceddl-observe', 'funnel');
  tour.currentStep.el.setAttribute('data-name', tour.options.tourName);
  tour.currentStep.el.setAttribute('data-step', tour.steps.indexOf(tour.currentStep) + 1);
  tour.currentStep.el.setAttribute('data-step-title', tour.currentStep.options.title ? tour.currentStep.options.title : '');
  tour.currentStep.el.setAttribute('data-total-steps', tour.steps.length);
  tour.currentStep.el.setAttribute('data-time-in-funnel', Date.now() - tour.startTime);
}

export const scrollToHandler = (scrolltoElm) => {
  const box = scrolltoElm.getBoundingClientRect();
  const yCenter = (box.top + box.bottom) / 2
  const goingUp = document.body.scrollTop > yCenter;

  if (box.top >= 0 && box.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
    return; // within viewport
  }
  if (goingUp === true) {
    window.scrollTo({top: document.documentElement.scrollTop + box.top - 45, behavior: 'smooth'});
  } else {
    window.scrollTo({
      top: document.documentElement.scrollTop + box.bottom - window.innerHeight + 45,
      behavior: 'smooth'
    });
  }
}