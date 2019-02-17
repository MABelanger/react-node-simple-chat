function getUserName() {
  var pathname = window.location.pathname;
  var userName = pathname.split('/')[1];
  return userName;
}

function appendThread(message) {
  if(getUserName() == message.userName) {
    $("#thread").append("<li class='me'>" + message.content + "</li>");
  } else {
    $("#thread").append("<li class='him'>" + message.content + "</li>");
  }
}

function scroolDown() {
  $(document).scrollTop($(document).height() + 20000000);
}

// initializing socket, connection to server
var socket = io.connect("http://localhost:5000");
socket.on("connect", function(data) {
  socket.emit("join", "Hello server from client");
});

// listener for 'thread' event, which updates messages
socket.on("thread", function(message) {
  console.log('message', message);
  appendThread(message);
  scroolDown();
});

// sends message to server, resets & prevents default form action
$("form").submit(function() {
  var content = $("#content").val();
  if(content.length == 0){
    return false;
  }
  var message = {
      userName: getUserName(),
      date: new Date(),
      content: content
  };
  socket.emit("message", message);
  this.reset();
  return false;
});

$.ajax({
    type: 'GET',
    url: '/messages.json',
    success: function (json) {
        var messages = JSON.parse(json);
        for(var i=0; i<messages.length; i++){
          var message = messages[i];
          appendThread(message);
        }
        scroolDown();
    }
});
