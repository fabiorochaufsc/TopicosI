var options = {
      enableHighAccuracy: true,
      maximumAge: 0
    };

function envia(data) 
{
  var request;
  
  request = new XMLHttpRequest();
  
  if (request) {
    request.open('POST', "http://frr-note.ignorelist.com:3000/posicao" , true);
    request.setRequestHeader("Content-type", "application/json");    
    request.send( JSON.stringify(data) );
  }
}

function showPosition(position) {
    alert('pegou posicao')
    envia({ID:123,latitude:position.coords.latitude, longitude:position.coords.longitude});
}

function periodica ()
{	

	 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, null, options );
     }
		


}

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {

  	 	setInterval(periodica, 3000);
    }

};



app.initialize();