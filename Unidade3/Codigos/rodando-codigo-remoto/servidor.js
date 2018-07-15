var express     = require('express')
var app         = express();
var bodyParser  = require('body-parser');
var http 				= require('http')


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

var run = function run ()
{
  function teste ()
  {
    console.log('oi');
  }
  teste();
  for (var x=0;x<10;x++) console.log(x);
}


app.post('/capturaCodigo', function (req, resp) {
  //console.log(req.body);
  resp.send({valor:JSON.stringify(run.toString())});
  resp.end();
});





app.listen(8080);
