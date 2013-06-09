var zmq = require("zmq");

var reply = zmq.socket("rep");

reply.bind("tcp://127.0.0.1:5001", function(err) {
  if (err) throw err;

  reply.on('message', function() {
    var messages = Array.prototype.slice.call(arguments);

    messages.forEach(function(msg) {
      console.log("msgpart: " + msg);
    });

    setTimeout(function() {
      reply.send("5001");
    }, 1000);
  })
});
