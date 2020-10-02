var async = require ('async')


function shortTimeFunction(callback) {
  setTimeout(function() {
    console.log('funcao short terminou');
    callback(null, 'resposta de 1');
  }, 2000);
}


function mediumTimeFunction(callback) {
  setTimeout(function() {
    console.log('funcao medium terminou');
    callback(null, 'resposta de 2');
  }, 5000);
}


function longTimeFunction(callback) {
  setTimeout(function() {
    console.log('funcao long terminou');
    callback(null, 'resposta de 3');
  }, 10000);
}

async.parallel([shortTimeFunction, mediumTimeFunction, longTimeFunction],
function(err, results) {
  if (err) {
    return console.error(err);
  }
  console.log(results);
});


console.log('aqui...')
