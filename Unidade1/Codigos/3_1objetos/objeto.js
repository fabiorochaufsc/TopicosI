// O novo padrão de JS ES6 (ECMAScript 6) criou uma forma melhor de declarar objetos.
// Atenção ao fato de caso vá rodar no aplicativo móvel, pode ser que não exista suporte
// para o ES6

class Program
{
  constructor()
  {
    this.message = 'hello es6 :)';
  }

  print()
  {
    console.log(this.message)
  }

}



var A = new Program();

A.print();
