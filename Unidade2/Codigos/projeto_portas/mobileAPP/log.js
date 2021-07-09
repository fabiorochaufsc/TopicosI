PubSub.subscribe('init', function (msg, data) {
    console.log('Modulo LOG inicializado');
});

PubSub.subscribe('salas', function (msg, data) {
   console.log('LOG: sala apta:'+data.salas);
});

PubSub.subscribe('abre', function (msg, data) {
    console.log('LOG: solicita aberta da sala:'+data.identificacaoPorta);
});

PubSub.subscribe('login', function (msg, data) {
    console.log('LOG: efetua login:'+data.id+'  '+data.passwd);
});

PubSub.subscribe('erro', function (msg, data) {
    console.log('LOG: login recusado:');
});