var zmq = require("zmq");

var request = zmq.socket("req");

request.linger = 1000;
request.reconnect_ivl = 1000;
//request.setsockopt(zmq.ZMQ_LINGER, 1000);
//request.setsockopt(zmq.ZMQ_RECONNECT_IVL_MAX, 1000);

//request.setsockopt(zmq.ZMQ_SNDHWM, 1);

request.identity = 'request1';

request.connect("tcp://127.0.0.1:7000");

id = process.pid;
count = 0;

setInterval(function() {
  var t = request.send("[" + count++ + "]");
  //console.log(t);
}, 10);

request.on("error", function(err) {
  console.log(err);
});

request.on("message", function(msg) {
  console.log("Response from: " + msg.toString());
});
