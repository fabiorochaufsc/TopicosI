var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

var bancoDADOS;
var clientes=[];


const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 },function (){
  console.log('SERVIDOR DE WEBSOCKET RODANDO');
});

wss.on('connection', function connection(ws) {
  console.log('conectou');
  clientes.push(ws);

  ws.on('message', function incoming(message) {
    var m = JSON.parse(message);

    ws.monitorando = m.valor.ID;
  });

});

function enviaCliente (s, msg)
{
  var msg2 = {MSG:'localizacao',latitude:msg.latitude,longitude:msg.longitude};
  s.send(JSON.stringify(msg2));

}
setInterval (periodica, 3000);

function periodica ()
{
  var van = []; 
  // consulta o mongoDB e le todos os registros de vans
  bancoDADOS.collection('localizacao').find("").toArray(function (err, result) {
    if (err) throw err
    if (result==undefined) console.log('nao existe usuario')
    else 
    {
      for (var a = 0; a < result.length;a++)
        {
          van[result[a]._id]={latitude:result[a].latitude,longitude:result[a].longitude, timestamp:result[a].timestamp};

        }
      var tempo =Date.now();
      for ( var c = 0; c< clientes.length;c++)
      {
        var ID = clientes[c].monitorando;
        if (ID)
        {
          var diferencaTempo = tempo -  van[ID].timestamp;
          enviaCliente(clientes[c], {latitude:van[ID].latitude,longitude:van[ID].longitude});
        }
        
      }
    }
  })
  
}



MongoClient.connect( url, {useNewUrlParser: true},function(err, db) {
  if (err) {
    console.log('nao consigo conectar no BD')
    process.exit(1);
  }
  bancoDADOS = db.db("van");
  
  console.log('conectou no BD');
}); 



var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() { 
  console.log('we are listening on: ', 
  app.get('port'))
});





var jsonParser = bodyParser.json()


app.get('/', function(request, response,next) {
  response.send('oi mundo');
  response.end();
})

app.post('/posicao', jsonParser, function(request, response,next) {


  if (!request.body) return response.sendStatus(400)
  let req = request.body;
  let timestamp = Date.now();
  var myquery = {_id: req.ID};
  var newvalues = { $set: {latitude: req.latitude, longitude:req.longitude, timestamp:timestamp }};

  bancoDADOS.collection("localizacao").updateOne(myquery, newvalues, {  upsert: true},function(err, res) {
    if (err) {
      console.log(err)
      throw err;
    }
    
   
  });

  console.log('ID da van:'+req.ID);
  console.log('latitude:'+req.latitude);
  console.log('longitude:'+req.longitude);
  response.end();
});