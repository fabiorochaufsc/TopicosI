const WebSocket = require('ws');   
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

var dbo;
var usuarios = require('./usuarios.js');


MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err
  var query = { nome: 'Fabio Rocha' }
   dbo = db.db("gerenciasalas");
  console.log('conectado no BD')
  
})

var clientesConectados=[];


const wss = new WebSocket.Server({ port: 10000 },function (){
	console.log('rodando');
});


wss.on('connection', function (ws) {
	ws.validado=0;

  ws.on('message', function incoming(message) {

		message = JSON.parse(message)
		switch (message.tipo)
		{
				
					
				case 'login':
						usuarios.validaUsuario(dbo, message.id ,message.passwd, function (erro,msg){
							if (erro)
							{
								console.log(erro)
								ws.send(JSON.stringify({erro:erro}));
								ws.close();
							}
							else 
							{
								ws.validado=1;
								ws.salas = msg.listaPortas;
								clientesConectados.push(ws);
								ws.send(JSON.stringify({salas:msg.listaPortas}));
							}


						})


						

					break;
		}


  });

	ws.on('close', function (code) {

    console.log('detectou cliente saindo... ');

		var posicao = clientesConectados.indexOf(ws);
		clientesConectados.splice(posicao, 1);


  });

});


