 var clientes = new (require('./clientes.js'));

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 },function (){
	console.log('rodando');
});

wss.on('connection', function (ws) {
	clientes.novo(ws);
	
	ws.on('message', function (message) {

        message = JSON.parse(message);
    	switch (message.tipo)
    	{
    		case 'login':
    			var ret = clientes.valida(ws, message);
    			if (ret==true)
    			{
    				console.log('Cliente novo validado:'+message.ID);
                    clientes.send(ws, 'validado');
    			}
    			else
    			{
    				console.log('ID/password invalidos');
                    clientes.desconectaErro(ws);
    				clientes.desconecta(ws);
    			}
    			break;
    		case 'info':
    			if (clientes.ehValido(ws))
    			{
                        console.log('recebeu msg de info');
    			}
    			else clientes.desconecta(ws);
    			break;
    		case 'texto':
    			if (clientes.ehValido(ws))
    			{
                        console.log('recebeu msg de texto');

    			}
    			else clientes.desconecta(ws);
    			break;
    	}
  	});

  
});


