"use strict";
function O(id) {
    return document.getElementById(id)
}
var ehCordova=false;
if (typeof(cordova) == "object") ehCordova = true;


var app = {
    initialize: function() {
        if (ehCordova) document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        else this.onDeviceReady();
    },

   onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
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
  })
  let ui = phonon.navigator()
  ui.start();
  O('ENTER').addEventListener('click', function(){
    alert('botao clicado');

  }, false)
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
    alert('oi mundo')

  }, false)

    }
};

app.initialize();






