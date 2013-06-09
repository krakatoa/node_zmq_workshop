var zmq = require("zmq");

var reply = zmq.socket("rep");

reply.bind("tcp://127.0.0.1:8012", function(err) {
  if (err) throw err;

  reply.on('message', function() {
    var messages = Array.prototype.slice.call(arguments);

    console.log("Received multipart message:");
    messages.forEach(function(msg) {
      console.log("msgpart: " + msg);
    });

    setTimeout(function() {
      reply.send("ACK");
    }, 1000);
  })
});
