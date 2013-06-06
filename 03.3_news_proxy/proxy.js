var zmq = require('zmq');

var frontend = zmq.socket('xpub');
var backend = zmq.socket('xsub');

frontend.bind("tcp://127.0.0.1:8233", function(err) {
  if (err) throw err;
});

backend.bind("tcp://127.0.0.1:8133", function(err) {
  if (err) throw err;
});

frontend.on('message', function(msg) {
  console.log('received subscription: ' + msg);
  backend.send(msg);
});

backend.on("message", function(msg) {
  console.log("backend: " + msg);
  frontend.send(msg);
});
