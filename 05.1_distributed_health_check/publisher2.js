var zmq = require('zmq');

var retriever = zmq.socket('pull');
var publisher = zmq.socket('pub');

retriever.bind("tcp://127.0.0.1:4002");

publisher.bind("tcp://127.0.0.1:4102", function(err) {
  if (err) throw err;
});

retriever.on('message', function(msg) {
  console.log('published: ' + msg);
  publisher.send(msg);
});
