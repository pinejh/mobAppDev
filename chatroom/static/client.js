var name;
do { name = $( $.parseHTML(prompt('Enter a username:')) ).text(); }
while (name == null || name == '');

var socket = io();
socket.emit('connectName', name);
socket.on('userConnect', function(user_name) {
  showMessage(user_name + ' has joined the chat.');
  //console.log(socket.id);
});

var users;
socket.on('updateUsers', function(u) {
  users = [];
  for (user of u) {
    if(user.id != socket.id) users.push(user);
  }
});

function sendMsg() {
  socket.emit('chatMessage', name, $('#msgInput').val());
  $('#msgInput').val('');
};
socket.on('showMessage', function(user, msg) {
  showMessage(user + ': ' + msg);
});
function showMessage(msg) {
  $('#log').prepend('<li class="msg">'+$( $.parseHTML(msg) ).text()+'</li>');
}
