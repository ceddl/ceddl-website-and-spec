import Shepherd from "./shepherd";
import {ceddl} from '@ceddl/ceddl-polyfill'
import {renderJson, getCeddlObject, setCurrentAnalyticsState} from "./ceddl-demo-utils";


let funnelBaseText;
const showFunnel = (funnel) => {
  funnel.timeInFunnel = `${funnel.timeInFunnel / 1000} seconds`;
  ceddlPolyfillTour.currentStep.updateStepOptions({
    text: funnelBaseText + `<br /> <br /> ${renderJson(funnel)}`
  })
}
let formBaseText;
const showForm = (form) => {
  debugger;
  ceddlPolyfillTour.currentStep.updateStepOptions({
    text: formBaseText + `<br /> <br /> ${renderJson(form)}`
  })
}

const ceddlPolyfillTour = new Shepherd.Tour({
  tourName: 'Ceddl polyfill basics',
  useModalOverlay: true,
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    },
    classes: ''
  }
});


ceddl.eventbus.on('funnel', (funnel) => {
  console.log('triggering', funnel);
})

ceddlPolyfillTour.addSteps([
  {
    text: 'Ceddl-polyfill is a system for extracting user behavior data for websites and apps. It uses browser events and html data attributes.\n' +
      '\n' + 'In this demo we will give you an idea of all the features Ceddl-polyfill provides.',
    attachTo: {
      element: '#demo-start',
      on: 'bottom'
    },
    cancelIcon: {
      enabled: false
    },
    popperOptions: {
      modifiers: [{name: 'offset', options: {offset: [0, 22]}}]
    },
    when: {
      show: () => {
        setCurrentAnalyticsState(ceddlPolyfillTour);
      }
    },
    buttons: [
      {
        text: 'Exit',
        action: ceddlPolyfillTour.cancel,
        secondary: true
      },
      {
        text: 'Next',
        action: ceddlPolyfillTour.next
      }
    ]
  }, {
    title: 'Journey click events (ceddl-click)',
    text: () => {
      return `Events are "things" that happen. All clicks generate these events, Like when you clicked to enter this demo. <br /> <br /> ${renderJson(getCeddlObject(1))}`;
    },
    attachTo: {
      element: '#demo-start',
      on: 'bottom'
    },
    popperOptions: {
      modifiers: [{name: 'offset', options: {offset: [0, 22]}}]
    },
    when: {
      show: () => {
        setCurrentAnalyticsState(ceddlPolyfillTour);
      }
    },
    buttons: [
      {
        text: 'Back',
        action: ceddlPolyfillTour.back,
        secondary: true
      },
      {
        text: 'Next',
        action: ceddlPolyfillTour.next
      }
    ]
  }, {
    title: 'The dynamic Web(app) (ceddl-observe)',
    text: () => {
      funnelBaseText = `The web these days is a dynamic place. How to measure a journey during all this change? You observe it! Below the observed data for this demo step.`;
      return funnelBaseText;
    },
    popperOptions: {
      modifiers: [{name: 'offset', options: {offset: [0, 22]}}]
    },
    when: {
      show: () => {
        setCurrentAnalyticsState(ceddlPolyfillTour);
        ceddl.eventbus.on('funnel', showFunnel);
      },
      hide: () => {
        ceddl.eventbus.off('funnel', showFunnel);
      }
    },
    buttons: [
      {
        text: 'Back',
        action: ceddlPolyfillTour.back,
        secondary: true
      },
      {
        text: 'Next',
        action: ceddlPolyfillTour.next
      }
    ]
  }, {
    title: 'The dynamic Web(app) (ceddl-observe)',
    text: () => {
      formBaseText = `Another practical example is behavioral information about forms. Where do users get stuck and what errors did they see.`;
      return formBaseText;
    },
    attachTo: {
      element: '#news-release-form',
      on: 'top'
    },
    scrollTo: {
      behavior: "smooth",
      block: "center"
    },
    popperOptions: {
      modifiers: [{name: 'offset', options: {offset: [0, 22]}}]
    },
    when: {
      show: () => {
        setCurrentAnalyticsState(ceddlPolyfillTour);
        ceddl.eventbus.on('newsReleaseForm', showForm);
      },
      hide: () => {
        ceddl.eventbus.off('newsReleaseForm', showForm);
      }
    },
    buttons: [
      {
        text: 'Back',
        action: ceddlPolyfillTour.back,
        secondary: true
      },
      {
        text: 'Next',
        action: ceddlPolyfillTour.next
      }
    ]
  }
])


export {ceddlPolyfillTour};