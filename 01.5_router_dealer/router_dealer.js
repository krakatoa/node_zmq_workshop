var zmq = require('zmq');

var router = zmq.socket('router');
var dealer = zmq.socket('dealer');

router.identity = 'router1';
dealer.identity = 'dealer1';

router.bind('tcp://127.0.0.1:8115', function(err) {
  if (err) throw err;

  router.on('message', function(conn_id, delimiter, data) {
    console.log("ROUTER received: " + data.toString() + " - from " + conn_id.toString());
    dealer.send([conn_id, delimiter, data]);
    
    //dealer.send(new Buffer([]), zmq.ZMQ_SNDMORE);
    //dealer.send(data);
  });
});

dealer.bind('tcp://127.0.0.1:8015', function(err) {
  if (err) throw err;

  dealer.on('message', function(conn_id, delimiter, data) {
    console.log("DEALER received: " + data.toString() + " - to " + conn_id);
    router.send([conn_id, delimiter, data]);
  });
});

