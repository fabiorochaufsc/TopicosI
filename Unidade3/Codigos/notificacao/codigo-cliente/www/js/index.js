
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

		 window.FirebasePlugin.subscribe("todos");

 /*       window.FirebasePlugin.subscribe("todos");
       

        window.FirebasePlugin.getToken(function(token) {

         postAjax("http://200.135.85.163:3000/token", {id:token});
        
          
    }, function(error) {
         alert(error);
    });

    }*/

    window.FirebasePlugin.getToken(function(token) {
    // save this server-side and use it to push notifications to this device
         postAjax("http://150.162.181.27:3000/token", {id:token, nome:'Fabio',senha:'123'});
}, function(error) {
    console.error(error);
});

}


}; // fim do APP

app.initialize();



