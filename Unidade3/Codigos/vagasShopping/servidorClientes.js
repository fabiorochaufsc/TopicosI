'use strict';
// **************** SERVIDOR PARA CLIENTES **********





// carrega configuracoes globais
var configuracoes = require ('./src/Configuracoes.js')

// cria WEBSOCKETS
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: configuracoes.PORTA_CLIENTES },function (){
  console.log('SERVIDOR WEBSOCKETS na porta '+configuracoes.PORTA_CLIENTES);
});

var ipc = require('node-ipc')

ipc.config.id     = 'servidorClientes';
ipc.config.retry  = 1500;
ipc.config.silent = true;

	
ipc.connectTo('servidorBD',function() {	
	ipc.of.servidorBD.on('connect', function(){
		console.log('servidorCliente conectou no banco de dados')
	});

	ipc.of.servidorBD.on('mensagem1',function(data){
		
	});
			
	ipc.of.servidorBD.on('disconnect',function(){
		console.log('servidorCliente desconectou  do banco de dados')
	});

});


