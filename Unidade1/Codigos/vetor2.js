var x =[];
var y = [1,3,4,6,7];

x.push(123);
x.push(332);
console.log('tamanho='+x.length)

var k = [];
k.push({nome:'Fabio Rocha', ocupacao:'professor'});
k.push({nome:'Maria Luisa', ocupacao:'estudante'});

for (xx in k)
{
  console.log('nome='+k[xx].nome+'  ocupacao='+k[xx].ocupacao)
}
