const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:10000');

ws.on('open', function open() {
  ws.send('conectou');
});

ws.on('message', function incoming(data) {
  console.log('recebeu msg',data);
});
