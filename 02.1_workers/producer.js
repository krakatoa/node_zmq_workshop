var zmq = require("zmq");

var producer = zmq.socket("push");

count = 0;

producer.bind("tcp://127.0.0.1:4444", function(err) {
  if (err) throw err;

  setInterval(function() {
    var t = producer.send("msg nro. " + count++);
    console.log(t);
  }, 1000);
});
