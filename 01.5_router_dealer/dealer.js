var zmq = require("zmq");

var request = zmq.socket("dealer");

request.linger = 1000;
request.reconnect_ivl = 1000;

request.identity = 'request2';

request.connect("tcp://127.0.0.1:7000");

id = process.pid;
count = 0;

setInterval(function() {
  //var t = request.send("msg nro. " + count++ + " (from " + id + ")");
  //var t = request.send(['conn_id', new Buffer([]), "msg nor."]);

  request.send([new Buffer([]), "[" + count++ + "]"])
  //var t = request.send(new Buffer([]), zmq.ZMQ_SNDMORE);
  //var t = request.send("msg nro. " + count++);
}, 1000);

request.on("error", function(err) {
  console.log(err);
});

request.on("message", function(header, msg) {
  console.log("Response from: " + msg.toString());
});
