import Shepherd from "./shepherd";
import {ceddl} from '@ceddl/ceddl-polyfill'
import {renderJson, getCeddlObject, setCurrentAnalyticsState, scrollToHandler} from "./ceddl-demo-utils";

let funnelBaseText;
const showFunnel = (funnel) => {
  funnel.timeInFunnel = `${funnel.timeInFunnel / 1000} seconds`;
  ceddlPolyfillTour.currentStep.updateStepOptions({
    text: funnelBaseText + `<br /> <br /> ${renderJson(funnel)}`
  })
}
let formBaseText;
const showForm = (form) => {
  ceddlPolyfillTour.currentStep.updateStepOptions({
    text: formBaseText + `<br /> <br /> ${renderJson(form)}`
  })
}

const ceddlPolyfillTour = new Shepherd.Tour({
  id: 'ceddl-polyfill-basics',
  tourName: 'Ceddl polyfill basics',
  useModalOverlay: true,
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    },
    scrollToHandler,
    classes: ''
  }
});

ceddlPolyfillTour.addSteps([
  {
    text: 'Ceddl-polyfill is a system for extracting user behavior data for websites and apps. It uses browser events and html data attributes.\n' +
      '\n' + 'In this demo we will give you an idea of all the features Ceddl-polyfill provides.',
    attachTo: {
      element: '#demo-start',
      on: 'bottom'
    },
    scrollTo: {
      behavior: "smooth",
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
    scrollTo: {
      behavior: "smooth",
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
    title: 'Turning events to actions (eventbus)',
    text: () => {
      return `All events on the datalayer end up on the <b>eventbus</b>. Can be listened to and then taken action on. <br /><br />
      <div class="prose highlight"><pre tabIndex="0" style="color:#f8f8f2;background-color:#272822;-moz-tab-size:4;-o-tab-size:4;tab-size:4;"><code
        className="language-js" data-lang="js"><span style="display:flex;"><span><span style="color:#a6e22e">ceddl</span>.<span 
        style="color:#a6e22e">eventbus</span>.<span style="color:#a6e22e">on</span>(<span style="color:#e6db74">'click'</span>, <span 
        style="color:#66d9ef">function</span><span>)</span></span></span></code></pre></div>`;
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
    title: 'The dynamic Web/App (ceddl-observe)',
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
    title: 'Data structure of ceddl-observe',
    text: () => {
      return `To make sure observed "things" are according spec it needs structure. Nothing more frustrating than broken product/report after a production release wright. <br /><br />
      <div class="prose prose-sm highlight"><pre tabindex="0" style="color:#f8f8f2;background-color:#272822;-moz-tab-size:4;-o-tab-size:4;tab-size:4;"><code class="language-js" data-lang="js"><span style="display:flex;"><span><span style="color:#a6e22e">ceddl</span>.<span style="color:#a6e22e">modelFactory</span>.<span style="color:#a6e22e">create</span>({
</span></span><span style="display:flex;"><span>  <span style="color:#a6e22e">key</span><span style="color:#f92672">:</span> <span style="color:#e6db74">'newsReleaseForm'</span>,
</span></span><span style="display:flex;"><span>  <span style="color:#a6e22e">root</span><span style="color:#f92672">:</span> <span style="color:#66d9ef">true</span>,
</span></span><span style="display:flex;"><span>  <span style="color:#a6e22e">fields</span><span style="color:#f92672">:</span> {
</span></span><span style="display:flex;"><span>    <span style="color:#a6e22e">name</span><span style="color:#f92672">:</span> {
</span></span><span style="display:flex;"><span>      <span style="color:#a6e22e">type</span><span style="color:#f92672">:</span> <span style="color:#a6e22e">ceddl</span>.<span style="color:#a6e22e">modelFactory</span>.<span style="color:#a6e22e">fields</span>.<span style="color:#a6e22e">StringField</span>,
</span></span><span style="display:flex;"><span>      <span style="color:#a6e22e">required</span><span style="color:#f92672">:</span> <span style="color:#66d9ef">true</span>
</span></span><span style="display:flex;"><span>    },
</span></span><span style="display:flex;"><span>    <span style="color:#a6e22e">errors</span><span style="color:#f92672">:</span> {
</span></span><span style="display:flex;"><span>      <span style="color:#a6e22e">type</span><span style="color:#f92672">:</span> <span style="color:#a6e22e">ceddl</span>.<span style="color:#a6e22e">modelFactory</span>.<span style="color:#a6e22e">fields</span>.<span style="color:#a6e22e">ListField</span>,
</span></span><span style="display:flex;"><span>      <span style="color:#a6e22e">required</span><span style="color:#f92672">:</span> <span style="color:#66d9ef">false</span>,
</span></span><span style="display:flex;"><span>      <span style="color:#a6e22e">foreignModel</span><span style="color:#f92672">:</span> <span style="color:#e6db74">'formError'</span>
</span></span><span style="display:flex;"><span>    }
</span></span><span style="display:flex;"><span>  }
</span></span><span style="display:flex;"><span>});
</span></span></code></pre></div>`;
    },
    attachTo: {
      element: '#news-release-form',
      on: 'top'
    },
    scrollTo: {
      behavior: "smooth"
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
    title: 'The dynamic Web/App (ceddl-observe)',
    text: () => {
      formBaseText = `A practical example is form behaviour. Where do users get stuck? Play around with the form below. Two errors are possible. Don't worry the form has been disabled for this demo.`;
      return formBaseText;
    },
    attachTo: {
      element: '#news-release-form',
      on: 'top'
    },
    scrollTo: {
      behavior: "smooth",
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
  }, {
    title: 'Plugins',
    text: () => {
      return `Community members create amazing plugins for things like <b>heatmaps, reading behaviour, load performance</b>, etc. Install a plugin with three lines of code and fill the eventbus with great stuff...<br /><br />
 <div class="highlight prose prose-sm"><pre tabindex="0" style="color:#f8f8f2;background-color:#272822;-moz-tab-size:4;-o-tab-size:4;tab-size:4;"><code class="language-js" data-lang="js"><span style="display:flex;"><span><span style="color:#66d9ef">import</span> {<span style="color:#a6e22e">ceddl</span>} <span style="color:#a6e22e">from</span> <span style="color:#e6db74">'@ceddl/ceddl-polyfill'</span>
</span></span><span style="display:flex;"><span><span style="color:#66d9ef">import</span> {<span style="color:#a6e22e">PageMetadata</span>} <span style="color:#a6e22e">from</span> <span style="color:#e6db74">'@ceddl/ceddl-aditional-inputs/dist/page-metadata'</span>;
</span></span><span style="display:flex;"><span>
</span></span><span style="display:flex;"><span><span style="color:#a6e22e">PageMetadata</span>.<span style="color:#a6e22e">run</span>(<span style="color:#a6e22e">ceddl</span>);
</span></span></code></pre></div>`;
    },
    attachTo: {
      element: '#getting-started-main',
      on: 'bottom'
    },
    scrollTo: {
      behavior: "smooth",
    },
    popperOptions: {
      modifiers: [{name: 'offset', options: {offset: [0, 22]}}]
    },
    when: {
      show: () => {
        setCurrentAnalyticsState(ceddlPolyfillTour);
      },
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
    title: 'The basics covered',
    text: () => {
      return `<i class="ti-medall text-green-700 text-4xl text-primary mr-2"></i>
             You got it! All the basics of ceddl-polyfill, wright here on the ceddlbyexample homepage. <br /><br />
      Take back control of your customer's digital footprint or <a class="font-bold link" href="/contact/talk-to-an-ceddl-expert/">Talk to a specialist</a> about building
          clean, high-quality data, so you can focus on engagement and growth.
      `;
    },
    attachTo: {
      element: '#getting-started-main',
      on: 'bottom'
    },
    scrollTo: {
      behavior: "smooth",
    },
    popperOptions: {
      modifiers: [{name: 'offset', options: {offset: [0, 22]}}]
    },
    when: {
      show: () => {
        setCurrentAnalyticsState(ceddlPolyfillTour);
      },
    },
    buttons: [
      {
        text: 'Back',
        action: ceddlPolyfillTour.back,
        secondary: true
      },
      {
        text: 'Exit Demo',
        action: ceddlPolyfillTour.next
      }
    ]
  }
])

export {ceddlPolyfillTour};