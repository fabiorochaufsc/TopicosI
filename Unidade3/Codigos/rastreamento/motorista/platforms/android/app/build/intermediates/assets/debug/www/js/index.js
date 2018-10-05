
function envia(data) 
{
  var request;
  
  request = new XMLHttpRequest();
  
  if (request) {
    request.open('POST', "http://10.1.1.119:3000/posicao" , true);
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
cordova.plugins.locationAccuracy.canRequest(function(canRequest){
    if(canRequest){
        cordova.plugins.locationAccuracy.request(function (success){
            console.log("Successfully requested accuracy: "+success.message);
        }, function (error){
           console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
           if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
               if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                   cordova.plugins.diagnostic.switchToLocationSettings();
               }
           }
        }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    }else{
        // request location permission and try again
    }
});
  	 	setInterval(periodica, 3000);
    }

};



app.initialize();