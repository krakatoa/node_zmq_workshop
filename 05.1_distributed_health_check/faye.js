var zmq = require('zmq'),
  http = require('http'),
  faye = require('faye');

var subscriber = zmq.socket('sub');

var host = '127.0.0.1';
var port = process.argv[2] || 8000;

subscriber.connect("tcp://127.0.0.1:4101");
subscriber.connect("tcp://127.0.0.1:4102");

var bayeux = new faye.NodeAdapter({
  mount: '/faye',
  timeout: 45
});

subscriber.subscribe('');

subscriber.on('message', function(msg) {
  console.log('read: ' + msg.toString());
  
  var json_msg = JSON.parse(msg.toString());
  bayeux.getClient().publish('/foo', {'status': json_msg});
});

bayeux.listen(port);
