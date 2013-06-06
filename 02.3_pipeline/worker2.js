var zmq = require("zmq");

var worker = zmq.socket("pull"),
  reporter = zmq.socket("push");

worker.connect("tcp://127.0.0.1:8023");
reporter.connect("tcp://127.0.0.1:8123");

worker.on("message", function(msg) {
  console.log("received: " + msg);
  setTimeout(function() {
    reporter.send("done: " + msg);
  }, 1000);
});
