var messageDbUtils = require('./messageDb/utils')();

module.exports = function () {
  let module = {};

  module.applyIo = function(io) {
    io.on("connection", function(client) {
      var currentDate = JSON.stringify(new Date());
      console.log("Client connected: " + currentDate);

      client.on("join", function(data) {
        console.log(data);
      });

      client.on("message", function(message) {
        messageDbUtils.appendNewMessage(message, function cb() {
          client.emit("thread", message);
          client.broadcast.emit("thread", message);
        })
      });
    });
  }

  return module;
};
