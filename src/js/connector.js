/* jshint browser:true, jquery:false, node:false */
/* globals ceddl */
ceddl.initialize();

(function () {
  'use strict';

    var loc = window.location;
    var wsUri;
    if (loc.protocol === 'https:') {
        wsUri = 'wss:';
    } else {
        wsUri = 'ws:';
    }
    wsUri += '//' + loc.host;
    wsUri += '/connector';
    wsUri += '?key=Y2VkZGxieWV4YW1wbGUuY29tOk9ubGluZTFNb25pdG9yaW5n';


    var logAndIgnore = function(event) {
        try {
            var myobj = JSON.parse(event.data);
            if(myobj.statusCode) {
                if(window.console) {
                    console.log('connector error:', myobj);
                }
                
            }
        }
        catch(err) {
            // do nothing
        }
    };

    /**
     * we only receive errors and warnings from the sertver
     * to the browser window.
     */
    var createSocket = function() {
        var myReceiverSocket = new WebSocket(wsUri);
        myReceiverSocket.onmessage = logAndIgnore;
        myReceiverSocket.onclose = logAndIgnore;
        return myReceiverSocket;
    }
    var receiverSocket = createSocket();

    /**
     * We make sure that the socket connection is open here.
     * some browsers will silently close the connection due
     * to inactivity or missing ping pong process.
     */
    var checkReceiverSocket = function(data, callback) {
        // Success call and moove on.
        if(eceiverSocket.readyState === receiverSocket.OPEN) {
            callback(data);
            return;
        }

        function pushAndRemove() {
            callback(data);
            receiverSocket.removeEventListener('open', pushAndRemove, false);
        }

        receiverSocket = createSocket();
        receiverSocket.addEventListener('open', pushAndRemove, false);
    }

    var pushPageMetadata = function(data) {
        data.indice = 'page_ready';
        checkReceiverSocket(data, function(data) {
            receiverSocket.send(JSON.stringify(data));
        });       
    };

    var pushPerformanceTiming = function(data) {
        data.indice = 'performance_timing';
        data.url = window.location.href;
        checkReceiverSocket(data, function(data) {
            receiverSocket.send(JSON.stringify(data));
        });      
    };

    var pushClick = function(data) {
        data.indice = 'click';
        checkReceiverSocket(data, function(data) {
            receiverSocket.send(JSON.stringify(data));
        });      
    };

    /**
     * Only on the first time that the socket is open
     * we start the listeners on the ceddl eventbus. 
     */
    var init = function() {
        receiverSocket.removeEventListener('open', init, false);
        ceddl.eventbus.on('pageMetadata', pushPageMetadata);
        ceddl.eventbus.on('performanceTiming', pushPerformanceTiming);
        ceddl.eventbus.on('click', pushClick);
    }

    receiverSocket.addEventListener('open', init, false);

})();
