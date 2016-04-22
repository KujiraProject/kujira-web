var wsClient = {
  socket: null,
  connect: function() {
    this.socket = io.connect('http://localhost:8080');
    this.socket.on('connect', function() {

      console.log('mirage client connected!');
    });

  },
  send: function(eventData, graphData) {
    this.socket.emit('eNotification', eventData);
    this.socket.emit('gNotification', graphData);
  }

};
export default wsClient;


