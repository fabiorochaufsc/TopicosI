const SSE = require("sse-node");
var express = require('express');
var app = express();
 
var vetorClientes=[];
app.use(express.static(__dirname + '/public'));

app.get("/sse", (req, res) => {
	console.log('cliente novo se registrou');
	var cliente = SSE(req, res);
	cliente.onClose(() => console.log("Cliente desconectou"));
    vetorClientes.push(cliente);
  
});
 
  setInterval(function(){
  		try {
  			vetorClientes.forEach(function(elemento, posicao, vetor){
  				elemento.send('Oi mundo');
  			});
    		
    	}
    	catch(e)
    	{}
    },1000);

app.listen(8080);