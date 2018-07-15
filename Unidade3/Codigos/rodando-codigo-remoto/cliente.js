var request = require('request');

request.post(
    'http://150.162.180.194:8080/enviaQRCODE',
    { json: { func: 'Fabio',qr:'sasasas' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);


setTimeout(function(){
  request.post(
    'http://localhost:8080/capturaCodigo',
    { json: { func: 'Fabio',qr:'sasasas' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var codigo = JSON.parse(body.valor);
            codigo+='run();'
            console.log(codigo)
             eval(codigo)
             console.log('fim')
        }
    }
);

},100);
