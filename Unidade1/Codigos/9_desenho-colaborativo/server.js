const SSE = require("sse-node");
var express = require('express');
var appSSE      = express();
var appCOMANDOS = express();
const cors         = require('cors');
var methodOverride = require ('method-override');


appCOMANDOS.use(cors()); //normal CORS
appCOMANDOS.options("*", cors()); //preflight
appCOMANDOS.use(methodOverride('X-HTTP-Method'));
appCOMANDOS.use(methodOverride('X-HTTP-Method-Override'));
appCOMANDOS.use(methodOverride('X-Method-Override'));
appCOMANDOS.use(methodOverride('_method'));



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

  var vet = [];
  vet =  JSON.parse(req.query.conteudo);
  console.log(vet);
	for (let x=0;x < vetorClientes.length;x++)
	{


		vetorClientes[x].send(JSON.stringify(vet));
		for (let a=0;a<vet.length;a++)
		{
		}
	}
  	 return res.end();

});
appCOMANDOS.get("/STATUS", (req, res) => {
	console.log('Servidor recebeu pedido de STATUS');


  	 return res.end();

});




appSSE.listen(8000);
appCOMANDOS.listen(8081);
