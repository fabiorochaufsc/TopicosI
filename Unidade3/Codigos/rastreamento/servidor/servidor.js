var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017";

var bancoDADOS;









MongoClient.connect( url, {useUnifiedTopology: true, useNewUrlParser: true},function(err, db) {
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
  console.log('Servidor de Vans rodando na porta  ', 
  app.get('port'))
});





var jsonParser = bodyParser.json()


app.get('/', function(request, response,next) {
  response.send('oi mundo');
  response.end();
})

app.post('/funcao1', jsonParser, function(request, response,next) {


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
