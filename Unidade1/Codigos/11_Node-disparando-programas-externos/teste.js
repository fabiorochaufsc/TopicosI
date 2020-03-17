var exec = require('child_process').exec;
var cont = 0;


exec('./teste', function (err, stdout, stderr) {
    console.log(stdout);
});


setInterval (function(){
	console.log('rodando no node:'+cont);
	cont++;
	if (cont==10)
	{
		exec('killall teste', function (err, stdout, stderr) {
    	});

	}

},1000);

