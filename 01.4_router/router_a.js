var zmq = require('zmq');

var frontend = zmq.socket('router');

frontend.bind('tcp://127.0.0.1:6000', function(err) {
  if (err) throw err;

  frontend.on('message', function(conn_id, delimiter, data) {
    //console.log([conn_id, delimiter, data]);
    console.log(data.toString());
    frontend.send([conn_id, delimiter, data + " " + process.pid]);
  });
});
