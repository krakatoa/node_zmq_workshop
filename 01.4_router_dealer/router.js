var zmq = require('zmq');

var frontend = zmq.socket('router');
var backend = zmq.socket('dealer');

frontend.identity = 'router1';

backend.connect('tcp://127.0.0.1:6001');
frontend.bind('tcp://127.0.0.1:6000', function(err) {
  if (err) throw err;

  frontend.on('message', function(conn_id, delimiter, data) {
    //console.log([conn_id, delimiter, data]);
    backend.send([conn_id, delimiter, data]);
  });
});
