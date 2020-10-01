var express = require('express')
var app = express();




app.get('/erro', function(req, resp) {

    process.exit();
    return resp.send('sss')
});

app.get('/', function(req, resp) {

    console.log('Dentro da primeira parte');
    return resp.send('esta rodando')
});


app.get(/^(.+)$/, function(req, res) {
    try {
        res.write("A pagina que vc busca nao existe")
        res.end();
    } catch (e) {
        res.end();
    }
})

// blablabla

app.listen(4000, function() {
    console.log("servidor no ar");
});
