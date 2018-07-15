 'use strict'

// **************** SERVIDOR DE BANCO DE DADOS **********

 var ipc = require('node-ipc')
 ipc.config.id = 'servidorBD'
 ipc.config.retry = 1500
 ipc.config.silent = true
 var vagas=[];
let tempoAtual = Date.now();


vagas.push({id:123,vaga:0,tipo:'COMUM',status:'OCUPADO', timestamp:tempoAtual, operacional:true})
vagas.push({id:456,vaga:1,tipo:'IDOSO',status:'LIVRE',   timestamp:tempoAtual, operacional:true})
vagas.push({id:678,vaga:2,tipo:'COMUM',status:'OCUPADO', timestamp:tempoAtual, operacional:true})
vagas.push({id:890,vaga:3,tipo:'DEFICIENTE',status:'OCUPADO', timestamp:tempoAtual, operacional:true})
vagas.push({id:786,vaga:4,tipo:'COMUM',status:'LIVRE',   timestamp:tempoAtual, operacional:true})


 ipc.serve(function () {


   ipc.server.on('loginADM', function (data, socket) {
     ipc.server.emit(socket, 'loginRESPOSTA', {senha:'teste1233'});
   })
		
   ipc.server.on('REQstatus_estacionamento', function (data, socket) {
     try {
      console.log(data)
       ipc.server.emit(socket, 'RESPstatus_estacionamento', {destinatario:data.destinatario,dados:JSON.stringify(vagas)})
     }
     catch(e)
     {}

   })

   ipc.server.on('REQinsere', function (data, socket) {
      try {
              let tmp =  data.dados.valor;
              let id = tmp.id;
              let tipo = tmp.tipo;
              let vaga = tmp.vaga;

              for (let i=0;i<vagas.length;i++)
              {
               if ((vagas[i].vaga==vaga) || (vagas[i].id  == id))
               {
                  ipc.server.emit(socket, 'RESPerro', {destinatario:data.destinatario,dados:'falha inserindo elemento'})
                  return;
               }  
              }
              let tempoAtual = Date.now();
              vagas.push({id:id,vaga:vaga,tipo:tipo,status:'LIVRE', timestamp:tempoAtual})

              ipc.server.emit(socket, 'RESPstatus_estacionamento', {destinatario:'',dados:JSON.stringify(vagas)})
    }catch(e)
    {

    }          
   })

   ipc.server.on('REQedita', function (data, socket) {
     for (let i=0; i<vagas.length;i++)
     {
      if (vagas[i].vaga==data.dados.valor.numero)
      {
        vagas[i].tipo = data.dados.valor.tipo;
        vagas[i].id = data.dados.valor.id;
        ipc.server.emit(socket, 'RESPstatus_estacionamento', {destinatario:'',dados:JSON.stringify(vagas)})

        return;
      }
     }
     ipc.server.emit(socket, 'RESPerro', {destinatario:data.destinatario,dados:'Nao existe elemento'})
   })
   
    ipc.server.on('REQremove', function (data, socket) {
        for (let i=0; i<vagas.length;i++)
        {
          if (vagas[i].vaga==data.dados.valor)
          {
            vagas.splice(i, 1);
            ipc.server.emit(socket, 'RESPstatus_estacionamento', {destinatario:'',dados:JSON.stringify(vagas)})

            return; 
          }
        }
        ipc.server.emit(socket, 'RESPerro', {destinatario:data.destinatario,dados:'Nao existe elemento para remover'})



      }
    )

   
   ipc.server.on('socket.disconnected', function (socket, destroyedSocketrestaurante) {

   })
 })

 ipc.server.start()
 console.log('Servidor BD rodando')
