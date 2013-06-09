var zmq = require("zmq");

var reply = zmq.socket("rep");

reply.bind("tcp://127.0.0.1:8211", function(err) {
  if (err) throw err;

  reply.on('message', function(msg) {
    console.log("Received: " + msg.toString());
    setTimeout(function() {
      reply.send("8211");
    }, 1000);
  })
});
