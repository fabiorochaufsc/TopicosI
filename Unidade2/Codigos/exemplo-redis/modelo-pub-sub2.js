const redis = require("redis");

const subscriber = redis.createClient();

subscriber.on('connect', function() {
    console.log('conectou no servidor redis');
});



subscriber.on("message", function(channel, message) {

  switch (channel)
  {
    case 'adm':
      console.log('recebeu adm : '+message);
      break;
    case 'erro':
      console.log('recebeu erro: '+message);

  }

});

subscriber.subscribe("adm");
subscriber.subscribe("erro");
