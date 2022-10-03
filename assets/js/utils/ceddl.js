import {ceddl} from '@ceddl/ceddl-polyfill'
import {PageMetadata} from '@ceddl/ceddl-aditional-inputs/dist/page-metadata';
import {PageReady} from '@ceddl/ceddl-aditional-inputs/dist/page-ready';
import {Heatmap} from '@ceddl/ceddl-aditional-inputs/dist/heatmap';
import {PerformanceTiming} from '@ceddl/ceddl-aditional-inputs/dist/performance-timing';
import {CeddlReceiverSocket} from "./ceddl-receiver-socket";

PageReady.run(ceddl);
PageMetadata.run(ceddl);
Heatmap.run(ceddl);
PerformanceTiming.run(ceddl);

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
  const mydata = {...data.page, ...data.pageMetadata}
  mydata.indice = 'page_ready';
  socket.send(mydata);
});

ceddl.eventbus.on('performanceTiming', (data) => {
  data.indice = 'performance_timing';
  socket.send(data);
});

ceddl.eventbus.on('click', (data) => {
  data.indice = 'page_ready';
  socket.send(data);
});

ceddl.eventbus.on('funnel', (data) => {
  data.indice = 'funnel';
  socket.send(data);
});


ceddl.initialize();

export {
  ceddl
};