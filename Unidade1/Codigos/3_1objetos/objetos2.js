function Droid(ID)
{
    this.nome = ID.nome;
    this.contador=ID.idade;
    console.log('teste');
}

Droid.prototype.retorna   = function() {
  this.contador++;
  return this.lingua;
};

Droid.prototype.configura = function(x) {
  this.lingua = x;
};


var teste = new Droid({nome:'fabio',idade:43});


teste.configura('portugues');
console.log('Resultado:'+ teste.retorna());
