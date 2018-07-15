var express = require('express')
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 

//app.use(express.static(__dirname + '/public'));

app.get('/', function (req, resp) {
  var temp = req.query;

  console.log('temperatura=',temp)

  return resp.end();
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
	console.log("servidor no ar");
});
