var zmq = require("zmq");

var request = zmq.socket("req");

request.connect("tcp://127.0.0.1:8012");

id = process.pid;
count = 0;

setInterval(function() {
  if (count % 2 == 0) {
    var t = request.send("msg nro. " + count++ + " (from " + id + ")", zmq.ZMQ_SNDMORE);
  } else {
    var t = request.send("msg nro. " + count++ + " (from " + id + ")");
  };
  console.log(t);
}, 3000);

request.on("message", function(msg) {
  console.log("Response from: " + msg.toString());
});
