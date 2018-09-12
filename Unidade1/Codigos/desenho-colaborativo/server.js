const SSE = require("sse-node");
var express = require('express');
var app = express();
 
var vetorClientes=[];
app.use(express.static(__dirname + '/public'));

app.get("/registra", (req, res) => {
	console.log('cliente novo se registrou');
	var cliente = SSE(req, res);
	cliente.onClose(() => console.log("Cliente desconectou"));
    vetorClientes.push(cliente);
  
});

app.get("/MSG", (req, res) => {
	console.log('Servidor recebeu:',req.query.msg);
	vetorClientes.forEach(function(elemento, posicao, vetor){
  		elemento.send(req.query.msg);
  	});

  	
});
 
  
  		  

app.listen(8080);