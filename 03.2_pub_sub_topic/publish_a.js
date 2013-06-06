var zmq = require('zmq');

var publisher = zmq.socket("pub");

publisher.bind("tcp://127.0.0.1:8131", function(err) {
  if (err) throw err;
});

var count = 0;

setInterval(function() {
  publisher.send("a " + count++);
}, 1000);
