var os = require('os')

var interfaces = os.networkInterfaces();
var addresses = [];
for (k in interfaces) {
  for (k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    // console.log(address);
    if (address.family == 'IPv4' && !address.internal) {
      addresses.push(address.address)
    }
  }
}

var currentAddress = addresses[0];
console.log(currentAddress);
