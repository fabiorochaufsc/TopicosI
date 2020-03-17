
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

MongoClient.connect(url, function (err, db) {
  if (err) throw err
  var query = { _id: 'frr' }
  var dbo = db.db("MEUS-Clientes");
  dbo.collection('Usuarios').find(query).limit(1).toArray(function (err, result) {
    if (err) throw err
    if (result[0]==undefined) console.log('nao existe usuario')
    else console.log('Achou usuario ',result[0]._id+'   '+result[0].password)
    db.close()
  })
})
