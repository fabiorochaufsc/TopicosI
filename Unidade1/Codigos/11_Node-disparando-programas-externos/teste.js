var exec = require('child_process').exec;
var cont = 0;


exec('./teste', function (err, stdout, stderr) {
    console.log(stdout,stderr,err);
});



setTimeout ( function(){
	exec('killall teste', function (err, stdout, stderr) {
	});

},10000);

