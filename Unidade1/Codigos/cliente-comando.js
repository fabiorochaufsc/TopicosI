#!/usr/bin/env node
/* 
Lembre-se de tornar executável o arquivo com 'chmod +x cliente-comando.js'

*/

var http = require('http');

http.get('http://www.google.com',function(resultado) {
	var recebido='';
	
	resultado.on('data', function (pedaco) {
		recebido+=pedaco;
	});
	
	resultado.on('end',function () {
		console.log(recebido);
	});
});

