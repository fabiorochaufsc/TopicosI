
var servidorWebserver= 'ws://localhost:10000'

var websocket

function startConnection () {
  websocket = new ReconnectingWebSocket(servidorWebserver)
  websocket.onopen = function (evt) { onOpen(evt) }
  websocket.onclose = function (evt) { onClose(evt) }
  websocket.onmessage = function (evt) { onMessage(evt) }
  websocket.onerror = function (evt) { onError(evt) }
}

function onOpen (evt) {
  console.log('onOpen')
}
function onClose (evt) {
}

function onMessage (evt) {
  var msg = evt.data
  console.log(msg)
}



function onError (evt) {
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
