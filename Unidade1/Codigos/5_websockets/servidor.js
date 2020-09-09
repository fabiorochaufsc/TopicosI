const WebSocket = require('ws');
const http = require('http');

var clientesConectados=[];


const wss = new WebSocket.Server({ port: 10000 },function (){
	console.log('rodando');
});

setInterval (periodica, 3000);

wss.on('connection', function connection(ws) {
	ws.validado=0;

  ws.on('message', function incoming(message) {
		console.log('received: %s', message);

		message = JSON.parse(message);
		switch (message.tipo)
		{
				case 'MSG':
						console.log('recebeu msg de texto: '+message.valor);
					break;

				case 'login':
						if ((message.id=='fabio') && (message.passwd=='rocha'))
						{
							console.log('cliente validado');
							ws.validado=1;
							clientesConectados.push(ws);

						}
						else {
								console.log('cliente descontado por problema no login.')
								ws.send(JSON.stringify({erro:'falha de login'}));
								ws.close();

						}

					break;
		}


  });

	ws.on('close', function (code) {

    console.log('detectou cliente saindo... ');

		var posicao = clientesConectados.indexOf(ws);
		clientesConectados.splice(posicao, 1);


  });

});



function periodica ()
{

	console.log("atualmente existem "+clientesConectados.length+' clientes conectados');
	for (var a = 0; a< clientesConectados.length;a++)
	{
		//try {
			clientesConectados[a].send(JSON.stringify({valor:'ping'}));
		//}
		//catch (e)
		//{
			//console.log('erro');
		//}

	}
}
