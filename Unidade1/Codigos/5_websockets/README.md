-------

## WebSockets

WebSockets é uma tecnologia que permite criar uma ligação entre um cliente e um servidor outro entre uma quantidade diversa de clientes. A transmissão de dados é mais leve do que por http (Como num **GET/POST**) pois não existe o envio de cabeçalhos grandes como nestes.

Outra característica é que o quando se inicia um socket é criada uma ligação entre cliente--servidor e esse canal permanece aberto até ser fechado intencionalmente ou a conexão ser encerrada por algum problema.


Quando um elemento (digamos o cliente) envia uma mensagem por socket, a mensagem é recebida no servidor e dispara um método neste para tratar a recepção da mensagem. O mesmo vale no lado do servidor. Quando o servidor envia uma mensagem, a mesma será recebida do lado do cliente e será disparada um método para tratar a recepção da mensagem.

### Exemplo de código:

* Servidor

> No exemplo o servidor de websocket escuta a porta 8080 esperando por conexões. Quando algum cliente conecta é criado um objeto **ws** que representa a conexão deste cliente específico com o servidor. Se o servidor deseja enviar dados para este cliente, deve fazê-lo através deste objeto (**ws.send("oi cliente");**). O servidor pode ter vários clientes conectados, cada cliente terá o seu próprio **ws**. O servidor pode criar uma lista de **ws** para controlar todos os clientes.

> No código, o servidor amarrou o disparo de um método quando um evento do tipo **message** ocorreu. Existem alguns eventos: **open**, **message**, **close**,  **pong**



* Cliente1

> O cliente1 deve ser rodado de dentro do browser e usa **new WebSocket('ws://localhost:10000');** para conectar no servidor que está rodando na própria máquina. Quando a conexão for estabelecida será executado o callback do evento **open** e toda a vez que o cliente receber uma mensagem será disparado o callback do **message**.


* Cliente2

> O cliente2 deve ser rodado na linha de comando em node, conecta no servidor e retorna uma mensagem recebida deste