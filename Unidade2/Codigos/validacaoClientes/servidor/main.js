var PubSub = require('pubsub-js');
var clientes = new (require('./clientes.js'));


PubSub.subscribe('login.retorno', function (msg, data){

});

PubSub.subscribe('desconecta', function (msg, data){

});



const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 },function (){
	console.log('rodando');
	
});

wss.on('connection', function (ws) {
	PubSub.publish('novo',{socket:ws});
	
	ws.on('message', function (message) {

        message = JSON.parse(message);
    	switch (message.tipo)
    	{
    		case 'login':
    			PubSub.publish('login.valida',{socket:ws,msg:message});
    			/*

    			clientes.valida(ws, message, function (erro) {
    				if (erro)
    				{
						console.log(erro);
                    	clientes.desconectaErro(ws);
    					//clientes.desconecta(ws);
    				}
    				else
    				{
    					console.log('Cliente novo validado:'+message.ID);
    					ws.validado = true;
    					try {
                    		clientes.send(ws, 'validado');
                    	}
                    	catch(e)
                    	{};
                    }
    			});*/

    			break;
    		case 'info':
    		  	PubSub.publish('info',{socket:ws,msg:message});
    		  	/*

    			if (clientes.ehValido(ws))
    			{
                        console.log('recebeu msg de info');
    			}
    			else clientes.desconecta(ws);*/
    			break;
    		case 'texto':
	    		PubSub.publish('texto',{socket:ws,msg:message});
	    		/*
    			if (clientes.ehValido(ws))
    			{
                        console.log('recebeu msg de texto');

    			}
    			else clientes.desconecta(ws);*/
    			break;
    	}
  	});

  
});


