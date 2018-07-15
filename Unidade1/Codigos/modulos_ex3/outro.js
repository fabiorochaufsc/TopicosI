
function MeuObjeto () {

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

