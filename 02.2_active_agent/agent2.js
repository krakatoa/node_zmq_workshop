var zmq = require('zmq');

var util = require('util');

var agent = zmq.socket('push');

agent.connect('tcp://127.0.0.1:8000');

setInterval(function() {
  agent.send("agent2 memory report: " + util.inspect(process.memoryUsage()));
}, 1000);
