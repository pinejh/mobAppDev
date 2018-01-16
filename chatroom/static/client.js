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
//var uList = $('#userList');
socket.on('updateUsers', function(u) {
  users = [];
  $('#userList').empty();
  for (user of u) {
    if(user.id != socket.id) {
      users.push(user);
      $('#userList').append('<li>'+user.name + '<span style="color: #dddddd">#' + user.id + '</span></li>');
    } else {
    $('#userList').append('<li>You: '+user.name + '<span style="color: #dddddd">#' + user.id + '</span></li>');
    }
  }
});

function sendMsg() {
  socket.emit('chatMessage', name, $('#msgInput').val());
  $('#msgInput').val('');
};
socket.on('showMessage', function(user, id, msg) {
  showUserMessage(user, id, msg);
});
function showMessage(msg) {
  $('#log').prepend('<li class="logmsg">'+$( $.parseHTML(msg) ).text()+'</li>');
}
function showUserMessage(user, id, msg) {
  $('#log').prepend('<li class="user-'+id+'" data-user='+user+'>'+user + ': ' + $( $.parseHTML(msg) ).text()+'</li>');
}

function toggleDropdown() {
  if($('#ec').attr('data-expand') == 'true') {
    $('#userListDropdown').css('top', '-'+$('#userList').outerHeight()+'px');
    $('#ec').html('Collapse');
    $('#ec').attr('data-expand', 'false');
  } else {
    $('#userList').removeAttr('hidden');
    $('#userListDropdown').css('top', '0');
    $('#ec').html('Expand');
    $('#ec').attr('data-expand', 'true');
  }
}
