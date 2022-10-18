import {ceddl} from '@ceddl/ceddl-polyfill'
import {PageMetadata} from '@ceddl/ceddl-aditional-inputs/dist/page-metadata';
import {PageReady} from '@ceddl/ceddl-aditional-inputs/dist/page-ready';
import {Heatmap} from '@ceddl/ceddl-aditional-inputs/dist/heatmap';
import {UrchinTracking} from '@ceddl/ceddl-aditional-inputs/dist/urchin-tracking';

import {PerformanceTiming} from '@ceddl/ceddl-aditional-inputs/dist/performance-timing';
import {CeddlReceiverSocket} from "./ceddl-receiver-socket";

PageReady.run(ceddl);
PageMetadata.run(ceddl);
Heatmap.run(ceddl);
PerformanceTiming.run(ceddl);
UrchinTracking.run(ceddl);


const defaultMeta = {
  title: document.title,
  url: window.location.href,
  path: document.location.pathname,
  width: Math.round(parseInt(screen.width, 10) * devicePixelRatio)
};

ceddl.modelFactory.create({
  key: 'page',
  root: true,
  fields: {
    language: {
      type: ceddl.modelFactory.fields.StringField,
      required: true,
    },
    segment: {
      type: ceddl.modelFactory.fields.StringField,
      required: true,
    },
    sections: {
      type: ceddl.modelFactory.fields.StringField,
      required: true,
    }
  }
});

ceddl.modelFactory.create({
  key: 'funnel',
  root: true,
  fields: {
    name: {
      type: ceddl.modelFactory.fields.StringField,
      required: true,
    },
    step: {
      type: ceddl.modelFactory.fields.NumberField,
      required: true,
    },
    stepTitle: {
      type: ceddl.modelFactory.fields.StringField,
      required: false,
    },
    totalSteps: {
      type: ceddl.modelFactory.fields.NumberField,
      required: true,
    },
    timeInFunnel: {
      type: ceddl.modelFactory.fields.NumberField,
      required: false,
    }
  }
});

ceddl.modelFactory.create({
  key: 'newsReleaseForm',
  root: true,
  fields: {
    name: {
      type: ceddl.modelFactory.fields.StringField,
      required: true
    },
    errors: {
      type: ceddl.modelFactory.fields.ListField,
      required: false,
      foreignModel: 'formError'
    }
  }
});

ceddl.modelFactory.create({
  key: 'formError',
  root: false,
  fields: {
    name: {
      type: ceddl.modelFactory.fields.StringField,
      required: true,
    },
    type: {
      type: ceddl.modelFactory.fields.StringField,
      required: true,
      pattern: '^(main|field)$'
    },
    content: {
      type: ceddl.modelFactory.fields.StringField,
      required: false
    },
    errorCode: {
      type: ceddl.modelFactory.fields.StringField,
      required: false
    },
    transactionId: {
      type: ceddl.modelFactory.fields.StringField,
      required: false
    }
  }
});

const ID = 'Y2VkZGxieWV4YW1wbGUuY29tOk9ubGluZTFNb25pdG9yaW5n';
const socket = new CeddlReceiverSocket(ID)

ceddl.eventbus.on('pageready', (data) => {
  socket.send({...data.page, ...data.pageMetadata, ...{indice: 'page_ready'}});
});

ceddl.eventbus.on('performanceTiming', (data) => {
  socket.send({...defaultMeta, ...data, ...{indice: 'performance_timing'}});
});

ceddl.eventbus.on('click', (data) => {
  socket.send({...defaultMeta, ...data, ...{indice: 'click'}});
});

ceddl.eventbus.on('funnel', (data) => {
  socket.send({...defaultMeta, ...data, ...{indice: 'funnel'}});
});

ceddl.eventbus.once('urchinTracking', (data) => {
  ceddl.eventbus.once('page', (pageData) => {
    socket.send({...defaultMeta, ...data, ...pageData, ...{indice: 'campaigns'}});
  });
});

ceddl.initialize();

export {
  ceddl
};