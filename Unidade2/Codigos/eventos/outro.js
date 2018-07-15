
var eventEmitter = require('./compartilha.js');



function tratador2 ()
{
  console.log('recebido evento no tratador2');
}
function tratador3 ()
{
  console.log('evento de fogo');
}

function MeuObjeto () {
  console.log('ESTOU AQUI')
  eventEmitter.on('alarme', tratador2);
  eventEmitter.on('fogo', tratador3);



}

MeuObjeto.prototype.metodo1 = function (x)
{
	console.log('chamou o modulo1:'+x);
}

MeuObjeto.prototype.metodo2 = function (x)
{
	console.log('chamou o modulo2:'+x);
}

module.exports = MeuObjeto;

