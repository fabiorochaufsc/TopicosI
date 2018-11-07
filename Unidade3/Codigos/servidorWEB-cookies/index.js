var   express = require('express');
const bodyParser = require("body-parser");
var   cookieSession = require('cookie-session')
const pug = require('pug');
var   path = require('path');
var   app = express();
var   expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour



app.use(cookieSession({
  name: 'session3',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'localhost.com',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/adm', function(req, res) {
	res.redirect('/login.html');
});



app.get('/library', function(req, res)
{
	if(req.session.restricted) {
		res.sendFile( __dirname + "/private/" + "library.html" );
		

	}else res.redirect('/formularioLogin');

});

app.get('/logout', function(req, res) {
	req.session = null;
	res.send('logout com sucesso')
});

app.get('/menu', function(req, res) {
	try {
		
	}
	catch (e)
	{
		res.send('falha de autenticacao');
	}
});

app.post('/enviaPropaganda', function(req, res) {
	if(req.session.restricted) {
		res.send('enviado do servidor')
	}else res.redirect('/formularioLogin');
});


app.post('/formularioLogin', function(req, res) {
	try {
		if ((req.body.uname=='frr') && (req.body.psw=='teste') )
		{
			req.session.restricted = true;
			res.sendFile( __dirname + "/private/" + "menu.html" );
			 //res.render("outro.pug", {user: 'frr'});
		}
		else res.send('falha de autenticacao');
	}
	catch (e)
	{
		res.send('falha de autenticacao');
	}
});




app.listen(8080);
