var wsClient = {
  socket: null,
  connect: function(port) {
    this.socket = io('http://localhost:'+port+'/', {
      transports: ['websocket']
    });
    this.socket.on('connect', function() {
      console.log('mirage client connected!');
    });
  },
  send: function(requestEvent, eventData) {
    this.socket.emit('mirageEvent', {
      eventType: requestEvent,
      'data': eventData
    });
  }
};
export default wsClient;
