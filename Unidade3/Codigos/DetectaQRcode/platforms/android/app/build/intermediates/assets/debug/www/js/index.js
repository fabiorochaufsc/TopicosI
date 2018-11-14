
function O(X)
{
    return document.getElementById(X);
}


function onSuccess(imageURI)
{
            O('foto').src = imageURI;

            const code = jsQR(O('foto').data, 500, 500);

if (code) {
  alert(code);
}

}
var contador=0;
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
            window.plugin.CanvasCamera.initialize(O('canvas'));
            var options = {
    cameraPosition: 'back',
    width: 352,
    height: 288,
    canvas: {
      width: 352,
      height: 288
    },
    capture: {
      width: 352,
      height: 288
    },
    fps: 30,
    use: 'file',
    flashMode: false,
    thumbnailRatio: 1/6,
    onBeforeDraw: function(frame){
      // do something before drawing a frame
    },
    onAfterDraw: function(frame){
        var c     = O('canvas');
        if (contador==10)
        {
        const code = jsQR(((c.getContext("2d")).getImageData(0, 0, c.width, c.height)).data, c.width, c.height);
        if (code)
        {
                 window.plugin.CanvasCamera.stop();
            alert( JSON.stringify(code.data));
        }
        contador=0;
        }
        else contador++;        
    }
};

       O('captura').addEventListener('click',function(){
            window.plugin.CanvasCamera.start(options);


       }, false);
    }
};

app.initialize();