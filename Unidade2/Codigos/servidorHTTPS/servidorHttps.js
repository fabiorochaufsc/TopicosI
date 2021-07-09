//openssl genrsa -out key.pem
//openssl req -new -key key.pem -out csr.pem
//openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
//rm csr.pem

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("servidor HTTPS\n");
}).listen(8000);
