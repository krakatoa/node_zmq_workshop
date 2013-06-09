var zmq = require('zmq');

var frontend = zmq.socket('router');

frontend.identity = 'router2';

frontend.bind('tcp://127.0.0.1:8114', function(err) {
  if (err) throw err;

  frontend.on('message', function(conn_id, delimiter, data) {
    //console.log([conn_id, delimiter, data]);
    console.log(conn_id);
    console.log(delimiter);
    console.log(data.toString());
    frontend.send([conn_id, delimiter, data + " " + process.pid]);
  });
});
