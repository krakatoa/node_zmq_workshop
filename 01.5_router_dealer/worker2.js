var zmq = require("zmq");

var reply = zmq.socket("rep");

reply.identity = 'worker2';

reply.connect("tcp://127.0.0.1:7001", function(err) {
  if (err) throw err;

});
reply.on('message', function(msg) {
  console.log("Received: " + msg.toString());
  setTimeout(function() {
    reply.send("OK #" + msg + " (done by " + reply.identity + ")");
  }, 1000);
})
