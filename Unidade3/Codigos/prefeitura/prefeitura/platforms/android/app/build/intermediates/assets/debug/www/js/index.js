var isCordovaApp=false;
var fileURL;
var meuGPS;
var reclamacao;

function O(id)
{
	return document.getElementById(id);
}
function win(r) {
    
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    
}

function camerasucesso(imageURI)
{
   var image = document.getElementById('minhaImagem');
    image.src = imageURI;
    image.width=200;
    image.height=200;
    fileURL = imageURI;

}
function camerafalha(message)
{
    alert('Failed because: ' + message);

}

var onSuccess = function(position) {
	meuGPS = {latitude:position.coords.latitude,longitude:position.coords.longitude};
};

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
    
var app = {
    // Application Constructor
    initialize: function(isCordovaApp) {
    	if (isCordovaApp) document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    	else this.receivedEvent();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
    

    
        O('gps').addEventListener('click', function(){
        		    navigator.geolocation.getCurrentPosition(onSuccess, onError);

        }, false);
        
         O('vibra').addEventListener('click', function(){
        		   navigator.vibrate(3000)


        }, false);
        
           O('camera').addEventListener('click', function(){
 navigator.camera.getPicture(camerasucesso, camerafalha, { quality: 25,
    destinationType: Camera.DestinationType.FILE_URI, correctOrientation: true});


        }, false);
        
      
         O('envia').addEventListener('click', function(){
			reclamacao = O('reclamacao').value;
			let options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName="myphoto.jpg";
			options.mimeType="image/jpeg";
			let headers={'GPS':meuGPS, 'reclamacao':reclamacao};

options.headers = headers;
			let ft = new FileTransfer();
			ft.upload(fileURL, encodeURI("http:/200.135.85.154:8080/fileupload"), win, fail, options);


        }, false);
        
        
    }
};


 if (typeof(cordova) == "object") {
    isCordovaApp = true
  } 



app.initialize(isCordovaApp);


