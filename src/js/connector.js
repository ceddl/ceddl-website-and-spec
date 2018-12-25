/* jshint browser:true, jquery:false, node:false */
/* globals ceddl */
ceddl.initialize();

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
        ceddl.eventbus.on('pageMetadata', pushPageMetadata);
        ceddl.eventbus.on('performanceTiming', pushPerformanceTiming);
        ceddl.eventbus.on('click', pushClick);
    };

    receiverSocket.onclose = function() {
        ceddl.eventbus.off('pageMetadata', pushPageMetadata);
        ceddl.eventbus.off('performanceTiming', pushPerformanceTiming);
        ceddl.eventbus.off('click', pushClick);
    };

})();
