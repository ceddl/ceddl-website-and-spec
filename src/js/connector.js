/* jshint browser:true, jquery:true, node:false */
/* globals CEDDL */
CEDDL.initialize();

(function () {
  'use strict';

    var loc = window.location, wsUri;
    if (loc.protocol === 'https:') {
        wsUri = 'wss:';
    } else {
        wsUri = 'ws:';
    }
    wsUri += '//' + loc.host;
    wsUri += '/connector';

    var receiverSocket = new WebSocket(wsUri);

    var pushPageMetadata = function(data) {
        data.indice = 'pageReady';
        receiverSocket.send(JSON.stringify(data));
    };

    var pushPerformanceTiming = function(data) {
        data.indice = 'performanceTiming';
        data.url = window.location.href;
        receiverSocket.send(JSON.stringify(data));
    };

    var pushClick = function(data) {
        data.indice = 'click';
        receiverSocket.send(JSON.stringify(data));
    };

    receiverSocket.onopen = function() {
        CEDDL.eventbus.on('pageMetadata', pushPageMetadata);
        CEDDL.eventbus.on('performanceTiming', pushPerformanceTiming);
        CEDDL.eventbus.on('click', pushClick);
    };

    receiverSocket.onclose = function() {
        CEDDL.eventbus.off('pageMetadata', pushPageMetadata);
        CEDDL.eventbus.off('performanceTiming', pushPerformanceTiming);
        CEDDL.eventbus.off('click', pushClick);
    };

})();
