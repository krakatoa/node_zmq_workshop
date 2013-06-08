var zmq = require('zmq');
var os = require('os')

function currentAddress() { // -> the current IP address is read from interfaces

  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (k in interfaces) {
    for (k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family == 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  
  return addresses[0];
};

console.log("Running on " + currentAddress());

var multicast_address = "239.192.1.1:3055";

var address = "epgm://" + currentAddress() + ";" + multicast_address;

var pub = zmq.socket('pub');

pub.bind(address, function(err) {
  if (err) throw err;
});

var sub = zmq.socket("sub");
sub.connect(address);
sub.subscribe('');

sub.on("message", function(msg) {
  console.log("RECEIVED : " + msg);
});

setInterval(function() {
  pub.send("Hello, I'm " + currentAddress());
}, 1000);
