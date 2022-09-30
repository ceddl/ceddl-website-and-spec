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

var key = 'Y2VkZGxieWV4YW1wbGUuY29tOk9ubGluZTFNb25pdG9yaW5n';
const socket = new CeddlReceiverSocket('')

ceddl.eventbus.on('pageready', (data) => {
  console.log('pageready', data);
  socket.send(data);
});

ceddl.eventbus.on('heatmap:update', (data) => {
  console.log(data);
});

ceddl.eventbus.on('performanceTiming', (data) => {
  console.log('performanceTiming', data);
  socket.send(data);
});

ceddl.eventbus.on('click', (data) => {
  console.log('click', data);
  socket.send(data);
});

ceddl.eventbus.on('initialize', (data) => {
  console.log('initialize', data);
});

window.addEventListener('beforeunload', (event) => {
  console.log('unload', event)
});

var pushPageMetadata = function (data) {
  data.indice = 'page_ready';
  checkReceiverSocket(data, function (data) {
    receiverSocket.send(JSON.stringify(data));
  });
};

var pushPerformanceTiming = function (data) {
  data.indice = 'performance_timing';
  data.url = window.location.href;
  checkReceiverSocket(data, function (data) {
    receiverSocket.send(JSON.stringify(data));
  });
};

var pushClick = function (data) {
  data.indice = 'click';
  checkReceiverSocket(data, function (data) {
    receiverSocket.send(JSON.stringify(data));
  });
};
ceddl.initialize();

export {
  ceddl
};