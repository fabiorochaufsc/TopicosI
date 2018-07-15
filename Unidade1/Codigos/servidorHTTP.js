const http = require ('http')
 
const server = http.createServer(function (requisicao, resposta) {
  console.log('Recebendo uma request!')
  resposta.end('<h1>Aqui fica o que vamos enviar para o navegador como resposta!</h1>')
})
 
server.listen(3000, function () {
  console.log(`Servidor rodando em http://localhost:3000`)
  console.log('Para derrubar o servidor: ctrl + c');
});

