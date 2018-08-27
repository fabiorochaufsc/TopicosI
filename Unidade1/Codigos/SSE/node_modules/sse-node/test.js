const SSE = require("."),
      http = require("http");
    
server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.setHeader("Content-type", "text/html");
        return res.end("<script>var ev=new EventSource('/sse');ev.onmessage=function(event){console.log(event.data)};ev.addEventListener('event',function(event){console.log(event.type+': '+event.data)})</script>200 OK");
    }
    
    if (req.url === "/favicon.ico") return res.end();
    
    // SSE
    const client = SSE(req, res, {
        padding: true,
        ping: 10000
    });    
    
    client.send("start");
    client.send("test!", "event");
    client.onClose(() => console.log('Bye client!'));
});

server.listen(9090, '127.0.0.1', () => console.log('Server started on port 9090'));