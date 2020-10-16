var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var formidable = require('formidable');
var mv = require('mv');

var contador=0;
app.set('view engine', 'pug');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
	// leio bd
  res.render('index', { title: 'Oi', message: 'Ola, tudo bem ??'+contador});
	contador++;
});


app.get('/status', function(req, res) {
	res.write('status = ok');
	return res.end();
});

app.post('/fazUpload', function(req, resp) {
var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
    	console.log(fields);
    	//console.log(files);

        console.log('nome temporario no servidor:'+files.filetoupload.path);
        mv(files.filetoupload.path, 'public/foto.png', function(err) {
  				    resp.redirect('/');

		});

	});

});





app.get(/^(.+)$/, function(req, res) {
    try {
        res.write("A pagina que vc busca nao existe")
        res.end();
    } catch (e) {
        res.end();
    }
})

app.listen(3000, function() {
    console.log("servidor no ar");
});
