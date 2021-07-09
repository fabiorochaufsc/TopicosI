
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

function mostraMensagemTela()
{
  for (let a=0;a<10;a++) console.log(a);
}




function mostraMensagemTela2()
{
  for (let a=0;a<10;a++) console.log(a);
}

if (cluster.isMaster) {

  console.log(`Master ${process.pid} is running`);

  // cria Workers

  mostraMensagemTela();
  mostraMensagemTela2();
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
    console.log(i+'  '+'worker criado');
  }


  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();

  });
} else {

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world do processo '+process.pid+'\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
