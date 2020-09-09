var fs = require('fs');

function teste ()
{
	for(let i = 1; i <= 5; i++) {
		var file = "async-txt" + i + ".txt";
		fs.writeFile(file, "Hello Node.js!", function(err, out) {
			console.log('valor de dentro'+i);
		});
		console.log(i);
	}


}

teste();
