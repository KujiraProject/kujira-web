// import io from 'socket.io';
// import socket.io-client from "npm:socket.io-client";
// var io = require('socket.io-client');
//
// import WebSocket from 'npm:ws';
//
// var wsClient = {
//   connect: function(){
//       var socket = io('http://localhost:8080');
//
//       console.log('connecting to server....');
//
//   },
//   send: function(data, data1) {
//     this.socket.emit('eNotification', data1);
//     this.socket.emit('gNotification', data);
//   }
//
// };
// export default wsClient;





var io = require('socket.io-client');
var socket = io('http://localhost:8080');

socket.on('connect', function(socket) {

  console.log('mirage client connected!');
});
socket.emit('switchRoom', 'Diagram1');
setInterval(function() {
  socket.emit('eNotification', {
    eventType: 'OSDAdded',
    id: 1,
    message: 'message'
  });
  socket.emit('gNotification', {
    X: '11',
    Y: '22'
  });
}, 5000);


socket.on('eNotificationCall', function(data) {
  console.log(data);
});
socket.on('gNotificationCall', function(data) {
  console.log(data);
});
socket.on('disconnect', function() {

});
