var socket;

function O(X)
{
  return document.getElementById(X);
}
function conectaServidorSockets (url,  nome)
{
     socket = new ReconnectingWebSocket(url);

    socket.onopen = function(evt) {
        console.log('Conectou no servidor');
        var m = {tipo:'login',valor:nome};
        socket.send(JSON.stringify(m));

    }
    socket.onclose = function(evt) {
               console.log('foi desconectado do servidor');

    }
    socket.onmessage = function(evt) {

       var tmp = evt.data;

       tmp = JSON.parse(tmp);
       switch (tmp.tipo)
       {
          case 'todosUsuarios':
              console.log('todosUsuarios');
              console.log(tmp.valor);

              for (let a=0;a<tmp.valor.length;a++)
              {
                document.getElementById('lista-conectados').innerHTML =document.getElementById('lista-conectados').innerHTML+'<br>'+tmp.valor[a];
              }
              break;

          case 'usuarioNovo':
           console.log('usuarioNovo');
              console.log(tmp.valor);
              document.getElementById('lista-conectados').innerHTML =document.getElementById('lista-conectados').innerHTML+'<br>'+tmp.valor;

            break;
          case 'texto':
              document.getElementById('texto').innerHTML =document.getElementById('texto').innerHTML+'<br>'+tmp.valor;

            break;
       }
    }

}
function enviaMSG()
{
    var conteudo = document.getElementById('valorMSG').value;
    var m = {tipo:'MSG',valor:conteudo};
    socket.send(JSON.stringify(m));
}




function fazConexao()
{
    O('identificacao').style.display='none';
    var nome = O('nome').value;
    conectaServidorSockets('ws://'+window.location.hostname+':10000', nome);

    var salva = {ID:nome,PASS:''};
    localStorage.setItem('meusSettings',JSON.stringify(salva));

}
document.addEventListener("DOMContentLoaded", function(event) {


  document.getElementById('botao').addEventListener('click',enviaMSG);
  document.getElementById('conecta').addEventListener('click',fazConexao);

  var cfg = localStorage.getItem('meusSettings');
  if (cfg)
  {
    alert("Tem informacoes salvas");

  }
  else alert("Mostra prpopaganda na hora");

});
