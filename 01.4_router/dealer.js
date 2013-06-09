var zmq = require("zmq");

var request = zmq.socket("dealer");

request.identity = 'request1';

request.connect("tcp://127.0.0.1:8014");
request.connect("tcp://127.0.0.1:8114");

id = process.pid;
count = 0;

setInterval(function() {
  //var t = request.send("msg nro. " + count++ + " (from " + id + ")");
  //var t = request.send(['conn_id', new Buffer([]), "msg nor."]);
  var t = request.send(new Buffer([]), zmq.ZMQ_SNDMORE);
  var t = request.send("msg nro. " + count++);
}, 1000);

request.on("message", function(header, msg) {
  console.log("Response from: " + msg.toString());
});
