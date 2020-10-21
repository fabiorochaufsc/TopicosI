const redis = require("redis");

const publisher = redis.createClient();

publisher.on('connect', function() {
    console.log('conectou no servidor redis');
});


setTimeout(function(){

  publisher.publish("log", "iniciou aplicacao");

},6000);
