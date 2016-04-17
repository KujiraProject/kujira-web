var app = require('http').createServer(handler);
var io = require('socket.io')(app);
app.listen(8080);

function handler(req, res) {
  res.writeHead(200);
  res.end('default.index');
}

var rooms = {
  'Diagram1': [

  ],
  'LoggedIn': [

  ]
};

io.on('connection', function(socket) {
  console.log('client connected');


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
    io.to(socket.id).emit('eNotificationCall', data);
    io.to('LoggedIn').emit('eventNotification', data);
  });


  socket.on('gNotification', function(data) {
    console.log(data);
    io.to(socket.id).emit('gNotificationCall', data);
    io.to('Diagram1').emit('diagram1Notification', data);
  });


  socket.on('close', function() {
    console.log('client disconnected');
  });

});
