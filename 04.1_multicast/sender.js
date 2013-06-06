var zmq = require('zmq');

var address = "epgm://10.0.0.7;239.192.1.1:3055"

var pub = zmq.socket('pub');

pub.bind(address, function(err) {
  if (err) throw err;
});

var sub = zmq.socket("sub");
sub.connect(address);
sub.subscribe('');
sub.on("message", function(msg) {
  console.log("received: " + msg);
});

/*
bla = Thread.new {
  $stdout.puts "started checking"
  loop do
    msg = ''
    sub.recv_string(msg, ZMQ::DONTWAIT)
    if msg != ""
      $stdout.puts "@sub: #{msg}"
      #break
    end
  end
}
*/

setInterval(function() {
  pub.send("bla desde cuzco");
}, 1000);
