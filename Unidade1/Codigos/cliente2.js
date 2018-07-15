var http = require('http');
var fs   = require('fs');


http.get('http://www.google.com',function(resultado) {
	var recebido='';
	
	resultado.on('data', function (pedaco) {
		recebido+=pedaco;
	});
	
	resultado.on('end',function () {
		console.log(recebido);
		fs.writeFile('saida',recebido,function() {
			console.log('arquivo gravado');
		});
		
	});
});

