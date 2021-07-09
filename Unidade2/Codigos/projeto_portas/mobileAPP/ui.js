
function O(id)
{
  return document.getElementById(id);
}


PubSub.subscribe('init', function (msg, data) {

    console.log('Modulo UI inicializado');

    O('botaoEnvia').addEventListener('click',function(){
        var id = O('ID').value;
        var password = O('PASSWD').value;
        PubSub.publish('login', {tipo:'login',id:id, passwd:password});
    },false);
  

});


PubSub.subscribe('salas', function (msg, data) {
    let btn = document.createElement("button");
    btn.innerHTML = "Sala "+data.salas;
    btn.addEventListener('click',function(){
      console.log('Solicita a abertura da sala '+data.salas)
      PubSub.publish('abre', {identificacaoPorta:data.salas});
    },false);
    document.body.appendChild(btn);
});