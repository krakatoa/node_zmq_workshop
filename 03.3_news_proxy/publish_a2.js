var zmq = require('zmq');

var publisher = zmq.socket("pub");

publisher.connect("tcp://127.0.0.1:8133");

var count = 0;

setInterval(function() {
  publisher.send("a " + count++);
}, 1000);
