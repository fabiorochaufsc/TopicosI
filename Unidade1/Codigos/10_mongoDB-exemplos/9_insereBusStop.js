var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
  if (err) throw err
  var dbo = db.db("AULA");


  var myobj =  {
    "busStopID":"Universitaria",
    "position" : {
        "latitude" : -28.2122212,
        "longitude" : -49.232323
    }
}

  dbo.collection('busStop').insertOne(myobj, function (err, res) {
    if (err) throw err
    console.log('1 document inserted')
    db.close()
  })
})
