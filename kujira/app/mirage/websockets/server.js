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
  'Diagram1': [

  ],
  'LoggedIn': [

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

  socket.on('eNotification', function(data) {
    console.log(data);
    console.log('passing eventData to users in room LoggedIn');

    io.to('LoggedIn').emit('eventNotification', generateEventData());
  });


  socket.on('gNotification', function(data) {
    console.log(data);
    console.log('passing eventData to users in room Diagram1');
    io.to('Diagram1').emit('diagram1Notification', generateGraphData());
  });
});

function generateGraphData() {
  var graphEvents = {};

  for (var x = 0; x < 100; x++) {
    graphEvents[x] = {
      X: x * Math.random(),
      Y: (x + 2) * Math.random()
    };
  }
  return graphEvents;
};

function generateEventData() {
  var notifyEvents = {};

  for (var x = 0; x < 100; x++) {
    notifyEvents[x] = {
      eventType: 'OSDAdded',
      id: x,
      message: 'message' + x
    };
  }
  return notifyEvents;
};
