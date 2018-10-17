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
     
       tmp = JSON.parse(tmp);
         console.log(tmp);
         van.setLatLng([tmp.latitude, tmp.longitude]);
         van.bindTooltip("<small>VAN:"+tmp.ID+"</small>",{ permanent: false});

       document.getElementById('texto').innerHTML =document.getElementById('texto').innerHTML+'<br> Latitude:'+tmp.latitude+' Longitude'+tmp.longitude; 
    }

}
function enviaMSG(conteudo)
{
    var m = {tipo:'MSG',valor:conteudo};
    socket.send(JSON.stringify(m));
}

