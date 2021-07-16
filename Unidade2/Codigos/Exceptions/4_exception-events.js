// Esse codigo detecta o problema numa chamada assincrona 

const EventEmitter = require ('events');

function minhaFuncao ()
{
	let meuEvento = new EventEmitter();
	
  setTimeout(function(){

		try {
			return A;
		}
		catch (e)
		{
			meuEvento.emit('erro',new Error('deu problema'));

		}
  },4000);
  return meuEvento;

}

let evento = minhaFuncao();

evento.on('erro',function (err) {
	console.log('Erro ao executar a funcao:'+err);
});


evento.on('tudoOK',function (err) {
	console.log('Tudo ok ao executar a funcao');
});

