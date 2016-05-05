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
  send: function(requestEventData, requestGraphData) {
    this.socket.emit('eNotification', requestEventData);
    this.socket.emit('gNotification', requestGraphData);
  }

};
export default wsClient;
