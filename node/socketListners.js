var messageUtils = require('./message/utils');

module.exports = function () {
  let module = {};

  module.applyClient = function(client) {

      // var currentDate = JSON.stringify(new Date());

      client.on("join", function(data) {
        // console.log(data);
      });

      client.on("message", function(message) {
        messageUtils.appendNewMessage(message, function cb() {
          client.emit("thread", message);
          client.broadcast.emit("thread", message);
        })
      });
  }

  return module;
};
