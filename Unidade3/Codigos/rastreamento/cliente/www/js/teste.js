var socket;

function conectaServidorSockets (url)
{
     socket = new ReconnectingWebSocket(url);

    socket.onopen = function(evt) {
        enviaMSG({ID:123});
    }
    socket.onclose = function(evt) {
               console.log('foi desconectado do servidor');    

    }
    socket.onmessage = function(evt) {

       var tmp = evt.data;
       console.log(tmp);
       tmp = JSON.parse(tmp);
       document.getElementById('texto').innerHTML =document.getElementById('texto').innerHTML+'<br>'+tmp.valor; 
    }

}
function enviaMSG(conteudo)
{
    var m = {tipo:'MSG',valor:conteudo};
    socket.send(JSON.stringify(m));
}

