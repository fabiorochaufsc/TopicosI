
function Clientes () {
	this.vetor = [];
	console.log('iniciando Clientes');
}

Clientes.prototype.novo = function (ws)
{
	ws.validado = false;
	this.vetor.push(ws);

}
Clientes.prototype.valida = function (ws, login)
{
	// login={ID,PASSWORD};
	if ((login.ID=='frr') && (login.PASSWORD=='teste') ) ws.validado = true;
	return ws.validado;
}

Clientes.prototype.ehValido = function (ws)
{
	return ws.validado;
}

Clientes.prototype.qtdClientes = function (ws)
{
	var cont=0;
	for (var a = 0; a< this.vetor.length;a++) if (this.vetor[a].validado==true) cont++;
	return cont;
}

Clientes.prototype.send = function (ws,m)
{
	var msg = {tipo:'doServidor',valor:m};
	ws.send(JSON.stringify(msg));
}
Clientes.prototype.broadcast = function (msg)
{
	for (var a = 0; a< this.vetor.length; a++)
	{
		if (this.vetor[a].validado == true) 
			this.vetor[a].send(JSON.stringify(msg));

	}
}

Clientes.prototype.desconecta = function (ws)
{
	for (var a = 0; a< this.vetor.length; a++)
	{
		if (this.vetor[a] == ws) 
		{
			this.vetor.splice(a, 1);
			ws.close();
		}

	}
}
Clientes.prototype.desconectaErro = function (ws)
{
	var a = {tipo:'ERRO',valor:'erro de login'};
	ws.send(JSON.stringify(a));
	this.desconecta(ws);
}

module.exports = Clientes;
