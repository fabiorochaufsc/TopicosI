var express = require('express')
var app = express();
var bodyParser = require('body-parser');
const WebSocket = require('ws');
var vetorClientes=[];
var http = require('http')




const TIMEOUT = 10000;

const wss = new WebSocket.Server({ port: 8080 },function (){
  console.log('SERVIDOR WEBSOCKETS na porta 8080');
});

function PERIODICA ()
{
  let agora = Date.now();

  let x=0;
  while (x < vetorClientes.length)
  {
    if ((vetorClientes[x].validado==false) && ((agora - vetorClientes[x].timestamp) > TIMEOUT ) )
    {
        console.log('remove usuario da lista de ativos')
        let MSG = {tipo:'ERRO',valor:'timeout'};
        vetorClientes[x].send(JSON.stringify(MSG));
        vetorClientes[x].close();
        vetorClientes.splice(x, 1);

    }
    else x++;

  }
}

function fazBroadcast (msg)
{
  for (let x=0;x<vetorClientes.length;x++)
            {
              try {
             
                  vetorClientes[x].send(JSON.stringify(msg)); 
              }
              catch (e)
              {

              }
            }
}
wss.on('connection', function connection(ws) {

  vetorClientes.push(ws);

  ws.on('close', function close() {
      for (let x=0;x<vetorClientes.length;x++)
      {
        if (vetorClientes[x]==ws) {
            vetorClientes.splice(x, 1);
            break;
        }
      }
      console.log('Cliente desconectou');
  });

  ws.on('message', function incoming(MSG) {

    MSG = JSON.parse(MSG);
   

  });

});



app.use(bodyParser.json()); 

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, resp) {
  resp.write("teste");
  resp.end();
});

///  http://localhost:3000/GPS?lat=123&long=345
app.get('/GPS', function (req, resp) {

  var lat     = req.query.lat;
  var long    = req.query.long;

  console.log('recebido: lat='+lat+'   long='+long);
  let MSG = {tipo:'GPS',valor:{lat:lat,lng:long} };
  fazBroadcast (MSG)

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


