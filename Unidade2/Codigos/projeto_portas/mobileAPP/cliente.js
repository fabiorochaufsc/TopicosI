
var servidorWebserver= 'ws://localhost:10000'

var websocket

function startConnection () {
  websocket = new ReconnectingWebSocket(servidorWebserver)
  websocket.onopen = function (evt) { 
    console.log('Esta conectado no servidor');
   }
  websocket.onclose = function (evt) { 
    console.log('Foi desconectado do servidor');

  }
  websocket.onmessage = function (evt) { 
    console.log('Recebeu mensagem');
    let msg = JSON.parse(evt.data);

    console.log('Mostrando salas')
    for (let a = 0 ; a< msg.salas.length; a++)
    {
      console.log(msg.salas[a])
      let btn = document.createElement("button");
      btn.innerHTML = "Sala "+msg.salas[a];
      btn.addEventListener('click',function(){
        console.log('Solicita a abertuda da sala '+msg.salas[a])
        websocket.send(JSON.stringify({tipo:'abre', identificacaoPorta:msg.salas[a]}));
      },false);
      document.body.appendChild(btn);

    }



   }
  websocket.onerror = function (evt) { 
    console.log('Erro desconhecido')
  }
}

function O(id)
{
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", function(event) {
  O('botaoEnvia').addEventListener('click',function(){
    var id = O('ID').value;
    var password = O('PASSWD').value;
  
    websocket.send(JSON.stringify({tipo:'login',id:id, passwd:password}));

  
  },false);

});





startConnection();
