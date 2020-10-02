function Droid(msg)
{
    this.nome = msg;
    this.contador=0;
}

Droid.prototype.retorna   = function() {
  this.contador++;
  return this.lingua;
};

Droid.prototype.configura = function(x) {
  this.lingua = x;
};


var teste = new Droid('oi');


teste.configura('portugues');
console.log('Resultado:'+ teste.retorna());
