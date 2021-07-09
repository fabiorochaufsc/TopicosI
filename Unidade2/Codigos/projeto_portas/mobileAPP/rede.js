



var servidorWebserver= 'ws://localhost:10000'

var websocket


PubSub.subscribe('init', function (msg, data) {

    console.log('Modulo rede inicializado');

    websocket = new ReconnectingWebSocket(servidorWebserver)
    websocket.onopen = function (evt) { 
     }
    websocket.onclose = function (evt) { 
  
    }
    websocket.onmessage = function (evt) { 
      let msg = JSON.parse(evt.data);
  
      if (msg.erro)
      {
        PubSub.publish('erro', {});

      }
      else{

        for (let a = 0 ; a< msg.salas.length; a++)
        {
            PubSub.publish('salas', {salas:msg.salas[a]});

       
  
        }
      }
      
  
  
  
     }
    websocket.onerror = function (evt) { 
      console.log('Erro desconhecido')
    }

});

PubSub.subscribe('login', function (msg, data) {
    websocket.send(JSON.stringify({tipo:'login',id:data.id,passwd:data.passwd}));
});

PubSub.subscribe('abre', function (msg, data) {
    websocket.send(JSON.stringify({tipo:'abre',identificacaoPorta:data.identificacaoPorta}));
});


