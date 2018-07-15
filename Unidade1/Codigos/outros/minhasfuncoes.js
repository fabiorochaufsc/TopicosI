function envia ()
{
	fazGet("/?coordenadaLat=123&coordenadaLong=456");
}

function fazGet (valor) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		document.getElementById("mensagem").innerHTML = 		xhttp.responseText;
		}
	};
	xhttp.open("GET", valor, true);
	xhttp.send();
}
