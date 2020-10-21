const redis = require("redis");

const subscriber = redis.createClient();

subscriber.on('connect', function() {
    console.log('conectou no servidor redis');
});



subscriber.on("message", function(channel, message) {

  switch (channel)
  {
    case 'log':
      console.log('recebeu log : '+message);

  }

});

subscriber.subscribe("log");
