const WebSocket = require('ws');
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.get(/^(.+)$/, function(req, res) {
    try {
        res.write("A pagina que vc busca nao existe")
        res.end();
    } catch (e) {
        res.end();
    }
})

app.listen(8000, function() {
    console.log("servidor no ar");
});



var vetorClientes = [];

const wss = new WebSocket.Server({ port: 10000 },function (){
	console.log('rodando');
});
var contador = 0;

function broadcast (msg)
{
	for (let i = 0 ; i < vetorClientes.length; i++)
	{
		try {
			vetorClientes[i].send(msg);
		}
		catch (e)
		{

		}
	}
}

wss.on('connection', function connection(ws) {
   ws.validado = false;
  vetorClientes.push(ws);
  console.log("QTD clientes:"+vetorClientes.length)


  ws.on('message', function (MSG) {
    try {
  	   var x = JSON.parse(MSG);
       console.log('received: %s', x.valor);

      switch (x.tipo)
      {
       case 'login':
            ws.ID = x.valor;
            let nomes=[];
            for (let a = 0;a<vetorClientes.length;a++)
              if (vetorClientes[a].validado==true)
                {
                  nomes.push(vetorClientes[a].ID);
                }
           // envia para o novoUsuario a listagem de todos os logados
           var todos = {tipo:'todosUsuarios',valor:nomes};
            ws.send(JSON.stringify(todos));


            // Envia para todos os logados que um novo usuario conectou
          
           var xx = {tipo:'usuarioNovo',valor:x.valor};
           

           
           broadcast(JSON.stringify(xx));
           ws.validado = true;
         break;
       case 'MSG':
            if (ws.validado)
            {
              var xx = {tipo:'texto',valor:x.valor};
              broadcast(JSON.stringify(xx));
            }
            else ws.close();
        break;
       default:
          ws.close();
      } 
    }catch(e)
    {
      ws.close();
    }   
    

  });

  ws.on('close', function incoming(message) {

  	for (let i = 0 ; i < vetorClientes.length; i++)
	{
		if (vetorClientes[i] == ws )
		{
			console.log('ACHOU')
			vetorClientes.splice(i, 1);
			break;

		}
	}
    console.log('Cliente desconectou...');
    console.log("QTD clientes:"+vetorClientes.length)

  });

});

