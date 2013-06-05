var zmq = require("zmq");

var reply = zmq.socket("rep");

reply.bind("tcp://127.0.0.1:5001", function(err) {
  if (err) throw err;

  reply.on('message', function(msg) {
    console.log("Received: " + msg.toString());
    setTimeout(function() {
      reply.send("5001");
    }, 1000);
  })
});
