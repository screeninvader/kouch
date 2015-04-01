Polymer({
  state: null,
  ready: () => {
    console.debug('opening websocket');
    this.socket = new WebSocket('ws://10.20.30.40:8080/', 'janosh');
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onopen =  this.onOpen.bind(this);
    window.onbeforeunload = this.onClose.bind(this);
  },
  send: () => {
    console.debug("sending", arguments);
    try {
      this.socket.send(JSON.stringify(Array.prototype.slice.call(arguments)));
    } catch(error) {
      console.error("Can't send to socket: ", error, this.socket);
    };
  },
  onOpen: () => {
    this.send('get', '/.')
  },
  onMessage: (message) => {
    console.debug("received message", message);
    this.state = JSON.parse(message.data);
  },
  onError: (error) => {
    console.error('Websocket error', error, this.socket);
  },
  onClose: () => {
    this.socket.close();
  },
});
