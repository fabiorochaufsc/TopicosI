var express = require('express')
var app = express();
var bodyParser = require('body-parser');
const WebSocket = require('ws');
var vetorClientes=[];
var http = require('http')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

var SHA256 = require("crypto-js/sha256");

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
                if (vetorClientes[x].validado==true)
                  vetorClientes[x].send(JSON.stringify(msg)); 
              }
              catch (e)
              {

              }
            }
}
wss.on('connection', function connection(ws) {
  ws.validado=false;
  ws.timestamp = Date.now();
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
   

    if (MSG.tipo=='LOGIN')
    {
    	 ws.validado=true;
    	 
    	 return;
        //mostra o login
        console.log(MSG.value)

        console.log('ID=',MSG.valor.ID+'  password=',MSG.valor.password)
        MSG.valor.password = (SHA256(MSG.valor.password).toString());
        MongoClient.connect(url, function (err, db) {
  			
			var query = { _id: MSG.valor.ID}
			var dbo = db.db("criancas");
  			dbo.collection('Usuarios').find(query).limit(1).toArray(function (err, result) {
     if (result[0]==undefined) {
     	console.log('nao existe usuario');
     	let msgRetorno = {tipo:'ERRO',valor:'login invalido'};
          ws.send(JSON.stringify(msgRetorno));
          ws.close();
     }
    else 
    {
      if (result[0].password == MSG.valor.password)
      {
    	 console.log('validou usuario')
    	 ws.validado=true;
      }
      else 
      {
        console.log('cliente ',MSG.valor.ID,' nao valido, desconectando...')
        let msgRetorno = {tipo:'ERRO',valor:'login invalido'};
        ws.send(JSON.stringify(msgRetorno));
        ws.close();
      }
    }
    db.close()
  })
})
        
    }
    else fazBroadcast (MSG);
    
  });

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


setInterval (PERIODICA,10000);
