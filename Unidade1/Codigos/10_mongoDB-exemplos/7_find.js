var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'



MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err
  var query = { nome: 'Fabio Rocha' }
  var dbo = db.db("AULA");

  dbo.collection('Usuarios').find(query).limit(1).toArray(function (err, result) {
    if (err) throw err
    if (result[0]==undefined) console.log('nao existe usuario')
    else
    {

      for (var a=0; a<result.length;a++ )
          console.log('Achou usuario ',result[a]._id+'   '+result[a].nome+'  '+result[a].password)
    }
    db.close()
  })
})
