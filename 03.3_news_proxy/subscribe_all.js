var zmq = require('zmq');

var subscriber = zmq.socket('sub');

subscriber.connect("tcp://127.0.0.1:8233");
//subscriber.connect("tcp://127.0.0.1:8231");

// el subscriber necesita conocer todos los endpoints donde se publican las noticias,
// para evitar esto vamos a ver en el proximo punto el uso de XSUB+XPUB

subscriber.subscribe('');

subscriber.on('message', function(msg) {
  console.log(msg.toString());
});
