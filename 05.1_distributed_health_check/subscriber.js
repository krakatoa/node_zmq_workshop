var zmq = require('zmq');

var subscriber = zmq.socket('sub');

subscriber.connect("tcp://127.0.0.1:4101");
subscriber.connect("tcp://127.0.0.1:4102");

subscriber.subscribe('');

subscriber.on('message', function(msg) {
  console.log(msg.toString());
});
