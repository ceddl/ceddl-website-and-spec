export class CeddlReceiverSocket {

  constructor(key) {
    this.wsUri = this.getWsURi(key);
    this.creatingSocket = false;
    this.sendStore = [];
  }

  send(data) {
    this.checkReceiverSocket(data, (data) => {
      this.receiverSocket.send(JSON.stringify(data));
    })
  }

  getWsURi(key) {
    var loc = window.location;
    var wsUri;
    if (loc.protocol === 'https:') {
      wsUri = 'wss:';
    } else {
      wsUri = 'ws:';
    }
    wsUri += '//' + loc.host;
    wsUri += '/connector';
    wsUri += `?key=${key}`;

    return wsUri;
  }

  /**
   * We only receive errors and warnings from the sertver
   * to the browser window.
   */
  createSocket() {
    var myReceiverSocket = new WebSocket(this.wsUri);
    myReceiverSocket.onmessage = this.logAndIgnore;
    myReceiverSocket.onclose = this.logAndIgnore;
    return myReceiverSocket;
  }

  /**
   * We make sure that the socket connection is open here.
   * some browsers will silently close the connection due
   * to inactivity or missing ping pong process.
   */
  checkReceiverSocket(data, callback) {
    // Success call and move on.
    if (this.receiverSocket && this.receiverSocket.readyState === this.receiverSocket.OPEN) {
      callback(data);
      return;
    }

    this.sendStore.push({
      data, callback
    })

    if (!this.creatingSocket) {
      this.creatingSocket = true;
      const myPushAndRemove = pushAndRemove.bind(this);

      function pushAndRemove() {
        this.creatingSocket = false;
        this.sendStore.forEach((obj) => {
          obj.callback(data);
        });
        this.sendStore = [];
        this.receiverSocket.removeEventListener('open', myPushAndRemove, false);
      }

      this.receiverSocket = this.createSocket();
      this.receiverSocket.addEventListener('open', myPushAndRemove, false);
    }

  }

  logAndIgnore(event) {
    try {
      var myobj = JSON.parse(event.data);
      if (myobj.statusCode) {
        if (window.console) {
          console.log('CeddlReceiverSocket error:', myobj);
        }

      }
    } catch (err) {
      // do nothing
    }
  };
}

