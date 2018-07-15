var eventEmitter = require('./compartilha.js');

var Meu = require('./outro.js');
var meu = new Meu();

function tratador1 ()
{
  console.log('recebido evento no tratador1');
}
eventEmitter.on('alarme', tratador1);

setInterval(function(){
  eventEmitter.emit('alarme');
},5000)


setInterval(function(){
  eventEmitter.emit('fogo');
},7000)

