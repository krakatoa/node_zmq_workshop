var zmq = require('zmq');

var frontend = zmq.socket('frontend');
var backend = zmq.socket('dealer');

backend.identity = 'dealer1';
backend.linger = 10000;
backend.reconnect_ivl = 10000;

backend.bind('tcp://127.0.0.1:6001', function(err) {
  if (err) throw err;

  backend.on('message', function(envelope, delimiter, data) {
    //frontend.send(new Buffer([]), zmq.ZMQ_SNDMORE);
    //frontend.send(msg);
    frontend.send([envelope, delimiter, data]);
  });
});

