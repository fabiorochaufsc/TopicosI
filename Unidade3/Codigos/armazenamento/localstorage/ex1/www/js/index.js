

var listaNomes=[];
document.addEventListener('deviceready', onDeviceReady, false);


function mostraLista(v)
{
	document.getElementById('listanomes').innerHTML = '';
	if (v==null) return;
	for (var a=0;a<v.length;a++) document.getElementById('listanomes').innerHTML+='<br>'+v[a];
}
function salvaLista (v)
{
	localStorage.setItem('lista',JSON.stringify(v));
}

function onDeviceReady() {
	document.getElementById('botao').addEventListener('click',function(){
		listaNomes.push(document.getElementById('nome').value);
		salvaLista(listaNomes);
		mostraLista(listaNomes);

	},false);
	
	

	
	var a = localStorage.getItem('lista');
	if (a==null) 		salvaLista(listaNomes);
	console.log(a);
	listaNomes = JSON.parse(a);
	mostraLista(listaNomes);
	
	
}

onDeviceReady();
