function postAjax(url, data) 
{
  var xhr = new window.XMLHttpRequest();
  
  xhr.open("POST", url, true);

  xhr.setRequestHeader('Content-Type', 'application/json');
 xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var msg = JSON.parse(xhr.responseText);
      var valor = msg.valor;
      var tipo  = msg.tipo;

      alert(valor);


    }
  };
  xhr.send(JSON.stringify(data));

}




function onDone(err, status){
  if (err) {

   console.error(err);
  }
  if (status.authorized) {
  
  } else if (status.denied) {
   
  } else {
  
  }
}

function displayContents(err, text){
  if(err){
    alert('Erro capturando QRcode');
  } else {
    alert(text);
    postAjax("http://150.162.181.157:8080/enviaQRCODE",{func:'Fabio',qr:text});
	  
    QRScanner.destroy(function(status){
  		
	  });
    var vet = document.getElementsByTagName("body");
    vet[0].style.opacity = "1";

  }
}

function O(ID)
{
	return document.getElementById(ID);
}

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    onDeviceReady: function() {
        alert("onDeviceReady")
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
    
       O('botao').addEventListener('click', function () {
       	var vet = document.getElementsByTagName("body");
       	vet[0].style.opacity = "0"
       		QRScanner.scan(displayContents);
       		QRScanner.show();
       }, false);
       QRScanner.prepare(onDone); 
      
               alert("receivedEvent");

        //postAjax("http://150.162.181.157:8080/enviaQRCODE",{func:'Fabio',qr:text});
        //postAjax("http://150.162.181.157:8080/enviaQRCODE",{func:'Fabio',qr:'123'});
    }
};

app.initialize();
