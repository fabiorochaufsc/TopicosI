var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/onibus'

MongoClient.connect(url, function (err, db) {
  if (err) throw err

  
  var myobj =  {
    "busStopID":"Universitaria",
    "position" : {
        "latitude" : -28.2122212,
        "longitude" : -49.232323
    }
}

  db.collection('busStop').insertOne(myobj, function (err, res) {
    if (err) throw err
    console.log('1 document inserted')
    db.close()
  })
})
