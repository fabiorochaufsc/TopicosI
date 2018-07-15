var events       = require('events');
var eventEmitter = new events.EventEmitter();

//tratador de eventos 1
function tratador1 ()
{
  console.log('recebido evento no tratador1');
}
//tratador de eventos 2
function tratador2 ()
{
  console.log('recebido evento no tratador2');
}

//associa um evento
eventEmitter.on('alarme', tratador1);
eventEmitter.on('alarme', tratador2);



//dispara um evento
setTimeout(function(){
	eventEmitter.emit('alarme');
},5000)

