
function MeuObjeto (st) {
	// construtor
	this.vetor=[];
	this.variavelEspecial = st;
	console.log('Modulo instanciado:'+st);
	this.inicializa();

}

MeuObjeto.prototype.inicializa = function (x)
{
	console.log('modulo inicializado:'+this.variavelEspecial);
}

MeuObjeto.prototype.insereCliente = function (x)
{
	this.vetor.push(x);
}

MeuObjeto.prototype.paraTodos = function (cb)
{
	for (var a = 0 ; a< this.vetor.length;a++)
	{
		cb(this.vetor[a]);
	}
}

MeuObjeto.prototype.paraTodos2 = function (cb)
{
	if (this.vetor.length==0) {
		return cb('sem elementos',null);
	}
	return cb(null,this.vetor);
}


MeuObjeto.prototype.listaTodos = function ()
{
	for (var a = 0 ; a< this.vetor.length;a++)
	{
		console.log(this.vetor[a]);
	}
}

module.exports = MeuObjeto;
