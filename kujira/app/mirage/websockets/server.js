var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.set('transport', ['websocket']);

app.get('/kujira', function(req, res) {
  res.sendfile('index.html');
});

http.listen(8080, function() {
  console.log('server is running...');
});

var rooms = {
  'LoggedIn': [

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
    rooms[roomName].push(socket.id);
    socket.join(roomName);
  });

  socket.on('leave', function(roomName) {
    var toRemove = rooms[roomName].indexOf(socket.id);
    rooms[roomName].splice(toRemove, 1);
    socket.leave('roomName');
  });

  setInterval(function() {
    io.to('Graph1').emit(generateEventData());
    io.to('Graph2').emit(generateEventData());
    io.to('Graph3').emit(generateEventData());
  }, 2000);
  socket.on('mirageEvent', function(event) {
    io.emit(event.eventType, event.data)
  });

});

function generateGraphData() {
  var graphEvents = [];

  for (var x = 0; x < 10; x++) {
    graphEvents[x] = {
      X: x * Math.random(),
      Y: (x + 2) * Math.random()
    };
  }
  return graphEvents;
};
