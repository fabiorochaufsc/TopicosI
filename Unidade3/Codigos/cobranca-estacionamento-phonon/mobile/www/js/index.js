var ehcordova = false;

phonon.options({
    navigator: {
        defaultPage: 'home',
        defaultTemplateExtension: 'html',
        animatePages: false,
        enableBrowserBackButton: true,
        templateRootDirectory: './'
    },
    i18n: {
        directory: 'res/lang/',
        localePreferred: 'pt'
    }
});
var endServidor;
var anterior;
var options;
var flash = true;
var c;

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

function O(ID) {
    return document.getElementById(ID);
}
var app = {
    // Application Constructor
    initialize: function() {
        if (ehcordova == true) document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        else this.onDeviceReady();


    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        try {
          endServidor  = JSON.parse(localStorage.getItem("servidor"));
          O('endServidor').value = endServidor;
        }
        catch(e){}
        var ui = phonon.navigator();
        ui.start();
        window.plugin.CanvasCamera.initialize(document.getElementById('canvas'));
O('botaoInformacoesRetorna').addEventListener('click', function(){
    phonon.sidePanel('#MENU').close()
    phonon.panel('#INFORMACOES').close();
 

  }, false)
  O('botaoConfiguracoesRetorna').addEventListener('click', function(){
    phonon.sidePanel('#MENU').close()
    phonon.panel('#CONFIGURACOES').close();

  }, false)

   O('botaoConfiguracoesconfirma').addEventListener('click', function(){
    phonon.sidePanel('#MENU').close()
    phonon.panel('#CONFIGURACOES').close();
    localStorage.setItem("servidor", JSON.stringify(O('endServidor').value));
    endServidor = O('endServidor').value;


  }, false)

        O('CANCELA').addEventListener('click', function() {
            window.plugin.CanvasCamera.stop();
            O('canvas').style.display = "none";

        }, false);
        O('FLASH').addEventListener('click', function() {
            window.plugin.CanvasCamera.flashMode(flash);
            flash = !flash;


        }, false);

        O('BOTAO').addEventListener('click', function() {
            flash = true;
            O('canvas').style.display = 'block';
            c = O("canvas");
            anterior = (new Date()).getTime();
            window.plugin.CanvasCamera.flashMode(false);
            window.plugin.CanvasCamera.start(options);


        }, false);


    }
};


window.onload = function() {
    if (typeof(cordova) == "object") ehcordova = true;

    app.initialize();

    options = {
        cameraPosition: 'front',
        canvas: {
            width: 352,
            height: 288
        },
        capture: {
            width: 600,
            height: 400
        },
        fps: 30,
        onAfterDraw: function(frame) {

            var atual = (new Date()).getTime();
            if ((atual - anterior) > 2000) {

                
                const code = jsQR(((c.getContext("2d")).getImageData(0, 0, c.width, c.height)).data, c.width, c.height);
                anterior = atual;
                if (code) {
                    window.plugin.CanvasCamera.stop();
                    c.style.display = 'none';
                    setTimeout(function(){
                      postAjax(endServidor+"/enviaQRCODE",{func:'Fabio',qr:code.data});
                      alert("Found QR code" + JSON.stringify(code.data));
                    },1000).bind(this);
                }

            }
        }
    };
};