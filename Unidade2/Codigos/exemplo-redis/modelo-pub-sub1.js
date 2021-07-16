const redis = require("redis");

const publisher = redis.createClient();

publisher.on('connect', function() {
    console.log('conectou no servidor redis');
});

var x=0
setTimeout(function(){

  console.log('envia')
  publisher.publish("log", x);
  x++;


},1000);
