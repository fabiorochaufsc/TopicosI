// Esse eh o exemplo r2.js
// ele conecta no servidor redis e LE um valor de um registro


var redis = require('redis');
var client = redis.createClient(); // this creates a new client

client.on('connect', function() {
    console.log('R2 conectou no servidor redis');
});


client.on('error', function (err) {
    console.log('Erro ' + err);
});



client.get("Coordenadas", function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }

    console.log(result)
});
