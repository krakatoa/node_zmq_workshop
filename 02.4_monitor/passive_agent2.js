var zmq = require("zmq");

var producer = zmq.socket("push");

id = process.pid;
count = 0;

producer.bind("tcp://127.0.0.1:8224", function(err) {
  if (err) throw err;

  setInterval(function() {
    var t = producer.send("msg nro. " + count++ + " (from " + id + ")");
    console.log(t);
  }, 1000);
});
