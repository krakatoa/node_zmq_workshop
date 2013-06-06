var zmq = require("zmq");

var worker = zmq.socket("pull");

worker.connect("tcp://127.0.0.1:4444");

worker.on("message", function(msg) {
  console.log("received: " + msg);
});
