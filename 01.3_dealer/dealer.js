var zmq = require("zmq");

var request = zmq.socket("dealer");

request.linger = 1000;
request.reconnect_ivl = 1000;
//request.setsockopt(zmq.ZMQ_LINGER, 1000);
//request.setsockopt(zmq.ZMQ_RECONNECT_IVL_MAX, 1000);

request.identity = 'request1';

request.connect("tcp://127.0.0.1:6001");
request.connect("tcp://127.0.0.1:6002");

id = process.pid;
count = 0;

setInterval(function() {
  var t = request.send([new Buffer([]), "msg nro. " + count++]);
  
  //var t = request.send(new Buffer([]), zmq.ZMQ_SNDMORE);
  //var t = request.send("msg nro. " + count++);
}, 1000);

request.on("message", function(header, msg) {
  console.log("Response from: " + msg.toString());
});
