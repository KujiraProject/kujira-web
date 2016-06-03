var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.set('transport', ['websocket']);

app.get('/kujira', function(req, res) {
  res.sendfile('index.html');
});

http.listen(7000, function() {
  console.log('server is running...');
});
var eventFromMirage;
var rooms = {
  'Events': [

  ],
  'Graph1': [

  ],
  'Graph2': [

  ],
  'Graph3': [

  ]
};

io.on('connection', function(socket) {
  console.log('user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('join', function(roomName) {
    console.log('User with id   ' + socket.id + '     joined the room   ' + roomName.room);
    rooms[roomName.room].push(socket.id);
    socket.join(roomName.room);
  });

  socket.on('mirageEvent', function(event) {
    eventFromMirage = event;
    io.to('Events').emit(event.eventType, event.data);
  });

  socket.on('leave', function(roomName) {
    console.log('User with id   ' + socket.id + '     left room   ' + roomName);
    var toRemove = rooms[roomName].indexOf(socket.id);
    rooms[roomName].splice(toRemove, 1);
    socket.leave(roomName);
  });

  setInterval(function() {
    io.to('Events').emit(eventFromMirage.eventType, eventFromMirage.data);
    io.to('Graph1').emit('graph notification', generateGraphData('Graph1'));
    io.to('Graph2').emit('graph notification', generateGraphData('Graph2'));
    io.to('Graph3').emit('graph notofication', generateGraphData('Graph3'));
  }, Math.floor((Math.random() * 10000) + 5000));



});

function generateGraphData(roomName) {
  var graphEvent = {
    Room: roomName,
    Data: {
      X: 2 * Math.random(),
      Y: (5 + 2) * Math.random()
    }
  };
  return graphEvent;
};
