var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/rastreamento";

MongoClient.connect( url, {useNewUrlParser: true},function(err, db) {
  if (err) {
    console.log('nao consigo conectar no BD')
    process.exit(1);
  }
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

  console.log('ID da van:'+req.ID);
  console.log('latitude:'+req.latitude);
  console.log('longitude:'+req.longitude);
  response.end();
});