function Droid() {}

var teste = new Droid();

Droid.prototype.retorna   = function() {return this.lingua;};
Droid.prototype.configura = function(x) {this.lingua = x;};

teste.configura('portugues');
console.log('Resultado teste :'+ teste.retorna());

var teste2 = new Droid();
teste2.configura('ingles');
console.log('Resultado teste2:'+ teste2.retorna());
console.log('Resultado teste :'+ teste.retorna());


