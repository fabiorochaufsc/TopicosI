"use strict";



function O(id) {
    return document.getElementById(id)
}

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
  var ui = phonon.navigator();

      
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


  ui.start()
