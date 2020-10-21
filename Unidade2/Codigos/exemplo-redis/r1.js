// Esse eh o exemplo r1.js
// ele conecta no servidor redis e escreve um valor de um registro


var redis = require('redis');
var client = redis.createClient(); // this creates a new client

client.on('connect', function() {
  console.log('R1 conectou no servidor redis');
});


client.on('error', function (err) {
  console.log('Erro ' + err);
});

// salva o valor do registro Coordenadas. Como em redis apenas strings podem ser salvas,
// converte-se o JSON das coordenadas para string

setInterval (function(){
  if (this.x==undefined) this.x=0;
  client.set("Coordenadas", JSON.stringify({lat:this.x,long:this.x}));
  this.x++;


},3000);
