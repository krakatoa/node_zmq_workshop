var zmq = require("zmq");

var request = zmq.socket("dealer");

request.linger = 1000;
request.reconnect_ivl = 1000;
//request.setsockopt(zmq.ZMQ_LINGER, 1000);
//request.setsockopt(zmq.ZMQ_RECONNECT_IVL_MAX, 1000);

//request.setsockopt(zmq.ZMQ_SNDHWM, 1);

request.identity = 'request1';

request.connect("tcp://127.0.0.1:6000");
request.connect("tcp://127.0.0.1:6001");
//request.connect("tcp://127.0.0.1:5002");
//request.connect("tcp://127.0.0.1:5003");

id = process.pid;
count = 0;

setInterval(function() {
  //var t = request.send("msg nro. " + count++ + " (from " + id + ")");
  //var t = request.send(['conn_id', new Buffer([]), "msg nor."]);
  var t = request.send(new Buffer([]), zmq.ZMQ_SNDMORE);
  var t = request.send("msg nro. " + count++);
}, 1000);

request.on("error", function(err) {
  console.log(err);
});

request.on("message", function(header, msg) {
  console.log("Response from: " + msg.toString());
});
