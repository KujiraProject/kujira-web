var wsClient = {
  socket: null,
  connect: function() {
    this.socket = io('http://localhost:8080/', {
      transports: ['websocket']
    });
    this.socket.on('connect', function() {
      console.log('mirage client connected!');
    });
  },
  send: function(requestEvent, eventData) {
    this.socket.emit('mirageEvent', {
      eventType: requestEvent,
      data: eventData
    });
  }
};
export default wsClient;
