const SSE   = require("sse-node");
var express = require('express')
var app     = express()

var vetorClientes=[];
app.use(express.static('public'));

app.get("/teste", (req, res) => {

  console.log('rodou o teste');
  res.send('ok')
  vetorClientes[0].close();

});

app.get("/messages", (req, res) => {
	console.log('cliente novo se registrou');
	var cliente = SSE(req, res);
	cliente.onClose(function(){
    console.log('Cliente desconectou');
    for (let a=0;a<vetorClientes.length;a++)
    {
      if (vetorClientes[a]==cliente) vetorClientes.splice(a,1);
    }
  });
    vetorClientes.push(cliente);

});

  setInterval(function(){
    if (vetorClientes.length==0) return;
          console.log('tamanho='+vetorClientes.length);

  		try {
  			vetorClientes.forEach(function(elemento, posicao, vetor){
          let dados = {type:'location',value:"teste123" };
  				elemento.send(dados);
  			});

    	}
    	catch(e)
    	{}
    },1000);



app.listen(8080);
