const SSE = require("sse-node"),
      app = require("express")();
 
var client;
app.get("/sse", (req, res) => {
	console.log('zas');
    client = SSE(req, res);
  
   // client.onClose(() => console.log("Bye client!"));
});
 
  setInterval(function(){
    	client.send("Hello world!");
    },10000);

app.listen(8080);