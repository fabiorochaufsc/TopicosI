var socket;

function conectaServidorSockets (url)
{
     socket = new ReconnectingWebSocket(url);

    socket.onopen = function(evt) {
        console.log('Conectou no servidor');
        socket.send(JSON.stringify({tipo:'login',id:'fabio',passwd:'rocha'}));
    }
    socket.onclose = function(evt) {
              console.log(evt)
               console.log('foi desconectado do servidor'+evt);

    }
    socket.onmessage = function(evt) {


       var tmp = evt.data;
		tmp  = JSON.parse(tmp);
      if (tmp.erro)
      {
        console.log('cliente sabe que errou o login e nao tentara mais')
        socket.close();
      }
       document.getElementById('texto').innerHTML =document.getElementById('texto').innerHTML+'<br>'+tmp.valor;
    }

}
function enviaMSG()
{
    var conteudo = document.getElementById('valorMSG').value;
    var m = {tipo:'MSG',valor:conteudo};
    socket.send(JSON.stringify(m));
}

document.addEventListener("DOMContentLoaded", function(event) {

  conectaServidorSockets('ws://localhost:10000');

  document.getElementById('botao').addEventListener('click',enviaMSG);

});
