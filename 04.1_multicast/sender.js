var zmq = require('zmq');

var host = process.argv[2];

var address = "epgm://" + host + ";239.192.1.1:3055"

var pub = zmq.socket('pub');

pub.bind(address, function(err) {
  if (err) throw err;
});

var sub = zmq.socket("sub");
sub.connect(address);
sub.subscribe('');

sub.on("message", function(msg) {
  console.log("RECEIVED: " + msg);
});

setInterval(function() {
  pub.send("Hello, I'm " + host);
}, 1000);
