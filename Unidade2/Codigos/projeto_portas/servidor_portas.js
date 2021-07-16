const WebSocket = require('ws');   
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

var dbo;
var usuarios = require('./usuarios.js');

var fechaduras=[];




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
		console.log(message)
		message = JSON.parse(message)
		switch (message.tipo)
		{
				case 'loginFechadura':
						console.log('recebeu credenciais de uma fechadura');
						console.log(message.id);
						console.log(message.passwd);
						ws.fechadura=1;
						ws.id = message.id;
						fechaduras.push(ws);
					break;
				case 'abre':
						if (ws.validado)
						{
							console.log(message.identificacaoPorta);
							for (let a=0; a<fechaduras.length;a++)
							{
								if (fechaduras[a].id == message.identificacaoPorta)
								{
									fechaduras[a].send(JSON.stringify({tipo:'abre'}));
								}
							}

						}
						else ws.close();
					break;	
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


