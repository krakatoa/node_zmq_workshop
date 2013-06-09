var zmq = require("zmq");

var request = zmq.socket("req");

request.connect("tcp://127.0.0.1:8011");
request.connect("tcp://127.0.0.1:8111");
request.connect("tcp://127.0.0.1:8211");

id = process.pid;
count = 0;

setInterval(function() {
  var t = request.send("msg nro. " + count++ + " (from " + id + ")");
  console.log(t);
}, 1000);

request.on("message", function(msg) {
  console.log("Response from: " + msg.toString());
});
