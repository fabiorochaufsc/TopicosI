Demonstração de captura de coordenadas do GPS e envio para um servidor WEB



### Aplicação Cliente 

Aplicação Cordova que usa o pacote **cordova-plugin-geolocation** para ler as coordenadas do GPS. Envia os dados para o servidor por um POST AJAX.  Codifica os dados como um JSON antes de enviar


### Aplicação Servidora 
Escuta a porta 3000 e quando recebe uma requisição ***POST /posicao*** mostra os dados na tela 