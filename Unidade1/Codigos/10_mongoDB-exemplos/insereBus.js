var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/onibus'

MongoClient.connect(url, function (err, db) {
  if (err) throw err

  
  var myobj =  {
    "route" : "azul",
    "busID" : "1",
    "driverID" : "frr",
    "timestamp" : 0,
    "macaddress" : "00:00:00:00",
    "ODB" : {
        "valor" : "",
        "timestamp" : 0
    },
    "STATUS" : {
        "valor" : "",
        "timestamp" : 0
    }
}

  db.collection('bus').insertOne(myobj, function (err, res) {
    if (err) throw err
    console.log('1 document inserted')
    db.close()
  })
})
