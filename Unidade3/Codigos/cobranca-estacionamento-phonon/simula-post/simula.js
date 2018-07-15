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
