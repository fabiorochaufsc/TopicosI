var express = require('express')
var app = express();
var bodyParser = require('body-parser');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 },function (){
  console.log('SERVIDOR WEBSOCKETS na porta 8080');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});



app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, resp) {
  resp.write("teste");
  resp.end();
});

///  http://localhost:3000/sensores?temperatura=123
app.get('/sensores', function (req, resp) {

	var temperatura     = req.query.temperatura;
  var humidade = req.query.humidade;

  if (temperatura) console.log('temperatura=',temperatura)
  if (humidade) console.log('humidade=',humidade)


  return resp.end();
});



app.get(/^(.+)$/, function (req, res) {
  try {
    res.write("A pagina que vc busca nao existe")
    res.end();
  }
  catch(e)
  {
    res.end();
  }    
})

app.listen(3000, function(){
  console.log('SERVIDOR WEB na porta 3000');
});
