var x =[];
var y = [1,3,4,6,7];

x.push(123);
x.push(332);
console.log('tamanho='+x.length)

var k = [];
k.push({nome:'Fabio Rocha', ocupacao:'professor'});
k.push({nome:'Maria Luisa', ocupacao:'estudante'});

for (var z=0;z<k.length;z++)
{
  console.log('nome='+k[z].nome+'  ocupacao='+k[z].ocupacao)
}
