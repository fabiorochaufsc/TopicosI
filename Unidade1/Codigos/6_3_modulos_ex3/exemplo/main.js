
var Meu = require('./outro.js');
var meu = new Meu('oi mundo');




meu.insereCliente({nome:'fabio',rua:'tupi 123',telefone:'43545'});
meu.insereCliente({nome:'fabio2',rua:'tupi 2323',telefone:'345'});
meu.insereCliente({nome:'fabio3',rua:'tupi 434',telefone:'43545'});
//meu.insereCliente({nome:'fabio4',rua:'tupi 54',telefone:'546'});
//meu.insereCliente({nome:'fabio5',rua:'tupi 34',telefone:'55556'});


//meu.listaTodos();

//meu.paraTodos(function(elemento){
//  console.log(elemento.nome);
//})


meu.paraTodos2(function(erro, vet){
  if (erro)
  {
    console.log('o vetor está vazio');
  }
  else {
    console.log('foram recebidos '+vet.length+' elementos como resposta');
  }
})
