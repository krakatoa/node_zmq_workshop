var zmq = require("zmq");

var dealer = zmq.socket("dealer");

dealer.identity = 'dealer-1';

dealer.connect("tcp://127.0.0.1:8013");
dealer.connect("tcp://127.0.0.1:8113");

id = process.pid;
count = 0;

setInterval(function() {
  var t = dealer.send([new Buffer([]), "msg nro. " + count++]);
  
  //var t = dealer.send(new Buffer([]), zmq.ZMQ_SNDMORE);
  //var t = dealer.send("msg nro. " + count++);
}, 1000);

dealer.on("message", function(header, msg) {
  console.log("Response from: " + msg.toString());
});
