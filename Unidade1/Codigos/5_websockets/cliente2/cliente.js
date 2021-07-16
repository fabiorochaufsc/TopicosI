const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:10000');

ws.on('open', function open() {
  ws.send( JSON.stringify ({tipo:'MSG',valor:'conectou'}) );
});

ws.on('message', function incoming(data) {
  console.log('recebeu msg',data);
});
