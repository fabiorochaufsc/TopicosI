
function envia(data) 
{
  var request;
  
  request = new XMLHttpRequest();
  
  if (request) {
    request.open('POST', "http://150.162.180.229:80/posicao" , true);
    request.setRequestHeader("Content-type", "application/json");    
    request.send( JSON.stringify(data) );
  }
}

function showPosition(position) {
    envia({latitude:position.coords.latitude, longitude:position.coords.longitude});
}

function periodica ()
{	

	 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
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