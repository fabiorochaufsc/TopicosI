var express     = require('express')
var app         = express();
var bodyParser  = require('body-parser');
var http 				= require('http')
var methodOverride = require ('method-override');
var cors = require('cors')


app.use(cors()); //normal CORS
app.options("*", cors()); //preflight
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

app.use(bodyParser.json());



app.post('/enviaQRCODE', function (req, resp) {
  let funcionario    = req.body.func;
  let qr  = req.body.qr;
  
  console.log('Recebeu qr='+qr+'  enviado por:'+funcionario);
  resp.send({valor:'hgsjgdhg',tipo:'sdsd'});
  resp.end();
});

app.post('/outra', function (req, resp) {
  let funcionario    = req.body.func;
  let qr  = req.body.qr;
  
  console.log('Recebeu qr='+qr+'  enviado por:'+funcionario);
  resp.send('SUCESSO');
  resp.end();
});



app.listen(7000);
