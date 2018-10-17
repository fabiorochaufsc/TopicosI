var van;
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
        conectaServidorSockets ("ws://frr-note.ignorelist.com:3001");

        var x=0;
		var mymap = L.map('mapid').setView([-28.948233, -49.4636407], 17);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: '',
			id: 'mapbox.streets'
		}).addTo(mymap);
 	
 		var myIcon = L.icon({
    		iconUrl: 'img/van.png',
    		iconSize: [26, 26]
		});
 
 		van = L.marker([-28.9482, -49.4636407]);
    	van.setIcon(myIcon);
    	van.addTo(mymap);
    
    
    
     
    
   
    
    }
};

app.initialize();