
exports.listaPortas = function(dbo,cb) {

  dbo.collection('salas').find().toArray(function (err, result) {
      if (result==undefined) return cb('falha')
      else return cb(null,result)
       
    })
};

exports.validaUsuario = function(dbo, id, passwd,cb) {

    dbo.collection('usuarios').findOne({ _id: id },function (err, result) {
        if (result==undefined) return cb('Usuario nao existe')
        if (result.passwd==passwd) return cb(null,{status:'usuario validado',listaPortas:result.salas})
        else return cb('Senha invalida')
         
      })
};








