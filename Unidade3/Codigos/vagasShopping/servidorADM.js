 'use strict';
// **************** SERVIDOR PARA TAREFAS ADMINISTRATIVAS **********


const TIMEOUT=20000;

let tempoAtual = Date.now();




var adm = new (require('./src/Adm.js'));

// carrega configuracoes globais
var configuracoes = require ('./src/Configuracoes.js')

// cria WEBSOCKETS
const WebSocket = require('ws');
const wss       = new WebSocket.Server({ port: configuracoes.PORTA_ADM },function (){
  console.log('SERVIDOR WEBSOCKETS na porta '+configuracoes.PORTA_ADM);
});

// Cria servidor WEB para o ADM
var express = require('express')
var app = express();

app.disable('x-powered-by');
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.listen(configuracoes.PORTA_WEB_ADMIN, function(){
  console.log('SERVIDOR WEB na porta '+configuracoes.PORTA_WEB_ADMIN);
});


// Configura comunicacao entre processos
var ipc		      = require('node-ipc');
ipc.config.id     = 'servidorADM';
ipc.config.retry  = 1500;
ipc.config.silent = true;


ipc.connectTo('servidorBD',function(){


	ipc.of.servidorBD.on  ('RESPstatus_estacionamento',function(resp)
	{
    console.log(resp)
    if (resp.destinatario==='')
    {
            console.log('enviaBroadcast')

      adm.enviaBroadcast({msgType:'statusEstacionamento', msgValue:resp}) 
    }
    else  {
      console.log('single')
      adm.envia({msgType:'statusEstacionamento', msgValue:resp})
    }
      
	});
  ipc.of.servidorBD.on  ('RESPerro',function(resp)
  {
    adm.envia({msgType:'erro', msgValue:resp})
  });


  ipc.of.servidorBD.on  ('loginRESPOSTA',function(resp)
  {
      console.log('A senha cadastrada eh',resp.senha)
  });
  
	ipc.of.servidorBD.on('connect', function(){
				console.log('servidorADM conectou no BD')
        ipc.of.servidorBD.emit('loginADM', 'OK_add')
	});

	ipc.of.servidorBD.on('disconnect',function(){
				console.log('servidorADM desconectou do BD')

	});

});

wss.on('connection', function(ws) {
		adm.conecta(ws);
    
		ws.on('message', function (data) {
			trataMensagem(ws, data);
		});
		ws.on('close', function (code, reason) {
      adm.desconecta(ws);
		});
		ws.on('error', function () {
      adm.desconecta(ws);

		})
	
	
});
 	
function trataMensagem (ws, data)
{
	data = JSON.parse(data);
	switch (data.tipo)
	{
		case 'LOGIN':
					adm.valida(ws, data.dados);
					if (adm.ehValido(ws))
					{
						ws.send(JSON.stringify({tipo:'LOGIN',valor:'SUCESSO'}));
					}
					break;
	case 'statusEstacionamento':
					if (adm.ehValido(ws)) ipc.of.servidorBD.emit('REQstatus_estacionamento', {destinatario:ws.id})
					break;
	case 'EDITA':
          if (adm.ehValido(ws)) ipc.of.servidorBD.emit('REQedita', {destinatario:ws.id,dados:data})
  				break;
	case 'REMOVE':
          if (adm.ehValido(ws)) ipc.of.servidorBD.emit('REQremove', {destinatario:ws.id,dados:data})
					break;
  case 'INSERE':
          if (adm.ehValido(ws)) ipc.of.servidorBD.emit('REQinsere', {destinatario:ws.id,dados:data})
          break;
	}
}