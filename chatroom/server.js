var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/static'));

http.listen(3000, function() {
  console.log('listening on *:3000');
});

var users = [];

io.on('connection', function(socket) {
  socket.on('connectName', function(uname) {
    io.emit('userConnect', uname);
    console.log(uname + ' has connected.')
    users.push({name: uname, id: socket.id});
    io.emit('updateUsers', users);
  });
  socket.on('chatMessage', function(user, msg) {
    io.emit('showMessage', user, msg);
  });
  socket.on('disconnect', function() {
    for(var i = users.length - 1; i >= 0; i--) {
      if(users[i].id == socket.id) users.splice(i, 1);
    }
    io.emit('updateUsers', users);
  });
});
