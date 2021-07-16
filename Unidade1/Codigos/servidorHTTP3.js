const http = require('http')
const port = 3000
const ip = 'localhost'
 
const server = http.createServer((req, res) => {

    if (req.url=='/teste') res.end('cliente enviou um teste');
    else res.end('sssss')
})
 
server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})
