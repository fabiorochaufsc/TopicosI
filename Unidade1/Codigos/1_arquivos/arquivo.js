var fs = require('fs');

// Forma 1

console.log('oi mundo');


function roda (erro, arquivo)
{
    if (erro) 
    {
      console.log("Erro")
    }
    else console.log('lido '+arquivo);

}

fs.readFile('index.html', roda);




console.log('AQUI');

//Forma 2
//var arquivo = fs.readFileSync('index.html');
//console.log(arquivo.toString());
