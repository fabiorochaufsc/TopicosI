var fs = require('fs');

// Forma 1

console.log('oi mundo');


fs.readFile('index.html', function(erro, arquivo){
	if (erro) 
  {
    console.log("Erro")
  }
  else console.log('lido '+arquivo);
});

console.log('AQUI');

//Forma 2
//var arquivo = fs.readFileSync('index.html');
//console.log(arquivo.toString());
