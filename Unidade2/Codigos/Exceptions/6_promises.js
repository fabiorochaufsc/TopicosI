
function minhaFuncao(numero){
    const promise = new Promise( function(resolve, reject) {

                          if (numero === 0) {
                              const resultado = 'tudo ok';
                              resolve(resultado);
                          }
                          else {
                              reject(new Error("Deu problema"));
                          }

                    });
    return promise;
}

minhaFuncao(0)
    .then(result => console.log("Promise resolved: " + result))
    .catch(error => console.log("Promises rejected: " + error));

console.log("teste");
