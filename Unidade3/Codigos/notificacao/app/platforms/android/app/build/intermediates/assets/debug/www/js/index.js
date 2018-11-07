function envia(data) 
{
  var request;
  
  request = new XMLHttpRequest();
  
  if (request) {
    request.open('POST', "http://frr-note.ignorelist.com:3000/token" , true);
    request.setRequestHeader("Content-type", "application/json");    
    request.send( JSON.stringify(data) );
  }
}
var recebidos;

var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
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
    	  document.getElementById('botao').addEventListener ('click',function(){
            var email =  document.getElementById('email').value;
            var serial =  document.getElementById('serial').value;
             if (recebidos) envia({email:email, token:recebidos.registrationId, serial:serial});
        },false);

        window.gcmPush = PushNotification.init({
            android: {
            	senderID: "1:755228845416:android:9db1506a5a073594",
                sound: true,
                vibration: true,
                topics: ['topic', 'todos']
            }
        });
        window.gcmPush.on('registration', function(data){
             recebidos = data;
            
             //alert(data.registrationId);
        });
        
        
        window.gcmPush.on('notification', data => {
  			alert('sasasasas');
 		});

window.gcmPush.on('error', e => {
  alert(e.message);
});
        
  
	}
};

app.initialize();