// Esse codigo detecta o problema numa chamada assincrona 


function minhaFuncao (cb)
{
  setTimeout(function(){
    return cb(new Error('deu problema'));
  },4000);

}

minhaFuncao(function(erro, resultado){
  if (erro)
      {
      console.log('detectou problema na funcao:'+erro);

      }
    });
