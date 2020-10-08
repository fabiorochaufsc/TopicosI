
var email       = require ('./email.js');
var config      = require('config');

var express     = require('express')
var app         = express();
var bodyParser  = require('body-parser');



var lista = new email();

var urlencodedParser = bodyParser.urlencoded({ extended: false});
app.use(express.static(__dirname + '/public'));

app.post('/formularioEmail',urlencodedParser, function (req, resp)
{
  var nome    = req.body.nome || 'SEM NOME';
  var email   = nome+'<'+req.body.email+'>';   
  var assunto = req.body.subject || 'SEM ASSUNTO';
  var texto   = req.body.msg || 'SEM CONTEUDO';;
  // faz algo com os dados do usuário e depois envia um email de confirmação*/



  lista.sendEmail({to:email,subject:assunto,text:texto})

  return resp.send('Dados recebidos, em alguns instantes você receberá um email de confirmação');
});


process.on('uncaughtException', function(err) {
    if(err.code === 'EADDRINUSE')
         console.log('Aplicação já esta rodando. Abortando....');
    else
         console.log(err);
    process.exit(1);
});

var server = app.listen(config.get('server.portWEB'),function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Servidor rodando na porta '+port);
})
