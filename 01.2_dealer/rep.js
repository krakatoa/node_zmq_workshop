var zmq = require("zmq");

var reply = zmq.socket("rep");

reply.identity = 'worker1';

reply.bind("tcp://127.0.0.1:6001", function(err) {
  if (err) throw err;
});

reply.on('message', function(msg) {
  console.log("Received: " + msg.toString());
  setTimeout(function() {
    reply.send("worker1:" + msg);
  }, 1000);
})
