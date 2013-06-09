var zmq = require('zmq');

var gatherer = zmq.socket("pull");

gatherer.bind("tcp://127.0.0.1:8022", function(err) {
  if (err) throw err;
});

gatherer.on("message", function(msg) {
  console.log(msg.toString());
});
