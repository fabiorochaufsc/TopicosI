
var express = require('express');

var app = express();

var contadorPings=0;

app.get('/', function (req, res) {


  let lat    = req.query.coordenadaLat;
  let long   = req.query.coordenadaLong;
  let status = req.query.status; 
  let ping   = req.query.ping;

  console.log(req.query);

  if (ping)
  {
     contadorPings++;
        res.send('contagem de pings ='+contadorPings);
       

  }
  if (lat)
  {
	  

  	res.send('recebeu coordenadas');
  }
  
if (status)
{
	  	res.send('recebeu status');
}
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});
