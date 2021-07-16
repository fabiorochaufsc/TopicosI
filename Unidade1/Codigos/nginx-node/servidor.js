// Arquivo: servidor.js
 var express = require('express')
   , app = express();
 
   
 app.get('/node', function(req, res){
 	console.log('O node esta tratando essa rota');
   var html = "<h1>Aqui é Node.js!</h1>"
   + "<h1><a href='index.html'>Ir para Nginx</a></h1>";
   res.send(html);
 });


 app.listen(3000);
