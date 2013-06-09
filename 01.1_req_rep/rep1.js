var zmq = require("zmq");

var reply = zmq.socket("rep");

reply.bind("tcp://127.0.0.1:8011", function(err) {
  if (err) throw err;

  reply.on('message', function(msg) {
    console.log("Received: " + msg.toString());
    setTimeout(function() {
      reply.send("8011");
    }, 1000);
  })
});
