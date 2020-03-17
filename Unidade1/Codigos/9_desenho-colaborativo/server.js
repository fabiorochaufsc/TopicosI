const SSE = require("sse-node");
var express = require('express');
var appSSE      = express();
var appCOMANDOS = express();


 
var vetorClientes=[];

function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

var tela = Create2DArray(300);

appSSE.use(express.static(__dirname + '/public'));

appSSE.get("/registra", (req, res) => {
	console.log('cliente novo se registrou');
	var cliente = SSE(req, res);
	cliente.onClose(() => console.log("Cliente desconectou"));
    vetorClientes.push(cliente);
   
});

appCOMANDOS.get("/COORDENADAS", (req, res) => {
	console.log('Servidor recebeu');

     console.log(req.query.conteudo);
	for (let x=0;x < vetorClientes.length;x++)
	{
		vetorClientes[x].send(req.query.conteudo);
		let vet = (req.query.conteudo);
		console.log(vet[0]);
		for (let a=0;a<vet;a++)
		{
			//tela[vet[a].x][vet[a].y]=true;
		}
	//	console.log(tela);
	}
  	 return res.end();
  	
});
appCOMANDOS.get("/STATUS", (req, res) => {
	console.log('Servidor recebeu pedido de STATUS');
  
	
  	 return res.end();
  	
});
 
  
  		  

appSSE.listen(8080);
appCOMANDOS.listen(8081);