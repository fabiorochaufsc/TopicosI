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

