
PubSub.subscribe('enviaDados', function (msg, data) {

  console.log('Modulo REDE recebeu a mensagem:',data.ID,'  ',data.password);

});

PubSub.subscribe('init', function (msg, data) {

  console.log('Modulo REDE inicializado');

});