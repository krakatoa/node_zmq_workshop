var zmq = require("zmq");

var reply = zmq.socket("rep");

if (process.argv[2] == undefined) {
  console.log("Please provide a socket id by running, e.g.: 'node worker 1'.");
  process.exit();
}
reply.identity = "worker-" + process.argv[2];

reply.connect("tcp://127.0.0.1:8015");

reply.on('message', function(msg) {
  console.log("Received: " + msg.toString());
  setTimeout(function() {
    reply.send("OK #" + msg + " (done by " + reply.identity + ")");
  }, 1000);
})
