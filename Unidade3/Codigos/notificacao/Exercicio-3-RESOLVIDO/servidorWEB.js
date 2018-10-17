var express     = require('express')
var app         = express();
var bodyParser  = require('body-parser');
var http 	    	= require('http')


app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/public'));

app.post('/token', function (req, resp) {
  let id    = req.body.id;
   
  console.log("usuario "+nome+"possui token:");
  console.log(id);
 
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
