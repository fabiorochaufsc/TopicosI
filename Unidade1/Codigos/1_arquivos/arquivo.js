var fs = require('fs');

// Forma 1
fs.readFile('index.html', function(erro, arquivo){
	if (erro) 
  {
    console.log("Erro")
  }
  else console.log('lido',arquivo.toString());
});

console.log('AQUI');

//Forma 2
//var arquivo = fs.readFileSync('index.html');
//console.log(arquivo.toString());
