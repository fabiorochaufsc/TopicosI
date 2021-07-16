var express = require('express')
var app = express();

app.use(express.static(__dirname + '/public'));

var valor=0;

app.get('/', function(req, resp) {

    console.log('Dentro da primeira parte');

    resp.send('teste');
    return resp.end();
});

app.get('/leiaSensor/:id', function(req, resp) {
   console.log('Retorna o valor do sensor '+req.params.id);
   resp.send('valor do sensor'+valor);
   valor=valor+1;
   resp.end();
});

///  http://localhost:3000/sensores?temperatura=123
app.get('/sensores', function(req, resp) {

    //console.log(req);
    var temperatura = req.query.temperatura;
    var humidade = req.query.humidade;
    var id = req.query.id;

    if (id) console.log('identificacao=', id);
    if (temperatura) console.log('temperatura=', temperatura)
    if (humidade) console.log('humidade=', humidade)

	resp.send("fim da mensagem\n");
    return resp.end();
});



app.get(/^(.+)$/, function(req, res) {
    try {
        res.write("A pagina que vc busca nao existe")
        res.end();
    } catch (e) {
        res.end();
    }
})

app.listen(4000, function() {
    console.log("servidor no ar");
});
