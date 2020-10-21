var NRP = require('node-redis-pubsub');
var redis = require('redis');

var redisPub = redis.createClient();
var redisSub = redis.createClient();

var config = {
  emitter: redisPub,
  receiver: redisSub,
  auth: '123',
  scope: 'demo'
};


var nrp = new NRP(config);


nrp.emit('say hello', { name: 'Louis' });
