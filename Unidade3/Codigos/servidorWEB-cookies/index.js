var express = require('express');

var cookieSession = require('cookie-session')

var app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['dsdasdasdasdasd'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.get('/', function(req, res) {
		res.redirect('/login');
});
app.get('/library', function(req, res) {
	console.log(req.cookies);
	if(req.session.restricted) {
		res.send('You have been in the restricted section ' +
		req.session.restrictedCount + ' times.');
	}else {
		res.send('Welcome to the library.');
	}
});

app.get('/logout', function(req, res) {
	if (req.session.restricted) {
		delete req.session.restricted;
		req.session.restrictedCount=0;
	}
	
	res.redirect('/login');
});
app.get('/login', function(req, res) {
	req.session.restricted = true;
	if(!req.session.restrictedCount){
		req.session.restrictedCount = 1;
		res.send('Login ok');
	} else {
		req.session.restrictedCount += 1;
	}
	res.redirect('/library');
});

app.listen(8080);
