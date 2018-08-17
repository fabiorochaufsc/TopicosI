const WebSocket = require('ws');
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.get(/^(.+)$/, function(req, res) {
    try {
        res.write("A pagina que vc busca nao existe")
        res.end();
    } catch (e) {
        res.end();
    }
})

app.listen(8080, function() {
    console.log("servidor no ar");
});



var vetorClientes = [];
const wss = new WebSocket.Server({ port: 10000 },function (){
	console.log('rodando');
});
var contador = 0;

function broadcast (msg)
{
	for (let i = 0 ; i < vetorClientes.length; i++)
	{
		try {
			vetorClientes[i].send(msg);
		}
		catch (e)
		{

		}
	}
}

wss.on('connection', function connection(ws) {
  vetorClientes.push(ws);
  console.log("QTD clientes:"+vetorClientes.length)


  ws.on('message', function (MSG) {
  	var x = JSON.parse(MSG);
    console.log('received: %s', x.valor);
    var xx = {tipo:'todos',valor:x.valor};
    broadcast(JSON.stringify(xx));

  });

  ws.on('close', function incoming(message) {

  	for (let i = 0 ; i < vetorClientes.length; i++)
	{
		if (vetorClientes[i] == ws )
		{
			console.log('ACHOU')
			vetorClientes.splice(i, 1);
			break;

		}
	}
    console.log('Cliente desconectou...');
    console.log("QTD clientes:"+vetorClientes.length)

  });

});

