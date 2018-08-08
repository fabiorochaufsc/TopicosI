-------

## Nginx-Node



* Mostra como usar o nginx para servir uma página estática (imagens, html, css, etc.)
* Mostra como acessar uma rota na URL que não pertence a parte estática será redicionada para um servidor **node** que atenderá a requisição.
* O nginx funciona como um proxy.


### Como testar ?
* Instale o nginx para servir uma página estática na porta 2000
* Rode o servidor node
* acesse no seu browser **localhost:2000** o resultado será acessar a página servida pelo nginx.
* acesse no seu browser **http://localhost:2000/im2.png** o resultado será que o nginx servirá a imagem .png especificada que está no diretório de paginas ex: /var/www/html/
* acesse no seu browser **localhost:2000/node** o resultado será que como não existe página estática node no diretório /var/www/html/ então a requisição será repassada para o servidor que roda na página 3000. O servidor node verifica a requisição e retorna algo que será mostrado no seu browser.


## Links

https://udgwebdev.com/nginx-servindo-nodejs/