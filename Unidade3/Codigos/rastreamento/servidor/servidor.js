var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() { 
  console.log('we are listening on: ', 
  app.get('port'))
});



function decode ( data , decodeornot ){
  if( typeof(data) == 'string' ){
    var objArr = data.split('&');
    var newobj = {};
    for( var i in objArr ){
      var key = objArr[i].split('=')[0];
      var value = ( decodeornot ? decodeURIComponent( objArr[i].split('=')[1] ) : objArr[i].split('=')[1] );
      newobj[key] = value;
    }
    return newobj;
  }else{
    console.warn('error occur');
  }
}


// create application/json parser
var jsonParser = bodyParser.json()


app.get('/', function(request, response,next) {
  response.send('oi mundo');
  response.end();
})

app.post('/posicao', jsonParser, function(request, response,next) {


  if (!request.body) return response.sendStatus(400)
  let req = request.body;
   
  console.log('latitude:'+req.latitude);
  console.log('longitude:'+req.longitude);
  response.end();
});