const SSE = require("sse-node"),
      app = require("express")();
 
var vetorClientes=[];

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