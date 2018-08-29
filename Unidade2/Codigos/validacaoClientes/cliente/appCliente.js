const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {
	console.log('conectou');
	ws.send(JSON.stringify({tipo:'login',ID:'frr',PASSWORD:'teste123'}));

	ws.send(JSON.stringify({tipo:'info',valor:'xxxx'}));

	ws.send(JSON.stringify({tipo:'texto',valor:'yyy'}));

	
});

ws.on('message', function incoming(data) {
	data = JSON.parse(data);

	switch (data.tipo)
	{
		case 'ERRO':
			console.log(data.valor);
			break;
	}
});
