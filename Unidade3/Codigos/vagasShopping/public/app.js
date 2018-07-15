	var servidorWebserver;
	var websocket;
	var meuID={senha:'teste123'}
	var vagas =[];

	var plantaBaixa;


function alteraPlantaBaixa (vetorVagas)
{
		console.log('alteraPlantaBaixa')
	 let svgDoc = plantaBaixa.contentDocument;
		let elems = svgDoc.getElementsByTagName("rect");

		console.log(vetorVagas)
		for (let a =0; a< vetorVagas.length;a++)
		{
			if (vetorVagas[a].status=="OCUPADO") elems[a].style.fill="gray";
			else
			{

				switch (vetorVagas[a].tipo)
				{
					case 'COMUM':
								elems[a].style.fill="green";

					break;
					case 'IDOSO':
												elems[a].style.fill="blue";

					break;	
					case 'DEFICIENTE':
															elems[a].style.fill="yellow";

					break;
				}
			}
		}
   
 
}


function startConnection() {
	if (websocket) websocket.close()
	websocket = new ReconnectingWebSocket(servidorWebserver)
	websocket.onopen = function(evt) {
		onOpen(evt);
	}
	websocket.onclose = function(evt) {
	}
	websocket.onmessage = function(evt) {
		onMessage(evt)
	}
}

function onOpen(evt)
{
	let MSG = {
		tipo: 'LOGIN',
		valor: meuID
	};
	websocket.send(JSON.stringify(MSG))
}


function onClose(evt)
{
}

function onMessage(evt)
{
	var msg = evt.data
	msg = JSON.parse(msg);
        
	switch (msg.tipo) {
		case 'LOGIN':
			if (msg.valor=='SUCESSO') 
			{
				websocket.send(JSON.stringify({tipo:'statusEstacionamento',valor:''}));
			}else alert('Erro: usuario NAO validado')

		break;
		case 'statusEstacionamento':
		  vagas = msg.valor;
			console.log('teste',JSON.parse(msg.valor));
			alteraPlantaBaixa(JSON.parse(msg.valor))
	
		break;
		case 'erro':
			alert(msg.valor)
			
		break;
        
      }
}

function O(id)
{
	return document.getElementById(id);
}

	O('REMOVE').addEventListener('click',function (){
		let numero = O('numeroREMOVER').value;
		numero = parseInt(numero)
		websocket.send(JSON.stringify({tipo:'REMOVE',valor:numero}));
	},false);

  O('EDITA').addEventListener('click',function (){
		let numero = parseInt(O('numeroVAGA').value);
		let tipo   = O('tipoVAGA').value;
		let id     = parseInt(O('idVaga').value);

		let tmp ={numero:numero, tipo:tipo, id:id};
		
		websocket.send(JSON.stringify({tipo:'EDITA',valor:tmp}));
	},false);


	 O('INSERE').addEventListener('click',function (){
		let vaga   = parseInt(O('novavaga').value);
		let tipo   = O('novatipo').value;
		let id     = parseInt(O('novaid').value);

		let tmp ={vaga:vaga, tipo:tipo, id:id};
		
		websocket.send(JSON.stringify({tipo:'INSERE',valor:tmp}));

	},false);
 
	servidorWebserver = servidorWebserver = 'ws://' + window.location.hostname + ':2000';
	startConnection();

	plantaBaixa = document.getElementById("vagas");

  plantaBaixa.addEventListener("load",function(){
    	let svgDoc = plantaBaixa.contentDocument;
			let elems = svgDoc.getElementsByTagName("rect");

			for (let a=0; a<  elems.length;a++)
			{
		    elems[a].addEventListener("mousedown",function(){
		    	
        			alert('seleciou a vaga:'+a);
        			let dadosVaga = document.getElementById("dadosVaga");
					dadosVaga.style.display = "block";
        }, false);
      }
  });
     
let dadosVaga = document.getElementById("dadosVaga");
dadosVaga.style.display = "none";

