var NRP = require('node-redis-pubsub');
var redis = require('redis');

var redisPub = redis.createClient();
var redisSub = redis.createClient();

var config = {
  emitter: redisPub,
  receiver: redisSub,
  auth: 'password',
  scope: 'demo'
};


var nrp = new NRP(config); // This is the NRP client


nrp.on('say hello', function(data){
  console.log('Hello ' + data.name);
});
