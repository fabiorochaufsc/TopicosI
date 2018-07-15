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



app.listen(8080);
