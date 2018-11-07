
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var express     = require('express')
var app         = express();
var bodyParser  = require('body-parser');
var http 	    	= require('http')
var dbo;
var admin = require("firebase-admin");
var serviceAccount = require("./chave.json");
var registrationToken;


var options = {
  priority: "high",
  timeToLive: 60 * 60
};



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pizzaria-d2924.firebaseio.com"
});



MongoClient.connect( url, {useNewUrlParser: true},function(err, db) {
  if (err) {
    console.log('nao consigo conectar no BD')
    process.exit(1);
  }
  dbo = db.db("pizzaria");
  
  console.log('conectou no BD');
}); 


app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/public'));

app.post('/token', function (req, resp) {
 
  let token      = req.body.token ;
  let email      = req.body.email ;
  let serial     = req.body.serial ;
  let myobj = { $set: {token:token,serial:serial}};
  let query = {_id:email};



  dbo.collection("usuarios").updateOne(query, myobj, {  upsert: true},function(err, res) {
    if (err) {
      console.log(err)
      throw err;
    }
    
   
  });
  
   
  console.log('recebido')
  console.log('token:'+email);
 
  return resp.end();
});


app.post('/enviaToken', function (req, resp) {
	console.log('enviaToken');
	let token      = req.query.token;
	let msg        = req.query.msg;

	console.log('token:'+token);
	console.log('msg:'+msg);

	let  payload = {
		notification: {
    	title: "Mensagem enviada pelo Node",
    	body: ""
  		},
 		 data: {
    		"force-start": "1",
    		"visibility": "1",
    		"ongoing": "true"
 		 }
	};
	payload.notification.title = msg;
	admin.messaging().sendToDevice(token, payload, options)
  .then(function(response) {
  	resp.send('');
    console.log("Successfully sent message:", response);
    
  })
  .catch(function(error) {
  	resp.send('');
    console.log("Error sending message:", error);
  });
 

});

app.get('/adm', function (req, res) {
	res.redirect('adm.html');
});

app.get('/listaTodos', function (req, res) {

	dbo.collection('usuarios').find("").toArray(function (err, result) {
		if (err) res.send('');
		else
		{
			res.send(result);
		}

	});
});


app.get('/', function (req, res) {
   console.log(req.query.teste);
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
