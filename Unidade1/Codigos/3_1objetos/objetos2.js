function Droid() {}
var teste = new Droid();
Droid.prototype.retorna   = function() {return this.lingua;};
Droid.prototype.configura = function(x) {this.lingua = x;};

teste.configura('portugues');
console.log('Resultado:'+ teste.retorna());
