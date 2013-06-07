var zmq = require('zmq');

var util = require('util');

var worker = zmq.socket('push');

var id = process.argv[2];

worker.connect('tcp://127.0.0.1:4001');
worker.connect('tcp://127.0.0.1:4002');

worker.identity = id;

var count = 0;
setInterval(function() {
  var msg = {
    worker: id,
    report_n: count++,
    heap_used: process.memoryUsage().heapUsed 
  }
  worker.send(JSON.stringify(msg));
  console.log('queued: ' + JSON.stringify(msg));
}, 2000);
