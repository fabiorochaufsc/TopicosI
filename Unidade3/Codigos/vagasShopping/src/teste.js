

var vetor = Object();

vetor[1]= {id:1,msg:'teste'};

vetor[100]= {id:100,msg:'teste2'};

vetor[300]= {id:300,msg:'teste2'};

console.log(vetor)
console.log( Object.keys(vetor).length)


delete vetor[300];
console.log('---------------')
console.log(vetor)
console.log( Object.keys(vetor).length)


   for (x in vetor) {

  console.log(vetor[x])

}

