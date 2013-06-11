var zmq = require("zmq");

var request = zmq.socket("req");

request.identity = 'request2';

request.connect("tcp://127.0.0.1:8014");
//request.connect("tcp://127.0.0.1:8114");

id = process.pid;
count = 0;

setInterval(function() {
  var t = request.send("msg nro. " + count++);
  //console.log(t);
}, 3000);

request.on("message", function(msg) {
  console.log("Response from: " + msg.toString());
});
