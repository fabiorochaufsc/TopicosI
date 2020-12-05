var request = require('request');

request.post(
    'http://192.168.0.111:7000/enviaQRCODE',
    { json: { func: 'Fabio',qr:'sasasas' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
