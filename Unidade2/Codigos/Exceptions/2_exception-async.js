// Esse codigo NAO detecta o problema usando o try-catch
// pois essa estrutura apenas funciona em chamadas sincronas


function minhaFuncao ()
{
  setTimeout(function(){
    return A;
  },2000);

}

try {
    minhaFuncao();
}
catch (e)
{
  console.log('detectou problema na funcao');
}
