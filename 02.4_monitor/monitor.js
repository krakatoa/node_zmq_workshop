var zmq = require("zmq");

var collector = zmq.socket("pull");

collector.connect("tcp://127.0.0.1:8124");
collector.connect("tcp://127.0.0.1:8224");

collector.on("message", function(msg) {
  console.log("received: " + msg);
});
