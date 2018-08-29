var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var SHA256 = require("crypto-js/sha256");

function Clientes () {
	this.vetor = [];
	this.meuBD;
	console.log('iniciando Clientes');
	MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
  		if (err) 
  		{
  			console.log("Erro ao conectar com o banco de dados");
  		}
  		else {
  			console.log('Conectou com o banco de dados');
  			this.meuBD = db.db("MEUS-Clientes");
  		}
  	}.bind(this));

  	PubSub.subscribe('login.valida',function(msg, dados){

  		var query ={_id:dados.ID};

		this.meuBD.collection('Usuarios').find(query).limit(1).toArray(function (err, result) {
		
    		if (err) throw err
    		if (result[0]==undefined) 
    		{
    			console.log('nao existe usuario');
    			PubSub.publish('login.resultado',{ID:dados.ID,status:'falha validacao'});
    		}
    		else
    		{
    			var password = (SHA256(dados.PASSWORD).toString());
    			if (password == result[0].password) PubSub.publish('login.resultado',{ID:dados.ID,status:'sucesso'});
    			else PubSub.publish('login.resultado',{ID:dados.ID,status:'falha validacao'});
    		}
    	
  		});
  	});

  	PubSub.subscribe('novo', function (msg, data){
		ws.validado = false;
		this.vetor.push(ws);
  	});


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
	try {
		var a = {tipo:'ERRO',valor:'erro de login'};
		ws.send(JSON.stringify(a));
		this.desconecta(ws);
	}
	catch(e)
	{
		
	}
}

module.exports = Clientes;
