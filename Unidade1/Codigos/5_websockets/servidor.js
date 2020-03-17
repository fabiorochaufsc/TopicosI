const WebSocket = require('ws');
const http = require('http');



const wss = new WebSocket.Server({ port: 10000 },function (){
	console.log('rodando');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send(JSON.stringify({valor:'something'}));
});