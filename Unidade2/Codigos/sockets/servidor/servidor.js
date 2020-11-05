var io = require('socket.io')();

function authenticate( data, callback)
{
  console.log('verifica se cliente pode connectar')
  var username = data.username;
  var password = data.password;
  if ((username=='John') && (password=='secret')) return callback(null, true);
  return          callback('error',{message:'ID/senha incorretos'});
}

function disconnect(socket) {
  console.log(socket.id + ' disconnected');
}

function recebeMSG(socket) {
  console.log('recebeu mensagem do cliente');
}


io.on('connection', (socket) => {

   socket.on('authentication',function(data){

     authenticate(data,function(err, message){
       if (err)
       {
         console.log(err)
         socket.emit('unauthorized',message)
         socket.disconnect(0);
       }
       else {
         socket.emit('authenticated')
         socket.join('/validados');
         io.in('/validados').emit('msg', 'usuario '+data.username+' entrou na sala');
       }
     }.bind(this));
   });
});


// faz um broadcast periodico apenas para os usuarios validados
setInterval(function(){
  io.in('/validados').emit('normal', 'gg');

},1000)


io.listen(3000);
